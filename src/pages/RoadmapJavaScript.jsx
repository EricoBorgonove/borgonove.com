import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";
import { translatePtToEnWithMap } from "../utils/ptEnTranslate";
import roadmapJavaScriptEnMap from "../data/roadmap-javascript-en-map.json";

const fases = [
  {
    titulo: "Fase 1 — Fundamentos da Linguagem",
    duracao: "2 a 3 semanas",
    topicos: [
      "História do JavaScript, ECMAScript e cenários de uso (browser, Node.js, automação).",
      "Sintaxe básica, variáveis (var/let/const), tipos primitivos e objetos.",
      "Coerção de tipos, comparação (== vs ===), truthy/falsy e boas práticas iniciais.",
      "Entrada e saída de dados, operadores, precedência e expressões.",
    ],
    praticas: [
      "Resolver 30 exercícios de lógica com JavaScript puro.",
      "Refazer exercícios explorando edge cases de tipo e comparação.",
      "Documentar exemplos de bugs comuns de coerção e como evitar.",
    ],
    entregavel:
      "Repositório com fundamentos, exercícios organizados por tema e explicações curtas por arquivo.",
  },
  {
    titulo: "Fase 2 — Estruturas de Controle e Funções",
    duracao: "2 a 4 semanas",
    topicos: [
      "Condicionais (if/switch), loops (for/while/do...while) e controle de fluxo.",
      "Funções declarativas, expressões, arrow functions e parâmetros (default/rest).",
      "Escopo, hoisting, closures e contexto de execução.",
      "this, call, apply, bind e diferenças entre função normal e arrow.",
    ],
    praticas: [
      "Implementar mini utilitários com funções reutilizáveis.",
      "Resolver problemas com laços aninhados e validações robustas.",
      "Refatorar funções longas em módulos menores e testáveis.",
    ],
    entregavel:
      "Coleção de funções utilitárias com testes manuais e casos de borda documentados.",
  },
  {
    titulo: "Fase 3 — Arrays, Objetos e Métodos Modernos",
    duracao: "2 a 3 semanas",
    topicos: [
      "Arrays, objetos, map/filter/reduce/find/some/every e métodos de string.",
      "Destructuring, spread/rest, optional chaining e nullish coalescing.",
      "Map, Set, WeakMap, WeakSet e escolha correta por contexto.",
      "Imutabilidade básica e atualização de estruturas sem efeitos colaterais.",
    ],
    praticas: [
      "Resolver 40 desafios de transformação de dados.",
      "Construir um analisador de dados com agregações e filtros.",
      "Comparar soluções imperativas e funcionais para o mesmo problema.",
    ],
    entregavel:
      "Módulo de transformação de dados com exemplos de uso e desempenho básico.",
  },
  {
    titulo: "Fase 4 — DOM, Browser APIs e Eventos",
    duracao: "2 a 4 semanas",
    topicos: [
      "DOM traversal/manipulação, criação de elementos e atualização de interface.",
      "Eventos, bubbling/capturing, delegação de eventos e preventDefault.",
      "LocalStorage/SessionStorage, FormData, URLSearchParams e Web APIs úteis.",
      "Noções de acessibilidade e semântica aplicadas ao JavaScript no front-end.",
    ],
    praticas: [
      "Criar aplicações pequenas sem framework (todo, filtro, busca, formulário).",
      "Implementar validação de formulário com feedback claro ao usuário.",
      "Construir componentes reutilizáveis com JS + HTML + CSS.",
    ],
    entregavel:
      "Projeto front-end vanilla com estrutura modular e manipulação completa de eventos.",
  },
  {
    titulo: "Fase 5 — Assíncrono, Event Loop e Comunicação",
    duracao: "3 a 4 semanas",
    topicos: [
      "Callbacks, Promises, async/await e tratamento de erros assíncronos.",
      "Event loop, call stack, microtasks/macrotasks e ordem de execução.",
      "Fetch API, consumo de APIs REST, serialização JSON e status HTTP.",
      "Retry, timeout, debounce/throttle e controle de concorrência básico.",
    ],
    praticas: [
      "Consumir APIs públicas com paginação e filtros.",
      "Simular falhas de rede e aplicar estratégia de recuperação.",
      "Construir dashboard simples com carregamento assíncrono.",
    ],
    entregavel:
      "Aplicação com integração de API, loading states, tratamento de erro e fallback.",
  },
  {
    titulo: "Fase 6 — Módulos, Tooling e Ecossistema",
    duracao: "2 a 3 semanas",
    topicos: [
      "ES Modules (import/export) e diferença para CommonJS.",
      "NPM, package.json, scripts, dependências e versionamento semântico.",
      "Bundlers e dev servers (Vite/webpack/esbuild): noções práticas.",
      "Lint/format (ESLint/Prettier) e configuração mínima de qualidade.",
    ],
    praticas: [
      "Organizar projeto em módulos claros por responsabilidade.",
      "Criar scripts de build/test/lint e validar pipeline local.",
      "Comparar bundle simples com diferentes estratégias de import.",
    ],
    entregavel:
      "Projeto modular com tooling configurado e guia de execução no README.",
  },
  {
    titulo: "Fase 7 — Orientação a Objetos e Padrões",
    duracao: "2 a 4 semanas",
    topicos: [
      "Prototypal inheritance, classes, encapsulamento e composição.",
      "Factory, module pattern e padrões de organização em JavaScript.",
      "Erro customizado, tratamento centralizado e fluxo de exceções.",
      "Princípios de código limpo aplicados à linguagem.",
    ],
    praticas: [
      "Criar domínio de negócio simples com classes e módulos.",
      "Refatorar código procedural para orientação a objetos quando fizer sentido.",
      "Aplicar padrões de projeto em cenários reais de estudo.",
    ],
    entregavel:
      "Mini biblioteca orientada a domínio com API estável e exemplos de uso.",
  },
  {
    titulo: "Fase 8 — Testes, Debug e Performance",
    duracao: "2 a 4 semanas",
    topicos: [
      "Debug no navegador/Node, breakpoints, inspeção de escopo e profiling.",
      "Testes unitários e de integração (Vitest/Jest) com casos críticos.",
      "Cobertura, test doubles e estratégia de testes por nível de risco.",
      "Medição de performance, memory leaks e otimizações de renderização.",
    ],
    praticas: [
      "Cobrir funções principais com suíte mínima de testes.",
      "Investigar e corrigir gargalos de performance em projeto existente.",
      "Criar checklist de release para reduzir regressões.",
    ],
    entregavel:
      "Projeto com testes automatizados, relatório de qualidade e melhorias de performance.",
  },
  {
    titulo: "Fase 9 — JavaScript no Back-end (Node.js)",
    duracao: "3 a 5 semanas",
    topicos: [
      "Runtime Node.js, módulos nativos, streams, filesystem e processo.",
      "APIs HTTP com Express/Fastify, middlewares e validação de entrada.",
      "Autenticação básica (JWT/sessão), segurança e tratamento de erros.",
      "Integração com banco de dados e organização em camadas.",
    ],
    praticas: [
      "Construir API REST com CRUD completo e validação.",
      "Adicionar logs, paginação, filtros e tratamento de falhas.",
      "Escrever testes para rotas e regras de negócio principais.",
    ],
    entregavel:
      "API Node.js pronta para portfólio com documentação e coleção de testes.",
  },
  {
    titulo: "Fase 10 — Carreira, Especialização e Portfólio",
    duracao: "Contínua",
    topicos: [
      "Escolha de trilha: Front-end, Back-end, Full Stack, Tooling ou Performance.",
      "TypeScript para robustez e escalabilidade em projetos reais.",
      "Arquitetura, revisão de código, PRs e colaboração em equipe.",
      "Preparação para entrevistas técnicas e resolução orientada por trade-offs.",
    ],
    praticas: [
      "Publicar de 4 a 6 projetos com documentação profissional.",
      "Escrever artigos curtos de aprendizado e decisões técnicas.",
      "Simular entrevistas e desafios práticos com limite de tempo.",
    ],
    entregavel:
      "Portfólio JavaScript completo com trilha clara de evolução técnica.",
  },
];

