export const postgresqlLojaTemporalExerciseList = {
  "slug": "loja-temporal",
  "order": 5,
  "title": "Loja Temporal",
  "summary": "Pratique bancos de dados temporais em uma loja fictícia com histórico de preços, vendas, ranges, snapshots, auditoria e integridade temporal.",
  "level": "Intermediário a avançado",
  "answerPasswordPrefix": "loja",
  "files": [
    {
      "label": "Baixar criação do banco temporal (.sql)",
      "href": "/docs/postgresql/exercicios/loja-temporal/01_criar_banco_pg18.sql",
      "fileName": "01_criar_banco_pg18.sql"
    }
  ],
  "blocks": [
    {
      "slug": "laboratorio-guiado",
      "order": 1,
      "title": "15 questões guiadas",
      "summary": "Comece pelo reconhecimento da base, consultas pontuais no tempo, integridade temporal, auditoria, desempenho e análise avançada.",
      "level": "Intermediário",
      "exercises": [
        {
          "number": 1,
          "question": "a) Informe a quantidade de produtos, versões de preço e vendas.\nb) Informe a primeira e a última data coberta pelo histórico.",
          "answer": "SELECT 'product' AS table_name, count(*) AS rows FROM product\nUNION ALL\nSELECT 'product_price', count(*) FROM product_price\nUNION ALL\nSELECT 'sales', count(*) FROM sales;\n\nSELECT\n    min(lower(valid_at)) AS first_date,\n    max(upper(valid_at)) AS last_date\nFROM product_price;"
        },
        {
          "number": 2,
          "question": "Localize o preço do produto SKU-000042 em 15/07/2024.\nExiba SKU, nome, preço e período de validade.",
          "answer": "SELECT p.sku, p.name, pp.price, pp.valid_at\nFROM product p\nJOIN product_price pp USING (product_id)\nWHERE p.sku = 'SKU-000042'\n  AND pp.valid_at @> DATE '2024-07-15';"
        },
        {
          "number": 3,
          "question": "Liste os 20 produtos mais caros na data atual.\nUse o operador de contenção de ranges (@>).",
          "answer": "SELECT p.sku, p.name, pp.price, pp.valid_at\nFROM product p\nJOIN product_price pp USING (product_id)\nWHERE pp.valid_at @> CURRENT_DATE\nORDER BY pp.price DESC\nLIMIT 20;"
        },
        {
          "number": 4,
          "question": "Apresente toda a evolução do preço do produto SKU-000100,\nordenada cronologicamente, incluindo a variação percentual em\nrelação ao período anterior. Use LAG().",
          "answer": "WITH timeline AS (\n    SELECT\n        p.sku,\n        p.name,\n        pp.price,\n        pp.valid_at,\n        lag(pp.price) OVER (\n            PARTITION BY pp.product_id\n            ORDER BY lower(pp.valid_at)\n        ) AS previous_price\n    FROM product p\n    JOIN product_price pp USING (product_id)\n    WHERE p.sku = 'SKU-000100'\n)\nSELECT\n    sku,\n    name,\n    price,\n    valid_at,\n    previous_price,\n    round(\n        100 * (price - previous_price) / NULLIF(previous_price, 0),\n        2\n    ) AS variation_percent\nFROM timeline\nORDER BY lower(valid_at);"
        },
        {
          "number": 5,
          "question": "Encontre os 20 maiores aumentos percentuais mensais de preço\nde toda a base. Exiba produto, preço anterior, novo preço,\ndata inicial do novo período e percentual de aumento.",
          "answer": "WITH changes AS (\n    SELECT\n        pp.product_id,\n        p.sku,\n        p.name,\n        lower(pp.valid_at) AS start_date,\n        pp.price AS new_price,\n        lag(pp.price) OVER (\n            PARTITION BY pp.product_id\n            ORDER BY lower(pp.valid_at)\n        ) AS old_price\n    FROM product_price pp\n    JOIN product p USING (product_id)\n)\nSELECT\n    sku,\n    name,\n    old_price,\n    new_price,\n    start_date,\n    round(100 * (new_price - old_price) / NULLIF(old_price, 0), 2) AS increase_percent\nFROM changes\nWHERE new_price > old_price\nORDER BY increase_percent DESC\nLIMIT 20;"
        },
        {
          "number": 6,
          "question": "Tente inserir para o produto 42 um período que se sobreponha\na julho de 2024. Registre e explique o erro produzido pelo banco.\nDica: a operação deve ser feita dentro de uma transação e\nfinalizada com ROLLBACK.",
          "answer": "BEGIN;\nINSERT INTO product_price (product_id, price, valid_at, source)\nVALUES (\n    42,\n    999.90,\n    daterange(DATE '2024-07-10', DATE '2024-07-25', '[)'),\n    'teste_sobreposicao'\n);\nROLLBACK;\n-- Resultado esperado: erro de violação da chave temporal,\n-- pois o intervalo se sobrepõe ao período mensal existente."
        },
        {
          "number": 7,
          "question": "Verifique se existem lacunas entre os períodos de preços de\ncada produto. Use LEAD() para comparar o fim de um período com\no início do período seguinte.",
          "answer": "WITH periods AS (\n    SELECT\n        product_id,\n        valid_at,\n        upper(valid_at) AS current_end,\n        lead(lower(valid_at)) OVER (\n            PARTITION BY product_id\n            ORDER BY lower(valid_at)\n        ) AS next_start\n    FROM product_price\n)\nSELECT product_id, valid_at, current_end, next_start\nFROM periods\nWHERE next_start IS NOT NULL\n  AND current_end <> next_start\nORDER BY product_id, current_end;\n-- Resultado esperado antes das alterações: zero linhas."
        },
        {
          "number": 8,
          "question": "Para as vendas realizadas em 2025, associe cada venda ao preço\nválido no dia em que ela ocorreu. Compare o preço histórico da\ntabela product_price com o list_price gravado na venda.\nMostre somente divergências.",
          "answer": "SELECT\n    s.sale_id,\n    s.product_id,\n    s.sold_at,\n    s.list_price AS recorded_list_price,\n    pp.price AS historical_price\nFROM sales s\nJOIN product_price pp\n  ON pp.product_id = s.product_id\n AND pp.valid_at @> s.sold_at\nWHERE s.sold_at >= DATE '2025-01-01'\n  AND s.sold_at <  DATE '2026-01-01'\n  AND s.list_price <> pp.price\nORDER BY s.sold_at, s.sale_id;\n-- Resultado esperado antes de correções retroativas: zero linhas."
        },
        {
          "number": 9,
          "question": "Calcule, por mês e por região, a quantidade vendida e a receita.\nApresente apenas os 25 meses/regiões com maior receita.",
          "answer": "SELECT\n    date_trunc('month', sold_at)::date AS month,\n    region,\n    sum(quantity) AS units,\n    round(sum(quantity * unit_price), 2) AS revenue\nFROM sales\nGROUP BY date_trunc('month', sold_at)::date, region\nORDER BY revenue DESC\nLIMIT 25;"
        },
        {
          "number": 10,
          "question": "Gere uma fotografia do catálogo em 01/06/2023, contendo todos\nos produtos e os preços válidos naquela data. Calcule o preço\nmédio por categoria nesse snapshot.",
          "answer": "SELECT\n    c.name AS category,\n    count(*) AS products,\n    round(avg(pp.price), 2) AS average_price,\n    min(pp.price) AS minimum_price,\n    max(pp.price) AS maximum_price\nFROM product p\nJOIN category c USING (category_id)\nJOIN product_price pp USING (product_id)\nWHERE pp.valid_at @> DATE '2023-06-01'\nGROUP BY c.name\nORDER BY average_price DESC;"
        },
        {
          "number": 11,
          "question": "Para o produto 100, divida o período de março de 2025 em dois:\n  [01/03/2025, 15/03/2025) mantendo o preço original;\n  [15/03/2025, 01/04/2025) com aumento de 8%.\nFaça a operação de forma atômica usando BEGIN/COMMIT.\nDepois consulte product_price_audit.",
          "answer": "BEGIN;\n\nWITH original AS (\n    DELETE FROM product_price\n    WHERE product_id = 100\n      AND valid_at @> DATE '2025-03-10'\n    RETURNING product_id, price, valid_at\n)\nINSERT INTO product_price (product_id, price, valid_at, source)\nSELECT\n    product_id,\n    price,\n    daterange(DATE '2025-03-01', DATE '2025-03-15', '[)'),\n    'correcao_retroativa'\nFROM original\nUNION ALL\nSELECT\n    product_id,\n    round(price * 1.08, 2),\n    daterange(DATE '2025-03-15', DATE '2025-04-01', '[)'),\n    'correcao_retroativa'\nFROM original;\n\nCOMMIT;\n\nSELECT *\nFROM product_price_audit\nWHERE product_id = 100\nORDER BY audit_id;"
        },
        {
          "number": 12,
          "question": "Tente cadastrar uma venda com sale_period fora de todo o\nhistórico de preços do produto. Explique por que a FK PERIOD\nrejeita a operação.",
          "answer": "BEGIN;\nINSERT INTO sales (\n    sale_id, product_id, sold_at, sale_period, quantity,\n    list_price, discount_percent, unit_price, channel, region\n)\nVALUES (\n    999999999,\n    42,\n    DATE '2035-01-10',\n    daterange(DATE '2035-01-10', DATE '2035-01-11', '[)'),\n    1,\n    100.00,\n    0,\n    100.00,\n    'SITE',\n    'NORTE'\n);\nROLLBACK;\n-- Resultado esperado: violação da chave estrangeira temporal."
        },
        {
          "number": 13,
          "question": "Atualize o preço de um período futuro do produto 200 em 3%.\nEm seguida, consulte a auditoria mostrando valores antigo e\nnovo, usuário, instante e identificador da transação.",
          "answer": "UPDATE product_price\nSET price = round(price * 1.03, 2),\n    source = 'ajuste_planejado'\nWHERE product_id = 200\n  AND valid_at @> DATE '2027-03-10';\n\nSELECT\n    audit_id,\n    operation,\n    product_id,\n    old_price,\n    new_price,\n    old_valid_at,\n    new_valid_at,\n    changed_at,\n    changed_by,\n    transaction_id\nFROM product_price_audit\nWHERE product_id = 200\nORDER BY audit_id DESC;"
        },
        {
          "number": 14,
          "question": "Execute EXPLAIN (ANALYZE, BUFFERS) para a busca do preço do\nproduto 500 em 10/10/2026. Identifique o índice utilizado.",
          "answer": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT price, valid_at\nFROM product_price\nWHERE product_id = 500\n  AND valid_at @> DATE '2026-10-10';"
        },
        {
          "number": 15,
          "question": "Encontre os produtos que tiveram pelo menos seis aumentos\nconsecutivos de preço. Sugestão: use LAG(), soma acumulada e\nagrupamento de sequências (gaps and islands).",
          "answer": "WITH ordered_prices AS (\n    SELECT\n        product_id,\n        lower(valid_at) AS start_date,\n        price,\n        lag(price) OVER (\n            PARTITION BY product_id\n            ORDER BY lower(valid_at)\n        ) AS previous_price\n    FROM product_price\n), marked AS (\n    SELECT\n        *,\n        CASE WHEN price > previous_price THEN 1 ELSE 0 END AS is_increase\n    FROM ordered_prices\n), islands AS (\n    SELECT\n        *,\n        sum(CASE WHEN is_increase = 0 THEN 1 ELSE 0 END) OVER (\n            PARTITION BY product_id\n            ORDER BY start_date\n        ) AS group_id\n    FROM marked\n), streaks AS (\n    SELECT\n        product_id,\n        group_id,\n        min(start_date) AS streak_start,\n        max(start_date) AS streak_end,\n        count(*) FILTER (WHERE is_increase = 1) AS consecutive_increases\n    FROM islands\n    GROUP BY product_id, group_id\n)\nSELECT\n    p.sku,\n    p.name,\n    s.streak_start,\n    s.streak_end,\n    s.consecutive_increases\nFROM streaks s\nJOIN product p USING (product_id)\nWHERE s.consecutive_increases >= 6\nORDER BY s.consecutive_increases DESC, p.sku;"
        }
      ]
    },
    {
      "slug": "100-questoes-diversas",
      "order": 2,
      "title": "100 questões diversas",
      "summary": "Resolva uma lista unificada com exploração da base, ranges, snapshots, funções de janela, vendas, junções temporais e auditoria.",
      "level": "Intermediário a avançado",
      "exercises": [
        {
          "number": 1,
          "question": "Informe a quantidade de registros existentes em category, product, product_price, sales e product_price_audit.",
          "answer": "SELECT 'category' AS tabela, count(*) AS registros FROM category\nUNION ALL SELECT 'product', count(*) FROM product\nUNION ALL SELECT 'product_price', count(*) FROM product_price\nUNION ALL SELECT 'sales', count(*) FROM sales\nUNION ALL SELECT 'product_price_audit', count(*) FROM product_price_audit\nORDER BY tabela;"
        },
        {
          "number": 2,
          "question": "Informe a primeira data, a última data e a quantidade total de dias cobertos pelo histórico de preços.",
          "answer": "SELECT\n    min(lower(valid_at)) AS primeira_data,\n    max(upper(valid_at)) AS limite_final_exclusivo,\n    max(upper(valid_at)) - min(lower(valid_at)) AS dias_cobertos\nFROM product_price;"
        },
        {
          "number": 3,
          "question": "Liste as categorias e a quantidade de produtos em cada uma, da maior para a menor quantidade.",
          "answer": "SELECT c.name AS categoria, count(*) AS produtos\nFROM category c\nJOIN product p USING (category_id)\nGROUP BY c.name\nORDER BY produtos DESC, categoria;"
        },
        {
          "number": 4,
          "question": "Liste as marcas e a quantidade de produtos de cada marca.",
          "answer": "SELECT brand AS marca, count(*) AS produtos\nFROM product\nGROUP BY brand\nORDER BY produtos DESC, marca;"
        },
        {
          "number": 5,
          "question": "Mostre quantos produtos estão ativos e quantos estão inativos.",
          "answer": "SELECT active AS ativo, count(*) AS produtos\nFROM product\nGROUP BY active\nORDER BY active DESC;"
        },
        {
          "number": 6,
          "question": "Exiba os 20 primeiros produtos com product_id, SKU, nome, categoria e marca.",
          "answer": "SELECT p.product_id, p.sku, p.name, c.name AS categoria, p.brand\nFROM product p\nJOIN category c USING (category_id)\nORDER BY p.product_id\nLIMIT 20;"
        },
        {
          "number": 7,
          "question": "Apresente toda a linha do tempo de preços do produto SKU-000042 em ordem cronológica.",
          "answer": "SELECT p.sku, p.name, pp.price, pp.valid_at, pp.source, pp.recorded_at\nFROM product p\nJOIN product_price pp USING (product_id)\nWHERE p.sku = 'SKU-000042'\nORDER BY lower(pp.valid_at);"
        },
        {
          "number": 8,
          "question": "Conte quantos produtos possuem preço válido na data atual.",
          "answer": "SELECT count(DISTINCT product_id) AS produtos_com_preco_atual\nFROM product_price\nWHERE valid_at @> CURRENT_DATE;"
        },
        {
          "number": 9,
          "question": "Calcule o menor, o maior, a média e o desvio-padrão de todos os preços históricos.",
          "answer": "SELECT\n    min(price) AS menor_preco,\n    max(price) AS maior_preco,\n    round(avg(price), 2) AS media,\n    round(stddev_samp(price), 2) AS desvio_padrao\nFROM product_price;"
        },
        {
          "number": 10,
          "question": "Calcule o preço histórico médio por categoria, considerando todas as versões de preço.",
          "answer": "SELECT c.name AS categoria, round(avg(pp.price), 2) AS preco_medio_historico\nFROM category c\nJOIN product p USING (category_id)\nJOIN product_price pp USING (product_id)\nGROUP BY c.name\nORDER BY preco_medio_historico DESC;"
        },
        {
          "number": 11,
          "question": "Liste os 20 produtos mais caros em 15/01/2024.",
          "answer": "SELECT p.sku, p.name, c.name AS categoria, pp.price, pp.valid_at\nFROM product p\nJOIN category c USING (category_id)\nJOIN product_price pp USING (product_id)\nWHERE pp.valid_at @> DATE '2024-01-15'\nORDER BY pp.price DESC\nLIMIT 20;"
        },
        {
          "number": 12,
          "question": "Liste os 20 produtos mais baratos em 15/01/2024.",
          "answer": "SELECT p.sku, p.name, c.name AS categoria, pp.price, pp.valid_at\nFROM product p\nJOIN category c USING (category_id)\nJOIN product_price pp USING (product_id)\nWHERE pp.valid_at @> DATE '2024-01-15'\nORDER BY pp.price, p.sku\nLIMIT 20;"
        },
        {
          "number": 13,
          "question": "Liste todos os produtos da categoria Informática, ordenados por marca e nome.",
          "answer": "SELECT p.product_id, p.sku, p.name, p.brand\nFROM product p\nJOIN category c USING (category_id)\nWHERE c.name = 'Informática'\nORDER BY p.brand, p.name;"
        },
        {
          "number": 14,
          "question": "Conte as vendas por canal e calcule o percentual de participação de cada canal.",
          "answer": "SELECT\n    channel AS canal,\n    count(*) AS vendas,\n    round(100.0 * count(*) / sum(count(*)) OVER (), 2) AS participacao_percentual\nFROM sales\nGROUP BY channel\nORDER BY vendas DESC;"
        },
        {
          "number": 15,
          "question": "Conte as vendas por região e calcule o percentual de participação de cada região.",
          "answer": "SELECT\n    region AS regiao,\n    count(*) AS vendas,\n    round(100.0 * count(*) / sum(count(*)) OVER (), 2) AS participacao_percentual\nFROM sales\nGROUP BY region\nORDER BY vendas DESC;"
        },
        {
          "number": 16,
          "question": "Informe a quantidade de vendas por ano.",
          "answer": "SELECT extract(year FROM sold_at)::integer AS ano, count(*) AS vendas\nFROM sales\nGROUP BY ano\nORDER BY ano;"
        },
        {
          "number": 17,
          "question": "Informe a primeira e a última venda registrada para cada produto.",
          "answer": "SELECT p.sku, min(s.sold_at) AS primeira_venda, max(s.sold_at) AS ultima_venda\nFROM product p\nLEFT JOIN sales s USING (product_id)\nGROUP BY p.product_id, p.sku\nORDER BY p.product_id;"
        },
        {
          "number": 18,
          "question": "Encontre os produtos que ainda não possuem nenhuma venda.",
          "answer": "SELECT p.product_id, p.sku, p.name\nFROM product p\nLEFT JOIN sales s USING (product_id)\nWHERE s.sale_id IS NULL\nORDER BY p.product_id;"
        },
        {
          "number": 19,
          "question": "Calcule a quantidade média de versões de preço por produto.",
          "answer": "SELECT round(avg(versoes), 2) AS media_versoes_por_produto\nFROM (\n    SELECT product_id, count(*) AS versoes\n    FROM product_price\n    GROUP BY product_id\n) x;"
        },
        {
          "number": 20,
          "question": "Confirme se todos os produtos possuem exatamente a quantidade de versões definida em lab_config.num_months.",
          "answer": "SELECT p.product_id, p.sku, count(pp.*) AS versoes, cfg.num_months AS esperado\nFROM product p\nCROSS JOIN lab_config cfg\nLEFT JOIN product_price pp USING (product_id)\nGROUP BY p.product_id, p.sku, cfg.num_months\nHAVING count(pp.*) <> cfg.num_months\nORDER BY p.product_id;\n-- Resultado esperado: zero linhas na carga original."
        },
        {
          "number": 21,
          "question": "Para o produto 42, exiba valid_at, lower(valid_at), upper(valid_at) e a duração em dias de cada período.",
          "answer": "SELECT\n    valid_at,\n    lower(valid_at) AS inicio,\n    upper(valid_at) AS fim_exclusivo,\n    upper(valid_at) - lower(valid_at) AS duracao_dias\nFROM product_price\nWHERE product_id = 42\nORDER BY lower(valid_at);"
        },
        {
          "number": 22,
          "question": "Localize o preço do produto 42 em 15/07/2024 usando o operador @>.",
          "answer": "SELECT product_id, price, valid_at\nFROM product_price\nWHERE product_id = 42\n  AND valid_at @> DATE '2024-07-15';"
        },
        {
          "number": 23,
          "question": "Resolva a questão anterior usando a forma inversa: a data deve estar contida no range com o operador <@.",
          "answer": "SELECT product_id, price, valid_at\nFROM product_price\nWHERE product_id = 42\n  AND DATE '2024-07-15' <@ valid_at;"
        },
        {
          "number": 24,
          "question": "Liste os períodos de preço que se sobrepõem ao primeiro trimestre de 2025 usando &&.",
          "answer": "SELECT product_id, price, valid_at\nFROM product_price\nWHERE valid_at && daterange(DATE '2025-01-01', DATE '2025-04-01', '[)')\nORDER BY product_id, lower(valid_at);"
        },
        {
          "number": 25,
          "question": "Encontre pares de períodos adjacentes do produto 100 usando o operador -|-.",
          "answer": "SELECT a.valid_at AS periodo_a, b.valid_at AS periodo_b\nFROM product_price a\nJOIN product_price b\n  ON b.product_id = a.product_id\n AND lower(b.valid_at) > lower(a.valid_at)\n AND a.valid_at -|- b.valid_at\nWHERE a.product_id = 100\nORDER BY lower(a.valid_at);"
        },
        {
          "number": 26,
          "question": "Liste os períodos do produto 100 que estão estritamente antes de julho de 2025 usando <<.",
          "answer": "SELECT price, valid_at\nFROM product_price\nWHERE product_id = 100\n  AND valid_at << daterange(DATE '2025-07-01', DATE '2025-08-01', '[)')\nORDER BY lower(valid_at);"
        },
        {
          "number": 27,
          "question": "Liste os períodos do produto 100 que estão estritamente depois de julho de 2025 usando >>.",
          "answer": "SELECT price, valid_at\nFROM product_price\nWHERE product_id = 100\n  AND valid_at >> daterange(DATE '2025-07-01', DATE '2025-08-01', '[)')\nORDER BY lower(valid_at);"
        },
        {
          "number": 28,
          "question": "Demonstre o operador &< com os períodos do produto 100 em relação ao intervalo de julho de 2025.",
          "answer": "SELECT price, valid_at,\n       valid_at &< daterange(DATE '2025-07-01', DATE '2025-08-01', '[)') AS nao_estende_direita\nFROM product_price\nWHERE product_id = 100\nORDER BY lower(valid_at);"
        },
        {
          "number": 29,
          "question": "Demonstre o operador &> com os períodos do produto 100 em relação ao intervalo de julho de 2025.",
          "answer": "SELECT price, valid_at,\n       valid_at &> daterange(DATE '2025-07-01', DATE '2025-08-01', '[)') AS nao_estende_esquerda\nFROM product_price\nWHERE product_id = 100\nORDER BY lower(valid_at);"
        },
        {
          "number": 30,
          "question": "Calcule a interseção entre o intervalo [10/07/2024, 20/08/2024) e os períodos de preço do produto 42.",
          "answer": "SELECT valid_at,\n       valid_at * daterange(DATE '2024-07-10', DATE '2024-08-20', '[)') AS intersecao\nFROM product_price\nWHERE product_id = 42\n  AND valid_at && daterange(DATE '2024-07-10', DATE '2024-08-20', '[)')\nORDER BY lower(valid_at);"
        },
        {
          "number": 31,
          "question": "Una dois períodos mensais adjacentes do produto 42 usando o operador +.",
          "answer": "SELECT a.valid_at AS primeiro_periodo,\n       b.valid_at AS segundo_periodo,\n       a.valid_at + b.valid_at AS periodo_unido\nFROM product_price a\nJOIN product_price b\n  ON b.product_id = a.product_id\n AND lower(a.valid_at) = DATE '2024-01-01'\n AND lower(b.valid_at) = DATE '2024-02-01'\nWHERE a.product_id = 42;"
        },
        {
          "number": 32,
          "question": "Subtraia o intervalo [10/01/2024, 20/01/2024) do período de janeiro de 2024 do produto 42.",
          "answer": "SELECT\n    valid_at AS original,\n    valid_at - daterange(DATE '2024-01-10', DATE '2024-01-20', '[)') AS restante\nFROM product_price\nWHERE product_id = 42\n  AND valid_at @> DATE '2024-01-15';\n-- Como a subtração parte o range em dois pedaços, o resultado é um datemultirange."
        },
        {
          "number": 33,
          "question": "Verifique se existem ranges vazios em product_price.",
          "answer": "SELECT count(*) AS ranges_vazios\nFROM product_price\nWHERE isempty(valid_at);"
        },
        {
          "number": 34,
          "question": "Verifique se todos os ranges possuem limite inferior inclusivo e superior exclusivo.",
          "answer": "SELECT count(*) AS formatos_invalidos\nFROM product_price\nWHERE NOT lower_inc(valid_at)\n   OR upper_inc(valid_at)\n   OR lower_inf(valid_at)\n   OR upper_inf(valid_at);"
        },
        {
          "number": 35,
          "question": "Liste todos os preços cujo período contenha algum dia de fevereiro de 2024.",
          "answer": "SELECT product_id, price, valid_at\nFROM product_price\nWHERE valid_at && daterange(DATE '2024-02-01', DATE '2024-03-01', '[)')\nORDER BY product_id;"
        },
        {
          "number": 36,
          "question": "Liste as versões de preço cujo período começa no ano de 2023.",
          "answer": "SELECT product_id, price, valid_at\nFROM product_price\nWHERE lower(valid_at) >= DATE '2023-01-01'\n  AND lower(valid_at) <  DATE '2024-01-01'\nORDER BY product_id, lower(valid_at);"
        },
        {
          "number": 37,
          "question": "Liste as versões de preço cujo período termina no ano de 2026.",
          "answer": "SELECT product_id, price, valid_at\nFROM product_price\nWHERE upper(valid_at) >  DATE '2026-01-01'\n  AND upper(valid_at) <= DATE '2027-01-01'\nORDER BY product_id, upper(valid_at);"
        },
        {
          "number": 38,
          "question": "Agregue todos os períodos do produto 42 em um datemultirange usando range_agg.",
          "answer": "SELECT product_id, range_agg(valid_at ORDER BY lower(valid_at)) AS cobertura\nFROM product_price\nWHERE product_id = 42\nGROUP BY product_id;"
        },
        {
          "number": 39,
          "question": "Detecte sobreposições entre períodos do mesmo produto por meio de um self join. O resultado esperado é vazio.",
          "answer": "SELECT a.product_id, a.valid_at AS periodo_a, b.valid_at AS periodo_b\nFROM product_price a\nJOIN product_price b\n  ON b.product_id = a.product_id\n AND b.valid_at && a.valid_at\n AND lower(b.valid_at) > lower(a.valid_at)\nORDER BY a.product_id, lower(a.valid_at);\n-- Resultado esperado: zero linhas."
        },
        {
          "number": 40,
          "question": "Detecte lacunas entre períodos consecutivos de cada produto usando LEAD. O resultado esperado é vazio.",
          "answer": "WITH linha AS (\n    SELECT\n        product_id,\n        valid_at,\n        upper(valid_at) AS fim_atual,\n        lead(lower(valid_at)) OVER (\n            PARTITION BY product_id ORDER BY lower(valid_at)\n        ) AS proximo_inicio\n    FROM product_price\n)\nSELECT *\nFROM linha\nWHERE proximo_inicio IS NOT NULL\n  AND fim_atual <> proximo_inicio\nORDER BY product_id, fim_atual;\n-- Resultado esperado: zero linhas."
        },
        {
          "number": 41,
          "question": "Gere um snapshot do catálogo em 01/01/2022 e conte quantos produtos possuem preço.",
          "answer": "SELECT count(*) AS produtos_no_snapshot\nFROM product_price\nWHERE valid_at @> DATE '2022-01-01';"
        },
        {
          "number": 42,
          "question": "Gere um snapshot do catálogo em 31/12/2027 e conte quantos produtos possuem preço.",
          "answer": "SELECT count(*) AS produtos_no_snapshot\nFROM product_price\nWHERE valid_at @> DATE '2027-12-31';"
        },
        {
          "number": 43,
          "question": "Calcule o preço médio, mínimo e máximo por categoria no snapshot de 01/06/2023.",
          "answer": "SELECT c.name AS categoria,\n       count(*) AS produtos,\n       round(avg(pp.price), 2) AS media,\n       min(pp.price) AS minimo,\n       max(pp.price) AS maximo\nFROM category c\nJOIN product p USING (category_id)\nJOIN product_price pp USING (product_id)\nWHERE pp.valid_at @> DATE '2023-06-01'\nGROUP BY c.name\nORDER BY media DESC;"
        },
        {
          "number": 44,
          "question": "Calcule o preço médio por marca no snapshot de 20/08/2025.",
          "answer": "SELECT p.brand, round(avg(pp.price), 2) AS preco_medio\nFROM product p\nJOIN product_price pp USING (product_id)\nWHERE pp.valid_at @> DATE '2025-08-20'\nGROUP BY p.brand\nORDER BY preco_medio DESC;"
        },
        {
          "number": 45,
          "question": "Calcule a mediana dos preços do catálogo em 01/07/2024.",
          "answer": "SELECT round(\n    percentile_cont(0.5) WITHIN GROUP (ORDER BY price)::numeric,\n    2\n) AS mediana\nFROM product_price\nWHERE valid_at @> DATE '2024-07-01';"
        },
        {
          "number": 46,
          "question": "Calcule os quartis 25%, 50% e 75% dos preços por categoria em 01/07/2024.",
          "answer": "SELECT c.name AS categoria,\n       round(percentile_cont(0.25) WITHIN GROUP (ORDER BY pp.price)::numeric, 2) AS q1,\n       round(percentile_cont(0.50) WITHIN GROUP (ORDER BY pp.price)::numeric, 2) AS mediana,\n       round(percentile_cont(0.75) WITHIN GROUP (ORDER BY pp.price)::numeric, 2) AS q3\nFROM category c\nJOIN product p USING (category_id)\nJOIN product_price pp USING (product_id)\nWHERE pp.valid_at @> DATE '2024-07-01'\nGROUP BY c.name\nORDER BY c.name;"
        },
        {
          "number": 47,
          "question": "Calcule o desvio-padrão dos preços por categoria em 01/07/2024.",
          "answer": "SELECT c.name AS categoria, round(stddev_samp(pp.price), 2) AS desvio_padrao\nFROM category c\nJOIN product p USING (category_id)\nJOIN product_price pp USING (product_id)\nWHERE pp.valid_at @> DATE '2024-07-01'\nGROUP BY c.name\nORDER BY desvio_padrao DESC;"
        },
        {
          "number": 48,
          "question": "Crie um ranking das categorias pelo preço médio no snapshot de 01/07/2024.",
          "answer": "WITH medias AS (\n    SELECT c.name AS categoria, avg(pp.price) AS media\n    FROM category c\n    JOIN product p USING (category_id)\n    JOIN product_price pp USING (product_id)\n    WHERE pp.valid_at @> DATE '2024-07-01'\n    GROUP BY c.name\n)\nSELECT categoria, round(media, 2) AS media,\n       dense_rank() OVER (ORDER BY media DESC) AS posicao\nFROM medias\nORDER BY posicao, categoria;"
        },
        {
          "number": 49,
          "question": "Conte quantos produtos custavam mais de R$ 300,00 em 01/07/2024.",
          "answer": "SELECT count(*) AS produtos_acima_de_300\nFROM product_price\nWHERE valid_at @> DATE '2024-07-01'\n  AND price > 300;"
        },
        {
          "number": 50,
          "question": "Classifique os produtos do snapshot de 01/07/2024 nas faixas até 100, de 100 a 250, de 250 a 400 e acima de 400 reais.",
          "answer": "SELECT faixa, count(*) AS produtos\nFROM (\n    SELECT CASE\n        WHEN price < 100 THEN '1. Até R$ 99,99'\n        WHEN price < 250 THEN '2. R$ 100 a R$ 249,99'\n        WHEN price < 400 THEN '3. R$ 250 a R$ 399,99'\n        ELSE '4. R$ 400 ou mais'\n    END AS faixa\n    FROM product_price\n    WHERE valid_at @> DATE '2024-07-01'\n) x\nGROUP BY faixa\nORDER BY faixa;"
        },
        {
          "number": 51,
          "question": "Compare o preço médio geral do catálogo em 01/01/2022 e 31/12/2027.",
          "answer": "SELECT\n    round(avg(price) FILTER (WHERE valid_at @> DATE '2022-01-01'), 2) AS media_2022,\n    round(avg(price) FILTER (WHERE valid_at @> DATE '2027-12-31'), 2) AS media_2027,\n    round(\n        100 * (\n            avg(price) FILTER (WHERE valid_at @> DATE '2027-12-31') -\n            avg(price) FILTER (WHERE valid_at @> DATE '2022-01-01')\n        ) / NULLIF(avg(price) FILTER (WHERE valid_at @> DATE '2022-01-01'), 0),\n        2\n    ) AS variacao_percentual\nFROM product_price;"
        },
        {
          "number": 52,
          "question": "Calcule a variação percentual do preço médio de cada categoria entre 01/01/2022 e 31/12/2027.",
          "answer": "WITH snapshots AS (\n    SELECT c.name AS categoria,\n           avg(pp.price) FILTER (WHERE pp.valid_at @> DATE '2022-01-01') AS media_inicial,\n           avg(pp.price) FILTER (WHERE pp.valid_at @> DATE '2027-12-31') AS media_final\n    FROM category c\n    JOIN product p USING (category_id)\n    JOIN product_price pp USING (product_id)\n    GROUP BY c.name\n)\nSELECT categoria,\n       round(media_inicial, 2) AS media_inicial,\n       round(media_final, 2) AS media_final,\n       round(100 * (media_final - media_inicial) / NULLIF(media_inicial, 0), 2) AS variacao_percentual\nFROM snapshots\nORDER BY variacao_percentual DESC;"
        },
        {
          "number": 53,
          "question": "Calcule a variação percentual do preço médio de cada marca entre 01/01/2022 e 31/12/2027.",
          "answer": "WITH snapshots AS (\n    SELECT p.brand,\n           avg(pp.price) FILTER (WHERE pp.valid_at @> DATE '2022-01-01') AS media_inicial,\n           avg(pp.price) FILTER (WHERE pp.valid_at @> DATE '2027-12-31') AS media_final\n    FROM product p\n    JOIN product_price pp USING (product_id)\n    GROUP BY p.brand\n)\nSELECT brand,\n       round(media_inicial, 2) AS media_inicial,\n       round(media_final, 2) AS media_final,\n       round(100 * (media_final - media_inicial) / NULLIF(media_inicial, 0), 2) AS variacao_percentual\nFROM snapshots\nORDER BY variacao_percentual DESC;"
        },
        {
          "number": 54,
          "question": "Encontre os 20 produtos com maior aumento absoluto entre o primeiro e o último preço.",
          "answer": "WITH extremos AS (\n    SELECT DISTINCT product_id,\n        first_value(price) OVER w AS primeiro_preco,\n        last_value(price) OVER w AS ultimo_preco\n    FROM product_price\n    WINDOW w AS (\n        PARTITION BY product_id ORDER BY lower(valid_at)\n        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n    )\n)\nSELECT p.sku, p.name, e.primeiro_preco, e.ultimo_preco,\n       round(e.ultimo_preco - e.primeiro_preco, 2) AS aumento_absoluto\nFROM extremos e\nJOIN product p USING (product_id)\nORDER BY aumento_absoluto DESC\nLIMIT 20;"
        },
        {
          "number": 55,
          "question": "Encontre os 20 produtos com maior aumento percentual entre o primeiro e o último preço.",
          "answer": "WITH extremos AS (\n    SELECT DISTINCT product_id,\n        first_value(price) OVER w AS primeiro_preco,\n        last_value(price) OVER w AS ultimo_preco\n    FROM product_price\n    WINDOW w AS (\n        PARTITION BY product_id ORDER BY lower(valid_at)\n        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n    )\n)\nSELECT p.sku, p.name, e.primeiro_preco, e.ultimo_preco,\n       round(100 * (e.ultimo_preco - e.primeiro_preco) / NULLIF(e.primeiro_preco, 0), 2) AS aumento_percentual\nFROM extremos e\nJOIN product p USING (product_id)\nORDER BY aumento_percentual DESC\nLIMIT 20;"
        },
        {
          "number": 56,
          "question": "Liste os produtos cujo último preço é menor que o primeiro preço.",
          "answer": "WITH extremos AS (\n    SELECT DISTINCT product_id,\n        first_value(price) OVER w AS primeiro_preco,\n        last_value(price) OVER w AS ultimo_preco\n    FROM product_price\n    WINDOW w AS (\n        PARTITION BY product_id ORDER BY lower(valid_at)\n        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n    )\n)\nSELECT p.sku, p.name, primeiro_preco, ultimo_preco\nFROM extremos e\nJOIN product p USING (product_id)\nWHERE ultimo_preco < primeiro_preco\nORDER BY p.sku;"
        },
        {
          "number": 57,
          "question": "Apresente o primeiro e o último preço de cada produto usando FIRST_VALUE e LAST_VALUE.",
          "answer": "SELECT DISTINCT\n    p.sku,\n    first_value(pp.price) OVER w AS primeiro_preco,\n    last_value(pp.price) OVER w AS ultimo_preco\nFROM product p\nJOIN product_price pp USING (product_id)\nWINDOW w AS (\n    PARTITION BY pp.product_id ORDER BY lower(pp.valid_at)\n    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n)\nORDER BY p.sku;"
        },
        {
          "number": 58,
          "question": "Calcule o preço médio mensal de todo o catálogo.",
          "answer": "SELECT lower(valid_at) AS mes, round(avg(price), 2) AS preco_medio_catalogo\nFROM product_price\nGROUP BY lower(valid_at)\nORDER BY mes;"
        },
        {
          "number": 59,
          "question": "Calcule a mediana mensal dos preços do catálogo.",
          "answer": "SELECT lower(valid_at) AS mes,\n       round(percentile_cont(0.5) WITHIN GROUP (ORDER BY price)::numeric, 2) AS mediana\nFROM product_price\nGROUP BY lower(valid_at)\nORDER BY mes;"
        },
        {
          "number": 60,
          "question": "Para cada mês, conte quantos produtos aumentaram, diminuíram ou mantiveram o preço em relação ao mês anterior.",
          "answer": "WITH mudancas AS (\n    SELECT lower(valid_at) AS mes, price,\n           lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS anterior\n    FROM product_price\n)\nSELECT mes,\n       count(*) FILTER (WHERE price > anterior) AS aumentaram,\n       count(*) FILTER (WHERE price < anterior) AS diminuiram,\n       count(*) FILTER (WHERE price = anterior) AS mantiveram\nFROM mudancas\nWHERE anterior IS NOT NULL\nGROUP BY mes\nORDER BY mes;"
        },
        {
          "number": 61,
          "question": "Mostre a linha do tempo do produto 100 com o preço anterior usando LAG.",
          "answer": "SELECT lower(valid_at) AS mes, price,\n       lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS preco_anterior\nFROM product_price\nWHERE product_id = 100\nORDER BY mes;"
        },
        {
          "number": 62,
          "question": "Mostre a linha do tempo do produto 100 com o próximo preço e a próxima data inicial usando LEAD.",
          "answer": "SELECT lower(valid_at) AS mes, price,\n       lead(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS proximo_preco,\n       lead(lower(valid_at)) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS proximo_inicio\nFROM product_price\nWHERE product_id = 100\nORDER BY mes;"
        },
        {
          "number": 63,
          "question": "Calcule a variação absoluta mensal de cada produto.",
          "answer": "WITH x AS (\n    SELECT product_id, lower(valid_at) AS mes, price,\n           lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS anterior\n    FROM product_price\n)\nSELECT product_id, mes, price, anterior, round(price - anterior, 2) AS variacao_absoluta\nFROM x\nWHERE anterior IS NOT NULL\nORDER BY product_id, mes;"
        },
        {
          "number": 64,
          "question": "Calcule a variação percentual mensal de cada produto.",
          "answer": "WITH x AS (\n    SELECT product_id, lower(valid_at) AS mes, price,\n           lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS anterior\n    FROM product_price\n)\nSELECT product_id, mes, price, anterior,\n       round(100 * (price - anterior) / NULLIF(anterior, 0), 2) AS variacao_percentual\nFROM x\nWHERE anterior IS NOT NULL\nORDER BY product_id, mes;"
        },
        {
          "number": 65,
          "question": "Numere cronologicamente as versões de preço de cada produto usando ROW_NUMBER.",
          "answer": "SELECT product_id, price, valid_at,\n       row_number() OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS numero_versao\nFROM product_price\nORDER BY product_id, numero_versao;"
        },
        {
          "number": 66,
          "question": "Classifique as versões de preço do produto 100 da mais cara para a mais barata usando RANK.",
          "answer": "SELECT price, valid_at,\n       rank() OVER (ORDER BY price DESC) AS posicao\nFROM product_price\nWHERE product_id = 100\nORDER BY posicao, lower(valid_at);"
        },
        {
          "number": 67,
          "question": "Calcule a média móvel de seis meses do preço de cada produto.",
          "answer": "SELECT product_id, lower(valid_at) AS mes, price,\n       round(avg(price) OVER (\n           PARTITION BY product_id ORDER BY lower(valid_at)\n           ROWS BETWEEN 5 PRECEDING AND CURRENT ROW\n       ), 2) AS media_movel_6m\nFROM product_price\nORDER BY product_id, mes;"
        },
        {
          "number": 68,
          "question": "Calcule o menor e o maior preço móvel em uma janela de doze meses para cada produto.",
          "answer": "SELECT product_id, lower(valid_at) AS mes, price,\n       min(price) OVER (\n           PARTITION BY product_id ORDER BY lower(valid_at)\n           ROWS BETWEEN 11 PRECEDING AND CURRENT ROW\n       ) AS minimo_12m,\n       max(price) OVER (\n           PARTITION BY product_id ORDER BY lower(valid_at)\n           ROWS BETWEEN 11 PRECEDING AND CURRENT ROW\n       ) AS maximo_12m\nFROM product_price\nORDER BY product_id, mes;"
        },
        {
          "number": 69,
          "question": "Calcule o aumento acumulado em reais em relação ao primeiro preço de cada produto.",
          "answer": "SELECT product_id, lower(valid_at) AS mes, price,\n       round(price - first_value(price) OVER (\n           PARTITION BY product_id ORDER BY lower(valid_at)\n       ), 2) AS aumento_desde_inicio\nFROM product_price\nORDER BY product_id, mes;"
        },
        {
          "number": 70,
          "question": "Calcule a variação acumulada percentual em relação ao primeiro preço de cada produto.",
          "answer": "SELECT product_id, lower(valid_at) AS mes, price,\n       round(100 * (price - first_value(price) OVER (\n           PARTITION BY product_id ORDER BY lower(valid_at)\n       )) / NULLIF(first_value(price) OVER (\n           PARTITION BY product_id ORDER BY lower(valid_at)\n       ), 0), 2) AS variacao_desde_inicio_percentual\nFROM product_price\nORDER BY product_id, mes;"
        },
        {
          "number": 71,
          "question": "Calcule, para cada versão, a distância percentual em relação ao maior preço observado até aquele momento.",
          "answer": "SELECT product_id, lower(valid_at) AS mes, price,\n       round(100 * (price - max(price) OVER (\n           PARTITION BY product_id ORDER BY lower(valid_at)\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       )) / NULLIF(max(price) OVER (\n           PARTITION BY product_id ORDER BY lower(valid_at)\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ), 0), 2) AS distancia_do_maximo_percentual\nFROM product_price\nORDER BY product_id, mes;"
        },
        {
          "number": 72,
          "question": "Encontre o mês de maior aumento percentual de cada produto.",
          "answer": "WITH x AS (\n    SELECT product_id, lower(valid_at) AS mes, price,\n           lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS anterior\n    FROM product_price\n), r AS (\n    SELECT *,\n           100 * (price - anterior) / NULLIF(anterior, 0) AS variacao,\n           row_number() OVER (\n               PARTITION BY product_id\n               ORDER BY 100 * (price - anterior) / NULLIF(anterior, 0) DESC NULLS LAST\n           ) AS rn\n    FROM x\n)\nSELECT p.sku, r.mes, r.anterior, r.price,\n       round(r.variacao, 2) AS maior_aumento_percentual\nFROM r\nJOIN product p USING (product_id)\nWHERE rn = 1\nORDER BY p.sku;"
        },
        {
          "number": 73,
          "question": "Encontre os três maiores aumentos percentuais de cada categoria.",
          "answer": "WITH x AS (\n    SELECT p.category_id, pp.product_id, lower(pp.valid_at) AS mes, pp.price,\n           lag(pp.price) OVER (PARTITION BY pp.product_id ORDER BY lower(pp.valid_at)) AS anterior\n    FROM product_price pp\n    JOIN product p USING (product_id)\n), r AS (\n    SELECT *, 100 * (price - anterior) / NULLIF(anterior, 0) AS variacao,\n           row_number() OVER (\n               PARTITION BY category_id\n               ORDER BY 100 * (price - anterior) / NULLIF(anterior, 0) DESC NULLS LAST\n           ) AS rn\n    FROM x\n)\nSELECT c.name AS categoria, p.sku, r.mes,\n       round(r.variacao, 2) AS aumento_percentual\nFROM r\nJOIN category c USING (category_id)\nJOIN product p USING (product_id)\nWHERE rn <= 3\nORDER BY categoria, rn;"
        },
        {
          "number": 74,
          "question": "Encontre a maior sequência de aumentos consecutivos de cada produto.",
          "answer": "WITH x AS (\n    SELECT product_id, lower(valid_at) AS mes, price,\n           lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS anterior\n    FROM product_price\n), marcas AS (\n    SELECT *, CASE WHEN price > anterior THEN 1 ELSE 0 END AS subiu\n    FROM x\n), ilhas AS (\n    SELECT *, sum(CASE WHEN subiu = 0 THEN 1 ELSE 0 END) OVER (\n        PARTITION BY product_id ORDER BY mes\n    ) AS grupo\n    FROM marcas\n), sequencias AS (\n    SELECT product_id, grupo, min(mes) AS inicio, max(mes) AS fim,\n           count(*) FILTER (WHERE subiu = 1) AS aumentos\n    FROM ilhas\n    GROUP BY product_id, grupo\n), r AS (\n    SELECT *, row_number() OVER (PARTITION BY product_id ORDER BY aumentos DESC, inicio) AS rn\n    FROM sequencias\n)\nSELECT p.sku, r.inicio, r.fim, r.aumentos\nFROM r\nJOIN product p USING (product_id)\nWHERE rn = 1\nORDER BY aumentos DESC, p.sku;"
        },
        {
          "number": 75,
          "question": "Encontre a maior sequência de quedas consecutivas de cada produto.",
          "answer": "WITH x AS (\n    SELECT product_id, lower(valid_at) AS mes, price,\n           lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS anterior\n    FROM product_price\n), marcas AS (\n    SELECT *, CASE WHEN price < anterior THEN 1 ELSE 0 END AS caiu\n    FROM x\n), ilhas AS (\n    SELECT *, sum(CASE WHEN caiu = 0 THEN 1 ELSE 0 END) OVER (\n        PARTITION BY product_id ORDER BY mes\n    ) AS grupo\n    FROM marcas\n), sequencias AS (\n    SELECT product_id, grupo, min(mes) AS inicio, max(mes) AS fim,\n           count(*) FILTER (WHERE caiu = 1) AS quedas\n    FROM ilhas\n    GROUP BY product_id, grupo\n), r AS (\n    SELECT *, row_number() OVER (PARTITION BY product_id ORDER BY quedas DESC, inicio) AS rn\n    FROM sequencias\n)\nSELECT p.sku, r.inicio, r.fim, r.quedas\nFROM r\nJOIN product p USING (product_id)\nWHERE rn = 1\nORDER BY quedas DESC, p.sku;"
        },
        {
          "number": 76,
          "question": "Liste os períodos em que o preço permaneceu exatamente igual ao período anterior.",
          "answer": "WITH x AS (\n    SELECT product_id, valid_at, price,\n           lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS anterior\n    FROM product_price\n)\nSELECT product_id, valid_at, price\nFROM x\nWHERE price = anterior\nORDER BY product_id, lower(valid_at);"
        },
        {
          "number": 77,
          "question": "Calcule a volatilidade de cada produto como o desvio-padrão das variações percentuais mensais.",
          "answer": "WITH retornos AS (\n    SELECT product_id,\n           100.0 * (price - lag(price) OVER (\n               PARTITION BY product_id ORDER BY lower(valid_at)\n           )) / NULLIF(lag(price) OVER (\n               PARTITION BY product_id ORDER BY lower(valid_at)\n           ), 0) AS retorno\n    FROM product_price\n)\nSELECT p.sku, round(stddev_samp(r.retorno)::numeric, 4) AS volatilidade\nFROM retornos r\nJOIN product p USING (product_id)\nWHERE retorno IS NOT NULL\nGROUP BY p.product_id, p.sku\nORDER BY volatilidade DESC;"
        },
        {
          "number": 78,
          "question": "Separe os produtos em quatro quartis de volatilidade usando NTILE.",
          "answer": "WITH retornos AS (\n    SELECT product_id,\n           100.0 * (price - lag(price) OVER (\n               PARTITION BY product_id ORDER BY lower(valid_at)\n           )) / NULLIF(lag(price) OVER (\n               PARTITION BY product_id ORDER BY lower(valid_at)\n           ), 0) AS retorno\n    FROM product_price\n), vols AS (\n    SELECT product_id, stddev_samp(retorno) AS volatilidade\n    FROM retornos\n    WHERE retorno IS NOT NULL\n    GROUP BY product_id\n)\nSELECT p.sku, round(v.volatilidade::numeric, 4) AS volatilidade,\n       ntile(4) OVER (ORDER BY v.volatilidade) AS quartil_volatilidade\nFROM vols v\nJOIN product p USING (product_id)\nORDER BY quartil_volatilidade, volatilidade;"
        },
        {
          "number": 79,
          "question": "Liste os produtos cujos preços nunca diminuíram ao longo da linha do tempo.",
          "answer": "WITH x AS (\n    SELECT product_id, price,\n           lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS anterior\n    FROM product_price\n)\nSELECT p.sku, p.name\nFROM x\nJOIN product p USING (product_id)\nGROUP BY p.product_id, p.sku, p.name\nHAVING bool_and(anterior IS NULL OR price >= anterior)\nORDER BY p.sku;"
        },
        {
          "number": 80,
          "question": "Liste os produtos que tiveram pelo menos dez quedas mensais de preço.",
          "answer": "WITH x AS (\n    SELECT product_id, price,\n           lag(price) OVER (PARTITION BY product_id ORDER BY lower(valid_at)) AS anterior\n    FROM product_price\n)\nSELECT p.sku, count(*) FILTER (WHERE x.price < x.anterior) AS quedas\nFROM x\nJOIN product p USING (product_id)\nGROUP BY p.product_id, p.sku\nHAVING count(*) FILTER (WHERE x.price < x.anterior) >= 10\nORDER BY quedas DESC, p.sku;"
        },
        {
          "number": 81,
          "question": "Verifique se o list_price de todas as vendas corresponde ao preço válido na data da venda. Mostre apenas divergências.",
          "answer": "SELECT s.sale_id, s.product_id, s.sold_at,\n       s.list_price AS preco_gravado, pp.price AS preco_historico\nFROM sales s\nJOIN product_price pp\n  ON pp.product_id = s.product_id\n AND pp.valid_at @> s.sold_at\nWHERE s.list_price <> pp.price\nORDER BY s.sale_id;\n-- Resultado esperado na carga original: zero linhas."
        },
        {
          "number": 82,
          "question": "Calcule a receita líquida total de todas as vendas.",
          "answer": "SELECT round(sum(quantity * unit_price), 2) AS receita_liquida_total\nFROM sales;"
        },
        {
          "number": 83,
          "question": "Calcule unidades vendidas e receita líquida por mês.",
          "answer": "SELECT date_trunc('month', sold_at)::date AS mes,\n       sum(quantity) AS unidades,\n       round(sum(quantity * unit_price), 2) AS receita\nFROM sales\nGROUP BY mes\nORDER BY mes;"
        },
        {
          "number": 84,
          "question": "Calcule vendas, unidades e receita por canal.",
          "answer": "SELECT channel AS canal,\n       count(*) AS vendas,\n       sum(quantity) AS unidades,\n       round(sum(quantity * unit_price), 2) AS receita\nFROM sales\nGROUP BY channel\nORDER BY receita DESC;"
        },
        {
          "number": 85,
          "question": "Calcule vendas, unidades e receita por região.",
          "answer": "SELECT region AS regiao,\n       count(*) AS vendas,\n       sum(quantity) AS unidades,\n       round(sum(quantity * unit_price), 2) AS receita\nFROM sales\nGROUP BY region\nORDER BY receita DESC;"
        },
        {
          "number": 86,
          "question": "Calcule o ticket médio por canal, considerando quantity * unit_price por venda.",
          "answer": "SELECT channel AS canal,\n       round(avg(quantity * unit_price), 2) AS ticket_medio\nFROM sales\nGROUP BY channel\nORDER BY ticket_medio DESC;"
        },
        {
          "number": 87,
          "question": "Calcule a quantidade total vendida por categoria.",
          "answer": "SELECT c.name AS categoria, sum(s.quantity) AS unidades\nFROM sales s\nJOIN product p USING (product_id)\nJOIN category c USING (category_id)\nGROUP BY c.name\nORDER BY unidades DESC;"
        },
        {
          "number": 88,
          "question": "Liste os 20 produtos com maior receita líquida acumulada.",
          "answer": "SELECT p.sku, p.name,\n       sum(s.quantity) AS unidades,\n       round(sum(s.quantity * s.unit_price), 2) AS receita\nFROM sales s\nJOIN product p USING (product_id)\nGROUP BY p.product_id, p.sku, p.name\nORDER BY receita DESC\nLIMIT 20;"
        },
        {
          "number": 89,
          "question": "Liste os cinco produtos com maior receita dentro de cada categoria.",
          "answer": "WITH receitas AS (\n    SELECT c.name AS categoria, p.product_id, p.sku,\n           sum(s.quantity * s.unit_price) AS receita\n    FROM sales s\n    JOIN product p USING (product_id)\n    JOIN category c USING (category_id)\n    GROUP BY c.name, p.product_id, p.sku\n), r AS (\n    SELECT *, dense_rank() OVER (PARTITION BY categoria ORDER BY receita DESC) AS posicao\n    FROM receitas\n)\nSELECT categoria, sku, round(receita, 2) AS receita, posicao\nFROM r\nWHERE posicao <= 5\nORDER BY categoria, posicao, sku;"
        },
        {
          "number": 90,
          "question": "Calcule a participação percentual de cada canal na receita de cada mês.",
          "answer": "WITH x AS (\n    SELECT date_trunc('month', sold_at)::date AS mes, channel,\n           sum(quantity * unit_price) AS receita\n    FROM sales\n    GROUP BY mes, channel\n)\nSELECT mes, channel, round(receita, 2) AS receita,\n       round(100 * receita / sum(receita) OVER (PARTITION BY mes), 2) AS participacao_percentual\nFROM x\nORDER BY mes, participacao_percentual DESC;"
        },
        {
          "number": 91,
          "question": "Calcule o desconto médio por região.",
          "answer": "SELECT region AS regiao, round(avg(discount_percent), 2) AS desconto_medio\nFROM sales\nGROUP BY region\nORDER BY desconto_medio DESC;"
        },
        {
          "number": 92,
          "question": "Apresente a distribuição das vendas por faixa de desconto: 0%, 5%, 10%, 15% e 20%.",
          "answer": "SELECT discount_percent AS faixa_desconto, count(*) AS vendas,\n       round(100.0 * count(*) / sum(count(*)) OVER (), 2) AS percentual\nFROM sales\nGROUP BY discount_percent\nORDER BY discount_percent;"
        },
        {
          "number": 93,
          "question": "Calcule receita bruta, receita líquida e valor concedido em descontos.",
          "answer": "SELECT\n    round(sum(quantity * list_price), 2) AS receita_bruta,\n    round(sum(quantity * unit_price), 2) AS receita_liquida,\n    round(sum(quantity * (list_price - unit_price)), 2) AS descontos_concedidos\nFROM sales;"
        },
        {
          "number": 94,
          "question": "Calcule o valor total concedido em descontos por categoria.",
          "answer": "SELECT c.name AS categoria,\n       round(sum(s.quantity * (s.list_price - s.unit_price)), 2) AS descontos_concedidos\nFROM sales s\nJOIN product p USING (product_id)\nJOIN category c USING (category_id)\nGROUP BY c.name\nORDER BY descontos_concedidos DESC;"
        },
        {
          "number": 95,
          "question": "Liste as 50 vendas com maior valor absoluto de desconto.",
          "answer": "SELECT s.sale_id, p.sku, s.sold_at, s.quantity,\n       s.list_price, s.unit_price, s.discount_percent,\n       round(s.quantity * (s.list_price - s.unit_price), 2) AS valor_desconto\nFROM sales s\nJOIN product p USING (product_id)\nORDER BY valor_desconto DESC\nLIMIT 50;"
        },
        {
          "number": 96,
          "question": "Liste os 20 dias com maior receita líquida.",
          "answer": "SELECT sold_at AS dia,\n       count(*) AS vendas,\n       sum(quantity) AS unidades,\n       round(sum(quantity * unit_price), 2) AS receita\nFROM sales\nGROUP BY sold_at\nORDER BY receita DESC\nLIMIT 20;"
        },
        {
          "number": 97,
          "question": "Calcule vendas e receita por dia da semana.",
          "answer": "SELECT extract(isodow FROM sold_at)::integer AS numero_dia,\n       to_char(sold_at, 'TMDay') AS dia_semana,\n       count(*) AS vendas,\n       round(sum(quantity * unit_price), 2) AS receita\nFROM sales\nGROUP BY numero_dia, dia_semana\nORDER BY numero_dia;"
        },
        {
          "number": 98,
          "question": "Calcule a receita agregada por mês do ano para analisar sazonalidade.",
          "answer": "SELECT extract(month FROM sold_at)::integer AS numero_mes,\n       to_char(sold_at, 'TMMonth') AS mes,\n       round(sum(quantity * unit_price), 2) AS receita\nFROM sales\nGROUP BY numero_mes, mes\nORDER BY numero_mes;"
        },
        {
          "number": 99,
          "question": "Conte quantas vendas ocorreram durante cada versão de preço.",
          "answer": "SELECT pp.product_id, pp.valid_at, pp.price, count(s.sale_id) AS vendas\nFROM product_price pp\nLEFT JOIN sales s\n  ON s.product_id = pp.product_id\n AND pp.valid_at @> s.sold_at\nGROUP BY pp.product_id, pp.valid_at, pp.price\nORDER BY pp.product_id, lower(pp.valid_at);"
        },
        {
          "number": 100,
          "question": "Calcule a receita obtida durante cada versão de preço.",
          "answer": "SELECT pp.product_id, pp.valid_at, pp.price,\n       coalesce(round(sum(s.quantity * s.unit_price), 2), 0) AS receita\nFROM product_price pp\nLEFT JOIN sales s\n  ON s.product_id = pp.product_id\n AND pp.valid_at @> s.sold_at\nGROUP BY pp.product_id, pp.valid_at, pp.price\nORDER BY pp.product_id, lower(pp.valid_at);"
        }
      ]
    }
  ]
};
