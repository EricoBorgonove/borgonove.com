-- ============================================================
-- LABORATÓRIO DE BANCO DE DADOS TEMPORAL - POSTGRESQL 18+
-- Cenário: loja fictícia com preços válidos por período e vendas
-- Autor do exercício: material didático gerado para testes
-- ============================================================

-- ATENÇÃO: este script apaga e recria o schema temporal_lab.

DO $$
BEGIN
    IF current_setting('server_version_num')::integer < 180000 THEN
        RAISE EXCEPTION
            'Este script exige PostgreSQL 18 ou superior. Versão atual: %',
            current_setting('server_version');
    END IF;
END;
$$;

DROP SCHEMA IF EXISTS temporal_lab CASCADE;
CREATE SCHEMA temporal_lab;
SET search_path TO temporal_lab, public;

-- Necessária para que colunas escalares, como bigint, possam
-- participar da chave temporal implementada por índice GiST.
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ------------------------------------------------------------
-- 1. CONFIGURAÇÃO DA MASSA DE DADOS
-- ------------------------------------------------------------
-- Perfil leve:   500 produtos,  24 meses,  20.000 vendas
-- Perfil médio: 2.000 produtos, 72 meses, 250.000 vendas
-- Perfil pesado: 10.000 produtos, 96 meses, 1.000.000 vendas

CREATE TABLE lab_config (
    id              boolean PRIMARY KEY DEFAULT true CHECK (id),
    num_products    integer NOT NULL CHECK (num_products > 0),
    num_months      integer NOT NULL CHECK (num_months > 0),
    num_sales       integer NOT NULL CHECK (num_sales > 0),
    start_date      date NOT NULL
);

INSERT INTO lab_config (num_products, num_months, num_sales, start_date)
VALUES (2000, 72, 250000, DATE '2022-01-01');

-- ------------------------------------------------------------
-- 2. TABELAS DE DOMÍNIO
-- ------------------------------------------------------------

CREATE TABLE category (
    category_id smallint PRIMARY KEY,
    name        text NOT NULL UNIQUE
);

INSERT INTO category (category_id, name)
SELECT ordinalidade::smallint, nome
FROM unnest(ARRAY[
    'Informática',
    'Telefonia',
    'Áudio',
    'Vídeo',
    'Casa Inteligente',
    'Escritório',
    'Games',
    'Fotografia',
    'Redes',
    'Armazenamento',
    'Acessórios',
    'Energia'
]) WITH ORDINALITY AS c(nome, ordinalidade);

CREATE TABLE product (
    product_id   bigint PRIMARY KEY,
    sku          varchar(20) NOT NULL UNIQUE,
    name         text NOT NULL,
    category_id  smallint NOT NULL REFERENCES category(category_id),
    brand        text NOT NULL,
    active       boolean NOT NULL DEFAULT true,
    created_at   timestamptz NOT NULL DEFAULT clock_timestamp()
);

-- ------------------------------------------------------------
-- 3. TABELA TEMPORAL DE PREÇOS
-- ------------------------------------------------------------
-- valid_at representa o TEMPO DE VALIDADE (application time).
-- A chave temporal impede que o mesmo produto possua períodos
-- de preço sobrepostos.

CREATE TABLE product_price (
    product_id   bigint NOT NULL REFERENCES product(product_id),
    price        numeric(12,2) NOT NULL CHECK (price > 0),
    valid_at     daterange NOT NULL,
    source       text NOT NULL DEFAULT 'carga_sintetica',
    recorded_at  timestamptz NOT NULL DEFAULT clock_timestamp(),

    PRIMARY KEY (product_id, valid_at WITHOUT OVERLAPS),
    CHECK (NOT isempty(valid_at)),
    CHECK (lower_inc(valid_at) AND NOT upper_inc(valid_at))
);

-- ------------------------------------------------------------
-- 4. TABELA DE VENDAS COM CHAVE ESTRANGEIRA TEMPORAL
-- ------------------------------------------------------------
-- Uma venda ocupa o intervalo [data_da_venda, dia_seguinte).
-- A FK PERIOD garante que exista um preço cobrindo integralmente
-- o período da venda.

