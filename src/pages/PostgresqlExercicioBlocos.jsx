import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { Link, Navigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { findPostgresqlExerciseList } from "../data/postgresqlExercises";

export default function PostgresqlExercicioBlocos() {
  const { text: uiText } = useContentTranslation();

  const { listSlug } = useParams();
  const list = findPostgresqlExerciseList(listSlug);
  const hideBlockOrder = list?.slug === "loja-temporal";

  if (!list) {
    return <Navigate to="/disciplinas/postgresql/exercicios" replace />;
  }

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas/postgresql/exercicios"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >{uiText("Voltar para Exercícios")}</BackButton>
      </div>

      <PageHeader>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{uiText("Trilha de exercícios")}</p>
        <PageTitle className="mb-4">{uiText(list.title)}</PageTitle>
        <PageDescription>{uiText(list.summary)}</PageDescription>
      </PageHeader>

      {list.files && (
        <Panel as="div" layout="plain" className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-cyan-300">{uiText("Arquivos para download")}</h2>
          <div className="flex flex-wrap gap-3">
            {list.files.map((file) => (
              <a
                key={file.href}
                href={file.href}
                download={file.fileName}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
              >
                {uiText(file.label)}
                <span aria-hidden="true">↓</span>
              </a>
            ))}
          </div>
        </Panel>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.blocks.map((block) => (
          <Link
            key={block.slug}
            to={`/disciplinas/postgresql/exercicios/${list.slug}/${block.slug}`}
            className="group block"
          >
            <Panel as="article" layout="plain" className="theme-hover-border flex h-full flex-col transition duration-300 hover:-translate-y-1">
              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{uiText("Tipo: ")}{uiText(block.level)}
                </span>
                {!hideBlockOrder && (
                  <span className="text-sm font-bold text-slate-500">{uiText("Bloco ")}{uiText(String(block.order).padStart(2, "0"))}
                  </span>
                )}
              </div>

              <h2 className="mb-3 text-xl font-semibold text-slate-100">{uiText(block.title)}</h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{uiText(block.summary)}</p>

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {uiText(block.exercises.length)}{uiText(" exercícios")}</p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">{uiText("Abrir exercícios")}<span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </Panel>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
}
