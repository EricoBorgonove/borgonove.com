import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import {
  tailwindDocsLinks,
  tailwindInstallFlow,
  tailwindQuickPatterns,
} from "../data/tailwindCssCheatSheet";

function getText(item, key, isEn) {
  return isEn ? item[`${key}_en`] || item[key] : item[key];
}

const tailwindDisciplineGoals = [
  {
    title: "Objetivo central",
    title_en: "Core objective",
    description:
      "Compreender o modelo utilitário do Tailwind para construir interfaces rápidas, consistentes e fáceis de evoluir.",
    description_en:
      "Understand Tailwind's utility-first model to build interfaces that are fast, consistent, and easy to evolve.",
  },
  {
    title: "Competência prática",
    title_en: "Practical competency",
    description:
      "Aplicar classes em componentes reais como botões, cards, formulários e seções responsivas sem depender de CSS extenso.",
    description_en:
      "Apply classes to real components such as buttons, cards, forms, and responsive sections without relying on extensive CSS.",
  },
  {
    title: "Visão profissional",
    title_en: "Professional mindset",
    description:
      "Usar a documentação oficial, padrões reutilizáveis e leitura rápida de utilities como parte do fluxo de desenvolvimento.",
    description_en:
      "Use official documentation, reusable patterns, and fast utility reading as part of the development workflow.",
  },
];

const tailwindStudyStages = [
  {
    title: "Unidade 1. Instalação e ambiente",
    title_en: "Unit 1. Installation and environment",
    description:
      "Inicie a disciplina configurando React + Vite, instalando Tailwind e validando o pipeline básico de estilização.",
    description_en:
      "Start the subject by setting up React + Vite, installing Tailwind, and validating the basic styling pipeline.",
  },
  {
    title: "Unidade 2. Utilities fundamentais",
    title_en: "Unit 2. Fundamental utilities",
    description:
      "Trabalhe spacing, cores, tipografia, tamanhos e bordas até conseguir montar componentes simples com segurança.",
    description_en:
      "Work through spacing, colors, typography, sizing, and borders until you can build simple components confidently.",
  },
  {
    title: "Unidade 3. Layout e responsividade",
    title_en: "Unit 3. Layout and responsiveness",
    description:
      "Avance para flex, grid, container e breakpoints para estruturar páginas que se adaptem a múltiplos tamanhos de tela.",
    description_en:
      "Move on to flex, grid, container, and breakpoints to structure pages that adapt across multiple screen sizes.",
  },
  {
    title: "Unidade 4. Interação e refinamento",
    title_en: "Unit 4. Interaction and refinement",
    description:
      "Inclua hover, transições, transforms, sombras e estados visuais para dar qualidade perceptível aos componentes.",
    description_en:
      "Add hover states, transitions, transforms, shadows, and visual states to give components a noticeable polished finish.",
  },
  {
    title: "Unidade 5. Aplicação em projetos",
    title_en: "Unit 5. Application in projects",
    description:
      "Consolide o aprendizado em cards, botões, formulários, dashboards e seções completas que possam ser reutilizadas.",
    description_en:
      "Consolidate learning through cards, buttons, forms, dashboards, and complete sections that can be reused.",
  },
];

const tailwindLearningOutcomes = [
  {
    text: "Ler rapidamente uma interface e identificar quais grupos de classes serão necessários para montá-la.",
    text_en:
      "Quickly read an interface and identify which class groups are needed to build it.",
  },
  {
    text: "Criar componentes visuais consistentes sem escrever CSS adicional para cada pequeno ajuste.",
    text_en:
      "Create consistent visual components without writing extra CSS for every small adjustment.",
  },
  {
    text: "Usar responsividade e estados visuais como parte natural da construção da interface.",
    text_en:
      "Use responsiveness and visual states as a natural part of building interfaces.",
  },
  {
    text: "Consultar tabelas e documentação oficial de forma estratégica durante a implementação.",
    text_en:
      "Consult tables and official documentation strategically while implementing features.",
  },
];

const tailwindTeachingApproach = [
  {
    text: "Apresente primeiro a lógica das utilities, não apenas a memorização de classes isoladas.",
    text_en:
      "Teach the logic of utilities first, not just memorization of isolated classes.",
  },
  {
    text: "Organize a prática por grupos semânticos: spacing, tipografia, layout, responsividade e interação.",
    text_en:
      "Organize practice by semantic groups: spacing, typography, layout, responsiveness, and interaction.",
  },
  {
    text: "Após cada bloco, peça a reconstrução de um componente real para transformar consulta em domínio.",
    text_en:
      "After each block, ask students to rebuild a real component so consultation becomes mastery.",
    },
];

