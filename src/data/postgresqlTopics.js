export const postgresqlTopics = [
  {
    slug: "o-que-e-postgresql",
    order: 1,
    category: "Fundamentos",
    title: "O que é PostgreSQL?",
    summary: "Comece entendendo banco relacional, tabelas, servidor, cliente e onde o PostgreSQL aparece em sistemas reais.",
    introduction:
      "Vamos começar pelo essencial: PostgreSQL é um sistema gerenciador de banco de dados relacional e objeto-relacional, gratuito e de código aberto. Ele organiza dados em bancos, schemas, tabelas, linhas e colunas, aplica regras de integridade e permite consultar e modificar informações com SQL.",
    concepts: [
      ["Servidor PostgreSQL", "Processo responsável por armazenar os dados, controlar conexões e executar comandos."],
      ["Banco de dados", "Contêiner lógico que reúne schemas, tabelas, funções, views e outros objetos."],
      ["Schema", "Espaço de nomes usado para organizar objetos dentro de um banco de dados."],
      ["Tabela", "Estrutura formada por colunas e linhas que representa uma entidade ou assunto."],
      ["SQL", "Linguagem usada para definir estruturas, consultar dados, controlar permissões e transações."],
      ["psql e pgAdmin", "Clientes usados para conectar ao servidor e executar comandos SQL."],
    ],
    notes: [
      "PostgreSQL é um SGBD: ele gerencia armazenamento, concorrência, segurança, integridade e recuperação dos dados.",
      "Uma aplicação normalmente se conecta ao PostgreSQL usando host, porta, nome do banco, usuário e senha.",
      "A porta padrão é 5432, mas ela pode ser alterada pelo administrador.",
    ],
    commands: [
      {
        command: "SELECT version();",
        description: "Mostra a versão do servidor PostgreSQL conectado.",
        example: "SELECT version();",
      },
      {
        command: "SELECT current_database();",
        description: "Mostra o banco de dados utilizado pela conexão atual.",
        example: "SELECT current_database();",
      },
      {
        command: "SELECT current_user;",
        description: "Mostra o usuário da sessão atual.",
        example: "SELECT current_user;",
      },
      {
        command: "SELECT now();",
        description: "Retorna a data e a hora atuais do servidor.",
        example: "SELECT now();",
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/tutorial-concepts.html",
  },
  {
    slug: "psql-conexao",
    order: 2,
    category: "Terminal",
    title: "Conexão e comandos do psql",
    summary: "Aprenda a se conectar ao servidor e a usar os atalhos essenciais do terminal interativo do PostgreSQL.",
    introduction:
      "O psql é o terminal interativo oficial do PostgreSQL. Aqui, preste atenção nesta diferença: comandos SQL terminam com ponto e vírgula, enquanto metacomandos do próprio psql começam com uma barra invertida.",
    notes: [
      "Use \\? para consultar os metacomandos disponíveis e \\h para obter ajuda sobre comandos SQL.",
      "Metacomandos como \\dt e \\d não precisam de ponto e vírgula.",
      "Evite colocar senhas diretamente na linha de comando ou em arquivos versionados.",
    ],
    commands: [
      {
        command: "psql -U usuario -d banco",
        description: "Abre uma conexão local informando usuário e banco.",
        example: "psql -U postgres -d escola",
        language: "bash",
      },
      {
        command: "psql -h host -p porta -U usuario -d banco",
        description: "Conecta a um servidor informando todos os parâmetros principais.",
        example: "psql -h localhost -p 5432 -U postgres -d escola",
        language: "bash",
      },
      {
        command: "\\l",
        description: "Lista os bancos de dados disponíveis.",
        example: "\\l",
      },
      {
        command: "\\c nome_banco",
        description: "Troca a conexão para outro banco de dados.",
        example: "\\c escola",
      },
      {
        command: "\\dn",
        description: "Lista os schemas do banco atual.",
        example: "\\dn",
      },
      {
        command: "\\dt",
        description: "Lista as tabelas visíveis no caminho de schemas atual.",
        example: "\\dt",
      },
      {
        command: "\\d tabela",
        description: "Descreve colunas, tipos, índices e restrições de uma tabela.",
        example: "\\d alunos",
      },
      {
        command: "\\q",
        description: "Encerra o psql.",
        example: "\\q",
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/app-psql.html",
  },
  {
    slug: "bancos-schemas",
    order: 3,
    category: "Organização",
    title: "Bancos de dados e schemas",
    summary: "Veja como criar bancos e organizar tabelas, views e outros objetos usando schemas.",
    introduction:
      "Um servidor PostgreSQL pode hospedar vários bancos de dados. Dentro de cada banco, schemas ajudam a separar objetos por módulo, equipe ou finalidade.",
    notes: [
      "Conexões trabalham com um banco de dados por vez.",
      "O schema public costuma existir por padrão, mas projetos maiores podem criar schemas próprios.",
      "Use nomes em letras minúsculas e snake_case para evitar a necessidade de aspas.",
    ],
    commands: [
      {
        command: "CREATE DATABASE",
        description: "Cria um novo banco de dados.",
        example: "CREATE DATABASE escola;",
      },
      {
        command: "ALTER DATABASE",
        description: "Altera propriedades ou o nome de um banco.",
        example: "ALTER DATABASE escola RENAME TO escola_tecnica;",
      },
      {
        command: "DROP DATABASE",
        description: "Remove um banco de dados e todos os objetos contidos nele.",
        example: "DROP DATABASE IF EXISTS escola_teste;",
      },
      {
        command: "CREATE SCHEMA",
        description: "Cria um schema no banco atual.",
        example: "CREATE SCHEMA academico;",
      },
      {
        command: "SET search_path",
        description: "Define a ordem de schemas pesquisados quando o nome não é qualificado.",
        example: "SET search_path TO academico, public;",
      },
      {
        command: "DROP SCHEMA",
        description: "Remove um schema vazio ou, com CASCADE, os objetos dependentes.",
        example: "DROP SCHEMA IF EXISTS temporario CASCADE;",
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/ddl-schemas.html",
  },
  {
    slug: "ddl",
    order: 4,
    category: "DDL",
    title: "DDL — Estrutura do banco",
    summary: "Estude CREATE, ALTER, DROP e TRUNCATE para criar e modificar a estrutura do banco com segurança.",
    introduction:
      "DDL significa Data Definition Language. Nesta parte, o ponto principal é perceber que esses comandos mexem na estrutura dos objetos do banco, como tabelas, colunas, sequences e constraints.",
    notes: [
      "ALTER TABLE permite evoluir a estrutura sem recriar a tabela.",
      "DROP TABLE remove estrutura e dados; TRUNCATE remove as linhas e mantém a tabela.",
      "Use IF EXISTS e IF NOT EXISTS em scripts que precisam ser executados mais de uma vez.",
    ],
    commands: [
      {
        command: "CREATE TABLE",
        description: "Cria uma tabela com suas colunas e regras.",
        example: `CREATE TABLE cursos (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    carga_horaria integer CHECK (carga_horaria > 0),
    ativo boolean DEFAULT true
);`,
      },
      {
        command: "ALTER TABLE ... ADD COLUMN",
        description: "Adiciona uma coluna a uma tabela existente.",
        example: "ALTER TABLE cursos ADD COLUMN criado_em timestamptz DEFAULT now();",
      },
      {
        command: "ALTER TABLE ... RENAME COLUMN",
        description: "Renomeia uma coluna.",
        example: "ALTER TABLE cursos RENAME COLUMN nome TO titulo;",
      },
      {
        command: "ALTER TABLE ... DROP COLUMN",
        description: "Remove uma coluna da tabela.",
        example: "ALTER TABLE cursos DROP COLUMN IF EXISTS observacao;",
      },
      {
        command: "TRUNCATE TABLE",
        description: "Remove rapidamente todas as linhas, preservando a estrutura.",
        example: "TRUNCATE TABLE cursos RESTART IDENTITY;",
      },
      {
        command: "DROP TABLE",
        description: "Remove a tabela do banco de dados.",
        example: "DROP TABLE IF EXISTS cursos;",
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/ddl.html",
  },
  {
    slug: "tipos-restricoes",
    order: 5,
    category: "Modelagem",
    title: "Tipos de dados e restrições",
    summary: "Treine a escolha de tipos adequados e use constraints para proteger a qualidade dos dados.",
    introduction:
      "Quando você cria uma tabela, cada coluna precisa fazer sentido. Tipos definem quais valores uma coluna aceita; restrições impedem registros inválidos e preservam relações entre tabelas.",
    concepts: [
      ["integer / bigint", "Números inteiros de diferentes capacidades."],
      ["numeric(p, s)", "Números decimais exatos, indicados para valores financeiros."],
      ["varchar(n) / text", "Textos com limite definido ou tamanho variável sem limite explícito."],
      ["date / time / timestamp / timestamptz", "Datas e horários; timestamptz representa instantes com consciência de fuso."],
      ["boolean", "Valores true, false ou null."],
      ["uuid / jsonb / array", "Tipos úteis para identificadores, documentos JSON e coleções."],
    ],
    commands: [
      {
        command: "PRIMARY KEY",
        description: "Identifica cada linha de forma única e não aceita valor nulo.",
        example: "id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY",
      },
      {
        command: "FOREIGN KEY",
        description: "Garante que um valor exista na tabela relacionada.",
        example: `curso_id bigint NOT NULL,
CONSTRAINT fk_aluno_curso
    FOREIGN KEY (curso_id) REFERENCES cursos(id)`,
      },
      {
        command: "NOT NULL",
        description: "Torna o preenchimento da coluna obrigatório.",
        example: "nome varchar(150) NOT NULL",
      },
      {
        command: "UNIQUE",
        description: "Impede valores repetidos na coluna ou combinação de colunas.",
        example: "email varchar(180) UNIQUE",
      },
      {
        command: "CHECK",
        description: "Valida uma expressão antes de aceitar a linha.",
        example: "nota numeric(4,2) CHECK (nota BETWEEN 0 AND 10)",
      },
      {
        command: "DEFAULT",
        description: "Define um valor quando a coluna não é informada.",
        example: "criado_em timestamptz DEFAULT now()",
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/datatype.html",
  },
  {
    slug: "dml",
    order: 6,
    category: "DML",
    title: "DML — Inserir e modificar dados",
    summary: "Pratique INSERT, UPDATE, DELETE e MERGE para inserir, alterar e remover registros com responsabilidade.",
    introduction:
      "DML significa Data Manipulation Language. Os comandos dessa categoria inserem, alteram e removem linhas das tabelas.",
    notes: [
      "Sempre teste a condição de um UPDATE ou DELETE com SELECT antes de executar.",
      "RETURNING permite receber as linhas afetadas sem fazer uma consulta separada.",
      "ON CONFLICT ajuda a tratar tentativas de inserir valores que violam uma restrição UNIQUE.",
    ],
    commands: [
      {
        command: "INSERT",
        description: "Insere uma ou mais linhas.",
        example: `INSERT INTO cursos (nome, carga_horaria)
VALUES ('Banco de Dados', 80)
RETURNING id, nome;`,
      },
      {
        command: "INSERT com múltiplas linhas",
        description: "Insere vários registros em um único comando.",
        example: `INSERT INTO cursos (nome, carga_horaria)
VALUES
    ('Algoritmos', 60),
    ('Desenvolvimento Web', 100);`,
      },
      {
        command: "INSERT ... ON CONFLICT",
        description: "Ignora ou atualiza o registro quando ocorre conflito.",
        example: `INSERT INTO alunos (email, nome)
VALUES ('ana@email.com', 'Ana')
ON CONFLICT (email)
DO UPDATE SET nome = EXCLUDED.nome;`,
      },
      {
        command: "UPDATE",
        description: "Atualiza linhas que atendem à condição.",
        example: `UPDATE cursos
SET carga_horaria = 90
WHERE nome = 'Banco de Dados'
RETURNING *;`,
      },
      {
        command: "DELETE",
        description: "Remove linhas que atendem à condição.",
        example: `DELETE FROM cursos
WHERE ativo = false
RETURNING id, nome;`,
      },
      {
        command: "MERGE",
        description: "Executa inserção, atualização ou exclusão condicional com base em outra fonte.",
        example: `MERGE INTO estoque AS destino
USING estoque_importado AS origem
ON destino.produto_id = origem.produto_id
WHEN MATCHED THEN
    UPDATE SET quantidade = origem.quantidade
WHEN NOT MATCHED THEN
    INSERT (produto_id, quantidade)
    VALUES (origem.produto_id, origem.quantidade);`,
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/dml.html",
  },
  {
    slug: "dql-select",
    order: 7,
    category: "DQL",
    title: "DQL — Consultas com SELECT",
    summary: "Aprenda a selecionar, filtrar, ordenar, eliminar duplicidades e limitar resultados em consultas.",
    introduction:
      "DQL é uma classificação didática para comandos de consulta. SELECT combina projeção de colunas, filtros, expressões, ordenação e paginação.",
    commands: [
      {
        command: "SELECT",
        description: "Seleciona colunas e calcula expressões.",
        example: `SELECT id, nome, carga_horaria
FROM cursos;`,
      },
      {
        command: "WHERE",
        description: "Filtra linhas por uma condição.",
        example: `SELECT *
FROM cursos
WHERE ativo = true AND carga_horaria >= 60;`,
      },
      {
        command: "ORDER BY",
        description: "Ordena o resultado em ordem crescente ou decrescente.",
        example: `SELECT nome, carga_horaria
FROM cursos
ORDER BY carga_horaria DESC, nome ASC;`,
      },
      {
        command: "DISTINCT",
        description: "Remove combinações duplicadas do resultado.",
        example: "SELECT DISTINCT cidade FROM alunos ORDER BY cidade;",
      },
      {
        command: "LIMIT e OFFSET",
        description: "Limita e desloca o conjunto retornado.",
        example: `SELECT *
FROM alunos
ORDER BY id
LIMIT 20 OFFSET 40;`,
      },
      {
        command: "LIKE e ILIKE",
        description: "Pesquisa padrões; ILIKE ignora diferenças entre maiúsculas e minúsculas.",
        example: "SELECT * FROM alunos WHERE nome ILIKE '%maria%';",
      },
      {
        command: "IN, BETWEEN e IS NULL",
        description: "Simplificam filtros por listas, intervalos e valores ausentes.",
        example: `SELECT *
FROM alunos
WHERE cidade IN ('Manaus', 'Belém')
  AND idade BETWEEN 18 AND 30
  AND telefone IS NOT NULL;`,
      },
      {
        command: "CASE",
        description: "Cria resultados condicionais dentro da consulta.",
        example: `SELECT nome,
       CASE
           WHEN nota >= 7 THEN 'Aprovado'
           WHEN nota >= 5 THEN 'Recuperação'
           ELSE 'Reprovado'
       END AS situacao
FROM alunos;`,
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/queries.html",
  },
  {
    slug: "joins",
    order: 8,
    category: "Relacionamentos",
    title: "JOINs entre tabelas",
    summary: "Combine tabelas relacionadas com INNER, LEFT, RIGHT, FULL e CROSS JOIN, sempre conferindo a regra do relacionamento.",
    introduction:
      "JOIN combina linhas de duas ou mais tabelas. A condição ON normalmente relaciona uma chave estrangeira à chave primária da tabela referenciada.",
    commands: [
      {
        command: "INNER JOIN",
        description: "Retorna apenas linhas com correspondência nos dois lados.",
        example: `SELECT a.nome AS aluno, c.nome AS curso
FROM alunos AS a
INNER JOIN cursos AS c ON c.id = a.curso_id;`,
      },
      {
        command: "LEFT JOIN",
        description: "Mantém todas as linhas da tabela esquerda, mesmo sem correspondência.",
        example: `SELECT c.nome, COUNT(a.id) AS total_alunos
FROM cursos AS c
LEFT JOIN alunos AS a ON a.curso_id = c.id
GROUP BY c.id, c.nome;`,
      },
      {
        command: "RIGHT JOIN",
        description: "Mantém todas as linhas da tabela direita.",
        example: `SELECT a.nome, c.nome AS curso
FROM alunos AS a
RIGHT JOIN cursos AS c ON c.id = a.curso_id;`,
      },
      {
        command: "FULL JOIN",
        description: "Mantém linhas correspondentes e não correspondentes dos dois lados.",
        example: `SELECT *
FROM importacao_a AS a
FULL JOIN importacao_b AS b ON b.codigo = a.codigo;`,
      },
      {
        command: "CROSS JOIN",
        description: "Produz todas as combinações possíveis entre as duas tabelas.",
        example: `SELECT t.nome, h.horario
FROM turmas AS t
CROSS JOIN horarios AS h;`,
      },
      {
        command: "SELF JOIN",
        description: "Relaciona uma tabela com ela mesma usando aliases diferentes.",
        example: `SELECT f.nome AS funcionario, g.nome AS gestor
FROM funcionarios AS f
LEFT JOIN funcionarios AS g ON g.id = f.gestor_id;`,
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/tutorial-join.html",
  },
  {
    slug: "funcoes-agregacoes",
    order: 9,
    category: "Análise",
    title: "Funções, agregações e agrupamentos",
    summary: "Use COUNT, SUM, AVG, MIN, MAX, GROUP BY e HAVING para transformar linhas em informação resumida.",
    introduction:
      "Funções de agregação transformam várias linhas em um resultado resumido. GROUP BY define os grupos e HAVING filtra depois da agregação.",
    commands: [
      {
        command: "COUNT",
        description: "Conta linhas ou valores não nulos.",
        example: "SELECT COUNT(*) AS total_alunos FROM alunos;",
      },
      {
        command: "SUM e AVG",
        description: "Calculam soma e média de valores numéricos.",
        example: "SELECT SUM(valor) AS total, AVG(valor) AS media FROM pagamentos;",
      },
      {
        command: "MIN e MAX",
        description: "Retornam o menor e o maior valor.",
        example: "SELECT MIN(nota) AS menor, MAX(nota) AS maior FROM matriculas;",
      },
      {
        command: "GROUP BY",
        description: "Agrupa linhas antes de aplicar funções de agregação.",
        example: `SELECT curso_id, COUNT(*) AS matriculados, AVG(nota) AS media
FROM matriculas
GROUP BY curso_id;`,
      },
      {
        command: "HAVING",
        description: "Filtra grupos já agregados.",
        example: `SELECT curso_id, COUNT(*) AS total
FROM matriculas
GROUP BY curso_id
HAVING COUNT(*) >= 10;`,
      },
      {
        command: "FILTER",
        description: "Aplica filtros diferentes a agregações na mesma consulta.",
        example: `SELECT
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE nota >= 7) AS aprovados,
    COUNT(*) FILTER (WHERE nota < 7) AS nao_aprovados
FROM matriculas;`,
      },
      {
        command: "Funções de texto",
        description: "Tratam textos com funções como upper, lower, trim e concat.",
        example: "SELECT upper(nome), char_length(trim(nome)) FROM alunos;",
      },
      {
        command: "Funções de data",
        description: "Extraem e calculam informações temporais.",
        example: `SELECT
    extract(year FROM criado_em) AS ano,
    date_trunc('month', criado_em) AS mes
FROM matriculas;`,
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/functions.html",
  },
  {
    slug: "subconsultas-ctes",
    order: 10,
    category: "Consultas",
    title: "Subconsultas, CTEs e operações de conjunto",
    summary: "Organize consultas maiores com subqueries, WITH, UNION, INTERSECT e EXCEPT, sem perder a leitura do raciocínio.",
    introduction:
      "Subconsultas produzem valores ou conjuntos usados por outra consulta. CTEs criadas com WITH dão nomes a etapas intermediárias e ajudam a organizar regras mais complexas.",
    commands: [
      {
        command: "Subconsulta escalar",
        description: "Retorna um único valor usado em uma expressão.",
        example: `SELECT nome, nota
FROM matriculas
WHERE nota > (SELECT AVG(nota) FROM matriculas);`,
      },
      {
        command: "EXISTS",
        description: "Testa se a subconsulta encontra pelo menos uma linha.",
        example: `SELECT c.*
FROM cursos AS c
WHERE EXISTS (
    SELECT 1
    FROM matriculas AS m
    WHERE m.curso_id = c.id
);`,
      },
      {
        command: "WITH",
        description: "Define uma CTE para ser usada pela consulta principal.",
        example: `WITH medias AS (
    SELECT curso_id, AVG(nota) AS media
    FROM matriculas
    GROUP BY curso_id
)
SELECT c.nome, m.media
FROM medias AS m
JOIN cursos AS c ON c.id = m.curso_id;`,
      },
      {
        command: "WITH RECURSIVE",
        description: "Executa consultas recursivas, úteis para hierarquias e sequências.",
        example: `WITH RECURSIVE numeros AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM numeros WHERE n < 10
)
SELECT * FROM numeros;`,
      },
      {
        command: "UNION",
        description: "Une resultados compatíveis e remove duplicidades.",
        example: "SELECT email FROM alunos UNION SELECT email FROM professores;",
      },
      {
        command: "UNION ALL",
        description: "Une resultados compatíveis preservando duplicidades.",
        example: "SELECT cidade FROM alunos UNION ALL SELECT cidade FROM professores;",
      },
      {
        command: "INTERSECT e EXCEPT",
        description: "Retornam valores comuns ou valores presentes somente no primeiro resultado.",
        example: `SELECT email FROM inscritos
INTERSECT
SELECT email FROM matriculados;`,
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/queries-with.html",
  },
  {
    slug: "views-indices",
    order: 11,
    category: "Desempenho",
    title: "Views, índices e EXPLAIN",
    summary: "Reutilize consultas e investigue desempenho com views, índices e planos de execução.",
    introduction:
      "Views encapsulam consultas. Índices criam caminhos adicionais de acesso aos dados. EXPLAIN mostra o plano escolhido pelo otimizador.",
    notes: [
      "Índices aceleram determinadas leituras, mas ocupam espaço e aumentam o custo de escrita.",
      "Crie índices com base em consultas reais, não apenas porque uma coluna existe.",
      "EXPLAIN ANALYZE executa a consulta; evite usá-lo sem cuidado em comandos que modificam dados.",
    ],
    commands: [
      {
        command: "CREATE VIEW",
        description: "Cria uma consulta reutilizável que reflete os dados atuais.",
        example: `CREATE VIEW vw_alunos_ativos AS
SELECT id, nome, email
FROM alunos
WHERE ativo = true;`,
      },
      {
        command: "CREATE MATERIALIZED VIEW",
        description: "Armazena fisicamente o resultado da consulta.",
        example: `CREATE MATERIALIZED VIEW mv_resumo_cursos AS
SELECT curso_id, COUNT(*) AS total
FROM matriculas
GROUP BY curso_id;`,
      },
      {
        command: "REFRESH MATERIALIZED VIEW",
        description: "Atualiza os dados de uma materialized view.",
        example: "REFRESH MATERIALIZED VIEW mv_resumo_cursos;",
      },
      {
        command: "CREATE INDEX",
        description: "Cria um índice para apoiar filtros, ordenações ou relacionamentos.",
        example: "CREATE INDEX idx_alunos_email ON alunos (email);",
      },
      {
        command: "Índice parcial",
        description: "Indexa apenas as linhas que atendem a uma condição.",
        example: "CREATE INDEX idx_alunos_ativos ON alunos (nome) WHERE ativo = true;",
      },
      {
        command: "EXPLAIN",
        description: "Mostra o plano estimado da consulta.",
        example: "EXPLAIN SELECT * FROM alunos WHERE email = 'ana@email.com';",
      },
      {
        command: "EXPLAIN ANALYZE",
        description: "Executa a consulta e mostra tempos e linhas reais.",
        example: "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM alunos WHERE ativo = true;",
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/indexes.html",
  },
  {
    slug: "transacoes-tcl",
    order: 12,
    category: "TCL",
    title: "TCL - Transações",
    summary: "Controle operações com BEGIN, COMMIT, ROLLBACK, SAVEPOINT e isolamento para confirmar ou desfazer mudanças.",
    introduction:
      "TCL significa Transaction Control Language. Pense nas transações como um combinado: várias operações entram juntas e só devem ser confirmadas se tudo estiver correto.",
    notes: [
      "Uma transação deve ser curta para reduzir bloqueios e contenção.",
      "Use transações quando uma regra de negócio depende de mais de uma alteração no banco.",
      "Antes de confirmar uma alteração crítica com COMMIT, confira se todas as etapas foram executadas corretamente.",
    ],
    commands: [
      {
        command: "BEGIN",
        description: "Inicia uma transação explícita.",
        example: `BEGIN;

UPDATE contas SET saldo = saldo - 100 WHERE id = 1;
UPDATE contas SET saldo = saldo + 100 WHERE id = 2;

COMMIT;`,
      },
      {
        command: "COMMIT",
        description: "Confirma todas as alterações da transação.",
        example: "COMMIT;",
      },
      {
        command: "ROLLBACK",
        description: "Desfaz as alterações ainda não confirmadas.",
        example: "ROLLBACK;",
      },
      {
        command: "SAVEPOINT",
        description: "Cria um ponto intermediário para desfazer apenas parte da transação.",
        example: `SAVEPOINT antes_do_desconto;
UPDATE produtos SET preco = preco * 0.5;
ROLLBACK TO SAVEPOINT antes_do_desconto;`,
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/tutorial-transactions.html",
  },
  {
    slug: "usuarios-permissoes-dcl",
    order: 13,
    category: "DCL",
    title: "DCL - Usuários e permissões",
    summary: "Administre acesso com roles, GRANT, REVOKE e privilégios padrão, sempre pensando no menor privilégio necessário.",
    introduction:
      "DCL significa Data Control Language. Aqui o foco é simples e importante: decidir quem pode consultar, inserir, alterar, excluir ou administrar informações no banco.",
    notes: [
      "Aplique o princípio do menor privilégio: conceda somente os acessos necessários.",
      "Prefira roles de grupo para organizar permissões por função, como leitura, escrita ou administração.",
      "Senhas, strings de conexão e arquivos de configuração sensíveis não devem ser versionados.",
    ],
    commands: [
      {
        command: "CREATE ROLE",
        description: "Cria uma role que pode representar usuário ou grupo.",
        example: "CREATE ROLE analista LOGIN PASSWORD 'troque-esta-senha';",
      },
      {
        command: "GRANT",
        description: "Concede privilégios ou associa uma role a outra.",
        example: "GRANT SELECT ON ALL TABLES IN SCHEMA public TO analista;",
      },
      {
        command: "REVOKE",
        description: "Remove privilégios concedidos.",
        example: "REVOKE INSERT, UPDATE, DELETE ON alunos FROM analista;",
      },
      {
        command: "ALTER DEFAULT PRIVILEGES",
        description: "Define permissões padrão para objetos criados no futuro.",
        example: "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO analista;",
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/user-manag.html",
  },
  {
    slug: "backup-restauracao",
    order: 14,
    category: "Administração",
    title: "Backup e restauração",
    summary: "Proteja e transfira bancos usando pg_dump, pg_restore e psql, sempre testando se a restauração funciona.",
    introduction:
      "Backup não é só gerar um arquivo. Backups lógicos exportam a definição e os dados do banco; o formato SQL puro pode ser restaurado com psql, enquanto formatos criados pelo pg_dump são restaurados com pg_restore.",
    notes: [
      "Teste periodicamente a restauração: um backup não validado pode falhar quando for necessário.",
      "pg_dump trabalha com um banco; pg_dumpall também inclui objetos globais e pode exportar todo o cluster.",
      "Proteja arquivos de backup porque eles podem conter dados pessoais e informações sensíveis.",
    ],
    commands: [
      {
        command: "pg_dump em SQL",
        description: "Exporta um banco como script SQL legível.",
        example: "pg_dump -U postgres -d escola -f escola.sql",
        language: "bash",
      },
      {
        command: "pg_dump em formato custom",
        description: "Gera um arquivo flexível para restauração com pg_restore.",
        example: "pg_dump -U postgres -d escola -Fc -f escola.backup",
        language: "bash",
      },
      {
        command: "Restaurar SQL com psql",
        description: "Executa o script SQL em um banco existente.",
        example: "psql -U postgres -d escola_restaurada -f escola.sql",
        language: "bash",
      },
      {
        command: "pg_restore",
        description: "Restaura um arquivo não textual criado pelo pg_dump.",
        example: "pg_restore -U postgres -d escola_restaurada --clean escola.backup",
        language: "bash",
      },
      {
        command: "Backup de uma tabela",
        description: "Exporta apenas uma tabela selecionada.",
        example: "pg_dump -U postgres -d escola -t alunos -f alunos.sql",
        language: "bash",
      },
      {
        command: "pg_dumpall",
        description: "Exporta todos os bancos e objetos globais do cluster em SQL.",
        example: "pg_dumpall -U postgres -f cluster_completo.sql",
        language: "bash",
      },
    ],
    officialUrl: "https://www.postgresql.org/docs/current/backup.html",
  },
];

const extraCommandsByTopic = {
  "o-que-e-postgresql": [
    {
      command: "SELECT current_schema();",
      description: "Mostra o primeiro schema utilizado pela sessão atual.",
      usage: "Use para confirmar em qual schema objetos sem qualificação serão criados ou encontrados.",
      example: "SELECT current_schema();",
    },
    {
      command: "SHOW server_version;",
      description: "Exibe apenas o número da versão do servidor.",
      usage: "Use antes de empregar funcionalidades que dependem de uma versão específica.",
      example: "SHOW server_version;",
    },
    {
      command: "SHOW data_directory;",
      description: "Mostra o diretório de dados da instância quando o usuário possui permissão.",
      usage: "Use em tarefas administrativas para identificar onde o cluster armazena seus arquivos.",
      example: "SHOW data_directory;",
    },
    {
      command: "SELECT pg_database_size",
      description: "Calcula o espaço ocupado por um banco de dados.",
      usage: "Use para acompanhar crescimento e planejar capacidade de armazenamento.",
      example: `SELECT pg_size_pretty(
    pg_database_size(current_database())
) AS tamanho_banco;`,
    },
    {
      command: "SELECT pg_postmaster_start_time();",
      description: "Retorna quando o servidor PostgreSQL foi iniciado.",
      usage: "Use para conferir há quanto tempo a instância está em execução.",
      example: "SELECT pg_postmaster_start_time();",
    },
  ],
  "psql-conexao": [
    {
      command: "\\conninfo",
      description: "Mostra host, porta, banco e usuário da conexão atual.",
      usage: "Use para evitar executar comandos no servidor ou banco errado.",
      example: "\\conninfo",
    },
    {
      command: "\\du",
      description: "Lista roles e atributos principais.",
      usage: "Use para consultar usuários, grupos e privilégios administrativos.",
      example: "\\du",
    },
    {
      command: "\\df",
      description: "Lista funções disponíveis.",
      usage: "Use para descobrir funções próprias ou instaladas por extensões.",
      example: "\\df",
    },
    {
      command: "\\x",
      description: "Ativa ou desativa a exibição expandida dos resultados.",
      usage: "Use quando uma linha possui muitas colunas e a tabela horizontal fica difícil de ler.",
      example: "\\x auto",
    },
    {
      command: "\\timing",
      description: "Mostra o tempo gasto por cada comando executado.",
      usage: "Use para comparar consultas durante estudos de desempenho.",
      example: "\\timing on",
    },
    {
      command: "\\i arquivo.sql",
      description: "Executa comandos armazenados em um arquivo SQL.",
      usage: "Use para rodar scripts de criação, carga ou manutenção pelo psql.",
      example: "\\i scripts/criar_tabelas.sql",
    },
    {
      command: "\\copy",
      description: "Importa ou exporta arquivos usando permissões do computador cliente.",
      usage: "Use para transferir CSVs sem exigir acesso do servidor ao arquivo local.",
      example: `\\copy alunos(nome, email)
FROM 'alunos.csv'
WITH (FORMAT csv, HEADER true)`,
    },
  ],
  "bancos-schemas": [
    {
      command: "CREATE DATABASE ... TEMPLATE",
      description: "Cria um banco usando outro banco como modelo.",
      usage: "Use para gerar ambientes de teste com uma estrutura previamente preparada.",
      example: "CREATE DATABASE escola_teste TEMPLATE escola_modelo;",
    },
    {
      command: "ALTER DATABASE ... SET",
      description: "Define uma configuração padrão para conexões futuras do banco.",
      usage: "Use para aplicar timezone, search_path ou outras configurações por banco.",
      example: "ALTER DATABASE escola SET timezone TO 'America/Manaus';",
    },
    {
      command: "COMMENT ON DATABASE",
      description: "Adiciona documentação ao banco de dados.",
      usage: "Use para registrar finalidade, responsável ou ambiente diretamente no catálogo.",
      example: "COMMENT ON DATABASE escola IS 'Banco acadêmico principal';",
    },
    {
      command: "ALTER SCHEMA ... RENAME",
      description: "Renomeia um schema existente.",
      usage: "Use quando a divisão funcional do sistema mudar.",
      example: "ALTER SCHEMA academico RENAME TO ensino;",
    },
    {
      command: "GRANT USAGE ON SCHEMA",
      description: "Permite que uma role acesse objetos de um schema.",
      usage: "Use junto aos privilégios das tabelas para liberar consultas de forma controlada.",
      example: "GRANT USAGE ON SCHEMA academico TO analista;",
    },
  ],
  ddl: [
    {
      command: "CREATE TABLE IF NOT EXISTS",
      description: "Cria a tabela somente quando ela ainda não existe.",
      usage: "Use em scripts reaplicáveis de laboratório ou provisionamento.",
      example: `CREATE TABLE IF NOT EXISTS departamentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome text NOT NULL UNIQUE
);`,
    },
    {
      command: "CREATE TABLE ... LIKE",
      description: "Cria uma tabela baseada na estrutura de outra.",
      usage: "Use para tabelas temporárias, históricas ou de estágio com estrutura semelhante.",
      example: `CREATE TABLE alunos_historico
(LIKE alunos INCLUDING DEFAULTS INCLUDING CONSTRAINTS);`,
    },
    {
      command: "CREATE TABLE AS",
      description: "Cria e preenche uma tabela com o resultado de uma consulta.",
      usage: "Use para materializar um recorte de dados ou preparar uma tabela de análise.",
      example: `CREATE TABLE alunos_aprovados AS
SELECT *
FROM alunos
WHERE nota >= 7;`,
    },
    {
      command: "Modelo CREATE TABLE — alunos",
      description: "Modelo completo com chave primária, textos obrigatórios, e-mail único, data, booleano e auditoria de criação.",
      usage: "Use como base para cadastros simples de pessoas.",
      example: `CREATE TABLE alunos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    data_nascimento date,
    ativo boolean NOT NULL DEFAULT true,
    criado_em timestamptz NOT NULL DEFAULT now()
);`,
    },
    {
      command: "Modelo CREATE TABLE — cursos",
      description: "Modelo com código único, carga horária positiva e status padrão.",
      usage: "Use em entidades de catálogo ou domínio, como cursos, categorias e departamentos.",
      example: `CREATE TABLE cursos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo varchar(20) NOT NULL UNIQUE,
    nome varchar(160) NOT NULL,
    carga_horaria integer NOT NULL CHECK (carga_horaria > 0),
    ativo boolean NOT NULL DEFAULT true
);`,
    },
    {
      command: "Modelo CREATE TABLE — matrículas",
      description: "Modelo de tabela associativa com chave primária composta e duas foreign keys.",
      usage: "Use para representar relacionamento muitos-para-muitos.",
      example: `CREATE TABLE matriculas (
    aluno_id bigint NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    curso_id bigint NOT NULL REFERENCES cursos(id) ON DELETE RESTRICT,
    data_matricula date NOT NULL DEFAULT CURRENT_DATE,
    status varchar(20) NOT NULL DEFAULT 'ativa',
    PRIMARY KEY (aluno_id, curso_id),
    CHECK (status IN ('ativa', 'trancada', 'concluida', 'cancelada'))
);`,
    },
    {
      command: "Modelo CREATE TABLE — pedidos",
      description: "Modelo com relacionamento 1:N, número único, valor total e status.",
      usage: "Use em transações comerciais ou registros dependentes de uma entidade pai.",
      example: `CREATE TABLE pedidos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id bigint NOT NULL REFERENCES clientes(id) ON DELETE RESTRICT,
    numero varchar(30) NOT NULL UNIQUE,
    total numeric(12,2) NOT NULL DEFAULT 0 CHECK (total >= 0),
    status varchar(20) NOT NULL DEFAULT 'aberto',
    criado_em timestamptz NOT NULL DEFAULT now()
);`,
    },
    {
      command: "Modelo CREATE TABLE — turmas",
      description: "Modelo com UNIQUE composto, validação de datas e limite positivo de vagas.",
      usage: "Use quando a unicidade depende da combinação de colunas.",
      example: `CREATE TABLE turmas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    curso_id bigint NOT NULL REFERENCES cursos(id),
    codigo varchar(20) NOT NULL,
    data_inicio date NOT NULL,
    data_fim date NOT NULL,
    vagas integer NOT NULL CHECK (vagas > 0),
    UNIQUE (curso_id, codigo),
    CHECK (data_fim >= data_inicio)
);`,
    },
    {
      command: "Modelo CREATE TABLE — pagamentos",
      description: "Modelo financeiro com numeric, vencimento, pagamento opcional e validação.",
      usage: "Use para controle financeiro básico vinculado a pedidos, contratos ou matrículas.",
      example: `CREATE TABLE pagamentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pedido_id bigint NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    valor numeric(12,2) NOT NULL CHECK (valor > 0),
    vencimento date NOT NULL,
    pago_em timestamptz,
    metodo varchar(30),
    CHECK (pago_em IS NULL OR pago_em::date >= vencimento)
);`,
    },
    {
      command: "Modelo CREATE TABLE — eventos com JSONB",
      description: "Modelo com UUID, metadados flexíveis em JSONB e validação do formato.",
      usage: "Use para logs de aplicação, auditoria e integrações semiestruturadas.",
      example: `CREATE TABLE eventos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo varchar(80) NOT NULL,
    usuario_id bigint,
    dados jsonb NOT NULL DEFAULT '{}'::jsonb,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CHECK (jsonb_typeof(dados) = 'object')
);`,
    },
    {
      command: "Modelo CREATE TABLE — auditoria",
      description: "Modelo para registrar tabela, registro, ação, usuário e dados antes/depois.",
      usage: "Use para rastrear mudanças importantes no sistema.",
      example: `CREATE TABLE auditoria (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tabela varchar(80) NOT NULL,
    registro_id text NOT NULL,
    acao varchar(20) NOT NULL CHECK (acao IN ('INSERT', 'UPDATE', 'DELETE')),
    usuario varchar(120),
    antes jsonb,
    depois jsonb,
    criado_em timestamptz NOT NULL DEFAULT now()
);`,
    },
    {
      command: "ALTER TABLE ... ALTER COLUMN TYPE",
      description: "Altera o tipo de uma coluna, opcionalmente convertendo valores existentes.",
      usage: "Use em migrações quando o tipo atual não representa mais o domínio.",
      example: `ALTER TABLE alunos
ALTER COLUMN matricula TYPE bigint
USING matricula::bigint;`,
    },
    {
      command: "ALTER TABLE ... SET DEFAULT",
      description: "Define um valor padrão para novas linhas.",
      usage: "Use quando a maior parte dos novos registros deve receber o mesmo valor.",
      example: "ALTER TABLE alunos ALTER COLUMN ativo SET DEFAULT true;",
    },
    {
      command: "ALTER TABLE ... ADD CONSTRAINT",
      description: "Adiciona uma restrição nomeada a uma tabela existente.",
      usage: "Use para evoluir regras de integridade em uma tabela que já existe.",
      example: `ALTER TABLE alunos
ADD CONSTRAINT ck_aluno_idade CHECK (idade >= 0);`,
    },
    {
      command: "COMMENT ON TABLE / COLUMN",
      description: "Documenta tabelas e colunas no catálogo do PostgreSQL.",
      usage: "Use para manter o significado dos dados próximo à própria estrutura.",
      example: `COMMENT ON TABLE alunos IS 'Cadastro acadêmico';
COMMENT ON COLUMN alunos.matricula IS 'Código único institucional';`,
    },
  ],
  "tipos-restricoes": [
    {
      command: "CREATE TYPE ... AS ENUM",
      description: "Cria um tipo enumerado com valores permitidos.",
      usage: "Use quando o conjunto de estados é pequeno, estável e compartilhado.",
      example: `CREATE TYPE situacao_matricula AS ENUM (
    'ativa', 'trancada', 'concluida', 'cancelada'
);`,
    },
    {
      command: "CREATE DOMAIN",
      description: "Cria um tipo reutilizável baseado em outro tipo e em restrições.",
      usage: "Use para padronizar regras como e-mail, nota ou valor positivo em várias tabelas.",
      example: `CREATE DOMAIN nota_valida AS numeric(4,2)
CHECK (VALUE BETWEEN 0 AND 10);`,
    },
    {
      command: "uuid com gen_random_uuid()",
      description: "Gera identificadores UUID aleatórios.",
      usage: "Use quando IDs precisam ser gerados de forma distribuída ou expostos externamente.",
      example: `CREATE TABLE documentos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo text NOT NULL
);`,
    },
    {
      command: "jsonb",
      description: "Armazena documentos JSON em formato binário pesquisável.",
      usage: "Use para atributos semiestruturados, preservando campos relacionais importantes fora do JSON.",
      example: `CREATE TABLE eventos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dados jsonb NOT NULL
);`,
    },
    {
      command: "ON DELETE CASCADE",
      description: "Remove automaticamente linhas dependentes quando a linha pai é excluída.",
      usage: "Use somente quando o ciclo de vida do registro filho depende integralmente do pai.",
      example: `FOREIGN KEY (pedido_id)
REFERENCES pedidos(id)
ON DELETE CASCADE`,
    },
    {
      command: "Constraint composta",
      description: "Aplica uma regra UNIQUE ou PRIMARY KEY sobre várias colunas.",
      usage: "Use quando a unicidade depende da combinação de atributos.",
      example: `CONSTRAINT uq_matricula
UNIQUE (aluno_id, turma_id)`,
    },
  ],
  dml: [
    {
      command: "INSERT ... SELECT",
      description: "Insere linhas produzidas por uma consulta.",
      usage: "Use para copiar, migrar ou transformar dados entre tabelas.",
      example: `INSERT INTO alunos_inativos (id, nome, email)
SELECT id, nome, email
FROM alunos
WHERE ativo = false;`,
    },
    {
      command: "UPDATE ... FROM",
      description: "Atualiza uma tabela usando valores de outra tabela ou consulta.",
      usage: "Use em sincronizações e atualizações em lote baseadas em dados relacionados.",
      example: `UPDATE produtos AS p
SET preco = i.novo_preco
FROM importacao_precos AS i
WHERE i.produto_id = p.id;`,
    },
    {
      command: "DELETE ... USING",
      description: "Remove linhas usando outra tabela na condição.",
      usage: "Use para exclusões relacionais em lote.",
      example: `DELETE FROM sessoes AS s
USING usuarios AS u
WHERE u.id = s.usuario_id
  AND u.ativo = false;`,
    },
    {
      command: "COPY FROM",
      description: "Carrega dados em massa a partir de arquivo acessível pelo servidor.",
      usage: "Use para importações de alto volume quando o servidor pode acessar o arquivo.",
      example: `COPY alunos(nome, email)
FROM '/dados/alunos.csv'
WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');`,
    },
    {
      command: "COPY TO",
      description: "Exporta uma tabela ou consulta para arquivo no servidor.",
      usage: "Use para integrações e extrações em massa.",
      example: `COPY (
    SELECT id, nome, email FROM alunos WHERE ativo
) TO '/dados/alunos_ativos.csv'
WITH (FORMAT csv, HEADER true);`,
    },
    {
      command: "OVERRIDING SYSTEM VALUE",
      description: "Permite fornecer valor explícito para uma identity ALWAYS.",
      usage: "Use com cuidado em migrações que precisam preservar identificadores antigos.",
      example: `INSERT INTO cursos (id, nome)
OVERRIDING SYSTEM VALUE
VALUES (100, 'Banco de Dados');`,
    },
  ],
  "dql-select": [
    {
      command: "Aliases com AS",
      description: "Renomeia colunas e tabelas no resultado ou na consulta.",
      usage: "Use para deixar relatórios e JOINs mais legíveis.",
      example: `SELECT a.nome AS aluno,
       a.criado_em AS data_cadastro
FROM alunos AS a;`,
    },
    {
      command: "DISTINCT ON",
      description: "Mantém a primeira linha de cada grupo conforme a ordenação.",
      usage: "Use para obter, por exemplo, o registro mais recente de cada entidade.",
      example: `SELECT DISTINCT ON (aluno_id)
       aluno_id, nota, criado_em
FROM avaliacoes
ORDER BY aluno_id, criado_em DESC;`,
    },
    {
      command: "COALESCE",
      description: "Retorna o primeiro valor não nulo de uma lista.",
      usage: "Use para substituir NULL na apresentação ou em cálculos.",
      example: "SELECT nome, COALESCE(telefone, 'Não informado') FROM alunos;",
    },
    {
      command: "NULLIF",
      description: "Retorna NULL quando dois valores são iguais.",
      usage: "Use para evitar divisões por zero ou transformar valores sentinela em NULL.",
      example: "SELECT total / NULLIF(quantidade, 0) AS media FROM vendas;",
    },
    {
      command: "ANY e ALL",
      description: "Comparam um valor com os elementos retornados por um array ou subconsulta.",
      usage: "Use para expressar comparações contra conjuntos de valores.",
      example: `SELECT *
FROM produtos
WHERE preco > ALL (
    SELECT preco FROM produtos WHERE categoria = 'Básico'
);`,
    },
    {
      command: "FETCH FIRST",
      description: "Limita linhas usando a sintaxe do padrão SQL.",
      usage: "Use como alternativa portável ao LIMIT.",
      example: `SELECT *
FROM alunos
ORDER BY nota DESC
FETCH FIRST 10 ROWS ONLY;`,
    },
    {
      command: "Operadores de expressão regular",
      description: "Pesquisa padrões com ~, ~*, !~ e !~*.",
      usage: "Use quando LIKE não é suficiente para validar ou localizar padrões de texto.",
      example: "SELECT * FROM alunos WHERE email ~* '^[a-z0-9._%+-]+@';",
    },
  ],
  joins: [
    {
      command: "JOIN com múltiplas condições",
      description: "Relaciona tabelas usando mais de uma coluna.",
      usage: "Use quando a chave lógica do relacionamento é composta.",
      example: `SELECT *
FROM notas AS n
JOIN matriculas AS m
  ON m.aluno_id = n.aluno_id
 AND m.turma_id = n.turma_id;`,
    },
    {
      command: "JOIN ... USING",
      description: "Simplifica o JOIN quando as colunas possuem o mesmo nome.",
      usage: "Use em relações simples para evitar repetir os dois lados da igualdade.",
      example: `SELECT aluno_id, a.nome, m.nota
FROM alunos AS a
JOIN matriculas AS m USING (aluno_id);`,
    },
    {
      command: "NATURAL JOIN",
      description: "Relaciona automaticamente todas as colunas de mesmo nome.",
      usage: "Conheça a sintaxe, mas evite em produção porque mudanças de schema podem alterar o resultado.",
      example: "SELECT * FROM alunos NATURAL JOIN matriculas;",
    },
    {
      command: "LATERAL JOIN",
      description: "Permite que uma subconsulta no FROM utilize colunas das tabelas anteriores.",
      usage: "Use para buscar os principais registros relacionados a cada linha.",
      example: `SELECT a.nome, ult.nota
FROM alunos AS a
LEFT JOIN LATERAL (
    SELECT nota
    FROM avaliacoes
    WHERE aluno_id = a.id
    ORDER BY criado_em DESC
    LIMIT 1
) AS ult ON true;`,
    },
    {
      command: "Anti-join com NOT EXISTS",
      description: "Retorna linhas que não possuem correspondência.",
      usage: "Use para encontrar cursos sem matrículas ou clientes sem pedidos.",
      example: `SELECT c.*
FROM cursos AS c
WHERE NOT EXISTS (
    SELECT 1 FROM matriculas AS m
    WHERE m.curso_id = c.id
);`,
    },
    {
      command: "JOIN em três tabelas",
      description: "Percorre mais de um relacionamento na mesma consulta.",
      usage: "Use para produzir relatórios envolvendo entidades intermediárias.",
      example: `SELECT a.nome, c.nome AS curso, m.nota
FROM matriculas AS m
JOIN alunos AS a ON a.id = m.aluno_id
JOIN cursos AS c ON c.id = m.curso_id;`,
    },
  ],
  "funcoes-agregacoes": [
    {
      command: "string_agg",
      description: "Concatena textos de várias linhas usando um separador.",
      usage: "Use para listar valores relacionados em uma única linha de relatório.",
      example: `SELECT curso_id,
       string_agg(nome, ', ' ORDER BY nome) AS alunos
FROM alunos
GROUP BY curso_id;`,
    },
    {
      command: "array_agg",
      description: "Agrupa valores em um array PostgreSQL.",
      usage: "Use quando a aplicação precisa receber uma coleção estruturada por grupo.",
      example: "SELECT curso_id, array_agg(id ORDER BY id) FROM alunos GROUP BY curso_id;",
    },
    {
      command: "jsonb_agg e jsonb_build_object",
      description: "Produzem documentos JSON a partir das linhas.",
      usage: "Use para montar respostas hierárquicas destinadas a APIs.",
      example: `SELECT curso_id,
       jsonb_agg(
           jsonb_build_object('id', id, 'nome', nome)
           ORDER BY nome
       ) AS alunos
FROM alunos
GROUP BY curso_id;`,
    },
    {
      command: "Window function com OVER",
      description: "Calcula valores sobre um conjunto sem reduzir a quantidade de linhas.",
      usage: "Use para rankings, acumulados, comparações e médias móveis.",
      example: `SELECT nome, nota,
       AVG(nota) OVER () AS media_geral
FROM alunos;`,
    },
    {
      command: "row_number, rank e dense_rank",
      description: "Numeram ou classificam linhas dentro de partições.",
      usage: "Use para rankings gerais ou por categoria.",
      example: `SELECT nome, curso_id, nota,
       dense_rank() OVER (
           PARTITION BY curso_id
           ORDER BY nota DESC
       ) AS posicao
FROM alunos;`,
    },
    {
      command: "lag e lead",
      description: "Acessam a linha anterior ou seguinte dentro de uma janela.",
      usage: "Use para comparar períodos consecutivos em séries temporais.",
      example: `SELECT mes, receita,
       receita - lag(receita) OVER (ORDER BY mes) AS variacao
FROM receitas_mensais;`,
    },
    {
      command: "generate_series",
      description: "Gera sequências numéricas ou temporais.",
      usage: "Use para calendários, dados de teste e preenchimento de períodos sem registros.",
      example: `SELECT generate_series(
    date '2026-01-01',
    date '2026-01-31',
    interval '1 day'
) AS dia;`,
    },
  ],
  "subconsultas-ctes": [
    {
      command: "Subconsulta correlacionada",
      description: "Executa uma subconsulta relacionada à linha da consulta externa.",
      usage: "Use para comparar cada linha ao seu próprio grupo.",
      example: `SELECT a.nome, a.nota
FROM alunos AS a
WHERE a.nota > (
    SELECT AVG(b.nota)
    FROM alunos AS b
    WHERE b.curso_id = a.curso_id
);`,
    },
    {
      command: "IN com subconsulta",
      description: "Filtra linhas cujo valor aparece no resultado interno.",
      usage: "Use quando a subconsulta retorna uma lista pequena ou conceitualmente clara.",
      example: `SELECT *
FROM alunos
WHERE curso_id IN (
    SELECT id FROM cursos WHERE ativo = true
);`,
    },
    {
      command: "CTE com INSERT",
      description: "Usa uma operação de escrita com RETURNING como etapa da consulta.",
      usage: "Use para encadear movimentações ou auditorias de forma atômica.",
      example: `WITH removidos AS (
    DELETE FROM fila
    WHERE processado = true
    RETURNING *
)
INSERT INTO fila_historico
SELECT * FROM removidos;`,
    },
    {
      command: "CTE MATERIALIZED",
      description: "Força a materialização do resultado intermediário.",
      usage: "Use quando a mesma CTE cara é reutilizada ou quando deseja impedir otimizações de incorporação.",
      example: `WITH dados AS MATERIALIZED (
    SELECT * FROM vendas WHERE criado_em >= current_date - 30
)
SELECT categoria, SUM(valor)
FROM dados
GROUP BY categoria;`,
    },
    {
      command: "EXCEPT",
      description: "Retorna linhas do primeiro resultado ausentes no segundo.",
      usage: "Use para comparar conjuntos, localizar pendências ou divergências.",
      example: `SELECT email FROM inscritos
EXCEPT
SELECT email FROM matriculados;`,
    },
    {
      command: "VALUES como tabela",
      description: "Cria um conjunto de linhas temporário dentro da consulta.",
      usage: "Use para comparar ou inserir pequenos conjuntos sem criar tabela física.",
      example: `SELECT *
FROM (
    VALUES (1, 'Básico'), (2, 'Intermediário'), (3, 'Avançado')
) AS niveis(id, nome);`,
    },
  ],
  "views-indices": [
    {
      command: "CREATE OR REPLACE VIEW",
      description: "Atualiza a definição de uma view preservando o objeto.",
      usage: "Use para evoluir consultas reutilizáveis sem remover permissões existentes.",
      example: `CREATE OR REPLACE VIEW vw_alunos_ativos AS
SELECT id, nome, email, curso_id
FROM alunos
WHERE ativo = true;`,
    },
    {
      command: "CREATE UNIQUE INDEX",
      description: "Cria índice que também garante unicidade.",
      usage: "Use para regras de unicidade, inclusive baseadas em expressões.",
      example: "CREATE UNIQUE INDEX uq_alunos_email_lower ON alunos (lower(email));",
    },
    {
      command: "Índice multicoluna",
      description: "Indexa uma sequência de colunas.",
      usage: "Use quando filtros e ordenações frequentes seguem a ordem inicial das colunas do índice.",
      example: "CREATE INDEX idx_matriculas_curso_data ON matriculas (curso_id, criado_em DESC);",
    },
    {
      command: "Índice com INCLUDE",
      description: "Armazena colunas adicionais sem incluí-las na chave de busca.",
      usage: "Use para favorecer index-only scans em consultas recorrentes.",
      example: "CREATE INDEX idx_alunos_email_include ON alunos (email) INCLUDE (nome, ativo);",
    },
    {
      command: "Índice GIN",
      description: "Indexa valores compostos, como jsonb, arrays e busca textual.",
      usage: "Use para operadores de contenção em documentos JSON ou coleções.",
      example: "CREATE INDEX idx_eventos_dados_gin ON eventos USING gin (dados);",
    },
    {
      command: "Índice BRIN",
      description: "Resume blocos físicos com baixo custo de armazenamento.",
      usage: "Use em tabelas muito grandes e naturalmente ordenadas, como logs por data.",
      example: "CREATE INDEX idx_logs_criado_brin ON logs USING brin (criado_em);",
    },
    {
      command: "REINDEX e ANALYZE",
      description: "Reconstrói índices e atualiza estatísticas do otimizador.",
      usage: "Use em manutenção ou após grandes cargas e alterações de distribuição.",
      example: `REINDEX INDEX idx_alunos_email;
ANALYZE alunos;`,
    },
  ],
  "transacoes-tcl": [
    {
      command: "SET TRANSACTION ISOLATION LEVEL",
      description: "Define o nível de isolamento da transação.",
      usage: "Use quando a regra exige controle específico sobre leituras concorrentes.",
      example: `BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT * FROM contas;
COMMIT;`,
    },
    {
      command: "SELECT ... FOR UPDATE",
      description: "Bloqueia as linhas selecionadas para atualização concorrente.",
      usage: "Use antes de alterar saldo, estoque ou outro recurso disputado.",
      example: `BEGIN;
SELECT * FROM estoque WHERE produto_id = 10 FOR UPDATE;
UPDATE estoque SET quantidade = quantidade - 1 WHERE produto_id = 10;
COMMIT;`,
    },
    {
      command: "LOCK TABLE",
      description: "Bloqueia uma tabela durante uma transação.",
      usage: "Use com cautela quando uma operação crítica exige impedir alterações concorrentes em uma tabela inteira.",
      example: `BEGIN;
LOCK TABLE matriculas IN SHARE MODE;
SELECT COUNT(*) FROM matriculas;
COMMIT;`,
    },
    {
      command: "SET CONSTRAINTS",
      description: "Controla quando constraints adiáveis serão verificadas.",
      usage: "Use em transações com chaves ou regras que precisam ser conferidas apenas no final.",
      example: `BEGIN;
SET CONSTRAINTS ALL DEFERRED;
-- operações relacionadas
COMMIT;`,
    },
  ],
  "usuarios-permissoes-dcl": [
    {
      command: "CREATE ROLE sem LOGIN",
      description: "Cria uma role de grupo que reúne permissões.",
      usage: "Use para administrar privilégios por função de trabalho, não pessoa por pessoa.",
      example: `CREATE ROLE leitura_academica;
GRANT SELECT ON ALL TABLES IN SCHEMA academico TO leitura_academica;`,
    },
    {
      command: "GRANT role TO role",
      description: "Associa uma role de grupo a um usuário.",
      usage: "Use para entregar ao usuário o conjunto de permissões da função.",
      example: "GRANT leitura_academica TO maria;",
    },
    {
      command: "ALTER ROLE",
      description: "Altera senha, atributos ou configurações padrão da role.",
      usage: "Use para administrar acesso e comportamento de sessões.",
      example: `ALTER ROLE analista
SET statement_timeout TO '30s';`,
    },
    {
      command: "SET ROLE",
      description: "Assume temporariamente os privilégios de outra role autorizada.",
      usage: "Use para testar permissões ou executar tarefas com um papel específico.",
      example: `SET ROLE leitura_academica;
SELECT * FROM academico.alunos;
RESET ROLE;`,
    },
    {
      command: "Row-Level Security",
      description: "Restringe quais linhas cada usuário pode consultar ou modificar.",
      usage: "Use em sistemas multiempresa ou quando usuários só podem acessar seus próprios registros.",
      example: `ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY pedidos_por_usuario ON pedidos
USING (usuario_id = current_setting('app.usuario_id')::bigint);`,
    },
    {
      command: "CREATE USER",
      description: "Cria uma role com permissão de login.",
      usage: "Use quando deseja criar uma conta de acesso individual ao banco.",
      example: "CREATE USER joao WITH PASSWORD 'troque-esta-senha';",
    },
    {
      command: "GRANT USAGE ON SCHEMA",
      description: "Permite que uma role acesse objetos dentro de um schema.",
      usage: "Use junto com permissões de tabela quando o objeto está fora do schema padrão ou exige acesso explícito.",
      example: "GRANT USAGE ON SCHEMA academico TO leitura_academica;",
    },
    {
      command: "DROP ROLE",
      description: "Remove uma role quando ela não possui dependências pendentes.",
      usage: "Use depois de transferir ou remover objetos e privilégios associados à role.",
      example: "DROP ROLE usuario_temporario;",
    },
  ],
  "backup-restauracao": [
    {
      command: "pg_dump somente schema",
      description: "Exporta definições sem copiar os dados.",
      usage: "Use para versionar ou reproduzir a estrutura em outro ambiente.",
      example: "pg_dump -U postgres -d escola --schema-only -f estrutura.sql",
      language: "bash",
    },
    {
      command: "pg_dump somente dados",
      description: "Exporta os registros sem comandos de criação de objetos.",
      usage: "Use quando a estrutura já existe no destino.",
      example: "pg_dump -U postgres -d escola --data-only -f dados.sql",
      language: "bash",
    },
    {
      command: "pg_dump com compressão",
      description: "Ajusta o nível de compressão do formato de arquivo.",
      usage: "Use para equilibrar tamanho do backup e tempo de processamento.",
      example: "pg_dump -U postgres -d escola -Fc -Z 9 -f escola.backup",
      language: "bash",
    },
    {
      command: "pg_restore --list",
      description: "Lista o conteúdo de um arquivo de backup sem restaurá-lo.",
      usage: "Use para inspecionar objetos e preparar uma restauração seletiva.",
      example: "pg_restore --list escola.backup",
      language: "bash",
    },
    {
      command: "pg_restore seletivo",
      description: "Restaura somente uma tabela ou outro objeto selecionado.",
      usage: "Use para recuperar partes específicas sem substituir o banco inteiro.",
      example: "pg_restore -U postgres -d escola -t alunos escola.backup",
      language: "bash",
    },
    {
      command: "pg_restore paralelo",
      description: "Usa vários processos durante a restauração.",
      usage: "Use em backups grandes nos formatos custom ou directory.",
      example: "pg_restore -U postgres -d escola -j 4 escola.backup",
      language: "bash",
    },
    {
      command: "pg_dumpall somente globais",
      description: "Exporta roles, tablespaces e outros objetos globais.",
      usage: "Use junto aos backups individuais para reconstruir permissões do cluster.",
      example: "pg_dumpall -U postgres --globals-only -f globais.sql",
      language: "bash",
    },
  ],
};

for (const topic of postgresqlTopics) {
  topic.commands = [
    ...topic.commands,
    ...(extraCommandsByTopic[topic.slug] || []),
  ];
}

export function findPostgresqlTopic(slug) {
  return postgresqlTopics.find((topic) => topic.slug === slug);
}
