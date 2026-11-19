import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

function randomIntInclusivo(min, max) {
  const range = max - min + 1;
  if (range <= 0) {
    return min;
  }

  // Usa CSPRNG do navegador para reduzir previsibilidade.
  if (globalThis.crypto?.getRandomValues) {
    const maxUint32 = 0xffffffff;
    const limit = maxUint32 - ((maxUint32 + 1) % range);
    const buffer = new Uint32Array(1);
    let randomValue = 0;

    do {
      globalThis.crypto.getRandomValues(buffer);
      randomValue = buffer[0];
    } while (randomValue > limit);

    return min + (randomValue % range);
  }

  return Math.floor(Math.random() * range) + min;
}

function gerarNumerosComRepeticao(min, max, quantidade) {
  return Array.from({ length: quantidade }, () => randomIntInclusivo(min, max));
}

function sortearDoPool(pool, quantidade) {
  const poolRestante = [...pool];
  const resultado = [];
  const limite = Math.min(quantidade, poolRestante.length);

  for (let i = 0; i < limite; i += 1) {
    const index = randomIntInclusivo(0, poolRestante.length - 1);
    resultado.push(poolRestante[index]);
    poolRestante.splice(index, 1);
  }

  return { resultado, poolRestante };
}

export default function SorteioNumeros() {
  const { text: uiText, message: uiMessage } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Number Draw",
        subtitle: "Define the range and how many numbers should be drawn each time.",
        min: "Range start",
        max: "Range end",
        quantity: "Amount per draw",
        noRepeat: "No repeats",
        draw: "Draw",
        continueNoRepeat: "Continue without repeats",
        clear: "Clear",
        errorIntegers: "Use integers only.",
        errorRange: "The range end must be greater than or equal to the start.",
        errorQuantity: "Enter a quantity greater than zero.",
        errorExceedsRange: "Quantity exceeds available range without repeats.",
        withRepeat: "With repeats",
        withoutRepeat: "Without repeats",
        continueLabel: "Continuation without repeats",
        startSequentialFirst: "Start a no-repeat draw to enable sequential continuation.",
        allDrawn: "All numbers in the range have already been drawn.",
        activeSequence: "Active sequence in range",
        remaining: "Remaining",
        currentResult: "Current result",
        noDrawYet: "No draw yet.",
        history: "History",
        noHistory: "No draws in history.",
        interval: "Range",
        mode: "Mode",
        numbers: "Numbers",
      }
    : {
        back: "Voltar para utilidades",
        title: "Sorteio de Números",
        subtitle: "Defina o intervalo e quantos números devem ser sorteados por vez.",
        min: "Início do intervalo",
        max: "Fim do intervalo",
        quantity: "Quantidade por sorteio",
        noRepeat: "Sem repetição",
        draw: "Sortear",
        continueNoRepeat: "Continuar sem repetir",
        clear: "Limpar",
        errorIntegers: "Use apenas números inteiros.",
        errorRange: "O valor final do intervalo deve ser maior ou igual ao inicial.",
        errorQuantity: "Informe uma quantidade maior que zero.",
        errorExceedsRange: "Quantidade maior que o intervalo disponível sem repetição.",
        withRepeat: "Com repetição",
        withoutRepeat: "Sem repetição",
        continueLabel: "Continuação sem repetição",
        startSequentialFirst: "Inicie um sorteio sem repetição para habilitar a continuação sequencial.",
        allDrawn: "Todos os números do intervalo já foram sorteados.",
        activeSequence: "Sequência ativa no intervalo",
        remaining: "Restantes",
        currentResult: "Resultado atual",
        noDrawYet: "Nenhum sorteio realizado.",
        history: "Histórico",
        noHistory: "Nenhum sorteio no histórico.",
        interval: "Intervalo",
        mode: "Modo",
        numbers: "Números",
      };

  const [minimo, setMinimo] = useState("1");
  const [maximo, setMaximo] = useState("60");
  const [quantidade, setQuantidade] = useState("6");
  const [semRepeticao, setSemRepeticao] = useState(true);
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [sequencia, setSequencia] = useState(null);

  function sortear() {
    const min = Number(minimo);
    const max = Number(maximo);
    const qtd = Number(quantidade);

    if (!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(qtd)) {
      setErro(txt.errorIntegers);
      return;
    }

    if (max < min) {
      setErro(txt.errorRange);
      return;
    }

    if (qtd <= 0) {
      setErro(txt.errorQuantity);
      return;
    }

    const tamanhoIntervalo = max - min + 1;
    if (semRepeticao && qtd > tamanhoIntervalo) {
      setErro(txt.errorExceedsRange);
      return;
    }

    setErro("");
    let numeros = [];
    let repeticaoLabel = txt.withRepeat;

    if (semRepeticao) {
      const poolInicial = [];
      for (let n = min; n <= max; n += 1) {
        poolInicial.push(n);
      }
      const { resultado: sorteados, poolRestante } = sortearDoPool(poolInicial, qtd);
      numeros = sorteados;
      repeticaoLabel = txt.withoutRepeat;
      setSequencia({
        min,
        max,
        qtd,
        poolRestante,
      });
    } else {
      numeros = gerarNumerosComRepeticao(min, max, qtd);
      setSequencia(null);
    }

    numeros = numeros.sort((a, b) => a - b);
    setResultado(numeros);
    setHistorico((prev) => [
      {
        id: Date.now(),
        intervalo: `${min} a ${max}`,
        quantidade: qtd,
        repeticao: repeticaoLabel,
        numeros: numeros.join(", "),
      },
      ...prev,
    ]);
  }

  function continuarSorteioSequencial() {
    if (!sequencia) {
      setErro(txt.startSequentialFirst);
      return;
    }

    if (sequencia.poolRestante.length === 0) {
      setErro(txt.allDrawn);
      return;
    }

    setErro("");
    const { resultado: sorteados, poolRestante } = sortearDoPool(
      sequencia.poolRestante,
      sequencia.qtd
    );
    const numeros = sorteados.sort((a, b) => a - b);

    setResultado(numeros);
    setSequencia((prev) => ({ ...prev, poolRestante }));
    setHistorico((prev) => [
      {
        id: Date.now(),
        intervalo: `${sequencia.min} a ${sequencia.max}`,
        quantidade: numeros.length,
        repeticao: txt.continueLabel,
        numeros: numeros.join(", "),
      },
      ...prev,
    ]);
  }

  function limparTudo() {
    setResultado([]);
    setHistorico([]);
    setSequencia(null);
    setErro("");
  }

  return (
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{uiText(txt.back)}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 4h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm1 2v5h14V6H5Zm1 10h12a2 2 0 0 1 2 2v2H4v-2a2 2 0 0 1 2-2Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>

      <Panel as="div" layout="plain">
        <p className="text-slate-400 mb-6">{uiText(txt.subtitle)}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.min)}</span>
            <Input
              type="number"
              value={minimo}
              onChange={(event) => setMinimo(event.target.value)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.max)}</span>
            <Input
              type="number"
              value={maximo}
              onChange={(event) => setMaximo(event.target.value)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.quantity)}</span>
            <Input
              type="number"
              value={quantidade}
              onChange={(event) => setQuantidade(event.target.value)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="flex items-center gap-2 text-slate-300 mt-8 sm:mt-0">
            <Input
              type="checkbox"
              checked={semRepeticao}
              onChange={(event) => setSemRepeticao(event.target.checked)}
              className="h-4 w-4 accent-cyan-400"
            />
            {uiText(txt.noRepeat)}
          </label>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="primary"
            type="button"
            onClick={sortear}
            className="text-slate-900 transition"
          >
            {uiText(txt.draw)}
          </Button>
          <Button variant="secondary"
            type="button"
            onClick={continuarSorteioSequencial}
            disabled={!sequencia || sequencia.poolRestante.length === 0}
            className="border border-cyan-600/70 text-cyan-300 hover:border-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uiText(txt.continueNoRepeat)}
          </Button>
          <Button variant="secondary"
            type="button"
            onClick={limparTudo}
            className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition"
          >
            {uiText(txt.clear)}
          </Button>
        </div>

        {erro && <p className="text-red-400 text-sm mt-4">{uiMessage(erro)}</p>}
        {sequencia && (
          <p className="text-slate-400 text-sm mt-4">
            {uiText(txt.activeSequence)} <strong>{uiText(sequencia.min)}</strong>{uiText(" a ")}<strong>{uiText(sequencia.max)}</strong>. {uiText(txt.remaining)}: <strong>{uiText(sequencia.poolRestante.length)}</strong>.
          </p>
        )}
      </Panel>

      <Panel as="article" layout="plain" className="mt-8">
        <h2 className="text-2xl font-bold mb-5">{uiText(txt.currentResult)}</h2>
        {resultado.length === 0 ? (
          <p className="text-slate-400">{uiText(txt.noDrawYet)}</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {resultado.map((numero, index) => (
              <span
                key={`${numero}-${index}`}
                className="inline-flex items-center justify-center h-12 min-w-12 px-3 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-bold text-lg"
              >
                {uiText(numero)}
              </span>
            ))}
          </div>
        )}
      </Panel>

      <Panel as="article" layout="plain" className="mt-8">
        <h2 className="text-2xl font-bold mb-5">{uiText(txt.history)}</h2>
        {historico.length === 0 ? (
          <p className="text-slate-400">{uiText(txt.noHistory)}</p>
        ) : (
          <TableContainer>
            <Table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-700">
                  <th className="py-3 pr-4">{uiText(txt.interval)}</th>
                  <th className="py-3 pr-4">{uiText(txt.quantity)}</th>
                  <th className="py-3 pr-4">{uiText(txt.mode)}</th>
                  <th className="py-3">{uiText(txt.numbers)}</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800/70">
                    <td className="py-3 pr-4 text-slate-100">{uiText(item.intervalo)}</td>
                    <td className="py-3 pr-4 text-slate-300">{uiText(item.quantidade)}</td>
                    <td className="py-3 pr-4 text-slate-300">{uiText(item.repeticao)}</td>
                    <td className="py-3 text-slate-300">{uiText(item.numeros)}</td>
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
