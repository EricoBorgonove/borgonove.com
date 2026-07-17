import { postgresqlConsultaExerciseList } from "./postgresqlConsultaExercises.js";
import { postgresqlClinicaVeterinariaExerciseList } from "./postgresqlClinicaVeterinariaExercises.js";
import { postgresqlLojaTemporalExerciseList } from "./postgresqlLojaTemporalExercises.js";

const basicPostgresqlExerciseBlocks = [
  {
    slug: "fundamentos-conceitos",
    order: 1,
    title: "Fundamentos e conceitos",
    summary: "Comece por aqui para fixar banco relacional, tabelas, linhas, colunas, schemas e comandos básicos.",
    level: "Básico",
    exercises: [
      "Explique, com suas palavras, o que é PostgreSQL e em quais tipos de sistema ele pode ser utilizado.",
      "Diferencie banco de dados, schema e tabela usando um exemplo do contexto escolar.",
      "Descreva a diferença entre uma linha e uma coluna em uma tabela relacional.",
      "Explique por que uma tabela normalmente precisa de uma chave primária.",
      "Liste três vantagens de usar um banco relacional em vez de guardar dados em planilhas soltas.",
      "Crie um exemplo de problema real que poderia ser resolvido com tabelas relacionadas.",
      "Explique a diferença entre comandos SQL e metacomandos do psql.",
      "Descreva o que pode acontecer quando um banco não possui regras de integridade bem definidas.",
    ],
  },
  {
    slug: "tipos-create-table",
    order: 2,
    title: "Tipos de dados e CREATE TABLE",
    summary: "Treine a escolha dos tipos de dados e a criação de tabelas completas, pensando nas regras do problema.",
    level: "Básico",
    exercises: [
      "Crie um comando CREATE TABLE para uma tabela alunos com id, nome, email, data_nascimento e ativo.",
      "Escolha tipos de dados adequados para uma tabela produtos com nome, preço, estoque e data de cadastro.",
      "Crie uma tabela cursos com carga horária positiva e código único.",
      "Explique quando usar varchar, text e char em uma modelagem.",
      "Explique por que numeric é mais indicado que double precision para valores monetários.",
      "Crie uma tabela eventos usando uma coluna jsonb para guardar dados extras do evento.",
      "Crie uma tabela com uma coluna uuid como chave primária.",
      "Analise uma tabela de exemplo e justifique se os tipos escolhidos estão adequados.",
    ],
  },
  {
    slug: "constraints",
    order: 3,
    title: "Constraints",
    summary: "Pratique as regras que protegem os dados: PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK e DEFAULT.",
    level: "Básico",
    exercises: [
      "Adicione NOT NULL nas colunas obrigatórias de uma tabela clientes.",
      "Crie uma restrição UNIQUE para impedir e-mails repetidos em uma tabela usuarios.",
      "Crie uma restrição CHECK para impedir notas menores que 0 ou maiores que 10.",
      "Explique a diferença entre PRIMARY KEY e UNIQUE.",
      "Crie uma FOREIGN KEY ligando pedidos a clientes.",
      "Explique o que significa ON DELETE CASCADE e dê um exemplo de uso adequado.",
      "Crie uma tabela matriculas com chave primária composta por aluno_id e curso_id.",
      "Escreva um exemplo em que DEFAULT evita repetição de valores no INSERT.",
    ],
  },
  {
    slug: "insert-update-delete",
    order: 4,
    title: "INSERT, UPDATE e DELETE",
    summary: "Manipule registros com atenção: aqui você treina INSERT, UPDATE, DELETE e os cuidados antes de alterar dados.",
    level: "Básico",
    exercises: [
      "Insira três cursos em uma tabela cursos usando um único INSERT.",
      "Insira um aluno informando apenas as colunas obrigatórias e deixando valores DEFAULT serem aplicados.",
      "Atualize a carga horária de um curso específico usando WHERE.",
      "Atualize todos os alunos inativos para ativo = true e explique o risco desse comando.",
      "Remova um registro específico usando DELETE com WHERE.",
      "Mostre como usar RETURNING em um INSERT, UPDATE ou DELETE.",
      "Explique por que é perigoso executar UPDATE sem WHERE.",
      "Crie um INSERT com ON CONFLICT para atualizar o nome de um usuário quando o email já existir.",
    ],
  },
  {
    slug: "select-filtros",
    order: 5,
    title: "SELECT e filtros",
    summary: "Resolva consultas usando SELECT, WHERE, ORDER BY, LIMIT, DISTINCT e operadores comuns.",
    level: "Básico",
    exercises: [
      "Liste todos os alunos ativos ordenados pelo nome.",
      "Liste os produtos com preço maior que 100.",
      "Liste os pedidos criados nos últimos 30 dias.",
      "Use BETWEEN para buscar alunos com nota entre 7 e 10.",
      "Use LIKE ou ILIKE para buscar nomes que contenham Silva.",
      "Use IN para filtrar registros de três estados diferentes.",
      "Liste os 10 produtos mais caros usando ORDER BY e LIMIT.",
      "Explique a diferença entre WHERE email = NULL e WHERE email IS NULL.",
    ],
  },
  {
    slug: "joins",
    order: 6,
    title: "JOINs",
    summary: "Relacione tabelas com INNER JOIN, LEFT JOIN e condições ON, sempre conferindo se as linhas fazem sentido.",
    level: "Intermediário",
    exercises: [
      "Liste alunos e seus cursos usando INNER JOIN entre alunos, matriculas e cursos.",
      "Liste todos os cursos, mesmo aqueles sem alunos matriculados, usando LEFT JOIN.",
      "Explique a diferença entre INNER JOIN e LEFT JOIN com um exemplo.",
      "Crie uma consulta que liste pedidos com nome do cliente e total do pedido.",
      "Mostre uma consulta que encontre clientes sem pedidos.",
      "Explique o que pode causar duplicação de linhas em um JOIN.",
      "Crie um JOIN usando duas condições na cláusula ON.",
      "Corrija uma consulta com JOIN que gera resultado cartesiano por falta de condição ON.",
    ],
  },
  {
    slug: "group-by-agregacoes",
    order: 7,
    title: "GROUP BY e funções agregadas",
    summary: "Agrupe dados e produza resumos com COUNT, SUM, AVG, MIN, MAX, HAVING e GROUP BY.",
    level: "Intermediário",
    exercises: [
      "Conte quantos alunos existem por curso.",
      "Calcule o valor total vendido por cliente.",
      "Calcule média, menor e maior nota por turma.",
      "Liste apenas cursos com mais de 20 alunos usando HAVING.",
      "Explique a diferença entre WHERE e HAVING.",
      "Use COUNT(*) FILTER para contar pedidos pagos e pendentes na mesma consulta.",
      "Agrupe pedidos por mês usando date_trunc.",
      "Explique por que toda coluna não agregada do SELECT precisa estar no GROUP BY.",
    ],
  },
  {
    slug: "subconsultas-ctes",
    order: 8,
    title: "Subconsultas e CTEs",
    summary: "Divida consultas maiores em partes menores usando subqueries, EXISTS e WITH.",
    level: "Intermediário",
    exercises: [
      "Liste alunos com nota maior que a média geral.",
      "Use IN com subconsulta para listar alunos matriculados em cursos ativos.",
      "Use EXISTS para encontrar clientes que possuem pelo menos um pedido.",
      "Use NOT EXISTS para encontrar cursos sem matrículas.",
      "Reescreva uma subconsulta usando CTE com WITH.",
      "Crie uma CTE que calcule total por cliente e depois filtre totais acima de 1000.",
      "Explique quando uma CTE melhora a leitura de uma consulta.",
      "Crie uma consulta com duas CTEs encadeadas.",
    ],
  },
  {
    slug: "views-indices",
    order: 9,
    title: "Views e índices",
    summary: "Crie consultas reutilizáveis e entenda quando índices ajudam ou atrapalham o desempenho.",
    level: "Intermediário",
    exercises: [
      "Crie uma view chamada vw_alunos_ativos com alunos ativos e seus cursos.",
      "Explique a diferença entre view comum e materialized view.",
      "Crie um índice para acelerar busca por email na tabela alunos.",
      "Crie um índice composto para consultas por curso_id e data_matricula.",
      "Explique por que índice demais pode prejudicar INSERT, UPDATE e DELETE.",
      "Use EXPLAIN para observar o plano de uma consulta.",
      "Use EXPLAIN ANALYZE e explique por que ele deve ser usado com cuidado.",
      "Crie um índice parcial para alunos ativos.",
    ],
  },
  {
    slug: "transacoes-permissoes",
    order: 10,
    title: "Transações e permissões",
    summary: "Treine transações e permissões, separando bem o que confirma dados e o que libera acesso.",
    level: "Intermediário",
    exercises: [
      "Crie uma transação com BEGIN, dois UPDATEs e COMMIT para simular transferência entre contas.",
      "Mostre como desfazer uma transação usando ROLLBACK.",
      "Use SAVEPOINT para desfazer apenas uma parte de uma transação.",
      "Explique por que transações longas podem causar problemas.",
      "Crie uma role chamada analista com permissão de login.",
      "Conceda SELECT em todas as tabelas de um schema para uma role.",
      "Remova permissão de INSERT de uma role usando REVOKE.",
      "Explique o princípio do menor privilégio em bancos de dados.",
    ],
  },
  {
    slug: "backup-restauracao",
    order: 11,
    title: "Backup e restauração",
    summary: "Pratique backup e restauração lembrando que backup bom é aquele que você consegue restaurar.",
    level: "Intermediário",
    exercises: [
      "Escreva um comando pg_dump para gerar backup SQL de um banco escola.",
      "Escreva um comando pg_dump em formato custom para restauração com pg_restore.",
      "Mostre como restaurar um arquivo SQL usando psql.",
      "Mostre como restaurar um arquivo custom usando pg_restore.",
      "Explique a diferença entre pg_dump e pg_dumpall.",
      "Explique por que backup sem teste de restauração não é suficiente.",
      "Liste três cuidados ao armazenar arquivos de backup.",
      "Crie um pequeno plano de backup semanal para um banco acadêmico.",
    ],
  },
  {
    slug: "mer-avancado-historico-composicao",
    order: 4,
    title: "Histórico, composição e execução",
    summary:
      "Trabalhe com bancos que precisam guardar histórico, itens compostos, progresso de execução e registros que dependem de outros registros.",
    level: "Avançado prático",
    exercises: [
      createMerExercise({
        number: 16,
        title: "Marketplace",
        question:
          "crie o banco para vendedores, produtos, pedidos e itens de pedido, considerando que cada produto pertence a um vendedor.",
        database: "marketplace_mer",
        entities: [
          { name: "vendedores", fields: ["id PK", "nome", "email UNIQUE"] },
          { name: "produtos", fields: ["id PK", "vendedor_id FK", "nome", "preco"] },
          { name: "pedidos", fields: ["id PK", "data_pedido", "status"] },
          { name: "itens_pedido", fields: ["pedido_id PK/FK", "produto_id PK/FK", "quantidade", "preco_unitario"] },
        ],
        relationships: [
          { name: "anuncia", from: "vendedores", to: "produtos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um vendedor pode anunciar vários produtos." },
          { name: "possui", from: "pedidos", to: "itens_pedido", fromCardinality: "(1,N)", toCardinality: "(1,1)", description: "Um pedido possui um ou mais itens." },
          { name: "vende", from: "produtos", to: "itens_pedido", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um produto pode aparecer em vários pedidos." },
        ],
        sql: `CREATE TABLE vendedores (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE
);

CREATE TABLE produtos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vendedor_id bigint NOT NULL REFERENCES vendedores(id),
    nome varchar(160) NOT NULL,
    preco numeric(10,2) NOT NULL CHECK (preco > 0)
);

CREATE TABLE pedidos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    data_pedido timestamptz NOT NULL DEFAULT now(),
    status varchar(30) NOT NULL DEFAULT 'aberto'
);

CREATE TABLE itens_pedido (
    pedido_id bigint NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id bigint NOT NULL REFERENCES produtos(id),
    quantidade integer NOT NULL CHECK (quantidade > 0),
    preco_unitario numeric(10,2) NOT NULL CHECK (preco_unitario > 0),
    PRIMARY KEY (pedido_id, produto_id)
);`,
      }),
      createMerExercise({
        number: 17,
        title: "Hospital e exames",
        question:
          "crie o banco para pacientes, médicos, exames e solicitações de exame.",
        database: "hospital_exames_mer",
        entities: [
          { name: "pacientes", fields: ["id PK", "nome", "cpf UNIQUE"] },
          { name: "medicos", fields: ["id PK", "nome", "crm UNIQUE"] },
          { name: "exames", fields: ["id PK", "nome UNIQUE", "preparo"] },
          { name: "solicitacoes", fields: ["id PK", "paciente_id FK", "medico_id FK", "exame_id FK"] },
        ],
        relationships: [
          { name: "recebe", from: "pacientes", to: "solicitacoes", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um paciente pode receber várias solicitações." },
          { name: "solicita", from: "medicos", to: "solicitacoes", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um médico pode solicitar vários exames." },
          { name: "define", from: "exames", to: "solicitacoes", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um exame pode aparecer em várias solicitações." },
        ],
        sql: `CREATE TABLE pacientes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    cpf char(11) NOT NULL UNIQUE
);

CREATE TABLE medicos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    crm varchar(30) NOT NULL UNIQUE
);

CREATE TABLE exames (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL UNIQUE,
    preparo text
);

CREATE TABLE solicitacoes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    paciente_id bigint NOT NULL REFERENCES pacientes(id),
    medico_id bigint NOT NULL REFERENCES medicos(id),
    exame_id bigint NOT NULL REFERENCES exames(id),
    data_solicitacao date NOT NULL DEFAULT CURRENT_DATE,
    status varchar(30) NOT NULL DEFAULT 'solicitado'
);`,
      }),
      createMerExercise({
        number: 18,
        title: "Financeiro pessoal",
        question:
          "crie o banco para contas, categorias, lançamentos e anexos de comprovantes.",
        database: "financeiro_mer",
        entities: [
          { name: "contas", fields: ["id PK", "nome UNIQUE", "saldo_inicial"] },
          { name: "categorias", fields: ["id PK", "nome UNIQUE", "tipo"] },
          { name: "lancamentos", fields: ["id PK", "conta_id FK", "categoria_id FK", "valor"] },
          { name: "anexos", fields: ["id PK", "lancamento_id FK", "arquivo", "tipo"] },
        ],
        relationships: [
          { name: "movimenta", from: "contas", to: "lancamentos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma conta possui vários lançamentos." },
          { name: "classifica", from: "categorias", to: "lancamentos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma categoria classifica vários lançamentos." },
          { name: "comprova", from: "lancamentos", to: "anexos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um lançamento pode ter anexos." },
        ],
        sql: `CREATE TABLE contas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(80) NOT NULL UNIQUE,
    saldo_inicial numeric(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE categorias (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(80) NOT NULL UNIQUE,
    tipo varchar(20) NOT NULL CHECK (tipo IN ('receita', 'despesa'))
);

CREATE TABLE lancamentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    conta_id bigint NOT NULL REFERENCES contas(id),
    categoria_id bigint NOT NULL REFERENCES categorias(id),
    valor numeric(12,2) NOT NULL CHECK (valor > 0),
    data_lancamento date NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE anexos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lancamento_id bigint NOT NULL REFERENCES lancamentos(id) ON DELETE CASCADE,
    arquivo varchar(255) NOT NULL,
    tipo varchar(40) NOT NULL
);`,
      }),
      createMerExercise({
        number: 19,
        title: "Produção industrial",
        question:
          "crie o banco para produtos, ordens de produção, etapas e apontamentos de execução.",
        database: "producao_mer",
        entities: [
          { name: "produtos", fields: ["id PK", "codigo UNIQUE", "nome"] },
          { name: "ordens", fields: ["id PK", "produto_id FK", "quantidade", "status"] },
          { name: "etapas", fields: ["id PK", "nome UNIQUE", "ordem_execucao"] },
          { name: "apontamentos", fields: ["id PK", "ordem_id FK", "etapa_id FK", "quantidade_ok"] },
        ],
        relationships: [
          { name: "produz", from: "produtos", to: "ordens", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um produto pode gerar várias ordens de produção." },
          { name: "executa", from: "ordens", to: "apontamentos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma ordem possui apontamentos de execução." },
          { name: "mede", from: "etapas", to: "apontamentos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma etapa pode aparecer em vários apontamentos." },
        ],
        sql: `CREATE TABLE produtos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo varchar(30) NOT NULL UNIQUE,
    nome varchar(160) NOT NULL
);

CREATE TABLE ordens (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    produto_id bigint NOT NULL REFERENCES produtos(id),
    quantidade integer NOT NULL CHECK (quantidade > 0),
    status varchar(30) NOT NULL DEFAULT 'aberta'
);

CREATE TABLE etapas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL UNIQUE,
    ordem_execucao integer NOT NULL CHECK (ordem_execucao > 0)
);

CREATE TABLE apontamentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ordem_id bigint NOT NULL REFERENCES ordens(id) ON DELETE CASCADE,
    etapa_id bigint NOT NULL REFERENCES etapas(id),
    quantidade_ok integer NOT NULL DEFAULT 0 CHECK (quantidade_ok >= 0)
);`,
      }),
      createMerExercise({
        number: 20,
        title: "Cursos online",
        question:
          "crie o banco para usuários, cursos, aulas e progresso do aluno nas aulas.",
        database: "cursos_online_mer",
        entities: [
          { name: "usuarios", fields: ["id PK", "nome", "email UNIQUE"] },
          { name: "cursos", fields: ["id PK", "titulo", "ativo"] },
          { name: "aulas", fields: ["id PK", "curso_id FK", "titulo", "ordem"] },
          { name: "progresso", fields: ["usuario_id PK/FK", "aula_id PK/FK", "concluida", "data_conclusao"] },
        ],
        relationships: [
          { name: "organiza", from: "cursos", to: "aulas", fromCardinality: "(1,N)", toCardinality: "(1,1)", description: "Um curso deve possuir uma ou mais aulas." },
          { name: "assiste", from: "usuarios", to: "progresso", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um usuário pode registrar progresso em várias aulas." },
          { name: "acompanha", from: "aulas", to: "progresso", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma aula pode ter progresso registrado por vários usuários." },
        ],
        sql: `CREATE TABLE usuarios (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE
);

CREATE TABLE cursos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo varchar(160) NOT NULL,
    ativo boolean NOT NULL DEFAULT true
);

CREATE TABLE aulas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    curso_id bigint NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    titulo varchar(160) NOT NULL,
    ordem integer NOT NULL CHECK (ordem > 0)
);

CREATE TABLE progresso (
    usuario_id bigint NOT NULL REFERENCES usuarios(id),
    aula_id bigint NOT NULL REFERENCES aulas(id),
    concluida boolean NOT NULL DEFAULT false,
    data_conclusao timestamptz,
    PRIMARY KEY (usuario_id, aula_id)
);`,
      }),
    ],
  },
  {
    slug: "mer-desafios-modelagem",
    order: 5,
    title: "Decisões de modelagem no mundo real",
    summary:
      "Analise cenários em que você precisa decidir quando criar entidade própria, tabela associativa, tabela dependente ou regra de integridade.",
    level: "Desafio guiado",
    exercises: [
      createMerExercise({
        number: 21,
        title: "Biblioteca avançada",
        question:
          "crie o banco separando livros, autores, relação livro-autor e exemplares físicos.",
        database: "biblioteca_avancada_mer",
        entities: [
          { name: "autores", fields: ["id PK", "nome", "pais"] },
          { name: "livros", fields: ["id PK", "titulo", "isbn UNIQUE"] },
          { name: "livros_autores", fields: ["livro_id PK/FK", "autor_id PK/FK", "ordem_autoria"] },
          { name: "exemplares", fields: ["id PK", "livro_id FK", "codigo_tombo UNIQUE", "status"] },
        ],
        relationships: [
          { name: "escreve", from: "autores", to: "livros_autores", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um autor pode participar de vários livros." },
          { name: "possui", from: "livros", to: "livros_autores", fromCardinality: "(1,N)", toCardinality: "(1,1)", description: "Um livro deve ter pelo menos um autor." },
          { name: "tem", from: "livros", to: "exemplares", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um livro pode ter vários exemplares físicos." },
        ],
        sql: `CREATE TABLE autores (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    pais varchar(80)
);

CREATE TABLE livros (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo varchar(180) NOT NULL,
    isbn varchar(20) NOT NULL UNIQUE
);

CREATE TABLE livros_autores (
    livro_id bigint NOT NULL REFERENCES livros(id) ON DELETE CASCADE,
    autor_id bigint NOT NULL REFERENCES autores(id),
    ordem_autoria integer NOT NULL DEFAULT 1 CHECK (ordem_autoria > 0),
    PRIMARY KEY (livro_id, autor_id)
);

CREATE TABLE exemplares (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    livro_id bigint NOT NULL REFERENCES livros(id),
    codigo_tombo varchar(40) NOT NULL UNIQUE,
    status varchar(30) NOT NULL DEFAULT 'disponivel'
);`,
      }),
      createMerExercise({
        number: 22,
        title: "Prescrição médica",
        question:
          "crie o banco para consultas, medicamentos, prescrições e itens prescritos.",
        database: "prescricao_mer",
        entities: [
          { name: "consultas", fields: ["id PK", "data_hora", "diagnostico"] },
          { name: "medicamentos", fields: ["id PK", "nome UNIQUE", "dosagem_padrao"] },
          { name: "prescricoes", fields: ["id PK", "consulta_id FK", "data_prescricao"] },
          { name: "itens_prescricao", fields: ["prescricao_id PK/FK", "medicamento_id PK/FK", "posologia"] },
        ],
        relationships: [
          { name: "gera", from: "consultas", to: "prescricoes", fromCardinality: "(0,1)", toCardinality: "(1,1)", description: "Uma consulta pode gerar uma prescrição." },
          { name: "contém", from: "prescricoes", to: "itens_prescricao", fromCardinality: "(1,N)", toCardinality: "(1,1)", description: "Uma prescrição deve conter medicamentos." },
          { name: "usa", from: "medicamentos", to: "itens_prescricao", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um medicamento pode aparecer em várias prescrições." },
        ],
        sql: `CREATE TABLE consultas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    data_hora timestamptz NOT NULL,
    diagnostico text
);

CREATE TABLE medicamentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL UNIQUE,
    dosagem_padrao varchar(80)
);

CREATE TABLE prescricoes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    consulta_id bigint NOT NULL UNIQUE REFERENCES consultas(id),
    data_prescricao date NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE itens_prescricao (
    prescricao_id bigint NOT NULL REFERENCES prescricoes(id) ON DELETE CASCADE,
    medicamento_id bigint NOT NULL REFERENCES medicamentos(id),
    posologia text NOT NULL,
    PRIMARY KEY (prescricao_id, medicamento_id)
);`,
      }),
      createMerExercise({
        number: 23,
        title: "Avaliações escolares",
        question:
          "crie o banco para turmas, alunos, avaliações e notas.",
        database: "avaliacoes_mer",
        entities: [
          { name: "turmas", fields: ["id PK", "nome", "ano"] },
          { name: "alunos", fields: ["id PK", "turma_id FK", "nome"] },
          { name: "avaliacoes", fields: ["id PK", "turma_id FK", "titulo", "peso"] },
          { name: "notas", fields: ["aluno_id PK/FK", "avaliacao_id PK/FK", "nota"] },
        ],
        relationships: [
          { name: "possui", from: "turmas", to: "alunos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma turma possui vários alunos." },
          { name: "aplica", from: "turmas", to: "avaliacoes", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma turma pode aplicar várias avaliações." },
          { name: "recebe", from: "avaliacoes", to: "notas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma avaliação gera notas para alunos." },
        ],
        sql: `CREATE TABLE turmas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(80) NOT NULL,
    ano integer NOT NULL CHECK (ano >= 2000)
);

CREATE TABLE alunos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    turma_id bigint NOT NULL REFERENCES turmas(id),
    nome varchar(120) NOT NULL
);

CREATE TABLE avaliacoes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    turma_id bigint NOT NULL REFERENCES turmas(id),
    titulo varchar(120) NOT NULL,
    peso numeric(5,2) NOT NULL CHECK (peso > 0)
);

CREATE TABLE notas (
    aluno_id bigint NOT NULL REFERENCES alunos(id),
    avaliacao_id bigint NOT NULL REFERENCES avaliacoes(id),
    nota numeric(4,2) NOT NULL CHECK (nota BETWEEN 0 AND 10),
    PRIMARY KEY (aluno_id, avaliacao_id)
);`,
      }),
      createMerExercise({
        number: 24,
        title: "Delivery",
        question:
          "crie o banco para restaurantes, entregadores, pedidos e entregas.",
        database: "delivery_mer",
        entities: [
          { name: "restaurantes", fields: ["id PK", "nome", "cnpj UNIQUE"] },
          { name: "entregadores", fields: ["id PK", "nome", "cpf UNIQUE"] },
          { name: "pedidos", fields: ["id PK", "restaurante_id FK", "valor_total", "status"] },
          { name: "entregas", fields: ["id PK", "pedido_id FK", "entregador_id FK", "status"] },
        ],
        relationships: [
          { name: "recebe", from: "restaurantes", to: "pedidos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um restaurante recebe vários pedidos." },
          { name: "gera", from: "pedidos", to: "entregas", fromCardinality: "(0,1)", toCardinality: "(1,1)", description: "Um pedido pode gerar uma entrega." },
          { name: "realiza", from: "entregadores", to: "entregas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um entregador pode realizar várias entregas." },
        ],
        sql: `CREATE TABLE restaurantes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    cnpj char(14) NOT NULL UNIQUE
);

CREATE TABLE entregadores (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    cpf char(11) NOT NULL UNIQUE
);

CREATE TABLE pedidos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    restaurante_id bigint NOT NULL REFERENCES restaurantes(id),
    valor_total numeric(10,2) NOT NULL CHECK (valor_total >= 0),
    status varchar(30) NOT NULL DEFAULT 'preparando'
);

CREATE TABLE entregas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pedido_id bigint NOT NULL UNIQUE REFERENCES pedidos(id),
    entregador_id bigint NOT NULL REFERENCES entregadores(id),
    status varchar(30) NOT NULL DEFAULT 'em_rota'
);`,
      }),
      createMerExercise({
        number: 25,
        title: "Imobiliária",
        question:
          "crie o banco para proprietários, imóveis, contratos e parcelas de pagamento.",
        database: "imobiliaria_mer",
        entities: [
          { name: "proprietarios", fields: ["id PK", "nome", "cpf UNIQUE"] },
          { name: "imoveis", fields: ["id PK", "proprietario_id FK", "endereco", "valor_aluguel"] },
          { name: "contratos", fields: ["id PK", "imovel_id FK", "inicio", "fim"] },
          { name: "parcelas", fields: ["id PK", "contrato_id FK", "vencimento", "valor"] },
        ],
        relationships: [
          { name: "possui", from: "proprietarios", to: "imoveis", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um proprietário pode possuir vários imóveis." },
          { name: "origina", from: "imoveis", to: "contratos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um imóvel pode ter vários contratos ao longo do tempo." },
          { name: "gera", from: "contratos", to: "parcelas", fromCardinality: "(1,N)", toCardinality: "(1,1)", description: "Um contrato gera parcelas de pagamento." },
        ],
        sql: `CREATE TABLE proprietarios (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    cpf char(11) NOT NULL UNIQUE
);

CREATE TABLE imoveis (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    proprietario_id bigint NOT NULL REFERENCES proprietarios(id),
    endereco varchar(220) NOT NULL,
    valor_aluguel numeric(10,2) NOT NULL CHECK (valor_aluguel > 0)
);

CREATE TABLE contratos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    imovel_id bigint NOT NULL REFERENCES imoveis(id),
    inicio date NOT NULL,
    fim date NOT NULL,
    CHECK (fim > inicio)
);

CREATE TABLE parcelas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contrato_id bigint NOT NULL REFERENCES contratos(id) ON DELETE CASCADE,
    vencimento date NOT NULL,
    valor numeric(10,2) NOT NULL CHECK (valor > 0)
);`,
      }),
    ],
  },
];

const basicPostgresqlExerciseAnswers = {
  "fundamentos-conceitos": [
    "PostgreSQL é um sistema gerenciador de banco de dados relacional. Ele pode ser usado em sistemas escolares, lojas virtuais, aplicativos, ERPs, APIs, dashboards e qualquer sistema que precise armazenar dados estruturados com segurança.",
    "Banco de dados é o conjunto geral de informações. Schema é uma organização interna dentro do banco. Tabela é onde os registros ficam armazenados. Exemplo: banco escola, schema academico e tabela alunos.",
    "Uma linha representa um registro completo, como um aluno. Uma coluna representa um atributo desse registro, como nome, email ou data_nascimento.",
    "A chave primária identifica cada linha de forma única. Sem ela, fica difícil atualizar, excluir, relacionar ou localizar um registro com segurança.",
    "Vantagens possíveis: integridade dos dados, consultas SQL, relacionamento entre tabelas, controle de acesso, backup, concorrência e menor risco de duplicidade.",
    "Exemplo: um sistema escolar pode ter alunos, cursos e matrículas. Alunos e cursos se relacionam por meio da tabela matriculas.",
    "SQL é a linguagem usada para consultar e modificar dados ou estruturas. Metacomandos do psql, como \\dt e \\l, são atalhos do terminal psql para inspecionar o banco.",
    "Podem ocorrer duplicidades, dados obrigatórios vazios, relacionamentos inválidos, valores fora do domínio e dificuldade para confiar nos relatórios.",
  ],
  "tipos-create-table": [
    `CREATE TABLE alunos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    data_nascimento date,
    ativo boolean NOT NULL DEFAULT true
);`,
    `CREATE TABLE produtos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(160) NOT NULL,
    preco numeric(10,2) NOT NULL CHECK (preco >= 0),
    estoque integer NOT NULL DEFAULT 0 CHECK (estoque >= 0),
    criado_em timestamptz NOT NULL DEFAULT now()
);`,
    `CREATE TABLE cursos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo varchar(20) NOT NULL UNIQUE,
    nome varchar(160) NOT NULL,
    carga_horaria integer NOT NULL CHECK (carga_horaria > 0)
);`,
    "varchar é indicado quando existe limite claro de tamanho. text é indicado para textos livres. char deve ser usado apenas para valores realmente fixos, como UF char(2).",
    "numeric armazena valores decimais exatos, por isso é melhor para dinheiro. double precision é aproximado e pode gerar pequenas diferenças de arredondamento.",
    `CREATE TABLE eventos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo varchar(80) NOT NULL,
    dados jsonb NOT NULL DEFAULT '{}'::jsonb,
    criado_em timestamptz NOT NULL DEFAULT now()
);`,
    `CREATE TABLE documentos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo text NOT NULL,
    criado_em timestamptz NOT NULL DEFAULT now()
);`,
    "Uma boa análise deve verificar se números usam tipos numéricos, dinheiro usa numeric, datas usam date/timestamp, textos têm limites coerentes e regras importantes aparecem como constraints.",
  ],
  constraints: [
    `CREATE TABLE clientes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL
);`,
    "ALTER TABLE usuarios ADD CONSTRAINT usuarios_email_unico UNIQUE (email);",
    "ALTER TABLE avaliacoes ADD CONSTRAINT ck_nota_valida CHECK (nota BETWEEN 0 AND 10);",
    "PRIMARY KEY identifica a linha principal da tabela, não aceita NULL e deve ser única. UNIQUE também impede repetição, mas pode ser usado em outras colunas além da chave principal.",
    `CREATE TABLE pedidos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id bigint NOT NULL REFERENCES clientes(id)
);`,
    "ON DELETE CASCADE apaga automaticamente registros filhos quando o registro pai é removido. Exemplo adequado: itens de pedido podem ser apagados quando o pedido é excluído.",
    `CREATE TABLE matriculas (
    aluno_id bigint NOT NULL REFERENCES alunos(id),
    curso_id bigint NOT NULL REFERENCES cursos(id),
    PRIMARY KEY (aluno_id, curso_id)
);`,
    "Exemplo: ativo boolean DEFAULT true permite inserir um aluno sem informar ativo; o banco assume true automaticamente.",
  ],
  "insert-update-delete": [
    `INSERT INTO cursos (nome, carga_horaria)
VALUES
    ('Banco de Dados', 80),
    ('Algoritmos', 60),
    ('Desenvolvimento Web', 100);`,
    "INSERT INTO alunos (nome, email) VALUES ('Ana Silva', 'ana@email.com');",
    "UPDATE cursos SET carga_horaria = 90 WHERE nome = 'Banco de Dados';",
    "UPDATE alunos SET ativo = true WHERE ativo = false; O risco é alterar muitos registros de uma vez se a condição não representar exatamente o alvo esperado.",
    "DELETE FROM cursos WHERE id = 10;",
    "UPDATE cursos SET carga_horaria = 90 WHERE id = 1 RETURNING id, nome, carga_horaria;",
    "UPDATE sem WHERE pode alterar todas as linhas da tabela. Antes de executar, é recomendável testar a condição com SELECT.",
    `INSERT INTO usuarios (email, nome)
VALUES ('ana@email.com', 'Ana')
ON CONFLICT (email)
DO UPDATE SET nome = EXCLUDED.nome;`,
  ],
  "select-filtros": [
    "SELECT * FROM alunos WHERE ativo = true ORDER BY nome;",
    "SELECT * FROM produtos WHERE preco > 100;",
    "SELECT * FROM pedidos WHERE criado_em >= now() - interval '30 days';",
    "SELECT * FROM alunos WHERE nota BETWEEN 7 AND 10;",
    "SELECT * FROM alunos WHERE nome ILIKE '%silva%';",
    "SELECT * FROM clientes WHERE uf IN ('AM', 'PA', 'RO');",
    "SELECT * FROM produtos ORDER BY preco DESC LIMIT 10;",
    "WHERE email = NULL está errado porque NULL não é comparado com =. O correto é WHERE email IS NULL.",
  ],
  joins: [
    `SELECT a.nome AS aluno, c.nome AS curso
FROM alunos a
INNER JOIN matriculas m ON m.aluno_id = a.id
INNER JOIN cursos c ON c.id = m.curso_id;`,
    `SELECT c.nome, a.nome AS aluno
FROM cursos c
LEFT JOIN matriculas m ON m.curso_id = c.id
LEFT JOIN alunos a ON a.id = m.aluno_id;`,
    "INNER JOIN retorna apenas registros com correspondência nas duas tabelas. LEFT JOIN mantém todos os registros da tabela da esquerda, mesmo sem correspondência.",
    `SELECT p.id, c.nome, p.total
FROM pedidos p
INNER JOIN clientes c ON c.id = p.cliente_id;`,
    `SELECT c.*
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
WHERE p.id IS NULL;`,
    "Duplicação pode ocorrer quando uma linha da tabela principal encontra várias linhas relacionadas, ou quando a condição ON está incompleta.",
    `SELECT *
FROM matriculas m
JOIN turmas t ON t.id = m.turma_id AND t.ativa = true;`,
    "A correção é adicionar a condição ON correta. Exemplo: SELECT * FROM alunos a JOIN matriculas m ON m.aluno_id = a.id;",
  ],
  "group-by-agregacoes": [
    "SELECT curso_id, COUNT(*) FROM matriculas GROUP BY curso_id;",
    "SELECT cliente_id, SUM(total) AS total_vendido FROM pedidos GROUP BY cliente_id;",
    "SELECT turma_id, AVG(nota), MIN(nota), MAX(nota) FROM avaliacoes GROUP BY turma_id;",
    "SELECT curso_id, COUNT(*) FROM matriculas GROUP BY curso_id HAVING COUNT(*) > 20;",
    "WHERE filtra linhas antes do agrupamento. HAVING filtra grupos depois do GROUP BY.",
    `SELECT
    COUNT(*) FILTER (WHERE status = 'pago') AS pagos,
    COUNT(*) FILTER (WHERE status = 'pendente') AS pendentes
FROM pedidos;`,
    "SELECT date_trunc('month', criado_em) AS mes, COUNT(*) FROM pedidos GROUP BY mes ORDER BY mes;",
    "Porque o banco precisa saber como resumir cada coluna. Colunas não agregadas precisam definir o agrupamento.",
  ],
  "subconsultas-ctes": [
    "SELECT * FROM alunos WHERE nota > (SELECT AVG(nota) FROM alunos);",
    "SELECT * FROM alunos WHERE curso_id IN (SELECT id FROM cursos WHERE ativo = true);",
    "SELECT * FROM clientes c WHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id);",
    "SELECT * FROM cursos c WHERE NOT EXISTS (SELECT 1 FROM matriculas m WHERE m.curso_id = c.id);",
    `WITH cursos_ativos AS (
    SELECT id FROM cursos WHERE ativo = true
)
SELECT * FROM alunos WHERE curso_id IN (SELECT id FROM cursos_ativos);`,
    `WITH totais AS (
    SELECT cliente_id, SUM(total) AS total
    FROM pedidos
    GROUP BY cliente_id
)
SELECT * FROM totais WHERE total > 1000;`,
    "Uma CTE melhora a leitura quando a consulta tem etapas lógicas, cálculos intermediários ou subconsultas difíceis de entender.",
    `WITH pedidos_mes AS (
    SELECT * FROM pedidos WHERE criado_em >= date_trunc('month', now())
),
totais AS (
    SELECT cliente_id, SUM(total) AS total FROM pedidos_mes GROUP BY cliente_id
)
SELECT * FROM totais ORDER BY total DESC;`,
  ],
  "views-indices": [
    `CREATE VIEW vw_alunos_ativos AS
SELECT a.nome AS aluno, c.nome AS curso
FROM alunos a
JOIN matriculas m ON m.aluno_id = a.id
JOIN cursos c ON c.id = m.curso_id
WHERE a.ativo = true;`,
    "View comum guarda a consulta e executa quando acessada. Materialized view guarda o resultado materializado e precisa ser atualizada com REFRESH.",
    "CREATE INDEX idx_alunos_email ON alunos (email);",
    "CREATE INDEX idx_matriculas_curso_data ON matriculas (curso_id, data_matricula);",
    "Índices aceleram leituras, mas ocupam espaço e precisam ser atualizados em INSERT, UPDATE e DELETE.",
    "EXPLAIN SELECT * FROM alunos WHERE email = 'ana@email.com';",
    "EXPLAIN ANALYZE executa a consulta de verdade, por isso deve ser usado com cuidado em comandos custosos ou de escrita.",
    "CREATE INDEX idx_alunos_ativos_nome ON alunos (nome) WHERE ativo = true;",
  ],
  "transacoes-permissoes": [
    `BEGIN;
UPDATE contas SET saldo = saldo - 100 WHERE id = 1;
UPDATE contas SET saldo = saldo + 100 WHERE id = 2;
COMMIT;`,
    `BEGIN;
UPDATE contas SET saldo = saldo - 100 WHERE id = 1;
ROLLBACK;`,
    `BEGIN;
SAVEPOINT antes_do_desconto;
UPDATE produtos SET preco = preco * 0.9;
ROLLBACK TO SAVEPOINT antes_do_desconto;
COMMIT;`,
    "Transações longas podem manter bloqueios, atrasar outros usuários e dificultar manutenção do banco.",
    "CREATE ROLE analista LOGIN PASSWORD 'troque-esta-senha';",
    "GRANT SELECT ON ALL TABLES IN SCHEMA public TO analista;",
    "REVOKE INSERT ON ALL TABLES IN SCHEMA public FROM analista;",
    "Menor privilégio significa conceder somente as permissões necessárias para a função da pessoa ou sistema.",
  ],
  "backup-restauracao": [
    "pg_dump -U postgres -d escola -f escola.sql",
    "pg_dump -U postgres -d escola -Fc -f escola.backup",
    "psql -U postgres -d escola_restaurada -f escola.sql",
    "pg_restore -U postgres -d escola_restaurada escola.backup",
    "pg_dump exporta um banco específico. pg_dumpall exporta todos os bancos e objetos globais, como roles.",
    "Porque um arquivo de backup pode estar corrompido, incompleto ou incompatível. Só a restauração confirma que a recuperação funciona.",
    "Cuidados: proteger acesso ao arquivo, armazenar cópia fora do servidor principal e testar restauração periodicamente.",
    "Exemplo: backup diário incremental lógico ou dump custom semanal, retenção de 4 semanas, cópia externa e teste mensal de restauração.",
  ],
};

function createMerExercise({ number, title, question, database, entities, relationships, sql }) {
  return {
    number,
    question: `${title}: ${question}`,
    diagram: {
      entities,
      relationships,
    },
    answer: `CREATE DATABASE ${database};

\\c ${database}

${sql}`,
  };
}

function getMerFieldInfo(field) {
  const badges = [];

  if (field.includes("PK/FK")) {
    badges.push("PK", "FK");
  } else {
    if (field.includes("PK")) badges.push("PK");
    if (field.includes("FK")) badges.push("FK");
  }

  if (field.includes("UNIQUE")) {
    badges.push("UNIQUE");
  }

  return {
    name: field
      .replace("PK/FK", "")
      .replace("UNIQUE", "")
      .replace("PK", "")
      .replace("FK", "")
      .trim(),
    badges,
  };
}

function pluralCandidatesFromForeignKey(fieldName) {
  const base = fieldName.replace(/_id$/, "");
  const candidates = [base, `${base}s`, `${base}es`];

  if (base.endsWith("ao")) {
    candidates.push(`${base.slice(0, -2)}oes`);
  }

  if (base.endsWith("m")) {
    candidates.push(`${base.slice(0, -1)}ns`);
  }

  return candidates;
}

function findReferencedEntity(fieldName, entities) {
  const candidates = pluralCandidatesFromForeignKey(fieldName);

  return entities.find((entity) => candidates.includes(entity.name))?.name;
}

function inferSqlType(fieldName) {
  if (fieldName === "id" || fieldName.endsWith("_id")) return "bigint";
  if (fieldName.includes("email")) return "varchar(255)";
  if (fieldName.includes("cpf")) return "char(11)";
  if (fieldName.includes("cnpj")) return "char(14)";
  if (fieldName.includes("telefone")) return "varchar(20)";
  if (fieldName.includes("data_hora") || fieldName.includes("criado_em")) return "timestamptz";
  if (fieldName.includes("data") || ["inicio", "fim", "vencimento", "checkin", "checkout"].includes(fieldName)) return "date";
  if (["ativo", "concluida", "pago"].includes(fieldName)) return "boolean";
  if (["quantidade", "estoque", "capacidade", "vagas", "ano", "ordem"].includes(fieldName)) return "integer";
  if (["valor", "preco", "preco_unitario", "valor_unitario", "salario", "saldo", "orcamento", "diaria", "custo", "total", "peso"].includes(fieldName)) return "numeric(10,2)";
  if (fieldName.includes("descricao") || fieldName.includes("observacao")) return "text";

  return "varchar(160)";
}

function buildSqlFromMerEntities(entities) {
  return entities.map((entity) => {
    const fields = entity.fields.map(getMerFieldInfo);
    const primaryKeys = fields.filter((field) => field.badges.includes("PK")).map((field) => field.name);
    const lines = fields.map((field) => {
      if (field.name === "id" && field.badges.includes("PK") && !field.badges.includes("FK")) {
        return "    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY";
      }

      const referencedEntity = field.badges.includes("FK") ? findReferencedEntity(field.name, entities) : null;
      const unique = field.badges.includes("UNIQUE") ? " UNIQUE" : "";
      const notNull = field.badges.includes("PK") || field.badges.includes("FK") || !["telefone", "observacao"].includes(field.name) ? " NOT NULL" : "";
      const reference = referencedEntity ? ` REFERENCES ${referencedEntity}(id)` : "";
      const defaultValue = field.name === "status" ? " DEFAULT 'ativo'" : field.name === "ativo" ? " DEFAULT true" : "";

      return `    ${field.name} ${inferSqlType(field.name)}${notNull}${unique}${defaultValue}${reference}`;
    });

    if (primaryKeys.length > 1) {
      lines.push(`    PRIMARY KEY (${primaryKeys.join(", ")})`);
    }

    return `CREATE TABLE ${entity.name} (\n${lines.join(",\n")}\n);`;
  }).join("\n\n");
}

function createGeneratedMerExercise(spec) {
  const entities = [
    { name: spec.actor, fields: spec.actorFields || ["id PK", "nome", "email UNIQUE"] },
    { name: spec.catalog, fields: spec.catalogFields || ["id PK", "nome", "valor"] },
    { name: spec.event, fields: spec.eventFields || ["id PK", `${spec.actorFk} FK`, "data_registro", "status"] },
    { name: spec.detail, fields: spec.detailFields || [`${spec.eventFk} PK/FK`, `${spec.catalogFk} PK/FK`, "quantidade", "valor_unitario"] },
  ];
  const relationships = [
    { name: spec.actorRelation || "gera", from: spec.actor, to: spec.event, fromCardinality: "(0,N)", toCardinality: "(1,1)", description: `Um registro de ${spec.actor} pode estar ligado a vários registros de ${spec.event}.` },
    { name: spec.eventRelation || "possui", from: spec.event, to: spec.detail, fromCardinality: "(1,N)", toCardinality: "(1,1)", description: `Um registro de ${spec.event} possui itens em ${spec.detail}.` },
    { name: spec.catalogRelation || "compõe", from: spec.catalog, to: spec.detail, fromCardinality: "(0,N)", toCardinality: "(1,1)", description: `Um registro de ${spec.catalog} pode aparecer várias vezes em ${spec.detail}.` },
  ];

  return createMerExercise({
    number: spec.number,
    title: spec.title,
    question: spec.question,
    database: spec.database,
    entities,
    relationships,
    sql: buildSqlFromMerEntities(entities),
  });
}

function createComplexMerExercise(spec) {
  const entities = [
    ...spec.cores,
    ...spec.associations.map((association) => ({
      name: association.name,
      fields: [
        `${association.leftFk} PK/FK`,
        `${association.rightFk} PK/FK`,
        ...(association.fields || ["status", "data_registro"]),
      ],
    })),
  ];
  const relationships = spec.associations.flatMap((association) => [
    {
      name: association.leftRelation || "participa",
      from: association.left,
      to: association.name,
      fromCardinality: "(0,N)",
      toCardinality: "(1,1)",
      description: `A tabela ${association.name} materializa o relacionamento entre ${association.left} e ${association.right}.`,
    },
    {
      name: association.rightRelation || "relaciona",
      from: association.right,
      to: association.name,
      fromCardinality: "(0,N)",
      toCardinality: "(1,1)",
      description: `Cada registro de ${association.name} aponta para um registro de ${association.right}.`,
    },
  ]);

  return createMerExercise({
    number: spec.number,
    title: spec.title,
    question: spec.question,
    database: spec.database,
    entities,
    relationships,
    sql: buildSqlFromMerEntities(entities),
  });
}

const advancedMerExerciseBlocks = [
  {
    slug: "mer-intermediario-associativas",
    order: 2,
    title: "Relacionamentos N:N e tabelas de ligação",
    summary:
      "Pratique os casos em que uma relação muitos-para-muitos precisa virar uma tabela própria, como itens, inscrições, locações e registros dependentes.",
    level: "Intermediário N:N",
    exercises: [
      createMerExercise({
        number: 6,
        title: "Locadora",
        question:
          "crie o banco para clientes, filmes, locações e itens de locação. Uma locação pode conter vários filmes.",
        database: "locadora_mer",
        entities: [
          { name: "clientes", fields: ["id PK", "nome", "email UNIQUE"] },
          { name: "filmes", fields: ["id PK", "titulo", "classificacao", "ativo"] },
          { name: "locacoes", fields: ["id PK", "cliente_id FK", "data_locacao", "status"] },
          { name: "itens_locacao", fields: ["locacao_id PK/FK", "filme_id PK/FK", "valor_diaria"] },
        ],
        relationships: [
          { name: "faz", from: "clientes", to: "locacoes", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um cliente pode fazer várias locações." },
          { name: "possui", from: "locacoes", to: "itens_locacao", fromCardinality: "(1,N)", toCardinality: "(1,1)", description: "Uma locação deve possuir um ou mais itens." },
          { name: "inclui", from: "filmes", to: "itens_locacao", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um filme pode aparecer em várias locações." },
        ],
        sql: `CREATE TABLE clientes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE
);

CREATE TABLE filmes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo varchar(160) NOT NULL,
    classificacao varchar(20),
    ativo boolean NOT NULL DEFAULT true
);

CREATE TABLE locacoes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id bigint NOT NULL REFERENCES clientes(id),
    data_locacao date NOT NULL DEFAULT CURRENT_DATE,
    status varchar(30) NOT NULL DEFAULT 'aberta'
);

CREATE TABLE itens_locacao (
    locacao_id bigint NOT NULL REFERENCES locacoes(id) ON DELETE CASCADE,
    filme_id bigint NOT NULL REFERENCES filmes(id),
    valor_diaria numeric(8,2) NOT NULL CHECK (valor_diaria >= 0),
    PRIMARY KEY (locacao_id, filme_id)
);`,
      }),
      createMerExercise({
        number: 7,
        title: "Restaurante",
        question:
          "crie o banco para mesas, clientes, comandas e itens de comanda. Uma comanda pertence a uma mesa e pode ter vários itens.",
        database: "restaurante_mer",
        entities: [
          { name: "mesas", fields: ["id PK", "numero UNIQUE", "capacidade"] },
          { name: "clientes", fields: ["id PK", "nome", "telefone"] },
          { name: "comandas", fields: ["id PK", "mesa_id FK", "cliente_id FK", "status"] },
          { name: "itens_comanda", fields: ["id PK", "comanda_id FK", "descricao", "valor"] },
        ],
        relationships: [
          { name: "abre", from: "mesas", to: "comandas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma mesa pode ter várias comandas ao longo do tempo." },
          { name: "consome", from: "clientes", to: "comandas", fromCardinality: "(0,N)", toCardinality: "(0,1)", description: "Uma comanda pode estar associada a um cliente identificado." },
          { name: "possui", from: "comandas", to: "itens_comanda", fromCardinality: "(1,N)", toCardinality: "(1,1)", description: "Uma comanda possui os itens consumidos." },
        ],
        sql: `CREATE TABLE mesas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    numero integer NOT NULL UNIQUE,
    capacidade integer NOT NULL CHECK (capacidade > 0)
);

CREATE TABLE clientes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    telefone varchar(20)
);

CREATE TABLE comandas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    mesa_id bigint NOT NULL REFERENCES mesas(id),
    cliente_id bigint REFERENCES clientes(id),
    status varchar(30) NOT NULL DEFAULT 'aberta'
);

CREATE TABLE itens_comanda (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comanda_id bigint NOT NULL REFERENCES comandas(id) ON DELETE CASCADE,
    descricao varchar(160) NOT NULL,
    valor numeric(10,2) NOT NULL CHECK (valor >= 0)
);`,
      }),
      createMerExercise({
        number: 8,
        title: "Eventos",
        question:
          "crie o banco para participantes, eventos, inscrições e pagamentos. Uma inscrição liga participante e evento.",
        database: "eventos_mer",
        entities: [
          { name: "participantes", fields: ["id PK", "nome", "email UNIQUE"] },
          { name: "eventos", fields: ["id PK", "nome", "data_evento", "vagas"] },
          { name: "inscricoes", fields: ["participante_id PK/FK", "evento_id PK/FK", "status"] },
          { name: "pagamentos", fields: ["id PK", "participante_id FK", "evento_id FK", "valor"] },
        ],
        relationships: [
          { name: "realiza", from: "participantes", to: "inscricoes", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um participante pode fazer várias inscrições." },
          { name: "recebe", from: "eventos", to: "inscricoes", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um evento pode receber várias inscrições." },
          { name: "paga", from: "inscricoes", to: "pagamentos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma inscrição pode gerar pagamentos." },
        ],
        sql: `CREATE TABLE participantes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE
);

CREATE TABLE eventos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(160) NOT NULL,
    data_evento date NOT NULL,
    vagas integer NOT NULL CHECK (vagas > 0)
);

CREATE TABLE inscricoes (
    participante_id bigint NOT NULL REFERENCES participantes(id),
    evento_id bigint NOT NULL REFERENCES eventos(id),
    status varchar(30) NOT NULL DEFAULT 'inscrito',
    PRIMARY KEY (participante_id, evento_id)
);

CREATE TABLE pagamentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    participante_id bigint NOT NULL,
    evento_id bigint NOT NULL,
    valor numeric(10,2) NOT NULL CHECK (valor >= 0),
    FOREIGN KEY (participante_id, evento_id) REFERENCES inscricoes(participante_id, evento_id)
);`,
      }),
      createMerExercise({
        number: 9,
        title: "Suporte técnico",
        question:
          "crie o banco para clientes, técnicos, chamados e atendimentos. Um chamado pode ter vários atendimentos.",
        database: "suporte_mer",
        entities: [
          { name: "clientes", fields: ["id PK", "nome", "email UNIQUE"] },
          { name: "tecnicos", fields: ["id PK", "nome", "nivel"] },
          { name: "chamados", fields: ["id PK", "cliente_id FK", "titulo", "prioridade"] },
          { name: "atendimentos", fields: ["id PK", "chamado_id FK", "tecnico_id FK", "descricao"] },
        ],
        relationships: [
          { name: "abre", from: "clientes", to: "chamados", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um cliente pode abrir vários chamados." },
          { name: "registra", from: "chamados", to: "atendimentos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um chamado pode ter vários atendimentos." },
          { name: "executa", from: "tecnicos", to: "atendimentos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um técnico pode executar vários atendimentos." },
        ],
        sql: `CREATE TABLE clientes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE
);

CREATE TABLE tecnicos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    nivel varchar(30) NOT NULL
);

CREATE TABLE chamados (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id bigint NOT NULL REFERENCES clientes(id),
    titulo varchar(160) NOT NULL,
    prioridade varchar(20) NOT NULL DEFAULT 'normal'
);

CREATE TABLE atendimentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    chamado_id bigint NOT NULL REFERENCES chamados(id) ON DELETE CASCADE,
    tecnico_id bigint NOT NULL REFERENCES tecnicos(id),
    descricao text NOT NULL
);`,
      }),
      createMerExercise({
        number: 10,
        title: "Compras e estoque",
        question:
          "crie o banco para fornecedores, produtos, compras e itens de compra. Uma compra possui vários produtos.",
        database: "compras_mer",
        entities: [
          { name: "fornecedores", fields: ["id PK", "razao_social", "cnpj UNIQUE"] },
          { name: "produtos", fields: ["id PK", "nome", "estoque"] },
          { name: "compras", fields: ["id PK", "fornecedor_id FK", "data_compra", "status"] },
          { name: "itens_compra", fields: ["compra_id PK/FK", "produto_id PK/FK", "quantidade", "custo"] },
        ],
        relationships: [
          { name: "vende", from: "fornecedores", to: "compras", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um fornecedor pode aparecer em várias compras." },
          { name: "possui", from: "compras", to: "itens_compra", fromCardinality: "(1,N)", toCardinality: "(1,1)", description: "Uma compra possui um ou mais itens." },
          { name: "movimenta", from: "produtos", to: "itens_compra", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um produto pode aparecer em várias compras." },
        ],
        sql: `CREATE TABLE fornecedores (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    razao_social varchar(160) NOT NULL,
    cnpj char(14) NOT NULL UNIQUE
);

CREATE TABLE produtos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(160) NOT NULL,
    estoque integer NOT NULL DEFAULT 0 CHECK (estoque >= 0)
);

CREATE TABLE compras (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fornecedor_id bigint NOT NULL REFERENCES fornecedores(id),
    data_compra date NOT NULL DEFAULT CURRENT_DATE,
    status varchar(30) NOT NULL DEFAULT 'recebida'
);

CREATE TABLE itens_compra (
    compra_id bigint NOT NULL REFERENCES compras(id) ON DELETE CASCADE,
    produto_id bigint NOT NULL REFERENCES produtos(id),
    quantidade integer NOT NULL CHECK (quantidade > 0),
    custo numeric(10,2) NOT NULL CHECK (custo >= 0),
    PRIMARY KEY (compra_id, produto_id)
);`,
      }),
    ],
  },
  {
    slug: "mer-avancado-regras",
    order: 3,
    title: "Regras de negócio e restrições",
    summary:
      "Modele bancos com status, períodos, pagamentos, ocorrências e validações que precisam aparecer no desenho e no SQL.",
    level: "Avançado com regras",
    exercises: [
      createMerExercise({
        number: 11,
        title: "Hotel",
        question:
          "crie o banco para hóspedes, quartos, reservas e pagamentos, controlando período e status da reserva.",
        database: "hotel_mer",
        entities: [
          { name: "hospedes", fields: ["id PK", "nome", "documento UNIQUE"] },
          { name: "quartos", fields: ["id PK", "numero UNIQUE", "tipo", "diaria"] },
          { name: "reservas", fields: ["id PK", "hospede_id FK", "quarto_id FK", "checkin", "checkout"] },
          { name: "pagamentos", fields: ["id PK", "reserva_id FK", "valor", "forma"] },
        ],
        relationships: [
          { name: "faz", from: "hospedes", to: "reservas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um hóspede pode realizar várias reservas." },
          { name: "ocupa", from: "quartos", to: "reservas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um quarto pode ser reservado várias vezes em datas diferentes." },
          { name: "paga", from: "reservas", to: "pagamentos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma reserva pode ter um ou mais pagamentos." },
        ],
        sql: `CREATE TABLE hospedes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    documento varchar(30) NOT NULL UNIQUE
);

CREATE TABLE quartos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    numero varchar(10) NOT NULL UNIQUE,
    tipo varchar(40) NOT NULL,
    diaria numeric(10,2) NOT NULL CHECK (diaria > 0)
);

CREATE TABLE reservas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    hospede_id bigint NOT NULL REFERENCES hospedes(id),
    quarto_id bigint NOT NULL REFERENCES quartos(id),
    checkin date NOT NULL,
    checkout date NOT NULL,
    status varchar(30) NOT NULL DEFAULT 'reservada',
    CHECK (checkout > checkin)
);

CREATE TABLE pagamentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    reserva_id bigint NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
    valor numeric(10,2) NOT NULL CHECK (valor > 0),
    forma varchar(30) NOT NULL
);`,
      }),
      createMerExercise({
        number: 12,
        title: "Transportadora",
        question:
          "crie o banco para clientes, motoristas, entregas e ocorrências, registrando problemas durante a entrega.",
        database: "transportadora_mer",
        entities: [
          { name: "clientes", fields: ["id PK", "nome", "documento UNIQUE"] },
          { name: "motoristas", fields: ["id PK", "nome", "cnh UNIQUE"] },
          { name: "entregas", fields: ["id PK", "cliente_id FK", "motorista_id FK", "status"] },
          { name: "ocorrencias", fields: ["id PK", "entrega_id FK", "descricao", "data_ocorrencia"] },
        ],
        relationships: [
          { name: "solicita", from: "clientes", to: "entregas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um cliente pode solicitar várias entregas." },
          { name: "conduz", from: "motoristas", to: "entregas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um motorista pode conduzir várias entregas." },
          { name: "gera", from: "entregas", to: "ocorrencias", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma entrega pode gerar ocorrências." },
        ],
        sql: `CREATE TABLE clientes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    documento varchar(30) NOT NULL UNIQUE
);

CREATE TABLE motoristas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    cnh varchar(30) NOT NULL UNIQUE
);

CREATE TABLE entregas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id bigint NOT NULL REFERENCES clientes(id),
    motorista_id bigint NOT NULL REFERENCES motoristas(id),
    status varchar(30) NOT NULL DEFAULT 'em_rota'
);

CREATE TABLE ocorrencias (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    entrega_id bigint NOT NULL REFERENCES entregas(id) ON DELETE CASCADE,
    descricao text NOT NULL,
    data_ocorrencia timestamptz NOT NULL DEFAULT now()
);`,
      }),
      createMerExercise({
        number: 13,
        title: "Universidade",
        question:
          "crie o banco para alunos, disciplinas, turmas e matrículas, considerando que uma turma pertence a uma disciplina.",
        database: "universidade_mer",
        entities: [
          { name: "alunos", fields: ["id PK", "nome", "matricula UNIQUE"] },
          { name: "disciplinas", fields: ["id PK", "codigo UNIQUE", "nome"] },
          { name: "turmas", fields: ["id PK", "disciplina_id FK", "semestre", "ano"] },
          { name: "matriculas", fields: ["aluno_id PK/FK", "turma_id PK/FK", "nota_final"] },
        ],
        relationships: [
          { name: "oferta", from: "disciplinas", to: "turmas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma disciplina pode ser ofertada em várias turmas." },
          { name: "cursa", from: "alunos", to: "matriculas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um aluno pode se matricular em várias turmas." },
          { name: "recebe", from: "turmas", to: "matriculas", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Uma turma pode receber várias matrículas." },
        ],
        sql: `CREATE TABLE alunos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    matricula varchar(30) NOT NULL UNIQUE
);

CREATE TABLE disciplinas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo varchar(20) NOT NULL UNIQUE,
    nome varchar(160) NOT NULL
);

CREATE TABLE turmas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    disciplina_id bigint NOT NULL REFERENCES disciplinas(id),
    semestre integer NOT NULL CHECK (semestre IN (1, 2)),
    ano integer NOT NULL CHECK (ano >= 2000)
);

CREATE TABLE matriculas (
    aluno_id bigint NOT NULL REFERENCES alunos(id),
    turma_id bigint NOT NULL REFERENCES turmas(id),
    nota_final numeric(4,2) CHECK (nota_final BETWEEN 0 AND 10),
    PRIMARY KEY (aluno_id, turma_id)
);`,
      }),
      createMerExercise({
        number: 14,
        title: "Oficina mecânica",
        question:
          "crie o banco para clientes, veículos, ordens de serviço e serviços executados.",
        database: "oficina_mer",
        entities: [
          { name: "clientes", fields: ["id PK", "nome", "cpf UNIQUE"] },
          { name: "veiculos", fields: ["id PK", "cliente_id FK", "placa UNIQUE", "modelo"] },
          { name: "ordens_servico", fields: ["id PK", "veiculo_id FK", "data_abertura", "status"] },
          { name: "servicos_os", fields: ["id PK", "ordem_id FK", "descricao", "valor"] },
        ],
        relationships: [
          { name: "possui", from: "clientes", to: "veiculos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um cliente pode possuir vários veículos." },
          { name: "gera", from: "veiculos", to: "ordens_servico", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um veículo pode gerar várias ordens de serviço." },
          { name: "detalha", from: "ordens_servico", to: "servicos_os", fromCardinality: "(1,N)", toCardinality: "(1,1)", description: "Uma ordem deve possuir um ou mais serviços." },
        ],
        sql: `CREATE TABLE clientes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    cpf char(11) NOT NULL UNIQUE
);

CREATE TABLE veiculos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id bigint NOT NULL REFERENCES clientes(id),
    placa varchar(10) NOT NULL UNIQUE,
    modelo varchar(100) NOT NULL
);

CREATE TABLE ordens_servico (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    veiculo_id bigint NOT NULL REFERENCES veiculos(id),
    data_abertura date NOT NULL DEFAULT CURRENT_DATE,
    status varchar(30) NOT NULL DEFAULT 'aberta'
);

CREATE TABLE servicos_os (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ordem_id bigint NOT NULL REFERENCES ordens_servico(id) ON DELETE CASCADE,
    descricao varchar(180) NOT NULL,
    valor numeric(10,2) NOT NULL CHECK (valor >= 0)
);`,
      }),
      createMerExercise({
        number: 15,
        title: "Academia",
        question:
          "crie o banco para alunos, planos, contratos e pagamentos, controlando vigência do contrato.",
        database: "academia_mer",
        entities: [
          { name: "alunos", fields: ["id PK", "nome", "email UNIQUE"] },
          { name: "planos", fields: ["id PK", "nome UNIQUE", "valor_mensal"] },
          { name: "contratos", fields: ["id PK", "aluno_id FK", "plano_id FK", "inicio", "fim"] },
          { name: "pagamentos", fields: ["id PK", "contrato_id FK", "competencia", "valor"] },
        ],
        relationships: [
          { name: "assina", from: "alunos", to: "contratos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um aluno pode assinar vários contratos ao longo do tempo." },
          { name: "define", from: "planos", to: "contratos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um plano pode estar em vários contratos." },
          { name: "gera", from: "contratos", to: "pagamentos", fromCardinality: "(0,N)", toCardinality: "(1,1)", description: "Um contrato gera pagamentos mensais." },
        ],
        sql: `CREATE TABLE alunos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE
);

CREATE TABLE planos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(100) NOT NULL UNIQUE,
    valor_mensal numeric(10,2) NOT NULL CHECK (valor_mensal > 0)
);

CREATE TABLE contratos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    aluno_id bigint NOT NULL REFERENCES alunos(id),
    plano_id bigint NOT NULL REFERENCES planos(id),
    inicio date NOT NULL,
    fim date,
    CHECK (fim IS NULL OR fim >= inicio)
);

CREATE TABLE pagamentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contrato_id bigint NOT NULL REFERENCES contratos(id) ON DELETE CASCADE,
    competencia date NOT NULL,
    valor numeric(10,2) NOT NULL CHECK (valor > 0)
);`,
      }),
    ],
  },
];

advancedMerExerciseBlocks.push(...basicPostgresqlExerciseBlocks.splice(11, 2));

const merPostgresqlExerciseList = {
  slug: "modelagem-mer",
  order: 3,
  title: "Modelagem MER e criação de bancos",
  summary:
    "Pratique a leitura de diagramas MER, transforme entidades e relacionamentos em tabelas e escreva o SQL completo no PostgreSQL, começando pelo CREATE DATABASE.",
  level: "Do básico ao avançado",
  blocks: [
    {
      slug: "mer-criacao-banco",
      order: 1,
      title: "Fundamentos: do MER ao CREATE TABLE",
      summary:
        "Comece pelos cenários mais diretos: identifique entidades, chaves primárias, chaves estrangeiras e crie o banco desde o CREATE DATABASE.",
      level: "Fundamentos",
      exercises: [
        {
          number: 1,
          question:
            "Sistema escolar: construa o banco a partir do diagrama. Crie a database, conecte nela, crie as tabelas alunos, cursos e matriculas, e represente corretamente o relacionamento muitos-para-muitos entre alunos e cursos.",
          diagram: {
            entities: [
              {
                name: "alunos",
                fields: ["id PK", "nome", "email UNIQUE", "data_nascimento", "ativo"],
              },
              {
                name: "cursos",
                fields: ["id PK", "nome", "carga_horaria", "ativo"],
              },
              {
                name: "matriculas",
                fields: ["aluno_id PK/FK", "curso_id PK/FK", "data_matricula", "status"],
              },
            ],
            relationships: [
              {
                name: "realiza",
                from: "alunos",
                to: "matriculas",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um aluno pode ter varias matriculas.",
              },
              {
                name: "pertence",
                from: "cursos",
                to: "matriculas",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um curso pode receber varias matriculas.",
              },
              {
                name: "resolve N:N",
                from: "alunos",
                to: "cursos",
                fromCardinality: "(0,N)",
                toCardinality: "(0,N)",
                draw: false,
                description: "A tabela matriculas resolve o relacionamento muitos-para-muitos.",
              },
            ],
          },
          answer: `CREATE DATABASE escola_mer;

\\c escola_mer

CREATE TABLE alunos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    data_nascimento date,
    ativo boolean NOT NULL DEFAULT true
);

CREATE TABLE cursos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(160) NOT NULL,
    carga_horaria integer NOT NULL CHECK (carga_horaria > 0),
    ativo boolean NOT NULL DEFAULT true
);

CREATE TABLE matriculas (
    aluno_id bigint NOT NULL,
    curso_id bigint NOT NULL,
    data_matricula date NOT NULL DEFAULT CURRENT_DATE,
    status varchar(30) NOT NULL DEFAULT 'ativa',
    PRIMARY KEY (aluno_id, curso_id),
    CONSTRAINT fk_matriculas_alunos
        FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    CONSTRAINT fk_matriculas_cursos
        FOREIGN KEY (curso_id) REFERENCES cursos(id),
    CONSTRAINT ck_matriculas_status
        CHECK (status IN ('ativa', 'trancada', 'concluida', 'cancelada'))
);`,
        },
        {
          number: 2,
          question:
            "Sistema de vendas: construa o banco a partir do diagrama. Crie a database, conecte nela, crie clientes, produtos, pedidos e itens_pedido. Lembre que um pedido pode ter varios produtos e um produto pode aparecer em varios pedidos.",
          diagram: {
            entities: [
              {
                name: "clientes",
                fields: ["id PK", "nome", "email UNIQUE", "telefone"],
              },
              {
                name: "produtos",
                fields: ["id PK", "nome", "preco", "estoque"],
              },
              {
                name: "pedidos",
                fields: ["id PK", "cliente_id FK", "data_pedido", "status"],
              },
              {
                name: "itens_pedido",
                fields: ["pedido_id PK/FK", "produto_id PK/FK", "quantidade", "preco_unitario"],
              },
            ],
            relationships: [
              {
                name: "faz",
                from: "clientes",
                to: "pedidos",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um cliente pode fazer varios pedidos.",
              },
              {
                name: "possui",
                from: "pedidos",
                to: "itens_pedido",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um pedido possui varios itens.",
              },
              {
                name: "referencia",
                from: "produtos",
                to: "itens_pedido",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Itens do pedido ligam pedidos e produtos.",
              },
            ],
          },
          answer: `CREATE DATABASE vendas_mer;

\\c vendas_mer

CREATE TABLE clientes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    telefone varchar(20)
);

CREATE TABLE produtos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(160) NOT NULL,
    preco numeric(10,2) NOT NULL CHECK (preco >= 0),
    estoque integer NOT NULL DEFAULT 0 CHECK (estoque >= 0)
);

CREATE TABLE pedidos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id bigint NOT NULL,
    data_pedido timestamptz NOT NULL DEFAULT now(),
    status varchar(30) NOT NULL DEFAULT 'aberto',
    CONSTRAINT fk_pedidos_clientes
        FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    CONSTRAINT ck_pedidos_status
        CHECK (status IN ('aberto', 'pago', 'enviado', 'cancelado'))
);

CREATE TABLE itens_pedido (
    pedido_id bigint NOT NULL,
    produto_id bigint NOT NULL,
    quantidade integer NOT NULL CHECK (quantidade > 0),
    preco_unitario numeric(10,2) NOT NULL CHECK (preco_unitario >= 0),
    PRIMARY KEY (pedido_id, produto_id),
    CONSTRAINT fk_itens_pedido_pedidos
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    CONSTRAINT fk_itens_pedido_produtos
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
);`,
        },
        {
          number: 3,
          question:
            "Biblioteca: construa o banco a partir do diagrama. Crie a database, conecte nela, crie autores, livros, usuarios e emprestimos. Um autor pode ter varios livros, e cada emprestimo liga um usuario a um livro.",
          diagram: {
            entities: [
              {
                name: "autores",
                fields: ["id PK", "nome", "nacionalidade"],
              },
              {
                name: "livros",
                fields: ["id PK", "autor_id FK", "titulo", "ano_publicacao", "isbn UNIQUE"],
              },
              {
                name: "usuarios",
                fields: ["id PK", "nome", "email UNIQUE", "ativo"],
              },
              {
                name: "emprestimos",
                fields: ["id PK", "usuario_id FK", "livro_id FK", "data_emprestimo", "data_devolucao"],
              },
            ],
            relationships: [
              {
                name: "escreve",
                from: "autores",
                to: "livros",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um autor pode escrever varios livros.",
              },
              {
                name: "realiza",
                from: "usuarios",
                to: "emprestimos",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um usuario pode realizar varios emprestimos.",
              },
              {
                name: "registra",
                from: "livros",
                to: "emprestimos",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um livro pode aparecer em varios emprestimos ao longo do tempo.",
              },
            ],
          },
          answer: `CREATE DATABASE biblioteca_mer;

\\c biblioteca_mer

CREATE TABLE autores (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    nacionalidade varchar(80)
);

CREATE TABLE livros (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    autor_id bigint NOT NULL,
    titulo varchar(180) NOT NULL,
    ano_publicacao integer CHECK (ano_publicacao >= 0),
    isbn varchar(20) UNIQUE,
    CONSTRAINT fk_livros_autores
        FOREIGN KEY (autor_id) REFERENCES autores(id)
);

CREATE TABLE usuarios (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    ativo boolean NOT NULL DEFAULT true
);

CREATE TABLE emprestimos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id bigint NOT NULL,
    livro_id bigint NOT NULL,
    data_emprestimo date NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao date,
    CONSTRAINT fk_emprestimos_usuarios
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_emprestimos_livros
        FOREIGN KEY (livro_id) REFERENCES livros(id),
    CONSTRAINT ck_devolucao_depois_emprestimo
        CHECK (data_devolucao IS NULL OR data_devolucao >= data_emprestimo)
);`,
        },
        {
          number: 4,
          question:
            "Clínica médica: construa o banco a partir do diagrama. Crie a database, conecte nela, crie pacientes, medicos, especialidades e consultas. Um medico pertence a uma especialidade e uma consulta liga paciente e medico.",
          diagram: {
            entities: [
              {
                name: "especialidades",
                fields: ["id PK", "nome UNIQUE"],
              },
              {
                name: "medicos",
                fields: ["id PK", "especialidade_id FK", "nome", "crm UNIQUE"],
              },
              {
                name: "pacientes",
                fields: ["id PK", "nome", "cpf UNIQUE", "data_nascimento"],
              },
              {
                name: "consultas",
                fields: ["id PK", "paciente_id FK", "medico_id FK", "data_hora", "status"],
              },
            ],
            relationships: [
              {
                name: "agrupa",
                from: "especialidades",
                to: "medicos",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Uma especialidade pode ter varios medicos.",
              },
              {
                name: "agenda",
                from: "pacientes",
                to: "consultas",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um paciente pode ter varias consultas.",
              },
              {
                name: "atende",
                from: "medicos",
                to: "consultas",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um medico pode atender varias consultas.",
              },
            ],
          },
          answer: `CREATE DATABASE clinica_mer;

\\c clinica_mer

CREATE TABLE especialidades (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL UNIQUE
);

CREATE TABLE medicos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    especialidade_id bigint NOT NULL,
    nome varchar(120) NOT NULL,
    crm varchar(30) NOT NULL UNIQUE,
    CONSTRAINT fk_medicos_especialidades
        FOREIGN KEY (especialidade_id) REFERENCES especialidades(id)
);

CREATE TABLE pacientes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL,
    cpf char(11) NOT NULL UNIQUE,
    data_nascimento date
);

CREATE TABLE consultas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    paciente_id bigint NOT NULL,
    medico_id bigint NOT NULL,
    data_hora timestamptz NOT NULL,
    status varchar(30) NOT NULL DEFAULT 'agendada',
    CONSTRAINT fk_consultas_pacientes
        FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    CONSTRAINT fk_consultas_medicos
        FOREIGN KEY (medico_id) REFERENCES medicos(id),
    CONSTRAINT ck_consultas_status
        CHECK (status IN ('agendada', 'realizada', 'cancelada'))
);`,
        },
        {
          number: 5,
          question:
            "Controle de projetos: construa o banco a partir do diagrama. Crie a database, conecte nela, crie departamentos, funcionarios, projetos e alocacoes. A tabela alocacoes deve representar quais funcionarios participam de quais projetos.",
          diagram: {
            entities: [
              {
                name: "departamentos",
                fields: ["id PK", "nome UNIQUE", "sigla UNIQUE"],
              },
              {
                name: "funcionarios",
                fields: ["id PK", "departamento_id FK", "nome", "email UNIQUE", "salario"],
              },
              {
                name: "projetos",
                fields: ["id PK", "nome", "orcamento", "data_inicio"],
              },
              {
                name: "alocacoes",
                fields: ["funcionario_id PK/FK", "projeto_id PK/FK", "papel", "horas_semanais"],
              },
            ],
            relationships: [
              {
                name: "possui",
                from: "departamentos",
                to: "funcionarios",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um departamento possui varios funcionarios.",
              },
              {
                name: "participa",
                from: "funcionarios",
                to: "alocacoes",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um funcionario pode participar de varios projetos.",
              },
              {
                name: "recebe",
                from: "projetos",
                to: "alocacoes",
                fromCardinality: "(0,N)",
                toCardinality: "(1,1)",
                description: "Um projeto pode ter varios funcionarios alocados.",
              },
            ],
          },
          answer: `CREATE DATABASE projetos_mer;

\\c projetos_mer

CREATE TABLE departamentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(120) NOT NULL UNIQUE,
    sigla varchar(10) NOT NULL UNIQUE
);

CREATE TABLE funcionarios (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    departamento_id bigint NOT NULL,
    nome varchar(120) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    salario numeric(10,2) NOT NULL CHECK (salario >= 0),
    CONSTRAINT fk_funcionarios_departamentos
        FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);

CREATE TABLE projetos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(160) NOT NULL,
    orcamento numeric(12,2) NOT NULL DEFAULT 0 CHECK (orcamento >= 0),
    data_inicio date NOT NULL
);

CREATE TABLE alocacoes (
    funcionario_id bigint NOT NULL,
    projeto_id bigint NOT NULL,
    papel varchar(80) NOT NULL,
    horas_semanais integer NOT NULL CHECK (horas_semanais BETWEEN 1 AND 44),
    PRIMARY KEY (funcionario_id, projeto_id),
    CONSTRAINT fk_alocacoes_funcionarios
        FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id),
    CONSTRAINT fk_alocacoes_projetos
        FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
);`,
        },
      ],
    },
    ...advancedMerExerciseBlocks,
  ],
};

const extraMerScenariosByBlock = {
  "mer-criacao-banco": [
    { number: 26, title: "Pet shop", database: "petshop_mer", actor: "tutores", actorFk: "tutor_id", catalog: "servicos", catalogFk: "servico_id", event: "atendimentos", eventFk: "atendimento_id", detail: "itens_atendimento", question: "crie o banco para tutores, serviços, atendimentos e itens de atendimento." },
    { number: 27, title: "Salão de beleza", database: "salao_mer", actor: "clientes", actorFk: "cliente_id", catalog: "procedimentos", catalogFk: "procedimento_id", event: "agendamentos", eventFk: "agendamento_id", detail: "itens_agendamento", question: "crie o banco para clientes, procedimentos, agendamentos e itens de agendamento." },
    { number: 28, title: "Papelaria", database: "papelaria_mer", actor: "clientes", actorFk: "cliente_id", catalog: "produtos", catalogFk: "produto_id", event: "vendas", eventFk: "venda_id", detail: "itens_venda", question: "crie o banco para clientes, produtos, vendas e itens de venda." },
    { number: 29, title: "Curso presencial", database: "curso_presencial_mer", actor: "alunos", actorFk: "aluno_id", catalog: "modulos", catalogFk: "modulo_id", event: "inscricoes", eventFk: "inscricao_id", detail: "itens_inscricao", question: "crie o banco para alunos, módulos, inscrições e itens de inscrição." },
    { number: 30, title: "Clube esportivo", database: "clube_mer", actor: "socios", actorFk: "socio_id", catalog: "modalidades", catalogFk: "modalidade_id", event: "matriculas", eventFk: "matricula_id", detail: "itens_matricula", question: "crie o banco para sócios, modalidades, matrículas e itens de matrícula." },
    { number: 31, title: "Farmácia", database: "farmacia_mer", actor: "clientes", actorFk: "cliente_id", catalog: "medicamentos", catalogFk: "medicamento_id", event: "vendas", eventFk: "venda_id", detail: "itens_venda", question: "crie o banco para clientes, medicamentos, vendas e itens de venda." },
    { number: 32, title: "Cinema", database: "cinema_mer", actor: "clientes", actorFk: "cliente_id", catalog: "sessoes", catalogFk: "sessao_id", event: "compras", eventFk: "compra_id", detail: "ingressos", question: "crie o banco para clientes, sessões, compras e ingressos." },
    { number: 33, title: "Estacionamento", database: "estacionamento_mer", actor: "clientes", actorFk: "cliente_id", catalog: "vagas", catalogFk: "vaga_id", event: "estadias", eventFk: "estadia_id", detail: "itens_estadia", question: "crie o banco para clientes, vagas, estadias e itens de estadia." },
    { number: 34, title: "Lavanderia", database: "lavanderia_mer", actor: "clientes", actorFk: "cliente_id", catalog: "servicos", catalogFk: "servico_id", event: "ordens", eventFk: "ordem_id", detail: "itens_ordem", question: "crie o banco para clientes, serviços, ordens e itens de ordem." },
    { number: 35, title: "Floricultura", database: "floricultura_mer", actor: "clientes", actorFk: "cliente_id", catalog: "arranjos", catalogFk: "arranjo_id", event: "encomendas", eventFk: "encomenda_id", detail: "itens_encomenda", question: "crie o banco para clientes, arranjos, encomendas e itens de encomenda." },
  ],
  "mer-intermediario-associativas": [
    { number: 36, title: "Distribuidora", database: "distribuidora_mer", actor: "fornecedores", actorFk: "fornecedor_id", catalog: "produtos", catalogFk: "produto_id", event: "remessas", eventFk: "remessa_id", detail: "itens_remessa", question: "crie o banco para fornecedores, produtos, remessas e itens de remessa." },
    { number: 37, title: "Agência de turismo", database: "turismo_mer", actor: "clientes", actorFk: "cliente_id", catalog: "pacotes", catalogFk: "pacote_id", event: "reservas", eventFk: "reserva_id", detail: "itens_reserva", question: "crie o banco para clientes, pacotes, reservas e itens de reserva." },
    { number: 38, title: "Editora", database: "editora_mer", actor: "autores", actorFk: "autor_id", catalog: "obras", catalogFk: "obra_id", event: "contratos", eventFk: "contrato_id", detail: "itens_contrato", question: "crie o banco para autores, obras, contratos e itens de contrato." },
    { number: 39, title: "Conferência", database: "conferencia_mer", actor: "palestrantes", actorFk: "palestrante_id", catalog: "trilhas", catalogFk: "trilha_id", event: "palestras", eventFk: "palestra_id", detail: "itens_palestra", question: "crie o banco para palestrantes, trilhas, palestras e itens de palestra." },
    { number: 40, title: "Laboratório", database: "laboratorio_mer", actor: "pacientes", actorFk: "paciente_id", catalog: "exames", catalogFk: "exame_id", event: "coletas", eventFk: "coleta_id", detail: "itens_coleta", question: "crie o banco para pacientes, exames, coletas e itens de coleta." },
    { number: 41, title: "Marcenaria", database: "marcenaria_mer", actor: "clientes", actorFk: "cliente_id", catalog: "materiais", catalogFk: "material_id", event: "projetos", eventFk: "projeto_id", detail: "itens_projeto", question: "crie o banco para clientes, materiais, projetos e itens de projeto." },
    { number: 42, title: "Gráfica", database: "grafica_mer", actor: "clientes", actorFk: "cliente_id", catalog: "produtos", catalogFk: "produto_id", event: "pedidos", eventFk: "pedido_id", detail: "itens_pedido", question: "crie o banco para clientes, produtos gráficos, pedidos e itens de pedido." },
    { number: 43, title: "Manutenção predial", database: "manutencao_predial_mer", actor: "condominios", actorFk: "condominio_id", catalog: "servicos", catalogFk: "servico_id", event: "ordens", eventFk: "ordem_id", detail: "itens_ordem", question: "crie o banco para condomínios, serviços, ordens e itens de ordem." },
    { number: 44, title: "Loja de games", database: "games_mer", actor: "clientes", actorFk: "cliente_id", catalog: "jogos", catalogFk: "jogo_id", event: "compras", eventFk: "compra_id", detail: "itens_compra", question: "crie o banco para clientes, jogos, compras e itens de compra." },
    { number: 45, title: "Materiais escolares", database: "materiais_escolares_mer", actor: "escolas", actorFk: "escola_id", catalog: "materiais", catalogFk: "material_id", event: "solicitacoes", eventFk: "solicitacao_id", detail: "itens_solicitacao", question: "crie o banco para escolas, materiais, solicitações e itens de solicitação." },
  ],
  "mer-avancado-regras": [
    { number: 46, title: "Plano de saúde", database: "plano_saude_mer", actor: "beneficiarios", actorFk: "beneficiario_id", catalog: "procedimentos", catalogFk: "procedimento_id", event: "guias", eventFk: "guia_id", detail: "itens_guia", question: "crie o banco para beneficiários, procedimentos, guias e itens de guia." },
    { number: 47, title: "Seguradora", database: "seguradora_mer", actor: "segurados", actorFk: "segurado_id", catalog: "coberturas", catalogFk: "cobertura_id", event: "apolices", eventFk: "apolice_id", detail: "itens_apolice", question: "crie o banco para segurados, coberturas, apólices e itens de apólice." },
    { number: 48, title: "Banco digital", database: "banco_digital_mer", actor: "clientes", actorFk: "cliente_id", catalog: "tarifas", catalogFk: "tarifa_id", event: "contas", eventFk: "conta_id", detail: "lancamentos", question: "crie o banco para clientes, tarifas, contas e lançamentos." },
    { number: 49, title: "Assinaturas", database: "assinaturas_mer", actor: "assinantes", actorFk: "assinante_id", catalog: "planos", catalogFk: "plano_id", event: "assinaturas", eventFk: "assinatura_id", detail: "cobrancas", question: "crie o banco para assinantes, planos, assinaturas e cobranças." },
    { number: 50, title: "Controle de frota", database: "frota_mer", actor: "motoristas", actorFk: "motorista_id", catalog: "veiculos", catalogFk: "veiculo_id", event: "viagens", eventFk: "viagem_id", detail: "abastecimentos", question: "crie o banco para motoristas, veículos, viagens e abastecimentos." },
    { number: 51, title: "SAC", database: "sac_mer", actor: "clientes", actorFk: "cliente_id", catalog: "categorias", catalogFk: "categoria_id", event: "protocolos", eventFk: "protocolo_id", detail: "interacoes", question: "crie o banco para clientes, categorias, protocolos e interações." },
    { number: 52, title: "Controle de bolsas", database: "bolsas_mer", actor: "alunos", actorFk: "aluno_id", catalog: "programas", catalogFk: "programa_id", event: "concessoes", eventFk: "concessao_id", detail: "parcelas", question: "crie o banco para alunos, programas, concessões e parcelas." },
    { number: 53, title: "Licitações", database: "licitacoes_mer", actor: "fornecedores", actorFk: "fornecedor_id", catalog: "lotes", catalogFk: "lote_id", event: "propostas", eventFk: "proposta_id", detail: "itens_proposta", question: "crie o banco para fornecedores, lotes, propostas e itens de proposta." },
    { number: 54, title: "Prontuário eletrônico", database: "prontuario_mer", actor: "pacientes", actorFk: "paciente_id", catalog: "documentos", catalogFk: "documento_id", event: "atendimentos", eventFk: "atendimento_id", detail: "anexos", question: "crie o banco para pacientes, documentos, atendimentos e anexos." },
    { number: 55, title: "Benefícios corporativos", database: "beneficios_mer", actor: "funcionarios", actorFk: "funcionario_id", catalog: "beneficios", catalogFk: "beneficio_id", event: "adesoes", eventFk: "adesao_id", detail: "descontos", question: "crie o banco para funcionários, benefícios, adesões e descontos." },
  ],
  "mer-avancado-historico-composicao": [
    { number: 56, title: "Controle de versões", database: "versoes_mer", actor: "usuarios", actorFk: "usuario_id", catalog: "documentos", catalogFk: "documento_id", event: "revisoes", eventFk: "revisao_id", detail: "alteracoes", question: "crie o banco para usuários, documentos, revisões e alterações." },
    { number: 57, title: "Rastreamento de encomendas", database: "rastreamento_mer", actor: "clientes", actorFk: "cliente_id", catalog: "rotas", catalogFk: "rota_id", event: "encomendas", eventFk: "encomenda_id", detail: "eventos_rastreamento", question: "crie o banco para clientes, rotas, encomendas e eventos de rastreamento." },
    { number: 58, title: "Auditoria de sistemas", database: "auditoria_mer", actor: "usuarios", actorFk: "usuario_id", catalog: "modulos", catalogFk: "modulo_id", event: "sessoes", eventFk: "sessao_id", detail: "logs", question: "crie o banco para usuários, módulos, sessões e logs." },
    { number: 59, title: "Linha de montagem", database: "linha_montagem_mer", actor: "operadores", actorFk: "operador_id", catalog: "pecas", catalogFk: "peca_id", event: "ordens", eventFk: "ordem_id", detail: "consumos", question: "crie o banco para operadores, peças, ordens e consumos." },
    { number: 60, title: "Controle patrimonial", database: "patrimonio_mer", actor: "responsaveis", actorFk: "responsavel_id", catalog: "bens", catalogFk: "bem_id", event: "termos", eventFk: "termo_id", detail: "itens_termo", question: "crie o banco para responsáveis, bens, termos e itens de termo." },
    { number: 61, title: "Controle agrícola", database: "agricola_mer", actor: "produtores", actorFk: "produtor_id", catalog: "insumos", catalogFk: "insumo_id", event: "plantios", eventFk: "plantio_id", detail: "aplicacoes", question: "crie o banco para produtores, insumos, plantios e aplicações." },
    { number: 62, title: "Obras de engenharia", database: "obras_mer", actor: "engenheiros", actorFk: "engenheiro_id", catalog: "materiais", catalogFk: "material_id", event: "obras", eventFk: "obra_id", detail: "medicoes", question: "crie o banco para engenheiros, materiais, obras e medições." },
    { number: 63, title: "Pesquisa científica", database: "pesquisa_mer", actor: "pesquisadores", actorFk: "pesquisador_id", catalog: "amostras", catalogFk: "amostra_id", event: "experimentos", eventFk: "experimento_id", detail: "resultados", question: "crie o banco para pesquisadores, amostras, experimentos e resultados." },
    { number: 64, title: "Controle editorial", database: "editorial_mer", actor: "editores", actorFk: "editor_id", catalog: "artigos", catalogFk: "artigo_id", event: "edicoes", eventFk: "edicao_id", detail: "revisoes", question: "crie o banco para editores, artigos, edições e revisões." },
    { number: 65, title: "Chamados internos", database: "chamados_internos_mer", actor: "colaboradores", actorFk: "colaborador_id", catalog: "servicos", catalogFk: "servico_id", event: "chamados", eventFk: "chamado_id", detail: "atividades", question: "crie o banco para colaboradores, serviços, chamados e atividades." },
  ],
  "mer-desafios-modelagem": [
    { number: 66, title: "E-commerce com cupons", database: "ecommerce_cupons_mer", actor: "clientes", actorFk: "cliente_id", catalog: "cupons", catalogFk: "cupom_id", event: "pedidos", eventFk: "pedido_id", detail: "descontos", question: "crie o banco para clientes, cupons, pedidos e descontos aplicados." },
    { number: 67, title: "Hospital com leitos", database: "hospital_leitos_mer", actor: "pacientes", actorFk: "paciente_id", catalog: "leitos", catalogFk: "leito_id", event: "internacoes", eventFk: "internacao_id", detail: "movimentacoes", question: "crie o banco para pacientes, leitos, internações e movimentações." },
    { number: 68, title: "Gestão de contratos", database: "gestao_contratos_mer", actor: "clientes", actorFk: "cliente_id", catalog: "servicos", catalogFk: "servico_id", event: "contratos", eventFk: "contrato_id", detail: "parcelas", question: "crie o banco para clientes, serviços, contratos e parcelas." },
    { number: 69, title: "Marketplace de aulas", database: "marketplace_aulas_mer", actor: "instrutores", actorFk: "instrutor_id", catalog: "aulas", catalogFk: "aula_id", event: "turmas", eventFk: "turma_id", detail: "inscricoes", question: "crie o banco para instrutores, aulas, turmas e inscrições." },
    { number: 70, title: "Oficina com peças", database: "oficina_pecas_mer", actor: "mecanicos", actorFk: "mecanico_id", catalog: "pecas", catalogFk: "peca_id", event: "ordens", eventFk: "ordem_id", detail: "itens_ordem", question: "crie o banco para mecânicos, peças, ordens e itens de ordem." },
    { number: 71, title: "Processos jurídicos", database: "processos_juridicos_mer", actor: "clientes", actorFk: "cliente_id", catalog: "tipos_acao", catalogFk: "tipos_acao_id", event: "processos", eventFk: "processo_id", detail: "andamentos", question: "crie o banco para clientes, tipos de ação, processos e andamentos." },
    { number: 72, title: "Ensaios laboratoriais", database: "ensaios_mer", actor: "solicitantes", actorFk: "solicitante_id", catalog: "metodos", catalogFk: "metodo_id", event: "ensaios", eventFk: "ensaio_id", detail: "leituras", question: "crie o banco para solicitantes, métodos, ensaios e leituras." },
    { number: 73, title: "Eventos com lotes", database: "eventos_lotes_mer", actor: "organizadores", actorFk: "organizador_id", catalog: "lotes", catalogFk: "lote_id", event: "eventos", eventFk: "evento_id", detail: "vendas", question: "crie o banco para organizadores, lotes, eventos e vendas." },
    { number: 74, title: "Projetos com riscos", database: "projetos_riscos_mer", actor: "gerentes", actorFk: "gerente_id", catalog: "riscos", catalogFk: "risco_id", event: "projetos", eventFk: "projeto_id", detail: "planos_mitigacao", question: "crie o banco para gerentes, riscos, projetos e planos de mitigação." },
    { number: 75, title: "Sistema de metas", database: "metas_mer", actor: "equipes", actorFk: "equipe_id", catalog: "indicadores", catalogFk: "indicador_id", event: "metas", eventFk: "meta_id", detail: "resultados", question: "crie o banco para equipes, indicadores, metas e resultados." },
  ],
};

merPostgresqlExerciseList.blocks.forEach((block) => {
  const scenarios = extraMerScenariosByBlock[block.slug] || [];
  block.exercises.push(...scenarios.map(createGeneratedMerExercise));
});

const newMerExerciseBlocks = [
  {
    slug: "mer-sistemas-corporativos",
    order: 6,
    title: "Sistemas corporativos e processos internos",
    summary:
      "Modele processos de empresa, como recrutamento, compras, auditorias, service desk, contratos e controles internos.",
    level: "Contexto corporativo",
    exercises: [
      { number: 76, title: "Recrutamento", database: "recrutamento_mer", actor: "candidatos", actorFk: "candidato_id", catalog: "vagas", catalogFk: "vaga_id", event: "processos", eventFk: "processo_id", detail: "etapas_processo", question: "crie o banco para candidatos, vagas, processos seletivos e etapas do processo." },
      { number: 77, title: "Treinamento empresarial", database: "treinamento_empresarial_mer", actor: "funcionarios", actorFk: "funcionario_id", catalog: "cursos", catalogFk: "curso_id", event: "turmas", eventFk: "turma_id", detail: "presencas", question: "crie o banco para funcionários, cursos, turmas e presenças." },
      { number: 78, title: "Controle de equipamentos", database: "equipamentos_mer", actor: "setores", actorFk: "setor_id", catalog: "equipamentos", catalogFk: "equipamento_id", event: "emprestimos", eventFk: "emprestimo_id", detail: "itens_emprestimo", question: "crie o banco para setores, equipamentos, empréstimos e itens de empréstimo." },
      { number: 79, title: "Central de documentos", database: "documentos_corporativos_mer", actor: "departamentos", actorFk: "departamento_id", catalog: "documentos", catalogFk: "documento_id", event: "protocolos", eventFk: "protocolo_id", detail: "movimentacoes", question: "crie o banco para departamentos, documentos, protocolos e movimentações." },
      { number: 80, title: "Controle de viagens", database: "viagens_corporativas_mer", actor: "colaboradores", actorFk: "colaborador_id", catalog: "destinos", catalogFk: "destino_id", event: "viagens", eventFk: "viagem_id", detail: "despesas", question: "crie o banco para colaboradores, destinos, viagens e despesas." },
      { number: 81, title: "Gestão de reuniões", database: "reunioes_mer", actor: "equipes", actorFk: "equipe_id", catalog: "salas", catalogFk: "sala_id", event: "reunioes", eventFk: "reuniao_id", detail: "participantes", question: "crie o banco para equipes, salas, reuniões e participantes." },
      { number: 82, title: "Inventário de TI", database: "inventario_ti_mer", actor: "usuarios", actorFk: "usuario_id", catalog: "ativos", catalogFk: "ativo_id", event: "atribuicoes", eventFk: "atribuicao_id", detail: "historicos", question: "crie o banco para usuários, ativos de TI, atribuições e históricos." },
      { number: 83, title: "Service desk", database: "service_desk_mer", actor: "solicitantes", actorFk: "solicitante_id", catalog: "categorias", catalogFk: "categoria_id", event: "tickets", eventFk: "ticket_id", detail: "comentarios", question: "crie o banco para solicitantes, categorias, tickets e comentários." },
      { number: 84, title: "Compras internas", database: "compras_internas_mer", actor: "requisitantes", actorFk: "requisitante_id", catalog: "centros_custo", catalogFk: "centro_custo_id", event: "requisicoes", eventFk: "requisicao_id", detail: "itens_requisicao", question: "crie o banco para requisitantes, centros de custo, requisições e itens." },
      { number: 85, title: "Planejamento orçamentário", database: "orcamento_mer", actor: "areas", actorFk: "area_id", catalog: "rubricas", catalogFk: "rubrica_id", event: "orcamentos", eventFk: "orcamento_id", detail: "itens_orcamento", question: "crie o banco para áreas, rubricas, orçamentos e itens de orçamento." },
      { number: 86, title: "Gestão de metas comerciais", database: "metas_comerciais_mer", actor: "vendedores", actorFk: "vendedor_id", catalog: "produtos", catalogFk: "produto_id", event: "campanhas", eventFk: "campanha_id", detail: "metas_vendedor", question: "crie o banco para vendedores, produtos, campanhas e metas por vendedor." },
      { number: 87, title: "Controle de auditorias", database: "auditorias_corporativas_mer", actor: "auditores", actorFk: "auditor_id", catalog: "processos", catalogFk: "processo_id", event: "auditorias", eventFk: "auditoria_id", detail: "nao_conformidades", question: "crie o banco para auditores, processos, auditorias e não conformidades." },
      { number: 88, title: "Gestão de fornecedores", database: "gestao_fornecedores_mer", actor: "fornecedores", actorFk: "fornecedor_id", catalog: "criterios", catalogFk: "criterio_id", event: "avaliacoes", eventFk: "avaliacao_id", detail: "notas_criterio", question: "crie o banco para fornecedores, critérios, avaliações e notas por critério." },
      { number: 89, title: "Portfólio de projetos", database: "portfolio_projetos_mer", actor: "patrocinadores", actorFk: "patrocinador_id", catalog: "programas", catalogFk: "programa_id", event: "projetos", eventFk: "projeto_id", detail: "marcos", question: "crie o banco para patrocinadores, programas, projetos e marcos." },
      { number: 90, title: "Controle de contratos SLA", database: "sla_mer", actor: "clientes", actorFk: "cliente_id", catalog: "servicos", catalogFk: "servico_id", event: "contratos_sla", eventFk: "contrato_sla_id", detail: "indicadores_sla", question: "crie o banco para clientes, serviços, contratos SLA e indicadores." },
    ].map(createGeneratedMerExercise),
  },
  {
    slug: "mer-sistemas-especialistas",
    order: 7,
    title: "Sistemas especialistas e domínios técnicos",
    summary:
      "Avance para domínios mais específicos, como saúde, laboratório, museu, energia, telemedicina e controle operacional.",
    level: "Domínio especialista",
    exercises: [
      { number: 91, title: "Clínica veterinária", database: "clinica_veterinaria_mer", actor: "tutores", actorFk: "tutor_id", catalog: "procedimentos", catalogFk: "procedimento_id", event: "consultas", eventFk: "consulta_id", detail: "itens_consulta", question: "crie o banco para tutores, procedimentos, consultas e itens de consulta." },
      { number: 92, title: "Controle de vacinas", database: "vacinas_mer", actor: "pacientes", actorFk: "paciente_id", catalog: "vacinas", catalogFk: "vacina_id", event: "carteiras", eventFk: "carteira_id", detail: "doses", question: "crie o banco para pacientes, vacinas, carteiras e doses aplicadas." },
      { number: 93, title: "Nutrição clínica", database: "nutricao_mer", actor: "pacientes", actorFk: "paciente_id", catalog: "alimentos", catalogFk: "alimento_id", event: "planos_alimentares", eventFk: "plano_alimentar_id", detail: "itens_plano", question: "crie o banco para pacientes, alimentos, planos alimentares e itens do plano." },
      { number: 94, title: "Laboratório de pesquisa", database: "laboratorio_pesquisa_mer", actor: "pesquisadores", actorFk: "pesquisador_id", catalog: "equipamentos", catalogFk: "equipamento_id", event: "experimentos", eventFk: "experimento_id", detail: "uso_equipamentos", question: "crie o banco para pesquisadores, equipamentos, experimentos e uso de equipamentos." },
      { number: 95, title: "Museu", database: "museu_mer", actor: "curadores", actorFk: "curador_id", catalog: "obras", catalogFk: "obra_id", event: "exposicoes", eventFk: "exposicao_id", detail: "itens_exposicao", question: "crie o banco para curadores, obras, exposições e itens de exposição." },
      { number: 96, title: "Arquivo histórico", database: "arquivo_historico_mer", actor: "pesquisadores", actorFk: "pesquisador_id", catalog: "documentos", catalogFk: "documento_id", event: "consultas", eventFk: "consulta_id", detail: "itens_consulta", question: "crie o banco para pesquisadores, documentos, consultas e itens consultados." },
      { number: 97, title: "Observatório ambiental", database: "observatorio_ambiental_mer", actor: "estacoes", actorFk: "estacao_id", catalog: "sensores", catalogFk: "sensor_id", event: "campanhas", eventFk: "campanha_id", detail: "leituras", question: "crie o banco para estações, sensores, campanhas e leituras." },
      { number: 98, title: "Gestão de resíduos", database: "residuos_mer", actor: "geradores", actorFk: "gerador_id", catalog: "tipos_residuo", catalogFk: "tipo_residuo_id", event: "coletas", eventFk: "coleta_id", detail: "itens_coleta", question: "crie o banco para geradores, tipos de resíduo, coletas e itens de coleta." },
      { number: 99, title: "Energia solar", database: "energia_solar_mer", actor: "clientes", actorFk: "cliente_id", catalog: "inversores", catalogFk: "inversor_id", event: "usinas", eventFk: "usina_id", detail: "medicoes", question: "crie o banco para clientes, inversores, usinas e medições." },
      { number: 100, title: "Telemedicina", database: "telemedicina_mer", actor: "pacientes", actorFk: "paciente_id", catalog: "especialidades", catalogFk: "especialidade_id", event: "teleconsultas", eventFk: "teleconsulta_id", detail: "prescricoes", question: "crie o banco para pacientes, especialidades, teleconsultas e prescrições." },
      { number: 101, title: "Biblioteca digital", database: "biblioteca_digital_mer", actor: "usuarios", actorFk: "usuario_id", catalog: "ebooks", catalogFk: "ebook_id", event: "emprestimos_digitais", eventFk: "emprestimo_digital_id", detail: "historico_leitura", question: "crie o banco para usuários, ebooks, empréstimos digitais e histórico de leitura." },
      { number: 102, title: "Podcast", database: "podcast_mer", actor: "produtores", actorFk: "produtor_id", catalog: "episodios", catalogFk: "episodio_id", event: "temporadas", eventFk: "temporada_id", detail: "publicacoes", question: "crie o banco para produtores, episódios, temporadas e publicações." },
      { number: 103, title: "Streaming de vídeo", database: "streaming_mer", actor: "assinantes", actorFk: "assinante_id", catalog: "conteudos", catalogFk: "conteudo_id", event: "listas", eventFk: "lista_id", detail: "itens_lista", question: "crie o banco para assinantes, conteúdos, listas e itens de lista." },
      { number: 104, title: "Controle de drones", database: "drones_mer", actor: "pilotos", actorFk: "piloto_id", catalog: "drones", catalogFk: "drone_id", event: "missoes", eventFk: "missao_id", detail: "registros_voo", question: "crie o banco para pilotos, drones, missões e registros de voo." },
      { number: 105, title: "Laboratório forense", database: "forense_mer", actor: "peritos", actorFk: "perito_id", catalog: "evidencias", catalogFk: "evidencia_id", event: "laudos", eventFk: "laudo_id", detail: "analises", question: "crie o banco para peritos, evidências, laudos e análises." },
    ].map(createGeneratedMerExercise),
  },
];

merPostgresqlExerciseList.blocks.push(...newMerExerciseBlocks);

const complexMerExerciseBlock = {
  slug: "mer-mega-desafios",
  order: 8,
  title: "Arquitetura MER com 10 entidades",
  summary:
    "Enfrente modelos maiores: cada exercício tem 10 entidades e pelo menos 5 relacionamentos N:N que precisam virar tabelas associativas.",
  level: "Projeto completo",
  exercises: [
    {
      number: 106,
      title: "Hospital universitário",
      database: "hospital_universitario_mer",
      question: "crie um banco hospitalar com pacientes, médicos, especialidades, exames, medicamentos e cinco tabelas associativas.",
      cores: [
        { name: "pacientes", fields: ["id PK", "nome", "cpf UNIQUE"] },
        { name: "medicos", fields: ["id PK", "nome", "crm UNIQUE"] },
        { name: "especialidades", fields: ["id PK", "nome UNIQUE", "ativo"] },
        { name: "exames", fields: ["id PK", "nome UNIQUE", "valor"] },
        { name: "medicamentos", fields: ["id PK", "nome UNIQUE", "ativo"] },
      ],
      associations: [
        { name: "pacientes_medicos", left: "pacientes", right: "medicos", leftFk: "paciente_id", rightFk: "medico_id", fields: ["data_registro", "status"] },
        { name: "medicos_especialidades", left: "medicos", right: "especialidades", leftFk: "medico_id", rightFk: "especialidade_id", fields: ["principal", "data_registro"] },
        { name: "pacientes_exames", left: "pacientes", right: "exames", leftFk: "paciente_id", rightFk: "exame_id", fields: ["data_registro", "status"] },
        { name: "medicos_exames", left: "medicos", right: "exames", leftFk: "medico_id", rightFk: "exame_id", fields: ["data_registro", "observacao"] },
        { name: "pacientes_medicamentos", left: "pacientes", right: "medicamentos", leftFk: "paciente_id", rightFk: "medicamento_id", fields: ["data_registro", "observacao"] },
      ],
    },
    {
      number: 107,
      title: "Universidade completa",
      database: "universidade_completa_mer",
      question: "crie um banco acadêmico com alunos, professores, disciplinas, turmas, projetos e cinco associações.",
      cores: [
        { name: "alunos", fields: ["id PK", "nome", "matricula UNIQUE"] },
        { name: "professores", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "disciplinas", fields: ["id PK", "codigo UNIQUE", "nome"] },
        { name: "turmas", fields: ["id PK", "nome", "ano"] },
        { name: "projetos", fields: ["id PK", "nome", "ativo"] },
      ],
      associations: [
        { name: "alunos_turmas", left: "alunos", right: "turmas", leftFk: "aluno_id", rightFk: "turma_id", fields: ["status", "data_registro"] },
        { name: "professores_disciplinas", left: "professores", right: "disciplinas", leftFk: "professor_id", rightFk: "disciplina_id", fields: ["data_registro", "status"] },
        { name: "disciplinas_turmas", left: "disciplinas", right: "turmas", leftFk: "disciplina_id", rightFk: "turma_id", fields: ["data_registro", "status"] },
        { name: "alunos_projetos", left: "alunos", right: "projetos", leftFk: "aluno_id", rightFk: "projeto_id", fields: ["papel", "data_registro"] },
        { name: "professores_projetos", left: "professores", right: "projetos", leftFk: "professor_id", rightFk: "projeto_id", fields: ["papel", "data_registro"] },
      ],
    },
    {
      number: 108,
      title: "Marketplace avançado",
      database: "marketplace_avancado_mer",
      question: "crie um marketplace com clientes, vendedores, produtos, campanhas, cupons e cinco associações.",
      cores: [
        { name: "clientes", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "vendedores", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "produtos", fields: ["id PK", "nome", "preco"] },
        { name: "campanhas", fields: ["id PK", "nome", "ativo"] },
        { name: "cupons", fields: ["id PK", "codigo UNIQUE", "valor"] },
      ],
      associations: [
        { name: "vendedores_produtos", left: "vendedores", right: "produtos", leftFk: "vendedor_id", rightFk: "produto_id", fields: ["data_registro", "status"] },
        { name: "produtos_campanhas", left: "produtos", right: "campanhas", leftFk: "produto_id", rightFk: "campanha_id", fields: ["data_registro", "status"] },
        { name: "clientes_cupons", left: "clientes", right: "cupons", leftFk: "cliente_id", rightFk: "cupom_id", fields: ["data_registro", "status"] },
        { name: "campanhas_cupons", left: "campanhas", right: "cupons", leftFk: "campanha_id", rightFk: "cupom_id", fields: ["data_registro", "status"] },
        { name: "clientes_produtos", left: "clientes", right: "produtos", leftFk: "cliente_id", rightFk: "produto_id", fields: ["quantidade", "valor_unitario"] },
      ],
    },
    {
      number: 109,
      title: "Gestão pública",
      database: "gestao_publica_mer",
      question: "crie um banco para órgãos, servidores, projetos, contratos, fornecedores e suas associações.",
      cores: [
        { name: "orgaos", fields: ["id PK", "nome", "sigla UNIQUE"] },
        { name: "servidores", fields: ["id PK", "nome", "matricula UNIQUE"] },
        { name: "projetos", fields: ["id PK", "nome", "orcamento"] },
        { name: "contratos", fields: ["id PK", "numero UNIQUE", "valor"] },
        { name: "fornecedores", fields: ["id PK", "nome", "cnpj UNIQUE"] },
      ],
      associations: [
        { name: "orgaos_servidores", left: "orgaos", right: "servidores", leftFk: "orgao_id", rightFk: "servidor_id", fields: ["data_registro", "status"] },
        { name: "orgaos_projetos", left: "orgaos", right: "projetos", leftFk: "orgao_id", rightFk: "projeto_id", fields: ["data_registro", "status"] },
        { name: "servidores_projetos", left: "servidores", right: "projetos", leftFk: "servidor_id", rightFk: "projeto_id", fields: ["papel", "data_registro"] },
        { name: "projetos_contratos", left: "projetos", right: "contratos", leftFk: "projeto_id", rightFk: "contrato_id", fields: ["data_registro", "status"] },
        { name: "contratos_fornecedores", left: "contratos", right: "fornecedores", leftFk: "contrato_id", rightFk: "fornecedor_id", fields: ["data_registro", "status"] },
      ],
    },
    {
      number: 110,
      title: "Controle industrial",
      database: "controle_industrial_mer",
      question: "crie um banco industrial com máquinas, operadores, produtos, lotes, inspeções e associações.",
      cores: [
        { name: "maquinas", fields: ["id PK", "codigo UNIQUE", "ativo"] },
        { name: "operadores", fields: ["id PK", "nome", "matricula UNIQUE"] },
        { name: "produtos", fields: ["id PK", "codigo UNIQUE", "nome"] },
        { name: "lotes", fields: ["id PK", "codigo UNIQUE", "data_registro"] },
        { name: "inspecoes", fields: ["id PK", "nome", "status"] },
      ],
      associations: [
        { name: "maquinas_operadores", left: "maquinas", right: "operadores", leftFk: "maquina_id", rightFk: "operador_id", fields: ["data_registro", "status"] },
        { name: "maquinas_produtos", left: "maquinas", right: "produtos", leftFk: "maquina_id", rightFk: "produto_id", fields: ["data_registro", "status"] },
        { name: "produtos_lotes", left: "produtos", right: "lotes", leftFk: "produto_id", rightFk: "lote_id", fields: ["quantidade", "data_registro"] },
        { name: "lotes_inspecoes", left: "lotes", right: "inspecoes", leftFk: "lote_id", rightFk: "inspecao_id", fields: ["data_registro", "status"] },
        { name: "operadores_inspecoes", left: "operadores", right: "inspecoes", leftFk: "operador_id", rightFk: "inspecao_id", fields: ["data_registro", "observacao"] },
      ],
    },
    {
      number: 111,
      title: "Rede de clínicas",
      database: "rede_clinicas_mer",
      question: "crie um banco para clínicas, médicos, pacientes, convênios, procedimentos e associações.",
      cores: [
        { name: "clinicas", fields: ["id PK", "nome", "cnpj UNIQUE"] },
        { name: "medicos", fields: ["id PK", "nome", "crm UNIQUE"] },
        { name: "pacientes", fields: ["id PK", "nome", "cpf UNIQUE"] },
        { name: "convenios", fields: ["id PK", "nome UNIQUE", "ativo"] },
        { name: "procedimentos", fields: ["id PK", "nome UNIQUE", "valor"] },
      ],
      associations: [
        { name: "clinicas_medicos", left: "clinicas", right: "medicos", leftFk: "clinica_id", rightFk: "medico_id", fields: ["data_registro", "status"] },
        { name: "pacientes_convenios", left: "pacientes", right: "convenios", leftFk: "paciente_id", rightFk: "convenio_id", fields: ["data_registro", "status"] },
        { name: "convenios_procedimentos", left: "convenios", right: "procedimentos", leftFk: "convenio_id", rightFk: "procedimento_id", fields: ["valor", "status"] },
        { name: "medicos_procedimentos", left: "medicos", right: "procedimentos", leftFk: "medico_id", rightFk: "procedimento_id", fields: ["data_registro", "status"] },
        { name: "clinicas_procedimentos", left: "clinicas", right: "procedimentos", leftFk: "clinica_id", rightFk: "procedimento_id", fields: ["data_registro", "status"] },
      ],
    },
    {
      number: 112,
      title: "Logística nacional",
      database: "logistica_nacional_mer",
      question: "crie um banco para centros, veículos, motoristas, rotas, cargas e associações.",
      cores: [
        { name: "centros", fields: ["id PK", "nome", "codigo UNIQUE"] },
        { name: "veiculos", fields: ["id PK", "placa UNIQUE", "ativo"] },
        { name: "motoristas", fields: ["id PK", "nome", "cnh UNIQUE"] },
        { name: "rotas", fields: ["id PK", "nome", "distancia"] },
        { name: "cargas", fields: ["id PK", "codigo UNIQUE", "valor"] },
      ],
      associations: [
        { name: "centros_rotas", left: "centros", right: "rotas", leftFk: "centro_id", rightFk: "rota_id", fields: ["data_registro", "status"] },
        { name: "veiculos_motoristas", left: "veiculos", right: "motoristas", leftFk: "veiculo_id", rightFk: "motorista_id", fields: ["data_registro", "status"] },
        { name: "veiculos_cargas", left: "veiculos", right: "cargas", leftFk: "veiculo_id", rightFk: "carga_id", fields: ["data_registro", "status"] },
        { name: "rotas_cargas", left: "rotas", right: "cargas", leftFk: "rota_id", rightFk: "carga_id", fields: ["data_registro", "status"] },
        { name: "motoristas_rotas", left: "motoristas", right: "rotas", leftFk: "motorista_id", rightFk: "rota_id", fields: ["data_registro", "status"] },
      ],
    },
    {
      number: 113,
      title: "Editora multinível",
      database: "editora_multinivel_mer",
      question: "crie um banco para autores, obras, contratos, territórios, formatos e associações.",
      cores: [
        { name: "autores", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "obras", fields: ["id PK", "titulo", "codigo UNIQUE"] },
        { name: "contratos", fields: ["id PK", "numero UNIQUE", "valor"] },
        { name: "territorios", fields: ["id PK", "nome UNIQUE", "ativo"] },
        { name: "formatos", fields: ["id PK", "nome UNIQUE", "ativo"] },
      ],
      associations: [
        { name: "autores_obras", left: "autores", right: "obras", leftFk: "autor_id", rightFk: "obra_id", fields: ["ordem", "data_registro"] },
        { name: "obras_contratos", left: "obras", right: "contratos", leftFk: "obra_id", rightFk: "contrato_id", fields: ["data_registro", "status"] },
        { name: "contratos_territorios", left: "contratos", right: "territorios", leftFk: "contrato_id", rightFk: "territorio_id", fields: ["data_registro", "status"] },
        { name: "contratos_formatos", left: "contratos", right: "formatos", leftFk: "contrato_id", rightFk: "formato_id", fields: ["data_registro", "status"] },
        { name: "obras_formatos", left: "obras", right: "formatos", leftFk: "obra_id", rightFk: "formato_id", fields: ["data_registro", "status"] },
      ],
    },
    {
      number: 114,
      title: "Streaming musical",
      database: "streaming_musical_mer",
      question: "crie um banco para artistas, músicas, álbuns, playlists, usuários e associações.",
      cores: [
        { name: "artistas", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "musicas", fields: ["id PK", "titulo", "duracao"] },
        { name: "albuns", fields: ["id PK", "titulo", "ano"] },
        { name: "playlists", fields: ["id PK", "nome", "ativo"] },
        { name: "usuarios", fields: ["id PK", "nome", "email UNIQUE"] },
      ],
      associations: [
        { name: "artistas_musicas", left: "artistas", right: "musicas", leftFk: "artista_id", rightFk: "musica_id", fields: ["papel", "data_registro"] },
        { name: "albuns_musicas", left: "albuns", right: "musicas", leftFk: "album_id", rightFk: "musica_id", fields: ["ordem", "data_registro"] },
        { name: "playlists_musicas", left: "playlists", right: "musicas", leftFk: "playlist_id", rightFk: "musica_id", fields: ["ordem", "data_registro"] },
        { name: "usuarios_playlists", left: "usuarios", right: "playlists", leftFk: "usuario_id", rightFk: "playlist_id", fields: ["data_registro", "status"] },
        { name: "usuarios_musicas", left: "usuarios", right: "musicas", leftFk: "usuario_id", rightFk: "musica_id", fields: ["data_registro", "status"] },
      ],
    },
    {
      number: 115,
      title: "Plataforma de cursos",
      database: "plataforma_cursos_mer",
      question: "crie um banco para alunos, instrutores, cursos, trilhas, certificados e associações.",
      cores: [
        { name: "alunos", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "instrutores", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "cursos", fields: ["id PK", "titulo", "ativo"] },
        { name: "trilhas", fields: ["id PK", "nome", "ativo"] },
        { name: "certificados", fields: ["id PK", "codigo UNIQUE", "data_registro"] },
      ],
      associations: [
        { name: "alunos_cursos", left: "alunos", right: "cursos", leftFk: "aluno_id", rightFk: "curso_id", fields: ["status", "data_registro"] },
        { name: "instrutores_cursos", left: "instrutores", right: "cursos", leftFk: "instrutor_id", rightFk: "curso_id", fields: ["papel", "data_registro"] },
        { name: "trilhas_cursos", left: "trilhas", right: "cursos", leftFk: "trilha_id", rightFk: "curso_id", fields: ["ordem", "data_registro"] },
        { name: "alunos_certificados", left: "alunos", right: "certificados", leftFk: "aluno_id", rightFk: "certificado_id", fields: ["data_registro", "status"] },
        { name: "cursos_certificados", left: "cursos", right: "certificados", leftFk: "curso_id", rightFk: "certificado_id", fields: ["data_registro", "status"] },
      ],
    },
    {
      number: 116,
      title: "Banco de investimentos",
      database: "investimentos_mer",
      question: "crie um banco para clientes, carteiras, ativos, ordens, corretoras e associações.",
      cores: [
        { name: "clientes", fields: ["id PK", "nome", "cpf UNIQUE"] },
        { name: "carteiras", fields: ["id PK", "nome", "ativo"] },
        { name: "ativos", fields: ["id PK", "codigo UNIQUE", "tipo"] },
        { name: "ordens", fields: ["id PK", "codigo UNIQUE", "valor"] },
        { name: "corretoras", fields: ["id PK", "nome", "cnpj UNIQUE"] },
      ],
      associations: [
        { name: "clientes_carteiras", left: "clientes", right: "carteiras", leftFk: "cliente_id", rightFk: "carteira_id", fields: ["data_registro", "status"] },
        { name: "carteiras_ativos", left: "carteiras", right: "ativos", leftFk: "carteira_id", rightFk: "ativo_id", fields: ["quantidade", "valor_unitario"] },
        { name: "clientes_ordens", left: "clientes", right: "ordens", leftFk: "cliente_id", rightFk: "ordem_id", fields: ["data_registro", "status"] },
        { name: "ordens_ativos", left: "ordens", right: "ativos", leftFk: "ordem_id", rightFk: "ativo_id", fields: ["quantidade", "valor_unitario"] },
        { name: "corretoras_ordens", left: "corretoras", right: "ordens", leftFk: "corretora_id", rightFk: "ordem_id", fields: ["data_registro", "status"] },
      ],
    },
    {
      number: 117,
      title: "Gestão de pesquisa clínica",
      database: "pesquisa_clinica_mer",
      question: "crie um banco para estudos, pacientes, pesquisadores, medicamentos, visitas e associações.",
      cores: [
        { name: "estudos", fields: ["id PK", "codigo UNIQUE", "ativo"] },
        { name: "pacientes", fields: ["id PK", "nome", "cpf UNIQUE"] },
        { name: "pesquisadores", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "medicamentos", fields: ["id PK", "nome", "ativo"] },
        { name: "visitas", fields: ["id PK", "nome", "data_registro"] },
      ],
      associations: [
        { name: "estudos_pacientes", left: "estudos", right: "pacientes", leftFk: "estudo_id", rightFk: "paciente_id", fields: ["data_registro", "status"] },
        { name: "estudos_pesquisadores", left: "estudos", right: "pesquisadores", leftFk: "estudo_id", rightFk: "pesquisador_id", fields: ["papel", "data_registro"] },
        { name: "estudos_medicamentos", left: "estudos", right: "medicamentos", leftFk: "estudo_id", rightFk: "medicamento_id", fields: ["data_registro", "status"] },
        { name: "pacientes_visitas", left: "pacientes", right: "visitas", leftFk: "paciente_id", rightFk: "visita_id", fields: ["data_registro", "status"] },
        { name: "pesquisadores_visitas", left: "pesquisadores", right: "visitas", leftFk: "pesquisador_id", rightFk: "visita_id", fields: ["data_registro", "observacao"] },
      ],
    },
    {
      number: 118,
      title: "Gestão de obras públicas",
      database: "obras_publicas_mer",
      question: "crie um banco para obras, empresas, fiscais, medições, recursos e associações.",
      cores: [
        { name: "obras", fields: ["id PK", "nome", "orcamento"] },
        { name: "empresas", fields: ["id PK", "nome", "cnpj UNIQUE"] },
        { name: "fiscais", fields: ["id PK", "nome", "matricula UNIQUE"] },
        { name: "medicoes", fields: ["id PK", "codigo UNIQUE", "valor"] },
        { name: "recursos", fields: ["id PK", "nome", "valor"] },
      ],
      associations: [
        { name: "obras_empresas", left: "obras", right: "empresas", leftFk: "obra_id", rightFk: "empresa_id", fields: ["data_registro", "status"] },
        { name: "obras_fiscais", left: "obras", right: "fiscais", leftFk: "obra_id", rightFk: "fiscal_id", fields: ["data_registro", "status"] },
        { name: "obras_medicoes", left: "obras", right: "medicoes", leftFk: "obra_id", rightFk: "medicao_id", fields: ["data_registro", "status"] },
        { name: "obras_recursos", left: "obras", right: "recursos", leftFk: "obra_id", rightFk: "recurso_id", fields: ["data_registro", "status"] },
        { name: "empresas_medicoes", left: "empresas", right: "medicoes", leftFk: "empresa_id", rightFk: "medicao_id", fields: ["data_registro", "observacao"] },
      ],
    },
    {
      number: 119,
      title: "Sistema aeroportuário",
      database: "aeroporto_mer",
      question: "crie um banco para passageiros, voos, aeronaves, aeroportos, bagagens e associações.",
      cores: [
        { name: "passageiros", fields: ["id PK", "nome", "documento UNIQUE"] },
        { name: "voos", fields: ["id PK", "codigo UNIQUE", "data_hora"] },
        { name: "aeronaves", fields: ["id PK", "prefixo UNIQUE", "ativo"] },
        { name: "aeroportos", fields: ["id PK", "codigo UNIQUE", "nome"] },
        { name: "bagagens", fields: ["id PK", "codigo UNIQUE", "peso"] },
      ],
      associations: [
        { name: "passageiros_voos", left: "passageiros", right: "voos", leftFk: "passageiro_id", rightFk: "voo_id", fields: ["assento", "data_registro"] },
        { name: "voos_aeronaves", left: "voos", right: "aeronaves", leftFk: "voo_id", rightFk: "aeronave_id", fields: ["data_registro", "status"] },
        { name: "voos_aeroportos", left: "voos", right: "aeroportos", leftFk: "voo_id", rightFk: "aeroporto_id", fields: ["tipo", "data_registro"] },
        { name: "passageiros_bagagens", left: "passageiros", right: "bagagens", leftFk: "passageiro_id", rightFk: "bagagem_id", fields: ["data_registro", "status"] },
        { name: "voos_bagagens", left: "voos", right: "bagagens", leftFk: "voo_id", rightFk: "bagagem_id", fields: ["data_registro", "status"] },
      ],
    },
    {
      number: 120,
      title: "Ecossistema de inovação",
      database: "inovacao_mer",
      question: "crie um banco para startups, investidores, mentores, programas, rodadas e associações.",
      cores: [
        { name: "startups", fields: ["id PK", "nome", "cnpj UNIQUE"] },
        { name: "investidores", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "mentores", fields: ["id PK", "nome", "email UNIQUE"] },
        { name: "programas", fields: ["id PK", "nome", "ativo"] },
        { name: "rodadas", fields: ["id PK", "nome", "valor"] },
      ],
      associations: [
        { name: "startups_investidores", left: "startups", right: "investidores", leftFk: "startup_id", rightFk: "investidor_id", fields: ["valor", "data_registro"] },
        { name: "startups_mentores", left: "startups", right: "mentores", leftFk: "startup_id", rightFk: "mentor_id", fields: ["data_registro", "status"] },
        { name: "startups_programas", left: "startups", right: "programas", leftFk: "startup_id", rightFk: "programa_id", fields: ["data_registro", "status"] },
        { name: "startups_rodadas", left: "startups", right: "rodadas", leftFk: "startup_id", rightFk: "rodada_id", fields: ["data_registro", "status"] },
        { name: "investidores_rodadas", left: "investidores", right: "rodadas", leftFk: "investidor_id", rightFk: "rodada_id", fields: ["valor", "data_registro"] },
      ],
    },
  ].map(createComplexMerExercise),
};

merPostgresqlExerciseList.blocks.push(complexMerExerciseBlock);

export function getPostgresqlExerciseQuestion(exercise) {
  return typeof exercise === "string" ? exercise : exercise.question;
}

export function getPostgresqlExerciseNumber(exercise, fallbackNumber) {
  return typeof exercise === "string" ? fallbackNumber : exercise.number || fallbackNumber;
}

export function getPostgresqlExerciseAnswer(blockSlug, exerciseIndex, exercise) {
  if (typeof exercise === "object" && exercise?.answer) {
    return exercise.answer;
  }

  return basicPostgresqlExerciseAnswers[blockSlug]?.[exerciseIndex] || "Resposta sugerida indisponível para este exercício.";
}

export const postgresqlExerciseLists = [
  {
    slug: "basica",
    order: 1,
    title: "Básica",
    summary:
      "Comece por esta lista para construir uma base firme em modelagem, comandos SQL, consultas, transações, permissões e backup.",
    level: "Básico a intermediário",
    blocks: basicPostgresqlExerciseBlocks,
  },
  postgresqlConsultaExerciseList,
  merPostgresqlExerciseList,
  postgresqlClinicaVeterinariaExerciseList,
  postgresqlLojaTemporalExerciseList,
];

export const postgresqlExerciseBlocks = basicPostgresqlExerciseBlocks;

export function findPostgresqlExerciseList(slug) {
  return postgresqlExerciseLists.find((list) => list.slug === slug);
}

export function findPostgresqlExerciseBlock(listSlug, blockSlug) {
  const list = blockSlug ? findPostgresqlExerciseList(listSlug) : postgresqlExerciseLists[0];
  const slug = blockSlug || listSlug;

  return list?.blocks.find((block) => block.slug === slug);
}
