import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";
import { translatePtToEnWithMap } from "../utils/ptEnTranslate";
import roadmapLogicEnMap from "../data/roadmap-logic-en-map.json";

const fases = [
  {
    titulo: "Fase 1 — Base Computacional e Ambiente",
    duracao: "1 a 2 semanas",
    topicos: [
      "Como computadores executam instruções (entrada, processamento, saída).",
      "Terminal básico (navegação de pastas, criação de arquivos, execução de scripts).",
      "Instalação do ambiente: editor, runtime e organização de projeto.",
      "Noções de Git para salvar evolução dos exercícios desde o início.",
    ],
    praticas: [
      "Criar um repositório de estudos com pastas por assunto.",
      "Executar 20 comandos de terminal e documentar no README.",
      "Fazer 5 mini exercícios de entrada/saída em linguagem escolhida.",
    ],
    entregavel:
      "Repositório configurado com estrutura de estudos, histórico de commits e checklist inicial.",
  },
  {
    titulo: "Fase 2 — Lógica, Algoritmos e Pseudocódigo",
    duracao: "2 a 3 semanas",
    topicos: [
      "Algoritmo, passo a passo, decomposição de problema e casos de teste.",
      "Pseudocódigo e fluxogramas para pensar antes de programar.",
      "Variáveis, tipos de dados, operadores e expressões.",
      "Conversão de valores e validação de entradas.",
    ],
    praticas: [
      "Transformar problemas do cotidiano em pseudocódigo.",
      "Resolver 25 exercícios apenas com variáveis e operadores.",
      "Criar fluxogramas para 10 cenários de decisão simples.",
    ],
    entregavel:
      "Caderno digital com pseudocódigos comentados e versões em código executável.",
  },
  {
    titulo: "Fase 3 — Controle de Fluxo (Condições e Repetições)",
    duracao: "3 a 4 semanas",
    topicos: [
      "Estruturas condicionais (if, else if, else, switch).",
      "Estruturas de repetição (for, while, do while).",
      "Laços aninhados, controle de iteração e quebra de loop.",
      "Boas práticas de leitura de código e clareza de condições.",
    ],
    praticas: [
      "Resolver 40 exercícios de condicionais e laços.",
      "Implementar tabuada, média de turma, validações e contadores.",
      "Refatorar soluções para reduzir repetição e aumentar legibilidade.",
    ],
    entregavel:
      "Pacote de exercícios com testes manuais, entradas de borda e explicação da lógica.",
  },
  {
    titulo: "Fase 4 — Estruturas de Dados Fundamentais",
    duracao: "2 a 3 semanas",
    topicos: [
      "Arrays/listas, matrizes e objetos/dicionários.",
      "Operações de busca, inserção, remoção e agregação.",
      "Strings, parsing e normalização de dados de texto.",
      "Introdução à ordenação, filtragem e transformação de coleções.",
    ],
    praticas: [
      "Resolver 30 problemas com arrays e objetos.",
      "Implementar filtro, soma, média, maior/menor e contagem de frequência.",
      "Fazer mini desafios de ranking, catálogo e estatística simples.",
    ],
    entregavel:
      "Coleção de utilitários com funções reutilizáveis para manipulação de dados.",
  },
  {
    titulo: "Fase 5 — Funções, Modularização e Reuso",
    duracao: "2 a 3 semanas",
    topicos: [
      "Funções com parâmetros e retorno.",
      "Escopo, estado, pureza e efeitos colaterais.",
      "Quebra de problemas em funções pequenas e testáveis.",
      "Organização por módulos e arquivos separados.",
    ],
    praticas: [
      "Refatorar soluções anteriores para padrão funcional.",
      "Criar biblioteca local de funções matemáticas e de texto.",
      "Aplicar convenções de nome e padrão de assinatura.",
    ],
    entregavel:
      "Projeto modular com funções reutilizáveis e documentação de uso.",
  },
  {
    titulo: "Fase 6 — Depuração, Testes e Qualidade",
    duracao: "2 semanas",
    topicos: [
      "Debug com breakpoints, inspeção de variáveis e stack trace.",
      "Testes de mesa, casos de teste e cobertura de cenários críticos.",
      "Tratamento de erros e validação robusta de entradas.",
      "Noções de testes automatizados (unitários) em nível inicial.",
    ],
    praticas: [
      "Criar checklist de validação para cada exercício.",
      "Cobrir funções com cenários felizes, borda e erro.",
      "Padronizar logs e mensagens para facilitar troubleshooting.",
    ],
    entregavel:
      "Módulo validado com roteiro de testes e relatório de bugs corrigidos.",
  },
  {
    titulo: "Fase 7 — Algoritmos Clássicos e Performance",
    duracao: "3 a 4 semanas",
    topicos: [
      "Busca linear e binária.",
      "Ordenação (bubble, selection, insertion, merge, quick - noção).",
      "Recursão e comparação com abordagens iterativas.",
      "Complexidade de tempo/espaço (Big-O) em nível introdutório.",
    ],
    praticas: [
      "Comparar algoritmos em entradas pequenas e médias.",
      "Medir tempo de execução de soluções diferentes.",
      "Resolver problemas de otimização simples.",
    ],
    entregavel:
      "Benchmark básico com análise de complexidade e escolha de solução.",
  },
  {
    titulo: "Fase 8 — Projetos Integradores",
    duracao: "Contínua",
    topicos: [
      "Planejamento de projeto: requisito, regra de negócio e casos de uso.",
      "Separação de camadas (entrada, processamento, saída).",
      "Documentação técnica e narrativa da solução.",
      "Versionamento com branches, pull requests e revisão.",
    ],
    praticas: [
      "Construir 3 projetos completos com diferentes níveis de dificuldade.",
      "Publicar código e documentação no GitHub.",
      "Gravar demonstração curta explicando decisões de implementação.",
    ],
    entregavel:
      "Portfólio com projetos reais e evolução cronológica do aprendizado.",
  },
];

