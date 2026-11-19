import { useMemo, useState } from "react";
import BackButton from "../components/BackButton";
import { Input, PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useContentTranslation } from "../hooks/useContentTranslation";
import bank from "../data/programacao-discursiva.json";

function normalize(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function Question({ question, text }) {
  const number = String(question.number).padStart(3, "0");
  return (
    <article id={`questao-${number}`} className="scroll-mt-24 min-w-0 rounded-xl border border-slate-800 p-4 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-cyan-300">
        {text("Questão {{0}}", [number])} — {text(question.title)}
      </h3>
      <div className="space-y-4 text-sm leading-relaxed text-slate-300">
        {question.paragraphs.map((paragraph, index) => <p key={index}>{text(paragraph)}</p>)}
      </div>
      <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300">
        <h4 className="font-semibold text-slate-100">{text("Exemplo de execução")}</h4>
        {question.table && (
          <TableContainer aria-label={text("Exemplo de execução")}>
            <Table>
              <thead><tr>{question.table.headers.map((header) => <th key={header} scope="col">{text(header)}</th>)}</tr></thead>
              <tbody>{question.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{index === 3 ? text(cell) : cell}</td>)}</tr>)}</tbody>
            </Table>
          </TableContainer>
        )}
        {question.example ? <p>{text(question.example)}</p> : <>
          <p><strong>{text("Entrada")}:</strong> {text(question.input)}</p>
          <p><strong>{text("Saída esperada")}:</strong> {text(question.output)}</p>
        </>}
      </div>
    </article>
  );
}

export default function ProgramacaoDiscursiva() {
  const { text } = useContentTranslation();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const search = normalize(query.trim());
    return bank.blocks.map((block) => ({
      ...block,
      questions: block.questions.filter((question) => !search || normalize([
        String(question.number).padStart(3, "0"), text(question.title),
        ...question.paragraphs.map((paragraph) => text(paragraph)),
        text(question.input || ""), text(question.output || ""), text(question.example || ""),
        ...(question.table ? question.table.rows.flat() : []),
      ].join(" ")).includes(search)),
    })).filter((block) => block.questions.length);
  }, [query, text]);
  const searching = Boolean(query.trim());

  return (
    <PageTemplate width="wide">
      <div className="mb-8"><BackButton fallbackTo="/disciplinas/algoritmos">{text("Voltar para Algoritmos")}</BackButton></div>
      <PageHeader>
        <p className="mb-3 text-sm font-semibold text-cyan-300">{text("600 questões · 12 blocos · 50 questões por bloco")}</p>
        <PageTitle>{text(bank.title)}</PageTitle>
        <PageDescription className="mt-4 max-w-4xl">{text(bank.instructions)}</PageDescription>
      </PageHeader>
      <Panel className="mb-6">
        <label htmlFor="busca-discursivas" className="mb-3 block text-sm font-semibold">{text("Buscar nesta lista")}</label>
        <Input id="busca-discursivas" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text("Busque por título, enunciado ou número da questão...")} />
      </Panel>
      <nav aria-label={text("Blocos de exercícios")} className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((block) => <Panel as="a" layout="plain" key={block.number} href={`#bloco-${String(block.number).padStart(2, "0")}`} onClick={() => { document.getElementById(`bloco-${String(block.number).padStart(2, "0")}`).open = true; }} className="theme-hover-border text-sm font-semibold text-cyan-300">{text(block.title)}</Panel>)}
      </nav>
      <div className="space-y-6">
        {filtered.map((block) => <Panel as="details" layout="plain" key={`${block.number}-${searching}`} id={`bloco-${String(block.number).padStart(2, "0")}`} open={searching} className="scroll-mt-24">
          <summary className="cursor-pointer text-xl font-semibold text-cyan-300"><h2 className="inline">{text(block.title)}</h2></summary>
          <p className="my-5 text-sm leading-relaxed text-slate-400">{text(block.guidance)}</p>
          <div className="space-y-5">{block.questions.map((question) => <Question key={question.number} question={question} text={text} />)}</div>
        </Panel>)}
      </div>
      {!filtered.length && <p role="status" className="py-8 text-slate-400">{text("Nenhuma questão encontrada para essa busca.")}</p>}
    </PageTemplate>
  );
}