CREATE TABLE sales (
    sale_id          bigint PRIMARY KEY,
    product_id       bigint NOT NULL REFERENCES product(product_id),
    sold_at          date NOT NULL,
    sale_period      daterange NOT NULL,
    quantity         smallint NOT NULL CHECK (quantity BETWEEN 1 AND 10),
    list_price       numeric(12,2) NOT NULL CHECK (list_price > 0),
    discount_percent numeric(5,2) NOT NULL CHECK (discount_percent BETWEEN 0 AND 90),
    unit_price       numeric(12,2) NOT NULL CHECK (unit_price > 0),
    channel          text NOT NULL CHECK (channel IN ('SITE', 'APP', 'LOJA', 'MARKETPLACE')),
    region           text NOT NULL CHECK (region IN ('NORTE', 'NORDESTE', 'CENTRO-OESTE', 'SUDESTE', 'SUL')),
    created_at       timestamptz NOT NULL DEFAULT clock_timestamp(),

    CHECK (sale_period = daterange(sold_at, sold_at + 1, '[)')),
    FOREIGN KEY (product_id, PERIOD sale_period)
        REFERENCES product_price (product_id, PERIOD valid_at)
);

CREATE INDEX idx_sales_product_date ON sales (product_id, sold_at);
CREATE INDEX idx_sales_sold_at ON sales (sold_at);
CREATE INDEX idx_sales_region_date ON sales (region, sold_at);

-- ------------------------------------------------------------
-- 5. GERAÇÃO DOS PRODUTOS
-- ------------------------------------------------------------

WITH brands AS (
    SELECT ARRAY[
        'Auron', 'BitWave', 'Croma', 'Datalink', 'EvoTech',
        'Flux', 'GigaOne', 'Hexa', 'Ion', 'Jupiter',
        'Kronos', 'Lumina', 'MobiX', 'Nexa', 'Orion',
        'Pulse', 'Quantum', 'Raptor', 'Sigma', 'Titan'
    ]::text[] AS values
), cfg AS (
    SELECT num_products FROM lab_config
)
INSERT INTO product (product_id, sku, name, category_id, brand)
SELECT
    g::bigint,
    'SKU-' || lpad(g::text, 6, '0'),
    format(
        '%s %s',
        (SELECT name FROM category WHERE category_id = (1 + ((g - 1) % 12))::smallint),
        lpad(g::text, 5, '0')
    ),
    (1 + ((g - 1) % 12))::smallint,
    b.values[1 + ((g - 1) % array_length(b.values, 1))]
FROM cfg
CROSS JOIN brands b
CROSS JOIN generate_series(1, cfg.num_products) AS g;

-- ------------------------------------------------------------
-- 6. GERAÇÃO DO HISTÓRICO MENSAL DE PREÇOS
-- ------------------------------------------------------------
-- Cada produto recebe um preço por mês, sem lacunas e sem
-- sobreposição, desde start_date até start_date + num_months.

INSERT INTO product_price (product_id, price, valid_at)
SELECT
    p.product_id,
    round((
        20
        + (p.product_id % 500) * 0.82
        + m.month_no * (0.18 + (p.product_id % 9) * 0.025)
        + sin((m.month_no + (p.product_id % 17))::double precision) * 2.5
        + random() * 6
    )::numeric, 2) AS price,
    daterange(
        (c.start_date + make_interval(months => m.month_no))::date,
        (c.start_date + make_interval(months => m.month_no + 1))::date,
        '[)'
    ) AS valid_at
FROM product p
CROSS JOIN lab_config c
CROSS JOIN LATERAL generate_series(0, c.num_months - 1) AS m(month_no);

-- ------------------------------------------------------------
-- 7. GERAÇÃO DAS VENDAS
-- ------------------------------------------------------------

WITH params AS (
    SELECT
        num_products,
        num_sales,
        start_date,
        (start_date + make_interval(months => num_months))::date AS end_date
    FROM lab_config
), generated_sales AS (
    SELECT
        g::bigint AS sale_id,
        (1 + floor(random() * p.num_products))::bigint AS product_id,
        (p.start_date + floor(random() * (p.end_date - p.start_date))::integer)::date AS sold_at,
        (ARRAY[0, 0, 0, 0, 5, 5, 10, 10, 15, 20])[1 + floor(random() * 10)::integer]::numeric AS discount_percent,
        (1 + floor(random() * 5))::smallint AS quantity,
        (ARRAY['SITE', 'APP', 'LOJA', 'MARKETPLACE'])[1 + floor(random() * 4)::integer] AS channel,
        (ARRAY['NORTE', 'NORDESTE', 'CENTRO-OESTE', 'SUDESTE', 'SUL'])[1 + floor(random() * 5)::integer] AS region
    FROM params p
    CROSS JOIN generate_series(1, p.num_sales) AS g
)
INSERT INTO sales (
    sale_id,
    product_id,
    sold_at,
    sale_period,
    quantity,
    list_price,
    discount_percent,
    unit_price,
    channel,
    region
)
SELECT
    gs.sale_id,
    gs.product_id,
    gs.sold_at,
    daterange(gs.sold_at, gs.sold_at + 1, '[)'),
    gs.quantity,
    pp.price,
    gs.discount_percent,
    round((pp.price * (1 - gs.discount_percent / 100.0))::numeric, 2),
    gs.channel,
    gs.region