const matrizCompetencias = [
  {
    eixo: "Core JavaScript",
    itens: [
      "Tipos, coerção, operadores e controle de fluxo.",
      "Funções, escopo, closures, this e protótipos.",
      "Estruturas de dados nativas e manipulação eficiente.",
    ],
  },
  {
    eixo: "Ambiente e Web",
    itens: [
      "DOM, eventos, APIs do navegador e acessibilidade básica.",
      "HTTP, consumo de APIs, estados assíncronos e erros.",
      "Módulos, empacotamento e organização de projetos.",
    ],
  },
  {
    eixo: "Qualidade",
    itens: [
      "Debug estratégico e rastreio de comportamento assíncrono.",
      "Testes, cobertura e prevenção de regressões.",
      "Performance, memória e análise de gargalos.",
    ],
  },
  {
    eixo: "Profissional",
    itens: [
      "Versionamento, PRs, revisão de código e comunicação técnica.",
      "Padrões arquiteturais e legibilidade de longo prazo.",
      "Evolução para TypeScript e frameworks conforme objetivo.",
    ],
  },
];

const plano90Dias = [
  {
    periodo: "Dias 1–20",
    foco: "Base sólida de linguagem",
    entregas: [
      "Fundamentos da linguagem, tipos, funções e controle de fluxo.",
      "40 exercícios progressivos e documentação de aprendizados.",
      "Primeiro mini projeto em JavaScript puro.",
    ],
  },
  {
    periodo: "Dias 21–45",
    foco: "DOM + assíncrono",
    entregas: [
      "Manipulação de interface com eventos e formulários.",
      "Consumo de API com tratamento de erro e loading states.",
      "Projeto web funcional sem framework.",
    ],
  },
  {
    periodo: "Dias 46–70",
    foco: "Módulos + qualidade",
    entregas: [
      "Arquitetura modular com ESM e scripts npm.",
      "Linter, formatação e primeiros testes automatizados.",
      "Refatoração de projeto com foco em legibilidade.",
    ],
  },
  {
    periodo: "Dias 71–90",
    foco: "Portfólio orientado a vaga",
    entregas: [
      "Projeto 1 (Front-end) e projeto 2 (API Node.js).",
      "README profissional com decisões técnicas e trade-offs.",
      "Checklist de preparação para entrevistas JavaScript.",
    ],
  },
];

