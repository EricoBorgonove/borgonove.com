import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

export default function CalculadoraJuros() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        title: "Interest Calculator",
        back: "Back to utilities",
        capital: "Initial capital ($)",
        rate: "Rate per period (%)",
        periods: "Number of periods",
        type: "Interest type",
        compound: "Compound",
        simple: "Simple",
        finalAmount: "Final amount",
        totalInterest: "Total interest",
        period: "Period",
        amount: "Amount",
        accumulatedInterest: "Accumulated interest",
        fillValid: "Fill in valid values to calculate."
      }
    : {
        title: "Calculadora de Juros",
        back: "Voltar para utilidades",
        capital: "Capital inicial (R$)",
        rate: "Taxa por período (%)",
        periods: "Quantidade de períodos",
        type: "Tipo de juros",
        compound: "Compostos",
        simple: "Simples",
        finalAmount: "Montante final",
        totalInterest: "Juros totais",
        period: "Período",
        amount: "Montante",
        accumulatedInterest: "Juros acumulado",
        fillValid: "Preencha valores válidos para calcular."
      };

  const [capital, setCapital] = useState("");
  const [taxa, setTaxa] = useState("");
  const [periodos, setPeriodos] = useState("");
  const [tipo, setTipo] = useState("compostos");

  const resultado = useMemo(() => {
    const c = Number(capital);
    const i = Number(taxa) / 100;
    const n = Number(periodos);

    if (c <= 0 || i < 0 || n <= 0 || Number.isNaN(c) || Number.isNaN(i) || Number.isNaN(n)) {
      return null;
    }

    const linhas = [];
    let montante = c;

    for (let p = 1; p <= n; p += 1) {
      if (tipo === "simples") {
        montante = c * (1 + i * p);
      } else {
        montante = c * (1 + i) ** p;
      }

      linhas.push({
        periodo: p,
        montante,
        jurosAcumulado: montante - c,
      });
    }

    const final = linhas[linhas.length - 1];
    return {
      montanteFinal: final.montante,
      jurosTotal: final.jurosAcumulado,
      linhas,
    };
  }, [capital, taxa, periodos, tipo]);

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{txt.back}
      </BackButton>

      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-4-3-4 3-4-3-4 3V5Zm2 0v10.1l2-1.5 4 3 4-3 2 1.5V5H6Zm3 2h6v2H9V7Zm0 4h6v2H9v-2Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>

      <div className="glass rounded-2xl p-8">
        <div className="grid md:grid-cols-4 gap-4">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.capital}</span>
            <input type="number" value={capital} placeholder="1000" onChange={(event) => setCapital(event.target.value)} className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400" />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.rate}</span>
            <input type="number" step="0.01" value={taxa} placeholder="2" onChange={(event) => setTaxa(event.target.value)} className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400" />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.periods}</span>
            <input type="number" value={periodos} placeholder="12" onChange={(event) => setPeriodos(event.target.value)} className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400" />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.type}</span>
            <select value={tipo} onChange={(event) => setTipo(event.target.value)} className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400">
              <option value="compostos">{txt.compound}</option>
              <option value="simples">{txt.simple}</option>
            </select>
          </label>
        </div>

        {resultado ? (
          <>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="glass rounded-xl p-4">
                <p className="text-slate-400">{txt.finalAmount}</p>
                <p className="text-2xl font-black text-cyan-300">R$ {resultado.montanteFinal.toFixed(2)}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-slate-400">{txt.totalInterest}</p>
                <p className="text-2xl font-black text-cyan-300">R$ {resultado.jurosTotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700">
                    <th className="py-3 pr-4">{txt.period}</th>
                    <th className="py-3 pr-4">{txt.amount}</th>
                    <th className="py-3">{txt.accumulatedInterest}</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.linhas.map((linha) => (
                    <tr key={linha.periodo} className="border-b border-slate-800/70">
                      <td className="py-3 pr-4 text-slate-200">{linha.periodo}</td>
                      <td className="py-3 pr-4 text-slate-200">R$ {linha.montante.toFixed(2)}</td>
                      <td className="py-3 text-slate-300">R$ {linha.jurosAcumulado.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="mt-6 text-slate-400">{txt.fillValid}</p>
        )}
      </div>
    </section>
  );
}