const matrizCompetencias = [
  {
    eixo: "Raciocínio Lógico",
    itens: [
      "Analisar problema antes de codificar.",
      "Definir entradas, regras, saídas e casos de teste.",
      "Quebrar problema complexo em etapas menores.",
    ],
  },
  {
    eixo: "Construção de Algoritmos",
    itens: [
      "Modelar solução em pseudocódigo e fluxograma.",
      "Traduzir lógica para código legível.",
      "Refatorar para reduzir repetição e aumentar clareza.",
    ],
  },
  {
    eixo: "Estruturas e Controle de Fluxo",
    itens: [
      "Escolher corretamente entre condicional e repetição.",
      "Manipular coleções e dados textuais.",
      "Aplicar funções para modularizar e reutilizar.",
    ],
  },
  {
    eixo: "Qualidade e Evolução",
    itens: [
      "Testar cenários felizes, de borda e de erro.",
      "Depurar com método e registrar aprendizados.",
      "Versionar progresso e documentar decisões técnicas.",
    ],
  },
];

const plano90Dias = [
  {
    periodo: "Dias 1–15",
    foco: "Base e organização",
    entregas: [
      "Ambiente instalado, terminal básico e Git inicial.",
      "20 exercícios de entrada/saída e operadores.",
      "1 README de progresso com rotina de estudos.",
    ],
  },
  {
    periodo: "Dias 16–35",
    foco: "Condições e laços",
    entregas: [
      "40 exercícios de if/switch/for/while.",
      "Tratamento de entradas inválidas.",
      "Primeiro mini projeto: menu interativo em console.",
    ],
  },
  {
    periodo: "Dias 36–60",
    foco: "Arrays, funções e modularização",
    entregas: [
      "30 exercícios com listas e objetos.",
      "Biblioteca de funções utilitárias.",
      "Segundo mini projeto com dados estruturados.",
    ],
  },
  {
    periodo: "Dias 61–90",
    foco: "Algoritmos e projeto final",
    entregas: [
      "Busca, ordenação e noção de Big-O.",
      "Projeto final com documentação e testes básicos.",
      "Publicação no GitHub e revisão técnica.",
    ],
  },
];

