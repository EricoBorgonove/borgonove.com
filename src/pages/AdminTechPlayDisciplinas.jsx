import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  getTechPlayDisciplinaSummary,
  getTechPlayDisciplinaTitle,
  techPlayDisciplinas,
} from "../data/techplay";

export default function AdminTechPlayDisciplinas() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        adminArea: "Admin area",
        disciplines: "Disciplines",
        title: "Disciplines",
        description: "Administrative catalog of TechPlay disciplines.",
        disciplineLabel: "Discipline",
        totalTopics: "Total topics",
        viewDiscipline: "View discipline",
        techPlay: "TechPlay",
      }
    : {
        adminArea: "Área administrativa",
        disciplines: "Disciplinas",
        title: "Disciplinas",
        description: "Catálogo administrativo das disciplinas do TechPlay.",
        disciplineLabel: "Disciplina",
        totalTopics: "Total de temas",
        viewDiscipline: "Ver disciplina",
        techPlay: "TechPlay",
      };

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 text-sm text-cyan-300 mb-6">
        <Link to="/admin" className="hover:text-cyan-200 transition">
          {txt.adminArea}
        </Link>
        <span className="text-slate-500">/</span>
        <span className="text-slate-300">{txt.disciplines}</span>
      </div>

      <div className="max-w-3xl mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{txt.techPlay}</p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{txt.title}</h1>
        <p className="text-slate-300 text-lg leading-relaxed">{txt.description}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {techPlayDisciplinas.map((disciplina, index) => (
          <article
            key={disciplina.slug}
            className="glass admin-panel-soft rounded-[28px] p-6 md:p-7"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">
              {txt.disciplineLabel} {index + 1}
            </p>
            <h2 className="text-2xl font-black text-white mb-3">
              {getTechPlayDisciplinaTitle(disciplina, isEn)}
            </h2>
            <p className="text-slate-300 leading-7 mb-6">
              {getTechPlayDisciplinaSummary(disciplina, isEn)}
            </p>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">{txt.totalTopics}</p>
                <p className="text-lg font-bold text-cyan-300">{disciplina.temas.length}</p>
              </div>

              <Link
                to={`/admin/techplay/disciplinas/${disciplina.slug}`}
                className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-500/10"
              >
                {txt.viewDiscipline}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
