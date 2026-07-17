-- ============================================================
-- LABORATÓRIO DE BANCO DE DADOS TEMPORAL - FROTA
-- PostgreSQL 18+
-- Cenário: empresa de logística com veículos, motoristas,
-- alocações, viagens, manutenção, abastecimento e hodômetro.
-- ============================================================

DO $$
BEGIN
    IF current_setting('server_version_num')::integer < 180000 THEN
        RAISE EXCEPTION
            'Este script exige PostgreSQL 18 ou superior. Versão atual: %',
            current_setting('server_version');
    END IF;
END;
$$;

DROP SCHEMA IF EXISTS frota_temporal CASCADE;
CREATE SCHEMA frota_temporal;
SET search_path TO frota_temporal, public;

CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE lab_config (
    id              boolean PRIMARY KEY DEFAULT true CHECK (id),
    num_vehicles    integer NOT NULL CHECK (num_vehicles > 0),
    num_drivers     integer NOT NULL CHECK (num_drivers > 0),
    num_months      integer NOT NULL CHECK (num_months > 0),
    num_trips       integer NOT NULL CHECK (num_trips > 0),
    start_date      date NOT NULL
);

INSERT INTO lab_config (num_vehicles, num_drivers, num_months, num_trips, start_date)
VALUES (120, 90, 30, 2500, DATE '2023-01-01');

CREATE TABLE branch (
    branch_id smallint PRIMARY KEY,
    name      text NOT NULL UNIQUE,
    city      text NOT NULL,
    state     char(2) NOT NULL
);

INSERT INTO branch (branch_id, name, city, state) VALUES
(1, 'Matriz Norte', 'Manaus', 'AM'),
(2, 'Base Sudeste', 'São Paulo', 'SP'),
(3, 'Base Sul', 'Curitiba', 'PR'),
(4, 'Base Nordeste', 'Recife', 'PE'),
(5, 'Base Centro-Oeste', 'Goiânia', 'GO');

CREATE TABLE vehicle (
    vehicle_id     bigint PRIMARY KEY,
    plate          varchar(10) NOT NULL UNIQUE,
    model          text NOT NULL,
    vehicle_type   text NOT NULL CHECK (vehicle_type IN ('VAN', 'CAMINHAO_LEVE', 'CAMINHAO_PESADO', 'CARRETA')),
    branch_id      smallint NOT NULL REFERENCES branch(branch_id),
    acquisition_at date NOT NULL,
    active         boolean NOT NULL DEFAULT true
);

CREATE TABLE driver (
    driver_id    bigint PRIMARY KEY,
    name         text NOT NULL,
    license      varchar(20) NOT NULL UNIQUE,
    category     text NOT NULL CHECK (category IN ('B', 'C', 'D', 'E')),
    hired_at     date NOT NULL,
    active       boolean NOT NULL DEFAULT true
);

CREATE TABLE route (
    route_id       bigint PRIMARY KEY,
    origin_branch  smallint NOT NULL REFERENCES branch(branch_id),
    destination_branch smallint NOT NULL REFERENCES branch(branch_id),
    name           text NOT NULL,
    distance_km    numeric(10,2) NOT NULL CHECK (distance_km > 0),
    CHECK (origin_branch <> destination_branch)
);

-- Histórico temporal de status do veículo.
CREATE TABLE vehicle_status_history (
    vehicle_id  bigint NOT NULL REFERENCES vehicle(vehicle_id),
    status      text NOT NULL CHECK (status IN ('DISPONIVEL', 'EM_VIAGEM', 'MANUTENCAO', 'INATIVO')),
    valid_at    daterange NOT NULL,
    note        text NOT NULL DEFAULT 'carga_sintetica',
    recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),

    PRIMARY KEY (vehicle_id, valid_at WITHOUT OVERLAPS),
    CHECK (NOT isempty(valid_at)),
    CHECK (lower_inc(valid_at) AND NOT upper_inc(valid_at))
);

-- Alocação temporal de motorista ao veículo.
CREATE TABLE vehicle_assignment (
    vehicle_id  bigint NOT NULL REFERENCES vehicle(vehicle_id),
    driver_id   bigint NOT NULL REFERENCES driver(driver_id),
    assigned_at daterange NOT NULL,
    role        text NOT NULL DEFAULT 'principal',
    recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),

    PRIMARY KEY (vehicle_id, assigned_at WITHOUT OVERLAPS),
    CHECK (NOT isempty(assigned_at)),
    CHECK (lower_inc(assigned_at) AND NOT upper_inc(assigned_at))
);

