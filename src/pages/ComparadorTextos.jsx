import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

export default function ComparadorTextos() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Text Comparator",
        textA: "Text A",
        textB: "Text B",
        summary: "Summary",
        total: "Total lines",
        equal: "Equal",
        different: "Different",
        differences: "Line-by-line differences",
        line: "Line"
      }
    : {
        back: "Voltar para utilidades",
        title: "Comparador de Textos",
        textA: "Texto A",
        textB: "Texto B",
        summary: "Resumo",
        total: "Linhas totais",
        equal: "Iguais",
        different: "Diferentes",
        differences: "Diferenças por linha",
        line: "Linha"
      };

  const [textoA, setTextoA] = useState("");
  const [textoB, setTextoB] = useState("");

  const analise = useMemo(() => {
    const linhasA = textoA.split("\n");
    const linhasB = textoB.split("\n");
    const total = Math.max(linhasA.length, linhasB.length);

    const linhas = [];
    let iguais = 0;
    let diferentes = 0;

    for (let i = 0; i < total; i += 1) {
      const a = linhasA[i] ?? "";
      const b = linhasB[i] ?? "";
      const same = a === b;
      if (same) {
        iguais += 1;
      } else {
        diferentes += 1;
      }
      linhas.push({ index: i + 1, a, b, same });
    }

    return { linhas, iguais, diferentes, total };
  }, [textoA, textoB]);

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{txt.back}
      </BackButton>

      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7l-1 1h-1l-1-1H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v12h6.8l1.2 1 1.2-1H20V6H4Zm3 2h4v2H7V8Zm0 4h10v2H7v-2Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <label className="glass rounded-2xl p-6 block">
          <span className="block text-sm text-slate-300 mb-2">{txt.textA}</span>
          <textarea rows={12} value={textoA} onChange={(event) => setTextoA(event.target.value)} className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400" />
        </label>

        <label className="glass rounded-2xl p-6 block">
          <span className="block text-sm text-slate-300 mb-2">{txt.textB}</span>
          <textarea rows={12} value={textoB} onChange={(event) => setTextoB(event.target.value)} className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400" />
        </label>
      </div>

      <article className="glass rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-3">{txt.summary}</h2>
        <p className="text-slate-300 text-sm">
          {txt.total}: {analise.total} | {txt.equal}: <span className="text-emerald-300">{analise.iguais}</span> |
          {txt.different}: <span className="text-red-400">{analise.diferentes}</span>
        </p>
      </article>

      <article className="glass rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">{txt.differences}</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="py-3 pr-4">{txt.line}</th>
                <th className="py-3 pr-4">{txt.textA}</th>
                <th className="py-3">{txt.textB}</th>
              </tr>
            </thead>
            <tbody>
              {analise.linhas.map((linha) => (
                <tr key={linha.index} className={`border-b border-slate-800/70 ${linha.same ? "" : "bg-red-500/10"}`}>
                  <td className="py-3 pr-4 text-slate-300">{linha.index}</td>
                  <td className="py-3 pr-4 text-slate-200 whitespace-pre-wrap">{linha.a || "-"}</td>
                  <td className="py-3 text-slate-200 whitespace-pre-wrap">{linha.b || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
