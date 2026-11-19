import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel, Select, Table, TableContainer } from "../components/ui/Patterns";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";
import { postgresqlLojaTemporalExerciseList } from "../data/postgresqlLojaTemporalExercises";

const navItems = [
  ["introducao", "Introdução"],
  ["tipos-tempo", "Tipos de tempo"],
  ["intervalos", "Intervalos"],
  ["modelo-dados", "Modelo de dados"],
  ["loja-temporal", "Exercícios Loja"],
  ["consultas-sql", "Consultas SQL"],
  ["integridade-temporal", "Integridade temporal"],
  ["auditoria", "Auditoria"],
  ["desempenho", "Desempenho"],
  ["aplicacoes", "Aplicações"],
  ["glossario", "Glossário"],
  ["exercicios", "Exercícios"],
];

const priceTimeline = [
  { month: "Janeiro", date: "2026-01-15", price: "R$ 3.000,00", range: "[01/01/2026, 01/02/2026)" },
  { month: "Fevereiro", date: "2026-02-15", price: "R$ 3.200,00", range: "[01/02/2026, 01/03/2026)" },
  { month: "Março", date: "2026-03-15", price: "R$ 3.150,00", range: "[01/03/2026, 01/04/2026)" },
  { month: "Abril", date: "2026-04-15", price: "R$ 3.400,00", range: "[01/04/2026, 01/05/2026)" },
];

const snapshotRows = {
  "2025-12-15": [
    ["Notebook", "R$ 3.080,00", "Informática"],
    ["Headset", "R$ 340,00", "Áudio"],
    ["Roteador", "R$ 480,00", "Redes"],
  ],
  "2026-01-15": [
    ["Notebook", "R$ 3.000,00", "Informática"],
    ["Headset", "R$ 360,00", "Áudio"],
    ["Roteador", "R$ 510,00", "Redes"],
  ],
  "2026-02-15": [
    ["Notebook", "R$ 3.200,00", "Informática"],
    ["Headset", "R$ 355,00", "Áudio"],
    ["Roteador", "R$ 525,00", "Redes"],
  ],
  "2026-03-15": [
    ["Notebook", "R$ 3.150,00", "Informática"],
    ["Headset", "R$ 370,00", "Áudio"],
    ["Roteador", "R$ 515,00", "Redes"],
  ],
};

const rangeTypes = [
  ["daterange", "Intervalos de datas, ideal para validade mensal, contratos, promoções e calendários."],
  ["tsrange", "Intervalos de data e hora sem fuso horário, útil quando o contexto local é suficiente."],
  ["tstzrange", "Intervalos de data e hora com fuso horário, indicado para sistemas distribuídos."],
  ["int4range", "Intervalos de inteiros de 32 bits, comum em faixas discretas pequenas."],
  ["int8range", "Intervalos de inteiros de 64 bits, usado quando os limites podem ser grandes."],
  ["numrange", "Intervalos numéricos, útil para faixas de valores decimais."],
];

const operators = [
  ["@>", "O intervalo contém o valor", "valid_at @> DATE '2026-01-15'"],
  ["<@", "O valor ou intervalo está contido", "DATE '2026-01-15' <@ valid_at"],
  ["&&", "Os intervalos se sobrepõem", "periodo_a && periodo_b"],
  ["-|-", "Os intervalos são adjacentes", "periodo_a -|- periodo_b"],
  ["<<", "O primeiro intervalo está totalmente à esquerda", "periodo_a << periodo_b"],
  [">>", "O primeiro intervalo está totalmente à direita", "periodo_a >> periodo_b"],
  ["*", "Interseção entre intervalos", "periodo_a * periodo_b"],
  ["+", "União entre intervalos compatíveis", "periodo_a + periodo_b"],
];

const revenueBars = [
  ["Jan", 42],
  ["Fev", 58],
  ["Mar", 51],
  ["Abr", 76],
  ["Mai", 68],
  ["Jun", 88],
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Section({ id, title, eyebrow, children }) {
  const { text: uiText } = useContentTranslation();

  return (
    <section id={id} className="scroll-mt-32 py-10">
      <div className="mb-6">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
            {uiText(eyebrow)}
          </p>
        )}
        <h2 className="text-3xl font-black text-slate-100 md:text-4xl">{uiText(title)}</h2>
      </div>
      {children}
    </section>
  );
}