const trilhasObjetivo = [
  {
    nome: "Web Front-end",
    foco: "Lógica para interação, validações e manipulação de estado.",
    proximosPassos: "JavaScript avançado, DOM, React, consumo de APIs e testes de interface.",
  },
  {
    nome: "Back-end e APIs",
    foco: "Lógica de regras de negócio, validações e processamento de dados.",
    proximosPassos: "Node/Python/Java, banco de dados, autenticação, arquitetura de APIs.",
  },
  {
    nome: "Dados e Automação",
    foco: "Lógica para transformação de dados, limpeza e scripts.",
    proximosPassos: "Python, SQL, pandas, estatística básica e visualização.",
  },
  {
    nome: "Mobile",
    foco: "Fluxos de telas, estado e regras de navegação.",
    proximosPassos: "Kotlin/Swift/React Native, armazenamento local e integração com APIs.",
  },
  {
    nome: "Jogos e Simulação",
    foco: "Lógica de entidades, regras, colisões e atualização de estado.",
    proximosPassos: "Estruturas de dados, matemática para jogos, engines e otimização.",
  },
];

const desafiosProgressivos = [
  {
    nivel: "Iniciante",
    itens: [
      "Calculadora com validação de operadores.",
      "Conversor de temperatura/moeda com tratamento de erro.",
      "Sistema de notas e frequência com resultado final.",
      "Gerador de tabuada, sequência e estatísticas básicas.",
    ],
  },
  {
    nivel: "Intermediário",
    itens: [
      "Jogo de adivinhação com níveis e tentativas.",
      "CRUD em memória (lista de tarefas/alunos/produtos).",
      "Analisador de texto (frequência de palavras e normalização).",
      "Sistema de votação com relatório final.",
    ],
  },
  {
    nivel: "Avançando na base",
    itens: [
      "Agenda com busca, ordenação e filtros.",
      "Motor de regras (desconto, imposto, frete, faixas).",
      "Simulador financeiro com cenários e comparação.",
      "Projeto final integrando múltiplos módulos e testes.",
    ],
  },
];

const rotinaEstudo = [
  "Bloco 1 (25–40 min): teoria ativa com resumo em 5 linhas.",
  "Bloco 2 (50–80 min): exercícios guiados + variações do problema.",
  "Bloco 3 (25–40 min): depuração e refatoração da melhor solução.",
  "Bloco 4 (15 min): registro do aprendizado e plano do próximo estudo.",
];

const errosComuns = [
  "Pular fundamentos e ir direto para frameworks.",
  "Copiar soluções sem explicar a lógica com as próprias palavras.",
  "Não testar entradas de borda e cenários inválidos.",
  "Focar só em quantidade de exercícios e não em qualidade da solução.",
  "Escrever funções longas sem separar responsabilidades.",
];

const projetosPortfolio = [
  {
    nome: "Sistema de Controle Acadêmico",
    escopo: "Cadastro de alunos, notas, faltas e média final com regras configuráveis.",
    competencias: "Condicionais, laços, funções, listas e validações.",
  },
  {
    nome: "Simulador Financeiro Pessoal",
    escopo: "Entradas mensais, despesas por categoria e projeção de saldo futuro.",
    competencias: "Estruturas de dados, agregações, filtros e organização modular.",
  },
  {
    nome: "Motor de Regras para E-commerce",
    escopo: "Cálculo de frete/desconto/imposto com políticas de negócio.",
    competencias: "Composição de funções, cenários de borda e testes.",
  },
  {
    nome: "Agenda Inteligente",
    escopo: "Busca, ordenação e priorização de tarefas por urgência e prazo.",
    competencias: "Ordenação, filtros, manipulação de data e modelagem de estado.",
  },
  {
    nome: "Analisador de Texto",
    escopo: "Contagem de palavras, ranking de termos e normalização de conteúdo.",
    competencias: "Strings, dicionários/mapas, limpeza de dados e métricas.",
  },
  {
    nome: "Projeto Final Integrado",
    escopo: "Aplicação completa com menu, persistência simples e documentação técnica.",
    competencias: "Arquitetura básica, manutenção e comunicação técnica.",
  },
];

