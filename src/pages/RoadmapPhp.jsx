import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";

function copy(pt, en) {
  return { pt, en };
}

function pickCopy(item, isEn) {
  return isEn ? item.en : item.pt;
}

const fases = [
  {
    titulo: copy("Fase 1 — Base da Linguagem e Runtime", "Phase 1 — Language and Runtime Foundation"),
    duracao: copy("2 a 3 semanas", "2 to 3 weeks"),
    topicos: [
      copy("O que é o PHP hoje: linguagem server-side, CLI e ecossistema web.", "What PHP is today: a server-side language, CLI runtime, and web ecosystem."),
      copy("Sintaxe base, tipos, arrays, strings, funções e fluxo de execução.", "Core syntax, types, arrays, strings, functions, and execution flow."),
      copy("PHP moderno: tipagem, null coalescing, match, enums e recursos do PHP 8+.", "Modern PHP: typing, null coalescing, match, enums, and PHP 8+ features."),
    ],
    praticas: [
      copy("Montar ambiente local com PHP CLI e executar scripts simples.", "Set up a local environment with PHP CLI and run simple scripts."),
      copy("Resolver exercícios de entrada, saída, funções e manipulação de arrays.", "Solve exercises on input, output, functions, and array manipulation."),
    ],
    entregavel: copy(
      "Repositório com fundamentos do PHP, exemplos comentados e scripts executáveis.",
      "Repository with PHP fundamentals, commented examples, and runnable scripts."
    ),
  },
  {
    titulo: copy("Fase 2 — Web, HTTP e Fundamentos de Aplicação", "Phase 2 — Web, HTTP, and Application Fundamentals"),
    duracao: copy("2 a 3 semanas", "2 to 3 weeks"),
    topicos: [
      copy("Requisição/resposta, formulários, métodos HTTP, sessão e cookies.", "Request/response, forms, HTTP methods, sessions, and cookies."),
      copy("Superglobais, sanitização inicial e organização de entrada de dados.", "Superglobals, initial sanitization, and input organization."),
      copy("Diferença entre PHP procedural, scripts simples e aplicações web estruturadas.", "Difference between procedural PHP, simple scripts, and structured web applications."),
    ],
    praticas: [
      copy("Criar mini app com formulário, validação e resposta renderizada.", "Build a mini app with forms, validation, and rendered responses."),
      copy("Explorar estados de sessão e fluxo de autenticação básico.", "Explore session state and basic authentication flow."),
    ],
    entregavel: copy(
      "Aplicação web simples com rotas básicas, formulários e validação inicial.",
      "Simple web application with basic routes, forms, and initial validation."
    ),
  },
  {
    titulo: copy("Fase 3 — Composer, Pacotes e Qualidade de Código", "Phase 3 — Composer, Packages, and Code Quality"),
    duracao: copy("2 a 3 semanas", "2 to 3 weeks"),
    topicos: [
      copy("Composer, autoload PSR-4, dependências e organização por namespaces.", "Composer, PSR-4 autoloading, dependencies, and namespace organization."),
      copy("Padrões PSR, php-cs-fixer, Pint, PHPStan/Psalm e análise estática.", "PSR standards, php-cs-fixer, Pint, PHPStan/Psalm, and static analysis."),
      copy("PHPUnit/Pest para testes unitários e de integração.", "PHPUnit/Pest for unit and integration testing."),
    ],
    praticas: [
      copy("Organizar projeto PHP com autoload, pastas e scripts de qualidade.", "Organize a PHP project with autoloading, folders, and quality scripts."),
      copy("Adicionar testes e análise estática em um domínio simples.", "Add tests and static analysis to a simple domain."),
    ],
    entregavel: copy(
      "Projeto com Composer, padrões PSR, testes e linting configurados.",
      "Project with Composer, PSR standards, tests, and linting configured."
    ),
  },
  {
    titulo: copy("Fase 4 — Banco de Dados, SQL e Persistência", "Phase 4 — Databases, SQL, and Persistence"),
    duracao: copy("3 a 4 semanas", "3 to 4 weeks"),
    topicos: [
      copy("PDO, prepared statements, transações e tratamento seguro de queries.", "PDO, prepared statements, transactions, and safe query handling."),
      copy("MySQL/PostgreSQL com migrations, seeders e modelagem prática.", "MySQL/PostgreSQL with migrations, seeders, and practical modeling."),
      copy("Noções de ORM e comparação entre acesso direto e abstração.", "ORM basics and comparison between direct access and abstraction."),
    ],
    praticas: [
      copy("Criar CRUD com persistência relacional e regras de negócio simples.", "Create a CRUD with relational persistence and simple business rules."),
      copy("Medir impacto de índices, paginação e consultas mal estruturadas.", "Measure the impact of indexes, pagination, and poorly structured queries."),
    ],
    entregavel: copy(
      "Aplicação com banco relacional, migrations, CRUD completo e boas práticas de consulta.",
      "Application with a relational database, migrations, full CRUD, and query best practices."
    ),
  },
  {
    titulo: copy("Fase 5 — Orientação a Objetos e Arquitetura em PHP", "Phase 5 — Object-Oriented Design and Architecture in PHP"),
    duracao: copy("2 a 4 semanas", "2 to 4 weeks"),
    topicos: [
      copy("Classes, interfaces, traits, exceptions, SOLID e contratos claros.", "Classes, interfaces, traits, exceptions, SOLID, and clear contracts."),
      copy("Camadas, serviços, actions, repositories e separação de responsabilidades.", "Layers, services, actions, repositories, and separation of responsibilities."),
      copy("Aplicação de Clean Architecture e código orientado a domínio.", "Applying Clean Architecture and domain-oriented code."),
    ],
    praticas: [
      copy("Refatorar um CRUD procedural para arquitetura em camadas.", "Refactor a procedural CRUD into a layered architecture."),
      copy("Criar regras de negócio testáveis e desacopladas de framework.", "Create business rules that are testable and decoupled from frameworks."),
    ],
    entregavel: copy(
      "Base arquitetural PHP com domínio, serviços e cobertura de testes nas regras centrais.",
      "PHP architectural base with domain, services, and test coverage on core rules."
    ),
  },
  {
    titulo: copy("Fase 6 — Frameworks: Laravel, Symfony e Ecossistema", "Phase 6 — Frameworks: Laravel, Symfony, and Ecosystem"),
    duracao: copy("4 a 6 semanas", "4 to 6 weeks"),
    topicos: [
      copy("Laravel: rotas, controllers, Eloquent, queues, jobs, events e policies.", "Laravel: routes, controllers, Eloquent, queues, jobs, events, and policies."),
      copy("Symfony: components, DI container, HTTP kernel e estrutura enterprise.", "Symfony: components, DI container, HTTP kernel, and enterprise structure."),
      copy("Quando usar framework completo, microframework ou PHP puro.", "When to use a full framework, a microframework, or plain PHP."),
    ],
    praticas: [
      copy("Construir API com autenticação, validação, filas e documentação.", "Build an API with authentication, validation, queues, and documentation."),
      copy("Comparar Laravel e Symfony em organização, velocidade e manutenibilidade.", "Compare Laravel and Symfony in organization, speed, and maintainability."),
    ],
    entregavel: copy(
      "Projeto com framework PHP moderno, autenticação, banco e documentação técnica.",
      "Project with a modern PHP framework, authentication, database integration, and technical documentation."
    ),
  },
  {
    titulo: copy("Fase 7 — Segurança, Performance e Produção", "Phase 7 — Security, Performance, and Production"),
    duracao: copy("3 a 4 semanas", "3 to 4 weeks"),
    topicos: [
      copy("OWASP no contexto PHP: XSS, CSRF, SQL Injection, upload e autenticação.", "OWASP in the PHP context: XSS, CSRF, SQL Injection, upload, and authentication."),
      copy("Cache, OPcache, Redis, filas, sessões e observabilidade.", "Cache, OPcache, Redis, queues, sessions, and observability."),
      copy("Deploy com Docker, Nginx/Apache, variáveis de ambiente e CI/CD.", "Deployment with Docker, Nginx/Apache, environment variables, and CI/CD."),
    ],
    praticas: [
      copy("Endurecer uma aplicação com cabeçalhos, validações e limites de entrada.", "Harden an application with headers, validation, and input limits."),
      copy("Empacotar projeto em container e publicar em ambiente de staging.", "Package a project into a container and publish it to a staging environment."),
    ],
    entregavel: copy(
      "Aplicação PHP pronta para staging com segurança base, logs e deploy documentado.",
      "PHP application ready for staging with baseline security, logs, and documented deployment."
    ),
  },
  {
    titulo: copy("Fase 8 — Portfólio, Mercado e Evolução", "Phase 8 — Portfolio, Market, and Growth"),
    duracao: copy("Contínua", "Continuous"),
    topicos: [
      copy("Mercado real em PHP: legado, CMS, APIs, SaaS e sistemas internos.", "Real-world PHP market: legacy systems, CMSs, APIs, SaaS, and internal platforms."),
      copy("Escolha de trilha: backend, full stack com Laravel ou plataforma enterprise.", "Track selection: backend, full stack with Laravel, or enterprise platform work."),
      copy("Leitura crítica de documentação oficial e roadmaps da comunidade.", "Critical reading of official documentation and community roadmaps."),
    ],
    praticas: [
      copy("Publicar projetos com README, arquitetura e decisões técnicas.", "Publish projects with README files, architecture notes, and technical decisions."),
      copy("Montar plano de especialização entre Laravel, Symfony, WordPress headless ou APIs.", "Build a specialization plan across Laravel, Symfony, headless WordPress, or APIs."),
    ],
    entregavel: copy(
      "Portfólio PHP com projetos reais, trilha clara de evolução e preparação para entrevistas.",
      "PHP portfolio with real projects, a clear growth track, and interview preparation."
    ),
  },
];

