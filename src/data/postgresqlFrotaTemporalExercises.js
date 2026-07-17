export const postgresqlFrotaTemporalExerciseList = {
  slug: "frota-temporal",
  order: 6,
  title: "Frota Temporal",
  summary: "Pratique bancos de dados temporais em uma frota com veículos, motoristas, alocações, viagens, manutenção, abastecimento, hodômetro e auditoria.",
  level: "Básico a avançado",
  answerPasswordPrefix: "frota",
  files: [
    {
      label: "Baixar criação do banco da frota (.sql)",
      href: "/docs/postgresql/exercicios/frota-temporal/01_criar_banco_frota_temporal.sql",
      fileName: "01_criar_banco_frota_temporal.sql",
    },
  ],
  blocks: [
    {
      slug: "50-questoes-basicas",
      order: 1,
      title: "50 questões básicas",
      summary: "Treine SELECT, filtros, ordenação, agrupamentos simples, joins iniciais, subselects básicos e leitura temporal por data.",
      level: "Básico",
      exercises: [
      {
            "number": 1,
            "question": "Informe a quantidade de registros em branch, vehicle, driver, route, trip, maintenance, fueling e odometer_history.",
            "answer": "SELECT 'branch' AS tabela, count(*) FROM branch\nUNION ALL SELECT 'vehicle', count(*) FROM vehicle\nUNION ALL SELECT 'driver', count(*) FROM driver\nUNION ALL SELECT 'route', count(*) FROM route\nUNION ALL SELECT 'trip', count(*) FROM trip\nUNION ALL SELECT 'maintenance', count(*) FROM maintenance\nUNION ALL SELECT 'fueling', count(*) FROM fueling\nUNION ALL SELECT 'odometer_history', count(*) FROM odometer_history\nORDER BY tabela;"
      },
      {
            "number": 2,
            "question": "Liste os 20 primeiros veículos com placa, modelo, tipo e filial.",
            "answer": "SELECT v.vehicle_id, v.plate, v.model, v.vehicle_type, b.name AS filial\nFROM vehicle v\nJOIN branch b USING (branch_id)\nORDER BY v.vehicle_id\nLIMIT 20;"
      },
      {
            "number": 3,
            "question": "Conte quantos veículos existem por tipo.",
            "answer": "SELECT vehicle_type, count(*) AS veiculos\nFROM vehicle\nGROUP BY vehicle_type\nORDER BY veiculos DESC, vehicle_type;"
      },
      {
            "number": 4,
            "question": "Conte quantos veículos existem por filial.",
            "answer": "SELECT b.name AS filial, count(*) AS veiculos\nFROM branch b\nJOIN vehicle v USING (branch_id)\nGROUP BY b.name\nORDER BY veiculos DESC, filial;"
      },
      {
            "number": 5,
            "question": "Liste os veículos ativos ordenados por placa.",
            "answer": "SELECT vehicle_id, plate, model, vehicle_type\nFROM vehicle\nWHERE active = true\nORDER BY plate;"
      },
      {
            "number": 6,
            "question": "Liste os motoristas ativos com categoria E.",
            "answer": "SELECT driver_id, name, license, category\nFROM driver\nWHERE active = true AND category = 'E'\nORDER BY name;"
      },
      {
            "number": 7,
            "question": "Liste as rotas com distância acima de 900 km.",
            "answer": "SELECT route_id, name, distance_km\nFROM route\nWHERE distance_km > 900\nORDER BY distance_km DESC;"
      },
      {
            "number": 8,
            "question": "Mostre a primeira e a última data coberta pelo histórico de status dos veículos.",
            "answer": "SELECT min(lower(valid_at)) AS primeira_data,\n       max(upper(valid_at)) AS limite_final_exclusivo\nFROM vehicle_status_history;"
      },
      {
            "number": 9,
            "question": "Liste o status atual dos veículos usando o operador @>.",
            "answer": "SELECT v.plate, v.model, h.status, h.valid_at\nFROM vehicle v\nJOIN vehicle_status_history h USING (vehicle_id)\nWHERE h.valid_at @> CURRENT_DATE\nORDER BY v.plate;"
      },
      {
            "number": 10,
            "question": "Liste os veículos em manutenção na data 15/07/2024.",
            "answer": "SELECT v.plate, h.status, h.valid_at\nFROM vehicle v\nJOIN vehicle_status_history h USING (vehicle_id)\nWHERE h.status = 'MANUTENCAO'\n  AND h.valid_at @> DATE '2024-07-15'\nORDER BY v.plate;"
      },
      {
            "number": 11,
            "question": "Liste as alocações do veículo 42 em ordem cronológica.",
            "answer": "SELECT va.vehicle_id, d.name AS motorista, va.assigned_at\nFROM vehicle_assignment va\nJOIN driver d USING (driver_id)\nWHERE va.vehicle_id = 42\nORDER BY lower(va.assigned_at);"
      },
      {
            "number": 12,
            "question": "Informe o motorista responsável pelo veículo 42 em 10/10/2024.",
            "answer": "SELECT v.plate, d.name, va.assigned_at\nFROM vehicle_assignment va\nJOIN vehicle v USING (vehicle_id)\nJOIN driver d USING (driver_id)\nWHERE va.vehicle_id = 42\n  AND va.assigned_at @> DATE '2024-10-10';"
      },
      {
            "number": 13,
            "question": "Liste as 20 viagens mais recentes.",
            "answer": "SELECT trip_id, vehicle_id, driver_id, started_at, ended_at, status\nFROM trip\nORDER BY started_at DESC, trip_id DESC\nLIMIT 20;"
      },
      {
            "number": 14,
            "question": "Conte viagens por status.",
            "answer": "SELECT status, count(*) AS viagens\nFROM trip\nGROUP BY status\nORDER BY viagens DESC;"
      },
      {
            "number": 15,
            "question": "Calcule a receita total de viagens concluídas.",
            "answer": "SELECT round(sum(revenue), 2) AS receita_total\nFROM trip\nWHERE status = 'CONCLUIDA';"
      },
      {
            "number": 16,
            "question": "Calcule distância média, menor e maior das rotas.",
            "answer": "SELECT round(avg(distance_km), 2) AS media,\n       min(distance_km) AS menor,\n       max(distance_km) AS maior\nFROM route;"
      },
      {
            "number": 17,
            "question": "Liste manutenções corretivas concluídas.",
            "answer": "SELECT maintenance_id, vehicle_id, maintenance_period, cost\nFROM maintenance\nWHERE maintenance_type = 'CORRETIVA'\n  AND status = 'CONCLUIDA'\nORDER BY lower(maintenance_period);"
      },
      {
            "number": 18,
            "question": "Liste abastecimentos com mais de 180 litros.",
            "answer": "SELECT fueling_id, vehicle_id, fueled_at, liters, total_cost\nFROM fueling\nWHERE liters > 180\nORDER BY liters DESC;"
      },
      {
            "number": 19,
            "question": "Calcule o custo médio por litro em cada abastecimento.",
            "answer": "SELECT fueling_id, vehicle_id, fueled_at,\n       round(total_cost / liters, 2) AS custo_por_litro\nFROM fueling\nORDER BY fueled_at, fueling_id;"
      },
      {
            "number": 20,
            "question": "Liste medições de hodômetro do veículo 10.",
            "answer": "SELECT vehicle_id, measured_at, odometer_km\nFROM odometer_history\nWHERE vehicle_id = 10\nORDER BY measured_at;"
      },
      {
            "number": 21,
            "question": "Conte quantos motoristas foram contratados por ano.",
            "answer": "SELECT extract(year FROM hired_at)::integer AS ano, count(*) AS motoristas\nFROM driver\nGROUP BY ano\nORDER BY ano;"
      },
      {
            "number": 22,
            "question": "Liste veículos adquiridos a partir de 2021.",
            "answer": "SELECT vehicle_id, plate, acquisition_at\nFROM vehicle\nWHERE acquisition_at >= DATE '2021-01-01'\nORDER BY acquisition_at, plate;"
      },
      {
            "number": 23,
            "question": "Liste placas que começam com FLT00.",
            "answer": "SELECT vehicle_id, plate, model\nFROM vehicle\nWHERE plate LIKE 'FLT00%'\nORDER BY plate;"
      },
      {
            "number": 24,
            "question": "Conte abastecimentos por posto.",
            "answer": "SELECT station, count(*) AS abastecimentos\nFROM fueling\nGROUP BY station\nORDER BY abastecimentos DESC, station;"
      },
      {
            "number": 25,
            "question": "Calcule o custo total de manutenção por tipo.",
            "answer": "SELECT maintenance_type, round(sum(cost), 2) AS custo_total\nFROM maintenance\nGROUP BY maintenance_type\nORDER BY custo_total DESC;"
      },
      {
            "number": 26,
            "question": "Liste viagens que começaram em 2024.",
            "answer": "SELECT trip_id, vehicle_id, started_at, ended_at, revenue\nFROM trip\nWHERE started_at >= DATE '2024-01-01'\n  AND started_at < DATE '2025-01-01'\nORDER BY started_at;"
      },
      {
            "number": 27,
            "question": "Mostre viagens com duração maior que 3 dias.",
            "answer": "SELECT trip_id, vehicle_id, started_at, ended_at,\n       ended_at - started_at AS dias\nFROM trip\nWHERE ended_at - started_at > 3\nORDER BY dias DESC;"
      },
      {
            "number": 28,
            "question": "Calcule receita média por viagem concluída.",
            "answer": "SELECT round(avg(revenue), 2) AS receita_media\nFROM trip\nWHERE status = 'CONCLUIDA';"
      },
      {
            "number": 29,
            "question": "Liste os 10 veículos com maior quantidade de viagens.",
            "answer": "SELECT vehicle_id, count(*) AS viagens\nFROM trip\nGROUP BY vehicle_id\nORDER BY viagens DESC, vehicle_id\nLIMIT 10;"
      },
      {
            "number": 30,
            "question": "Liste os 10 motoristas com maior quantidade de viagens.",
            "answer": "SELECT driver_id, count(*) AS viagens\nFROM trip\nGROUP BY driver_id\nORDER BY viagens DESC, driver_id\nLIMIT 10;"
      },
      {
            "number": 31,
            "question": "Conte manutenções por mês.",
            "answer": "SELECT date_trunc('month', lower(maintenance_period))::date AS mes,\n       count(*) AS manutenções\nFROM maintenance\nGROUP BY mes\nORDER BY mes;"
      },
      {
            "number": 32,
            "question": "Conte abastecimentos por mês.",
            "answer": "SELECT date_trunc('month', fueled_at)::date AS mes,\n       count(*) AS abastecimentos\nFROM fueling\nGROUP BY mes\nORDER BY mes;"
      },
      {
            "number": 33,
            "question": "Calcule litros abastecidos por veículo.",
            "answer": "SELECT vehicle_id, round(sum(liters), 2) AS litros\nFROM fueling\nGROUP BY vehicle_id\nORDER BY litros DESC;"
      },
      {
            "number": 34,
            "question": "Calcule custo total de combustível por veículo.",
            "answer": "SELECT vehicle_id, round(sum(total_cost), 2) AS custo_combustivel\nFROM fueling\nGROUP BY vehicle_id\nORDER BY custo_combustivel DESC;"
      },
      {
            "number": 35,
            "question": "Liste veículos sem viagens registradas usando LEFT JOIN.",
            "answer": "SELECT v.vehicle_id, v.plate\nFROM vehicle v\nLEFT JOIN trip t USING (vehicle_id)\nWHERE t.trip_id IS NULL\nORDER BY v.vehicle_id;"
      },
      {
            "number": 36,
            "question": "Liste motoristas sem viagens registradas usando LEFT JOIN.",
            "answer": "SELECT d.driver_id, d.name\nFROM driver d\nLEFT JOIN trip t USING (driver_id)\nWHERE t.trip_id IS NULL\nORDER BY d.driver_id;"
      },
      {
            "number": 37,
            "question": "Liste veículos com ao menos uma manutenção aberta.",
            "answer": "SELECT DISTINCT v.vehicle_id, v.plate\nFROM vehicle v\nJOIN maintenance m USING (vehicle_id)\nWHERE m.status = 'ABERTA'\nORDER BY v.vehicle_id;"
      },
      {
            "number": 38,
            "question": "Calcule a maior leitura de hodômetro por veículo.",
            "answer": "SELECT vehicle_id, max(odometer_km) AS maior_hodometro\nFROM odometer_history\nGROUP BY vehicle_id\nORDER BY maior_hodometro DESC;"
      },
      {
            "number": 39,
            "question": "Mostre a quilometragem inicial e final geral registrada no hodômetro.",
            "answer": "SELECT min(odometer_km) AS menor_leitura,\n       max(odometer_km) AS maior_leitura\nFROM odometer_history;"
      },
      {
            "number": 40,
            "question": "Liste os veículos cujo modelo é Sprinter.",
            "answer": "SELECT vehicle_id, plate, model, vehicle_type\nFROM vehicle\nWHERE model = 'Sprinter'\nORDER BY plate;"
      },
      {
            "number": 41,
            "question": "Liste viagens com receita entre 3000 e 6000.",
            "answer": "SELECT trip_id, vehicle_id, revenue\nFROM trip\nWHERE revenue BETWEEN 3000 AND 6000\nORDER BY revenue DESC;"
      },
      {
            "number": 42,
            "question": "Conte veículos ativos e inativos.",
            "answer": "SELECT active AS ativo, count(*) AS veiculos\nFROM vehicle\nGROUP BY active\nORDER BY active DESC;"
      },
      {
            "number": 43,
            "question": "Conte motoristas ativos e inativos.",
            "answer": "SELECT active AS ativo, count(*) AS motoristas\nFROM driver\nGROUP BY active\nORDER BY active DESC;"
      },
      {
            "number": 44,
            "question": "Liste rotas ordenadas por origem e destino.",
            "answer": "SELECT r.route_id, bo.city AS origem, bd.city AS destino, r.distance_km\nFROM route r\nJOIN branch bo ON bo.branch_id = r.origin_branch\nJOIN branch bd ON bd.branch_id = r.destination_branch\nORDER BY origem, destino;"
      },
      {
            "number": 45,
            "question": "Liste viagens de veículos que pertencem à filial Matriz Norte usando subselect.",
            "answer": "SELECT trip_id, vehicle_id, started_at, revenue\nFROM trip\nWHERE vehicle_id IN (\n    SELECT vehicle_id\n    FROM vehicle\n    WHERE branch_id = (SELECT branch_id FROM branch WHERE name = 'Matriz Norte')\n)\nORDER BY started_at;"
      },
      {
            "number": 46,
            "question": "Liste veículos cujo último hodômetro está acima de 60.000 km usando subselect.",
            "answer": "SELECT v.vehicle_id, v.plate\nFROM vehicle v\nWHERE (\n    SELECT max(oh.odometer_km)\n    FROM odometer_history oh\n    WHERE oh.vehicle_id = v.vehicle_id\n) > 60000\nORDER BY v.vehicle_id;"
      },
      {
            "number": 47,
            "question": "Calcule a receita total por filial do veículo.",
            "answer": "SELECT b.name AS filial, round(sum(t.revenue), 2) AS receita\nFROM trip t\nJOIN vehicle v USING (vehicle_id)\nJOIN branch b USING (branch_id)\nWHERE t.status = 'CONCLUIDA'\nGROUP BY b.name\nORDER BY receita DESC;"
      },
      {
            "number": 48,
            "question": "Liste os veículos com status DISPONIVEL em 01/03/2024.",
            "answer": "SELECT v.vehicle_id, v.plate, h.valid_at\nFROM vehicle v\nJOIN vehicle_status_history h USING (vehicle_id)\nWHERE h.status = 'DISPONIVEL'\n  AND h.valid_at @> DATE '2024-03-01'\nORDER BY v.vehicle_id;"
      },
      {
            "number": 49,
            "question": "Liste alocações que começam em 2024.",
            "answer": "SELECT vehicle_id, driver_id, assigned_at\nFROM vehicle_assignment\nWHERE lower(assigned_at) >= DATE '2024-01-01'\n  AND lower(assigned_at) < DATE '2025-01-01'\nORDER BY lower(assigned_at), vehicle_id;"
      },
      {
            "number": 50,
            "question": "Crie um resumo geral com total de veículos, motoristas, viagens e manutenções.",
            "answer": "SELECT\n    (SELECT count(*) FROM vehicle) AS veiculos,\n    (SELECT count(*) FROM driver) AS motoristas,\n    (SELECT count(*) FROM trip) AS viagens,\n    (SELECT count(*) FROM maintenance) AS manutencoes;"
      }
],
    },
    {
      slug: "50-questoes-intermediarias",
      order: 2,
      title: "50 questões intermediárias",
      summary: "Pratique joins, agregações, HAVING, EXISTS, NOT EXISTS, CTEs, operadores de range, snapshots e funções de janela.",
      level: "Intermediário",
      exercises: [
      {
            "number": 51,
            "question": "Liste veículo, motorista e período de cada alocação iniciada em 2024.",
            "answer": "SELECT v.plate, d.name AS motorista, va.assigned_at\nFROM vehicle_assignment va\nJOIN vehicle v USING (vehicle_id)\nJOIN driver d USING (driver_id)\nWHERE lower(va.assigned_at) >= DATE '2024-01-01'\n  AND lower(va.assigned_at) < DATE '2025-01-01'\nORDER BY v.plate, lower(va.assigned_at);"
      },
      {
            "number": 52,
            "question": "Para cada viagem, exiba a filial de origem do veículo e a rota realizada.",
            "answer": "SELECT t.trip_id, v.plate, b.name AS filial, r.name AS rota, t.started_at\nFROM trip t\nJOIN vehicle v USING (vehicle_id)\nJOIN branch b USING (branch_id)\nJOIN route r USING (route_id)\nORDER BY t.started_at, t.trip_id;"
      },
      {
            "number": 53,
            "question": "Calcule receita e distância total por motorista.",
            "answer": "SELECT d.driver_id, d.name,\n       round(sum(t.revenue), 2) AS receita,\n       round(sum(t.distance_km), 2) AS distancia\nFROM driver d\nJOIN trip t USING (driver_id)\nWHERE t.status = 'CONCLUIDA'\nGROUP BY d.driver_id, d.name\nORDER BY receita DESC;"
      },
      {
            "number": 54,
            "question": "Calcule receita por tipo de veículo.",
            "answer": "SELECT v.vehicle_type, round(sum(t.revenue), 2) AS receita\nFROM trip t\nJOIN vehicle v USING (vehicle_id)\nWHERE t.status = 'CONCLUIDA'\nGROUP BY v.vehicle_type\nORDER BY receita DESC;"
      },
      {
            "number": 55,
            "question": "Liste veículos com mais de 20 viagens concluídas usando HAVING.",
            "answer": "SELECT vehicle_id, count(*) AS viagens\nFROM trip\nWHERE status = 'CONCLUIDA'\nGROUP BY vehicle_id\nHAVING count(*) > 20\nORDER BY viagens DESC;"
      },
      {
            "number": 56,
            "question": "Liste motoristas com receita acima da média geral por motorista usando subselect.",
            "answer": "WITH receita_motorista AS (\n    SELECT driver_id, sum(revenue) AS receita\n    FROM trip\n    WHERE status = 'CONCLUIDA'\n    GROUP BY driver_id\n)\nSELECT driver_id, round(receita, 2) AS receita\nFROM receita_motorista\nWHERE receita > (SELECT avg(receita) FROM receita_motorista)\nORDER BY receita DESC;"
      },
      {
            "number": 57,
            "question": "Encontre veículos que possuem manutenção e viagem no mesmo mês.",
            "answer": "SELECT DISTINCT t.vehicle_id, date_trunc('month', t.started_at)::date AS mes\nFROM trip t\nWHERE EXISTS (\n    SELECT 1\n    FROM maintenance m\n    WHERE m.vehicle_id = t.vehicle_id\n      AND date_trunc('month', lower(m.maintenance_period)) = date_trunc('month', t.started_at)\n)\nORDER BY t.vehicle_id, mes;"
      },
      {
            "number": 58,
            "question": "Liste veículos sem manutenção preventiva registrada.",
            "answer": "SELECT v.vehicle_id, v.plate\nFROM vehicle v\nWHERE NOT EXISTS (\n    SELECT 1 FROM maintenance m\n    WHERE m.vehicle_id = v.vehicle_id\n      AND m.maintenance_type = 'PREVENTIVA'\n)\nORDER BY v.vehicle_id;"
      },
      {
            "number": 59,
            "question": "Calcule consumo médio aproximado por veículo usando distância de viagens e litros abastecidos.",
            "answer": "WITH km AS (\n    SELECT vehicle_id, sum(distance_km) AS km\n    FROM trip\n    WHERE status = 'CONCLUIDA'\n    GROUP BY vehicle_id\n), litros AS (\n    SELECT vehicle_id, sum(liters) AS litros\n    FROM fueling\n    GROUP BY vehicle_id\n)\nSELECT k.vehicle_id,\n       round(k.km / NULLIF(l.litros, 0), 2) AS km_por_litro\nFROM km k\nJOIN litros l USING (vehicle_id)\nORDER BY km_por_litro DESC;"
      },
      {
            "number": 60,
            "question": "Use LAG para comparar leituras consecutivas de hodômetro.",
            "answer": "SELECT vehicle_id, measured_at, odometer_km,\n       lag(odometer_km) OVER (PARTITION BY vehicle_id ORDER BY measured_at) AS leitura_anterior,\n       odometer_km - lag(odometer_km) OVER (PARTITION BY vehicle_id ORDER BY measured_at) AS variacao\nFROM odometer_history\nORDER BY vehicle_id, measured_at;"
      },
      {
            "number": 61,
            "question": "Use LEAD para verificar o próximo status de cada veículo.",
            "answer": "SELECT vehicle_id, status, valid_at,\n       lead(status) OVER (PARTITION BY vehicle_id ORDER BY lower(valid_at)) AS proximo_status\nFROM vehicle_status_history\nORDER BY vehicle_id, lower(valid_at);"
      },
      {
            "number": 62,
            "question": "Detecte lacunas no histórico de status usando LEAD.",
            "answer": "WITH linha AS (\n    SELECT vehicle_id, valid_at,\n           upper(valid_at) AS fim,\n           lead(lower(valid_at)) OVER (PARTITION BY vehicle_id ORDER BY lower(valid_at)) AS proximo_inicio\n    FROM vehicle_status_history\n)\nSELECT *\nFROM linha\nWHERE proximo_inicio IS NOT NULL\n  AND fim <> proximo_inicio\nORDER BY vehicle_id, fim;"
      },
      {
            "number": 63,
            "question": "Detecte sobreposições no histórico de status com self join.",
            "answer": "SELECT a.vehicle_id, a.valid_at AS periodo_a, b.valid_at AS periodo_b\nFROM vehicle_status_history a\nJOIN vehicle_status_history b\n  ON b.vehicle_id = a.vehicle_id\n AND lower(b.valid_at) > lower(a.valid_at)\n AND b.valid_at && a.valid_at\nORDER BY a.vehicle_id, lower(a.valid_at);"
      },
      {
            "number": 64,
            "question": "Liste períodos de manutenção que se sobrepõem ao primeiro trimestre de 2024.",
            "answer": "SELECT vehicle_id, maintenance_type, maintenance_period\nFROM maintenance\nWHERE maintenance_period && daterange(DATE '2024-01-01', DATE '2024-04-01', '[)')\nORDER BY vehicle_id, lower(maintenance_period);"
      },
      {
            "number": 65,
            "question": "Mostre viagens cujo período contém 15/06/2024.",
            "answer": "SELECT trip_id, vehicle_id, driver_id, trip_period\nFROM trip\nWHERE trip_period @> DATE '2024-06-15'\nORDER BY vehicle_id;"
      },
      {
            "number": 66,
            "question": "Mostre viagens cuja data está contida no período usando <@.",
            "answer": "SELECT trip_id, vehicle_id, trip_period\nFROM trip\nWHERE DATE '2024-06-15' <@ trip_period\nORDER BY trip_id;"
      },
      {
            "number": 67,
            "question": "Liste alocações adjacentes de um mesmo veículo usando -|-.",
            "answer": "SELECT a.vehicle_id, a.assigned_at AS periodo_a, b.assigned_at AS periodo_b\nFROM vehicle_assignment a\nJOIN vehicle_assignment b\n  ON b.vehicle_id = a.vehicle_id\n AND lower(b.assigned_at) > lower(a.assigned_at)\n AND a.assigned_at -|- b.assigned_at\nORDER BY a.vehicle_id, lower(a.assigned_at);"
      },
      {
            "number": 68,
            "question": "Crie um snapshot da frota em 01/08/2024 com veículo, status e motorista.",
            "answer": "SELECT v.plate, h.status, d.name AS motorista\nFROM vehicle v\nJOIN vehicle_status_history h USING (vehicle_id)\nLEFT JOIN vehicle_assignment va\n  ON va.vehicle_id = v.vehicle_id\n AND va.assigned_at @> DATE '2024-08-01'\nLEFT JOIN driver d USING (driver_id)\nWHERE h.valid_at @> DATE '2024-08-01'\nORDER BY v.plate;"
      },
      {
            "number": 69,
            "question": "Calcule quantidade de veículos por status no snapshot de 01/08/2024.",
            "answer": "SELECT h.status, count(*) AS veiculos\nFROM vehicle_status_history h\nWHERE h.valid_at @> DATE '2024-08-01'\nGROUP BY h.status\nORDER BY veiculos DESC;"
      },
      {
            "number": 70,
            "question": "Calcule receita mensal por filial.",
            "answer": "SELECT date_trunc('month', t.started_at)::date AS mes,\n       b.name AS filial,\n       round(sum(t.revenue), 2) AS receita\nFROM trip t\nJOIN vehicle v USING (vehicle_id)\nJOIN branch b USING (branch_id)\nWHERE t.status = 'CONCLUIDA'\nGROUP BY mes, b.name\nORDER BY mes, receita DESC;"
      },
      {
            "number": 71,
            "question": "Calcule custo mensal de manutenção por filial.",
            "answer": "SELECT date_trunc('month', lower(m.maintenance_period))::date AS mes,\n       b.name AS filial,\n       round(sum(m.cost), 2) AS custo\nFROM maintenance m\nJOIN vehicle v USING (vehicle_id)\nJOIN branch b USING (branch_id)\nGROUP BY mes, b.name\nORDER BY mes, custo DESC;"
      },
      {
            "number": 72,
            "question": "Calcule custo mensal de combustível por filial.",
            "answer": "SELECT date_trunc('month', f.fueled_at)::date AS mes,\n       b.name AS filial,\n       round(sum(f.total_cost), 2) AS custo\nFROM fueling f\nJOIN vehicle v USING (vehicle_id)\nJOIN branch b USING (branch_id)\nGROUP BY mes, b.name\nORDER BY mes, custo DESC;"
      },
      {
            "number": 73,
            "question": "Liste veículos com custo de manutenção acima do custo médio dos veículos.",
            "answer": "WITH custos AS (\n    SELECT vehicle_id, sum(cost) AS custo\n    FROM maintenance\n    GROUP BY vehicle_id\n)\nSELECT vehicle_id, round(custo, 2) AS custo\nFROM custos\nWHERE custo > (SELECT avg(custo) FROM custos)\nORDER BY custo DESC;"
      },
      {
            "number": 74,
            "question": "Liste viagens cujo veículo estava em manutenção na mesma data de início.",
            "answer": "SELECT t.trip_id, t.vehicle_id, t.started_at, m.maintenance_period\nFROM trip t\nJOIN maintenance m\n  ON m.vehicle_id = t.vehicle_id\n AND m.maintenance_period @> t.started_at\nORDER BY t.started_at, t.vehicle_id;"
      },
      {
            "number": 75,
            "question": "Liste viagens cujo motorista não era o motorista alocado ao veículo na data de início.",
            "answer": "SELECT t.trip_id, t.vehicle_id, t.driver_id AS motorista_viagem, va.driver_id AS motorista_alocado\nFROM trip t\nLEFT JOIN vehicle_assignment va\n  ON va.vehicle_id = t.vehicle_id\n AND va.assigned_at @> t.started_at\nWHERE va.driver_id IS DISTINCT FROM t.driver_id\nORDER BY t.started_at, t.trip_id;"
      },
      {
            "number": 76,
            "question": "Calcule ranking de veículos por receita usando RANK.",
            "answer": "SELECT vehicle_id,\n       round(sum(revenue), 2) AS receita,\n       rank() OVER (ORDER BY sum(revenue) DESC) AS ranking\nFROM trip\nWHERE status = 'CONCLUIDA'\nGROUP BY vehicle_id\nORDER BY ranking, vehicle_id;"
      },
      {
            "number": 77,
            "question": "Calcule percentual de participação de cada filial na receita total.",
            "answer": "SELECT b.name AS filial,\n       round(sum(t.revenue), 2) AS receita,\n       round(100 * sum(t.revenue) / sum(sum(t.revenue)) OVER (), 2) AS percentual\nFROM trip t\nJOIN vehicle v USING (vehicle_id)\nJOIN branch b USING (branch_id)\nWHERE t.status = 'CONCLUIDA'\nGROUP BY b.name\nORDER BY receita DESC;"
      },
      {
            "number": 78,
            "question": "Use CASE para classificar veículos por quilometragem final.",
            "answer": "WITH final AS (\n    SELECT vehicle_id, max(odometer_km) AS km\n    FROM odometer_history\n    GROUP BY vehicle_id\n)\nSELECT vehicle_id, km,\n       CASE\n           WHEN km < 40000 THEN 'BAIXA'\n           WHEN km < 70000 THEN 'MEDIA'\n           ELSE 'ALTA'\n       END AS faixa_km\nFROM final\nORDER BY km DESC;"
      },
      {
            "number": 79,
            "question": "Calcule o intervalo médio entre abastecimentos por veículo.",
            "answer": "WITH x AS (\n    SELECT vehicle_id, fueled_at,\n           lag(fueled_at) OVER (PARTITION BY vehicle_id ORDER BY fueled_at) AS anterior\n    FROM fueling\n)\nSELECT vehicle_id, round(avg(fueled_at - anterior), 2) AS dias_medios\nFROM x\nWHERE anterior IS NOT NULL\nGROUP BY vehicle_id\nORDER BY dias_medios;"
      },
      {
            "number": 80,
            "question": "Calcule a quantidade de dias em manutenção por veículo.",
            "answer": "SELECT vehicle_id,\n       sum(upper(maintenance_period) - lower(maintenance_period)) AS dias_manutencao\nFROM maintenance\nGROUP BY vehicle_id\nORDER BY dias_manutencao DESC;"
      },
      {
            "number": 81,
            "question": "Liste veículos com mais dias em manutenção que a média.",
            "answer": "WITH dias AS (\n    SELECT vehicle_id, sum(upper(maintenance_period) - lower(maintenance_period)) AS dias\n    FROM maintenance\n    GROUP BY vehicle_id\n)\nSELECT vehicle_id, dias\nFROM dias\nWHERE dias > (SELECT avg(dias) FROM dias)\nORDER BY dias DESC;"
      },
      {
            "number": 82,
            "question": "Use CTE para calcular margem simples: receita menos manutenção e combustível por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS valor FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), manut AS (\n    SELECT vehicle_id, sum(cost) AS valor FROM maintenance GROUP BY vehicle_id\n), comb AS (\n    SELECT vehicle_id, sum(total_cost) AS valor FROM fueling GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.valor,0) - coalesce(m.valor,0) - coalesce(c.valor,0), 2) AS margem\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN manut m USING (vehicle_id)\nLEFT JOIN comb c USING (vehicle_id)\nORDER BY margem DESC;"
      },
      {
            "number": 83,
            "question": "Liste o último status conhecido de cada veículo usando DISTINCT ON.",
            "answer": "SELECT DISTINCT ON (v.vehicle_id)\n       v.vehicle_id, v.plate, h.status, h.valid_at\nFROM vehicle v\nJOIN vehicle_status_history h USING (vehicle_id)\nORDER BY v.vehicle_id, lower(h.valid_at) DESC;"
      },
      {
            "number": 84,
            "question": "Liste a última leitura de hodômetro por veículo usando DISTINCT ON.",
            "answer": "SELECT DISTINCT ON (vehicle_id)\n       vehicle_id, measured_at, odometer_km\nFROM odometer_history\nORDER BY vehicle_id, measured_at DESC;"
      },
      {
            "number": 85,
            "question": "Liste viagens cuja receita por quilômetro está acima de 8.",
            "answer": "SELECT trip_id, vehicle_id,\n       round(revenue / NULLIF(distance_km,0), 2) AS receita_por_km\nFROM trip\nWHERE status = 'CONCLUIDA'\n  AND revenue / NULLIF(distance_km,0) > 8\nORDER BY receita_por_km DESC;"
      },
      {
            "number": 86,
            "question": "Calcule receita por rota e mostre apenas rotas acima da média.",
            "answer": "WITH rota_receita AS (\n    SELECT route_id, sum(revenue) AS receita\n    FROM trip\n    WHERE status = 'CONCLUIDA'\n    GROUP BY route_id\n)\nSELECT route_id, round(receita, 2) AS receita\nFROM rota_receita\nWHERE receita > (SELECT avg(receita) FROM rota_receita)\nORDER BY receita DESC;"
      },
      {
            "number": 87,
            "question": "Encontre o mês de maior receita de cada veículo.",
            "answer": "WITH mensal AS (\n    SELECT vehicle_id, date_trunc('month', started_at)::date AS mes, sum(revenue) AS receita\n    FROM trip\n    WHERE status = 'CONCLUIDA'\n    GROUP BY vehicle_id, mes\n), ranked AS (\n    SELECT *, row_number() OVER (PARTITION BY vehicle_id ORDER BY receita DESC) AS rn\n    FROM mensal\n)\nSELECT vehicle_id, mes, round(receita, 2) AS receita\nFROM ranked\nWHERE rn = 1\nORDER BY vehicle_id;"
      },
      {
            "number": 88,
            "question": "Encontre a rota mais usada por cada filial.",
            "answer": "WITH usos AS (\n    SELECT b.name AS filial, t.route_id, count(*) AS viagens,\n           row_number() OVER (PARTITION BY b.name ORDER BY count(*) DESC) AS rn\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    JOIN branch b USING (branch_id)\n    GROUP BY b.name, t.route_id\n)\nSELECT filial, route_id, viagens\nFROM usos\nWHERE rn = 1\nORDER BY filial;"
      },
      {
            "number": 89,
            "question": "Use subselect correlacionado para listar viagens acima da receita média do próprio veículo.",
            "answer": "SELECT t.trip_id, t.vehicle_id, t.revenue\nFROM trip t\nWHERE t.revenue > (\n    SELECT avg(t2.revenue)\n    FROM trip t2\n    WHERE t2.vehicle_id = t.vehicle_id\n      AND t2.status = 'CONCLUIDA'\n)\nORDER BY t.vehicle_id, t.revenue DESC;"
      },
      {
            "number": 90,
            "question": "Use EXISTS para listar veículos que tiveram abastecimento e manutenção no mesmo dia.",
            "answer": "SELECT DISTINCT v.vehicle_id, v.plate\nFROM vehicle v\nWHERE EXISTS (\n    SELECT 1\n    FROM fueling f\n    JOIN maintenance m\n      ON m.vehicle_id = f.vehicle_id\n     AND m.maintenance_period @> f.fueled_at\n    WHERE f.vehicle_id = v.vehicle_id\n)\nORDER BY v.vehicle_id;"
      },
      {
            "number": 91,
            "question": "Use NOT EXISTS para listar veículos sem status INATIVO no histórico.",
            "answer": "SELECT v.vehicle_id, v.plate\nFROM vehicle v\nWHERE NOT EXISTS (\n    SELECT 1 FROM vehicle_status_history h\n    WHERE h.vehicle_id = v.vehicle_id\n      AND h.status = 'INATIVO'\n)\nORDER BY v.vehicle_id;"
      },
      {
            "number": 92,
            "question": "Calcule o custo total operacional por mês combinando combustível e manutenção.",
            "answer": "WITH custos AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, total_cost AS valor FROM fueling\n    UNION ALL\n    SELECT date_trunc('month', lower(maintenance_period))::date AS mes, cost AS valor FROM maintenance\n)\nSELECT mes, round(sum(valor), 2) AS custo_total\nFROM custos\nGROUP BY mes\nORDER BY mes;"
      },
      {
            "number": 93,
            "question": "Liste veículos cuja alocação cobre integralmente uma viagem usando operador @>.",
            "answer": "SELECT t.trip_id, t.vehicle_id, va.driver_id, t.trip_period, va.assigned_at\nFROM trip t\nJOIN vehicle_assignment va\n  ON va.vehicle_id = t.vehicle_id\n AND va.assigned_at @> lower(t.trip_period)\n AND va.assigned_at @> (upper(t.trip_period) - 1)\nORDER BY t.trip_id;"
      },
      {
            "number": 94,
            "question": "Calcule dias disponíveis por veículo a partir do histórico de status.",
            "answer": "SELECT vehicle_id,\n       sum(upper(valid_at) - lower(valid_at)) FILTER (WHERE status = 'DISPONIVEL') AS dias_disponivel\nFROM vehicle_status_history\nGROUP BY vehicle_id\nORDER BY dias_disponivel DESC;"
      },
      {
            "number": 95,
            "question": "Calcule o percentual de tempo em manutenção por veículo.",
            "answer": "SELECT vehicle_id,\n       round(100.0 * sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status='MANUTENCAO') /\n             NULLIF(sum(upper(valid_at)-lower(valid_at)),0), 2) AS percentual_manutencao\nFROM vehicle_status_history\nGROUP BY vehicle_id\nORDER BY percentual_manutencao DESC;"
      },
      {
            "number": 96,
            "question": "Liste os veículos com mais de três tipos diferentes de manutenção.",
            "answer": "SELECT vehicle_id, count(DISTINCT maintenance_type) AS tipos\nFROM maintenance\nGROUP BY vehicle_id\nHAVING count(DISTINCT maintenance_type) > 3\nORDER BY tipos DESC, vehicle_id;"
      },
      {
            "number": 97,
            "question": "Use range_agg para agregar períodos de status de um veículo em datemultirange.",
            "answer": "SELECT vehicle_id, status, range_agg(valid_at ORDER BY lower(valid_at)) AS periodos\nFROM vehicle_status_history\nWHERE vehicle_id = 42\nGROUP BY vehicle_id, status\nORDER BY status;"
      },
      {
            "number": 98,
            "question": "Liste períodos de status estritamente antes de 2024 usando <<.",
            "answer": "SELECT vehicle_id, status, valid_at\nFROM vehicle_status_history\nWHERE valid_at << daterange(DATE '2024-01-01', DATE '2025-01-01', '[)')\nORDER BY vehicle_id, lower(valid_at);"
      },
      {
            "number": 99,
            "question": "Liste períodos de status estritamente depois de 2024 usando >>.",
            "answer": "SELECT vehicle_id, status, valid_at\nFROM vehicle_status_history\nWHERE valid_at >> daterange(DATE '2024-01-01', DATE '2025-01-01', '[)')\nORDER BY vehicle_id, lower(valid_at);"
      },
      {
            "number": 100,
            "question": "Gere um painel intermediário com veículos, viagens, receita, custo de manutenção e combustível por filial.",
            "answer": "WITH receita AS (\n    SELECT v.branch_id, sum(t.revenue) AS receita\n    FROM trip t JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n    GROUP BY v.branch_id\n), manut AS (\n    SELECT v.branch_id, sum(m.cost) AS manutencao\n    FROM maintenance m JOIN vehicle v USING (vehicle_id)\n    GROUP BY v.branch_id\n), comb AS (\n    SELECT v.branch_id, sum(f.total_cost) AS combustivel\n    FROM fueling f JOIN vehicle v USING (vehicle_id)\n    GROUP BY v.branch_id\n)\nSELECT b.name AS filial,\n       count(v.vehicle_id) AS veiculos,\n       round(coalesce(r.receita,0),2) AS receita,\n       round(coalesce(m.manutencao,0),2) AS manutencao,\n       round(coalesce(c.combustivel,0),2) AS combustivel\nFROM branch b\nLEFT JOIN vehicle v USING (branch_id)\nLEFT JOIN receita r USING (branch_id)\nLEFT JOIN manut m USING (branch_id)\nLEFT JOIN comb c USING (branch_id)\nGROUP BY b.branch_id, b.name, r.receita, m.manutencao, c.combustivel\nORDER BY b.name;"
      }
],
    },
    {
      slug: "150-questoes-avancadas",
      order: 3,
      title: "150 questões avançadas",
      summary: "Aprofunde integridade temporal, auditoria, correções retroativas, subconsultas, CTEs, análise operacional, desempenho e catálogo do PostgreSQL.",
      level: "Avançado",
      exercises: [
      {
            "number": 101,
            "question": "Detecte sobreposições entre viagens do mesmo veículo.",
            "answer": "SELECT a.vehicle_id, a.trip_id AS viagem_a, b.trip_id AS viagem_b, a.trip_period, b.trip_period\nFROM trip a\nJOIN trip b ON b.vehicle_id = a.vehicle_id\n AND b.trip_id > a.trip_id\n AND b.trip_period && a.trip_period\nORDER BY a.vehicle_id, a.trip_id;"
      },
      {
            "number": 102,
            "question": "Detecte motoristas em duas viagens simultâneas.",
            "answer": "SELECT a.driver_id, a.trip_id AS viagem_a, b.trip_id AS viagem_b, a.trip_period, b.trip_period\nFROM trip a\nJOIN trip b ON b.driver_id = a.driver_id\n AND b.trip_id > a.trip_id\n AND b.trip_period && a.trip_period\nORDER BY a.driver_id, a.trip_id;"
      },
      {
            "number": 103,
            "question": "Valide se todas as viagens ocorreram dentro de uma alocação do veículo.",
            "answer": "SELECT t.*\nFROM trip t\nWHERE NOT EXISTS (\n    SELECT 1 FROM vehicle_assignment va\n    WHERE va.vehicle_id = t.vehicle_id\n      AND va.assigned_at @> lower(t.trip_period)\n      AND va.assigned_at @> (upper(t.trip_period) - 1)\n);"
      },
      {
            "number": 104,
            "question": "Valide se o motorista da viagem corresponde ao motorista alocado na data de início.",
            "answer": "SELECT t.trip_id, t.vehicle_id, t.driver_id, va.driver_id AS motorista_alocado\nFROM trip t\nLEFT JOIN vehicle_assignment va\n  ON va.vehicle_id = t.vehicle_id\n AND va.assigned_at @> t.started_at\nWHERE t.driver_id IS DISTINCT FROM va.driver_id;"
      },
      {
            "number": 105,
            "question": "Identifique veículos com viagem iniciada durante manutenção.",
            "answer": "SELECT t.trip_id, t.vehicle_id, t.started_at, m.maintenance_period\nFROM trip t\nJOIN maintenance m ON m.vehicle_id = t.vehicle_id\n AND m.maintenance_period @> t.started_at;"
      },
      {
            "number": 106,
            "question": "Identifique veículos com qualquer sobreposição entre viagem e manutenção.",
            "answer": "SELECT t.trip_id, t.vehicle_id, t.trip_period, m.maintenance_id, m.maintenance_period\nFROM trip t\nJOIN maintenance m ON m.vehicle_id = t.vehicle_id\n AND m.maintenance_period && t.trip_period\nORDER BY t.vehicle_id, t.trip_id;"
      },
      {
            "number": 107,
            "question": "Calcule lacunas entre alocações consecutivas do mesmo veículo.",
            "answer": "WITH x AS (\n    SELECT vehicle_id, assigned_at,\n           lead(lower(assigned_at)) OVER (PARTITION BY vehicle_id ORDER BY lower(assigned_at)) AS proximo_inicio\n    FROM vehicle_assignment\n)\nSELECT vehicle_id, upper(assigned_at) AS fim_atual, proximo_inicio\nFROM x\nWHERE proximo_inicio IS NOT NULL AND upper(assigned_at) <> proximo_inicio;"
      },
      {
            "number": 108,
            "question": "Calcule lacunas entre status consecutivos do mesmo veículo.",
            "answer": "WITH x AS (\n    SELECT vehicle_id, valid_at,\n           lead(lower(valid_at)) OVER (PARTITION BY vehicle_id ORDER BY lower(valid_at)) AS proximo_inicio\n    FROM vehicle_status_history\n)\nSELECT vehicle_id, upper(valid_at) AS fim_atual, proximo_inicio\nFROM x\nWHERE proximo_inicio IS NOT NULL AND upper(valid_at) <> proximo_inicio;"
      },
      {
            "number": 109,
            "question": "Teste uma inserção de status sobreposto e capture o erro.",
            "answer": "DO $$\nBEGIN\n    INSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\n    VALUES (42, 'MANUTENCAO', daterange(DATE '2024-07-10', DATE '2024-07-20', '[)'), 'teste');\nEXCEPTION WHEN exclusion_violation OR unique_violation THEN\n    RAISE NOTICE 'Sobreposição rejeitada: %', SQLERRM;\nEND;\n$$;"
      },
      {
            "number": 110,
            "question": "Teste uma alocação sobreposta para o mesmo veículo e capture o erro.",
            "answer": "DO $$\nBEGIN\n    INSERT INTO vehicle_assignment (vehicle_id, driver_id, assigned_at)\n    VALUES (42, 10, daterange(DATE '2024-07-10', DATE '2024-08-01', '[)'));\nEXCEPTION WHEN exclusion_violation OR unique_violation THEN\n    RAISE NOTICE 'Alocação sobreposta rejeitada: %', SQLERRM;\nEND;\n$$;"
      },
      {
            "number": 111,
            "question": "Teste uma alocação sobreposta para o mesmo motorista e capture o erro.",
            "answer": "DO $$\nBEGIN\n    INSERT INTO vehicle_assignment (vehicle_id, driver_id, assigned_at)\n    VALUES (99, 10, daterange(DATE '2024-07-10', DATE '2024-08-01', '[)'));\nEXCEPTION WHEN exclusion_violation OR unique_violation THEN\n    RAISE NOTICE 'Motorista duplicado no tempo rejeitado: %', SQLERRM;\nEND;\n$$;"
      },
      {
            "number": 112,
            "question": "Identifique ranges vazios em tabelas temporais.",
            "answer": "SELECT 'status' AS origem, count(*) FROM vehicle_status_history WHERE isempty(valid_at)\nUNION ALL\nSELECT 'assignment', count(*) FROM vehicle_assignment WHERE isempty(assigned_at)\nUNION ALL\nSELECT 'maintenance', count(*) FROM maintenance WHERE isempty(maintenance_period);"
      },
      {
            "number": 113,
            "question": "Valide se todos os ranges usam formato [).",
            "answer": "SELECT 'status' AS origem, count(*) AS invalidos\nFROM vehicle_status_history WHERE NOT lower_inc(valid_at) OR upper_inc(valid_at)\nUNION ALL\nSELECT 'assignment', count(*) FROM vehicle_assignment WHERE NOT lower_inc(assigned_at) OR upper_inc(assigned_at)\nUNION ALL\nSELECT 'maintenance', count(*) FROM maintenance WHERE NOT lower_inc(maintenance_period) OR upper_inc(maintenance_period);"
      },
      {
            "number": 114,
            "question": "Monte um snapshot operacional da frota em 15/09/2024.",
            "answer": "SELECT v.plate, b.name AS filial, h.status, d.name AS motorista\nFROM vehicle v\nJOIN branch b USING (branch_id)\nJOIN vehicle_status_history h ON h.vehicle_id = v.vehicle_id AND h.valid_at @> DATE '2024-09-15'\nLEFT JOIN vehicle_assignment va ON va.vehicle_id = v.vehicle_id AND va.assigned_at @> DATE '2024-09-15'\nLEFT JOIN driver d USING (driver_id)\nORDER BY b.name, v.plate;"
      },
      {
            "number": 115,
            "question": "Identifique veículos disponíveis sem motorista alocado em 15/09/2024.",
            "answer": "SELECT v.vehicle_id, v.plate\nFROM vehicle v\nJOIN vehicle_status_history h ON h.vehicle_id = v.vehicle_id AND h.valid_at @> DATE '2024-09-15'\nLEFT JOIN vehicle_assignment va ON va.vehicle_id = v.vehicle_id AND va.assigned_at @> DATE '2024-09-15'\nWHERE h.status = 'DISPONIVEL' AND va.driver_id IS NULL;"
      },
      {
            "number": 116,
            "question": "Identifique veículos em viagem sem viagem registrada no mesmo dia.",
            "answer": "SELECT v.vehicle_id, v.plate, h.valid_at\nFROM vehicle v\nJOIN vehicle_status_history h USING (vehicle_id)\nWHERE h.status = 'EM_VIAGEM'\n  AND NOT EXISTS (\n      SELECT 1 FROM trip t\n      WHERE t.vehicle_id = h.vehicle_id\n        AND t.trip_period && h.valid_at\n  );"
      },
      {
            "number": 117,
            "question": "Compare status temporal com manutenções reais.",
            "answer": "SELECT h.vehicle_id, h.valid_at AS status_periodo, m.maintenance_period\nFROM vehicle_status_history h\nJOIN maintenance m USING (vehicle_id)\nWHERE h.status <> 'MANUTENCAO'\n  AND h.valid_at && m.maintenance_period\nORDER BY h.vehicle_id, lower(h.valid_at);"
      },
      {
            "number": 118,
            "question": "Agrupe períodos de disponibilidade por veículo usando range_agg.",
            "answer": "SELECT vehicle_id, range_agg(valid_at ORDER BY lower(valid_at)) AS periodos_disponiveis\nFROM vehicle_status_history\nWHERE status = 'DISPONIVEL'\nGROUP BY vehicle_id\nORDER BY vehicle_id;"
      },
      {
            "number": 119,
            "question": "Calcule a interseção entre manutenção e o ano de 2024.",
            "answer": "SELECT vehicle_id, maintenance_id,\n       maintenance_period * daterange(DATE '2024-01-01', DATE '2025-01-01', '[)') AS intersecao_2024\nFROM maintenance\nWHERE maintenance_period && daterange(DATE '2024-01-01', DATE '2025-01-01', '[)');"
      },
      {
            "number": 120,
            "question": "Liste períodos de alocação que começam antes e terminam durante 2024.",
            "answer": "SELECT vehicle_id, driver_id, assigned_at\nFROM vehicle_assignment\nWHERE lower(assigned_at) < DATE '2024-01-01'\n  AND upper(assigned_at) > DATE '2024-01-01'\n  AND upper(assigned_at) <= DATE '2025-01-01';"
      },
      {
            "number": 121,
            "question": "Liste veículos com status adjacentes iguais que poderiam ser consolidados.",
            "answer": "WITH x AS (\n    SELECT vehicle_id, status, valid_at,\n           lead(status) OVER (PARTITION BY vehicle_id ORDER BY lower(valid_at)) AS prox_status,\n           lead(valid_at) OVER (PARTITION BY vehicle_id ORDER BY lower(valid_at)) AS prox_periodo\n    FROM vehicle_status_history\n)\nSELECT * FROM x\nWHERE status = prox_status AND valid_at -|- prox_periodo;"
      },
      {
            "number": 122,
            "question": "Identifique manutenções abertas que já deveriam ter terminado.",
            "answer": "SELECT *\nFROM maintenance\nWHERE status = 'ABERTA'\n  AND upper(maintenance_period) < CURRENT_DATE\nORDER BY upper(maintenance_period);"
      },
      {
            "number": 123,
            "question": "Localize o motorista de cada veículo na data da primeira viagem.",
            "answer": "SELECT t.trip_id, t.vehicle_id, t.started_at, d.name\nFROM trip t\nLEFT JOIN vehicle_assignment va ON va.vehicle_id = t.vehicle_id AND va.assigned_at @> t.started_at\nLEFT JOIN driver d USING (driver_id)\nWHERE t.started_at = (SELECT min(t2.started_at) FROM trip t2 WHERE t2.vehicle_id = t.vehicle_id)\nORDER BY t.vehicle_id;"
      },
      {
            "number": 124,
            "question": "Valide cobertura mensal completa de status conforme lab_config.",
            "answer": "SELECT v.vehicle_id, count(h.*) AS periodos, c.num_months AS esperado\nFROM vehicle v\nCROSS JOIN lab_config c\nLEFT JOIN vehicle_status_history h USING (vehicle_id)\nGROUP BY v.vehicle_id, c.num_months\nHAVING count(h.*) <> c.num_months;"
      },
      {
            "number": 125,
            "question": "Monte um painel de qualidade temporal da frota.",
            "answer": "WITH sobreposicoes AS (\n    SELECT count(*) AS qtd FROM vehicle_status_history a\n    JOIN vehicle_status_history b ON b.vehicle_id=a.vehicle_id AND lower(b.valid_at)>lower(a.valid_at) AND b.valid_at && a.valid_at\n), lacunas AS (\n    SELECT count(*) AS qtd FROM (\n        SELECT vehicle_id, upper(valid_at) fim, lead(lower(valid_at)) OVER (PARTITION BY vehicle_id ORDER BY lower(valid_at)) prox\n        FROM vehicle_status_history\n    ) x WHERE prox IS NOT NULL AND fim <> prox\n)\nSELECT (SELECT count(*) FROM vehicle) AS veiculos,\n       (SELECT qtd FROM sobreposicoes) AS sobreposicoes_status,\n       (SELECT qtd FROM lacunas) AS lacunas_status,\n       (SELECT count(*) FROM vehicle_status_history WHERE isempty(valid_at)) AS ranges_vazios;"
      },
      {
            "number": 126,
            "question": "Calcule ranking acumulado de receita por veículo.",
            "answer": "WITH base AS (\n    SELECT vehicle_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 127,
            "question": "Calcule ranking acumulado de receita por motorista.",
            "answer": "WITH base AS (\n    SELECT driver_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 128,
            "question": "Calcule ranking acumulado de receita por rota.",
            "answer": "WITH base AS (\n    SELECT route_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 129,
            "question": "Calcule ranking acumulado de receita por mês.",
            "answer": "WITH base AS (\n    SELECT date_trunc('month', started_at)::date AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 130,
            "question": "Calcule ranking acumulado de receita por filial.",
            "answer": "WITH base AS (\n    SELECT branch_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 131,
            "question": "Calcule ranking acumulado de receita por veículo.",
            "answer": "WITH base AS (\n    SELECT vehicle_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 132,
            "question": "Calcule ranking acumulado de receita por motorista.",
            "answer": "WITH base AS (\n    SELECT driver_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 133,
            "question": "Calcule ranking acumulado de receita por rota.",
            "answer": "WITH base AS (\n    SELECT route_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 134,
            "question": "Calcule ranking acumulado de receita por mês.",
            "answer": "WITH base AS (\n    SELECT date_trunc('month', started_at)::date AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 135,
            "question": "Calcule ranking acumulado de receita por filial.",
            "answer": "WITH base AS (\n    SELECT branch_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 136,
            "question": "Calcule ranking acumulado de receita por veículo.",
            "answer": "WITH base AS (\n    SELECT vehicle_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 137,
            "question": "Calcule ranking acumulado de receita por motorista.",
            "answer": "WITH base AS (\n    SELECT driver_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 138,
            "question": "Calcule ranking acumulado de receita por rota.",
            "answer": "WITH base AS (\n    SELECT route_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 139,
            "question": "Calcule ranking acumulado de receita por mês.",
            "answer": "WITH base AS (\n    SELECT date_trunc('month', started_at)::date AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 140,
            "question": "Calcule ranking acumulado de receita por filial.",
            "answer": "WITH base AS (\n    SELECT branch_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 141,
            "question": "Calcule ranking acumulado de receita por veículo.",
            "answer": "WITH base AS (\n    SELECT vehicle_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 142,
            "question": "Calcule ranking acumulado de receita por motorista.",
            "answer": "WITH base AS (\n    SELECT driver_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 143,
            "question": "Calcule ranking acumulado de receita por rota.",
            "answer": "WITH base AS (\n    SELECT route_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 144,
            "question": "Calcule ranking acumulado de receita por mês.",
            "answer": "WITH base AS (\n    SELECT date_trunc('month', started_at)::date AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 145,
            "question": "Calcule ranking acumulado de receita por filial.",
            "answer": "WITH base AS (\n    SELECT branch_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 146,
            "question": "Calcule ranking acumulado de receita por veículo.",
            "answer": "WITH base AS (\n    SELECT vehicle_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 147,
            "question": "Calcule ranking acumulado de receita por motorista.",
            "answer": "WITH base AS (\n    SELECT driver_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 148,
            "question": "Calcule ranking acumulado de receita por rota.",
            "answer": "WITH base AS (\n    SELECT route_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 149,
            "question": "Calcule ranking acumulado de receita por mês.",
            "answer": "WITH base AS (\n    SELECT date_trunc('month', started_at)::date AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 150,
            "question": "Calcule ranking acumulado de receita por filial.",
            "answer": "WITH base AS (\n    SELECT branch_id AS dimensao, started_at, revenue\n    FROM trip t\n    JOIN vehicle v USING (vehicle_id)\n    WHERE t.status = 'CONCLUIDA'\n)\nSELECT dimensao, started_at,\n       round(sum(revenue) OVER (PARTITION BY dimensao ORDER BY started_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS receita_acumulada,\n       row_number() OVER (PARTITION BY dimensao ORDER BY started_at) AS ordem\nFROM base\nORDER BY dimensao, started_at;"
      },
      {
            "number": 151,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de revenue.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(revenue) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.revenue > m.media\nORDER BY m.mes, x.revenue DESC;"
      },
      {
            "number": 152,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de distance_km.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(distance_km) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.distance_km > m.media\nORDER BY m.mes, x.distance_km DESC;"
      },
      {
            "number": 153,
            "question": "Use subconsulta para encontrar registros de maintenance acima da média mensal de cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', lower(maintenance_period))::date AS mes, avg(cost) AS media\n    FROM maintenance\n    GROUP BY mes\n)\nSELECT x.*\nFROM maintenance x\nJOIN mensal m ON m.mes = date_trunc('month', lower(maintenance_period))::date\nWHERE x.cost > m.media\nORDER BY m.mes, x.cost DESC;"
      },
      {
            "number": 154,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de total_cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(total_cost) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.total_cost > m.media\nORDER BY m.mes, x.total_cost DESC;"
      },
      {
            "number": 155,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de liters.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(liters) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.liters > m.media\nORDER BY m.mes, x.liters DESC;"
      },
      {
            "number": 156,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de revenue.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(revenue) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.revenue > m.media\nORDER BY m.mes, x.revenue DESC;"
      },
      {
            "number": 157,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de distance_km.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(distance_km) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.distance_km > m.media\nORDER BY m.mes, x.distance_km DESC;"
      },
      {
            "number": 158,
            "question": "Use subconsulta para encontrar registros de maintenance acima da média mensal de cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', lower(maintenance_period))::date AS mes, avg(cost) AS media\n    FROM maintenance\n    GROUP BY mes\n)\nSELECT x.*\nFROM maintenance x\nJOIN mensal m ON m.mes = date_trunc('month', lower(maintenance_period))::date\nWHERE x.cost > m.media\nORDER BY m.mes, x.cost DESC;"
      },
      {
            "number": 159,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de total_cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(total_cost) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.total_cost > m.media\nORDER BY m.mes, x.total_cost DESC;"
      },
      {
            "number": 160,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de liters.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(liters) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.liters > m.media\nORDER BY m.mes, x.liters DESC;"
      },
      {
            "number": 161,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de revenue.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(revenue) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.revenue > m.media\nORDER BY m.mes, x.revenue DESC;"
      },
      {
            "number": 162,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de distance_km.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(distance_km) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.distance_km > m.media\nORDER BY m.mes, x.distance_km DESC;"
      },
      {
            "number": 163,
            "question": "Use subconsulta para encontrar registros de maintenance acima da média mensal de cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', lower(maintenance_period))::date AS mes, avg(cost) AS media\n    FROM maintenance\n    GROUP BY mes\n)\nSELECT x.*\nFROM maintenance x\nJOIN mensal m ON m.mes = date_trunc('month', lower(maintenance_period))::date\nWHERE x.cost > m.media\nORDER BY m.mes, x.cost DESC;"
      },
      {
            "number": 164,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de total_cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(total_cost) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.total_cost > m.media\nORDER BY m.mes, x.total_cost DESC;"
      },
      {
            "number": 165,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de liters.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(liters) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.liters > m.media\nORDER BY m.mes, x.liters DESC;"
      },
      {
            "number": 166,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de revenue.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(revenue) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.revenue > m.media\nORDER BY m.mes, x.revenue DESC;"
      },
      {
            "number": 167,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de distance_km.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(distance_km) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.distance_km > m.media\nORDER BY m.mes, x.distance_km DESC;"
      },
      {
            "number": 168,
            "question": "Use subconsulta para encontrar registros de maintenance acima da média mensal de cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', lower(maintenance_period))::date AS mes, avg(cost) AS media\n    FROM maintenance\n    GROUP BY mes\n)\nSELECT x.*\nFROM maintenance x\nJOIN mensal m ON m.mes = date_trunc('month', lower(maintenance_period))::date\nWHERE x.cost > m.media\nORDER BY m.mes, x.cost DESC;"
      },
      {
            "number": 169,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de total_cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(total_cost) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.total_cost > m.media\nORDER BY m.mes, x.total_cost DESC;"
      },
      {
            "number": 170,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de liters.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(liters) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.liters > m.media\nORDER BY m.mes, x.liters DESC;"
      },
      {
            "number": 171,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de revenue.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(revenue) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.revenue > m.media\nORDER BY m.mes, x.revenue DESC;"
      },
      {
            "number": 172,
            "question": "Use subconsulta para encontrar registros de trip acima da média mensal de distance_km.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', started_at)::date AS mes, avg(distance_km) AS media\n    FROM trip\n    GROUP BY mes\n)\nSELECT x.*\nFROM trip x\nJOIN mensal m ON m.mes = date_trunc('month', started_at)::date\nWHERE x.distance_km > m.media\nORDER BY m.mes, x.distance_km DESC;"
      },
      {
            "number": 173,
            "question": "Use subconsulta para encontrar registros de maintenance acima da média mensal de cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', lower(maintenance_period))::date AS mes, avg(cost) AS media\n    FROM maintenance\n    GROUP BY mes\n)\nSELECT x.*\nFROM maintenance x\nJOIN mensal m ON m.mes = date_trunc('month', lower(maintenance_period))::date\nWHERE x.cost > m.media\nORDER BY m.mes, x.cost DESC;"
      },
      {
            "number": 174,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de total_cost.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(total_cost) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.total_cost > m.media\nORDER BY m.mes, x.total_cost DESC;"
      },
      {
            "number": 175,
            "question": "Use subconsulta para encontrar registros de fueling acima da média mensal de liters.",
            "answer": "WITH mensal AS (\n    SELECT date_trunc('month', fueled_at)::date AS mes, avg(liters) AS media\n    FROM fueling\n    GROUP BY mes\n)\nSELECT x.*\nFROM fueling x\nJOIN mensal m ON m.mes = date_trunc('month', fueled_at)::date\nWHERE x.liters > m.media\nORDER BY m.mes, x.liters DESC;"
      },
      {
            "number": 176,
            "question": "Monte indicador avançado de receita líquida por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 177,
            "question": "Monte indicador avançado de custo por km por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 178,
            "question": "Monte indicador avançado de dias parados por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 179,
            "question": "Monte indicador avançado de consumo médio por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 180,
            "question": "Monte indicador avançado de produtividade por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 181,
            "question": "Monte indicador avançado de receita líquida por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 182,
            "question": "Monte indicador avançado de custo por km por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 183,
            "question": "Monte indicador avançado de dias parados por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 184,
            "question": "Monte indicador avançado de consumo médio por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 185,
            "question": "Monte indicador avançado de produtividade por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 186,
            "question": "Monte indicador avançado de receita líquida por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 187,
            "question": "Monte indicador avançado de custo por km por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 188,
            "question": "Monte indicador avançado de dias parados por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 189,
            "question": "Monte indicador avançado de consumo médio por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 190,
            "question": "Monte indicador avançado de produtividade por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 191,
            "question": "Monte indicador avançado de receita líquida por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 192,
            "question": "Monte indicador avançado de custo por km por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 193,
            "question": "Monte indicador avançado de dias parados por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 194,
            "question": "Monte indicador avançado de consumo médio por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 195,
            "question": "Monte indicador avançado de produtividade por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 196,
            "question": "Monte indicador avançado de receita líquida por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 197,
            "question": "Monte indicador avançado de custo por km por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 198,
            "question": "Monte indicador avançado de dias parados por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 199,
            "question": "Monte indicador avançado de consumo médio por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 200,
            "question": "Monte indicador avançado de produtividade por veículo.",
            "answer": "WITH receita AS (\n    SELECT vehicle_id, sum(revenue) AS receita, sum(distance_km) AS km\n    FROM trip WHERE status = 'CONCLUIDA' GROUP BY vehicle_id\n), custos AS (\n    SELECT vehicle_id, sum(valor) AS custo\n    FROM (\n        SELECT vehicle_id, cost AS valor FROM maintenance\n        UNION ALL\n        SELECT vehicle_id, total_cost AS valor FROM fueling\n    ) x GROUP BY vehicle_id\n), parada AS (\n    SELECT vehicle_id, sum(upper(valid_at)-lower(valid_at)) FILTER (WHERE status IN ('MANUTENCAO','INATIVO')) AS dias_parados\n    FROM vehicle_status_history GROUP BY vehicle_id\n)\nSELECT v.vehicle_id, v.plate,\n       round(coalesce(r.receita,0) - coalesce(c.custo,0), 2) AS receita_liquida,\n       round(coalesce(c.custo,0) / NULLIF(r.km,0), 2) AS custo_por_km,\n       coalesce(p.dias_parados,0) AS dias_parados\nFROM vehicle v\nLEFT JOIN receita r USING (vehicle_id)\nLEFT JOIN custos c USING (vehicle_id)\nLEFT JOIN parada p USING (vehicle_id)\nORDER BY receita_liquida DESC;"
      },
      {
            "number": 201,
            "question": "Execute uma correção retroativa segura no status do veículo 1 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 1\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 1\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 202,
            "question": "Execute uma correção retroativa segura no status do veículo 2 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 2\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 2\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 203,
            "question": "Execute uma correção retroativa segura no status do veículo 3 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 3\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 3\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 204,
            "question": "Execute uma correção retroativa segura no status do veículo 4 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 4\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 4\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 205,
            "question": "Execute uma correção retroativa segura no status do veículo 5 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 5\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 5\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 206,
            "question": "Execute uma correção retroativa segura no status do veículo 6 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 6\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 6\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 207,
            "question": "Execute uma correção retroativa segura no status do veículo 7 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 7\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 7\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 208,
            "question": "Execute uma correção retroativa segura no status do veículo 8 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 8\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 8\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 209,
            "question": "Execute uma correção retroativa segura no status do veículo 9 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 9\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 9\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 210,
            "question": "Execute uma correção retroativa segura no status do veículo 10 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 10\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 10\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 211,
            "question": "Execute uma correção retroativa segura no status do veículo 1 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 1\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 1\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 212,
            "question": "Execute uma correção retroativa segura no status do veículo 2 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 2\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 2\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 213,
            "question": "Execute uma correção retroativa segura no status do veículo 3 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 3\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 3\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 214,
            "question": "Execute uma correção retroativa segura no status do veículo 4 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 4\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 4\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 215,
            "question": "Execute uma correção retroativa segura no status do veículo 5 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 5\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 5\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 216,
            "question": "Execute uma correção retroativa segura no status do veículo 6 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 6\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 6\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 217,
            "question": "Execute uma correção retroativa segura no status do veículo 7 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 7\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 7\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 218,
            "question": "Execute uma correção retroativa segura no status do veículo 8 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 8\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 8\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 219,
            "question": "Execute uma correção retroativa segura no status do veículo 9 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 9\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 9\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 220,
            "question": "Execute uma correção retroativa segura no status do veículo 10 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 10\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 10\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 221,
            "question": "Execute uma correção retroativa segura no status do veículo 1 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 1\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 1\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 222,
            "question": "Execute uma correção retroativa segura no status do veículo 2 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 2\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 2\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 223,
            "question": "Execute uma correção retroativa segura no status do veículo 3 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 3\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 3\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 224,
            "question": "Execute uma correção retroativa segura no status do veículo 4 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 4\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 4\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 225,
            "question": "Execute uma correção retroativa segura no status do veículo 5 e consulte a auditoria.",
            "answer": "BEGIN;\nWITH removido AS (\n    DELETE FROM vehicle_status_history\n    WHERE vehicle_id = 5\n      AND valid_at @> DATE '2024-03-10'\n    RETURNING vehicle_id, status, valid_at\n)\nINSERT INTO vehicle_status_history (vehicle_id, status, valid_at, note)\nSELECT vehicle_id, status, daterange(DATE '2024-03-01', DATE '2024-03-15', '[)'), 'correcao_retroativa' FROM removido\nUNION ALL\nSELECT vehicle_id, 'MANUTENCAO', daterange(DATE '2024-03-15', DATE '2024-04-01', '[)'), 'correcao_retroativa' FROM removido;\n\nSELECT * FROM vehicle_status_audit\nWHERE vehicle_id = 5\nORDER BY audit_id DESC;\nROLLBACK;"
      },
      {
            "number": 226,
            "question": "Analise desempenho e metadados da tabela trip.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM trip\nWHERE trip_period && daterange(DATE '2024-01-01', DATE '2024-02-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'trip'\nORDER BY indexname;"
      },
      {
            "number": 227,
            "question": "Analise desempenho e metadados da tabela vehicle_status_history.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_status_history\nWHERE valid_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_status_history'\nORDER BY indexname;"
      },
      {
            "number": 228,
            "question": "Analise desempenho e metadados da tabela vehicle_assignment.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_assignment\nWHERE assigned_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_assignment'\nORDER BY indexname;"
      },
      {
            "number": 229,
            "question": "Analise desempenho e metadados da tabela maintenance.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM maintenance\nWHERE maintenance_period && daterange(DATE '2024-01-01', DATE '2025-01-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'maintenance'\nORDER BY indexname;"
      },
      {
            "number": 230,
            "question": "Analise desempenho e metadados da tabela fueling.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM fueling\nWHERE fueled_at BETWEEN DATE '2024-01-01' AND DATE '2024-12-31';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'fueling'\nORDER BY indexname;"
      },
      {
            "number": 231,
            "question": "Analise desempenho e metadados da tabela trip.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM trip\nWHERE trip_period && daterange(DATE '2024-01-01', DATE '2024-02-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'trip'\nORDER BY indexname;"
      },
      {
            "number": 232,
            "question": "Analise desempenho e metadados da tabela vehicle_status_history.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_status_history\nWHERE valid_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_status_history'\nORDER BY indexname;"
      },
      {
            "number": 233,
            "question": "Analise desempenho e metadados da tabela vehicle_assignment.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_assignment\nWHERE assigned_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_assignment'\nORDER BY indexname;"
      },
      {
            "number": 234,
            "question": "Analise desempenho e metadados da tabela maintenance.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM maintenance\nWHERE maintenance_period && daterange(DATE '2024-01-01', DATE '2025-01-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'maintenance'\nORDER BY indexname;"
      },
      {
            "number": 235,
            "question": "Analise desempenho e metadados da tabela fueling.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM fueling\nWHERE fueled_at BETWEEN DATE '2024-01-01' AND DATE '2024-12-31';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'fueling'\nORDER BY indexname;"
      },
      {
            "number": 236,
            "question": "Analise desempenho e metadados da tabela trip.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM trip\nWHERE trip_period && daterange(DATE '2024-01-01', DATE '2024-02-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'trip'\nORDER BY indexname;"
      },
      {
            "number": 237,
            "question": "Analise desempenho e metadados da tabela vehicle_status_history.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_status_history\nWHERE valid_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_status_history'\nORDER BY indexname;"
      },
      {
            "number": 238,
            "question": "Analise desempenho e metadados da tabela vehicle_assignment.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_assignment\nWHERE assigned_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_assignment'\nORDER BY indexname;"
      },
      {
            "number": 239,
            "question": "Analise desempenho e metadados da tabela maintenance.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM maintenance\nWHERE maintenance_period && daterange(DATE '2024-01-01', DATE '2025-01-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'maintenance'\nORDER BY indexname;"
      },
      {
            "number": 240,
            "question": "Analise desempenho e metadados da tabela fueling.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM fueling\nWHERE fueled_at BETWEEN DATE '2024-01-01' AND DATE '2024-12-31';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'fueling'\nORDER BY indexname;"
      },
      {
            "number": 241,
            "question": "Analise desempenho e metadados da tabela trip.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM trip\nWHERE trip_period && daterange(DATE '2024-01-01', DATE '2024-02-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'trip'\nORDER BY indexname;"
      },
      {
            "number": 242,
            "question": "Analise desempenho e metadados da tabela vehicle_status_history.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_status_history\nWHERE valid_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_status_history'\nORDER BY indexname;"
      },
      {
            "number": 243,
            "question": "Analise desempenho e metadados da tabela vehicle_assignment.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_assignment\nWHERE assigned_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_assignment'\nORDER BY indexname;"
      },
      {
            "number": 244,
            "question": "Analise desempenho e metadados da tabela maintenance.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM maintenance\nWHERE maintenance_period && daterange(DATE '2024-01-01', DATE '2025-01-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'maintenance'\nORDER BY indexname;"
      },
      {
            "number": 245,
            "question": "Analise desempenho e metadados da tabela fueling.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM fueling\nWHERE fueled_at BETWEEN DATE '2024-01-01' AND DATE '2024-12-31';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'fueling'\nORDER BY indexname;"
      },
      {
            "number": 246,
            "question": "Analise desempenho e metadados da tabela trip.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM trip\nWHERE trip_period && daterange(DATE '2024-01-01', DATE '2024-02-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'trip'\nORDER BY indexname;"
      },
      {
            "number": 247,
            "question": "Analise desempenho e metadados da tabela vehicle_status_history.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_status_history\nWHERE valid_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_status_history'\nORDER BY indexname;"
      },
      {
            "number": 248,
            "question": "Analise desempenho e metadados da tabela vehicle_assignment.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM vehicle_assignment\nWHERE assigned_at @> DATE '2024-06-15';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'vehicle_assignment'\nORDER BY indexname;"
      },
      {
            "number": 249,
            "question": "Analise desempenho e metadados da tabela maintenance.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM maintenance\nWHERE maintenance_period && daterange(DATE '2024-01-01', DATE '2025-01-01', '[)');\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'maintenance'\nORDER BY indexname;"
      },
      {
            "number": 250,
            "question": "Analise desempenho e metadados da tabela fueling.",
            "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM fueling\nWHERE fueled_at BETWEEN DATE '2024-01-01' AND DATE '2024-12-31';\n\nSELECT tablename, indexname, indexdef\nFROM pg_indexes\nWHERE schemaname = 'frota_temporal'\n  AND tablename = 'fueling'\nORDER BY indexname;"
      }
],
    },
  ],
};
