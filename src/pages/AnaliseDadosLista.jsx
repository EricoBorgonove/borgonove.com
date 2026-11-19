import { Input, PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import { getAnaliseDadosCollection } from "../data/analiseDadosColecoes";
import { translatePtToEn } from "../utils/ptEnTranslate";

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function slugify(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function getCollectionTitle(collection, isEn) {
  return isEn ? collection.title_en || collection.title : collection.title;
}

function getCollectionDescription(collection, isEn) {
  return isEn ? collection.description_en || collection.description : collection.description;
}

function getDatasetExample(collection, isEn) {
  return isEn ? collection.datasetExample_en || collection.datasetExample : collection.datasetExample;
}

export default function AnaliseDadosLista() {
  const { listaSlug } = useParams();
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const collection = getAnaliseDadosCollection(listaSlug);

  const txt = isEn
    ? {
        back: "Back to Data Analysis",
        datasetTitle: "Base Dataset",
        datasetText:
          "For this list, assume we have a Python dataset represented by a dictionary in the following format:",
        datasetExampleLabel: "Generated record example",
        introTitle: "How to Use This List",
        introText:
          "Use this sequence to practice exploratory analysis with structured data. The topics move from summary measures to outlier detection, group comparison, ranking creation, clustering, risk indicators, and visual reporting with pandas.",
        searchLabel: "Search in the exercise list",
        searchPlaceholder: "Type a keyword from an exercise...",
        topics: "Topics",
        type: "Category",
        noResults: "No exercises found for this search.",
      }
    : {
        back: "Voltar para Análise de Dados",
        datasetTitle: "Dataset Base",
        datasetText:
          "Para esta lista, considere que temos um dataset em Python representado por um dicionário no formato abaixo:",
        datasetExampleLabel: "Exemplo de um registro gerado",
        introTitle: "Como Usar Esta Lista",
        introText:
          "Use esta sequência para praticar análise exploratória com dados estruturados. Os tópicos avançam de medidas-resumo para detecção de outliers, comparação entre grupos, criação de rankings, clusters, indicadores de risco e relatórios visuais com pandas.",
        searchLabel: "Buscar na lista de exercícios",
        searchPlaceholder: "Digite uma palavra-chave do exercício...",
        topics: "Tópicos",
        type: "Categoria",
        noResults: "Nenhum exercício encontrado para essa busca.",
      };

  const [query, setQuery] = useState("");

  const filteredListas = useMemo(() => {
    if (!collection) return [];

    const trimmed = query.trim();

    if (!trimmed) {
      return collection.listas;
    }

    const normalizedQuery = normalizeText(trimmed);

    return collection.listas
      .map((lista) => {
        const haystack = `${getListTitle(lista, isEn)} ${getListType(lista, isEn)}`;
        const matchesList = normalizeText(haystack).includes(normalizedQuery);

        if (matchesList) {
          return lista;
        }

        const questoes = lista.questoes.filter((questao) =>
          normalizeText(getQuestionText(questao, isEn)).includes(normalizedQuery)
        );

        return { ...lista, questoes };
      })
      .filter((lista) => lista.questoes.length > 0);
  }, [collection, query, isEn]);

  if (!collection) {
    return <Navigate to="/disciplinas/analise-dados" replace />;
  }

  return (
    <PageTemplate>
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/analise-dados" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {txt.back}
        </BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h1.5a2 2 0 0 1 1.88 1.32L9.72 5H18a2 2 0 0 1 2 2v1H4V5Zm0 4h16v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9Zm3 2a1 1 0 0 0 0 2h1v3a1 1 0 1 0 2 0v-3h1a1 1 0 1 0 0-2H7Zm7 0a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Zm3 1a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1Z"
          />
        </svg>
        <span>{getCollectionTitle(collection, isEn)}</span>
      </PageTitle>
      <PageDescription>{getCollectionDescription(collection, isEn)}</PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-3">{txt.datasetTitle}</h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{txt.datasetText}</p>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">{txt.datasetExampleLabel}</p>
        <pre className="overflow-x-auto rounded-2xl bg-slate-950/80 border border-slate-800 px-4 py-4 text-sm text-slate-200">
          <code>{getDatasetExample(collection, isEn)}</code>
        </pre>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-3">{txt.introTitle}</h2>
        <p className="text-slate-300 text-sm leading-relaxed text-justify">{txt.introText}</p>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <label htmlFor="busca-analise-dados" className="block text-sm text-slate-300 mb-3">
          {txt.searchLabel}
        </label>
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
            id="busca-analise-dados"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={txt.searchPlaceholder}
            className="w-full border pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-10">
        <summary className="cursor-pointer text-xl font-semibold text-cyan-300 px-6 md:px-8 py-5">
          {txt.topics}
        </summary>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm px-6 md:px-8 pb-6 md:pb-8">
          {collection.listas.map((lista) => (
            <a
              key={lista.numero}
              href={`#${slugify(getListTitle(lista, isEn))}`}
              className="bg-slate-900/60 rounded-xl px-4 py-3 hover:bg-slate-800/80 transition"
            >
              {getListTitle(lista, isEn)}
            </a>
          ))}
        </div>
      </Panel>

      <div className="space-y-5">
        {filteredListas.map((lista) => (
          <Panel as="details" layout="plain"
            key={lista.numero}
            id={slugify(getListTitle(lista, isEn))}

            open={Boolean(query.trim())}
          >
            <summary className="cursor-pointer text-lg font-semibold text-cyan-300">
              {getListTitle(lista, isEn)}
            </summary>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>{txt.type}: {getListType(lista, isEn)}</span>
              <span>{isEn ? "Exercises" : "Exercícios"}: {lista.questoes.length}</span>
            </div>
            <ol className="mt-5 space-y-2 text-sm text-slate-300 list-decimal list-inside">
              {lista.questoes.map((questao) => (
                <li
                  key={`${lista.numero}-${questao.id}`}
                  value={questao.id}
                  className="text-justify marker:font-bold marker:text-cyan-300"
                >
                  {getQuestionText(questao, isEn)}
                </li>
              ))}
            </ol>
          </Panel>
        ))}
      </div>

      {filteredListas.length === 0 && (
        <p className="text-sm text-slate-400 mt-6">{txt.noResults}</p>
      )}
    </PageTemplate>
  );
}