const bibliotecaPratica = [
  {
    categoria: "Exercícios e desafios",
    itens: [
      "Exercism, HackerRank, Beecrowd, Codewars (progressão de dificuldade).",
      "Listas graduais de algoritmos com revisão por tema.",
      "Problemas de entrevistas em nível júnior (foco em clareza).",
    ],
  },
  {
    categoria: "Construção de base",
    itens: [
      "Pseudocódigo e fluxogramas para pré-modelagem.",
      "Repositório de snippets de funções utilitárias.",
      "Caderno de erros clássicos e soluções refatoradas.",
    ],
  },
  {
    categoria: "Evolução profissional",
    itens: [
      "Projetos guiados com documentação em README.",
      "Pull requests simulados para revisar lógica e nomeação.",
      "Registro semanal de progresso (aprendizados e próximos passos).",
    ],
  },
];

const criteriosEvolucao = [
  "Consegue explicar a lógica da solução sem ler o código.",
  "Resolve o problema com validação de entradas inválidas.",
  "Separa solução em funções curtas e reutilizáveis.",
  "Testa cenários de borda antes de considerar concluído.",
  "Publica versões no Git com mensagens claras de evolução.",
  "Compara soluções e escolhe a mais simples e sustentável.",
];

const referenciaMateriais = [
  {
    nome: "Roadmap de Programação Grátis",
    tipo: "Trilha ampla de estudos e recursos gratuitos.",
    url: "https://github.com/dev-marcos/Roadmap-de-Programacao-Gratis",
  },
  {
    nome: "GuiaDevBrasil",
    tipo: "Curadoria extensa de conteúdos por stack e tópico.",
    url: "https://github.com/arthurspk/guiadevbrasil",
  },
  {
    nome: "DevMedia: Roadmap para aprender programação",
    tipo: "Orientação de evolução, foco e consistência de prática.",
    url: "https://www.devmedia.com.br/roadmap-para-aprender-programacao-o-caminho-certo-para-se-tornar-um-programador/44146",
  },
  {
    nome: "Alura: Formação Programação",
    tipo: "Estrutura por módulos progressivos com foco prático.",
    url: "https://www.alura.com.br/formacao-programacao",
  },
];