export default function TailwindCss() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
      ? {
        back: "Back to subjects",
        title: "Tailwind CSS",
        description:
          "Study roadmap for teaching and learning Tailwind CSS with React + Vite, from installation to reusable responsive interfaces.",
        roadmapTitle: "Teaching Focus of the Subject",
        roadmapText:
          "This page should guide the student through the logic of Tailwind usage, show the order of topics, and indicate where consultation material supports practice.",
        goalsTitle: "What the Subject Should Deliver",
        supportTitle: "Support Materials",
        supportText:
          "The examples stay on the tables page, attached to the relevant content blocks, while the main page keeps the pedagogical organization of the subject.",
        tablesTitle: "Reference Tables",
        tablesText:
          "Open the full tables page to review classes by category whenever you need a quick lookup.",
        openTables: "Open tables",
        docsTitle: "Official Documentation",
        docsText:
          "Use the official Tailwind docs as your primary reference for classes, installation, and updates.",
        docsVisit: "Open documentation",
        stagesTitle: "Suggested Teaching Sequence",
        outcomesTitle: "Expected Learning Outcomes",
        installTitle: "Starting Flow with React + Vite",
        installText:
          "If your project starts with React + Vite, this is the basic installation flow highlighted in the study material.",
        patternsTitle: "Essential Tailwind Vocabulary",
      }
    : {
        back: "Voltar para Disciplinas",
        title: "Tailwind CSS",
        description:
          "Roteiro de estudos para ensinar e aprender Tailwind CSS com React + Vite, da instalação até interfaces responsivas e componentes reutilizáveis.",
        roadmapTitle: "Foco Didático da Disciplina",
        roadmapText:
          "Esta página deve orientar o aluno pela lógica de uso do Tailwind, mostrar a ordem dos tópicos e indicar onde o material de consulta apoia a prática.",
        goalsTitle: "O Que a Disciplina Deve Entregar",
        supportTitle: "Materiais de Apoio",
        supportText:
          "Os exemplos ficam na página de tabelas, ligados aos blocos de conteúdo correspondentes, enquanto a página principal mantém a organização pedagógica da disciplina.",
        tablesTitle: "Tabelas de Referência",
        tablesText:
          "Abra a página com as tabelas completas para consultar classes por categoria sempre que precisar revisar rapidamente.",
        openTables: "Abrir tabelas",
        docsTitle: "Documentação Oficial",
        docsText:
          "Use a documentação oficial do Tailwind como referência principal para classes, instalação e atualizações.",
        docsVisit: "Abrir documentação",
        stagesTitle: "Sequência Didática Sugerida",
        outcomesTitle: "Resultados Esperados de Aprendizagem",
        installTitle: "Fluxo Inicial com React + Vite",
        installText:
          "Se o seu projeto começa com React + Vite, este é o fluxo básico de instalação destacado no material de estudo.",
        patternsTitle: "Vocabulário Essencial do Tailwind",
      };

  return (
    <PageTemplate>
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {txt.back}
        </BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h14v4H4V5Zm0 6h7v10H6a2 2 0 0 1-2-2v-8Zm9 0h7v8a2 2 0 0 1-2 2h-5V11Zm2 2a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 0a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Zm0 4a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Z"
          />
        </svg>
        <span>{txt.title}</span>
      </PageTitle>
      <PageDescription>{txt.description}</PageDescription></PageHeader>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] mb-8">
        <Panel as="div" layout="plain">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.roadmapTitle}</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">{txt.roadmapText}</p>
          <ol className="space-y-3 text-sm text-slate-300 list-decimal list-inside">
            {tailwindTeachingApproach.map((item, index) => (
              <li key={`usage-${index}`} className="leading-relaxed">
                {getText(item, "text", isEn)}
              </li>
            ))}
          </ol>
        </Panel>

        <Panel as="div" layout="plain">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.supportTitle}</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">{txt.supportText}</p>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">{txt.tablesTitle}</h3>
              <p className="text-sm text-slate-400 mb-4">{txt.tablesText}</p>
              <Link
                to="/disciplinas/tailwind-css/tabelas"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
              >
                {txt.openTables}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            {tailwindDocsLinks.map((item) => (
              <article key={item.href} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{getText(item, "title", isEn)}</h3>
                <p className="text-sm text-slate-400 mb-4">{getText(item, "description", isEn)}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  {txt.docsVisit}
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </Panel>
      </div>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{txt.goalsTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {tailwindDisciplineGoals.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">{getText(item, "title", isEn)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{getText(item, "description", isEn)}</p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{txt.stagesTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tailwindStudyStages.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">{getText(item, "title", isEn)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{getText(item, "description", isEn)}</p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{txt.outcomesTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {tailwindLearningOutcomes.map((item, index) => (
            <article key={`check-${index}`} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-300 leading-relaxed">{getText(item, "text", isEn)}</p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{txt.patternsTitle}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {tailwindQuickPatterns.map((item) => (
            <div
              key={item.pattern}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3"
            >
              <code className="text-cyan-300 font-semibold">{item.pattern}</code>
              <span className="text-sm text-slate-300">
                {isEn ? item.meaning_en || item.meaning : item.meaning}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.installTitle}</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">{txt.installText}</p>
        <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm text-slate-200">
          <code>{tailwindInstallFlow}</code>
        </pre>
      </Panel>
    </PageTemplate>
  );
}
