import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { findPostgresqlTable } from "../data/postgresqlTables";

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function slugify(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getHighlightBounds(value, query) {
  const text = String(value);
  const normalizedQuery = normalizeText(query.trim());

  if (!normalizedQuery) {
    return null;
  }

  let normalizedText = "";
  const indexMap = [];

  [...text].forEach((character, index) => {
    const normalizedCharacter = normalizeText(character);
    normalizedText += normalizedCharacter;

    for (let offset = 0; offset < normalizedCharacter.length; offset += 1) {
      indexMap.push(index);
    }
  });

  const start = normalizedText.indexOf(normalizedQuery);

  if (start === -1) {
    return null;
  }

  const end = start + normalizedQuery.length - 1;

  return {
    start: indexMap[start],
    end: indexMap[end] + 1,
  };
}

function HighlightText({ value, query, translate = true }) {
  const { text: uiText } = useContentTranslation();

  const text = translate ? uiText(String(value)) : String(value);
  const bounds = getHighlightBounds(text, query);

  if (!bounds) {
    return text;
  }

  return (
    <>
      {text.slice(0, bounds.start)}
      <mark className="rounded bg-cyan-400/20 px-1 text-cyan-100">
        {text.slice(bounds.start, bounds.end)}
      </mark>
      {text.slice(bounds.end)}
    </>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M9 4.5h6M9 4.5A2.5 2.5 0 0 1 11.5 2h1A2.5 2.5 0 0 1 15 4.5M9 4.5H7A2 2 0 0 0 5 6.5V20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2h-2M8.5 9h7M8.5 13h7M8.5 17h4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="m5 12.5 4.2 4.2L19 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function getRowLevel(row) {
  if (row.level) {
    return row.level;
  }

  const text = normalizeText(`${row.name} ${row.category} ${row.description}`);
  const advancedTerms = [
    "json",
    "array",
    "range",
    "regex",
    "exclude",
    "particionamento",
    "deferrable",
    "unlogged",
    "tablespace",
    "tsvector",
    "rede",
    "geometrico",
    "cte",
    "window",
  ];
  const intermediateTerms = [
    "foreign",
    "references",
    "join",
    "group",
    "having",
    "cast",
    "case",
    "filter",
    "interval",
    "timestamp",
    "coalesce",
    "nullif",
    "unique",
  ];

  if (advancedTerms.some((term) => text.includes(term))) {
    return "Avançado";
  }

  if (intermediateTerms.some((term) => text.includes(term))) {
    return "Intermediário";
  }

  return "Básico";
}

function isExamImportant(row) {
  if (typeof row.exam === "boolean") {
    return row.exam;
  }

  const text = normalizeText(`${row.name} ${row.category} ${row.description}`);
  const importantTerms = [
    "primary key",
    "foreign key",
    "references",
    "not null",
    "unique",
    "check",
    "default",
    "integer",
    "varchar",
    "text",
    "date",
    "timestamp",
    "boolean",
    "numeric",
    "count",
    "sum",
    "avg",
    "case",
    "coalesce",
    "null",
    "between",
    "like",
    "in",
    "and",
    "or",
  ];

  return importantTerms.some((term) => text.includes(term));
}

function LevelBadge({ level }) {
  const { text: uiText } = useContentTranslation();

  const classes = {
    Básico: "postgres-level-basic",
    Intermediário: "postgres-level-intermediate",
    Avançado: "postgres-level-advanced",
  };

  return (
    <span className={`postgres-level-badge ${classes[level] || classes.Básico}`}>
      {uiText(level)}
    </span>
  );
}

function ReferenceTable({ columns, section, copiedKey, onCopyExample, query }) {
  const { text: uiText } = useContentTranslation();

  return (
    <TableContainer className="rounded-2xl border border-slate-800">
      <Table className="min-w-[980px] w-full text-left text-sm bg-slate-950/70">
        <thead className="bg-slate-900/90">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold text-slate-100">
                {uiText(column.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uiText(section.rows.map((row, rowIndex) => {
            const rowKey = `${section.title}-${row.name}-${rowIndex}`;
            const level = getRowLevel(row);
            const examImportant = isExamImportant(row);

            return (
            <tr key={rowKey} className="border-t border-slate-800">
              {columns.map((column, columnIndex) => (
                <td
                  key={`${section.title}-${row.name}-${column.key}`}
                  className="px-4 py-3 align-top text-slate-300"
                >
                  {uiText(column.key === "example" ? (
                    <div className="flex min-w-[220px] items-start justify-between gap-3">
                      <code className="whitespace-pre-wrap text-slate-200">
                        <HighlightText value={row[column.key]} query={query} translate={false} />
                      </code>
                      <Button variant="secondary"
                        type="button"
                        onClick={() => onCopyExample(row[column.key], rowKey)}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100"
                        aria-label={
                          uiText(copiedKey === rowKey
                            ? `Exemplo copiado: ${row[column.key]}`
                            : `Copiar exemplo: ${row[column.key]}`)
                        }
                        title={uiText(copiedKey === rowKey ? "Copiado" : "Copiar exemplo")}
                      >
                        {copiedKey === rowKey ? <CheckIcon /> : <ClipboardIcon />}
                      </Button>
                    </div>
                  ) : columnIndex === 0 ? (
                    <div className="min-w-[180px]">
                      <code className="font-semibold text-cyan-300">
                        <HighlightText value={row[column.key]} query={query} />
                      </code>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <LevelBadge level={level} />
                        {examImportant && (
                          <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-200">{uiText("Essencial")}</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <HighlightText value={row[column.key]} query={query} />
                  ))}
                </td>
              ))}
            </tr>
            );
          }))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default function PostgresqlTabelaDetalhe() {
  const { text: uiText } = useContentTranslation();

  const { tableSlug } = useParams();
  const table = findPostgresqlTable(tableSlug);
  const [query, setQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState("");

  const normalizedQuery = normalizeText(query.trim());
  const filteredSections = useMemo(() => {
    if (!table) {
      return [];
    }

    if (!normalizedQuery) {
      return table.sections;
    }

    return table.sections
      .map((section) => {
        const sectionText = normalizeText(`${uiText(section.title)} ${uiText(section.description)}`);
        const rows = section.rows.filter((row) => {
          const rowText = normalizeText(Object.values(row).map((value) => uiText(value)).join(" "));

          return sectionText.includes(normalizedQuery) || rowText.includes(normalizedQuery);
        });

        return { ...section, rows };
      })
      .filter((section) => section.rows.length > 0);
  }, [normalizedQuery, table, uiText]);

  if (!table) {
    return <Navigate to="/disciplinas/postgresql/material-apoio" replace />;
  }

  const hasSearch = query.trim().length > 0;

  async function handleCopyExample(example, rowKey) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(example);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = example;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopiedKey(rowKey);
    window.setTimeout(() => {
      setCopiedKey((currentKey) => (currentKey === rowKey ? "" : currentKey));
    }, 1400);
  }

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas/postgresql/material-apoio"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >{uiText("Voltar para Material de apoio")}</BackButton>
      </div>

      <div className="mb-8 max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
            {uiText(table.category)}
          </span>
          <span className="text-sm font-semibold text-slate-500">{uiText("Material ")}{uiText(String(table.order).padStart(2, "0"))}
          </span>
        </div>
        <PageTitle className="mb-4">{uiText(table.title)}</PageTitle>
        <p className="text-lg leading-relaxed text-slate-400">{uiText(table.summary)}</p>
      </div>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-cyan-300">{uiText("Como usar este material")}</h2>
        <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
          {table.notes.map((note) => (
            <li key={note} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{uiText(note)}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <label htmlFor="busca-tabela-postgresql" className="text-xl font-semibold text-cyan-300">{uiText("Buscar neste material")}</label>
          </div>
          {hasSearch && (
            <Button variant="secondary"
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center justify-center border border-slate-700 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-100"
            >{uiText("Limpar busca")}</Button>
          )}
        </div>
        <Input
          id="busca-tabela-postgresql"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={uiText("Ex.: json, null, primary key, date, between...")}
          className="w-full border text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
        />
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-cyan-300">{uiText("Navegação rápida")}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSections.map((section, index) => (
            <a
              key={section.title}
              href={`#${slugify(section.title)}`}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-200"
            >
              <span className="mr-2 text-cyan-300">{uiText(String(index + 1).padStart(2, "0"))}</span>
              {uiText(section.title)}
            </a>
          ))}
        </div>
      </Panel>

      {filteredSections.length > 0 ? (
        <div className="space-y-8">
          {filteredSections.map((section, index) => (
          <Panel as="article" layout="plain" key={section.title} id={slugify(section.title)}>
            <div className="mb-5">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">{uiText("Seção ")}{uiText(String(index + 1).padStart(2, "0"))}
              </p>
              <h2 className="mb-2 text-2xl font-semibold text-slate-100">{uiText(section.title)}</h2>
              <p className="text-sm leading-relaxed text-slate-400">{uiText(section.description)}</p>
            </div>

            <ReferenceTable
              columns={table.columns}
              section={section}
              copiedKey={copiedKey}
              onCopyExample={handleCopyExample}
              query={query}
            />
          </Panel>
          ))}
        </div>
      ) : (
        <Panel as="div" layout="plain" className="text-center">
          <h2 className="mb-2 text-2xl font-semibold text-slate-100">{uiText("Nenhum item encontrado")}</h2>
          <p className="text-sm leading-relaxed text-slate-400">{uiText("Tente buscar por outro termo, como o nome do comando, tipo, categoria ou parte do exemplo.")}</p>
        </Panel>
      )}
    </PageTemplate>
  );
}