FROM generated_sales gs
JOIN product_price pp
  ON pp.product_id = gs.product_id
 AND pp.valid_at @> gs.sold_at;

ANALYZE product;
ANALYZE product_price;
ANALYZE sales;

-- ------------------------------------------------------------
-- 8. AUDITORIA DE ALTERAÇÕES (EMULAÇÃO DE SYSTEM TIME)
-- ------------------------------------------------------------
-- O PostgreSQL registra o tempo de validade com os ranges acima.
-- Para guardar o momento em que o banco foi alterado, usamos
-- uma tabela de auditoria e um trigger.

CREATE TABLE product_price_audit (
    audit_id       bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    operation      char(1) NOT NULL CHECK (operation IN ('I', 'U', 'D')),
    product_id     bigint NOT NULL,
    old_price      numeric(12,2),
    new_price      numeric(12,2),
    old_valid_at   daterange,
    new_valid_at   daterange,
    changed_at     timestamptz NOT NULL DEFAULT clock_timestamp(),
    changed_by     text NOT NULL DEFAULT current_user,
    transaction_id bigint NOT NULL DEFAULT txid_current()
);

CREATE OR REPLACE FUNCTION fn_audit_product_price()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO product_price_audit (
            operation, product_id, new_price, new_valid_at
        ) VALUES (
            'I', NEW.product_id, NEW.price, NEW.valid_at
        );
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO product_price_audit (
            operation, product_id,
            old_price, new_price,
            old_valid_at, new_valid_at
        ) VALUES (
            'U', NEW.product_id,
            OLD.price, NEW.price,
            OLD.valid_at, NEW.valid_at
        );
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO product_price_audit (
            operation, product_id, old_price, old_valid_at
        ) VALUES (
            'D', OLD.product_id, OLD.price, OLD.valid_at
        );
    END IF;

    RETURN NULL;
END;
$$;

CREATE TRIGGER trg_audit_product_price
AFTER INSERT OR UPDATE OR DELETE ON product_price
FOR EACH ROW
EXECUTE FUNCTION fn_audit_product_price();

-- ------------------------------------------------------------
-- 9. VIEWS ÚTEIS
-- ------------------------------------------------------------

CREATE VIEW v_current_product_price AS
SELECT
    p.product_id,
    p.sku,
    p.name,
    p.brand,
    c.name AS category,
    pp.price,
    pp.valid_at
FROM product p
JOIN category c USING (category_id)
JOIN product_price pp USING (product_id)
WHERE pp.valid_at @> CURRENT_DATE;

CREATE VIEW v_sales_enriched AS
SELECT
    s.sale_id,
    s.sold_at,
    s.product_id,
    p.sku,
    p.name AS product_name,
    c.name AS category,
    p.brand,
    s.quantity,
    s.list_price,
    s.discount_percent,
    s.unit_price,
    s.quantity * s.unit_price AS total_value,
    s.channel,
    s.region
FROM sales s
JOIN product p USING (product_id)
JOIN category c USING (category_id);

-- ------------------------------------------------------------
-- 10. RESUMO DA CARGA
-- ------------------------------------------------------------

SELECT 'category' AS table_name, count(*) AS rows FROM category
UNION ALL
SELECT 'product', count(*) FROM product
UNION ALL
SELECT 'product_price', count(*) FROM product_price
UNION ALL
SELECT 'sales', count(*) FROM sales
UNION ALL
SELECT 'product_price_audit', count(*) FROM product_price_audit
ORDER BY table_name;

SELECT
    min(lower(valid_at)) AS first_valid_date,
    max(upper(valid_at)) AS last_valid_date,
    count(*) AS price_versions
FROM product_price;
