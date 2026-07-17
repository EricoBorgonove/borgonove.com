export const postgresqlConsultaExerciseList = {
  "slug": "consulta",
  "order": 2,
  "title": "Consulta",
  "summary": "Use o dump do sistema_vendas para praticar consultas SQL em um banco completo, com tabelas relacionadas e dados prontos para investigar.",
  "level": "Intermediário",
  "files": [
    {
      "label": "Baixar dump do banco (.sql)",
      "href": "/docs/postgresql/exercicios/dump_sistema_vendas_full.sql",
      "fileName": "dump_sistema_vendas_full.sql"
    }
  ],
  "blocks": [
    {
      "slug": "consultas-basicas",
      "order": 1,
      "title": "Consultas básicas",
      "summary": "Comece revisando SELECT, filtros, ordenação, funções simples e limites.",
      "level": "Intermediário",
      "exercises": [
        {
          "number": 1,
          "question": "Liste todos os funcionários.",
          "answer": "SELECT * FROM funcionarios;"
        },
        {
          "number": 2,
          "question": "Nomes e cargos dos funcionários.",
          "answer": "SELECT nome, cargo FROM funcionarios;"
        },
        {
          "number": 3,
          "question": "Nome e sigla de todos os departamentos.",
          "answer": "SELECT nome, sigla FROM departamentos;"
        },
        {
          "number": 4,
          "question": "Nome e salário dos funcionários (salário crescente).",
          "answer": "SELECT nome, salario\nFROM funcionarios\nORDER BY salario ASC;"
        },
        {
          "number": 5,
          "question": "Todos os projetos cadastrados.",
          "answer": "SELECT * FROM projetos;"
        },
        {
          "number": 6,
          "question": "Funcionários com salário > 5000.",
          "answer": "SELECT nome, cargo, salario\nFROM funcionarios\nWHERE salario > 5000;"
        },
        {
          "number": 7,
          "question": "Funcionários do departamento de TI (sigla TIC).",
          "answer": "SELECT f.nome, f.cargo\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nWHERE d.sigla = 'TIC';"
        },
        {
          "number": 8,
          "question": "Funcionários contratados após 2020.",
          "answer": "SELECT nome, data_admissao\nFROM funcionarios\nWHERE data_admissao > '2020-12-31';"
        },
        {
          "number": 9,
          "question": "Nomes e datas de admissão (mais recentes primeiro).",
          "answer": "SELECT nome, data_admissao\nFROM funcionarios\nORDER BY data_admissao DESC;"
        },
        {
          "number": 10,
          "question": "Cargos únicos.",
          "answer": "SELECT DISTINCT cargo\nFROM funcionarios\nORDER BY cargo;"
        },
        {
          "number": 11,
          "question": "Funcionários cujo nome começa com “A”.",
          "answer": "SELECT nome\nFROM funcionarios\nWHERE nome LIKE 'A%';"
        },
        {
          "number": 12,
          "question": "Funcionários cujo nome termina com “a”.",
          "answer": "SELECT nome\nFROM funcionarios\nWHERE nome LIKE '%a';"
        },
        {
          "number": 13,
          "question": "Funcionários com salário entre 3000 e 6000.",
          "answer": "SELECT nome, salario\nFROM funcionarios\nWHERE salario BETWEEN 3000 AND 6000;"
        },
        {
          "number": 14,
          "question": "Departamentos localizados em Manaus.",
          "answer": "SELECT *\nFROM departamentos\nWHERE localizacao = 'Manaus';"
        },
        {
          "number": 15,
          "question": "Projetos com orçamento acima de 200000.",
          "answer": "SELECT nome, orcamento\nFROM projetos\nWHERE orcamento > 200000;"
        },
        {
          "number": 16,
          "question": "Funcionários ativos.",
          "answer": "SELECT *\nFROM funcionarios\nWHERE ativo = TRUE;"
        },
        {
          "number": 17,
          "question": "Funcionários inativos.",
          "answer": "SELECT *\nFROM funcionarios\nWHERE ativo = FALSE;"
        },
        {
          "number": 18,
          "question": "Total de funcionários.",
          "answer": "SELECT COUNT(*) AS total_funcionarios\nFROM funcionarios;"
        },
        {
          "number": 19,
          "question": "Total de departamentos.",
          "answer": "SELECT COUNT(*) AS total_departamentos\nFROM departamentos;"
        },
        {
          "number": 20,
          "question": "Maior salário da empresa.",
          "answer": "SELECT MAX(salario) AS maior_salario\nFROM funcionarios;"
        },
        {
          "number": 21,
          "question": "Menor salário da empresa.",
          "answer": "SELECT MIN(salario) AS menor_salario\nFROM funcionarios;"
        },
        {
          "number": 22,
          "question": "Média salarial geral.",
          "answer": "SELECT ROUND(AVG(salario), 2) AS media_salarial\nFROM funcionarios;"
        },
        {
          "number": 23,
          "question": "Top 10 mais bem pagos.",
          "answer": "SELECT nome, salario\nFROM funcionarios\nORDER BY salario DESC\nLIMIT 10;"
        },
        {
          "number": 24,
          "question": "Contratados antes de 2018.",
          "answer": "SELECT nome, data_admissao\nFROM funcionarios\nWHERE data_admissao < '2018-01-01';"
        },
        {
          "number": 25,
          "question": "Projetos iniciados em 2025.",
          "answer": "SELECT *\nFROM projetos\nWHERE date_part('year', data_inicio) = 2025;"
        }
      ]
    },
    {
      "slug": "relacionamentos-e-agregacoes",
      "order": 2,
      "title": "Relacionamentos e agregações",
      "summary": "Avance para JOINs, agrupamentos, médias, contagens e consultas por departamento.",
      "level": "Intermediário",
      "exercises": [
        {
          "number": 26,
          "question": "Funcionário e seu departamento.",
          "answer": "SELECT f.nome, d.nome AS departamento\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento;"
        },
        {
          "number": 27,
          "question": "Total de funcionários por departamento.",
          "answer": "SELECT d.nome AS departamento, COUNT(*) AS total\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nGROUP BY d.nome\nORDER BY total DESC;"
        },
        {
          "number": 28,
          "question": "Salário médio por departamento.",
          "answer": "SELECT d.nome AS departamento, ROUND(AVG(f.salario),2) AS media\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nGROUP BY d.nome\nORDER BY media DESC;"
        },
        {
          "number": 29,
          "question": "Total de projetos por departamento.",
          "answer": "SELECT d.nome AS departamento, COUNT(*) AS projetos\nFROM projetos p\nJOIN departamentos d ON d.id_departamento = p.id_departamento\nGROUP BY d.nome\nORDER BY projetos DESC;"
        },
        {
          "number": 30,
          "question": "Maior salário de cada departamento.",
          "answer": "SELECT d.nome AS departamento, MAX(f.salario) AS maior_salario\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nGROUP BY d.nome\nORDER BY maior_salario DESC;"
        },
        {
          "number": 31,
          "question": "Funcionário e projeto em que trabalha.",
          "answer": "SELECT f.nome, p.nome AS projeto\nFROM funcionarios_projetos fp\nJOIN funcionarios f ON f.id_funcionario = fp.id_funcionario\nJOIN projetos p     ON p.id_projeto     = fp.id_projeto;"
        },
        {
          "number": 32,
          "question": "Funcionários em projetos com orçamento > 100000.",
          "answer": "SELECT DISTINCT f.nome\nFROM funcionarios_projetos fp\nJOIN funcionarios f ON f.id_funcionario = fp.id_funcionario\nJOIN projetos p     ON p.id_projeto     = fp.id_projeto\nWHERE p.orcamento > 100000;"
        },
        {
          "number": 33,
          "question": "Funcionários sem nenhum projeto.",
          "answer": "SELECT f.*\nFROM funcionarios f\nLEFT JOIN funcionarios_projetos fp ON fp.id_funcionario = f.id_funcionario\nWHERE fp.id_funcionario IS NULL;"
        },
        {
          "number": 34,
          "question": "Funcionários com mais de 5 anos de empresa.",
          "answer": "SELECT nome, data_admissao\nFROM funcionarios\nWHERE age(current_date, data_admissao) > interval '5 years';"
        },
        {
          "number": 35,
          "question": "Funcionários mais recentes primeiro.",
          "answer": "SELECT *\nFROM funcionarios\nORDER BY data_admissao DESC, id_funcionario DESC;"
        },
        {
          "number": 36,
          "question": "Projeto e seu departamento responsável.",
          "answer": "SELECT p.nome AS projeto, d.nome AS departamento\nFROM projetos p\nJOIN departamentos d ON d.id_departamento = p.id_departamento;"
        },
        {
          "number": 37,
          "question": "Departamentos com mais de 100 funcionários.",
          "answer": "SELECT d.nome, COUNT(*) AS total\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nGROUP BY d.nome\nHAVING COUNT(*) > 100\nORDER BY total DESC;"
        },
        {
          "number": 38,
          "question": "Total de funcionários por cargo.",
          "answer": "SELECT cargo, COUNT(*) AS total\nFROM funcionarios\nGROUP BY cargo\nORDER BY total DESC;"
        },
        {
          "number": 39,
          "question": "Funcionário com maior salário em cada departamento.",
          "answer": "WITH ranked AS (\nSELECT d.nome AS departamento, f.nome, f.salario,\nROW_NUMBER() OVER (PARTITION BY d.id_departamento ORDER BY f.salario DESC) AS rn\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\n)\nSELECT departamento, nome, salario\nFROM ranked\nWHERE rn = 1\nORDER BY salario DESC;"
        },
        {
          "number": 40,
          "question": "Projeto e número de funcionários envolvidos.",
          "answer": "SELECT p.nome AS projeto, COUNT(DISTINCT fp.id_funcionario) AS total_funcionarios\nFROM projetos p\nLEFT JOIN funcionarios_projetos fp ON fp.id_projeto = p.id_projeto\nGROUP BY p.nome\nORDER BY total_funcionarios DESC, p.nome;"
        },
        {
          "number": 41,
          "question": "Carga horária média por projeto.",
          "answer": "SELECT p.nome AS projeto, ROUND(AVG(fp.carga_horaria),2) AS carga_media\nFROM projetos p\nJOIN funcionarios_projetos fp ON fp.id_projeto = p.id_projeto\nGROUP BY p.nome\nORDER BY carga_media DESC NULLS LAST;"
        },
        {
          "number": 42,
          "question": "Projetos e horas somadas por equipe.",
          "answer": "SELECT p.nome AS projeto, SUM(fp.carga_horaria) AS horas_totais\nFROM projetos p\nLEFT JOIN funcionarios_projetos fp ON fp.id_projeto = p.id_projeto\nGROUP BY p.nome\nORDER BY horas_totais DESC NULLS LAST;"
        },
        {
          "number": 43,
          "question": "Funcionários com função “Gestor de Projeto” em algum projeto.",
          "answer": "SELECT DISTINCT f.nome\nFROM funcionarios_projetos fp\nJOIN funcionarios f ON f.id_funcionario = fp.id_funcionario\nWHERE fp.funcao_no_projeto ILIKE '%Gestor de Projeto%';"
        },
        {
          "number": 44,
          "question": "Total de funcionários ativos e inativos.",
          "answer": "SELECT ativo, COUNT(*) AS total\nFROM funcionarios\nGROUP BY ativo;"
        },
        {
          "number": 45,
          "question": "Top 10 projetos por orçamento.",
          "answer": "SELECT nome, orcamento\nFROM projetos\nORDER BY orcamento DESC\nLIMIT 10;"
        },
        {
          "number": 46,
          "question": "5 menores salários.",
          "answer": "SELECT nome, salario\nFROM funcionarios\nORDER BY salario ASC\nLIMIT 5;"
        },
        {
          "number": 47,
          "question": "Funcionários que trabalham em Manaus (pela localização do departamento).",
          "answer": "SELECT f.*\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nWHERE d.localizacao = 'Manaus';"
        },
        {
          "number": 48,
          "question": "Projetos do departamento de Marketing (MKT).",
          "answer": "SELECT p.*\nFROM projetos p\nJOIN departamentos d ON d.id_departamento = p.id_departamento\nWHERE d.sigla = 'MKT';"
        },
        {
          "number": 49,
          "question": "Média salarial do Jurídico (JUR).",
          "answer": "SELECT ROUND(AVG(f.salario),2) AS media_juridico\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nWHERE d.sigla = 'JUR';"
        },
        {
          "number": 50,
          "question": "Funcionários com salário acima da média geral.",
          "answer": "SELECT nome, salario\nFROM funcionarios\nWHERE salario > (SELECT AVG(salario) FROM funcionarios)\nORDER BY salario DESC;"
        }
      ]
    },
    {
      "slug": "consultas-intermediarias",
      "order": 3,
      "title": "Consultas intermediárias",
      "summary": "Treine filtros textuais, datas, subconsultas, rankings e comparações com médias.",
      "level": "Intermediário",
      "exercises": [
        {
          "number": 51,
          "question": "Analista de RH ou Assistente Financeiro.",
          "answer": "SELECT nome, cargo\nFROM funcionarios\nWHERE cargo IN ('Analista de RH','Assistente Financeiro');"
        },
        {
          "number": 52,
          "question": "Cargos contendo “Desenvolvedor”.",
          "answer": "SELECT nome, cargo\nFROM funcionarios\nWHERE cargo ILIKE '%Desenvolvedor%';"
        },
        {
          "number": 53,
          "question": "Nome com mais de 10 caracteres.",
          "answer": "SELECT nome\nFROM funcionarios\nWHERE length(nome) > 10;"
        },
        {
          "number": 54,
          "question": "Departamentos e quantidade de projetos.",
          "answer": "SELECT d.nome AS departamento, COUNT(p.id_projeto) AS qtd_projetos\nFROM departamentos d\nLEFT JOIN projetos p ON p.id_departamento = d.id_departamento\nGROUP BY d.nome\nORDER BY qtd_projetos DESC;"
        },
        {
          "number": 55,
          "question": "Projetos com início em 2025.",
          "answer": "SELECT *\nFROM projetos\nWHERE EXTRACT(YEAR FROM data_inicio) = 2025;"
        },
        {
          "number": 56,
          "question": "Admitidos entre 2017 e 2020.",
          "answer": "SELECT nome, data_admissao\nFROM funcionarios\nWHERE data_admissao BETWEEN '2017-01-01' AND '2020-12-31';"
        },
        {
          "number": 57,
          "question": "Número de projetos “em execução”.",
          "answer": "SELECT COUNT(*) AS projetos_em_execucao\nFROM projetos\nWHERE data_fim IS NULL OR data_fim >= CURRENT_DATE;"
        },
        {
          "number": 58,
          "question": "Soma de orçamentos por departamento.",
          "answer": "SELECT d.nome AS departamento, SUM(p.orcamento) AS orcamento_total\nFROM projetos p\nJOIN departamentos d ON d.id_departamento = p.id_departamento\nGROUP BY d.nome\nORDER BY orcamento_total DESC NULLS LAST;"
        },
        {
          "number": 59,
          "question": "Departamento que mais investe em projetos.",
          "answer": "SELECT d.nome, SUM(p.orcamento) AS investimento\nFROM projetos p\nJOIN departamentos d ON d.id_departamento = p.id_departamento\nGROUP BY d.nome\nORDER BY investimento DESC NULLS LAST\nLIMIT 1;"
        },
        {
          "number": 60,
          "question": "5 funcionários mais antigos.",
          "answer": "SELECT nome, data_admissao\nFROM funcionarios\nORDER BY data_admissao ASC, id_funcionario ASC\nLIMIT 5;"
        },
        {
          "number": 61,
          "question": "Total de funcionários por cidade (localização do depto).",
          "answer": "SELECT d.localizacao, COUNT(f.id_funcionario) AS total\nFROM departamentos d\nLEFT JOIN funcionarios f ON f.id_departamento = d.id_departamento\nGROUP BY d.localizacao\nORDER BY total DESC NULLS LAST;"
        },
        {
          "number": 62,
          "question": "Departamento com maior número de funcionários.",
          "answer": "SELECT d.nome, COUNT(*) AS total\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nGROUP BY d.nome\nORDER BY total DESC\nLIMIT 1;"
        },
        {
          "number": 63,
          "question": "Funcionários acima da média do seu próprio departamento.",
          "answer": "SELECT f.nome, f.salario, d.nome AS departamento\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nWHERE f.salario > (\nSELECT AVG(f2.salario)\nFROM funcionarios f2\nWHERE f2.id_departamento = f.id_departamento\n)\nORDER BY f.salario DESC;"
        },
        {
          "number": 64,
          "question": "Projetos e total de funcionários envolvidos por cargo.",
          "answer": "SELECT p.nome AS projeto, f.cargo, COUNT(DISTINCT f.id_funcionario) AS total\nFROM projetos p\nJOIN funcionarios_projetos fp ON fp.id_projeto = p.id_projeto\nJOIN funcionarios f          ON f.id_funcionario = fp.id_funcionario\nGROUP BY p.nome, f.cargo\nORDER BY p.nome, total DESC;"
        },
        {
          "number": 65,
          "question": "Total de horas dedicadas por funcionário (em todos os projetos).",
          "answer": "SELECT f.id_funcionario, f.nome, COALESCE(SUM(fp.carga_horaria),0) AS horas\nFROM funcionarios f\nLEFT JOIN funcionarios_projetos fp ON fp.id_funcionario = f.id_funcionario\nGROUP BY f.id_funcionario, f.nome\nORDER BY horas DESC, f.nome;"
        },
        {
          "number": 66,
          "question": "Funcionários que trabalham em mais de 3 projetos.",
          "answer": "SELECT f.id_funcionario, f.nome, COUNT(DISTINCT fp.id_projeto) AS qtd_projetos\nFROM funcionarios f\nJOIN funcionarios_projetos fp ON fp.id_funcionario = f.id_funcionario\nGROUP BY f.id_funcionario, f.nome\nHAVING COUNT(DISTINCT fp.id_projeto) > 3\nORDER BY qtd_projetos DESC;"
        },
        {
          "number": 67,
          "question": "Projeto com maior carga horária total.",
          "answer": "SELECT p.nome, SUM(fp.carga_horaria) AS horas\nFROM projetos p\nJOIN funcionarios_projetos fp ON fp.id_projeto = p.id_projeto\nGROUP BY p.nome\nORDER BY horas DESC\nLIMIT 1;"
        },
        {
          "number": 68,
          "question": "Departamento do projeto mais caro.",
          "answer": "SELECT d.nome AS departamento, p.nome AS projeto, p.orcamento\nFROM projetos p\nJOIN departamentos d ON d.id_departamento = p.id_departamento\nORDER BY p.orcamento DESC\nLIMIT 1;"
        },
        {
          "number": 69,
          "question": "Funcionários que trabalham em projetos de TI (TIC).",
          "answer": "SELECT DISTINCT f.nome, f.cargo\nFROM funcionarios f\nJOIN funcionarios_projetos fp ON fp.id_funcionario = f.id_funcionario\nJOIN projetos p               ON p.id_projeto = fp.id_projeto\nJOIN departamentos d          ON d.id_departamento = p.id_departamento\nWHERE d.sigla = 'TIC';"
        },
        {
          "number": 70,
          "question": "Funcionário com maior salário no Financeiro (FIN).",
          "answer": "SELECT f.nome, f.salario\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nWHERE d.sigla = 'FIN'\nORDER BY f.salario DESC\nLIMIT 1;"
        },
        {
          "number": 71,
          "question": "Top 3 mais recentes por departamento.",
          "answer": "WITH rn AS (\nSELECT d.nome AS departamento, f.nome, f.data_admissao,\nROW_NUMBER() OVER (PARTITION BY d.id_departamento ORDER BY f.data_admissao DESC, f.id_funcionario DESC) AS r\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\n)\nSELECT departamento, nome, data_admissao\nFROM rn\nWHERE r <= 3\nORDER BY departamento, data_admissao DESC;"
        },
        {
          "number": 72,
          "question": "Diferença entre maior e menor salário.",
          "answer": "SELECT (MAX(salario) - MIN(salario)) AS diferenca\nFROM funcionarios;"
        },
        {
          "number": 73,
          "question": "Admitidos no mesmo ano do início de “Portal de Vagas Internas”.",
          "answer": "SELECT f.nome, f.data_admissao\nFROM funcionarios f\nWHERE EXTRACT(YEAR FROM f.data_admissao) = (\nSELECT EXTRACT(YEAR FROM p.data_inicio)\nFROM projetos p\nWHERE p.nome ILIKE '%Portal de Vagas Internas%'\nLIMIT 1\n);"
        },
        {
          "number": 74,
          "question": "Departamentos sem projetos.",
          "answer": "SELECT d.*\nFROM departamentos d\nLEFT JOIN projetos p ON p.id_departamento = d.id_departamento\nWHERE p.id_projeto IS NULL;"
        },
        {
          "number": 75,
          "question": "Funcionários que nunca participaram de projetos.",
          "answer": "SELECT f.*\nFROM funcionarios f\nLEFT JOIN funcionarios_projetos fp ON fp.id_funcionario = f.id_funcionario\nWHERE fp.id_funcionario IS NULL;"
        }
      ]
    },
    {
      "slug": "consultas-avancadas",
      "order": 4,
      "title": "Consultas avançadas",
      "summary": "Feche a lista com consultas analíticas, percentuais, totais, agrupamentos compostos e desafios finais.",
      "level": "Intermediário",
      "exercises": [
        {
          "number": 76,
          "question": "Total de projetos por funcionário.",
          "answer": "SELECT f.id_funcionario, f.nome, COUNT(DISTINCT fp.id_projeto) AS projetos\nFROM funcionarios f\nLEFT JOIN funcionarios_projetos fp ON fp.id_funcionario = f.id_funcionario\nGROUP BY f.id_funcionario, f.nome\nORDER BY projetos DESC, f.nome;"
        },
        {
          "number": 77,
          "question": "Projeto e total de participantes distintos (histórico).",
          "answer": "SELECT p.nome AS projeto, COUNT(DISTINCT fp.id_funcionario) AS participantes\nFROM projetos p\nLEFT JOIN funcionarios_projetos fp ON fp.id_projeto = p.id_projeto\nGROUP BY p.nome\nORDER BY participantes DESC;"
        },
        {
          "number": 78,
          "question": "Folha total da empresa.",
          "answer": "SELECT SUM(salario) AS folha_total\nFROM funcionarios;"
        },
        {
          "number": 79,
          "question": "Custo médio por funcionário (por departamento).",
          "answer": "SELECT d.nome AS departamento,\nROUND(AVG(f.salario), 2) AS custo_medio\nFROM departamentos d\nLEFT JOIN funcionarios f ON f.id_departamento = d.id_departamento\nGROUP BY d.nome\nORDER BY custo_medio DESC NULLS LAST;"
        },
        {
          "number": 80,
          "question": "Funcionário mais bem pago da empresa.",
          "answer": "SELECT nome, salario\nFROM funcionarios\nORDER BY salario DESC\nLIMIT 1;"
        },
        {
          "number": 81,
          "question": "Média de carga horária por departamento (via projetos).",
          "answer": "SELECT d.nome AS departamento,\nROUND(AVG(fp.carga_horaria),2) AS carga_media\nFROM departamentos d\nJOIN projetos p               ON p.id_departamento = d.id_departamento\nJOIN funcionarios_projetos fp ON fp.id_projeto = p.id_projeto\nGROUP BY d.nome\nORDER BY carga_media DESC NULLS LAST;"
        },
        {
          "number": 82,
          "question": "Departamentos com salário médio > 5000.",
          "answer": "SELECT d.nome AS departamento, ROUND(AVG(f.salario),2) AS media\nFROM departamentos d\nJOIN funcionarios f ON f.id_departamento = d.id_departamento\nGROUP BY d.nome\nHAVING AVG(f.salario) > 5000\nORDER BY media DESC;"
        },
        {
          "number": 83,
          "question": "Projetos com mais de 10 funcionários alocados.",
          "answer": "SELECT p.nome, COUNT(DISTINCT fp.id_funcionario) AS total\nFROM projetos p\nJOIN funcionarios_projetos fp ON fp.id_projeto = p.id_projeto\nGROUP BY p.nome\nHAVING COUNT(DISTINCT fp.id_funcionario) > 10\nORDER BY total DESC;"
        },
        {
          "number": 84,
          "question": "Proporção de ativos × inativos (percentual).",
          "answer": "SELECT\nROUND(100.0 * SUM(CASE WHEN ativo THEN 1 ELSE 0 END) / COUNT(*), 2) AS pct_ativos,\nROUND(100.0 * SUM(CASE WHEN NOT ativo THEN 1 ELSE 0 END) / COUNT(*), 2) AS pct_inativos\nFROM funcionarios;"
        },
        {
          "number": 85,
          "question": "Contratações por ano.",
          "answer": "SELECT EXTRACT(YEAR FROM data_admissao)::INT AS ano, COUNT(*) AS total\nFROM funcionarios\nGROUP BY ano\nORDER BY ano;"
        },
        {
          "number": 86,
          "question": "Projetos ativos por departamento (data_fim nula ou futura).",
          "answer": "SELECT d.nome AS departamento, COUNT(*) AS projetos_ativos\nFROM projetos p\nJOIN departamentos d ON d.id_departamento = p.id_departamento\nWHERE p.data_fim IS NULL OR p.data_fim >= CURRENT_DATE\nGROUP BY d.nome\nORDER BY projetos_ativos DESC;"
        },
        {
          "number": 87,
          "question": "Departamentos sem funcionários.",
          "answer": "SELECT d.*\nFROM departamentos d\nLEFT JOIN funcionarios f ON f.id_departamento = d.id_departamento\nWHERE f.id_funcionario IS NULL;"
        },
        {
          "number": 88,
          "question": "Segundo funcionário mais bem pago.",
          "answer": "SELECT nome, salario\nFROM funcionarios\nORDER BY salario DESC\nOFFSET 1 LIMIT 1;"
        },
        {
          "number": 89,
          "question": "Funcionários com salário = maior do seu departamento.",
          "answer": "SELECT f.nome, f.salario, d.nome AS departamento\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nWHERE f.salario = (\nSELECT MAX(f2.salario)\nFROM funcionarios f2\nWHERE f2.id_departamento = f.id_departamento\n)\nORDER BY d.nome, f.nome;"
        },
        {
          "number": 90,
          "question": "Total de funcionários por cargo e por departamento.",
          "answer": "SELECT d.nome AS departamento, f.cargo, COUNT(*) AS total\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nGROUP BY d.nome, f.cargo\nORDER BY d.nome, total DESC;"
        },
        {
          "number": 91,
          "question": "“Coordenador” no cargo e ativo.",
          "answer": "SELECT nome, cargo\nFROM funcionarios\nWHERE ativo = TRUE\nAND cargo ILIKE '%Coordenador%';"
        },
        {
          "number": 92,
          "question": "Funcionários com salário > salário do gestor no mesmo projeto.",
          "answer": "SELECT DISTINCT f.nome, f.salario, p.nome AS projeto\nFROM funcionarios_projetos fp\nJOIN funcionarios f ON f.id_funcionario = fp.id_funcionario\nJOIN projetos p     ON p.id_projeto     = fp.id_projeto\nWHERE EXISTS (\nSELECT 1\nFROM funcionarios_projetos fp2\nJOIN funcionarios g ON g.id_funcionario = fp2.id_funcionario\nWHERE fp2.id_projeto = fp.id_projeto\nAND fp2.funcao_no_projeto ILIKE '%Gestor de Projeto%'\nAND f.salario > g.salario\n);"
        },
        {
          "number": 93,
          "question": "Quantidade de projetos finalizados × em andamento.",
          "answer": "SELECT\nSUM(CASE WHEN data_fim IS NULL OR data_fim >= CURRENT_DATE THEN 1 ELSE 0 END) AS em_andamento,\nSUM(CASE WHEN data_fim <  CURRENT_DATE THEN 1 ELSE 0 END) AS finalizados\nFROM projetos;"
        },
        {
          "number": 94,
          "question": "Soma total dos orçamentos de todos os projetos.",
          "answer": "SELECT SUM(orcamento) AS orcamento_total\nFROM projetos;"
        },
        {
          "number": 95,
          "question": "Top 3 departamentos com mais funcionários.",
          "answer": "SELECT d.nome, COUNT(*) AS total\nFROM funcionarios f\nJOIN departamentos d ON d.id_departamento = f.id_departamento\nGROUP BY d.nome\nORDER BY total DESC\nLIMIT 3;"
        },
        {
          "number": 96,
          "question": "Funcionário e número de projetos que participa.",
          "answer": "SELECT f.nome, COUNT(DISTINCT fp.id_projeto) AS qtd_projetos\nFROM funcionarios f\nLEFT JOIN funcionarios_projetos fp ON fp.id_funcionario = f.id_funcionario\nGROUP BY f.nome\nORDER BY qtd_projetos DESC, f.nome;"
        },
        {
          "number": 97,
          "question": "Projetos sem funcionários alocados.",
          "answer": "SELECT p.*\nFROM projetos p\nLEFT JOIN funcionarios_projetos fp ON fp.id_projeto = p.id_projeto\nWHERE fp.id_projeto IS NULL;"
        },
        {
          "number": 98,
          "question": "Média de orçamentos por cidade (localização do depto).",
          "answer": "SELECT d.localizacao, ROUND(AVG(p.orcamento),2) AS media_orcamento\nFROM departamentos d\nJOIN projetos p ON p.id_departamento = d.id_departamento\nGROUP BY d.localizacao\nORDER BY media_orcamento DESC NULLS LAST;"
        },
        {
          "number": 99,
          "question": "Funcionários que entraram em 2015 e estão ativos.",
          "answer": "SELECT nome, data_admissao\nFROM funcionarios\nWHERE EXTRACT(YEAR FROM data_admissao) = 2015\nAND ativo = TRUE;"
        },
        {
          "number": 100,
          "question": "Total, média salarial e folha por departamento.",
          "answer": "SELECT d.nome AS departamento,\nCOUNT(f.id_funcionario) AS total_func,\nROUND(AVG(f.salario),2) AS media_sal,\nSUM(f.salario)          AS folha\nFROM departamentos d\nLEFT JOIN funcionarios f ON f.id_departamento = d.id_departamento\nGROUP BY d.nome\nORDER BY folha DESC NULLS LAST;"
        }
      ]
    }
  ]
};
