import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  getTechPlayDisciplina,
  getTechPlayDisciplinaSummary,
  getTechPlayDisciplinaTitle,
  getTechPlayTemaDescription,
  getTechPlayTemaTitle,
} from "../data/techplay";

function shuffleArray(items) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[randomIndex]] = [nextItems[randomIndex], nextItems[index]];
  }

  return nextItems;
}

export default function AdminTechPlayDisciplina() {
  const { i18n } = useTranslation();
  const { disciplinaSlug } = useParams();
  const disciplina = getTechPlayDisciplina(disciplinaSlug);
  const [equipesInput, setEquipesInput] = useState("");
  const [erroSorteio, setErroSorteio] = useState("");
  const [equipesPorTema, setEquipesPorTema] = useState({});
  const isEn = i18n.resolvedLanguage?.startsWith("en");

  const equipes = useMemo(
    () =>
      equipesInput
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    [equipesInput]
  );

  const txt = isEn
    ? {
        adminArea: "Admin area",
        disciplines: "Disciplines",
        discipline: "TechPlay Discipline",
        registeredTopics: "Registered topics",
        teamDraw: "Topic draw",
        drawTitle: "Draw teams for topics",
        drawDescription:
          "Enter one team per line. The system assigns a different topic to each team.",
        teamsTitle: "Participating teams",
        teamsDescription:
          "Add one team per line and run the draw. The team name will be shown directly inside the assigned topic.",
        teamsEntered: "Teams entered",
        teamsList: "Team list",
        teamPlaceholder: "Team 1\nTeam 2\nTeam 3",
        drawAction: "Draw teams into topics",
        clear: "Clear",
        noTeamsError: "Enter at least one team to run the draw.",
        maxTeamsError: `There are ${disciplina?.temas.length || 0} topics available. Reduce to at most ${disciplina?.temas.length || 0} teams.`,
        teamAssigned: "Team",
        noTeam: "No team",
      }
    : {
        adminArea: "Área administrativa",
        disciplines: "Disciplinas",
        discipline: "Disciplina TechPlay",
        registeredTopics: "Temas cadastrados",
        teamDraw: "Sorteio por tema",
        drawTitle: "Sortear equipes para os temas",
        drawDescription:
          "Digite uma equipe por linha. O sistema sorteia um tema diferente para cada equipe.",
        teamsTitle: "Equipes participantes",
        teamsDescription:
          "Adicione uma equipe por linha e faça o sorteio. O nome da equipe será exibido diretamente dentro do tema sorteado.",
        teamsEntered: "Equipes informadas",
        teamsList: "Lista de equipes",
        teamPlaceholder: "Equipe 1\nEquipe 2\nEquipe 3",
        drawAction: "Sortear equipes nos temas",
        clear: "Limpar",
        noTeamsError: "Informe pelo menos uma equipe para realizar o sorteio.",
        maxTeamsError: `Existem ${disciplina?.temas.length || 0} temas disponíveis. Reduza para até ${disciplina?.temas.length || 0} equipes.`,
        teamAssigned: "Equipe",
        noTeam: "Sem equipe",
      };

  if (!disciplina) {
    return <Navigate to="/admin/techplay/disciplinas" replace />;
  }

  function handleSortear() {
    if (equipes.length === 0) {
      setErroSorteio(txt.noTeamsError);
      setEquipesPorTema({});
      return;
    }

    if (equipes.length > disciplina.temas.length) {
      setErroSorteio(txt.maxTeamsError);
      setEquipesPorTema({});
      return;
    }

    const temaIndices = shuffleArray(
      disciplina.temas.map((_, index) => index)
    ).slice(0, equipes.length);
    const distribuicao = {};

    equipes.forEach((equipe, index) => {
      distribuicao[temaIndices[index]] = equipe;
    });

    setErroSorteio("");
    setEquipesPorTema(distribuicao);
  }

  function handleReset() {
    setEquipesInput("");
    setErroSorteio("");
    setEquipesPorTema({});
  }

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center gap-3 text-sm text-cyan-300 mb-6">
        <Link to="/admin" className="hover:text-cyan-200 transition">
          {txt.adminArea}
        </Link>
        <span className="text-slate-500">/</span>
        <Link to="/admin/techplay/disciplinas" className="hover:text-cyan-200 transition">
          {txt.disciplines}
        </Link>
        <span className="text-slate-500">/</span>
        <span className="text-slate-300">{getTechPlayDisciplinaTitle(disciplina, isEn)}</span>
      </div>

      <div className="glass rounded-[32px] p-8 md:p-10 mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{txt.discipline}</p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {getTechPlayDisciplinaTitle(disciplina, isEn)}
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
          {getTechPlayDisciplinaSummary(disciplina, isEn)}
        </p>

        <div className="admin-chip mt-8 inline-flex items-center gap-3 rounded-2xl px-5 py-4">
          <span className="text-sm text-slate-400">{txt.registeredTopics}</span>
          <span className="text-2xl font-black text-cyan-300">{disciplina.temas.length}</span>
        </div>
      </div>

      <div className="glass rounded-[32px] p-8 md:p-10 mb-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{txt.teamDraw}</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{txt.drawTitle}</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">{txt.drawDescription}</p>
        </div>

        <div className="admin-panel rounded-[28px] max-w-4xl p-6 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-5">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">{txt.teamsTitle}</h3>
              <p className="text-sm text-slate-300">{txt.teamsDescription}</p>
            </div>
            <div className="admin-chip rounded-2xl px-4 py-3">
              <p className="text-xs text-slate-400">{txt.teamsEntered}</p>
              <p className="text-xl font-black text-cyan-300">{equipes.length}</p>
            </div>
          </div>

          <label className="block text-sm text-slate-300 mb-3" htmlFor="equipes-sorteio">
            {txt.teamsList}
          </label>
          <textarea
            id="equipes-sorteio"
            value={equipesInput}
            onChange={(event) => setEquipesInput(event.target.value)}
            placeholder={txt.teamPlaceholder}
            className="min-h-[220px] w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSortear}
              className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              {txt.drawAction}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400"
            >
              {txt.clear}
            </button>
          </div>

          {erroSorteio && (
            <p className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {erroSorteio}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {disciplina.temas.map((tema, index) => (
          <article
            key={getTechPlayTemaTitle(tema, isEn)}
            className="glass rounded-[24px] border border-white/5 p-6 md:p-7"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-lg font-black text-cyan-300">
                  {index + 1}
                </div>
              </div>

              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  {equipesPorTema[index] ? (
                    <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      {txt.teamAssigned}: {equipesPorTema[index]}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {txt.noTeam}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  {getTechPlayTemaTitle(tema, isEn)}
                </h2>
                <p className="text-slate-300 leading-7">
                  {getTechPlayTemaDescription(tema, isEn)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
