import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Select } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import exercicios from "../data/modelagens-listas.json";
import { translatePtToEn } from "../utils/ptEnTranslate";

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getExerciseTitle(item, isEn) {
  if (!isEn) return item.titulo;
  return item.titulo_en || translatePtToEn(item.titulo);
}

function getExerciseDescription(item, isEn) {
  if (!isEn) return item.descricao;
  return item.descricao_en || translatePtToEn(item.descricao);
}

export default function ModelagemDados() {
  const { text: uiText } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const sortLocale = isEn ? "en-US" : "pt-BR";
  const txt = isEn
    ? {
        back: "Back to subjects",
        title: "Database Modeling",
        subtitle: "Unified list of conceptual and logical modeling scenarios.",
        briefTitle: "General statement",
        briefText:
          "Develop conceptual and logical modeling for each scenario below. For each exercise, provide at least: entities with attributes and keys, relationships with cardinality, associative entities for N:N, specializations when applicable, business rules, ERD, normalized relational mapping (up to 3NF when appropriate), essential constraints (PK, FK, UNIQUE, CHECK, NOT NULL), and audit fields.",
        totalLoaded: "Total modeling exercises loaded",
        searchTitleOrText: "Search (title or text)",
        searchPlaceholder: "Type to filter...",
        searchById: "Search by ID",
        sortBy: "Sort by",
        perPage: "Items per page",
        typeExample: "Ex.: 120",
        idAsc: "ID ↑",
        idDesc: "ID ↓",
        titleAsc: "Title A-Z",
        titleDesc: "Title Z-A",
        noResult: "No exercise found for this search.",
        previous: "Previous",
        next: "Next",
      }
    : {
        back: "Voltar para Disciplinas",
        title: "Modelagem de Banco de Dados",
        subtitle: "Lista unificada de cenários de modelagem conceitual e lógica.",
        briefTitle: "Enunciado Geral",
        briefText:
          "Desenvolva a modelagem conceitual e lógica para cada cenário listado abaixo. Para cada exercício, entregue no mínimo: entidades com atributos e chaves, relacionamentos com cardinalidade, entidades-associação para N:N, especializações quando aplicável, regras de negócio, DER e mapeamento relacional normalizado (até 3FN quando fizer sentido), além de constraints essenciais (PK, FK, UNIQUE, CHECK, NOT NULL) e campos de auditoria.",
        totalLoaded: "Total de modelagens carregadas",
        searchTitleOrText: "Buscar (título ou texto)",
        searchPlaceholder: "Digite para filtrar...",
        searchById: "Buscar por ID",
        sortBy: "Ordenar por",
        perPage: "Itens por página",
        typeExample: "Ex.: 120",
        idAsc: "ID ↑",
        idDesc: "ID ↓",
        titleAsc: "Título A-Z",
        titleDesc: "Título Z-A",
        noResult: "Nenhum exercício encontrado para essa busca.",
        previous: "Anterior",
        next: "Próxima",
      };

  const [query, setQuery] = useState("");
  const [idQuery, setIdQuery] = useState("");
  const [orderBy, setOrderBy] = useState("id-asc");
  const [perPage, setPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    const normalizedId = idQuery.trim();
    const idFilter = normalizedId === "" ? null : Number(normalizedId);

    const list = exercicios.filter((item) => {
      const matchesText = normalizedQuery
        ? normalizeText(`${getExerciseTitle(item, isEn)} ${getExerciseDescription(item, isEn)}`).includes(normalizedQuery)
        : true;
      const matchesId = idFilter === null || (Number.isInteger(idFilter) && item.id === idFilter);
      return matchesText && matchesId;
    });

    list.sort((a, b) => {
      switch (orderBy) {
        case "id-desc":
          return b.id - a.id;
        case "titulo-asc":
          return getExerciseTitle(a, isEn).localeCompare(getExerciseTitle(b, isEn), sortLocale);
        case "titulo-desc":
          return getExerciseTitle(b, isEn).localeCompare(getExerciseTitle(a, isEn), sortLocale);
        case "id-asc":
        default:
          return a.id - b.id;
      }
    });

    return list;
  }, [orderBy, query, idQuery, sortLocale, isEn]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * perPage;
  const end = start + perPage;
  const pageItems = filtered.slice(start, end);

  function handlePageChange(page) {
    const next = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(next);
  }

  function renderPages() {
    const pages = [];
    const windowSize = 5;
    const left = Math.max(1, safePage - 2);
    const right = Math.min(totalPages, left + windowSize - 1);
    const startPage = Math.max(1, right - windowSize + 1);

    for (let p = startPage; p <= right; p += 1) {
      pages.push(p);
    }

    return pages;
  }

  return (
    <PageTemplate>
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">{uiText(txt.back)}</BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v1H3V6Zm0 3h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Zm4 2a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H7Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>
      <PageDescription>{uiText(txt.subtitle)}</PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-3">{uiText(txt.briefTitle)}</h2>
        <p className="text-slate-300 text-sm leading-relaxed text-justify">
          {uiText(txt.briefText)}
        </p>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <p className="text-xs text-slate-400 mb-4">
          {uiText(txt.totalLoaded)}: {uiText(exercicios.length)}
        </p>
        <div className="grid md:grid-cols-12 gap-3">
          <label className="block md:col-span-5">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.searchTitleOrText)}</span>
            <Input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder={uiText(txt.searchPlaceholder)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.searchById)}</span>
            <Input
              type="number"
              min="1"
              value={idQuery}
              onChange={(event) => {
                setIdQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder={uiText(txt.typeExample)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block md:col-span-3">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.sortBy)}</span>
            <Select
              value={orderBy}
              onChange={(event) => {
                setOrderBy(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="id-asc">{uiText(txt.idAsc)}</option>
              <option value="id-desc">{uiText(txt.idDesc)}</option>
              <option value="titulo-asc">{uiText(txt.titleAsc)}</option>
              <option value="titulo-desc">{uiText(txt.titleDesc)}</option>
            </Select>
          </label>

          <label className="block md:col-span-2">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.perPage)}</span>
            <Select
              value={perPage}
              onChange={(event) => {
                setPerPage(Number(event.target.value));
                setCurrentPage(1);
              }}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Select>
          </label>
        </div>
      </Panel>

      {pageItems.length > 0 ? (
        <div className="space-y-4">
          {pageItems.map((item) => (
            <Panel as="article" layout="plain" key={item.id}>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center min-w-10 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-slate-950">
                  #{uiText(item.id)}
                </span>
                <h3 className="text-lg font-semibold text-cyan-300">{uiText(getExerciseTitle(item, isEn))}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed text-justify">{uiText(getExerciseDescription(item, isEn))}</p>
            </Panel>
          ))}
        </div>
      ) : (
        <Panel as="div" layout="plain" className="text-center text-slate-400">
          {uiText(txt.noResult)}
        </Panel>
      )}

      <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
        <Button variant="secondary"
          type="button"
          onClick={() => handlePageChange(safePage - 1)}
          disabled={safePage === 1}
          className="border border-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-400 transition"
        >
          {uiText(txt.previous)}
        </Button>

        {renderPages().map((page) => (
          <Button variant="custom"
            key={`page-${page}`}
            type="button"
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg border transition ${
              page === safePage
                ? "bg-cyan-500 text-slate-900 border-cyan-400"
                : "border-slate-700 text-slate-200 hover:border-cyan-400"
            }`}
          >
            {uiText(page)}
          </Button>
        ))}

        <Button variant="secondary"
          type="button"
          onClick={() => handlePageChange(safePage + 1)}
          disabled={safePage === totalPages}
          className="border border-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-400 transition"
        >
          {uiText(txt.next)}
        </Button>
      </div>
    </PageTemplate>
  );
}