CREATE TABLE trip (
    trip_id     bigint PRIMARY KEY,
    vehicle_id  bigint NOT NULL REFERENCES vehicle(vehicle_id),
    driver_id   bigint NOT NULL REFERENCES driver(driver_id),
    route_id    bigint NOT NULL REFERENCES route(route_id),
    started_at  date NOT NULL,
    ended_at    date NOT NULL,
    trip_period daterange NOT NULL,
    distance_km numeric(10,2) NOT NULL CHECK (distance_km > 0),
    revenue     numeric(12,2) NOT NULL CHECK (revenue >= 0),
    status      text NOT NULL CHECK (status IN ('PLANEJADA', 'CONCLUIDA', 'CANCELADA')),
    created_at  timestamptz NOT NULL DEFAULT clock_timestamp(),

    CHECK (started_at < ended_at),
    CHECK (trip_period = daterange(started_at, ended_at, '[)'))
);

CREATE TABLE maintenance (
    maintenance_id     bigint PRIMARY KEY,
    vehicle_id         bigint NOT NULL REFERENCES vehicle(vehicle_id),
    maintenance_type   text NOT NULL CHECK (maintenance_type IN ('PREVENTIVA', 'CORRETIVA', 'PNEUS', 'DOCUMENTACAO')),
    maintenance_period daterange NOT NULL,
    odometer_km        numeric(12,2) NOT NULL CHECK (odometer_km >= 0),
    cost               numeric(12,2) NOT NULL CHECK (cost >= 0),
    status             text NOT NULL CHECK (status IN ('ABERTA', 'CONCLUIDA', 'CANCELADA')),

    CHECK (NOT isempty(maintenance_period)),
    CHECK (lower_inc(maintenance_period) AND NOT upper_inc(maintenance_period))
);

CREATE TABLE fueling (
    fueling_id bigint PRIMARY KEY,
    vehicle_id bigint NOT NULL REFERENCES vehicle(vehicle_id),
    fueled_at  date NOT NULL,
    liters     numeric(10,2) NOT NULL CHECK (liters > 0),
    total_cost numeric(12,2) NOT NULL CHECK (total_cost > 0),
    odometer_km numeric(12,2) NOT NULL CHECK (odometer_km >= 0),
    station    text NOT NULL
);

CREATE TABLE odometer_history (
    vehicle_id  bigint NOT NULL REFERENCES vehicle(vehicle_id),
    measured_at date NOT NULL,
    odometer_km numeric(12,2) NOT NULL CHECK (odometer_km >= 0),
    source      text NOT NULL DEFAULT 'carga_sintetica',
    PRIMARY KEY (vehicle_id, measured_at)
);

CREATE TABLE vehicle_status_audit (
    audit_id     bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    operation    text NOT NULL,
    vehicle_id   bigint NOT NULL,
    old_status   text,
    new_status   text,
    old_valid_at daterange,
    new_valid_at daterange,
    changed_at   timestamptz NOT NULL DEFAULT clock_timestamp(),
    changed_by   text NOT NULL DEFAULT current_user,
    transaction_id xid8 NOT NULL DEFAULT pg_current_xact_id()
);

CREATE OR REPLACE FUNCTION audit_vehicle_status_history()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO vehicle_status_audit (operation, vehicle_id, new_status, new_valid_at)
        VALUES (TG_OP, NEW.vehicle_id, NEW.status, NEW.valid_at);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO vehicle_status_audit (operation, vehicle_id, old_status, new_status, old_valid_at, new_valid_at)
        VALUES (TG_OP, NEW.vehicle_id, OLD.status, NEW.status, OLD.valid_at, NEW.valid_at);
        RETURN NEW;
    ELSE
        INSERT INTO vehicle_status_audit (operation, vehicle_id, old_status, old_valid_at)
        VALUES (TG_OP, OLD.vehicle_id, OLD.status, OLD.valid_at);
        RETURN OLD;
    END IF;
END;
$$;

CREATE TRIGGER trg_audit_vehicle_status_history
AFTER INSERT OR UPDATE OR DELETE ON vehicle_status_history
FOR EACH ROW EXECUTE FUNCTION audit_vehicle_status_history();