export default function RoadmapLogicaProgramacao() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const tx = (value) => (isEn ? translatePtToEnWithMap(value, roadmapLogicEnMap) : value);

  return (
    <PageTemplate>
      <BackButton fallbackTo="/roadmaps" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">
        {t("roadmapPages.common.backToRoadmaps")}
      </BackButton>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v12h10V6H7Zm2 2h6v2H9V8Zm0 4h6v2H9v-2Z"
          />
        </svg>
        <span>{t("roadmapPages.logic.title")}</span>
      </PageTitle>

      <PageDescription>
        {t("roadmapPages.logic.subtitle")}
      </PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2v2Zm1.1-7.8-.9.9A1.9 1.9 0 0 0 13 11h-2v-.5a3 3 0 0 1 .88-2.12l1.24-1.24A1.5 1.5 0 1 0 10 6H8a3.5 3.5 0 1 1 6.1 2.2Z" />
          </svg>
          <span>{t("roadmapPages.common.howToUseRoadmap")}</span>
        </h2>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside mt-4">
          <li className="text-justify">{t("roadmapPages.logic.howToUse.0")}</li>
          <li className="text-justify">{t("roadmapPages.logic.howToUse.1")}</li>
          <li className="text-justify">{t("roadmapPages.logic.howToUse.2")}</li>
          <li className="text-justify">{t("roadmapPages.logic.howToUse.3")}</li>
        </ol>
      </Panel>

      <div className="space-y-5 mb-10">
        {fases.map((fase) => (
          <Panel as="details" layout="plain" key={fase.titulo}>
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
          </Panel>
        ))}
      </div>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6H6v6h3a3 3 0 1 1 0 6H6a3 3 0 0 1-3-3V6Zm12-3h3a3 3 0 1 1 0 6h-3v2h-2V6a3 3 0 0 1 3-3Zm0 4h3a1 1 0 1 0 0-2h-3a1 1 0 0 0 0 2Zm-2 6h2v2h3a1 1 0 1 1 0 2h-3a3 3 0 0 1-3-3v-1h1Z" />
            </svg>
            <span>{t("roadmapPages.logic.competencyMatrix")}</span>
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
      </Panel>

      <Panel as="details" layout="plain" className="mb-8">
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
      </Panel>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 3 2 7l10 4 8-3.2V17h2V7L12 3Zm-6 8v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11l-6 2.4L6 11Z" />
            </svg>
            <span>{t("roadmapPages.logic.goalTracks")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {trilhasObjetivo.map((trilha) => (
            <article key={trilha.nome} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{tx(trilha.nome)}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{tx(trilha.foco)}</p>
              <p className="text-xs text-slate-400 mt-2">
                <span className="font-semibold text-slate-300">{tx("Próximos passos:")}</span>{" "}
                {tx(trilha.proximosPassos)}
              </p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2H4V5Zm0 4h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Zm3 3h10v2H7v-2Zm0 4h6v2H7v-2Z" />
            </svg>
            <span>{t("roadmapPages.logic.progressiveChallenges")}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {desafiosProgressivos.map((bloco) => (
            <article key={bloco.nivel} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100 mb-2">{tx(bloco.nivel)}</h3>
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
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9h-9V3Zm-1 0v10h10a10 10 0 1 1-10-10Z" />
              </svg>
              <span>{t("roadmapPages.logic.highConsistencyRoutine")}</span>
            </h2>
          </summary>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mt-4">
            {rotinaEstudo.map((item) => (
              <li key={item} className="text-justify">
                {tx(item)}
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
        </Panel>
      </div>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2H4V5Zm0 4h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Zm4 3a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Zm0 4a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H8Z" />
            </svg>
            <span>{t("roadmapPages.logic.portfolioProjectsExtended")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {projetosPortfolio.map((item) => (
            <article key={item.nome} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{tx(item.nome)}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{tx(item.escopo)}</p>
              <p className="text-xs text-slate-400 mt-2">
                <span className="font-semibold text-slate-300">{tx("Competências:")}</span> {tx(item.competencias)}
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
                <path fill="currentColor" d="M12 3c-4.97 0-9 1.34-9 3v12c0 1.66 4.03 3 9 3s9-1.34 9-3V6c0-1.66-4.03-3-9-3Zm0 2c4.25 0 7 .99 7 1s-2.75 1-7 1-7-.99-7-1 2.75-1 7-1Zm0 5c2.9 0 5.45-.46 7-1.18V12c0 .01-2.75 1-7 1s-7-.99-7-1V8.82C6.55 9.54 9.1 10 12 10Zm0 5c2.9 0 5.45-.46 7-1.18V18c0 .01-2.75 1-7 1s-7-.99-7-1v-4.18C6.55 14.54 9.1 15 12 15Z" />
              </svg>
              <span>{t("roadmapPages.logic.continuousPracticeLibrary")}</span>
            </h2>
          </summary>
          <div className="space-y-4 mt-4">
            {bibliotecaPratica.map((bloco) => (
              <article key={bloco.categoria} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                <h3 className="font-semibold text-slate-100 mb-2">{tx(bloco.categoria)}</h3>
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
        </Panel>

        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 2 1 7l11 5 9-4.09V17h2V7L12 2Zm-7 9v4.5C5 18.54 8.58 21 12 21s7-2.46 7-5.5V11l-7 3-7-3Z" />
              </svg>
              <span>{t("roadmapPages.logic.levelProgressCriteria")}</span>
            </h2>
          </summary>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mt-4">
            {criteriosEvolucao.map((item) => (
              <li key={item} className="text-justify">
                {tx(item)}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel as="details" layout="plain">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 4a8 8 0 0 1 8 8v7a1 1 0 1 1-2 0v-7a6 6 0 1 0-12 0v7a1 1 0 1 1-2 0v-7a8 8 0 0 1 8-8Zm-1 8h2v6h-2v-6Zm0-4h2v2h-2V8Z" />
            </svg>
            <span>{t("roadmapPages.common.baseReferencesUsed")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {referenciaMateriais.map((item) => (
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
      </Panel>
    </PageTemplate>
  );
}