const especializacoes = [
  {
    nome: "Front-end JavaScript",
    foco: "Interfaces interativas, estado, performance e experiência do usuário.",
    stack: "DOM, Web APIs, React/Vue, roteamento, testes de interface.",
  },
  {
    nome: "Back-end com Node.js",
    foco: "APIs escaláveis, validação, segurança e integração de dados.",
    stack: "Node.js, Express/Fastify, autenticação, SQL/NoSQL, testes de API.",
  },
  {
    nome: "Full Stack JavaScript",
    foco: "Entrega ponta a ponta com consistência de arquitetura.",
    stack: "Front-end framework + APIs + banco + deploy + observabilidade.",
  },
  {
    nome: "TypeScript e Engenharia",
    foco: "Robustez, manutenção e produtividade em times.",
    stack: "TypeScript, tipagem avançada, contratos, lint estrito e DX.",
  },
  {
    nome: "Performance e Qualidade",
    foco: "Aplicações rápidas, estáveis e com baixo custo de manutenção.",
    stack: "Profiling, otimização, testes, monitoramento e CI/CD.",
  },
];

const stackFerramentas = [
  {
    categoria: "Base de desenvolvimento",
    ferramentas: "Node.js, npm/pnpm, Git/GitHub, VS Code, DevTools",
  },
  {
    categoria: "Qualidade e testes",
    ferramentas: "ESLint, Prettier, Vitest/Jest, Testing Library, Husky/lint-staged",
  },
  {
    categoria: "Build e empacotamento",
    ferramentas: "Vite, esbuild, webpack (legado), Babel",
  },
  {
    categoria: "Back-end",
    ferramentas: "Express/Fastify, dotenv, zod/joi, Prisma/ORM, Swagger/OpenAPI",
  },
  {
    categoria: "Deploy e operação",
    ferramentas: "Docker (básico), CI GitHub Actions, logs e monitoramento inicial",
  },
];