const matrizCompetencias = [
  {
    eixo: copy("Base PHP", "PHP Foundation"),
    itens: [
      copy("Sintaxe, tipos, arrays, funções e tratamento de erros.", "Syntax, types, arrays, functions, and error handling."),
      copy("HTTP, formulários, sessão, cookies e fluxo web.", "HTTP, forms, sessions, cookies, and web flow."),
      copy("Leitura de documentação oficial e compatibilidade por versão.", "Reading official docs and understanding version compatibility."),
    ],
  },
  {
    eixo: copy("Engenharia e Qualidade", "Engineering and Quality"),
    itens: [
      copy("Composer, PSR, autoload e organização modular.", "Composer, PSR, autoloading, and modular organization."),
      copy("Testes, análise estática e padronização de código.", "Testing, static analysis, and code standardization."),
      copy("Refatoração, OOP e arquitetura em camadas.", "Refactoring, OOP, and layered architecture."),
    ],
  },
  {
    eixo: copy("Dados e Aplicações", "Data and Applications"),
    itens: [
      copy("SQL, PDO, migrations e consultas eficientes.", "SQL, PDO, migrations, and efficient queries."),
      copy("Laravel/Symfony para APIs e sistemas web robustos.", "Laravel/Symfony for robust APIs and web systems."),
      copy("Integrações, filas, autenticação e regras de negócio.", "Integrations, queues, authentication, and business rules."),
    ],
  },
  {
    eixo: copy("Operação e Mercado", "Operations and Market"),
    itens: [
      copy("Segurança aplicada ao backend PHP.", "Security applied to PHP backends."),
      copy("Deploy, observabilidade, cache e performance.", "Deployment, observability, caching, and performance."),
      copy("Escolha de nicho conforme contexto de produto e empresa.", "Choosing a niche according to product and company context."),
    ],
  },
];

