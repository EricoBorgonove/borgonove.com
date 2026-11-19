import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import { postgresqlTables } from "../data/postgresqlTables";

export default function PostgresqlTabelas() {
  const { text: uiText } = useContentTranslation();

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas/postgresql"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >{uiText("Voltar para PostgreSQL")}</BackButton>
      </div>

      <PageHeader>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{uiText("Material de apoio")}</p>
        <PageTitle className="mb-4">{uiText("PostgreSQL: Material de apoio")}</PageTitle>
        <PageDescription>{uiText("Use estes materiais como consulta durante os exercícios. Quando bater dúvida sobre tipo de dado, constraint, operador ou função, volte aqui e compare com o que você está escrevendo no SQL.")}</PageDescription>
      </PageHeader>

      <div className="grid gap-5 md:grid-cols-2">
        {postgresqlTables.map((table) => (
          <Link
            key={table.slug}
            to={`/disciplinas/postgresql/material-apoio/${table.slug}`}
            className="group block"
          >
            <Panel as="article" layout="plain" className="theme-hover-border flex h-full flex-col transition duration-300 hover:-translate-y-1">
              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  {uiText(table.category)}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {uiText(String(table.order).padStart(2, "0"))}
                </span>
              </div>

              <h2 className="mb-3 text-xl font-semibold text-slate-100">{uiText(table.title)}</h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{uiText(table.summary)}</p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">{uiText("Abrir material")}<span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </Panel>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
}
