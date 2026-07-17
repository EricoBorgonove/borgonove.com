export const postgresqlClinicaVeterinariaExerciseList = {
  "slug": "clinica-veterinaria",
  "order": 4,
  "title": "Clínica Veterinária",
  "summary": "Pratique SQL em um cenário de clínica veterinária com clientes, animais, consultas, veterinários, vacinas, exames, produtos e vendas.",
  "level": "Intermediário",
  "answerPasswordPrefix": "vet",
  "files": [
    {
      "label": "Baixar gerador do dump da clínica (.py)",
      "href": "/docs/postgresql/exercicios/clinica-veterinaria/gerador-dump-clinica.py",
      "fileName": "gerador-dump-clinica.py"
    }
  ],
  "blocks": [
    {
      "slug": "consultas-gerais",
      "order": 1,
      "title": "100 consultas gerais",
      "summary": "Revise filtros, ordenação, agregações, datas, padrões textuais e análises de vendas no banco da clínica.",
      "level": "Intermediário",
      "exercises": [
        {
          "number": 1,
          "question": "Listar todos os clientes cadastrados ordenados por nome.",
          "answer": "SELECT * FROM clientes ORDER BY nome;"
        },
        {
          "number": 2,
          "question": "Listar todos os animais com espécie “Cachorro”.",
          "answer": "SELECT * FROM animais WHERE especie = 'Cachorro';"
        },
        {
          "number": 3,
          "question": "Listar todas as consultas realizadas em 2024.",
          "answer": "SELECT * FROM consultas WHERE EXTRACT(YEAR FROM data_consulta) = 2024;"
        },
        {
          "number": 4,
          "question": "Selecionar os veterinários com especialidade “Cirurgia”.",
          "answer": "SELECT * FROM veterinarios WHERE especialidade = 'Cirurgia';"
        },
        {
          "number": 5,
          "question": "Contar quantos animais existem por espécie.",
          "answer": "SELECT especie, COUNT(*) FROM animais GROUP BY especie;"
        },
        {
          "number": 6,
          "question": "Obter todas as vendas com total acima de 300 reais.",
          "answer": "SELECT * FROM vendas WHERE total > 300;"
        },
        {
          "number": 7,
          "question": "Selecionar os produtos com estoque inferior a 20 unidades.",
          "answer": "SELECT * FROM produtos WHERE estoque < 20;"
        },
        {
          "number": 8,
          "question": "Listar os nomes dos clientes que possuem mais de 3 animais.",
          "answer": "SELECT cliente_id, COUNT(*) \nFROM animais \nGROUP BY cliente_id \nHAVING COUNT(*) > 3;"
        },
        {
          "number": 9,
          "question": "Listar consultas ordenadas por data decrescente.",
          "answer": "SELECT * FROM consultas ORDER BY data_consulta DESC;"
        },
        {
          "number": 10,
          "question": "Contar quantas consultas cada veterinário realizou.",
          "answer": "SELECT veterinario_id, COUNT(*) \nFROM consultas \nGROUP BY veterinario_id;"
        },
        {
          "number": 11,
          "question": "Selecionar animais nascidos após 2020.",
          "answer": "SELECT * FROM animais WHERE data_nascimento > '2020-01-01';"
        },
        {
          "number": 12,
          "question": "Listar consultas em que o motivo contém a palavra “diarreia”.",
          "answer": "SELECT * FROM consultas WHERE motivo ILIKE '%diarreia%';"
        },
        {
          "number": 13,
          "question": "Listar produtos do grupo “geral” ordenados pelo preço.",
          "answer": "SELECT * FROM produtos WHERE nome ILIKE '%geral%' ORDER BY preco;"
        },
        {
          "number": 14,
          "question": "Obter os 20 clientes mais antigos do sistema.",
          "answer": "SELECT * FROM clientes ORDER BY id LIMIT 20;"
        },
        {
          "number": 15,
          "question": "Listar vacinas aplicadas no ano de 2023.",
          "answer": "SELECT * FROM carteirinha_vacinas \nWHERE EXTRACT(YEAR FROM data_aplicacao) = 2023;"
        },
        {
          "number": 16,
          "question": "Contar quantas aves existem cadastradas.",
          "answer": "SELECT COUNT(*) FROM animais WHERE especie = 'Ave';"
        },
        {
          "number": 17,
          "question": "Obter todas as consultas associadas a animais da raça “Poodle”.",
          "answer": "SELECT * FROM consultas c \nJOIN animais a ON c.animal_id = a.id\nWHERE a.raca = 'Poodle';"
        },
        {
          "number": 18,
          "question": "Selecionar veterinários que atenderam mais de 500 consultas.",
          "answer": "SELECT veterinario_id, COUNT(*) \nFROM consultas \nGROUP BY veterinario_id \nHAVING COUNT(*) > 500;"
        },
        {
          "number": 19,
          "question": "Calcular média de preço dos produtos.",
          "answer": "SELECT AVG(preco) FROM produtos;"
        },
        {
          "number": 20,
          "question": "Listar clientes sem vendas registradas.",
          "answer": "SELECT * FROM clientes c\nWHERE NOT EXISTS (\n    SELECT 1 FROM vendas v WHERE v.cliente_id = c.id\n);"
        },
        {
          "number": 21,
          "question": "Listar animais do porte “Grande” e espécie “Cachorro”.",
          "answer": "SELECT * FROM animais \nWHERE porte = 'Grande' AND especie = 'Cachorro';"
        },
        {
          "number": 22,
          "question": "Selecionar vendas realizadas no mês de dezembro de qualquer ano.",
          "answer": "SELECT * FROM vendas WHERE EXTRACT(MONTH FROM data_venda) = 12;"
        },
        {
          "number": 23,
          "question": "Contar quantos produtos pertencem ao grupo “gato”.",
          "answer": "SELECT COUNT(*) FROM produtos WHERE nome ILIKE '%gato%';"
        },
        {
          "number": 24,
          "question": "Obter o total gasto por cada cliente em vendas.",
          "answer": "SELECT cliente_id, SUM(total) \nFROM vendas \nGROUP BY cliente_id;"
        },
        {
          "number": 25,
          "question": "Listar consultas que ocorreram no turno da manhã (até 12h).",
          "answer": "SELECT * FROM consultas \nWHERE EXTRACT(HOUR FROM data_consulta) < 12;"
        },
        {
          "number": 26,
          "question": "Listar animais que nunca tiveram consulta.",
          "answer": "SELECT * FROM animais a\nWHERE NOT EXISTS (\n    SELECT 1 FROM consultas c WHERE c.animal_id = a.id\n);"
        },
        {
          "number": 27,
          "question": "Selecionar os veterinários que aplicaram mais vacinas.",
          "answer": "SELECT veterinario_id, COUNT(*) \nFROM carteirinha_vacinas \nGROUP BY veterinario_id;"
        },
        {
          "number": 28,
          "question": "Listar combinações cliente–animal ordenadas alfabeticamente.",
          "answer": "SELECT c.nome AS cliente, a.nome AS animal \nFROM clientes c \nJOIN animais a ON a.cliente_id = c.id\nORDER BY c.nome, a.nome;"
        },
        {
          "number": 29,
          "question": "Listar produtos cujo nome contém “Shampoo”.",
          "answer": "SELECT * FROM produtos WHERE nome ILIKE '%Shampoo%';"
        },
        {
          "number": 30,
          "question": "Obter o animal com maior número de consultas na base.",
          "answer": "SELECT animal_id, COUNT(*) \nFROM consultas \nGROUP BY animal_id \nORDER BY COUNT(*) DESC \nLIMIT 1;"
        },
        {
          "number": 31,
          "question": "Listar clientes com CPF duplicado (falha proposital).",
          "answer": "SELECT cpf, COUNT(*) \nFROM clientes \nGROUP BY cpf \nHAVING COUNT(*) > 1;"
        },
        {
          "number": 32,
          "question": "Consultar vacinas aplicadas em aves.",
          "answer": "SELECT * FROM carteirinha_vacinas cv\nJOIN animais a ON a.id = cv.animal_id\nWHERE a.especie = 'Ave';"
        },
        {
          "number": 33,
          "question": "Listar consultas realizadas por veterinários do CRMV terminado em “7”.",
          "answer": "SELECT * FROM consultas c\nJOIN veterinarios v ON v.id = c.veterinario_id\nWHERE v.crmv LIKE '%7';"
        },
        {
          "number": 34,
          "question": "Agrupar animais por raça e contar quantos existem por raça.",
          "answer": "SELECT raca, COUNT(*) \nFROM animais \nGROUP BY raca;"
        },
        {
          "number": 35,
          "question": "Selecionar consultas cujo diagnóstico contenha “alérgica”.",
          "answer": "SELECT * FROM consultas WHERE diagnostico ILIKE '%alérgica%';"
        },
        {
          "number": 36,
          "question": "Selecionar vendas cujo valor total esteja no percentil 95.",
          "answer": "SELECT * FROM vendas\nWHERE total > (\n    SELECT PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY total) FROM vendas\n);"
        },
        {
          "number": 37,
          "question": "Obter os 10 produtos mais vendidos em quantidade total.",
          "answer": "SELECT produto_id, SUM(quantidade)\nFROM vendas_itens\nGROUP BY produto_id\nORDER BY SUM(quantidade) DESC\nLIMIT 10;"
        },
        {
          "number": 38,
          "question": "Listar os 10 clientes que mais gastaram.",
          "answer": "SELECT cliente_id, SUM(total) \nFROM vendas \nGROUP BY cliente_id \nORDER BY SUM(total) DESC \nLIMIT 10;"
        },
        {
          "number": 39,
          "question": "Listar animais com idade superior a 8 anos.",
          "answer": "SELECT *, DATE_PART('year', AGE(NOW(), data_nascimento)) AS idade\nFROM animais\nWHERE AGE(NOW(), data_nascimento) > INTERVAL '8 years';"
        },
        {
          "number": 40,
          "question": "Identificar consultas com motivo igual ao diagnóstico (erro de registro).",
          "answer": "SELECT * FROM consultas WHERE motivo = diagnostico;"
        },
        {
          "number": 41,
          "question": "Listar mês a mês o total de consultas.",
          "answer": "SELECT DATE_TRUNC('month', data_consulta) AS mes, COUNT(*)\nFROM consultas\nGROUP BY mes\nORDER BY mes;"
        },
        {
          "number": 42,
          "question": "Calcular a média de consultas por animal.",
          "answer": "SELECT AVG(cnt)\nFROM (\n    SELECT animal_id, COUNT(*) AS cnt\n    FROM consultas\n    GROUP BY animal_id\n) x;"
        },
        {
          "number": 43,
          "question": "Listar vendedores (veterinários) que nunca tiveram consulta registrada.",
          "answer": "SELECT * FROM veterinarios v\nWHERE NOT EXISTS (\n    SELECT 1 FROM consultas c WHERE c.veterinario_id = v.id\n);"
        },
        {
          "number": 44,
          "question": "Listar clientes que têm ao menos um gato e um cachorro.",
          "answer": "SELECT cliente_id\nFROM animais\nGROUP BY cliente_id\nHAVING SUM(CASE WHEN especie='Gato' THEN 1 ELSE 0 END) > 0\n   AND SUM(CASE WHEN especie='Cachorro' THEN 1 ELSE 0 END) > 0;"
        },
        {
          "number": 45,
          "question": "Listar consultas que ocorreram nos fins de semana.",
          "answer": "SELECT * FROM consultas \nWHERE EXTRACT(DOW FROM data_consulta) IN (0,6);"
        },
        {
          "number": 46,
          "question": "Identificar animais com mais de 20 consultas.",
          "answer": "SELECT animal_id, COUNT(*) \nFROM consultas\nGROUP BY animal_id\nHAVING COUNT(*) > 20;"
        },
        {
          "number": 47,
          "question": "Obter o valor total vendido por espécie dominante do cliente.",
          "answer": "SELECT especie_dom, SUM(total)\nFROM vendas v\nGROUP BY especie_dom;"
        },
        {
          "number": 48,
          "question": "Listar as consultas onde o veterinário não pertence à especialidade adequada ao diagnóstico (comparação textual).",
          "answer": "(requere regra externa; assume problemas respiratórios x ortopedia)\nSELECT * FROM consultas c\nJOIN veterinarios v ON c.veterinario_id = v.id\nWHERE c.diagnostico ILIKE '%respirat%'\n  AND v.especialidade <> 'Clínica Geral';"
        },
        {
          "number": 49,
          "question": "Mostrar os clientes que compraram apenas produtos do grupo “gato”.",
          "answer": "SELECT cliente_id\nFROM vendas v\nJOIN vendas_itens vi ON vi.venda_id = v.id\nJOIN produtos p ON p.id = vi.produto_id\nGROUP BY cliente_id\nHAVING BOOL_AND(p.nome ILIKE '%gato%');"
        },
        {
          "number": 50,
          "question": "Listar animais com vacinas atrasadas (data anterior a hoje sem nova aplicação).",
          "answer": "(vacinas atrasadas = último registro < data limite)\nSELECT a.id, a.nome\nFROM animais a\nLEFT JOIN LATERAL (\n    SELECT cv.data_aplicacao \n    FROM carteirinha_vacinas cv\n    WHERE cv.animal_id = a.id\n    ORDER BY data_aplicacao DESC\n    LIMIT 1\n) ult ON true\nWHERE ult.data_aplicacao < CURRENT_DATE - INTERVAL '1 year';"
        },
        {
          "number": 51,
          "question": "Selecionar produtos com preço acima do valor médio do estoque.",
          "answer": "SELECT * FROM produtos \nWHERE preco > (SELECT AVG(preco) FROM produtos);"
        },
        {
          "number": 52,
          "question": "Identificar vendas com discrepância entre soma dos itens e total da venda.",
          "answer": "SELECT v.id\nFROM vendas v\nWHERE v.total <> (\n    SELECT SUM(quantidade * preco_unitario)\n    FROM vendas_itens vi\n    WHERE vi.venda_id = v.id\n);"
        },
        {
          "number": 53,
          "question": "Listar os dias com maior quantidade de consultas (top 10).",
          "answer": "SELECT DATE(data_consulta), COUNT(*) \nFROM consultas\nGROUP BY DATE(data_consulta)\nORDER BY COUNT(*) DESC\nLIMIT 10;"
        },
        {
          "number": 54,
          "question": "Selecionar consultas de animais cuja raça começa com “S”.",
          "answer": "SELECT * FROM animais WHERE raca LIKE 'S%';"
        },
        {
          "number": 55,
          "question": "Exibir o tempo médio entre consultas de cada animal.",
          "answer": "SELECT animal_id, AVG(diff)\nFROM (\n    SELECT animal_id,\n           data_consulta - LAG(data_consulta) OVER (PARTITION BY animal_id ORDER BY data_consulta) AS diff\n    FROM consultas\n) x\nGROUP BY animal_id;"
        },
        {
          "number": 56,
          "question": "Relacionar animais com diagnósticos respiratórios.",
          "answer": "SELECT * FROM consultas WHERE diagnostico ILIKE '%respirat%';"
        },
        {
          "number": 57,
          "question": "Listar clientes com mais de 5 vendas registradas.",
          "answer": "SELECT cliente_id, COUNT(*) \nFROM vendas\nGROUP BY cliente_id\nHAVING COUNT(*) > 5;"
        },
        {
          "number": 58,
          "question": "Calcular média de itens por venda.",
          "answer": "SELECT AVG(item_cnt)\nFROM (\n    SELECT venda_id, COUNT(*) AS item_cnt\n    FROM vendas_itens\n    GROUP BY venda_id\n) x;"
        },
        {
          "number": 59,
          "question": "Listar produtos mais comprados por donos de aves.",
          "answer": "SELECT produto_id, SUM(quantidade)\nFROM vendas_itens vi\nJOIN vendas v ON v.id = vi.venda_id\nWHERE especie_dom = 'Ave'\nGROUP BY produto_id;"
        },
        {
          "number": 60,
          "question": "Selecionar consultas que tenham diagnóstico “vacinação” mas não contenham registro na carteirinha.",
          "answer": "SELECT c.*\nFROM consultas c\nLEFT JOIN carteirinha_vacinas cv ON cv.animal_id = c.animal_id\nWHERE c.diagnostico ILIKE '%vacinação%'\n  AND cv.id IS NULL;"
        },
        {
          "number": 61,
          "question": "Obter o total de vendas por cidade do cliente.",
          "answer": "SELECT SPLIT_PART(endereco, ',', 3) AS cidade, SUM(v.total)\nFROM clientes c\nJOIN vendas v ON v.cliente_id = c.id\nGROUP BY cidade;"
        },
        {
          "number": 62,
          "question": "Descobrir o produto mais rentável (maior receita gerada).",
          "answer": "SELECT produto_id, SUM(quantidade * preco_unitario) AS receita\nFROM vendas_itens\nGROUP BY produto_id\nORDER BY receita DESC\nLIMIT 1;"
        },
        {
          "number": 63,
          "question": "Listar consultas feitas em dias chuvosos simulados via data específica (filtragem).",
          "answer": "SELECT * FROM consultas \nWHERE DATE(data_consulta) = '2024-03-10';"
        },
        {
          "number": 64,
          "question": "Obter animais que possuem mais de 3 doenças distintas registradas.",
          "answer": "SELECT animal_id, COUNT(DISTINCT diagnostico)\nFROM consultas\nGROUP BY animal_id\nHAVING COUNT(DISTINCT diagnostico) > 3;"
        },
        {
          "number": 65,
          "question": "Listar veterinários que aplicaram vacinas em mais de 50 espécies diferentes.",
          "answer": "SELECT cv.veterinario_id, COUNT(DISTINCT a.especie)\nFROM carteirinha_vacinas cv\nJOIN animais a ON a.id = cv.animal_id\nGROUP BY cv.veterinario_id\nHAVING COUNT(DISTINCT a.especie) > 50;"
        },
        {
          "number": 66,
          "question": "Selecionar clientes cujo endereço contenha “Centro”.",
          "answer": "SELECT * FROM clientes WHERE endereco ILIKE '%Centro%';"
        },
        {
          "number": 67,
          "question": "Agrupar o total de consultas por estado (derivado do endereço do cliente).",
          "answer": "SELECT SPLIT_PART(endereco, '/', 2) AS estado, COUNT(*)\nFROM clientes c\nJOIN consultas a ON a.animal_id = a.animal_id\nGROUP BY estado;"
        },
        {
          "number": 68,
          "question": "Listar produtos que nunca foram vendidos.",
          "answer": "SELECT * FROM produtos p\nWHERE NOT EXISTS (\n    SELECT 1 FROM vendas_itens vi WHERE vi.produto_id = p.id\n);"
        },
        {
          "number": 69,
          "question": "Listar as 100 consultas mais recentes.",
          "answer": "SELECT * FROM consultas ORDER BY data_consulta DESC LIMIT 100;"
        },
        {
          "number": 70,
          "question": "Listar os 50 animais mais jovens.",
          "answer": "SELECT * FROM animais ORDER BY data_nascimento DESC LIMIT 50;"
        },
        {
          "number": 71,
          "question": "Identificar vacinas não aplicadas em nenhuma espécie.",
          "answer": "SELECT * FROM vacinas v\nWHERE NOT EXISTS (\n    SELECT 1 FROM carteirinha_vacinas cv WHERE cv.vacina_id = v.id\n);"
        },
        {
          "number": 72,
          "question": "Listar consultas com diagnósticos considerados graves (lista pré-definida).",
          "answer": "SELECT * FROM consultas \nWHERE diagnostico IN ('Displasia', 'Cardiomiopatia', 'Doença renal crônica');"
        },
        {
          "number": 73,
          "question": "Obter as vendas por faixa de horário (manhã, tarde, noite).",
          "answer": "SELECT \nCASE \n WHEN EXTRACT(HOUR FROM data_venda) < 12 THEN 'Manhã'\n WHEN EXTRACT(HOUR FROM data_venda) < 18 THEN 'Tarde'\n ELSE 'Noite'\nEND AS periodo,\nCOUNT(*)\nFROM vendas\nGROUP BY periodo;"
        },
        {
          "number": 74,
          "question": "Calcular a taxa de retorno (consultas repetidas por animal) por espécie.",
          "answer": "SELECT especie, AVG(cnt)\nFROM (\n    SELECT a.especie, COUNT(*) AS cnt\n    FROM consultas c\n    JOIN animais a ON a.id = c.animal_id\n    GROUP BY a.id, a.especie\n) x\nGROUP BY especie;"
        },
        {
          "number": 75,
          "question": "Listar animais cujo nome contenha três letras consecutivas iguais (casos raros).",
          "answer": "SELECT * FROM animais WHERE nome ~ '(.)\\1\\1';"
        },
        {
          "number": 76,
          "question": "Identificar clientes com mais de uma compra em menos de 24h.",
          "answer": "SELECT cliente_id\nFROM vendas\nGROUP BY cliente_id\nHAVING MIN(data_venda) + INTERVAL '24 hours' > MAX(data_venda);"
        },
        {
          "number": 77,
          "question": "Calcular a porcentagem de consultas por espécie no último ano.",
          "answer": "SELECT especie, COUNT(*)\nFROM consultas c\nJOIN animais a ON a.id = c.animal_id\nWHERE c.data_consulta > NOW() - INTERVAL '1 year'\nGROUP BY especie;"
        },
        {
          "number": 78,
          "question": "Selecionar consultas com duração implícita (analisando timestamps).",
          "answer": "(sem duração real, apenas demonstrativo)\nSELECT * FROM consultas WHERE data_consulta = data_consulta;"
        },
        {
          "number": 79,
          "question": "Identificar produtos que subiram de preço (se houvesse histórico).",
          "answer": "(histórico inexistente)\nSELECT 'Histórico não disponível' AS info;"
        },
        {
          "number": 80,
          "question": "Listar consultas com diagnósticos incompatíveis com espécie (ex.: artrite em canários).",
          "answer": "SELECT c.*, a.especie\nFROM consultas c\nJOIN animais a ON a.id = c.animal_id\nWHERE a.especie = 'Ave'\nAND c.diagnostico ILIKE '%artrite%';"
        },
        {
          "number": 81,
          "question": "Listar animais cujos donos moram na mesma rua.",
          "answer": "SELECT cliente_id, COUNT(*)\nFROM clientes\nGROUP BY SPLIT_PART(endereco, ',', 1)\nHAVING COUNT(*) > 1;"
        },
        {
          "number": 82,
          "question": "Relacionar venda → itens → produtos → espécie dominante.",
          "answer": "SELECT v.id, vi.produto_id, p.nome, v.especie_dom\nFROM vendas v\nJOIN vendas_itens vi ON v.id = vi.venda_id\nJOIN produtos p ON vi.produto_id = p.id;"
        },
        {
          "number": 83,
          "question": "Obter o número médio de animais por cliente por cidade.",
          "answer": "SELECT cidade, AVG(qtd)\nFROM (\n    SELECT SPLIT_PART(endereco, ',', 3) AS cidade, COUNT(a.id) AS qtd\n    FROM clientes c\n    JOIN animais a ON a.cliente_id = c.id\n    GROUP BY c.id\n) x\nGROUP BY cidade;"
        },
        {
          "number": 84,
          "question": "Listar clientes com email inválido (sem “@”).",
          "answer": "SELECT * FROM clientes WHERE email NOT LIKE '%@%';"
        },
        {
          "number": 85,
          "question": "Identificar animais nomeados iguais mas com espécies diferentes.",
          "answer": "SELECT nome, COUNT(*)\nFROM animais\nGROUP BY nome\nHAVING COUNT(*) > 1;"
        },
        {
          "number": 86,
          "question": "Obter a curva de sazonalidade das consultas (mês a mês).",
          "answer": "SELECT DATE_TRUNC('month', data_consulta) AS mes, COUNT(*)\nFROM consultas\nGROUP BY mes\nORDER BY mes;"
        },
        {
          "number": 87,
          "question": "Mostrar os diagnósticos raros (aparecem menos de 5 vezes).",
          "answer": "SELECT diagnostico, COUNT(*)\nFROM consultas\nGROUP BY diagnostico\nHAVING COUNT(*) < 5;"
        },
        {
          "number": 88,
          "question": "Listar produtos consumidos preferencialmente por quem tem cães.",
          "answer": "SELECT produto_id, SUM(quantidade)\nFROM vendas_itens vi\nJOIN vendas v ON v.id = vi.venda_id\nWHERE v.especie_dom = 'Cachorro'\nGROUP BY produto_id;"
        },
        {
          "number": 89,
          "question": "Obter vendas agrupadas por ano e mês.",
          "answer": "SELECT DATE_TRUNC('month', data_venda) AS mes, SUM(total)\nFROM vendas\nGROUP BY mes\nORDER BY mes;"
        },
        {
          "number": 90,
          "question": "Listar consultas que ocorreram em feriados específicos (manualmente definidos).",
          "answer": "SELECT * FROM consultas \nWHERE DATE(data_consulta) IN ('2023-12-25', '2024-01-01');"
        },
        {
          "number": 91,
          "question": "Selecionar animais que receberam todas as vacinas possíveis.",
          "answer": "SELECT animal_id\nFROM carteirinha_vacinas\nGROUP BY animal_id\nHAVING COUNT(DISTINCT vacina_id) = (SELECT COUNT(*) FROM vacinas);"
        },
        {
          "number": 92,
          "question": "Agrupar diagnósticos por raça e rankear os mais comuns.",
          "answer": "SELECT raca, diagnostico, COUNT(*)\nFROM consultas c\nJOIN animais a ON a.id = c.animal_id\nGROUP BY raca, diagnostico\nORDER BY raca, COUNT(*) DESC;"
        },
        {
          "number": 93,
          "question": "Listar animais com risco epidemiológico (3 ou mais diagnósticos graves).",
          "answer": "SELECT animal_id\nFROM consultas\nWHERE diagnostico IN ('DTUIF','Doença renal crônica','Cardiomiopatia hipertrófica')\nGROUP BY animal_id\nHAVING COUNT(*) >= 3;"
        },
        {
          "number": 94,
          "question": "Identificar consultas duplicadas pelo mesmo veterinário no mesmo minuto.",
          "answer": "SELECT veterinario_id, data_consulta, COUNT(*)\nFROM consultas\nGROUP BY veterinario_id, data_consulta\nHAVING COUNT(*) > 1;"
        },
        {
          "number": 95,
          "question": "Listar clientes com mais de 10 itens comprados numa única venda.",
          "answer": "SELECT venda_id\nFROM vendas_itens\nGROUP BY venda_id\nHAVING SUM(quantidade) > 10;"
        },
        {
          "number": 96,
          "question": "Relacionar consultas por porte do animal.",
          "answer": "SELECT a.porte, COUNT(c.id)\nFROM animais a\nJOIN consultas c ON c.animal_id = a.id\nGROUP BY a.porte;"
        },
        {
          "number": 97,
          "question": "Analisar média de gasto por espécie do animal do cliente.",
          "answer": "SELECT especie_dom, AVG(total)\nFROM vendas\nGROUP BY especie_dom;"
        },
        {
          "number": 98,
          "question": "Listar animais que têm mais de 5 produtos diferentes comprados.",
          "answer": "SELECT cliente_id\nFROM vendas_itens vi\nJOIN vendas v ON v.id = vi.venda_id\nGROUP BY cliente_id\nHAVING COUNT(DISTINCT produto_id) > 5;"
        },
        {
          "number": 99,
          "question": "Identificar clientes que só possuem aves, mas compram produtos para cães.",
          "answer": "SELECT v.cliente_id\nFROM vendas v\nJOIN vendas_itens vi ON vi.venda_id = v.id\nJOIN produtos p ON p.id = vi.produto_id\nJOIN clientes c ON c.id = v.cliente_id\nWHERE p.nome ILIKE '%cães%'\nAND v.cliente_id IN (\n    SELECT cliente_id\n    FROM animais\n    GROUP BY cliente_id\n    HAVING BOOL_AND(especie = 'Ave')\n);"
        },
        {
          "number": 100,
          "question": "Listar o top 1% dos animais mais consultados na clínica.",
          "answer": "SELECT animal_id\nFROM consultas\nGROUP BY animal_id\nORDER BY COUNT(*) DESC\nLIMIT (SELECT CEIL(COUNT(*)*0.01) FROM consultas);"
        }
      ]
    },
    {
      "slug": "joins",
      "order": 2,
      "title": "50 exercícios de JOINs",
      "summary": "Treine INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN, CROSS JOIN, self join, NATURAL JOIN e LATERAL.",
      "level": "Intermediário",
      "exercises": [
        {
          "number": 1,
          "question": "Listar todos os animais com os respectivos nomes de seus donos.",
          "answer": "SELECT a.*, c.nome AS cliente\nFROM animais a\nJOIN clientes c ON c.id = a.cliente_id;"
        },
        {
          "number": 2,
          "question": "Listar todos os clientes mesmo quando não possuam animais cadastrados.",
          "answer": "SELECT c.*, a.id AS animal_id\nFROM clientes c\nLEFT JOIN animais a ON a.cliente_id = c.id;"
        },
        {
          "number": 3,
          "question": "Exibir todas as consultas mostrando o nome do animal e o nome do cliente.",
          "answer": "SELECT c.*, a.nome AS animal, cli.nome AS cliente\nFROM consultas c\nJOIN animais a ON a.id = c.animal_id\nJOIN clientes cli ON cli.id = a.cliente_id;"
        },
        {
          "number": 4,
          "question": "Relacionar veterinários com as consultas que realizaram, incluindo os que não possuem atendimentos.",
          "answer": "SELECT v.*, c.id AS consulta_id\nFROM veterinarios v\nLEFT JOIN consultas c ON c.veterinario_id = v.id;"
        },
        {
          "number": 5,
          "question": "Mostrar todas as vendas com seus itens e o nome dos produtos.",
          "answer": "SELECT v.id AS venda, p.nome, vi.quantidade\nFROM vendas v\nJOIN vendas_itens vi ON vi.venda_id = v.id\nJOIN produtos p ON p.id = vi.produto_id;"
        },
        {
          "number": 6,
          "question": "Gerar todas as combinações possíveis entre espécies registradas e os produtos existentes.",
          "answer": "SELECT DISTINCT a.especie, p.nome\nFROM animais a\nCROSS JOIN produtos p;"
        },
        {
          "number": 7,
          "question": "Para cada cliente, exibir seu animal mais recentemente cadastrado.",
          "answer": "SELECT c.nome, a.*\nFROM clientes c\nJOIN LATERAL (\n    SELECT *\n    FROM animais\n    WHERE cliente_id = c.id\n    ORDER BY id DESC\n    LIMIT 1\n) a ON true;"
        },
        {
          "number": 8,
          "question": "Para cada animal, mostrar a última consulta realizada.",
          "answer": "SELECT a.nome, c.*\nFROM animais a\nLEFT JOIN LATERAL (\n    SELECT *\n    FROM consultas\n    WHERE animal_id = a.id\n    ORDER BY data_consulta DESC\n    LIMIT 1\n) c ON true;"
        },
        {
          "number": 9,
          "question": "Listar todas as vacinas aplicadas relacionando com os animais que as receberam.",
          "answer": "SELECT a.nome, v.nome AS vacina, cv.data_aplicacao\nFROM carteirinha_vacinas cv\nJOIN animais a ON a.id = cv.animal_id\nJOIN vacinas v ON v.id = cv.vacina_id;"
        },
        {
          "number": 10,
          "question": "Exibir produtos e as vendas nas quais foram incluídos, mesmo quando algum produto nunca tenha sido vendido.",
          "answer": "SELECT p.*, vi.venda_id\nFROM produtos p\nRIGHT JOIN vendas_itens vi ON vi.produto_id = p.id;"
        },
        {
          "number": 11,
          "question": "Mostrar consultas relacionando diagnóstico com a especialidade do veterinário.",
          "answer": "SELECT c.*, v.especialidade\nFROM consultas c\nJOIN veterinarios v ON v.id = c.veterinario_id;"
        },
        {
          "number": 12,
          "question": "Mostrar os veterinários e todas as vacinas que já aplicaram, incluindo os que nunca aplicaram nenhuma.",
          "answer": "SELECT v.nome, cv.vacina_id\nFROM veterinarios v\nLEFT JOIN carteirinha_vacinas cv ON cv.veterinario_id = v.id;"
        },
        {
          "number": 13,
          "question": "Analisar consultas do mesmo animal ocorridas em datas próximas comparando registros entre si.",
          "answer": "SELECT c1.*, c2.*\nFROM consultas c1\nJOIN consultas c2 \n  ON c1.animal_id = c2.animal_id \n AND c1.id <> c2.id;"
        },
        {
          "number": 14,
          "question": "Exibir consultas associadas aos animais filtrando somente as que ocorreram no mesmo mês.",
          "answer": "SELECT c.*, a.nome\nFROM consultas c\nJOIN animais a ON a.id = c.animal_id\nWHERE EXTRACT(MONTH FROM c.data_consulta) = EXTRACT(MONTH FROM NOW());"
        },
        {
          "number": 15,
          "question": "Relacionar consultas e vendas ocorridas no mesmo dia, mesmo quando um dos lados não tiver registros.",
          "answer": "SELECT c.*, v.*\nFROM consultas c\nFULL JOIN vendas v\nON DATE(v.data_venda) = DATE(c.data_consulta);"
        },
        {
          "number": 16,
          "question": "Relacionar exames solicitados com as consultas que os originaram.",
          "answer": "SELECT pe.*, ex.nome AS exame, c.data_consulta\nFROM pedidos_exames pe\nJOIN exames ex ON ex.id = pe.exame_id\nJOIN consultas c ON c.id = pe.consulta_id;"
        },
        {
          "number": 17,
          "question": "Exibir clientes e a quantidade total de produtos adquiridos por eles.",
          "answer": "SELECT c.nome, SUM(vi.quantidade)\nFROM clientes c\nJOIN vendas v ON v.cliente_id = c.id\nJOIN vendas_itens vi ON vi.venda_id = v.id\nGROUP BY c.nome;"
        },
        {
          "number": 18,
          "question": "Relacionar produtos com outros produtos semelhantes baseando-se na similaridade do nome.",
          "answer": "SELECT p1.*, p2.*\nFROM produtos p1\nJOIN produtos p2 ON p1.id <> p2.id \nWHERE LEFT(p1.nome, 5) = LEFT(p2.nome, 5);"
        },
        {
          "number": 19,
          "question": "Mostrar consultas em que o veterinário também participou de um procedimento vacinal para o mesmo animal no mesmo dia.",
          "answer": "SELECT c.*, cv.*\nFROM consultas c\nJOIN carteirinha_vacinas cv \n  ON cv.veterinario_id = c.veterinario_id\n AND cv.animal_id = c.animal_id;"
        },
        {
          "number": 20,
          "question": "Ligar vendas ao conjunto de animais do cliente que realizou cada venda.",
          "answer": "SELECT v.id AS venda, a.*\nFROM vendas v\nJOIN clientes c ON c.id = v.cliente_id\nJOIN animais a ON a.cliente_id = c.id;"
        },
        {
          "number": 21,
          "question": "Relacionar registros de vacinação e consultas do mesmo animal no mesmo período.",
          "answer": "SELECT c.*, cv.data_aplicacao\nFROM consultas c\nJOIN carteirinha_vacinas cv ON cv.animal_id = c.animal_id;"
        },
        {
          "number": 22,
          "question": "Exibir clientes com seus endereços associados a uma lista única de cidades.",
          "answer": "SELECT c.*, SPLIT_PART(c.endereco, '/', 1) AS cidade\nFROM clientes c;"
        },
        {
          "number": 23,
          "question": "Relacionar cada exame solicitado com o diagnóstico da consulta em que foi pedido.",
          "answer": "SELECT ex.nome, c.diagnostico\nFROM pedidos_exames pe\nJOIN exames ex ON ex.id = pe.exame_id\nJOIN consultas c ON c.id = pe.consulta_id;"
        },
        {
          "number": 24,
          "question": "Exibir animais cujos donos compraram produtos adequados à espécie do próprio animal.",
          "answer": "SELECT a.*, p.nome\nFROM animais a\nJOIN clientes c ON c.id = a.cliente_id\nJOIN vendas v ON v.cliente_id = c.id\nJOIN vendas_itens vi ON vi.venda_id = v.id\nJOIN produtos p ON p.id = vi.produto_id;"
        },
        {
          "number": 25,
          "question": "Vincular veterinários a produtos mais adquiridos pelos clientes que eles atendem.",
          "answer": "SELECT vet.nome, p.nome, SUM(vi.quantidade)\nFROM veterinarios vet\nJOIN consultas c ON c.veterinario_id = vet.id\nJOIN animais a ON a.id = c.animal_id\nJOIN clientes cli ON cli.id = a.cliente_id\nJOIN vendas v ON v.cliente_id = cli.id\nJOIN vendas_itens vi ON vi.venda_id = v.id\nJOIN produtos p ON p.id = vi.produto_id\nGROUP BY vet.nome, p.nome;"
        },
        {
          "number": 26,
          "question": "Comparar registros de consultas do mesmo animal ocorridas no mesmo dia.",
          "answer": "SELECT c1.*, c2.*\nFROM consultas c1\nJOIN consultas c2 \n  ON c1.animal_id = c2.animal_id\n AND c1.id <> c2.id\n AND DATE(c1.data_consulta) = DATE(c2.data_consulta);"
        },
        {
          "number": 27,
          "question": "Detectar vendas realizadas na mesma semana de uma consulta do animal do cliente.",
          "answer": "SELECT c.*, v.*\nFROM consultas c\nJOIN vendas v \nON c.animal_id IN (\n    SELECT a.id FROM animais a WHERE a.cliente_id = v.cliente_id\n)\nAND DATE_TRUNC('week', c.data_consulta) = DATE_TRUNC('week', v.data_venda);"
        },
        {
          "number": 28,
          "question": "Relacionar consultas e vendas do mesmo cliente ocorridas dentro de uma mesma hora.",
          "answer": "SELECT c.*, v.*\nFROM consultas c\nJOIN animais a ON a.id = c.animal_id\nJOIN vendas v ON v.cliente_id = a.cliente_id\nWHERE ABS(EXTRACT(EPOCH FROM (v.data_venda - c.data_consulta))) < 3600;"
        },
        {
          "number": 29,
          "question": "Exibir todos os animais e todas as consultas, mesmo quando um dos lados não possua registros.",
          "answer": "SELECT a.*, c.*\nFROM animais a\nFULL JOIN consultas c ON c.animal_id = a.id;"
        },
        {
          "number": 30,
          "question": "Comparar clientes entre si buscando pessoas com endereços semelhantes.",
          "answer": "SELECT c1.*, c2.*\nFROM clientes c1\nJOIN clientes c2 \nON c1.id <> c2.id\nAND LEFT(c1.endereco, 10) = LEFT(c2.endereco, 10);"
        },
        {
          "number": 31,
          "question": "Identificar padrões de compra a partir da relação entre vendas, itens e a espécie dominante do cliente.",
          "answer": "SELECT v.especie_dom, p.nome, SUM(vi.quantidade)\nFROM vendas v\nJOIN vendas_itens vi ON vi.venda_id = v.id\nJOIN produtos p ON p.id = vi.produto_id\nGROUP BY v.especie_dom, p.nome;"
        },
        {
          "number": 32,
          "question": "Relacionar vendas e seus itens utilizando apenas as colunas que possuem o mesmo nome.",
          "answer": "SELECT *\nFROM vendas\nNATURAL JOIN vendas_itens;"
        },
        {
          "number": 33,
          "question": "Exibir animais e os produtos comprados pelos donos desses animais.",
          "answer": "SELECT a.nome, p.nome AS produto\nFROM animais a\nJOIN clientes c ON c.id = a.cliente_id\nJOIN vendas v ON v.cliente_id = c.id\nJOIN vendas_itens vi ON vi.venda_id = v.id\nJOIN produtos p ON p.id = vi.produto_id;"
        },
        {
          "number": 34,
          "question": "Relacionar consultas e veterinários, mesmo quando um registro de consulta esteja órfão.",
          "answer": "SELECT c.*, v.nome\nFROM consultas c\nRIGHT JOIN veterinarios v ON v.id = c.veterinario_id;"
        },
        {
          "number": 35,
          "question": "Relacionar produtos com outros produtos que compartilham o mesmo prefixo no nome.",
          "answer": "SELECT p1.nome, p2.nome\nFROM produtos p1\nJOIN produtos p2 ON p1.id <> p2.id\nAND LEFT(p1.nome, 3) = LEFT(p2.nome, 3);"
        },
        {
          "number": 36,
          "question": "Exibir exames solicitados e o veterinário que autorizou a consulta que gerou o exame.",
          "answer": "SELECT ex.nome, vet.nome\nFROM pedidos_exames pe\nJOIN exames ex ON ex.id = pe.exame_id\nJOIN consultas c ON c.id = pe.consulta_id\nJOIN veterinarios vet ON vet.id = c.veterinario_id;"
        },
        {
          "number": 37,
          "question": "Relacionar vacinas aplicadas com seus respectivos nomes, incluindo vacinas nunca aplicadas.",
          "answer": "SELECT v.nome, cv.data_aplicacao\nFROM vacinas v\nLEFT JOIN carteirinha_vacinas cv ON cv.vacina_id = v.id;"
        },
        {
          "number": 38,
          "question": "Vincular clientes e vendas mostrando todos os clientes e todas as vendas.",
          "answer": "SELECT c.*, v.*\nFROM clientes c\nFULL JOIN vendas v ON v.cliente_id = c.id;"
        },
        {
          "number": 39,
          "question": "Relacionar vendas, itens e exames para identificar vínculos indiretos entre diagnósticos e compras.",
          "answer": "SELECT v.id, vi.produto_id, ex.nome\nFROM vendas v\nJOIN vendas_itens vi ON vi.venda_id = v.id\nJOIN clientes c ON c.id = v.cliente_id\nJOIN animais a ON a.cliente_id = c.id\nJOIN consultas co ON co.animal_id = a.id\nJOIN pedidos_exames pe ON pe.consulta_id = co.id\nJOIN exames ex ON ex.id = pe.exame_id;"
        },
        {
          "number": 40,
          "question": "Relacionar consultas e animais para exibir atendimentos classificados por porte.",
          "answer": "SELECT a.porte, c.*\nFROM animais a\nJOIN consultas c ON c.animal_id = a.id;"
        },
        {
          "number": 41,
          "question": "Comparar clientes com possíveis homônimos sem agrupar resultados.",
          "answer": "SELECT c1.*, c2.*\nFROM clientes c1\nJOIN clientes c2 \nON c1.id <> c2.id\nAND c1.nome = c2.nome;"
        },
        {
          "number": 42,
          "question": "Relacionar veterinários com todas as especialidades possíveis gerando uma matriz de disponibilidade.",
          "answer": "SELECT v.nome, e.especialidade\nFROM veterinarios v\nCROSS JOIN (VALUES ('Clínica Geral'), ('Cirurgia'), ('Dermatologia'), ('Ortopedia')) e(especialidade);"
        },
        {
          "number": 43,
          "question": "Relacionar consultas recentes com registros de vacinação recentes do mesmo animal.",
          "answer": "SELECT c.*, cv.data_aplicacao\nFROM consultas c\nJOIN carteirinha_vacinas cv ON cv.animal_id = c.animal_id\nWHERE cv.data_aplicacao > c.data_consulta - INTERVAL '30 days';"
        },
        {
          "number": 44,
          "question": "Exibir vendas realizadas por clientes que possuem animais de uma espécie específica.",
          "answer": "SELECT v.*, a.especie\nFROM vendas v\nJOIN clientes c ON c.id = v.cliente_id\nJOIN animais a ON a.cliente_id = c.id\nWHERE a.especie = 'Cachorro';"
        },
        {
          "number": 45,
          "question": "Exibir clientes e consultas mostrando todos os clientes, independentemente de terem consultas.",
          "answer": "SELECT c.*, co.*\nFROM clientes c\nLEFT JOIN animais a ON a.cliente_id = c.id\nLEFT JOIN consultas co ON co.animal_id = a.id;"
        },
        {
          "number": 46,
          "question": "Comparar produtos e vendas para detectar vendas que utilizam produtos não catalogados.",
          "answer": "SELECT vi.*, p.*\nFROM vendas_itens vi\nRIGHT JOIN produtos p ON p.id = vi.produto_id;"
        },
        {
          "number": 47,
          "question": "Relacionar vacinas e exames para formar um catálogo geral de procedimentos.",
          "answer": "SELECT v.nome AS vacina, e.nome AS exame\nFROM vacinas v\nCROSS JOIN exames e;"
        },
        {
          "number": 48,
          "question": "Associar a consulta ao registro da venda mais recente do cliente.",
          "answer": "SELECT c.*, v.*\nFROM consultas c\nJOIN animais a ON a.id = c.animal_id\nJOIN clientes cli ON cli.id = a.cliente_id\nJOIN LATERAL (\n    SELECT *\n    FROM vendas v\n    WHERE v.cliente_id = cli.id\n    ORDER BY v.data_venda DESC\n    LIMIT 1\n) v ON true;"
        },
        {
          "number": 49,
          "question": "Comparar vendas de um mesmo cliente para identificar compras feitas exatamente no mesmo minuto.",
          "answer": "SELECT v1.*, v2.*\nFROM vendas v1\nJOIN vendas v2 \nON v1.cliente_id = v2.cliente_id\nAND v1.id <> v2.id\nAND DATE_TRUNC('minute', v1.data_venda) = DATE_TRUNC('minute', v2.data_venda);"
        },
        {
          "number": 50,
          "question": "Gerar correspondência entre exames e vacinas para criar um mapa geral de procedimentos oferecidos na clínica.",
          "answer": "SELECT ex.nome AS exame, v.nome AS vacina\nFROM exames ex\nCROSS JOIN vacinas v;"
        }
      ]
    },
    {
      "slug": "subconsultas",
      "order": 3,
      "title": "50 exercícios de subconsultas",
      "summary": "Resolva problemas com subconsultas escalares, correlacionadas, IN, NOT IN, EXISTS, NOT EXISTS e agregações aninhadas.",
      "level": "Intermediário",
      "exercises": [
        {
          "number": 1,
          "question": "Selecionar clientes que possuem mais animais do que a média geral de animais por cliente, usando subconsulta escalar.",
          "answer": "SELECT c.id, c.nome\nFROM clientes c\nJOIN animais a ON a.cliente_id = c.id\nGROUP BY c.id, c.nome\nHAVING COUNT(a.id) >\n    (\n        SELECT AVG(sub.qtd) \n        FROM (\n            SELECT COUNT(*) AS qtd\n            FROM animais\n            GROUP BY cliente_id\n        ) sub\n    );"
        },
        {
          "number": 2,
          "question": "Listar animais cujo número de consultas é maior que o número de consultas do animal mais consultado do mesmo cliente.",
          "answer": "SELECT a.id, a.nome, c.nome AS cliente\nFROM animais a\nJOIN clientes c ON c.id = a.cliente_id\nJOIN consultas co ON co.animal_id = a.id\nGROUP BY a.id, a.nome, c.nome, a.cliente_id\nHAVING COUNT(co.id) >\n    (\n        SELECT MAX(cnt)\n        FROM (\n            SELECT COUNT(*) AS cnt\n            FROM consultas co2\n            JOIN animais a2 ON a2.id = co2.animal_id\n            WHERE a2.cliente_id = a.cliente_id\n            GROUP BY co2.animal_id\n        ) sub\n    );"
        },
        {
          "number": 3,
          "question": "Exibir clientes cujo total gasto em vendas é superior ao gasto médio de todos os clientes.",
          "answer": "SELECT c.id, c.nome, SUM(v.total) AS total_cliente\nFROM clientes c\nJOIN vendas v ON v.cliente_id = c.id\nGROUP BY c.id, c.nome\nHAVING SUM(v.total) >\n    (\n        SELECT AVG(total_por_cliente)\n        FROM (\n            SELECT SUM(total) AS total_por_cliente\n            FROM vendas\n            GROUP BY cliente_id\n        ) sub\n    );"
        },
        {
          "number": 4,
          "question": "Listar produtos cujo preço é maior que o preço médio dos produtos do mesmo grupo.",
          "answer": "SELECT *\nFROM produtos\nWHERE preco >\n    (SELECT AVG(preco) FROM produtos);"
        },
        {
          "number": 5,
          "question": "Exibir o animal mais jovem de cada espécie usando subconsulta na cláusula WHERE.",
          "answer": "SELECT a.*\nFROM animais a\nWHERE data_nascimento =\n    (\n        SELECT MAX(a2.data_nascimento)\n        FROM animais a2\n        WHERE a2.especie = a.especie\n    );"
        },
        {
          "number": 6,
          "question": "Listar consultas realizadas pelo veterinário cujo CRMV é o menor da tabela.",
          "answer": "SELECT c.*\nFROM consultas c\nWHERE c.veterinario_id =\n    (\n        SELECT v.id\n        FROM veterinarios v\n        ORDER BY v.crmv\n        LIMIT 1\n    );"
        },
        {
          "number": 7,
          "question": "Selecionar clientes que nunca compraram produtos, usando NOT EXISTS.",
          "answer": "SELECT *\nFROM clientes c\nWHERE NOT EXISTS (\n    SELECT 1\n    FROM vendas v\n    WHERE v.cliente_id = c.id\n);"
        },
        {
          "number": 8,
          "question": "Listar animais que possuem pelo menos uma consulta no mesmo dia de uma vacina aplicada.",
          "answer": "SELECT DISTINCT a.id, a.nome\nFROM animais a\nWHERE EXISTS (\n    SELECT 1\n    FROM consultas c\n    JOIN carteirinha_vacinas cv ON cv.animal_id = c.animal_id\n    WHERE c.animal_id = a.id\n      AND DATE(c.data_consulta) = cv.data_aplicacao\n);"
        },
        {
          "number": 9,
          "question": "Selecionar vendas cujo total coincide com a soma dos itens calculada por subconsulta.",
          "answer": "SELECT v.*\nFROM vendas v\nWHERE v.total =\n    (\n        SELECT COALESCE(SUM(vi.quantidade * vi.preco_unitario),0)\n        FROM vendas_itens vi\n        WHERE vi.venda_id = v.id\n    );"
        },
        {
          "number": 10,
          "question": "Exibir todos os veterinários que atenderam o animal com maior número de consultas no sistema.",
          "answer": "SELECT DISTINCT v.*\nFROM veterinarios v\nJOIN consultas c ON c.veterinario_id = v.id\nWHERE c.animal_id =\n    (\n        SELECT animal_id\n        FROM consultas\n        GROUP BY animal_id\n        ORDER BY COUNT(*) DESC\n        LIMIT 1\n    );"
        },
        {
          "number": 11,
          "question": "Listar produtos nunca vendidos usando subconsulta com NOT IN.",
          "answer": "SELECT *\nFROM produtos p\nWHERE p.id NOT IN (\n    SELECT DISTINCT produto_id\n    FROM vendas_itens\n);"
        },
        {
          "number": 12,
          "question": "Exibir a data da consulta mais recente de cada animal usando subconsulta correlacionada.",
          "answer": "SELECT a.id, a.nome,\n       (\n           SELECT MAX(c.data_consulta)\n           FROM consultas c\n           WHERE c.animal_id = a.id\n       ) AS ultima_consulta\nFROM animais a;"
        },
        {
          "number": 13,
          "question": "Listar clientes cujo endereço está localizado na mesma cidade do cliente mais antigo cadastrado.",
          "answer": "SELECT *\nFROM clientes c\nWHERE SPLIT_PART(c.endereco, '/', 1) =\n    (\n        SELECT SPLIT_PART(endereco, '/', 1)\n        FROM clientes\n        ORDER BY id\n        LIMIT 1\n    );"
        },
        {
          "number": 14,
          "question": "Mostrar animais que possuem mais de uma raça igual entre clientes diferentes usando subconsulta de agrupamento.",
          "answer": "SELECT a.*\nFROM animais a\nWHERE a.raca IN (\n    SELECT raca\n    FROM animais\n    GROUP BY raca\n    HAVING COUNT(DISTINCT cliente_id) > 1\n);"
        },
        {
          "number": 15,
          "question": "Selecionar vendas acima do percentil 90 calculado via subconsulta.",
          "answer": "SELECT *\nFROM vendas\nWHERE total >\n    (\n        SELECT PERCENTILE_CONT(0.90) WITHIN GROUP (ORDER BY total)\n        FROM vendas\n    );"
        },
        {
          "number": 16,
          "question": "Exibir o nome do cliente que possui o maior número de vendas.",
          "answer": "SELECT c.*\nFROM clientes c\nWHERE c.id =\n    (\n        SELECT cliente_id\n        FROM vendas\n        GROUP BY cliente_id\n        ORDER BY COUNT(*) DESC\n        LIMIT 1\n    );"
        },
        {
          "number": 17,
          "question": "Listar consultas cujo diagnóstico é igual ao diagnóstico mais frequente na tabela.",
          "answer": "SELECT *\nFROM consultas\nWHERE diagnostico =\n    (\n        SELECT diagnostico\n        FROM consultas\n        GROUP BY diagnostico\n        ORDER BY COUNT(*) DESC\n        LIMIT 1\n    );"
        },
        {
          "number": 18,
          "question": "Selecionar produtos cujo estoque está abaixo do menor estoque registrado na tabela.",
          "answer": "SELECT *\nFROM produtos\nWHERE estoque <\n    (\n        SELECT MIN(estoque) FROM produtos\n    );"
        },
        {
          "number": 19,
          "question": "Listar clientes cujo CPF aparece mais de uma vez, usando subconsulta.",
          "answer": "SELECT *\nFROM clientes c\nWHERE c.cpf IN (\n    SELECT cpf\n    FROM clientes\n    GROUP BY cpf\n    HAVING COUNT(*) > 1\n);"
        },
        {
          "number": 20,
          "question": "Exibir consultas superiores à consulta média diária do sistema.",
          "answer": "SELECT *\nFROM consultas c\nWHERE DATE(c.data_consulta) IN (\n    SELECT dia\n    FROM (\n        SELECT DATE(data_consulta) AS dia, COUNT(*) AS qtd\n        FROM consultas\n        GROUP BY DATE(data_consulta)\n    ) sub\n    WHERE sub.qtd >\n        (\n            SELECT AVG(qtd)\n            FROM (\n                SELECT DATE(data_consulta) AS dia, COUNT(*) AS qtd\n                FROM consultas\n                GROUP BY DATE(data_consulta)\n            ) sub2\n        )\n);"
        },
        {
          "number": 21,
          "question": "Selecionar animais que nunca passaram por vacinação usando NOT EXISTS com subconsulta.",
          "answer": "SELECT *\nFROM animais a\nWHERE NOT EXISTS (\n    SELECT 1\n    FROM carteirinha_vacinas cv\n    WHERE cv.animal_id = a.id\n);"
        },
        {
          "number": 22,
          "question": "Listar veterinários cujo número total de atendimentos supera a média de atendimentos por veterinário.",
          "answer": "SELECT v.id, v.nome, COUNT(c.id) AS qtd\nFROM veterinarios v\nJOIN consultas c ON c.veterinario_id = v.id\nGROUP BY v.id, v.nome\nHAVING COUNT(c.id) >\n(\n    SELECT AVG(cnt)\n    FROM (\n        SELECT COUNT(*) AS cnt\n        FROM consultas\n        GROUP BY veterinario_id\n    ) sub\n);"
        },
        {
          "number": 23,
          "question": "Mostrar produtos mais caros do que todos os produtos do grupo “geral”.",
          "answer": "SELECT *\nFROM produtos p\nWHERE p.preco >\n    (\n        SELECT MAX(preco)\n        FROM produtos\n        WHERE nome ILIKE '%Ração%'\n    );"
        },
        {
          "number": 24,
          "question": "Listar clientes cujo nome é igual ao nome do cliente que mais comprou produtos.",
          "answer": "SELECT *\nFROM clientes c\nWHERE c.nome =\n(\n    SELECT c2.nome\n    FROM clientes c2\n    JOIN vendas v ON v.cliente_id = c2.id\n    GROUP BY c2.id, c2.nome\n    ORDER BY SUM(v.total) DESC\n    LIMIT 1\n);"
        },
        {
          "number": 25,
          "question": "Exibir os animais que possuem exatamente a mesma idade do animal mais velho da clínica.",
          "answer": "SELECT *\nFROM animais\nWHERE data_nascimento =\n    (\n        SELECT MIN(data_nascimento)\n        FROM animais\n    );"
        },
        {
          "number": 26,
          "question": "Selecionar vendas realizadas na mesma data da venda de maior valor.",
          "answer": "SELECT *\nFROM vendas\nWHERE DATE(data_venda) =\n    (\n        SELECT DATE(data_venda)\n        FROM vendas\n        ORDER BY total DESC\n        LIMIT 1\n    );"
        },
        {
          "number": 27,
          "question": "Listar animais cujo cliente possua mais vendas do que todos os outros clientes da mesma cidade.",
          "answer": "SELECT a.*\nFROM animais a\nJOIN clientes c ON c.id = a.cliente_id\nWHERE c.id =\n(\n    SELECT x.cliente_id\n    FROM (\n        SELECT c2.id AS cliente_id,\n               SPLIT_PART(c2.endereco, '/', 1) AS cidade,\n               SUM(v2.total) AS total_cidade\n        FROM clientes c2\n        LEFT JOIN vendas v2 ON v2.cliente_id = c2.id\n        GROUP BY c2.id, SPLIT_PART(c2.endereco, '/', 1)\n    ) x\n    WHERE x.cidade = SPLIT_PART(c.endereco, '/', 1)\n    ORDER BY x.total_cidade DESC\n    LIMIT 1\n);"
        },
        {
          "number": 28,
          "question": "Exibir consultas que ocorreram no intervalo da consulta mais antiga e da mais nova.",
          "answer": "SELECT *\nFROM consultas\nWHERE data_consulta BETWEEN\n    (SELECT MIN(data_consulta) FROM consultas)\n    AND\n    (SELECT MAX(data_consulta) FROM consultas);"
        },
        {
          "number": 29,
          "question": "Selecionar os 5 produtos mais vendidos utilizando uma subconsulta que calcula as quantidades totais.",
          "answer": "SELECT p.id, p.nome, sub.total_qtd\nFROM produtos p\nJOIN (\n    SELECT produto_id, SUM(quantidade) AS total_qtd\n    FROM vendas_itens\n    GROUP BY produto_id\n) sub ON sub.produto_id = p.id\nORDER BY sub.total_qtd DESC\nLIMIT 5;"
        },
        {
          "number": 30,
          "question": "Listar clientes que possuem animais cujo número de consultas coincide com o número de consultas do animal mais consultado dessa espécie.",
          "answer": "SELECT a.id, a.nome, COUNT(c.id) AS qtd\nFROM animais a\nJOIN consultas c ON c.animal_id = a.id\nGROUP BY a.id, a.nome, a.especie\nHAVING COUNT(c.id) =\n(\n    SELECT MAX(cnt)\n    FROM (\n        SELECT a2.id, COUNT(c2.id) AS cnt\n        FROM animais a2\n        JOIN consultas c2 ON c2.animal_id = a2.id\n        WHERE a2.especie = a.especie\n        GROUP BY a2.id\n    ) sub\n);"
        },
        {
          "number": 31,
          "question": "Selecionar consultas do dia em que houve o maior número total de consultas no mês corrente.",
          "answer": "SELECT *\nFROM consultas c\nWHERE DATE(c.data_consulta) IN (\n    SELECT dia\n    FROM (\n        SELECT DATE(data_consulta) AS dia, COUNT(*) AS qtd\n        FROM consultas\n        WHERE DATE_TRUNC('month', data_consulta) = DATE_TRUNC('month', CURRENT_DATE)\n        GROUP BY DATE(data_consulta)\n    ) sub\n    WHERE sub.qtd = (\n        SELECT MAX(qtd)\n        FROM (\n            SELECT DATE(data_consulta) AS dia, COUNT(*) AS qtd\n            FROM consultas\n            WHERE DATE_TRUNC('month', data_consulta) = DATE_TRUNC('month', CURRENT_DATE)\n            GROUP BY DATE(data_consulta)\n        ) sub2\n    )\n);"
        },
        {
          "number": 32,
          "question": "Exibir produtos cujo preço é maior que o preço máximo vendido no último mês.",
          "answer": "SELECT *\nFROM produtos p\nWHERE p.preco >\n(\n    SELECT MAX(vi.preco_unitario)\n    FROM vendas_itens vi\n    JOIN vendas v ON v.id = vi.venda_id\n    WHERE DATE_TRUNC('month', v.data_venda) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')\n);"
        },
        {
          "number": 33,
          "question": "Listar clientes com mais itens comprados do que a média geral de itens por cliente.",
          "answer": "SELECT c.id, c.nome, SUM(vi.quantidade) AS itens_cliente\nFROM clientes c\nJOIN vendas v ON v.cliente_id = c.id\nJOIN vendas_itens vi ON vi.venda_id = v.id\nGROUP BY c.id, c.nome\nHAVING SUM(vi.quantidade) >\n(\n    SELECT AVG(total_itens)\n    FROM (\n        SELECT c2.id, SUM(vi2.quantidade) AS total_itens\n        FROM clientes c2\n        JOIN vendas v2 ON v2.cliente_id = c2.id\n        JOIN vendas_itens vi2 ON vi2.venda_id = v2.id\n        GROUP BY c2.id\n    ) sub\n);"
        },
        {
          "number": 34,
          "question": "Selecionar animais que possuem consultas com diagnóstico igual ao diagnóstico mais raro da clínica.",
          "answer": "SELECT DISTINCT a.*\nFROM animais a\nJOIN consultas c ON c.animal_id = a.id\nWHERE c.diagnostico =\n(\n    SELECT diagnostico\n    FROM consultas\n    GROUP BY diagnostico\n    ORDER BY COUNT(*) ASC\n    LIMIT 1\n);"
        },
        {
          "number": 35,
          "question": "Listar veterinários que atenderam o mesmo animal atendido pelo veterinário mais ativo.",
          "answer": "SELECT DISTINCT v2.*\nFROM veterinarios v2\nJOIN consultas c2 ON c2.veterinario_id = v2.id\nWHERE c2.animal_id IN (\n    SELECT c.animal_id\n    FROM consultas c\n    WHERE c.veterinario_id =\n    (\n        SELECT veterinario_id\n        FROM consultas\n        GROUP BY veterinario_id\n        ORDER BY COUNT(*) DESC\n        LIMIT 1\n    )\n);"
        },
        {
          "number": 36,
          "question": "Obter o total de vendas do cliente com a venda mais recente registrada.",
          "answer": "SELECT SUM(v.total) AS total_cliente\nFROM vendas v\nWHERE v.cliente_id =\n(\n    SELECT cliente_id\n    FROM vendas\n    ORDER BY data_venda DESC\n    LIMIT 1\n);"
        },
        {
          "number": 37,
          "question": "Selecionar animais mais novos do que a média de idade da espécie correspondente.",
          "answer": "SELECT a.*\nFROM animais a\nWHERE AGE(CURRENT_DATE, a.data_nascimento) <\n(\n    SELECT AVG(AGE(CURRENT_DATE, a2.data_nascimento))\n    FROM animais a2\n    WHERE a2.especie = a.especie\n);"
        },
        {
          "number": 38,
          "question": "Listar consultas que ocorreram no mesmo minuto da consulta mais demorada (assumida pela diferença entre timestamps).",
          "answer": "SELECT *\nFROM consultas\nWHERE DATE_TRUNC('minute', data_consulta) =\n(\n    SELECT DATE_TRUNC('minute', MAX(data_consulta))\n    FROM consultas\n);"
        },
        {
          "number": 39,
          "question": "Selecionar clientes que moram no mesmo bairro do cliente com maior número de animais.",
          "answer": "SELECT *\nFROM clientes c\nWHERE SPLIT_PART(c.endereco, '-', 2) =\n(\n    SELECT SPLIT_PART(c2.endereco, '-', 2)\n    FROM clientes c2\n    JOIN animais a2 ON a2.cliente_id = c2.id\n    GROUP BY c2.id, c2.endereco\n    ORDER BY COUNT(a2.id) DESC\n    LIMIT 1\n);"
        },
        {
          "number": 40,
          "question": "Listar produtos cujo preço está entre o mínimo e o máximo calculado via subconsultas.",
          "answer": "SELECT *\nFROM produtos\nWHERE preco BETWEEN\n    (SELECT MIN(preco) FROM produtos)\n    AND\n    (SELECT MAX(preco) FROM produtos);"
        },
        {
          "number": 41,
          "question": "Exibir vendas que possuem mais itens que a venda com maior número de itens.",
          "answer": "SELECT v.id, COUNT(vi.id) AS qtd_itens\nFROM vendas v\nJOIN vendas_itens vi ON vi.venda_id = v.id\nGROUP BY v.id\nHAVING COUNT(vi.id) >\n(\n    SELECT MAX(cnt)\n    FROM (\n        SELECT COUNT(*) AS cnt\n        FROM vendas_itens\n        GROUP BY venda_id\n    ) sub\n);"
        },
        {
          "number": 42,
          "question": "Selecionar animais cujo nome aparece em clientes diferentes, usando subconsulta com GROUP BY.",
          "answer": "SELECT *\nFROM animais a\nWHERE a.nome IN (\n    SELECT nome\n    FROM clientes\n);"
        },
        {
          "number": 43,
          "question": "Listar as datas em que a quantidade de consultas ultrapassou a média semanal.",
          "answer": "SELECT dia, qtd\nFROM (\n    SELECT DATE(data_consulta) AS dia, COUNT(*) AS qtd\n    FROM consultas\n    GROUP BY DATE(data_consulta)\n) d\nWHERE d.qtd >\n(\n    SELECT AVG(qtd_semana)\n    FROM (\n        SELECT DATE_TRUNC('week', data_consulta) AS semana,\n               COUNT(*) AS qtd_semana\n        FROM consultas\n        GROUP BY DATE_TRUNC('week', data_consulta)\n    ) s\n);"
        },
        {
          "number": 44,
          "question": "Selecionar consultas do animal que passou por mais vacinas aplicadas.",
          "answer": "SELECT *\nFROM consultas\nWHERE animal_id =\n(\n    SELECT animal_id\n    FROM carteirinha_vacinas\n    GROUP BY animal_id\n    ORDER BY COUNT(*) DESC\n    LIMIT 1\n);"
        },
        {
          "number": 45,
          "question": "Exibir clientes cujo total gasto está dentro do top 10% das vendas totais.",
          "answer": "SELECT c.id, c.nome, SUM(v.total) AS total_cliente\nFROM clientes c\nJOIN vendas v ON v.cliente_id = c.id\nGROUP BY c.id, c.nome\nHAVING SUM(v.total) >=\n(\n    SELECT PERCENTILE_CONT(0.90) WITHIN GROUP (ORDER BY total_por_cliente)\n    FROM (\n        SELECT SUM(total) AS total_por_cliente\n        FROM vendas\n        GROUP BY cliente_id\n    ) sub\n);"
        },
        {
          "number": 46,
          "question": "Identificar animais pertencentes a clientes que nunca solicitaram exames.",
          "answer": "SELECT a.*\nFROM animais a\nWHERE a.cliente_id IN (\n    SELECT c.id\n    FROM clientes c\n    WHERE NOT EXISTS (\n        SELECT 1\n        FROM vendas v\n        JOIN vendas_itens vi ON vi.venda_id = v.id\n        JOIN pedidos_exames pe ON pe.consulta_id IS NOT NULL\n        -- se você relacionar exames por cliente, ajuste aqui\n        LIMIT 1\n    )\n);\n(Esse 46 depende de como você associa exames ao cliente; frequentemente via consulta → animal → cliente. Ajustável.)"
        },
        {
          "number": 47,
          "question": "Listar consultas ocorridas no mesmo horário da consulta mais recente de cada veterinário.",
          "answer": "SELECT c.*\nFROM consultas c\nWHERE (c.veterinario_id, DATE_TRUNC('minute', c.data_consulta)) IN (\n    SELECT veterinario_id,\n           DATE_TRUNC('minute', MAX(data_consulta)) AS dt\n    FROM consultas\n    GROUP BY veterinario_id\n);"
        },
        {
          "number": 48,
          "question": "Selecionar clientes que possuem ao menos um animal cujo número de vacinas aplicadas supera o máximo de vacinas aplicadas na espécie.",
          "answer": "SELECT DISTINCT c.*\nFROM clientes c\nJOIN animais a ON a.cliente_id = c.id\nWHERE a.id IN (\n    SELECT cv.animal_id\n    FROM carteirinha_vacinas cv\n    GROUP BY cv.animal_id\n    HAVING COUNT(*) >\n    (\n        SELECT MAX(cnt_especie)\n        FROM (\n            SELECT a2.especie, COUNT(cv2.id) AS cnt_especie\n            FROM animais a2\n            JOIN carteirinha_vacinas cv2 ON cv2.animal_id = a2.id\n            GROUP BY a2.especie\n        ) sub\n    )\n);"
        },
        {
          "number": 49,
          "question": "Exibir produtos comprados pelo cliente que possui o maior número de animais.",
          "answer": "SELECT DISTINCT p.*\nFROM produtos p\nJOIN vendas_itens vi ON vi.produto_id = p.id\nJOIN vendas v ON v.id = vi.venda_id\nWHERE v.cliente_id =\n(\n    SELECT cliente_id\n    FROM animais\n    GROUP BY cliente_id\n    ORDER BY COUNT(*) DESC\n    LIMIT 1\n);"
        },
        {
          "number": 50,
          "question": "Selecionar consultas do veterinário cujo nome é igual ao nome do veterinário mais recente cadastrado.",
          "answer": "SELECT c.*\nFROM consultas c\nWHERE c.veterinario_id =\n(\n    SELECT id\n    FROM veterinarios\n    ORDER BY id DESC\n    LIMIT 1\n);"
        }
      ]
    }
  ]
};