const plano90Dias = [
  {
    periodo: copy("Dias 1–20", "Days 1–20"),
    foco: copy("Fundamentos e ambiente", "Fundamentals and environment"),
    entregas: [
      copy("PHP CLI, sintaxe, arrays, funções e scripts básicos.", "PHP CLI, syntax, arrays, functions, and basic scripts."),
      copy("Primeiro repositório com exercícios e mini desafios.", "First repository with exercises and mini challenges."),
    ],
  },
  {
    periodo: copy("Dias 21–45", "Days 21–45"),
    foco: copy("Web e persistência", "Web and persistence"),
    entregas: [
      copy("Mini aplicação com formulários, sessão e CRUD relacional.", "Mini application with forms, sessions, and relational CRUD."),
      copy("Uso de PDO, validação e estrutura de projeto mais limpa.", "Use of PDO, validation, and a cleaner project structure."),
    ],
  },
  {
    periodo: copy("Dias 46–70", "Days 46–70"),
    foco: copy("Qualidade e arquitetura", "Quality and architecture"),
    entregas: [
      copy("Composer, PSR-4, testes, análise estática e refatoração.", "Composer, PSR-4, tests, static analysis, and refactoring."),
      copy("Projeto organizado em camadas com regras de negócio isoladas.", "Project organized in layers with isolated business rules."),
    ],
  },
  {
    periodo: copy("Dias 71–90", "Days 71–90"),
    foco: copy("Framework e produção", "Framework and production"),
    entregas: [
      copy("API ou sistema web em Laravel/Symfony com autenticação.", "API or web system in Laravel/Symfony with authentication."),
      copy("Deploy em staging com Docker, banco e documentação.", "Staging deployment with Docker, database integration, and documentation."),
    ],
  },
];

