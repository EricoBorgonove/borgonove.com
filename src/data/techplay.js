export const techPlayDisciplinas = [
  {
    slug: "arquitetura-software",
    titulo: "Arquitetura de Software",
    tituloEn: "Software Architecture",
    resumo:
      "Fundamentos, padrões, escalabilidade, segurança e decisões arquiteturais para sistemas modernos.",
    resumoEn:
      "Fundamentals, patterns, scalability, security, and architectural decisions for modern systems.",
    temas: [
      {
        titulo: "Arquitetura de Software: o Alicerce do Sistema",
        tituloEn: "Software Architecture: The Foundation of the System",
        descricao:
          "Arquitetura de software define a estrutura fundamental de um sistema, organizando seus componentes, responsabilidades e interações. Ela impacta diretamente escalabilidade, segurança, manutenção e evolução do projeto.",
        descricaoEn:
          "Software architecture defines the fundamental structure of a system, organizing its components, responsibilities, and interactions. It directly impacts scalability, security, maintainability, and project evolution.",
      },
      {
        titulo: "Monolito vs Microservices: A Grande Decisão Arquitetural",
        tituloEn: "Monolith vs Microservices: The Great Architectural Decision",
        descricao:
          "Enquanto o monolito centraliza toda a aplicação em um único bloco, microservices dividem o sistema em serviços independentes. A escolha influencia deploy, manutenção, escalabilidade e complexidade operacional.",
        descricaoEn:
          "While the monolith centralizes the entire application in a single block, microservices split the system into independent services. This choice influences deployment, maintenance, scalability, and operational complexity.",
      },
      {
        titulo: "Arquitetura em Camadas (Layered Architecture)",
        tituloEn: "Layered Architecture",
        descricao:
          "Modelo tradicional dividido em apresentação, negócio e dados. Facilita organização e manutenção, sendo muito utilizada em sistemas corporativos.",
        descricaoEn:
          "A traditional model divided into presentation, business, and data layers. It simplifies organization and maintenance and is widely used in enterprise systems.",
      },
      {
        titulo: "Arquitetura Hexagonal (Ports and Adapters)",
        tituloEn: "Hexagonal Architecture (Ports and Adapters)",
        descricao:
          "Também chamada de Ports & Adapters, promove forte desacoplamento entre regras de negócio e infraestrutura, facilitando testes e mudanças tecnológicas.",
        descricaoEn:
          "Also called Ports & Adapters, it promotes strong decoupling between business rules and infrastructure, making testing and technology changes easier.",
      },
      {
        titulo: "Clean Architecture na Prática",
        tituloEn: "Clean Architecture in Practice",
        descricao:
          "Propõe independência de frameworks, banco de dados e interfaces externas. O foco está na regra de negócio como núcleo central do sistema.",
        descricaoEn:
          "It proposes independence from frameworks, databases, and external interfaces. The focus is on business rules as the central core of the system.",
      },
      {
        titulo: "REST vs GraphQL: Impactos na Estrutura do Sistema",
        tituloEn: "REST vs GraphQL: Impacts on System Structure",
        descricao:
          "Ambas são abordagens para APIs, mas com impactos diferentes na organização do backend e na forma como os dados são consumidos pelo frontend.",
        descricaoEn:
          "Both are API approaches, but they create different impacts on backend organization and on how data is consumed by the frontend.",
      },
      {
        titulo: "Arquitetura Orientada a Eventos (Event-Driven Architecture)",
        tituloEn: "Event-Driven Architecture",
        descricao:
          "Baseia-se na comunicação por eventos, utilizando filas e mensageria. Ideal para sistemas distribuídos e de alta escalabilidade.",
        descricaoEn:
          "It is based on event-based communication using queues and messaging. It is ideal for distributed and highly scalable systems.",
      },
      {
        titulo: "Arquitetura Serverless",
        tituloEn: "Serverless Architecture",
        descricao:
          "Modelo baseado em funções executadas sob demanda na nuvem. Reduz preocupações com infraestrutura e permite escalabilidade automática.",
        descricaoEn:
          "A model based on functions executed on demand in the cloud. It reduces infrastructure concerns and enables automatic scalability.",
      },
      {
        titulo: "Containers e Orquestração na Arquitetura Moderna",
        tituloEn: "Containers and Orchestration in Modern Architecture",
        descricao:
          "Docker e orquestradores como Kubernetes permitem empacotar aplicações e garantir ambientes consistentes e escaláveis.",
        descricaoEn:
          "Docker and orchestrators such as Kubernetes allow applications to be packaged and help guarantee consistent and scalable environments.",
      },
      {
        titulo: "Arquitetura para Alta Disponibilidade",
        tituloEn: "Architecture for High Availability",
        descricao:
          "Conjunto de estratégias como replicação, balanceamento de carga e redundância para manter o sistema funcionando mesmo diante de falhas.",
        descricaoEn:
          "A set of strategies such as replication, load balancing, and redundancy to keep the system running even in the presence of failures.",
      },
      {
        titulo: "Escalabilidade: Vertical vs Horizontal",
        tituloEn: "Scalability: Vertical vs Horizontal",
        descricao:
          "Escalar verticalmente significa aumentar recursos do servidor; horizontalmente significa adicionar novas instâncias. Cada abordagem tem vantagens e limitações.",
        descricaoEn:
          "Vertical scaling means increasing server resources; horizontal scaling means adding new instances. Each approach has its own advantages and limitations.",
      },
      {
        titulo: "Padrões Arquiteturais Clássicos (MVC, MVVM)",
        tituloEn: "Classic Architectural Patterns (MVC, MVVM)",
        descricao:
          "Modelos consolidados que organizam responsabilidades e facilitam separação de interesses dentro da aplicação.",
        descricaoEn:
          "Established models that organize responsibilities and make separation of concerns easier within the application.",
      },
      {
        titulo: "Domain-Driven Design (DDD)",
        tituloEn: "Domain-Driven Design (DDD)",
        descricao:
          "Abordagem que coloca o domínio do negócio no centro da modelagem do sistema, promovendo maior alinhamento entre tecnologia e regras empresariais.",
        descricaoEn:
          "An approach that places the business domain at the center of system modeling, promoting stronger alignment between technology and business rules.",
      },
      {
        titulo: "Arquitetura e Segurança da Informação",
        tituloEn: "Architecture and Information Security",
        descricao:
          "Integra práticas como autenticação, autorização, criptografia e proteção contra ataques dentro da estrutura do sistema.",
        descricaoEn:
          "It integrates practices such as authentication, authorization, encryption, and protection against attacks into the system structure.",
      },
      {
        titulo: "Sistemas Distribuídos e o Teorema CAP",
        tituloEn: "Distributed Systems and the CAP Theorem",
        descricao:
          "Explica os limites entre consistência, disponibilidade e tolerância a partições em sistemas distribuídos.",
        descricaoEn:
          "It explains the trade-offs between consistency, availability, and partition tolerance in distributed systems.",
      },
      {
        titulo: "Documentação Arquitetural com C4 Model",
        tituloEn: "Architectural Documentation with the C4 Model",
        descricao:
          "Modelo de documentação que organiza a arquitetura em níveis (Contexto, Container, Componente e Código).",
        descricaoEn:
          "A documentation model that organizes architecture into levels (Context, Container, Component, and Code).",
      },
      {
        titulo: "Recuperação de Arquitetura em Sistemas Legados",
        tituloEn: "Architecture Recovery in Legacy Systems",
        descricao:
          "Técnicas para compreender sistemas antigos cuja documentação está desatualizada ou inexistente.",
        descricaoEn:
          "Techniques to understand old systems whose documentation is outdated or nonexistent.",
      },
      {
        titulo: "Arquiteturas Auto-Gerenciáveis",
        tituloEn: "Self-Managing Architectures",
        descricao:
          "Sistemas capazes de monitorar, adaptar e otimizar seu próprio funcionamento automaticamente.",
        descricaoEn:
          "Systems capable of monitoring, adapting, and optimizing their own behavior automatically.",
      },
      {
        titulo: "Métricas Arquiteturais: Coesão e Acoplamento",
        tituloEn: "Architectural Metrics: Cohesion and Coupling",
        descricao:
          "Indicadores que medem qualidade estrutural do software e ajudam na tomada de decisões técnicas.",
        descricaoEn:
          "Indicators that measure software structural quality and support technical decision-making.",
      },
      {
        titulo: "Estudo de Caso: Arquitetura da Netflix",
        tituloEn: "Case Study: Netflix Architecture",
        descricao:
          "Exemplo real de arquitetura distribuída baseada em microservices, resiliência e escalabilidade global.",
        descricaoEn:
          "A real-world example of distributed architecture based on microservices, resilience, and global scalability.",
      },
    ],
  },
  {
    slug: "projeto-banco-de-dados",
    titulo: "Projeto de Banco de Dados",
    tituloEn: "Database Design Project",
    resumo:
      "Modelagem, arquiteturas analíticas, bancos distribuídos, engenharia de dados e implementação prática de soluções modernas.",
    resumoEn:
      "Modeling, analytical architectures, distributed databases, data engineering, and practical implementation of modern solutions.",
    temas: [
      {
        titulo: "Banco de Dados Orientado a Objetos (OODBMS): Conceitos e Aplicações",
        tituloEn: "Object-Oriented Databases (OODBMS): Concepts and Applications",
        descricao:
          "Exploração dos fundamentos dos bancos de dados orientados a objetos, sua integração com linguagens OO e diferenças em relação ao modelo relacional tradicional.",
        descricaoEn:
          "Exploration of the foundations of object-oriented databases, their integration with OO languages, and their differences from the traditional relational model.",
      },
      {
        titulo: "Bancos Objeto-Relacionais: A Evolução do Modelo Relacional",
        tituloEn: "Object-Relational Databases: The Evolution of the Relational Model",
        descricao:
          "Estudo das extensões do modelo relacional que incorporam conceitos de orientação a objetos, como tipos complexos, herança e encapsulamento.",
        descricaoEn:
          "Study of relational model extensions that incorporate object-oriented concepts such as complex types, inheritance, and encapsulation.",
      },
      {
        titulo: "Padrão ODMG: Estrutura e Funcionamento",
        tituloEn: "ODMG Standard: Structure and Operation",
        descricao:
          "Análise do padrão Object Data Management Group (ODMG), incluindo modelo de dados, linguagem de definição de objetos (ODL) e linguagem de consulta (OQL).",
        descricaoEn:
          "Analysis of the Object Data Management Group (ODMG) standard, including its data model, object definition language (ODL), and query language (OQL).",
      },
      {
        titulo: "SQL: Padrão, Evolução e Extensões Modernas",
        tituloEn: "SQL: Standard, Evolution, and Modern Extensions",
        descricao:
          "Compreensão do padrão SQL, suas versões, e como ele evoluiu para suportar recursos objeto-relacionais.",
        descricaoEn:
          "Understanding the SQL standard, its versions, and how it evolved to support object-relational features.",
      },
      {
        titulo: "Orientação a Objetos Aplicada a Banco de Dados",
        tituloEn: "Object Orientation Applied to Databases",
        descricao:
          "Como conceitos como classes, herança e polimorfismo são implementados dentro de sistemas gerenciadores de banco de dados.",
        descricaoEn:
          "How concepts such as classes, inheritance, and polymorphism are implemented within database management systems.",
      },
      {
        titulo: "Data Mining: Extraindo Conhecimento dos Dados",
        tituloEn: "Data Mining: Extracting Knowledge from Data",
        descricao:
          "Introdução às técnicas de mineração de dados para descoberta de padrões, previsões e apoio à tomada de decisão.",
        descricaoEn:
          "Introduction to data mining techniques for discovering patterns, making predictions, and supporting decision-making.",
      },
      {
        titulo: "OLAP e Data Warehouse: Arquitetura Analítica",
        tituloEn: "OLAP and Data Warehouse: Analytical Architecture",
        descricao:
          "Entendimento de cubos multidimensionais, modelagem estrela e floco de neve, e suporte à análise estratégica.",
        descricaoEn:
          "Understanding multidimensional cubes, star and snowflake modeling, and support for strategic analysis.",
      },
      {
        titulo: "Modelagem para Data Warehouse",
        tituloEn: "Modeling for Data Warehouse",
        descricao:
          "Diferença entre modelagem transacional (OLTP) e analítica (OLAP), com foco em desempenho e consultas complexas.",
        descricaoEn:
          "Difference between transactional (OLTP) and analytical (OLAP) modeling, with focus on performance and complex queries.",
      },
      {
        titulo: "Molecular Modeling Database (MMDB)",
        tituloEn: "Molecular Modeling Database (MMDB)",
        descricao:
          "Aplicações de bancos de dados em contextos científicos, como armazenamento e análise de estruturas moleculares.",
        descricaoEn:
          "Applications of databases in scientific contexts, such as storage and analysis of molecular structures.",
      },
      {
        titulo: "Banco de Dados Temporais",
        tituloEn: "Temporal Databases",
        descricao:
          "Gestão de dados que variam ao longo do tempo, incluindo tempo válido, tempo de transação e aplicações práticas.",
        descricaoEn:
          "Management of data that changes over time, including valid time, transaction time, and practical applications.",
      },
      {
        titulo: "Bancos de Dados para Internet",
        tituloEn: "Databases for the Internet",
        descricao:
          "Desafios de escalabilidade, concorrência, latência e segurança em aplicações web e sistemas distribuídos.",
        descricaoEn:
          "Challenges involving scalability, concurrency, latency, and security in web applications and distributed systems.",
      },
      {
        titulo: "NoSQL: Modelos e Casos de Uso",
        tituloEn: "NoSQL: Models and Use Cases",
        descricao:
          "Análise dos modelos chave-valor, documento, coluna e grafo, e quando utilizá-los em projetos modernos.",
        descricaoEn:
          "Analysis of key-value, document, column, and graph models, and when to use them in modern projects.",
      },
      {
        titulo: "XML e Banco de Dados",
        tituloEn: "XML and Databases",
        descricao:
          "Armazenamento, consulta e integração de dados em formato XML, além de comparação com JSON.",
        descricaoEn:
          "Storage, querying, and integration of data in XML format, along with comparisons to JSON.",
      },
      {
        titulo: "Introdução à Engenharia de Dados",
        tituloEn: "Introduction to Data Engineering",
        descricao:
          "Papel do engenheiro de dados, pipelines, processamento em lote e em tempo real.",
        descricaoEn:
          "Role of the data engineer, pipelines, batch processing, and real-time processing.",
      },
      {
        titulo: "Banco de Dados Distribuídos",
        tituloEn: "Distributed Databases",
        descricao:
          "Conceitos de fragmentação, replicação, consistência e desafios em ambientes distribuídos.",
        descricaoEn:
          "Concepts of fragmentation, replication, consistency, and challenges in distributed environments.",
      },
      {
        titulo: "Modelagem de Dados para Big Data",
        tituloEn: "Data Modeling for Big Data",
        descricao:
          "Estratégias de modelagem para grandes volumes de dados, incluindo processamento distribuído.",
        descricaoEn:
          "Modeling strategies for large volumes of data, including distributed processing.",
      },
      {
        titulo: "Confiabilidade e Eficiência em Banco de Dados",
        tituloEn: "Reliability and Efficiency in Databases",
        descricao:
          "Mecanismos de controle de concorrência, recuperação de falhas e otimização de desempenho.",
        descricaoEn:
          "Mechanisms for concurrency control, failure recovery, and performance optimization.",
      },
      {
        titulo: "Qualidade dos Dados e Governança",
        tituloEn: "Data Quality and Governance",
        descricao:
          "Importância da integridade, consistência e validação dos dados em ambientes corporativos.",
        descricaoEn:
          "Importance of data integrity, consistency, and validation in corporate environments.",
      },
      {
        titulo: "Integração de Múltiplas Fontes de Dados",
        tituloEn: "Integration of Multiple Data Sources",
        descricao:
          "Construção de pipelines ETL/ELT para unificação e transformação de dados heterogêneos.",
        descricaoEn:
          "Building ETL/ELT pipelines to unify and transform heterogeneous data.",
      },
      {
        titulo: "Projeto Completo de Banco de Dados: Da Modelagem à Implementação",
        tituloEn: "Complete Database Project: From Modeling to Implementation",
        descricao:
          "Desenvolvimento prático de um projeto envolvendo levantamento de requisitos, modelagem conceitual, lógica e física, escolha do SGBD e implementação.",
        descricaoEn:
          "Practical development of a project involving requirements gathering, conceptual, logical, and physical modeling, DBMS selection, and implementation.",
      },
    ],
  },
  {
    slug: "backend-frameworks-nodejs",
    titulo: "Backend Frameworks com Node.js",
    tituloEn: "Backend Frameworks with Node.js",
    resumo:
      "APIs, arquitetura backend, autenticação, banco de dados, testes, segurança e deploy com Node.js.",
    resumoEn:
      "APIs, backend architecture, authentication, databases, testing, security, and deployment with Node.js.",
    temas: [
      {
        titulo: "Node.js: Entendendo o Runtime do Backend Moderno",
        tituloEn: "Node.js: Understanding the Runtime of Modern Backend Development",
        descricao:
          "Exploração do funcionamento do Node.js, seu modelo orientado a eventos e a arquitetura baseada em non-blocking I/O que permite alta performance em aplicações web.",
        descricaoEn:
          "Exploration of how Node.js works, its event-driven model, and its non-blocking I/O architecture that enables high performance in web applications.",
      },
      {
        titulo: "Express.js: O Framework Minimalista para APIs",
        tituloEn: "Express.js: The Minimalist Framework for APIs",
        descricao:
          "Criação de servidores HTTP, rotas, middlewares e organização básica de aplicações backend utilizando o framework mais popular do ecossistema Node.",
        descricaoEn:
          "Creation of HTTP servers, routes, middlewares, and basic backend application organization using the most popular framework in the Node ecosystem.",
      },
      {
        titulo: "Estruturação Profissional de Projetos Node (MVC e Camadas)",
        tituloEn: "Professional Structuring of Node Projects (MVC and Layers)",
        descricao:
          "Como organizar controllers, services, repositories e rotas para manter o código escalável e de fácil manutenção.",
        descricaoEn:
          "How to organize controllers, services, repositories, and routes to keep code scalable and easy to maintain.",
      },
      {
        titulo: "Middlewares no Express: Como Funcionam e Por Que São Poderosos",
        tituloEn: "Middlewares in Express: How They Work and Why They Are Powerful",
        descricao:
          "Entendimento do pipeline de requisição e resposta, interceptação, autenticação e tratamento de erros.",
        descricaoEn:
          "Understanding the request-response pipeline, interception, authentication, and error handling.",
      },
      {
        titulo: "Validação de Dados com Zod ou Joi",
        tituloEn: "Data Validation with Zod or Joi",
        descricao:
          "Garantindo segurança e integridade das requisições através de validação estruturada no backend.",
        descricaoEn:
          "Ensuring request security and integrity through structured validation in the backend.",
      },
      {
        titulo: "ORM com Prisma: Modelagem e Acesso a Banco de Dados",
        tituloEn: "ORM with Prisma: Modeling and Database Access",
        descricao:
          "Como integrar Node.js com bancos relacionais usando Prisma para mapeamento objeto-relacional moderno.",
        descricaoEn:
          "How to integrate Node.js with relational databases using Prisma for modern object-relational mapping.",
      },
      {
        titulo: "Autenticação com JWT em Node.js",
        tituloEn: "Authentication with JWT in Node.js",
        descricao:
          "Implementação de login seguro com geração e validação de tokens para controle de acesso.",
        descricaoEn:
          "Implementation of secure login with token generation and validation for access control.",
      },
      {
        titulo: "Criação de APIs RESTful com Node.js",
        tituloEn: "Building RESTful APIs with Node.js",
        descricao:
          "Boas práticas para desenvolvimento de APIs padronizadas utilizando métodos HTTP e códigos de status adequados.",
        descricaoEn:
          "Best practices for developing standardized APIs using HTTP methods and appropriate status codes.",
      },
      {
        titulo: "Arquitetura de APIs com Clean Architecture no Node",
        tituloEn: "API Architecture with Clean Architecture in Node",
        descricao:
          "Aplicando separação de responsabilidades e independência de frameworks em projetos backend.",
        descricaoEn:
          "Applying separation of responsibilities and framework independence in backend projects.",
      },
      {
        titulo: "Tratamento de Erros e Logs no Backend",
        tituloEn: "Error Handling and Logging in the Backend",
        descricao:
          "Como estruturar respostas de erro, logs estruturados e monitoramento de falhas.",
        descricaoEn:
          "How to structure error responses, structured logs, and failure monitoring.",
      },
      {
        titulo: "Conectando Node.js ao PostgreSQL",
        tituloEn: "Connecting Node.js to PostgreSQL",
        descricao:
          "Integração prática com banco de dados relacional, configuração de variáveis de ambiente e controle de conexões.",
        descricaoEn:
          "Practical integration with a relational database, environment variable configuration, and connection management.",
      },
      {
        titulo: "MongoDB com Node.js (Mongoose)",
        tituloEn: "MongoDB with Node.js (Mongoose)",
        descricao:
          "Uso de banco NoSQL orientado a documentos em aplicações modernas.",
        descricaoEn:
          "Use of a document-oriented NoSQL database in modern applications.",
      },
      {
        titulo: "Testes Automatizados no Backend (Jest / Vitest)",
        tituloEn: "Automated Backend Testing (Jest / Vitest)",
        descricao:
          "Importância dos testes unitários e de integração para garantir qualidade do código.",
        descricaoEn:
          "Importance of unit and integration testing to ensure code quality.",
      },
      {
        titulo: "Arquitetura Modular com Fastify",
        tituloEn: "Modular Architecture with Fastify",
        descricao:
          "Comparação entre Express e Fastify, com foco em performance e organização modular.",
        descricaoEn:
          "Comparison between Express and Fastify, focusing on performance and modular organization.",
      },
      {
        titulo: "API Versioning e Evolução de Sistemas",
        tituloEn: "API Versioning and System Evolution",
        descricao:
          "Como versionar APIs sem quebrar aplicações clientes.",
        descricaoEn:
          "How to version APIs without breaking client applications.",
      },
      {
        titulo: "Segurança no Backend Node.js",
        tituloEn: "Security in Node.js Backend",
        descricao:
          "Boas práticas como uso de Helmet, rate limiting, sanitização e prevenção contra ataques comuns.",
        descricaoEn:
          "Best practices such as using Helmet, rate limiting, sanitization, and protection against common attacks.",
      },
      {
        titulo: "Upload de Arquivos no Backend (Multer)",
        tituloEn: "File Upload in the Backend (Multer)",
        descricao:
          "Implementação de upload seguro de imagens e documentos.",
        descricaoEn:
          "Implementation of secure upload for images and documents.",
      },
      {
        titulo: "Backend com WebSockets (Tempo Real)",
        tituloEn: "Backend with WebSockets (Real Time)",
        descricao:
          "Criação de aplicações em tempo real utilizando Socket.io.",
        descricaoEn:
          "Building real-time applications using Socket.io.",
      },
      {
        titulo: "Dockerizando uma Aplicação Node.js",
        tituloEn: "Dockerizing a Node.js Application",
        descricao:
          "Como criar containers para padronizar ambientes e facilitar deploy.",
        descricaoEn:
          "How to create containers to standardize environments and make deployment easier.",
      },
      {
        titulo: "Deploy de Aplicações Node.js em Produção",
        tituloEn: "Deploying Node.js Applications to Production",
        descricao:
          "Estratégias de hospedagem, variáveis de ambiente, build e configuração para ambiente produtivo.",
        descricaoEn:
          "Hosting strategies, environment variables, build steps, and configuration for production environments.",
      },
    ],
  },
  {
    slug: "engenharia-de-requisitos",
    titulo: "Engenharia de Requisitos",
    tituloEn: "Requirements Engineering",
    resumo:
      "Levantamento, análise, documentação, validação e gestão de requisitos para projetos de software.",
    resumoEn:
      "Elicitation, analysis, documentation, validation, and management of requirements for software projects.",
    temas: [
      {
        titulo: "Engenharia de Requisitos: A Base do Sucesso em Projetos de Software",
        tituloEn: "Requirements Engineering: The Foundation of Success in Software Projects",
        descricao:
          "Apresentação da importância estratégica da Engenharia de Requisitos (ER) e como falhas nessa etapa impactam custo, prazo e qualidade do sistema.",
        descricaoEn:
          "Presentation of the strategic importance of Requirements Engineering (RE) and how failures at this stage impact system cost, schedule, and quality.",
      },
      {
        titulo: "História da Engenharia de Requisitos e suas Evoluções",
        tituloEn: "History of Requirements Engineering and Its Evolution",
        descricao:
          "Evolução da ER desde modelos tradicionais até metodologias ágeis, destacando mudanças no papel do analista.",
        descricaoEn:
          "Evolution of RE from traditional models to agile methodologies, highlighting changes in the analyst's role.",
      },
      {
        titulo: "Conceitos Fundamentais da Engenharia de Requisitos",
        tituloEn: "Fundamental Concepts of Requirements Engineering",
        descricao:
          "Definição de requisitos, stakeholders, escopo, restrições e critérios de aceitação.",
        descricaoEn:
          "Definition of requirements, stakeholders, scope, constraints, and acceptance criteria.",
      },
      {
        titulo: "Tipos de Requisitos: Funcionais e Não Funcionais",
        tituloEn: "Types of Requirements: Functional and Non-Functional",
        descricao:
          "Diferença entre comportamentos do sistema e características de qualidade como desempenho, segurança e usabilidade.",
        descricaoEn:
          "Difference between system behaviors and quality attributes such as performance, security, and usability.",
      },
      {
        titulo: "Fatores Críticos de Sucesso na Engenharia de Requisitos",
        tituloEn: "Critical Success Factors in Requirements Engineering",
        descricao:
          "Comunicação clara, envolvimento das partes interessadas, validação contínua e documentação adequada.",
        descricaoEn:
          "Clear communication, stakeholder involvement, continuous validation, and proper documentation.",
      },
      {
        titulo: "Processo da Engenharia de Requisitos",
        tituloEn: "Requirements Engineering Process",
        descricao:
          "Etapas como elicitação, análise, especificação, validação e gerenciamento de mudanças.",
        descricaoEn:
          "Stages such as elicitation, analysis, specification, validation, and change management.",
      },
      {
        titulo: "Engenharia de Requisitos no RUP (Rational Unified Process)",
        tituloEn: "Requirements Engineering in RUP (Rational Unified Process)",
        descricao:
          "Como o RUP estrutura atividades e artefatos relacionados aos requisitos.",
        descricaoEn:
          "How RUP structures activities and artifacts related to requirements.",
      },
      {
        titulo: "Técnicas de Levantamento de Requisitos",
        tituloEn: "Requirements Elicitation Techniques",
        descricao:
          "Entrevistas, questionários, workshops, brainstorming, observação e prototipação.",
        descricaoEn:
          "Interviews, questionnaires, workshops, brainstorming, observation, and prototyping.",
      },
      {
        titulo: "Análise de Negócios e seu Papel na Engenharia de Requisitos",
        tituloEn: "Business Analysis and Its Role in Requirements Engineering",
        descricao:
          "Como compreender o contexto organizacional antes de definir o sistema.",
        descricaoEn:
          "How to understand the organizational context before defining the system.",
      },
      {
        titulo: "Modelagem Empresarial e Arquiteturas de Negócios",
        tituloEn: "Business Modeling and Business Architectures",
        descricao:
          "Mapeamento de processos organizacionais e alinhamento entre estratégia e tecnologia.",
        descricaoEn:
          "Mapping organizational processes and aligning strategy with technology.",
      },
      {
        titulo: "Técnicas de Análise de Negócios Aplicadas à ER",
        tituloEn: "Business Analysis Techniques Applied to RE",
        descricao:
          "Uso de ferramentas como SWOT, BPMN e análise de processos para entendimento do domínio.",
        descricaoEn:
          "Use of tools such as SWOT, BPMN, and process analysis to understand the domain.",
      },
      {
        titulo: "Ferramentas de Modelagem na Engenharia de Requisitos",
        tituloEn: "Modeling Tools in Requirements Engineering",
        descricao:
          "Softwares e técnicas para documentação e representação visual dos requisitos.",
        descricaoEn:
          "Software and techniques for documentation and visual representation of requirements.",
      },
      {
        titulo: "UML na Especificação de Requisitos",
        tituloEn: "UML in Requirements Specification",
        descricao:
          "Uso de diagramas como Caso de Uso, Atividades e Classes para representação estruturada.",
        descricaoEn:
          "Use of diagrams such as Use Case, Activity, and Class diagrams for structured representation.",
      },
      {
        titulo: "Documento de Requisitos: Como Estruturar um SRS",
        tituloEn: "Requirements Document: How to Structure an SRS",
        descricao:
          "Boas práticas para elaboração do Software Requirements Specification.",
        descricaoEn:
          "Best practices for preparing a Software Requirements Specification.",
      },
      {
        titulo: "Verificação e Validação de Requisitos",
        tituloEn: "Requirements Verification and Validation",
        descricao:
          "Garantia de que os requisitos estão corretos, completos e alinhados às necessidades do cliente.",
        descricaoEn:
          "Ensuring that requirements are correct, complete, and aligned with client needs.",
      },
      {
        titulo: "Gerência de Requisitos e Controle de Mudanças",
        tituloEn: "Requirements Management and Change Control",
        descricao:
          "Controle de versões, rastreabilidade e impacto de alterações no projeto.",
        descricaoEn:
          "Version control, traceability, and impact of changes on the project.",
      },
      {
        titulo: "Rastreabilidade de Requisitos",
        tituloEn: "Requirements Traceability",
        descricao:
          "Relacionamento entre requisitos, código, testes e documentação.",
        descricaoEn:
          "Relationship between requirements, code, tests, and documentation.",
      },
      {
        titulo: "Reutilização de Requisitos",
        tituloEn: "Requirements Reuse",
        descricao:
          "Como reaproveitar requisitos em sistemas similares para reduzir custos e tempo.",
        descricaoEn:
          "How to reuse requirements in similar systems to reduce cost and time.",
      },
      {
        titulo: "Visão Estratégica na Engenharia de Requisitos",
        tituloEn: "Strategic Vision in Requirements Engineering",
        descricao:
          "Alinhamento entre objetivos organizacionais e desenvolvimento de software.",
        descricaoEn:
          "Alignment between organizational objectives and software development.",
      },
      {
        titulo: "Estudo de Caso: Falhas em Projetos por Problemas de Requisitos",
        tituloEn: "Case Study: Project Failures Caused by Requirements Problems",
        descricao:
          "Análise de exemplos reais onde falhas na definição de requisitos causaram prejuízos significativos.",
        descricaoEn:
          "Analysis of real examples in which failures in requirements definition caused significant losses.",
      },
    ],
  },
];

export function getTechPlayDisciplina(slug) {
  return techPlayDisciplinas.find((disciplina) => disciplina.slug === slug);
}

export function getTechPlayDisciplinaTitle(disciplina, isEn) {
  return isEn ? disciplina.tituloEn || disciplina.titulo : disciplina.titulo;
}

export function getTechPlayDisciplinaSummary(disciplina, isEn) {
  return isEn ? disciplina.resumoEn || disciplina.resumo : disciplina.resumo;
}

export function getTechPlayTemaTitle(tema, isEn) {
  return isEn ? tema.tituloEn || tema.titulo : tema.titulo;
}

export function getTechPlayTemaDescription(tema, isEn) {
  return isEn ? tema.descricaoEn || tema.descricao : tema.descricao;
}