const projetosPortfolio = [
  {
    nome: "Painel de Tarefas Inteligente",
    escopo: "CRUD, filtros, prioridades, persistência local e atalhos de produtividade.",
  },
  {
    nome: "Dashboard de Consumo de APIs",
    escopo: "Integração com APIs externas, cache simples e tratamento de erros.",
  },
  {
    nome: "E-commerce Mini",
    escopo: "Catálogo, carrinho, regras de frete/desconto e fluxo de checkout simulado.",
  },
  {
    nome: "API REST para Gestão de Conteúdo",
    escopo: "CRUD, autenticação, paginação, validação e testes de integração.",
  },
  {
    nome: "Projeto TypeScript Migration",
    escopo: "Migrar app JS para TS com foco em segurança de tipos e manutenção.",
  },
];

const errosComuns = [
  "Pular fundamentos e ir direto para framework sem base da linguagem.",
  "Ignorar comportamento assíncrono e não entender event loop.",
  "Acumular lógica em funções gigantes sem modularização.",
  "Não tratar erros e entradas inválidas em fluxos críticos.",
  "Não testar cenários de borda nem medir impacto de mudanças.",
];

const rotinaEstudo = [
  "Teoria ativa: 40 minutos com anotações curtas e exemplos próprios.",
  "Prática dirigida: 60 a 90 minutos com exercícios por tópico.",
  "Revisão técnica: 20 minutos para refatorar a melhor solução.",
  "Registro de evolução: 10 minutos com resumo e próximos passos.",
];

const referenciasBase = [
  {
    nome: "roadmap.sh - JavaScript",
    tipo: "Trilha estruturada de tópicos e evolução na linguagem.",
    url: "https://roadmap.sh/javascript",
  },
  {
    nome: "GitHub Topics - javascript-roadmap",
    tipo: "Curadoria de roadmaps e trilhas da comunidade.",
    url: "https://github.com/topics/javascript-roadmap?l=typescript",
  },
  {
    nome: "JavaScript RoadMap (lucy-sees gist)",
    tipo: "Versão textual dos principais blocos do roadmap JavaScript.",
    url: "http://gist.github.com/lucy-sees/c567a7119d00bcd3026b0c087364e6a3",
  },
  {
    nome: "shubham-thakare/javascript-developer-roadmap",
    tipo: "Roteiro full-stack JavaScript com base e ferramentas.",
    url: "https://github.com/shubham-thakare/javascript-developer-roadmap",
  },
  {
    nome: "ErickWendel/javascript-expert-developer-roadmap",
    tipo: "Progressão para nível avançado e visão de engenharia.",
    url: "https://github.com/ErickWendel/javascript-expert-developer-roadmap",
  },
  {
    nome: "rahulaggarwal11/javascript-developer-roadmap",
    tipo: "Estrutura de estudo prática com recursos por tópico.",
    url: "https://github.com/rahulaggarwal11/javascript-developer-roadmap",
  },
  {
    nome: "harishsambasivam/JavaScript-roadmap-for-beginners",
    tipo: "Referência de início para novos desenvolvedores JavaScript.",
    url: "https://github.com/harishsambasivam/JavaScript-roadmap-for-beginners",
  },
];