CREATE INDEX idx_vehicle_status_valid_at ON vehicle_status_history USING gist (valid_at);
CREATE INDEX idx_vehicle_assignment_assigned_at ON vehicle_assignment USING gist (assigned_at);
CREATE INDEX idx_trip_period ON trip USING gist (trip_period);
CREATE INDEX idx_trip_vehicle_started ON trip (vehicle_id, started_at);
CREATE INDEX idx_maintenance_period ON maintenance USING gist (maintenance_period);
CREATE INDEX idx_fueling_vehicle_date ON fueling (vehicle_id, fueled_at);
CREATE INDEX idx_odometer_vehicle_date ON odometer_history (vehicle_id, measured_at);

INSERT INTO vehicle (vehicle_id, plate, model, vehicle_type, branch_id, acquisition_at, active)
SELECT
    g::bigint,
    'FLT' || lpad(g::text, 4, '0'),
    (ARRAY['Sprinter', 'Daily', 'Accelo', 'Atego', 'Constellation', 'FH'])[1 + ((g - 1) % 6)],
    (ARRAY['VAN', 'CAMINHAO_LEVE', 'CAMINHAO_PESADO', 'CARRETA'])[1 + ((g - 1) % 4)],
    (1 + ((g - 1) % 5))::smallint,
    DATE '2019-01-01' + ((g * 13) % 1200),
    (g % 17) <> 0
FROM lab_config c
CROSS JOIN generate_series(1, c.num_vehicles) AS g;

INSERT INTO driver (driver_id, name, license, category, hired_at, active)
SELECT
    g::bigint,
    'Motorista ' || lpad(g::text, 3, '0'),
    'CNH' || lpad((100000 + g)::text, 8, '0'),
    (ARRAY['B', 'C', 'D', 'E'])[1 + ((g - 1) % 4)],
    DATE '2018-01-01' + ((g * 19) % 1600),
    (g % 13) <> 0
FROM lab_config c
CROSS JOIN generate_series(1, c.num_drivers) AS g;

INSERT INTO route (route_id, origin_branch, destination_branch, name, distance_km)
SELECT
    row_number() OVER ()::bigint AS route_id,
    o.branch_id,
    d.branch_id,
    o.city || ' -> ' || d.city,
    (350 + abs(o.branch_id - d.branch_id) * 220 + ((o.branch_id * d.branch_id) % 9) * 37)::numeric(10,2)
FROM branch o
JOIN branch d ON d.branch_id <> o.branch_id;

INSERT INTO vehicle_status_history (vehicle_id, status, valid_at)
SELECT
    v.vehicle_id,
    CASE
        WHEN m.month_no % 10 = 0 THEN 'MANUTENCAO'
        WHEN m.month_no % 7 = 0 THEN 'EM_VIAGEM'
        WHEN NOT v.active THEN 'INATIVO'
        ELSE 'DISPONIVEL'
    END,
    daterange(
        (c.start_date + make_interval(months => m.month_no))::date,
        (c.start_date + make_interval(months => m.month_no + 1))::date,
        '[)'
    )
FROM vehicle v
CROSS JOIN lab_config c
CROSS JOIN LATERAL generate_series(0, c.num_months - 1) AS m(month_no);

INSERT INTO vehicle_assignment (vehicle_id, driver_id, assigned_at)
SELECT
    v.vehicle_id,
    (1 + ((v.vehicle_id + q.quarter_no * 3) % c.num_drivers))::bigint AS driver_id,
    daterange(
        (c.start_date + make_interval(months => q.quarter_no * 3))::date,
        (c.start_date + make_interval(months => least((q.quarter_no + 1) * 3, c.num_months)))::date,
        '[)'
    )
FROM vehicle v
CROSS JOIN lab_config c
CROSS JOIN LATERAL generate_series(0, ceil(c.num_months / 3.0)::integer - 1) AS q(quarter_no);

