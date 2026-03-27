import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import {
  tailwindDocsLinks,
  tailwindFinalExample,
  tailwindInstallFlow,
  tailwindQuickPatterns,
  tailwindResponsiveExample,
  tailwindUsageTips,
  tailwindWhatYouFind,
} from "../data/tailwindCssCheatSheet";

function getText(item, key, isEn) {
  return isEn ? item[`${key}_en`] || item[key] : item[key];
}

export default function TailwindCss() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to subjects",
        title: "Tailwind CSS",
        description:
          "Cheat sheet for quick review, official docs, and practical examples focused on React with Vite.",
        tablesTitle: "Reference Tables",
        tablesText:
          "Open the page with the complete tables to review classes by category during class, lab work, or exams.",
        openTables: "Open tables page",
        docsTitle: "Official Documentation",
        docsText:
          "Use the official Tailwind docs as your primary reference for classes, installation, and updates.",
        docsVisit: "Open documentation",
        docsFindTitle: "What You Will Find in the Docs",
        usageTitle: "How to Use This Cheat Sheet",
        usageText:
          "Do not try to memorize everything. Use the sheet as a shortcut for building combinations quickly.",
        installTitle: "Correct Flow with React + Vite",
        installText:
          "If you are using React with Vite, this is the flow highlighted in the material for starting the project.",
        patternsTitle: "Quick Important Patterns",
        patternsPattern: "Pattern",
        patternsMeaning: "Meaning",
        responsiveTitle: "Responsive Example",
        finalExampleTitle: "Final Example",
      }
    : {
        back: "Voltar para Disciplinas",
        title: "Tailwind CSS",
        description:
          "Cola de prova para revisão rápida, documentação oficial e exemplos práticos com foco em React + Vite.",
        tablesTitle: "Tabelas de Referência",
        tablesText:
          "Abra a página com as tabelas completas para revisar as classes por categoria durante aula, laboratório ou prova.",
        openTables: "Abrir página de tabelas",
        docsTitle: "Documentação Oficial",
        docsText:
          "Use a documentação oficial do Tailwind como referência principal para classes, instalação e atualizações.",
        docsVisit: "Abrir documentação",
        docsFindTitle: "O Que Você Vai Encontrar na Documentação",
        usageTitle: "Como Usar Essa Cola",
        usageText:
          "Não tente decorar tudo. Use a cola como atalho para montar combinações com rapidez.",
        installTitle: "Fluxo Correto com React + Vite",
        installText:
          "Se você estiver usando React com Vite, este é o fluxo destacado no material para iniciar o projeto.",
        patternsTitle: "Padrões Importantes",
        patternsPattern: "Padrão",
        patternsMeaning: "Significado",
        responsiveTitle: "Exemplo de Responsividade",
        finalExampleTitle: "Exemplo Final",
      };

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {txt.back}
        </BackButton>
      </div>

      <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h14v4H4V5Zm0 6h7v10H6a2 2 0 0 1-2-2v-8Zm9 0h7v8a2 2 0 0 1-2 2h-5V11Zm2 2a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 0a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Zm0 4a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>
      <p className="text-slate-400 text-lg mb-8">{txt.description}</p>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.tablesTitle}</h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">{txt.tablesText}</p>
          </div>
          <Link
            to="/disciplinas/tailwind-css/tabelas"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition"
          >
            {txt.openTables}
          </Link>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.docsTitle}</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">{txt.docsText}</p>
        <div className="grid gap-4 md:grid-cols-2">
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
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{txt.docsFindTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {tailwindWhatYouFind.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">{getText(item, "title", isEn)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{getText(item, "description", isEn)}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] mb-8">
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.usageTitle}</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">{txt.usageText}</p>
          <ol className="space-y-3 text-sm text-slate-300 list-decimal list-inside">
            {tailwindUsageTips.map((item, index) => (
              <li key={`usage-${index}`} className="leading-relaxed">
                {getText(item, "text", isEn)}
              </li>
            ))}
          </ol>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{txt.patternsTitle}</h2>
          <div className="space-y-3">
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
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 mb-8">
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.installTitle}</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">{txt.installText}</p>
          <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm text-slate-200">
            <code>{tailwindInstallFlow}</code>
          </pre>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.responsiveTitle}</h2>
          <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm text-slate-200">
            <code>{tailwindResponsiveExample}</code>
          </pre>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{txt.finalExampleTitle}</h2>
        <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm text-slate-200">
          <code>{tailwindFinalExample}</code>
        </pre>
      </div>
    </section>
  );
}
