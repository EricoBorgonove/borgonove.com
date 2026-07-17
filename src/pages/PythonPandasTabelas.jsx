import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";
import { pandasAdvancedSections, pandasCheatSheetSections } from "../data/pandasCheatSheet";
import { Link } from "react-router-dom";
import { copy, localize, pick } from "../utils/pandasLocale";

const guideItems = [
  copy("O segredo do Pandas não é decorar todos esses comandos, mas saber que eles existem.", "The secret of Pandas is not memorizing all these commands, but knowing they exist."),
  copy("Se você quer mudar o formato da tabela: olhe para Reshaping (Tabela 8).", "If you want to change the table shape: look at Reshaping (Table 8)."),
  copy("Se a tabela está lenta: olhe para Performance (Tabela 15).", "If the table is slow: look at Performance (Table 15)."),
  copy("Se você está lidando com textos sujos: olhe para Strings (Tabela 13).", "If you are dealing with messy text: look at Strings (Table 13)."),
];

function DataTable({ section }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="min-w-[760px] w-full text-left text-sm bg-slate-950/70">
        <thead className="bg-slate-900/90">
          <tr>
            {section.columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold text-slate-100">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.items.map((item, rowIndex) => (
            <tr key={`${section.id}-${rowIndex}`} className="border-t border-slate-800">
              {section.columns.map((column, columnIndex) => (
                <td key={`${section.id}-${rowIndex}-${column.key}`} className="px-4 py-3 text-slate-300 align-top">
                  {columnIndex === 0 || column.key === "example" ? (
                    <code className={columnIndex === 0 ? "font-semibold text-cyan-300" : "text-slate-200"}>
                      {item[column.key]}
                    </code>
                  ) : (
                    item[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PythonPandasTabelas() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const sections = localize(pandasCheatSheetSections, isEn);
  const advancedSections = localize(pandasAdvancedSections, isEn);
  const txt = {
    back: copy("Voltar para Python Pandas", "Back to Python Pandas"),
    title: copy("Python Pandas: Tabelas", "Python Pandas: Tables"),
    subtitle: copy(
      "Consulta rápida para carregar, limpar, transformar, agregar e exportar dados com Pandas.",
      "Quick reference for loading, cleaning, transforming, aggregating, and exporting data with Pandas."
    ),
    csvExcel: copy("CSV x Excel no Pandas", "CSV vs Excel in Pandas"),
    howToUse: copy("Como usar este guia", "How to use this guide"),
    quickNav: copy("Navegação Rápida", "Quick Navigation"),
    advancedTopics: copy("Tópicos Avançados", "Advanced Topics"),
    advancedTables: copy("Tabelas Avançadas", "Advanced Tables"),
    advancedSubtitle: copy(
      "Conceitos e comandos para trabalhar com memória, performance, auditoria e datasets maiores.",
      "Concepts and commands for working with memory, performance, auditing, and larger datasets."
    ),
  };

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-7xl mx-auto">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/python-pandas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {pick(txt.back, isEn)}
        </BackButton>
      </div>

      <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h14v4H4V5Zm0 6h7v10H6a2 2 0 0 1-2-2v-8Zm9 0h7v8a2 2 0 0 1-2 2h-5V11Zm2 2a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 0a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Zm0 4a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Z"
          />
        </svg>
        <span>{pick(txt.title, isEn)}</span>
      </h1>
      <p className="text-slate-400 text-lg mb-8">
        {pick(txt.subtitle, isEn)}
      </p>

      <div className="mb-8">
        <Link
          to="/disciplinas/python-pandas/csv-excel"
          className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
        >
          {pick(txt.csvExcel, isEn)}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.howToUse, isEn)}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {guideItems.map((item) => (
            <p key={item.pt} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 leading-relaxed">
              {pick(item, isEn)}
            </p>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">{pick(txt.quickNav, isEn)}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400 transition"
            >
              {index + 1}. {section.title}
            </a>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">{pick(txt.advancedTopics, isEn)}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {advancedSections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400 transition"
            >
              A{index + 1}. {section.title}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <article key={section.id} id={section.id} className="glass rounded-2xl p-6 md:p-8 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-5">
              {index + 1}. {section.title}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">{section.description}</p>

            <DataTable section={section} />
          </article>
        ))}
      </div>

      <div className="mt-10 mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{pick(txt.advancedTables, isEn)}</h2>
        <p className="text-slate-400 text-lg">
          {pick(txt.advancedSubtitle, isEn)}
        </p>
      </div>

      <div className="space-y-8">
        {advancedSections.map((section, index) => (
          <article key={section.id} id={section.id} className="glass rounded-2xl p-6 md:p-8 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-5">
              A{index + 1}. {section.title}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">{section.description}</p>

            {section.notes && (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-5">
                {section.notes.map((note) => (
                  <article key={note.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">{note.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{note.text}</p>
                  </article>
                ))}
              </div>
            )}

            {section.columns && section.items && (
              <div className="mb-5">
                <DataTable section={section} />
              </div>
            )}

            {section.code && <CodeBlock>{section.code}</CodeBlock>}
          </article>
        ))}
      </div>
    </section>
  );
}
