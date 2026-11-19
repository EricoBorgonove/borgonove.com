import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";
import { findPostgresqlTopic, postgresqlTopics } from "../data/postgresqlTopics";

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getPrimaryKeyword(command) {
  return command
    .replace(/\\[a-z]+/i, "metacomando")
    .replace(/\.\.\./g, "")
    .split(/\s+/)[0]
    .replace(/[();]/g, "")
    .toUpperCase();
}

function getCommandSyntax(item) {
  if (item.syntax) return item.syntax;

  const command = item.command.toUpperCase();

  if (item.language === "bash") {
    return `${item.command} [opções]`;
  }

  if (command.includes("CREATE TABLE")) return "CREATE TABLE nome_tabela (coluna tipo restrições, ...);";
  if (command.includes("ALTER TABLE")) return "ALTER TABLE nome_tabela ação;";
  if (command.includes("CREATE INDEX")) return "CREATE INDEX nome_indice ON tabela (coluna);";
  if (command.includes("INSERT")) return "INSERT INTO tabela (colunas) VALUES (valores) [RETURNING colunas];";
  if (command.includes("UPDATE")) return "UPDATE tabela SET coluna = valor WHERE condição [RETURNING colunas];";
  if (command.includes("DELETE")) return "DELETE FROM tabela WHERE condição [RETURNING colunas];";
  if (command.includes("SELECT")) return "SELECT colunas FROM tabela [JOIN ...] [WHERE ...] [GROUP BY ...] [ORDER BY ...];";
  if (command.includes("JOIN")) return "SELECT ... FROM tabela_a JOIN tabela_b ON condição;";
  if (command.includes("GRANT")) return "GRANT privilégio ON objeto TO role;";
  if (command.includes("REVOKE")) return "REVOKE privilégio ON objeto FROM role;";
  if (command.includes("BEGIN")) return "BEGIN; comandos; COMMIT;";
  if (command.includes("ROLLBACK")) return "ROLLBACK [TO SAVEPOINT nome];";
  if (command.includes("COPY")) return "COPY tabela [(colunas)] FROM/TO 'arquivo' WITH opções;";
  if (command.includes("WITH")) return "WITH nome AS (consulta) SELECT ... FROM nome;";

  return `${item.command};`;
}

function getCommandCare(item) {
  const text = `${item.command} ${item.description}`.toUpperCase();

  if (text.includes("DROP")) {
    return "Confirme o alvo antes de executar. Comandos DROP removem objetos e podem apagar estrutura, dependências e dados.";
  }
  if (text.includes("TRUNCATE")) {
    return "Use com cuidado: TRUNCATE remove muitas linhas rapidamente e pode reiniciar identidades quando combinado com RESTART IDENTITY.";
  }
  if (text.includes("DELETE")) {
    return "Nunca execute DELETE sem validar o WHERE com um SELECT equivalente. Sem WHERE, a tabela inteira pode ser afetada.";
  }
  if (text.includes("UPDATE")) {
    return "Revise a condição do WHERE e prefira RETURNING em testes para enxergar quais linhas foram alteradas.";
  }
  if (text.includes("INSERT")) {
    return "Verifique tipos, constraints e colunas obrigatórias. Em cargas maiores, considere transação e validação prévia.";
  }
  if (text.includes("BACKUP") || text.includes("PG_DUMP") || text.includes("PG_RESTORE")) {
    return "Teste a restauração periodicamente. Backup só é confiável quando você confirma que consegue recuperar os dados.";
  }
  if (text.includes("GRANT") || text.includes("REVOKE") || text.includes("ROLE")) {
    return "Aplique o menor privilégio possível. Conceda apenas os acessos necessários para a atividade.";
  }
  if (text.includes("INDEX") || text.includes("ÍNDICE")) {
    return "Índices aceleram leituras específicas, mas ocupam espaço e tornam INSERT, UPDATE e DELETE mais custosos.";
  }
  if (text.includes("EXPLAIN ANALYZE")) {
    return "EXPLAIN ANALYZE executa a consulta. Em comandos de escrita, use uma transação de teste para poder desfazer.";
  }
  if (text.includes("JOIN")) {
    return "Confira se a condição ON representa corretamente o relacionamento. JOINs incompletos podem multiplicar linhas sem perceber.";
  }
  if (text.includes("COPY") || text.includes("\\COPY")) {
    return "Confira encoding, separador, cabeçalho e permissões de arquivo antes de importar ou exportar dados.";
  }
  if (text.includes("TRANSACTION") || text.includes("COMMIT") || text.includes("ROLLBACK") || text.includes("SAVEPOINT")) {
    return "Mantenha transações curtas. Transações longas podem segurar bloqueios e atrapalhar outros usuários.";
  }

  return "Execute primeiro em um banco de estudos, confira o resultado e só depois adapte para uma base real.";
}

