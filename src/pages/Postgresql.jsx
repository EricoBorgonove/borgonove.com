import { Button, Input, PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import { getPostgresqlExerciseQuestion, postgresqlExerciseLists } from "../data/postgresqlExercises";
import { postgresqlTopics } from "../data/postgresqlTopics";

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function Postgresql() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeText(query.trim());
  const filteredTopics = useMemo(() => {
    if (!normalizedQuery) {
      return postgresqlTopics;
    }

    return postgresqlTopics.filter((topic) => {
      const commandText = topic.commands
        .map((command) => `${command.command} ${command.description} ${command.usage || ""}`)
        .join(" ");
      const topicText = normalizeText(`${topic.title} ${topic.summary} ${topic.category} ${commandText}`);

      return topicText.includes(normalizedQuery);
    });
  }, [normalizedQuery]);
  const filteredExerciseBlocks = useMemo(() => {
    const blocks = postgresqlExerciseLists.flatMap((list) =>
      list.blocks.map((block) => ({ ...block, list }))
    );

    if (!normalizedQuery) {
      return blocks;
    }

    return blocks.filter((block) => {
      const exerciseText = block.exercises.map(getPostgresqlExerciseQuestion).join(" ");
      const blockText = normalizeText(`${block.title} ${block.summary} ${block.level} ${exerciseText}`);

      return blockText.includes(normalizedQuery);
    });
  }, [normalizedQuery]);
  const hasSearch = query.trim().length > 0;

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >
          Voltar para Disciplinas
        </BackButton>
      </div>

      <PageHeader>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Banco de dados relacional
        </p>
        <PageTitle className="mb-4">PostgreSQL</PageTitle>
        <PageDescription>
          Nesta disciplina, você vai entender o PostgreSQL por partes: primeiro os conceitos, depois os comandos, os exemplos e a prática. Escolha um assunto e estude como se estivéssemos organizando a aula passo a passo.
        </PageDescription>
      </PageHeader>

      <div className="mb-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Link to="/disciplinas/postgresql/material-apoio" className="group block">
            <Panel as="article" layout="plain" className="theme-hover-border transition duration-300 hover:-translate-y-1">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="mb-4 inline-flex rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                    Material de apoio
                  </span>
                  <h2 className="mb-2 text-2xl font-semibold text-slate-100">Material de apoio PostgreSQL</h2>
                  <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
                    Use este material quando precisar escolher tipos de dados, revisar constraints, conferir operadores ou lembrar funções importantes.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  Abrir material
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Panel>
          </Link>
          <Link to="/disciplinas/postgresql/bancos-temporais" className="group block">
            <Panel as="article" layout="plain" className="theme-hover-border transition duration-300 hover:-translate-y-1">
              <div className="flex h-full flex-col gap-5 md:justify-between">
                <div>
                  <span className="mb-4 inline-flex rounded-lg border border-orange-300/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-100">
                    Conteúdo temporal
                  </span>
                  <h2 className="mb-2 text-2xl font-semibold text-slate-100">Bancos Temporais</h2>
                  <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
                    Entenda tempo de validade, tempo de sistema, ranges, snapshots, auditoria, integridade temporal e consultas históricas.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  Abrir conteúdo
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Panel>
          </Link>
          <Link to="/disciplinas/postgresql/exercicios" className="group block">
            <Panel as="article" layout="plain" className="theme-hover-border transition duration-300 hover:-translate-y-1">
              <div className="flex h-full flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="mb-4 inline-flex rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                    Prática guiada
                  </span>
                  <h2 className="mb-2 text-2xl font-semibold text-slate-100">Exercícios PostgreSQL</h2>
                  <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
                    Primeiro tente resolver com calma; depois confira a resposta para comparar seu raciocínio e corrigir o que for necessário.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  Abrir exercícios
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Panel>
          </Link>
        </div>
      </div>

      <Panel as="div" layout="plain" className="mb-8">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label htmlFor="busca-postgresql-assuntos" className="text-xl font-semibold text-cyan-300">
            O que você quer estudar agora?
          </label>
          {hasSearch && (
            <Button variant="secondary"
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center justify-center border border-slate-700 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-100"
            >
              Limpar busca
            </Button>
          )}
        </div>
        <Input
          id="busca-postgresql-assuntos"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex.: create table, join, permissões, backup..."
          className="w-full border text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
        />
      </Panel>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {hasSearch && filteredExerciseBlocks.map((block) => (
          <Link
            key={`exercicio-${block.slug}`}
            to={`/disciplinas/postgresql/exercicios/${block.list.slug}/${block.slug}`}
            className="group block"
          >
            <Panel as="article" layout="plain" className="theme-hover-border flex h-full flex-col transition duration-300 hover:-translate-y-1">
              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  Exercícios
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {String(block.order).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mb-3 text-xl font-semibold text-slate-100">{block.title}</h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{block.summary}</p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                Abrir exercícios
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </Panel>
          </Link>
        ))}
        {filteredTopics.map((topic) => (
          <Link
            key={topic.slug}
            to={`/disciplinas/postgresql/${topic.slug}`}
            className="group block"
          >
            <Panel as="article" layout="plain" className="theme-hover-border flex h-full flex-col transition duration-300 hover:-translate-y-1">
              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  {topic.category}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {String(topic.order).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mb-3 text-xl font-semibold text-slate-100">{topic.title}</h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{topic.summary}</p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                Abrir assunto
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </Panel>
          </Link>
        ))}
      </div>

      {filteredTopics.length === 0 && filteredExerciseBlocks.length === 0 && (
        <Panel as="div" layout="plain" className="mt-8 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-slate-100">Nenhum assunto encontrado</h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Tente buscar pelo nome de um comando, por uma categoria ou pela finalidade do que você quer fazer no banco.
          </p>
        </Panel>
      )}
    </PageTemplate>
  );
}
