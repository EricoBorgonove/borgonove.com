import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import { postgresqlExerciseLists } from "../data/postgresqlExercises";

export default function PostgresqlExercicios() {
  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-7xl mx-auto">
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas/postgresql"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >
          Voltar para PostgreSQL
        </BackButton>
      </div>

      <div className="mb-10 max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Prática guiada
        </p>
        <h1 className="mb-4 text-4xl font-black md:text-5xl">PostgreSQL: Exercícios</h1>
        <p className="text-lg leading-relaxed text-slate-400">
          Comece pela lista básica para firmar os fundamentos. Depois avance para as listas específicas e use as respostas como conferência, não como primeiro passo.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {postgresqlExerciseLists.map((list) => (
          <Link
            key={list.slug}
            to={`/disciplinas/postgresql/exercicios/${list.slug}`}
            className="group block"
          >
            <article className="glass theme-hover-border flex h-full flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1">
              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  {list.level}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {String(list.order).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mb-3 text-xl font-semibold text-slate-100">Lista {list.title}</h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{list.summary}</p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                Abrir lista
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