function getExampleReading(item, translate) {
  const example = String(item.example || "");
  const lines = example.split("\n").map((line) => line.trim()).filter(Boolean);
  const firstLine = lines[0] || item.command;
  const clauses = [
    "SELECT",
    "FROM",
    "WHERE",
    "JOIN",
    "GROUP BY",
    "HAVING",
    "ORDER BY",
    "LIMIT",
    "RETURNING",
    "WITH",
    "ON CONFLICT",
    "REFERENCES",
  ].filter((clause) => example.toUpperCase().includes(clause));

  const clauseText = clauses.length
    ? translate(" Repare nas partes usadas: {{0}}.", [clauses.join(", ")])
    : "";

  return translate('Leia o exemplo por partes, começando por "{{0}}". Primeiro encontre o objeto principal; depois observe as condições, colunas e opções aplicadas.{{1}}', [firstLine, clauseText]);
}

function getDetailedExplanation(item, translate) {
  const keyword = getPrimaryKeyword(item.command);

  return [
    {
      label: "Objetivo",
      text: translate("{{0}} Neste ponto da aula, quero que você entenda não apenas o comando, mas a situação em que ele resolve um problema real no banco.", [translate(item.description)]),
    },
    {
      label: "Sintaxe mental",
      text: getCommandSyntax(item),
      monospace: true,
    },
    {
      label: "Como pensar",
      text: `Ao montar sua resposta, comece pelo verbo principal (${keyword}). Depois identifique o objeto afetado, as colunas envolvidas, os filtros necessários e o resultado que você espera conferir.`,
    },
    {
      label: "Leitura do exemplo",
      text: getExampleReading(item, translate),
    },
    {
      label: "Cuidado",
      text: getCommandCare(item),
    },
  ];
}

