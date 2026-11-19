import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import {
  tailwindCheatSheetSections,
} from "../data/tailwindCssCheatSheet";

function getText(item, key, isEn) {
  return isEn ? item[`${key}_en`] || item[key] : item[key];
}

function getSectionBaseTitle(section, isEn) {
  return getText(section, "title", isEn).replace(/^\d+\.\s*/, "");
}

export default function TailwindCssTabelas() {
  const { text: uiText } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const sortLocale = isEn ? "en-US" : "pt-BR";
  const txt = isEn
    ? {
        back: "Back to Tailwind CSS",
        title: "Tailwind CSS Tables",
        description:
          "Complete cheat-sheet tables organized by category for fast review during practice or exams.",
        quickNav: "Quick Navigation",
        exampleLabel: "Section example",
      }
    : {
        back: "Voltar para Tailwind CSS",
        title: "Tailwind CSS: Tabelas",
        description:
          "Tabelas completas da cola organizadas por categoria para revisão rápida durante exercícios, laboratório ou prova.",
        quickNav: "Navegação Rápida",
        exampleLabel: "Exemplo da seção",
      };

  const sortedSections = [...tailwindCheatSheetSections].sort((a, b) =>
    getSectionBaseTitle(a, isEn).localeCompare(getSectionBaseTitle(b, isEn), sortLocale)
  );

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/tailwind-css" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {uiText(txt.back)}
        </BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h14v4H4V5Zm0 6h7v10H6a2 2 0 0 1-2-2v-8Zm9 0h7v8a2 2 0 0 1-2 2h-5V11Zm2 2a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 0a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Zm0 4a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>
      <PageDescription>{uiText(txt.description)}</PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">{uiText(txt.quickNav)}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedSections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400 transition"
            >
              {uiText(index + 1)}. {uiText(getSectionBaseTitle(section, isEn))}
            </a>
          ))}
        </div>
      </Panel>

      <div className="space-y-8">
        {sortedSections.map((section, index) => (
          <Panel as="article" layout="plain" key={section.id} id={section.id}>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-5">
              {uiText(index + 1)}. {uiText(getSectionBaseTitle(section, isEn))}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              {uiText(getText(section, "description", isEn))}
            </p>
            <TableContainer className="rounded-2xl border border-slate-800">
              <Table className="min-w-[620px] w-full text-left text-sm bg-slate-950/70">
                <thead className="bg-slate-900/90">
                  <tr>
                    {section.columns.map((column) => (
                      <th key={column.key} className="px-4 py-3 font-semibold text-slate-100">
                        {uiText(isEn ? column.label_en || column.label : column.label)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item, index) => (
                    <tr key={`${section.id}-${index}`} className="border-t border-slate-800">
                      {section.columns.map((column, columnIndex) => (
                        <td key={`${section.id}-${index}-${column.key}`} className="px-4 py-3 text-slate-300 align-top">
                          {uiText(columnIndex === 0 ? (
                            <code className="font-semibold text-cyan-300">
                              {item[column.key]}
                            </code>
                          ) : (
                            isEn
                              ? item[`${column.key}_en`] || item[column.key]
                              : item[column.key]
                          ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>

            {section.example && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-200 mb-2">
                  {uiText(getText(section, "exampleTitle", isEn) || txt.exampleLabel)}
                </p>
                {getText(section, "exampleDescription", isEn) && (
                  <p className="text-sm text-slate-400 mb-3">
                    {uiText(getText(section, "exampleDescription", isEn))}
                  </p>
                )}
                <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm text-slate-200">
                  <code>{section.example}</code>
                </pre>
              </div>
            )}
          </Panel>
        ))}
      </div>
    </PageTemplate>
  );
}
