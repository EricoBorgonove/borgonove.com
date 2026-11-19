import { useContentTranslation } from "../hooks/useContentTranslation";
import { Input, PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import listas from "../data/algoritmos-listas.json";
import { translatePtToEn } from "../utils/ptEnTranslate";

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getListType(lista, isEn) {
  if (!isEn) return lista.tipo;
  return lista.tipo_en || translatePtToEn(lista.tipo);
}

function getListTitle(lista, isEn) {
  if (!isEn) return lista.titulo;
  return lista.titulo_en || translatePtToEn(lista.titulo);
}

function getQuestionText(questao, isEn) {
  if (!isEn) return questao.texto;
  return questao.texto_en || translatePtToEn(questao.texto);
}

export default function Algoritmos() {
  const { text: uiText } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to subjects",
        title: "Algorithms",
        description: "The lists are grouped by topic to make content progression easier.",
        searchLabel: "Search in exercise lists",
        searchPlaceholder: "Type a question keyword...",
        topics: "Topics",
        type: "Type",
        noResults: "No questions found for this search.",
        naturalTitle: "Algorithms in Natural Language",
        naturalDescription: "50 introductory exercises based on everyday tasks, decisions, and repetitions.",
        naturalAction: "Open exercise list",
      }
    : {
        back: "Voltar para Disciplinas",
        title: "Algoritmos",
        description: "As listas estão separadas por assunto para facilitar a evolução do conteúdo.",
        searchLabel: "Buscar nas listas de exercícios",
        searchPlaceholder: "Digite uma palavra-chave da questão...",
        topics: "Assuntos",
        type: "Tipo",
        noResults: "Nenhuma questão encontrada para essa busca.",
        naturalTitle: "Algoritmos em Linguagem Natural",
        naturalDescription: "50 exercícios introdutórios com situações do cotidiano, decisões e repetições.",
        naturalAction: "Abrir lista de exercícios",
      };

  const [query, setQuery] = useState("");

  const filteredListas = useMemo(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      return listas;
    }

    const normalizedQuery = normalizeText(trimmed);

    return listas
      .map((lista) => {
        const questoes = lista.questoes.filter((questao) =>
          normalizeText(getQuestionText(questao, isEn)).includes(normalizedQuery)
        );

        return { ...lista, questoes };
      })
      .filter((lista) => lista.questoes.length > 0);
  }, [query, isEn]);

  return (
    <PageTemplate>
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">{uiText(txt.back)}</BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M3 5a2 2 0 0 1 2-2h4v2H5v14h4v2H5a2 2 0 0 1-2-2V5Zm16 14h-4v2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4v2h4v14ZM9.7 15.3a1 1 0 0 1 0-1.4L11.6 12 9.7 10.1a1 1 0 1 1 1.4-1.4l2.6 2.6a1 1 0 0 1 0 1.4l-2.6 2.6a1 1 0 0 1-1.4 0Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>
      <PageDescription>
        {uiText(txt.description)}
      </PageDescription></PageHeader>

      <Panel as={Link} layout="plain"
        to="/disciplinas/algoritmos/linguagem-natural"
        className="theme-hover-border mb-8 block transition hover:-translate-y-1"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
          {uiText(isEn ? "Introductory list" : "Lista introdutória")}
        </p>
        <h2 className="mb-2 text-2xl font-semibold text-slate-100">{uiText(txt.naturalTitle)}</h2>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-400">
          {uiText(txt.naturalDescription)}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
          {uiText(txt.naturalAction)}
          <span aria-hidden="true">→</span>
        </span>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <label htmlFor="busca-listas" className="block text-sm text-slate-300 mb-3">{uiText(txt.searchLabel)}</label>
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
          >
            <path
              fill="currentColor"
              d="M10.5 3a7.5 7.5 0 1 1-4.7 13.34l-2.57 2.57a1 1 0 1 1-1.42-1.42l2.57-2.57A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
            />
          </svg>
          <Input
            id="busca-listas"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={uiText(txt.searchPlaceholder)}
            className="ui-input--leading-icon w-full border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-10">
        <summary className="cursor-pointer text-xl font-semibold text-cyan-300 px-6 md:px-8 py-5">
          {uiText(txt.topics)}
        </summary>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm px-6 md:px-8 pb-6 md:pb-8">
          {listas.map((lista) => (
            <a
              key={lista.titulo}
              href={`#${slugify(getListTitle(lista, isEn))}`}
              className="bg-slate-900/60 rounded-xl px-4 py-3 hover:bg-slate-800/80 transition"
            >
              {uiText(getListTitle(lista, isEn))}
            </a>
          ))}
        </div>
      </Panel>

      <div className="space-y-5">
        {filteredListas.map((lista) => (
          <Panel as="details" layout="plain"
            key={lista.titulo}
            id={slugify(getListTitle(lista, isEn))}

            open={Boolean(query.trim())}
          >
            <summary className="cursor-pointer text-lg font-semibold text-cyan-300">
              {uiText(getListTitle(lista, isEn))}
            </summary>
            <p className="mt-3 text-xs text-slate-400">{uiText(txt.type)}: {uiText(getListType(lista, isEn))}</p>
            <ol className="mt-5 space-y-2 text-sm text-slate-300 list-decimal list-inside">
              {lista.questoes.map((questao) => (
                <li
                  key={`${lista.numero}-${questao.id}`}
                  value={questao.id}
                  className="text-justify marker:font-bold marker:text-cyan-300"
                >
                  {uiText(getQuestionText(questao, isEn))}
                </li>
              ))}
            </ol>
          </Panel>
        ))}
      </div>

      {filteredListas.length === 0 && (
        <p className="text-sm text-slate-400 mt-6">{uiText(txt.noResults)}</p>
      )}
    </PageTemplate>
  );
}
