import { Button, Input, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

function classificarImc(imc) {
  if (imc < 17) {
    return {
      faixa: "< 17.0",
      situacao: "underweightSevere",
      tagClass: "bg-sky-200 text-sky-900",
    };
  }
  if (imc < 18.5) {
    return {
      faixa: "17.0 a 18.49",
      situacao: "underweight",
      tagClass: "bg-cyan-200 text-cyan-900",
    };
  }
  if (imc < 25) {
    return {
      faixa: "18.5 a 24.99",
      situacao: "normal",
      tagClass: "bg-emerald-200 text-emerald-900",
    };
  }
  if (imc < 30) {
    return {
      faixa: "25.0 a 29.99",
      situacao: "overweight",
      tagClass: "bg-yellow-200 text-yellow-900",
    };
  }
  if (imc < 35) {
    return {
      faixa: "30.0 a 34.99",
      situacao: "obesity1",
      tagClass: "bg-orange-200 text-orange-900",
    };
  }
  if (imc < 40) {
    return {
      faixa: "35.0 a 39.99",
      situacao: "obesity2",
      tagClass: "bg-rose-300 text-rose-900",
    };
  }
  return {
    faixa: ">= 40.0",
    situacao: "obesity3",
    tagClass: "bg-red-500 text-white",
  };
}

export default function Imc() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "BMI Calculator",
        desc: "Calculate your BMI quickly to track your body mass index.",
        height: "Height",
        weight: "Weight",
        calculate: "Calculate",
        clearTable: "Clear table",
        history: "Calculation history",
        noCalc: "No calculations yet.",
        range: "Range",
        status: "Status",
        severe: "Severe underweight",
        under: "Underweight",
        normal: "Normal weight",
        over: "Overweight",
        ob1: "Obesity I",
        ob2: "Obesity II",
        ob3: "Obesity III"
      }
    : {
        back: "Voltar para utilidades",
        title: "Cálculo de IMC",
        desc: "Calcule seu IMC de forma rápida para acompanhar seu índice de massa corporal.",
        height: "Altura",
        weight: "Peso",
        calculate: "Calcular",
        clearTable: "Limpar tabela",
        history: "Histórico de cálculo",
        noCalc: "Nenhum cálculo realizado ainda.",
        range: "Faixa",
        status: "Situação",
        severe: "Magreza acentuada",
        under: "Abaixo do peso",
        normal: "Peso normal",
        over: "Sobrepeso",
        ob1: "Obesidade I",
        ob2: "Obesidade II",
        ob3: "Obesidade III"
      };

  const [altura, setAltura] = useState(1.7);
  const [peso, setPeso] = useState(70);
  const [historico, setHistorico] = useState([]);

  const imcAtual = useMemo(() => {
    if (!altura || altura <= 0) {
      return 0;
    }
    return peso / (altura * altura);
  }, [altura, peso]);

  function calcular() {
    if (altura <= 0 || peso <= 0) {
      return;
    }

    const imc = Number(imcAtual.toFixed(2));
    const classificacao = classificarImc(imc);
    const situacoes = {
      underweightSevere: txt.severe,
      underweight: txt.under,
      normal: txt.normal,
      overweight: txt.over,
      obesity1: txt.ob1,
      obesity2: txt.ob2,
      obesity3: txt.ob3,
    };

    setHistorico((prev) => [
      {
        id: Date.now(),
        peso: Number(peso).toFixed(1),
        altura: Number(altura).toFixed(2),
        imc: imc.toFixed(2),
        ...classificacao,
        situacaoLabel: situacoes[classificacao.situacao],
      },
      ...prev,
    ]);
  }

  function limparTabela() {
    setHistorico([]);
  }

  return (
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{txt.back}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M12 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm-8 16a8 8 0 1 1 16 0v2H4v-2Z"
          />
        </svg>
        <span>{txt.title}</span>
      </PageTitle>

      <Panel as="div" layout="plain">
        <p className="text-slate-400 mb-8">
          {txt.desc}
        </p>

        <div className="grid lg:grid-cols-3 gap-8 items-end">
          <div>
            <label htmlFor="altura" className="block text-sm text-slate-300 mb-2">
              {txt.height}: <span className="font-semibold text-slate-100">{altura.toFixed(2)} m</span>
            </label>
            <Input
              id="altura"
              type="range"
              min="0.9"
              max="2.2"
              step="0.01"
              value={altura}
              onChange={(event) => setAltura(Number(event.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="peso" className="block text-sm text-slate-300 mb-2">
              {txt.weight}: <span className="font-semibold text-slate-100">{peso.toFixed(1)} kg</span>
            </label>
            <Input
              id="peso"
              type="range"
              min="20"
              max="200"
              step="0.5"
              value={peso}
              onChange={(event) => setPeso(Number(event.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary"
              type="button"
              onClick={calcular}
              className="text-slate-900 transition"
            >
              {txt.calculate}
            </Button>
            <Button variant="secondary"
              type="button"
              onClick={limparTabela}
              disabled={historico.length === 0}
              className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {txt.clearTable}
            </Button>
          </div>
        </div>
      </Panel>

      <Panel as="div" layout="plain" className="mt-8">
        <h2 className="text-2xl font-bold mb-5">{txt.history}</h2>
        {historico.length === 0 ? (
          <p className="text-slate-400">{txt.noCalc}</p>
        ) : (
          <TableContainer>
            <Table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-700">
                  <th className="py-3 pr-4">{txt.weight}</th>
                  <th className="py-3 pr-4">{txt.height}</th>
                  <th className="py-3 pr-4">IMC</th>
                  <th className="py-3 pr-4">{txt.range}</th>
                  <th className="py-3">{txt.status}</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800/70">
                    <td className="py-3 pr-4 text-slate-100 font-semibold">{item.peso} kg</td>
                    <td className="py-3 pr-4 text-slate-300">{item.altura} m</td>
                    <td className="py-3 pr-4 text-slate-300">{item.imc}</td>
                    <td className="py-3 pr-4 text-slate-300">{item.faixa}</td>
                    <td className="py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${item.tagClass}`}>
                        {item.situacaoLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        )}
      </Panel>
    </PageTemplate>
  );
}
