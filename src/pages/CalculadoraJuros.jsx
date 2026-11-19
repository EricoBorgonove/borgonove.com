import { Input, PageTemplate, PageTitle, Panel, Select, Table, TableContainer } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import { calculateInterest, MAX_INTEREST_PERIODS } from "../utils/calculateInterest";

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
        fillValid: "Enter finite values and a whole number of periods between 1 and 1200."
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
        fillValid: "Informe valores finitos e uma quantidade inteira de períodos entre 1 e 1200."
      };

  const [capital, setCapital] = useState("");
  const [taxa, setTaxa] = useState("");
  const [periodos, setPeriodos] = useState("");
  const [tipo, setTipo] = useState("compostos");

  const resultado = useMemo(() => calculateInterest({
    capital, rate: taxa, periods: periodos, type: tipo,
  }), [capital, taxa, periodos, tipo]);

  return (
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{txt.back}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-4-3-4 3-4-3-4 3V5Zm2 0v10.1l2-1.5 4 3 4-3 2 1.5V5H6Zm3 2h6v2H9V7Zm0 4h6v2H9v-2Z"
          />
        </svg>
        <span>{txt.title}</span>
      </PageTitle>

      <Panel as="div" layout="plain">
        <div className="grid md:grid-cols-4 gap-4">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.capital}</span>
            <Input type="number" value={capital} placeholder="1000" onChange={(event) => setCapital(event.target.value)} className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400" />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.rate}</span>
            <Input type="number" step="0.01" value={taxa} placeholder="2" onChange={(event) => setTaxa(event.target.value)} className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400" />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.periods}</span>
            <Input type="number" min="1" max={MAX_INTEREST_PERIODS} step="1" value={periodos} placeholder="12" onChange={(event) => setPeriodos(event.target.value)} className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400" />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.type}</span>
            <Select value={tipo} onChange={(event) => setTipo(event.target.value)} className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400">
              <option value="compostos">{txt.compound}</option>
              <option value="simples">{txt.simple}</option>
            </Select>
          </label>
        </div>

        {resultado ? (
          <>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <Panel as="div" layout="plain">
                <p className="text-slate-400">{txt.finalAmount}</p>
                <p className="text-2xl font-black text-cyan-300">R$ {resultado.montanteFinal.toFixed(2)}</p>
              </Panel>
              <Panel as="div" layout="plain">
                <p className="text-slate-400">{txt.totalInterest}</p>
                <p className="text-2xl font-black text-cyan-300">R$ {resultado.jurosTotal.toFixed(2)}</p>
              </Panel>
            </div>

            <TableContainer className="mt-6">
              <Table className="w-full text-sm">
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
              </Table>
            </TableContainer>
          </>
        ) : (
          <p className="mt-6 text-slate-400">{txt.fillValid}</p>
        )}
      </Panel>
    </PageTemplate>
  );
}