WITH params AS (
    SELECT c.*, (c.start_date + make_interval(months => c.num_months))::date AS end_date FROM lab_config c
), generated AS (
    SELECT
        g::bigint AS trip_id,
        (1 + floor(random() * p.num_vehicles))::bigint AS vehicle_id,
        (p.start_date + floor(random() * (p.end_date - p.start_date - 3))::integer)::date AS started_at,
        (1 + floor(random() * 20))::bigint AS route_id,
        p.num_drivers
    FROM params p
    CROSS JOIN generate_series(1, p.num_trips) AS g
), enriched AS (
    SELECT
        g.*,
        (g.started_at + (1 + floor(random() * 5))::integer)::date AS ended_at
    FROM generated g
)
INSERT INTO trip (trip_id, vehicle_id, driver_id, route_id, started_at, ended_at, trip_period, distance_km, revenue, status)
SELECT
    e.trip_id,
    e.vehicle_id,
    (1 + ((e.vehicle_id + extract(month FROM e.started_at)::integer) % e.num_drivers))::bigint AS driver_id,
    e.route_id,
    e.started_at,
    e.ended_at,
    daterange(e.started_at, e.ended_at, '[)'),
    r.distance_km,
    round((r.distance_km * (4.5 + random() * 3.2))::numeric, 2),
    CASE WHEN e.trip_id % 31 = 0 THEN 'CANCELADA' ELSE 'CONCLUIDA' END
FROM enriched e
JOIN route r USING (route_id);

INSERT INTO maintenance (maintenance_id, vehicle_id, maintenance_type, maintenance_period, odometer_km, cost, status)
SELECT
    row_number() OVER ()::bigint AS maintenance_id,
    v.vehicle_id,
    (ARRAY['PREVENTIVA', 'CORRETIVA', 'PNEUS', 'DOCUMENTACAO'])[1 + ((v.vehicle_id + m.month_no) % 4)],
    daterange(
        (c.start_date + make_interval(months => m.month_no) + ((v.vehicle_id % 8)::integer))::date,
        (c.start_date + make_interval(months => m.month_no) + ((v.vehicle_id % 8)::integer + 2))::date,
        '[)'
    ),
    20000 + v.vehicle_id * 300 + m.month_no * 1800,
    round((450 + random() * 4500 + (v.vehicle_id % 20) * 35)::numeric, 2),
    CASE WHEN m.month_no >= c.num_months - 1 THEN 'ABERTA' ELSE 'CONCLUIDA' END
FROM vehicle v
CROSS JOIN lab_config c
CROSS JOIN LATERAL generate_series(0, c.num_months - 1, 6) AS m(month_no);

INSERT INTO fueling (fueling_id, vehicle_id, fueled_at, liters, total_cost, odometer_km, station)
SELECT
    row_number() OVER ()::bigint AS fueling_id,
    v.vehicle_id,
    (c.start_date + make_interval(months => m.month_no) + ((v.vehicle_id + f.fill_no * 5) % 27)::integer)::date AS fueled_at,
    round((35 + random() * 220)::numeric, 2) AS liters,
    round(((35 + random() * 220) * (5.4 + random() * 1.3))::numeric, 2) AS total_cost,
    18000 + v.vehicle_id * 300 + m.month_no * 1600 + f.fill_no * 420,
    (ARRAY['Posto Alpha', 'Posto Beta', 'Posto Gamma', 'Posto Delta'])[1 + ((v.vehicle_id + f.fill_no) % 4)]
FROM vehicle v
CROSS JOIN lab_config c
CROSS JOIN LATERAL generate_series(0, c.num_months - 1) AS m(month_no)
CROSS JOIN LATERAL generate_series(1, 2) AS f(fill_no);

INSERT INTO odometer_history (vehicle_id, measured_at, odometer_km)
SELECT
    v.vehicle_id,
    (c.start_date + make_interval(months => m.month_no))::date,
    15000 + v.vehicle_id * 280 + m.month_no * (1100 + (v.vehicle_id % 12) * 45)
FROM vehicle v
CROSS JOIN lab_config c
CROSS JOIN LATERAL generate_series(0, c.num_months) AS m(month_no);

ANALYZE;

SELECT 'branch' AS tabela, count(*) AS registros FROM branch
UNION ALL SELECT 'vehicle', count(*) FROM vehicle
UNION ALL SELECT 'driver', count(*) FROM driver
UNION ALL SELECT 'route', count(*) FROM route
UNION ALL SELECT 'vehicle_status_history', count(*) FROM vehicle_status_history
UNION ALL SELECT 'vehicle_assignment', count(*) FROM vehicle_assignment
UNION ALL SELECT 'trip', count(*) FROM trip
UNION ALL SELECT 'maintenance', count(*) FROM maintenance
UNION ALL SELECT 'fueling', count(*) FROM fueling
UNION ALL SELECT 'odometer_history', count(*) FROM odometer_history
ORDER BY tabela;