const especializacoes = [
  {
    nome: copy("Laravel Back-end", "Laravel Backend"),
    foco: copy("APIs, SaaS, autenticação, filas, jobs e produtividade rápida.", "APIs, SaaS, authentication, queues, jobs, and fast productivity."),
    stack: copy("Laravel, Eloquent, queues, Redis, PHPUnit/Pest, Docker.", "Laravel, Eloquent, queues, Redis, PHPUnit/Pest, Docker."),
  },
  {
    nome: copy("Symfony e Enterprise", "Symfony and Enterprise"),
    foco: copy("Sistemas corporativos, modularidade forte e integração de componentes.", "Enterprise systems, strong modularity, and component integration."),
    stack: copy("Symfony, Doctrine, Messenger, DI Container, PHPUnit.", "Symfony, Doctrine, Messenger, DI Container, PHPUnit."),
  },
  {
    nome: copy("APIs e Integrações", "APIs and Integrations"),
    foco: copy("Serviços HTTP, autenticação, webhooks, filas e contratos.", "HTTP services, authentication, webhooks, queues, and contracts."),
    stack: copy("PHP 8+, OpenAPI, JWT, queues, Redis, observabilidade.", "PHP 8+, OpenAPI, JWT, queues, Redis, observability."),
  },
  {
    nome: copy("Full Stack com PHP", "Full Stack with PHP"),
    foco: copy("Entrega ponta a ponta com Blade/Inertia/Livewire ou front separado.", "End-to-end delivery with Blade/Inertia/Livewire or a separate frontend."),
    stack: copy("Laravel + front-end moderno + banco + deploy + testes.", "Laravel + modern frontend + database + deployment + tests."),
  },
];

const stackFerramentas = [
  {
    categoria: copy("Ambiente base", "Core environment"),
    ferramentas: copy("PHP 8.4/8.5, Composer, Git/GitHub, VS Code, Docker", "PHP 8.4/8.5, Composer, Git/GitHub, VS Code, Docker"),
  },
  {
    categoria: copy("Qualidade e testes", "Quality and testing"),
    ferramentas: copy("PHPUnit ou Pest, PHPStan/Psalm, PHP-CS-Fixer/Pint, Rector", "PHPUnit or Pest, PHPStan/Psalm, PHP-CS-Fixer/Pint, Rector"),
  },
  {
    categoria: copy("Aplicação e dados", "Application and data"),
    ferramentas: copy("PDO, MySQL/PostgreSQL, Redis, filas, cache e migrations", "PDO, MySQL/PostgreSQL, Redis, queues, cache, and migrations"),
  },
  {
    categoria: copy("Frameworks", "Frameworks"),
    ferramentas: copy("Laravel, Symfony, Slim e componentes PSR", "Laravel, Symfony, Slim, and PSR components"),
  },
  {
    categoria: copy("Produção", "Production"),
    ferramentas: copy("Nginx/Apache, OPcache, CI/CD, logs, monitoramento e staging", "Nginx/Apache, OPcache, CI/CD, logs, monitoring, and staging"),
  },
];

const statusVersoes = [
  {
    versao: "PHP 8.2",
    status: copy("somente correções de segurança até 31 de dezembro de 2026", "security fixes only until December 31, 2026"),
  },
  {
    versao: "PHP 8.3",
    status: copy("somente correções de segurança até 31 de dezembro de 2027", "security fixes only until December 31, 2027"),
  },
  {
    versao: "PHP 8.4",
    status: copy("suporte ativo até 31 de dezembro de 2026", "active support until December 31, 2026"),
  },
  {
    versao: "PHP 8.5",
    status: copy("suporte ativo até 31 de dezembro de 2027", "active support until December 31, 2027"),
  },
];