export default function RoadmapJavaScript() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const tx = (value) => (isEn ? translatePtToEnWithMap(value, roadmapJavaScriptEnMap) : value);

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <BackButton fallbackTo="/roadmaps" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">
        {t("roadmapPages.common.backToRoadmaps")}
      </BackButton>

      <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path fill="currentColor" d="M4 4h16v16H4V4Zm2 2v12h12V6H6Zm4.2 8.8c0 1.2-.7 2.2-2.2 2.2-1 0-1.7-.4-2.1-1.2l1.4-.8c.2.4.3.7.7.7s.5-.2.5-.8V9h1.7v5.8Zm3.8 2.2c-1.4 0-2.3-.7-2.8-1.6l1.4-.8c.4.6.8.9 1.4.9s1-.3 1-.7c0-.5-.4-.7-1.2-1.1l-.4-.2c-1.2-.5-2-1.2-2-2.5 0-1.2 1-2.2 2.5-2.2 1.1 0 1.9.4 2.4 1.4l-1.3.8c-.3-.5-.6-.7-1.1-.7-.5 0-.8.3-.8.7 0 .5.3.6 1.1 1l.4.2c1.4.6 2.2 1.2 2.2 2.6 0 1.5-1.2 2.3-2.8 2.3Z" />
        </svg>
        <span>{t("roadmapPages.javascript.title")}</span>
      </h1>
      <p className="text-slate-400 text-lg mb-10">
        {t("roadmapPages.javascript.subtitle")}
      </p>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2v2Zm1.1-7.8-.9.9A1.9 1.9 0 0 0 13 11h-2v-.5a3 3 0 0 1 .88-2.12l1.24-1.24A1.5 1.5 0 1 0 10 6H8a3.5 3.5 0 1 1 6.1 2.2Z" />
          </svg>
          <span>{t("roadmapPages.common.howToUseTrack")}</span>
        </h2>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside mt-4">
          <li className="text-justify">{t("roadmapPages.javascript.howToUse.0")}</li>
          <li className="text-justify">{t("roadmapPages.javascript.howToUse.1")}</li>
          <li className="text-justify">{t("roadmapPages.javascript.howToUse.2")}</li>
          <li className="text-justify">{t("roadmapPages.javascript.howToUse.3")}</li>
        </ol>
      </div>

      <div className="space-y-5 mb-10">
        {fases.map((fase) => (
          <details key={fase.titulo} className="glass rounded-2xl p-6 md:p-8">
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path fill="currentColor" d="M11 2h2v4h-2V2Zm7.07 2.93 1.41 1.41-2.83 2.83-1.41-1.41 2.83-2.83ZM20 11h2v2h-2v-2ZM4 11h2v2H4v-2Zm2.34-4.66 1.41-1.41 2.83 2.83-1.41 1.41-2.83-2.83ZM12 7a5 5 0 1 0 5 5h-5V7Z" />
                  </svg>
                  <span>{tx(fase.titulo)}</span>
                </h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-600 text-slate-300">
                  {tx(fase.duracao)}
                </span>
              </div>
            </summary>

            <div className="mt-5">
              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">{t("roadmapPages.common.topics")}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-5">
                {fase.topicos.map((topico) => (
                  <li key={topico} className="text-justify">
                    {tx(topico)}
                  </li>
                ))}
              </ul>

              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">{t("roadmapPages.common.practices")}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-5">
                {fase.praticas.map((pratica) => (
                  <li key={pratica} className="text-justify">
                    {tx(pratica)}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-slate-200">
                <span className="font-semibold text-cyan-300">{t("roadmapPages.common.deliverable")}:</span> {tx(fase.entregavel)}
              </p>
            </div>
          </details>
        ))}
      </div>

      <details className="glass rounded-2xl p-6 md:p-8 mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6H6v6h3a3 3 0 1 1 0 6H6a3 3 0 0 1-3-3V6Zm12-3h3a3 3 0 1 1 0 6h-3v2h-2V6a3 3 0 0 1 3-3Zm0 4h3a1 1 0 1 0 0-2h-3a1 1 0 0 0 0 2Zm-2 6h2v2h3a1 1 0 1 1 0 2h-3a3 3 0 0 1-3-3v-1h1Z" />
            </svg>
            <span>{t("roadmapPages.javascript.competencyMatrix")}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {matrizCompetencias.map((bloco) => (
            <article key={bloco.eixo} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100 mb-2">{tx(bloco.eixo)}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                {bloco.itens.map((item) => (
                  <li key={item} className="text-justify">
                    {tx(item)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </details>

      <details className="glass rounded-2xl p-6 md:p-8 mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 6a2 2 0 0 1 2-2h2V2h2v2h4V2h2v2h2a2 2 0 0 1 2 2v3H4V6Zm0 5h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Zm3 2v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Z" />
            </svg>
            <span>{t("roadmapPages.common.intensive90Days")}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {plano90Dias.map((bloco) => (
            <article key={bloco.periodo} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300 mb-1">
                {tx(bloco.periodo)}
              </p>
              <h3 className="text-base font-semibold text-slate-100 mb-2">{tx(bloco.foco)}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                {bloco.entregas.map((item) => (
                  <li key={item} className="text-justify">
                    {tx(item)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </details>

      <details className="glass rounded-2xl p-6 md:p-8 mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 3 2 7l10 4 8-3.2V17h2V7L12 3Zm-6 8v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11l-6 2.4L6 11Z" />
            </svg>
            <span>{t("roadmapPages.common.specializations")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {especializacoes.map((item) => (
            <article key={item.nome} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{tx(item.nome)}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{tx(item.foco)}</p>
              <p className="text-xs text-slate-400 mt-2">
                <span className="font-semibold text-slate-300">{t("roadmapPages.common.stack")}:</span> {tx(item.stack)}
              </p>
            </article>
          ))}
        </div>
      </details>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <details className="glass rounded-2xl p-6 md:p-8">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 3c-4.97 0-9 1.34-9 3v12c0 1.66 4.03 3 9 3s9-1.34 9-3V6c0-1.66-4.03-3-9-3Zm0 2c4.25 0 7 .99 7 1s-2.75 1-7 1-7-.99-7-1 2.75-1 7-1Zm0 5c2.9 0 5.45-.46 7-1.18V12c0 .01-2.75 1-7 1s-7-.99-7-1V8.82C6.55 9.54 9.1 10 12 10Zm0 5c2.9 0 5.45-.46 7-1.18V18c0 .01-2.75 1-7 1s-7-.99-7-1v-4.18C6.55 14.54 9.1 15 12 15Z" />
              </svg>
              <span>{t("roadmapPages.javascript.toolsStack")}</span>
            </h2>
          </summary>
          <div className="space-y-4 mt-4">
            {stackFerramentas.map((item) => (
              <article key={item.categoria} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                <h3 className="font-semibold text-slate-100">{tx(item.categoria)}</h3>
                <p className="text-sm text-slate-300 mt-1 text-justify">{tx(item.ferramentas)}</p>
              </article>
            ))}
          </div>
        </details>

        <details className="glass rounded-2xl p-6 md:p-8">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.3 13.3-1.4 1.4L12 13.8l-2.9 2.9-1.4-1.4 2.9-2.9-2.9-2.9 1.4-1.4L12 11l2.9-2.9 1.4 1.4-2.9 2.9 2.9 2.9Z" />
              </svg>
              <span>{t("roadmapPages.common.commonMistakesToAvoid")}</span>
            </h2>
          </summary>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mt-4">
            {errosComuns.map((item) => (
              <li key={item} className="text-justify">
                {tx(item)}
              </li>
            ))}
          </ul>
        </details>
      </div>

      <details className="glass rounded-2xl p-6 md:p-8 mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2H4V5Zm0 4h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Zm4 3a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Zm0 4a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H8Z" />
            </svg>
            <span>{t("roadmapPages.common.portfolioProjects")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {projetosPortfolio.map((item) => (
            <article key={item.nome} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{tx(item.nome)}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{tx(item.escopo)}</p>
            </article>
          ))}
        </div>
      </details>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <details className="glass rounded-2xl p-6 md:p-8">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9h-9V3Zm-1 0v10h10a10 10 0 1 1-10-10Z" />
              </svg>
              <span>{t("roadmapPages.javascript.suggestedStudyRoutine")}</span>
            </h2>
          </summary>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mt-4">
            {rotinaEstudo.map((item) => (
              <li key={item} className="text-justify">
                {tx(item)}
              </li>
            ))}
          </ul>
        </details>
      </div>

      <details className="glass rounded-2xl p-6 md:p-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 4a8 8 0 0 1 8 8v7a1 1 0 1 1-2 0v-7a6 6 0 1 0-12 0v7a1 1 0 1 1-2 0v-7a8 8 0 0 1 8-8Zm-1 8h2v6h-2v-6Zm0-4h2v2h-2V8Z" />
            </svg>
            <span>{t("roadmapPages.common.baseReferencesUsed")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {referenciasBase.map((item) => (
            <article key={item.url} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{tx(item.nome)}</h3>
              <p className="text-sm text-slate-300 mt-1">{tx(item.tipo)}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cyan-300 hover:text-cyan-200 underline mt-2 inline-block"
              >
                {t("roadmapPages.common.openReference")}
              </a>
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}