export default function PostgresqlTopico() {
  const { text: uiText } = useContentTranslation();

  const { topicSlug } = useParams();
  const topic = findPostgresqlTopic(topicSlug);
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeText(query.trim());
  const filteredCommands = useMemo(() => {
    if (!topic) {
      return [];
    }

    if (!normalizedQuery) {
      return topic.commands;
    }

    return topic.commands.filter((item) => {
      const commandText = normalizeText(
        `${item.command} ${item.description} ${item.usage || ""} ${item.example || ""} ${topic.category}`
      );

      return commandText.includes(normalizedQuery);
    });
  }, [normalizedQuery, topic]);

  if (!topic) {
    return <Navigate to="/disciplinas/postgresql" replace />;
  }

  const currentIndex = postgresqlTopics.findIndex((item) => item.slug === topic.slug);
  const previousTopic = postgresqlTopics[currentIndex - 1];
  const nextTopic = postgresqlTopics[currentIndex + 1];

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas/postgresql"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >{uiText("Voltar para PostgreSQL")}</BackButton>
      </div>

      <div className="mb-10 max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
            {uiText(topic.category)}
          </span>
          <span className="text-sm font-semibold text-slate-500">{uiText("Assunto ")}{uiText(topic.order)}{uiText(" de ")}{uiText(postgresqlTopics.length)}
          </span>
        </div>
        <PageTitle className="mb-4">{uiText(topic.title)}</PageTitle>
        <p className="text-lg leading-relaxed text-slate-400">{uiText(topic.introduction)}</p>
      </div>

      {topic.concepts && (
        <div className="mb-8">
          <h2 className="mb-5 text-2xl font-semibold text-cyan-300">{uiText("Conceitos principais")}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {topic.concepts.map(([name, description]) => (
              <Panel as="article" layout="plain" key={name}>
                <h3 className="mb-2 text-base font-semibold text-slate-100">{uiText(name)}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{uiText(description)}</p>
              </Panel>
            ))}
          </div>
        </div>
      )}

      {topic.notes && (
        <Panel as="div" layout="plain" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-cyan-300">{uiText("Pontos importantes")}</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
            {topic.notes.map((note) => (
              <li key={note} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                <span>{uiText(note)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel as="div" layout="plain" className="mb-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-cyan-300">{uiText("Índice de comandos")}</h2>
          <span className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-200">
            {uiText(query.trim() ? `${filteredCommands.length}/${topic.commands.length}` : topic.commands.length)}{uiText(" exemplos")}</span>
        </div>
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label htmlFor="busca-comandos-postgresql" className="text-xl font-semibold text-cyan-300">{uiText("Buscar comando")}</label>
          {query.trim() && (
            <Button variant="secondary"
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center justify-center border border-slate-700 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-100"
            >{uiText("Limpar busca")}</Button>
          )}
        </div>
        <Input
          id="busca-comandos-postgresql"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={uiText("Ex.: SELECT, CHECK, índice, permissão...")}
          className="mb-5 w-full border text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCommands.map((item, index) => (
            <a
              key={`${item.command}-index-${index}`}
              href={`#comando-${index + 1}`}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-200"
            >
              <span className="mr-2 text-cyan-300">{uiText(String(index + 1).padStart(2, "0"))}</span>
              {uiText(item.command)}
            </a>
          ))}
        </div>
      </Panel>

      <div>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-cyan-300">{uiText("Comandos e exemplos")}</h2>
            <p className="mt-2 text-sm text-slate-400">{uiText("Use os exemplos como ponto de partida. Primeiro rode em um banco de estudos; depois adapte nomes de tabelas e colunas ao seu próprio cenário.")}</p>
          </div>
          <a
            href={topic.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300"
          >{uiText("Documentação oficial")}<span aria-hidden="true">↗</span>
          </a>
        </div>

        {filteredCommands.length > 0 ? (
          <div className="space-y-5">
          {filteredCommands.map((item, index) => (
            <Panel as="article" layout="plain"
              key={`${item.command}-${index}`}
              id={`comando-${index + 1}`}
              className="scroll-mt-24"
            >
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  {uiText(String(index + 1).padStart(2, "0"))}
                </p>
                <h3 className="text-xl font-semibold text-slate-100">{uiText(item.command)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{uiText(item.description)}</p>
                {item.usage && (
                  <p className="mt-3 rounded-xl border border-cyan-400/15 bg-cyan-500/10 px-4 py-3 text-sm leading-relaxed text-slate-300">
                    <span className="font-semibold text-cyan-200">{uiText("Quando usar: ")}</span>
                    {uiText(item.usage)}
                  </p>
                )}
              </div>
              <div className="mb-5 grid gap-3 lg:grid-cols-2">
                {getDetailedExplanation(item, uiText).map((detail) => (
                  <div
                    key={detail.label}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                      {uiText(detail.label)}
                    </p>
                    <p className={`text-sm leading-relaxed text-slate-300 ${detail.monospace ? "font-mono" : ""}`}>
                      {uiText(detail.text)}
                    </p>
                  </div>
                ))}
              </div>
              <CodeBlock language={item.language || "sql"} label={uiText(item.language === "bash" ? "Terminal" : "SQL")}>
                {item.example}
              </CodeBlock>
            </Panel>
          ))}
          </div>
        ) : (
          <Panel as="div" layout="plain" className="text-center">
            <h2 className="mb-2 text-2xl font-semibold text-slate-100">{uiText("Nenhum comando encontrado")}</h2>
            <p className="text-sm leading-relaxed text-slate-400">{uiText("Tente procurar pelo nome do comando, pela finalidade dele ou por alguma palavra que apareça no exemplo.")}</p>
          </Panel>
        )}
      </div>

      <nav className="mt-10 grid gap-4 sm:grid-cols-2" aria-label={uiText("Navegação entre assuntos")}>
        {previousTopic ? (
          <Panel as={Link} layout="plain"
            to={`/disciplinas/postgresql/${previousTopic.slug}`}
            className="theme-hover-border transition hover:-translate-y-1"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{uiText("Anterior")}</p>
            <p className="font-semibold text-cyan-200">← {uiText(previousTopic.title)}</p>
          </Panel>
        ) : <div />}

        {nextTopic && (
          <Panel as={Link} layout="plain"
            to={`/disciplinas/postgresql/${nextTopic.slug}`}
            className="theme-hover-border text-right transition hover:-translate-y-1"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{uiText("Próximo")}</p>
            <p className="font-semibold text-cyan-200">{uiText(nextTopic.title)} →</p>
          </Panel>
        )}
      </nav>
    </PageTemplate>
  );
}