const errosComuns = [
  copy("Aprender framework cedo demais sem base sólida da linguagem.", "Learning a framework too early without a solid language foundation."),
  copy("Ignorar Composer, padrões PSR e qualidade estática.", "Ignoring Composer, PSR standards, and static quality tooling."),
  copy("Misturar regra de negócio, SQL e controle HTTP no mesmo arquivo.", "Mixing business rules, SQL, and HTTP control in the same file."),
  copy("Desconsiderar segurança básica em autenticação, upload e formulários.", "Ignoring basic security in authentication, uploads, and forms."),
  copy("Ficar preso em tutoriais sem entregar projetos reais e documentados.", "Getting stuck in tutorials instead of shipping real documented projects."),
];

const projetosPortfolio = [
  {
    nome: copy("API de Gestão Comercial", "Commercial Management API"),
    escopo: copy("CRUD, autenticação, paginação, filtros e documentação OpenAPI.", "CRUD, authentication, pagination, filters, and OpenAPI documentation."),
  },
  {
    nome: copy("Painel Administrativo com Laravel", "Laravel Admin Panel"),
    escopo: copy("Usuários, permissões, dashboard, auditoria e fila de jobs.", "Users, permissions, dashboard, auditing, and job queue."),
  },
  {
    nome: copy("Sistema de Conteúdo com PHP Moderno", "Content System with Modern PHP"),
    escopo: copy("Módulos, camadas, banco relacional, testes e deploy em staging.", "Modules, layers, relational database, tests, and staging deployment."),
  },
  {
    nome: copy("Microserviço de Integração", "Integration Microservice"),
    escopo: copy("Consumo de API externa, fila, retry, logs e métricas básicas.", "External API consumption, queue, retries, logs, and basic metrics."),
  },
  {
    nome: copy("Projeto Full Stack em PHP", "Full Stack PHP Project"),
    escopo: copy("Fluxo completo de produto com autenticação, pagamentos simulados e painel.", "Complete product flow with authentication, simulated payments, and a dashboard."),
  },
];

const rotinaEstudo = [
  copy("40 minutos de teoria com documentação oficial e uma referência comunitária.", "40 minutes of theory using official documentation and one community reference."),
  copy("60 a 90 minutos de prática com código executável e refatoração.", "60 to 90 minutes of practice with runnable code and refactoring."),
  copy("20 minutos para testes, leitura de erros e análise do stack trace.", "20 minutes for testing, error reading, and stack trace analysis."),
  copy("10 minutos de registro técnico do que mudou e do próximo passo.", "10 minutes of technical notes about what changed and the next step."),
];

const referenciasBase = [
  {
    nome: "roadmap.sh/php",
    tipo: copy("Mapa visual da trilha PHP.", "Visual map of the PHP track."),
    url: "https://roadmap.sh/php",
  },
  {
    nome: "techguide.sh PHP",
    tipo: copy("Trilha estruturada em português.", "Structured learning track in Portuguese."),
    url: "https://techguide.sh/pt-BR/path/php/",
  },
  {
    nome: "php.net supported versions",
    tipo: copy("Status oficial de versões suportadas do PHP.", "Official status of supported PHP versions."),
    url: "https://www.php.net/supported-versions.php",
  },
  {
    nome: "thecodeholic/php-developer-roadmap",
    tipo: copy("Roadmap comunitário com foco em desenvolvimento PHP.", "Community roadmap focused on PHP development."),
    url: "https://github.com/thecodeholic/php-developer-roadmap",
  },
  {
    nome: "elton182/php-fullstack-roadmap",
    tipo: copy("Visão full stack com PHP.", "Full stack roadmap with PHP."),
    url: "https://github.com/elton182/php-fullstack-roadmap",
  },
  {
    nome: "kamranahmedse/developer-roadmap",
    tipo: copy("Repositório central de roadmaps de desenvolvimento.", "Central repository of developer roadmaps."),
    url: "https://github.com/kamranahmedse/developer-roadmap",
  },
  {
    nome: "infinite-education/php-developer-roadmap",
    tipo: copy("Referência comunitária para progressão em PHP.", "Community reference for PHP progression."),
    url: "https://github.com/infinite-education/php-developer-roadmap",
  },
  {
    nome: "mahmoudmohamedramadan/Backend-Roadmap",
    tipo: copy("Contexto backend mais amplo para posicionar PHP.", "Broader backend context to position PHP."),
    url: "https://github.com/mahmoudmohamedramadan/Backend-Roadmap",
  },
  {
    nome: "mohamedheda/Php-Laravel-Roadmap-2023",
    tipo: copy("Foco em Laravel e ecossistema aplicado.", "Focus on Laravel and applied ecosystem."),
    url: "https://github.com/mohamedheda/Php-Laravel-Roadmap-2023",
  },
  {
    nome: "VK KPHP Roadmap",
    tipo: copy("Visão alternativa do ecossistema e performance em PHP.", "Alternative view of ecosystem and performance in PHP."),
    url: "https://vkcom.github.io/kphp/kphp-basics/roadmap.html",
  },
  {
    nome: "scm-rc/php-roadmap",
    tipo: copy("Mapa adicional da comunidade para estudo PHP.", "Additional community map for PHP study."),
    url: "https://github.com/scm-rc/php-roadmap",
  },
  {
    nome: "Roadmap 1 PHP from zero",
    tipo: copy("Artigo complementar com visão de progressão.", "Complementary article with a progression view."),
    url: "https://medium.com/@namobilegame/roadmap-1-php-from-zero-to-c79bb2def989",
  },
];