function FieldTable({ rows }) {
  const { text: uiText } = useContentTranslation();

  return (
    <TableContainer className="rounded-2xl border border-slate-800">
      <Table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <thead className="bg-slate-950/70 text-cyan-200">
          <tr>
            <th className="px-4 py-3 font-semibold">{uiText("Campo")}</th>
            <th className="px-4 py-3 font-semibold">{uiText("Tipo")}</th>
            <th className="px-4 py-3 font-semibold">{uiText("Finalidade")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([field, type, purpose]) => (
            <tr key={`${field}-${type}`} className="border-t border-slate-800">
              <td className="px-4 py-3 font-semibold text-slate-100">{uiText(field)}</td>
              <td className="px-4 py-3 text-cyan-200">{uiText(type)}</td>
              <td className="px-4 py-3 text-slate-400">{uiText(purpose)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

function TimelineGraphic({ selectedMonth, onSelectMonth }) {
  const { text: uiText } = useContentTranslation();

  return (
    <Panel as="div" layout="plain">
      <div className="grid gap-3 md:grid-cols-4">
        {uiText(priceTimeline.map((item) => {
          const active = item.month === selectedMonth;
          return (
            <Button variant="custom"
              key={item.month}
              type="button"
              onClick={() => onSelectMonth(item.month)}
              className={`rounded-xl border p-4 text-left transition ${
                active
                  ? "border-cyan-300 bg-cyan-500/15 text-cyan-100"
                  : "border-slate-800 bg-slate-950/50 text-slate-300 hover:border-cyan-500/60"
              }`}
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {uiText(item.month)}
              </span>
              <span className="mt-2 block text-xl font-black">{uiText(item.price)}</span>
              <span className="mt-2 block text-xs text-slate-400">{uiText(item.range)}</span>
            </Button>
          );
        }))}
      </div>
      <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm leading-relaxed text-cyan-50">{uiText("Em ")}{uiText(selectedMonth)}{uiText(", o preço válido do Notebook é")}{" "}
        <strong>{uiText(priceTimeline.find((item) => item.month === selectedMonth)?.price)}</strong>.
      </div>
    </Panel>
  );
}

function TemporalDiagram() {
  const { text: uiText } = useContentTranslation();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
      <div className="grid gap-4 md:grid-cols-[140px_1fr]">
        <div className="flex items-center justify-center rounded-xl border border-orange-300/40 bg-orange-400/10 p-4 text-center text-sm font-semibold text-orange-100">{uiText("Tempo de sistema")}</div>
        <div className="grid gap-3">
          {["Registrado em janeiro", "Corrigido em março", "Auditado em abril"].map((row, index) => (
            <div key={row} className="grid grid-cols-4 gap-2">
              <span className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-400">{uiText(row)}</span>
              {[0, 1, 2].map((cell) => (
                <span
                  key={`${row}-${cell}`}
                  className={`rounded-lg px-3 py-2 text-xs ${
                    cell <= index ? "bg-cyan-500/20 text-cyan-100" : "bg-slate-900 text-slate-400"
                  }`}
                >{uiText("validade ")}{uiText(cell + 1)}
                </span>
              ))}
            </div>
          ))}
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-3 text-center text-sm font-semibold text-cyan-100">{uiText("Tempo de validade")}</div>
        </div>
      </div>
    </div>
  );
}

function ErDiagram() {
  const { text: uiText } = useContentTranslation();

  const boxes = ["lab_config", "category", "product", "product_price", "sales", "product_price_audit"];
  return (
    <Panel as="div" layout="plain">
      <div className="grid gap-4 md:grid-cols-3">
        {boxes.map((box) => (
          <div key={box} className="rounded-xl border border-cyan-400/20 bg-slate-950/60 p-4">
            <p className="text-sm font-semibold text-cyan-200">{uiText(box)}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
        <p>{uiText("category 1 -> N product")}</p>
        <p>{uiText("product 1 -> N product_price")}</p>
        <p>{uiText("product 1 -> N sales")}</p>
        <p>{uiText("product_price -> product_price_audit")}</p>
        <p>{uiText("lab_config controla a geração dos dados")}</p>
      </div>
    </Panel>
  );
}

function LojaTemporalExercises() {
  const { text: uiText } = useContentTranslation();

  const totalExercises = postgresqlLojaTemporalExerciseList.blocks.reduce(
    (total, block) => total + block.exercises.length,
    0
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
          <p className="text-3xl font-black text-cyan-100">
            {uiText(postgresqlLojaTemporalExerciseList.blocks.length)}
          </p>
          <p className="mt-2 text-sm text-slate-400">{uiText("blocos de prática")}</p>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
          <p className="text-3xl font-black text-cyan-100">{uiText(totalExercises)}</p>
          <p className="mt-2 text-sm text-slate-400">{uiText("questões da Loja Temporal")}</p>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
          <p className="text-3xl font-black text-cyan-100">{uiText("loja+n")}</p>
          <p className="mt-2 text-sm text-slate-400">{uiText("padrão da senha das respostas")}</p>
        </div>
      </div>

      <Panel as="div" layout="plain">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-100">{uiText("Lista Loja Temporal")}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
              {uiText(postgresqlLojaTemporalExerciseList.summary)}
            </p>
          </div>
          <Link
            to="/disciplinas/postgresql/exercicios/loja-temporal"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300"
          >{uiText("Abrir com respostas")}</Link>
        </div>
      </Panel>

      <div className="space-y-4">
        {postgresqlLojaTemporalExerciseList.blocks.map((block, blockIndex) => (
          <Panel as="details" layout="plain"
            key={block.slug}

            open={blockIndex === 0}
          >
            <summary className="cursor-pointer list-none">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    {uiText(block.exercises.length)}{uiText(" exercícios")}</p>
                  <h3 className="text-2xl font-semibold text-slate-100">{uiText(block.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{uiText(block.summary)}</p>
                </div>
                <span className="rounded-lg border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                  {uiText(block.level)}
                </span>
              </div>
            </summary>

            <ol className="mt-5 grid gap-3">
              {block.exercises.map((exercise) => (
                <li
                  key={`${block.slug}-${exercise.number}`}
                  className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">{uiText("Questão ")}{uiText(String(exercise.number).padStart(2, "0"))}
                  </p>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
                    {uiText(exercise.question)}
                  </p>
                </li>
              ))}
            </ol>
          </Panel>
        ))}
      </div>
    </div>
  );
}

export default function PostgresqlBancosTemporais() {
  const { text: uiText } = useContentTranslation();

  const [activeSection, setActiveSection] = useState("introducao");
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Janeiro");
  const [rangeDate, setRangeDate] = useState("2026-02-15");
  const [snapshotDate, setSnapshotDate] = useState("2026-01-15");

  const intervalMatch = useMemo(() => {
    const date = new Date(`${rangeDate}T00:00:00`);
    return priceTimeline.find((item) => {
      const [start, end] = item.range
        .replace("[", "")
        .replace(")", "")
        .split(", ")
        .map((value) => value.split("/").reverse().join("-"));
      return date >= new Date(`${start}T00:00:00`) && date < new Date(`${end}T00:00:00`);
    });
  }, [rangeDate]);

  useEffect(() => {
    document.title = "Bancos de Dados Temporais no PostgreSQL | Borgonove Tech";
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-24% 0px -62% 0px", threshold: [0.08, 0.18, 0.28] }
    );

    navItems.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <PageTemplate>
      <div className="mx-auto max-w-7xl">
        <BackButton
          fallbackTo="/disciplinas/postgresql"
          className="mb-8 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
        >{uiText("Voltar para PostgreSQL")}</BackButton>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {["PostgreSQL", "SQL", "Daterange", "Auditoria"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200"
                >
                  {uiText(tag)}
                </span>
              ))}
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{uiText("Material de apoio PostgreSQL")}</p>
            <PageTitle className="mb-5 text-slate-100">{uiText("Bancos de Dados Temporais")}</PageTitle>
            <p className="mb-5 text-xl leading-relaxed text-cyan-100">{uiText("Aprenda a armazenar, consultar e analisar informações que mudam ao longo do tempo usando PostgreSQL.")}</p>
            <p className="mb-7 max-w-3xl text-base leading-relaxed text-slate-400">{uiText("Em bancos tradicionais, uma atualização normalmente substitui o valor anterior. Em bancos temporais, cada versão pode ser associada ao período em que foi válida, permitindo reconstruir o passado e acompanhar todas as alterações realizadas.")}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="primary"
                type="button"
                onClick={() => scrollToSection("introducao")}
                className="text-slate-950 transition"
              >{uiText("Começar a aprender")}</Button>
              <Button variant="secondary"
                type="button"
                onClick={() => scrollToSection("consultas-sql")}
                className="border border-cyan-400/40 text-cyan-100 transition hover:border-cyan-300"
              >{uiText("Ver exemplos SQL")}</Button>
            </div>
            <p className="mt-5 text-sm text-slate-500">{uiText("Leitura estimada: 35 a 45 minutos")}</p>
          </div>

          <Panel as="div" layout="plain">
            <div className="mx-auto mb-6 grid aspect-square max-w-[260px] place-items-center rounded-full border border-cyan-400/25 bg-cyan-500/10">
              <div className="grid h-40 w-40 place-items-center rounded-full border-4 border-cyan-300/70">
                <div className="h-24 w-28 rounded-2xl border-2 border-cyan-100/80 bg-slate-950/70 p-3">
                  <div className="mb-2 h-3 rounded bg-cyan-300" />
                  <div className="mb-2 h-3 rounded bg-orange-300" />
                  <div className="h-3 rounded bg-emerald-300" />
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <p className="font-semibold text-cyan-100">{uiText("Linha do tempo dos dados")}</p>
              <p>{uiText("Versões antigas deixam de ser “perdidas” e passam a ser parte explícita do modelo.")}</p>
            </div>
          </Panel>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Panel as="div" layout="plain">
              <Button variant="secondary"
                type="button"
                onClick={() => setIsIndexOpen((value) => !value)}
                className="flex w-full items-center justify-between border border-slate-800 text-left text-cyan-100 lg:hidden"
              >{uiText("Navegação interna")}<span>{uiText(isIndexOpen ? "Fechar" : "Abrir")}</span>
              </Button>
              <nav className={`${isIndexOpen ? "mt-3 block" : "hidden"} lg:block`} aria-label={uiText("Navegação interna")}>
                <p className="mb-3 hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 lg:block">{uiText("Nesta página")}</p>
                <div className="space-y-1">
                  {navItems.map(([id, label]) => (
                    <Button variant="custom"
                      key={id}
                      type="button"
                      onClick={() => {
                        scrollToSection(id);
                        setIsIndexOpen(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                        activeSection === id
                          ? "bg-cyan-500/15 text-cyan-100"
                          : "text-slate-400 hover:bg-slate-900/70 hover:text-cyan-100"
                      }`}
                    >
                      {uiText(label)}
                    </Button>
                  ))}
                </div>
              </nav>
            </Panel>
          </aside>

          <div className="min-w-0">
            <Section id="introducao" title={uiText("O problema dos bancos tradicionais")} eyebrow={uiText("Introdução")}>
              <div className="grid gap-5 lg:grid-cols-2">
                <Panel as="div" layout="plain">
                  <p className="mb-4 text-slate-300">{uiText("Em um banco tradicional, um `UPDATE` substitui o valor anterior. Se nada registrar o histórico, o passado deixa de estar disponível para consulta.")}</p>
                  <CodeBlock language="sql" label="SQL">
                    {"UPDATE produto\nSET preco = 120.00\nWHERE produto_id = 1;"}
                  </CodeBlock>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-800 p-4">
                      <p className="text-sm text-slate-500">{uiText("Antes")}</p>
                      <p className="text-2xl font-black text-slate-100">{uiText("R$ 100,00")}</p>
                    </div>
                    <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
                      <p className="text-sm text-cyan-200">{uiText("Depois")}</p>
                      <p className="text-2xl font-black text-cyan-100">{uiText("R$ 120,00")}</p>
                    </div>
                  </div>
                </Panel>
                <Panel as="div" layout="plain">
                  <h3 className="mb-4 text-xl font-semibold text-slate-100">{uiText("Perguntas que ficam difíceis")}</h3>
                  <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
                    {[
                      "Quanto o produto custava anteriormente?",
                      "Quando o valor foi alterado?",
                      "Quem realizou a alteração?",
                      "Qual valor estava válido na data de uma venda?",
                      "O sistema já conhecia esse valor naquela data?",
                    ].map((item) => (
                      <li key={item} className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                        {uiText(item)}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <h3 className="mb-3 text-xl font-semibold text-slate-100">{uiText("Banco tradicional")}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{uiText("Mantém o estado atual. Para preservar alterações, você precisa criar auditoria, histórico ou logs de forma separada.")}</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-5">
                  <h3 className="mb-3 text-xl font-semibold text-cyan-100">{uiText("Banco temporal")}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">{uiText("Modela versões e períodos de validade como parte do dado, permitindo consultas históricas e reconstrução de snapshots.")}</p>
                </div>
              </div>
            </Section>

            <Section id="tipos-tempo" title={uiText("O que é um banco temporal")} eyebrow={uiText("Tipos de tempo")}>
              <div className="space-y-6">
                <Panel as="div" layout="plain">
                  <p className="mb-5 text-base leading-relaxed text-slate-300">{uiText("Um banco temporal armazena diferentes versões de uma informação ao longo do tempo. Ele pode preservar valor atual, valores anteriores, data inicial e final de validade, momento do registro, usuário responsável e histórico de correções.")}</p>
                  <TimelineGraphic selectedMonth={selectedMonth} onSelectMonth={setSelectedMonth} />
                </Panel>

                <div className="grid gap-5 md:grid-cols-2">
                  <Panel as="div" layout="plain">
                    <h3 className="mb-3 text-2xl font-semibold text-cyan-100">{uiText("Tempo de validade")}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-slate-300">{uiText("Representa quando a informação era verdadeira no mundo real. Ele responde: “Em qual período esta informação era verdadeira?”")}</p>
                    <FieldTable
                      rows={[
                        ["Notebook", "R$ 3.000,00", "01/01/2026 a 01/02/2026"],
                        ["Notebook", "R$ 3.200,00", "01/02/2026 a 01/03/2026"],
                        ["Notebook", "R$ 3.150,00", "01/03/2026 a 01/04/2026"],
                      ]}
                    />
                  </Panel>
                  <Panel as="div" layout="plain">
                    <h3 className="mb-3 text-2xl font-semibold text-orange-100">{uiText("Tempo de sistema")}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-slate-300">{uiText("Registra quando uma informação foi inserida, corrigida ou removida no banco. Exemplo: o preço de R$ 3.000 era válido em janeiro, mas em março foi descoberta uma correção para R$ 2.950.")}</p>
                    <div className="grid gap-3 text-sm">
                      <p className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3">{uiText("Data de validade: janeiro")}</p>
                      <p className="rounded-xl border border-orange-300/30 bg-orange-400/10 p-3">{uiText("Data de registro da correção: março")}</p>
                    </div>
                  </Panel>
                </div>

                <Panel as="div" layout="plain">
                  <h3 className="mb-4 text-2xl font-semibold text-slate-100">{uiText("Bancos bitemporais")}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-300">{uiText("Bancos bitemporais combinam tempo de validade e tempo de sistema. Eles respondem tanto o que era verdadeiro no mundo real quanto o que o sistema acreditava saber em determinada data.")}</p>
                  <TemporalDiagram />
                </Panel>
              </div>
            </Section>

            <Section id="intervalos" title={uiText("Intervalos temporais")} eyebrow={uiText("Ranges")}>
              <div className="grid gap-5 lg:grid-cols-2">
                <Panel as="div" layout="plain">
                  <p className="mb-4 text-slate-300">{uiText("O intervalo ")}<code className="text-cyan-200">[2026-01-01, 2026-02-01)</code>{uiText(" inclui o primeiro dia e exclui o limite final. Esse formato é comum porque períodos consecutivos encostam sem se sobrepor.")}</p>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    {[
                      ["[", "limite inicial incluído"],
                      ["]", "limite final incluído"],
                      ["(", "limite inicial excluído"],
                      [")", "limite final excluído"],
                    ].map(([symbol, text]) => (
                      <div key={symbol} className="rounded-xl border border-slate-800 p-4">
                        <span className="text-2xl font-black text-cyan-200">{uiText(symbol)}</span>
                        <p className="mt-2 text-slate-400">{uiText(text)}</p>
                      </div>
                    ))}
                  </div>
                </Panel>
                <Panel as="div" layout="plain">
                  <label htmlFor="range-date" className="mb-3 block text-sm font-semibold text-cyan-100">{uiText("Teste uma data")}</label>
                  <Input
                    id="range-date"
                    type="date"
                    value={rangeDate}
                    onChange={(event) => setRangeDate(event.target.value)}
                    className="w-full border text-slate-100 outline-none focus:border-cyan-300"
                  />
                  <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-50">
                    {uiText(intervalMatch ? (
                      <>{uiText("A data está no período de ")}<strong>{uiText(intervalMatch.month)}</strong>: {uiText(intervalMatch.range)}{uiText(". Preço:")}{" "}
                        <strong>{uiText(intervalMatch.price)}</strong>.
                      </>
                    ) : (
                      "A data escolhida não está nos intervalos de exemplo."
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {rangeTypes.map(([type, description]) => (
                  <article key={type} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                    <h3 className="mb-2 text-xl font-semibold text-cyan-100">{uiText(type)}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{uiText(description)}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6">
                <CodeBlock language="sql" label="PostgreSQL range">
                  {"SELECT daterange(\n    DATE '2026-01-01',\n    DATE '2026-02-01',\n    '[)'\n);"}
                </CodeBlock>
              </div>
            </Section>

            <Section id="modelo-dados" title={uiText("Modelo de dados do laboratório")} eyebrow={uiText("Modelo de dados")}>
              <ErDiagram />
            </Section>

            <Section id="loja-temporal" title={uiText("Exercícios da Loja Temporal")} eyebrow={uiText("Prática guiada")}>
              <LojaTemporalExercises />
            </Section>

            <Section id="consultas-sql" title={uiText("Consultas SQL temporais")} eyebrow={uiText("Consultas SQL")}>
              <div className="space-y-8">
                <Panel as="article" layout="plain">
                  <h3 className="mb-4 text-2xl font-semibold text-cyan-100">{uiText("Operadores temporais")}</h3>
                  <FieldTable rows={operators.map(([operator, meaning, example]) => [operator, meaning, example])} />
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <CodeBlock language="sql" label="Contém data">
                      {"SELECT daterange(\n    DATE '2026-01-01',\n    DATE '2026-02-01',\n    '[)'\n) @> DATE '2026-01-15';"}
                    </CodeBlock>
                    <CodeBlock language="sql" label="Sobreposição">
                      {"SELECT daterange(\n    DATE '2026-01-01',\n    DATE '2026-03-01',\n    '[)'\n) && daterange(\n    DATE '2026-02-01',\n    DATE '2026-04-01',\n    '[)'\n);"}
                    </CodeBlock>
                  </div>
                </Panel>

                <Panel as="article" layout="plain">
                  <h3 className="mb-4 text-2xl font-semibold text-cyan-100">{uiText("Preço válido em uma data")}</h3>
                  <CodeBlock language="sql" label="Consulta pontual">
                    {"SELECT\n    product_id,\n    price,\n    valid_at\nFROM product_price\nWHERE product_id = 10\n  AND valid_at @> DATE '2026-06-15';"}
                  </CodeBlock>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{uiText("O filtro localiza o produto e usa ")}<code className="text-cyan-200">@&gt;</code>{uiText(" para perguntar qual intervalo contém a data pesquisada.")}</p>
                </Panel>

                <Panel as="article" layout="plain">
                  <h3 className="mb-4 text-2xl font-semibold text-cyan-100">{uiText("Snapshot histórico")}</h3>
                  <CodeBlock language="sql" label="Snapshot">
                    {"SELECT\n    p.product_id,\n    p.name,\n    pp.price,\n    pp.valid_at\nFROM product p\nJOIN product_price pp\n  ON pp.product_id = p.product_id\nWHERE pp.valid_at @> DATE '2025-12-15';"}
                  </CodeBlock>
                  <div className="mt-5">
                    <label htmlFor="snapshot-date" className="mb-3 block text-sm font-semibold text-cyan-100">{uiText("Data do snapshot demonstrativo")}</label>
                    <Select
                      id="snapshot-date"
                      value={snapshotDate}
                      onChange={(event) => setSnapshotDate(event.target.value)}
                      className="w-full border text-slate-100 outline-none focus:border-cyan-300"
                    >
                      {Object.keys(snapshotRows).map((date) => (
                        <option key={date} value={date}>{uiText(date)}</option>
                      ))}
                    </Select>
                    <TableContainer className="mt-4  rounded-2xl border border-slate-800">
                      <Table className="w-full min-w-[520px] text-left text-sm">
                        <thead className="bg-slate-950/70 text-cyan-200">
                          <tr>
                            <th className="px-4 py-3">{uiText("Produto")}</th>
                            <th className="px-4 py-3">{uiText("Preço")}</th>
                            <th className="px-4 py-3">{uiText("Categoria")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {snapshotRows[snapshotDate].map(([product, price, category]) => (
                            <tr key={product} className="border-t border-slate-800">
                              <td className="px-4 py-3 text-slate-100">{uiText(product)}</td>
                              <td className="px-4 py-3 text-cyan-100">{uiText(price)}</td>
                              <td className="px-4 py-3 text-slate-400">{uiText(category)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </TableContainer>
                  </div>
                </Panel>

                <Panel as="article" layout="plain">
                  <h3 className="mb-4 text-2xl font-semibold text-cyan-100">{uiText("Histórico completo e comparação")}</h3>
                  <div className="grid gap-5 lg:grid-cols-2">
                    <CodeBlock language="sql" label="Histórico">
                      {"SELECT\n    product_id,\n    price,\n    lower(valid_at) AS inicio,\n    upper(valid_at) AS fim\nFROM product_price\nWHERE product_id = 10\nORDER BY lower(valid_at);"}
                    </CodeBlock>
                    <CodeBlock language="sql" label="Variação com LAG">
                      {"SELECT\n    product_id,\n    lower(valid_at) AS inicio,\n    price,\n    LAG(price) OVER (\n        PARTITION BY product_id\n        ORDER BY lower(valid_at)\n    ) AS preco_anterior\nFROM product_price;"}
                    </CodeBlock>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    <code className="text-cyan-200">lower()</code>{uiText(" obtém o início, ")}<code className="text-cyan-200">upper()</code>{uiText(" obtém o fim, e funções de janela comparam cada linha com períodos anteriores sem perder detalhe.")}</p>
                </Panel>

                <Panel as="article" layout="plain">
                  <h3 className="mb-4 text-2xl font-semibold text-cyan-100">{uiText("Junção temporal e receita histórica")}</h3>
                  <div className="grid gap-5 lg:grid-cols-2">
                    <CodeBlock language="sql" label="Venda + preço histórico">
                      {"SELECT\n    s.sale_id,\n    s.sold_at,\n    s.product_id,\n    s.unit_price,\n    pp.price AS historical_list_price\nFROM sales s\nJOIN product_price pp\n  ON pp.product_id = s.product_id\n AND pp.valid_at @> s.sold_at;"}
                    </CodeBlock>
                    <CodeBlock language="sql" label="Receita por mês">
                      {"SELECT\n    DATE_TRUNC('month', sold_at) AS mes,\n    SUM(quantity * unit_price) AS receita\nFROM sales\nGROUP BY DATE_TRUNC('month', sold_at)\nORDER BY mes;"}
                    </CodeBlock>
                  </div>
                  <div className="mt-6 flex h-56 items-end gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                    {revenueBars.map(([month, value]) => (
                      <div key={month} className="flex flex-1 flex-col items-center gap-2">
                        <div className="w-full rounded-t-lg bg-cyan-400/80" style={{ height: `${value}%` }} />
                        <span className="text-xs text-slate-400">{uiText(month)}</span>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </Section>

            <Section id="integridade-temporal" title={uiText("Integridade temporal")} eyebrow={uiText("Regras de consistência")}>
              <div className="space-y-6">
                <Panel as="div" layout="plain">
                  <h3 className="mb-3 text-2xl font-semibold text-cyan-100">{uiText("Impedindo sobreposição de preços")}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">{uiText("Se um produto tiver preço A em [01/01/2026, 01/03/2026) e preço B em [01/02/2026, 01/04/2026), fevereiro teria dois preços válidos. A restrição temporal impede esse conflito.")}</p>
                  <div className="grid gap-5 lg:grid-cols-2">
                    <CodeBlock language="sql" label="PostgreSQL 18+">
                      {"PRIMARY KEY (\n    product_id,\n    valid_at WITHOUT OVERLAPS\n)"}
                    </CodeBlock>
                    <CodeBlock language="sql" label="Alternativa com GiST">
                      {"CREATE EXTENSION IF NOT EXISTS btree_gist;\n\nEXCLUDE USING gist (\n    product_id WITH =,\n    valid_at WITH &&\n)"}
                    </CodeBlock>
                  </div>
                  <p className="mt-4 rounded-xl border border-orange-300/30 bg-orange-400/10 p-4 text-sm text-orange-50">{uiText("Atenção: recursos como ")}<code>WITHOUT OVERLAPS</code>{uiText(" e chave estrangeira temporal dependem da versão do PostgreSQL. Verifique a compatibilidade do servidor usado em aula.")}</p>
                </Panel>

                <Panel as="div" layout="plain">
                  <h3 className="mb-3 text-2xl font-semibold text-cyan-100">{uiText("Chave estrangeira temporal")}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">{uiText("Uma venda realizada em 15 de junho somente é válida se existir um período de preço que cubra 15 de junho.")}</p>
                  <CodeBlock language="sql" label="FK temporal">
                    {"FOREIGN KEY (\n    product_id,\n    PERIOD sale_period\n)\nREFERENCES product_price (\n    product_id,\n    PERIOD valid_at\n);"}
                  </CodeBlock>
                  <div className="mt-5 rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-5 text-sm text-cyan-50">{uiText("Preço: [01/06, 01/07) | Venda: 15/06 | Resultado: venda contida no período do preço.")}</div>
                </Panel>

                <div className="grid gap-5 lg:grid-cols-2">
                  <Panel as="div" layout="plain">
                    <h3 className="mb-4 text-2xl font-semibold text-cyan-100">{uiText("Identificando lacunas")}</h3>
                    <CodeBlock language="sql" label="LEAD">
                      {"WITH periodos AS (\n    SELECT\n        product_id,\n        valid_at,\n        LEAD(valid_at) OVER (\n            PARTITION BY product_id\n            ORDER BY lower(valid_at)\n        ) AS proximo_periodo\n    FROM product_price\n)\nSELECT\n    product_id,\n    upper(valid_at) AS fim_atual,\n    lower(proximo_periodo) AS inicio_proximo\nFROM periodos\nWHERE proximo_periodo IS NOT NULL\n  AND upper(valid_at) < lower(proximo_periodo);"}
                    </CodeBlock>
                  </Panel>
                  <Panel as="div" layout="plain">
                    <h3 className="mb-4 text-2xl font-semibold text-cyan-100">{uiText("Identificando sobreposições")}</h3>
                    <CodeBlock language="sql" label="Self join">
                      {"SELECT\n    a.product_id,\n    a.valid_at AS periodo_a,\n    b.valid_at AS periodo_b\nFROM product_price a\nJOIN product_price b\n  ON a.product_id = b.product_id\n AND a.ctid < b.ctid\n AND a.valid_at && b.valid_at;"}
                    </CodeBlock>
                    <p className="mt-4 text-sm text-slate-300">{uiText("Com a restrição correta, a consulta deve retornar zero registros.")}</p>
                  </Panel>
                </div>
              </div>
            </Section>

            <Section id="auditoria" title={uiText("Auditoria e correção retroativa")} eyebrow={uiText("Auditoria")}>
              <div className="space-y-6">
                <Panel as="div" layout="plain">
                  <p className="mb-5 text-sm leading-relaxed text-slate-300">{uiText("A auditoria responde quem alterou, quando alterou, qual era o valor anterior e qual passou a ser o valor novo. Operações podem ser registradas como I, U e D: inserção, atualização e exclusão.")}</p>
                  <div className="grid gap-3 md:grid-cols-4">
                    {["Preço anterior: R$ 1.000,00", "Preço novo: R$ 1.100,00", "Operação: UPDATE", "Usuário: postgres"].map((item) => (
                      <div key={item} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
                        {uiText(item)}
                      </div>
                    ))}
                  </div>
                </Panel>

                <div className="grid gap-5 lg:grid-cols-2">
                  <CodeBlock language="sql" label="Trigger de auditoria">
                    {"CREATE OR REPLACE FUNCTION fn_audit_product_price()\nRETURNS trigger\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    IF TG_OP = 'UPDATE' THEN\n        INSERT INTO product_price_audit (\n            operation,\n            product_id,\n            old_price,\n            new_price,\n            old_valid_at,\n            new_valid_at,\n            changed_at,\n            changed_by\n        )\n        VALUES (\n            'U',\n            NEW.product_id,\n            OLD.price,\n            NEW.price,\n            OLD.valid_at,\n            NEW.valid_at,\n            clock_timestamp(),\n            current_user\n        );\n\n        RETURN NEW;\n    END IF;\n\n    RETURN NULL;\nEND;\n$$;"}
                  </CodeBlock>
                  <CodeBlock language="sql" label="Ligando a trigger">
                    {"CREATE TRIGGER trg_audit_product_price\nAFTER INSERT OR UPDATE OR DELETE\nON product_price\nFOR EACH ROW\nEXECUTE FUNCTION fn_audit_product_price();"}
                  </CodeBlock>
                </div>

                <Panel as="div" layout="plain">
                  <h3 className="mb-4 text-2xl font-semibold text-cyan-100">{uiText("Correção retroativa")}</h3>
                  <ol className="mb-5 grid gap-3 text-sm text-slate-300 md:grid-cols-5">
                    {["localizar o período", "preservar o histórico", "ajustar ou dividir", "inserir a versão correta", "registrar auditoria"].map((item, index) => (
                      <li key={item} className="rounded-xl border border-slate-800 p-4">
                        <span className="mb-2 block text-lg font-black text-cyan-200">{uiText(index + 1)}</span>
                        {uiText(item)}
                      </li>
                    ))}
                  </ol>
                  <CodeBlock language="sql" label="Transação">
                    {"BEGIN;\n\nUPDATE product_price\nSET price = 2950.00,\n    source = 'correcao_retroativa'\nWHERE product_id = 10\n  AND valid_at @> DATE '2026-01-15';\n\nCOMMIT;"}
                  </CodeBlock>
                </Panel>
              </div>
            </Section>

            <Section id="desempenho" title={uiText("Desempenho e índices")} eyebrow={uiText("Performance")}>
              <div className="grid gap-5 lg:grid-cols-2">
                <Panel as="div" layout="plain">
                  <h3 className="mb-3 text-2xl font-semibold text-cyan-100">{uiText("Índices para ranges")}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">{uiText("Consultas com operadores como ")}<code>@&gt;</code>{uiText(" e ")}<code>&&</code>{uiText(" podem se beneficiar de índices GiST ou SP-GiST, dependendo do tipo e do padrão de consulta.")}</p>
                  <CodeBlock language="sql" label="Índice GiST">
                    {"CREATE INDEX idx_product_price_valid_at\nON product_price\nUSING gist (valid_at);"}
                  </CodeBlock>
                </Panel>
                <Panel as="div" layout="plain">
                  <h3 className="mb-3 text-2xl font-semibold text-cyan-100">{uiText("EXPLAIN ANALYZE")}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">{uiText("Use planos de execução para conferir se o índice foi usado e quanto tempo a consulta levou. Em produção, tenha cuidado porque `ANALYZE` executa a consulta.")}</p>
                  <CodeBlock language="sql" label="Plano">
                    {"EXPLAIN (ANALYZE, BUFFERS)\nSELECT price, valid_at\nFROM product_price\nWHERE product_id = 10\n  AND valid_at @> DATE '2026-06-15';"}
                  </CodeBlock>
                </Panel>
              </div>
            </Section>

            <Section id="aplicacoes" title={uiText("Aplicações reais")} eyebrow={uiText("Onde usar")}>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[
                  ["Preço e catálogo", "Histórico de preços, promoções, reajustes e regras comerciais."],
                  ["Saúde", "Evolução clínica, leitos, prescrições válidas e auditoria médica."],
                  ["Frota", "Status de veículos, alocação de motoristas, manutenção e viagens."],
                  ["RH", "Cargos, salários, lotações, férias e contratos."],
                  ["Financeiro", "Taxas, limites, carteiras, contratos e reprocessamento histórico."],
                  ["Jurídico", "Vigência de normas, contratos, versões de cláusulas e evidências."],
                ].map(([title, text]) => (
                  <Panel as="article" layout="plain" key={title}>
                    <h3 className="mb-2 text-xl font-semibold text-cyan-100">{uiText(title)}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{uiText(text)}</p>
                  </Panel>
                ))}
              </div>
            </Section>

            <Section id="glossario" title={uiText("Glossário rápido")} eyebrow={uiText("Revisão")}>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Tempo de validade", "Período em que o dado é verdadeiro no mundo real."],
                  ["Tempo de sistema", "Momento em que o banco registrou ou corrigiu o dado."],
                  ["Bitemporal", "Modelo que combina validade e sistema."],
                  ["Snapshot", "Reconstrução do estado em uma data."],
                  ["Lacuna", "Espaço sem cobertura entre dois períodos."],
                  ["Sobreposição", "Dois períodos válidos ao mesmo tempo para a mesma entidade."],
                  ["Auditoria", "Registro de alterações e responsáveis."],
                  ["Range", "Tipo PostgreSQL para armazenar intervalos."],
                ].map(([term, text]) => (
                  <div key={term} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                    <h3 className="mb-2 text-lg font-semibold text-cyan-100">{uiText(term)}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{uiText(text)}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="exercicios" title={uiText("Exercícios para praticar")} eyebrow={uiText("Prática")}>
              <div className="grid gap-5 md:grid-cols-2">
                <Link to="/disciplinas/postgresql/exercicios/loja-temporal" className="group block">
                  <Panel as="article" layout="plain" className="theme-hover-border h-full transition hover:-translate-y-1">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">{uiText("Laboratório")}</p>
                    <h3 className="mb-3 text-2xl font-semibold text-slate-100">{uiText("Loja Temporal")}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-slate-400">{uiText("Pratique ranges, snapshots, integridade temporal, auditoria e consultas históricas com preços e vendas.")}</p>
                    <span className="text-sm font-semibold text-cyan-200">{uiText("Abrir exercícios →")}</span>
                  </Panel>
                </Link>
                <Link to="/disciplinas/postgresql/exercicios/frota-temporal" className="group block">
                  <Panel as="article" layout="plain" className="theme-hover-border h-full transition hover:-translate-y-1">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">{uiText("Laboratório")}</p>
                    <h3 className="mb-3 text-2xl font-semibold text-slate-100">{uiText("Frota Temporal")}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-slate-400">{uiText("Aplique os mesmos conceitos em veículos, motoristas, alocações, viagens, manutenção e abastecimento.")}</p>
                    <span className="text-sm font-semibold text-cyan-200">{uiText("Abrir exercícios →")}</span>
                  </Panel>
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
