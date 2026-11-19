import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import { postgresqlExerciseLists } from "../data/postgresqlExercises";

export default function PostgresqlExercicios() {
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
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{uiText("Prática guiada")}</p>
        <PageTitle className="mb-4">{uiText("PostgreSQL: Exercícios")}</PageTitle>
        <PageDescription>{uiText("Comece pela lista básica para firmar os fundamentos. Depois avance para as listas específicas e use as respostas como conferência, não como primeiro passo.")}</PageDescription>
      </PageHeader>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {postgresqlExerciseLists.map((list) => (
          <Link
            key={list.slug}
            to={`/disciplinas/postgresql/exercicios/${list.slug}`}
            className="group block"
          >
            <Panel as="article" layout="plain" className="theme-hover-border flex h-full flex-col transition duration-300 hover:-translate-y-1">
              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  {uiText(list.level)}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {uiText(String(list.order).padStart(2, "0"))}
                </span>
              </div>

              <h2 className="mb-3 text-xl font-semibold text-slate-100">{uiText("Lista ")}{uiText(list.title)}</h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{uiText(list.summary)}</p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">{uiText("Abrir lista")}<span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </Panel>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
}