export default function RoadmapPhp() {
  const { text: uiText } = useContentTranslation();

  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = {
    title: isEn ? "PHP Roadmap" : "Roadmap de PHP",
    subtitle: isEn
      ? "A practical track to learn modern PHP, build backend applications, work with Laravel/Symfony, and ship production-ready systems."
      : "Trilha prática para aprender PHP moderno, construir aplicações back-end, trabalhar com Laravel/Symfony e entregar sistemas prontos para produção.",
    jokeTitle: isEn ? "Quick truth" : "Verdade rápida",
    jokeLead: isEn
      ? "The best choice is to study JavaScript."
      : "A melhor escolha é estudar JavaScript.",
    jokeBody: isEn
      ? "Just kidding. If your goal is pragmatic backend work, strong market demand, modern frameworks, and real-world enterprise systems, the serious content starts below."
      : "Brincadeira. Se o seu objetivo é backend pragmático, mercado forte, frameworks modernos e sistemas reais de empresa, o conteúdo sério começa logo abaixo.",
    howToUseTitle: isEn ? "How to use this track" : "Como usar esta trilha",
    howToUse: isEn
      ? [
          "Follow the phases in order and do not jump straight into a framework.",
          "Use the official PHP documentation to validate syntax, features, and compatibility.",
          "Build one deliverable per phase and keep everything versioned on GitHub.",
          "Choose a specialization only after mastering the language, quality, and deployment basics.",
        ]
      : [
          "Siga as fases em ordem e não pule direto para framework.",
          "Use a documentação oficial do PHP para validar sintaxe, recursos e compatibilidade.",
          "Feche cada fase com um entregável e mantenha tudo versionado no GitHub.",
          "Escolha especialização só depois de dominar linguagem, qualidade e deploy básico.",
        ],
    versionSection: isEn ? "Official version support snapshot" : "Recorte oficial de versões suportadas",
    versionSubtitle: isEn
      ? "Status checked on March 3, 2026, based on php.net."
      : "Status conferido em 3 de março de 2026, com base no php.net.",
    toolsStack: isEn ? "Tools and ecosystem stack" : "Stack de ferramentas e ecossistema",
    studyRoutine: isEn ? "Suggested study routine" : "Rotina de estudo sugerida",
  };

  return (
    <PageTemplate>
      <BackButton fallbackTo="/roadmaps" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">
        {uiText(t("roadmapPages.common.backToRoadmaps"))}
      </BackButton>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-3 3v-3H6a2 2 0 0 1-2-2V5Zm4 2v2h4V7H8Zm0 4v2h8v-2H8Zm6-4h2v2h-2V7Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>
      <PageDescription>{uiText(txt.subtitle)}</PageDescription></PageHeader>

      <div className="rounded-2xl p-6 md:p-8 mb-8 border border-amber-300/30 bg-[linear-gradient(135deg,rgba(120,53,15,0.92),rgba(69,26,3,0.88))] shadow-[0_24px_70px_rgba(120,53,15,0.3)]">
        <h2 className="text-2xl font-black text-amber-200 mb-3">{uiText(txt.jokeLead)}</h2>
        <p className="text-sm md:text-base text-amber-50/90 leading-7">{uiText(txt.jokeBody)}</p>
      </div>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2v2Zm1.1-7.8-.9.9A1.9 1.9 0 0 0 13 11h-2v-.5a3 3 0 0 1 .88-2.12l1.24-1.24A1.5 1.5 0 1 0 10 6H8a3.5 3.5 0 1 1 6.1 2.2Z" />
          </svg>
          <span>{uiText(txt.howToUseTitle)}</span>
        </h2>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside mt-4">
          {txt.howToUse.map((item) => (
            <li key={item} className="text-justify">
              {uiText(item)}
            </li>
          ))}
        </ol>
      </Panel>

      <div className="space-y-5 mb-10">
        {fases.map((fase) => (
          <Panel as="details" layout="plain" key={pickCopy(fase.titulo, isEn)}>
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path fill="currentColor" d="M11 2h2v4h-2V2Zm7.07 2.93 1.41 1.41-2.83 2.83-1.41-1.41 2.83-2.83ZM20 11h2v2h-2v-2ZM4 11h2v2H4v-2Zm2.34-4.66 1.41-1.41 2.83 2.83-1.41 1.41-2.83-2.83ZM12 7a5 5 0 1 0 5 5h-5V7Z" />
                  </svg>
                  <span>{uiText(pickCopy(fase.titulo, isEn))}</span>
                </h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-600 text-slate-300">
                  {uiText(pickCopy(fase.duracao, isEn))}
                </span>
              </div>
            </summary>

            <div className="mt-5">
              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">{uiText(t("roadmapPages.common.topics"))}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-5">
                {fase.topicos.map((topico) => (
                  <li key={pickCopy(topico, isEn)} className="text-justify">
                    {uiText(pickCopy(topico, isEn))}
                  </li>
                ))}
              </ul>

              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">{uiText(t("roadmapPages.common.practices"))}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-5">
                {fase.praticas.map((pratica) => (
                  <li key={pickCopy(pratica, isEn)} className="text-justify">
                    {uiText(pickCopy(pratica, isEn))}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-slate-200">
                <span className="font-semibold text-cyan-300">{uiText(t("roadmapPages.common.deliverable"))}:</span>{" "}
                {uiText(pickCopy(fase.entregavel, isEn))}
              </p>
            </div>
          </Panel>
        ))}
      </div>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6H6v6h3a3 3 0 1 1 0 6H6a3 3 0 0 1-3-3V6Zm12-3h3a3 3 0 1 1 0 6h-3v2h-2V6a3 3 0 0 1 3-3Zm0 4h3a1 1 0 1 0 0-2h-3a1 1 0 0 0 0 2Zm-2 6h2v2h3a1 1 0 1 1 0 2h-3a3 3 0 0 1-3-3v-1h1Z" />
            </svg>
            <span>{uiText(isEn ? "Competency matrix" : "Matriz de competências")}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {matrizCompetencias.map((bloco) => (
            <article key={pickCopy(bloco.eixo, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100 mb-2">{uiText(pickCopy(bloco.eixo, isEn))}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                {bloco.itens.map((item) => (
                  <li key={pickCopy(item, isEn)} className="text-justify">
                    {uiText(pickCopy(item, isEn))}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 6a2 2 0 0 1 2-2h2V2h2v2h4V2h2v2h2a2 2 0 0 1 2 2v3H4V6Zm0 5h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Zm3 2v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Z" />
            </svg>
            <span>{uiText(t("roadmapPages.common.intensive90Days"))}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {plano90Dias.map((bloco) => (
            <article key={pickCopy(bloco.periodo, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300 mb-1">
                {uiText(pickCopy(bloco.periodo, isEn))}
              </p>
              <h3 className="text-base font-semibold text-slate-100 mb-2">{uiText(pickCopy(bloco.foco, isEn))}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                {bloco.entregas.map((item) => (
                  <li key={pickCopy(item, isEn)} className="text-justify">
                    {uiText(pickCopy(item, isEn))}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 3 2 7l10 4 8-3.2V17h2V7L12 3Zm-6 8v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11l-6 2.4L6 11Z" />
            </svg>
            <span>{uiText(t("roadmapPages.common.specializations"))}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {especializacoes.map((item) => (
            <article key={pickCopy(item.nome, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{uiText(pickCopy(item.nome, isEn))}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{uiText(pickCopy(item.foco, isEn))}</p>
              <p className="text-xs text-slate-400 mt-2">
                <span className="font-semibold text-slate-300">{uiText(t("roadmapPages.common.stack"))}:</span>{" "}
                {uiText(pickCopy(item.stack, isEn))}
              </p>
            </article>
          ))}
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M3 5a2 2 0 0 1 2-2h6v2H5v14h6v2H5a2 2 0 0 1-2-2V5Zm16 14h-6v2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-6v2h6v14Zm-9.3-3.3a1 1 0 0 1 0-1.4L12 12 9.7 9.7a1 1 0 1 1 1.4-1.4l3 3a1 1 0 0 1 0 1.4l-3 3a1 1 0 0 1-1.4 0Z" />
              </svg>
              <span>{uiText(txt.toolsStack)}</span>
            </h2>
          </summary>
          <div className="space-y-4 mt-4">
            {stackFerramentas.map((item) => (
              <article key={pickCopy(item.categoria, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                <h3 className="font-semibold text-slate-100">{uiText(pickCopy(item.categoria, isEn))}</h3>
                <p className="text-sm text-slate-300 mt-1 text-justify">{uiText(pickCopy(item.ferramentas, isEn))}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 5a1 1 0 0 1 1 1v3.59l2.7 2.7a1 1 0 0 1-1.4 1.42l-3-3A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1Z" />
              </svg>
              <span>{uiText(txt.versionSection)}</span>
            </h2>
          </summary>
          <p className="text-sm text-slate-300 mt-4 mb-4">{uiText(txt.versionSubtitle)}</p>
          <div className="space-y-3">
            {statusVersoes.map((item) => (
              <article key={item.versao} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                <h3 className="font-semibold text-slate-100">{uiText(item.versao)}</h3>
                <p className="text-sm text-slate-300 mt-1 text-justify">{uiText(pickCopy(item.status, isEn))}</p>
              </article>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9h-9V3Zm-1 0v10h10a10 10 0 1 1-10-10Z" />
              </svg>
              <span>{uiText(txt.studyRoutine)}</span>
            </h2>
          </summary>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mt-4">
            {rotinaEstudo.map((item) => (
              <li key={pickCopy(item, isEn)} className="text-justify">
                {uiText(pickCopy(item, isEn))}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.3 13.3-1.4 1.4L12 13.8l-2.9 2.9-1.4-1.4 2.9-2.9-2.9-2.9 1.4-1.4L12 11l2.9-2.9 1.4 1.4-2.9 2.9 2.9 2.9Z" />
              </svg>
              <span>{uiText(t("roadmapPages.common.commonMistakesToAvoid"))}</span>
            </h2>
          </summary>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mt-4">
            {errosComuns.map((item) => (
              <li key={pickCopy(item, isEn)} className="text-justify">
                {uiText(pickCopy(item, isEn))}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2H4V5Zm0 4h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Zm4 3a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Zm0 4a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H8Z" />
            </svg>
            <span>{uiText(t("roadmapPages.common.portfolioProjects"))}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {projetosPortfolio.map((item) => (
            <article key={pickCopy(item.nome, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{uiText(pickCopy(item.nome, isEn))}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{uiText(pickCopy(item.escopo, isEn))}</p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 4a8 8 0 0 1 8 8v7a1 1 0 1 1-2 0v-7a6 6 0 1 0-12 0v7a1 1 0 1 1-2 0v-7a8 8 0 0 1 8-8Zm-1 8h2v6h-2v-6Zm0-4h2v2h-2V8Z" />
            </svg>
            <span>{uiText(t("roadmapPages.common.baseReferencesUsed"))}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {referenciasBase.map((item) => (
            <article key={item.url} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{uiText(item.nome)}</h3>
              <p className="text-sm text-slate-300 mt-1">{uiText(pickCopy(item.tipo, isEn))}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cyan-300 hover:text-cyan-200 underline mt-2 inline-block"
              >
                {uiText(t("roadmapPages.common.openReference"))}
              </a>
            </article>
          ))}
        </div>
      </Panel>
    </PageTemplate>
  );
}
