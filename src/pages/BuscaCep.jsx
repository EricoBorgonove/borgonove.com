import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

function normalizeCep(value) {
  return value.replace(/\D/g, "").slice(0, 8);
}

function maskCep(value) {
  const digits = normalizeCep(value);
  if (digits.length <= 5) {
    return digits;
  }
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export default function BuscaCep() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "ZIP Code Finder",
        subtitle: "Enter a ZIP code to retrieve full address details.",
        invalidCep: "Enter a valid ZIP code with 8 digits.",
        searching: "Searching ZIP code...",
        lookupError: "Lookup failed. Try again.",
        notFound: "ZIP code not found.",
        success: "ZIP code found successfully.",
        requestError: "Could not lookup the ZIP code.",
        search: "Search",
        clear: "Clear",
        result: "Result",
        noQuery: "No query performed.",
        loadingAddress: "Looking up address...",
        street: "Street",
        district: "District",
        city: "City",
        stateCode: "State",
        state: "Region/State",
        complement: "Complement",
        notInformed: "Not provided",
        searchedZips: "Searched ZIP codes",
        clearTable: "Clear table",
        noHistory: "No ZIP code searched yet.",
      }
    : {
        back: "Voltar para utilidades",
        title: "Buscador de CEP",
        subtitle: "Digite o CEP para consultar o endereço completo.",
        invalidCep: "Informe um CEP válido com 8 dígitos.",
        searching: "Buscando CEP...",
        lookupError: "Falha na consulta. Tente novamente.",
        notFound: "CEP não encontrado.",
        success: "CEP localizado com sucesso.",
        requestError: "Não foi possível consultar o CEP.",
        search: "Buscar",
        clear: "Limpar",
        result: "Resultado",
        noQuery: "Nenhuma consulta realizada.",
        loadingAddress: "Consultando endereço...",
        street: "Logradouro",
        district: "Bairro",
        city: "Cidade",
        stateCode: "UF",
        state: "Estado",
        complement: "Complemento",
        notInformed: "Não informado",
        searchedZips: "CEPs consultados",
        clearTable: "Limpar tabela",
        noHistory: "Nenhum CEP consultado ainda.",
      };

  const [cep, setCep] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const cepNumerico = useMemo(() => normalizeCep(cep), [cep]);

  async function handleBuscar(event) {
    event.preventDefault();

    if (cepNumerico.length !== 8) {
      setResultado(null);
      setStatus({ state: "error", message: txt.invalidCep });
      return;
    }

    setStatus({ state: "loading", message: txt.searching });
    setResultado(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
      if (!response.ok) {
        throw new Error(txt.lookupError);
      }

      const data = await response.json();

      if (data.erro) {
        setStatus({ state: "error", message: txt.notFound });
        return;
      }

      setResultado(data);
      setHistorico((prev) => {
        const semDuplicado = prev.filter((item) => item.cep !== data.cep);
        return [data, ...semDuplicado];
      });
      setStatus({ state: "success", message: txt.success });
    } catch (error) {
      setStatus({
        state: "error",
        message: error.message || txt.requestError,
      });
    }
  }

  function handleLimpar() {
    setCep("");
    setResultado(null);
    setStatus({ state: "idle", message: "" });
  }

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-5xl mx-auto">
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{txt.back}
      </BackButton>

      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M10.5 3a7.5 7.5 0 1 1-4.7 13.34l-2.57 2.57a1 1 0 1 1-1.42-1.42l2.57-2.57A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>

      <div className="grid lg:grid-cols-5 gap-8">
        <article className="glass rounded-2xl p-8 lg:col-span-2">
          <p className="text-slate-400 text-sm mb-6">{txt.subtitle}</p>

          <form onSubmit={handleBuscar} className="space-y-4">
            <label htmlFor="cep" className="block text-sm text-slate-300">
              CEP
            </label>
            <div className="relative">
              <input
                id="cep"
                name="cep"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={9}
                value={cep}
                onChange={(event) => setCep(maskCep(event.target.value))}
                placeholder="00000-000"
                className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-4 pr-11 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2"
              >
                <path
                  fill="currentColor"
                  d="M10.5 3a7.5 7.5 0 1 1-4.7 13.34l-2.57 2.57a1 1 0 1 1-1.42-1.42l2.57-2.57A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
                />
              </svg>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-5 py-2.5 rounded-xl font-semibold transition disabled:opacity-60"
                disabled={status.state === "loading"}
              >
                {txt.search}
              </button>
              <button
                type="button"
                onClick={handleLimpar}
                className="border border-slate-700 text-slate-200 px-5 py-2.5 rounded-xl hover:border-cyan-400 transition"
              >
                {txt.clear}
              </button>
            </div>
          </form>

          {status.message && (
            <p
              className={`mt-5 text-sm ${
                status.state === "error"
                  ? "text-red-400"
                  : status.state === "success"
                    ? "text-emerald-300"
                    : "text-slate-400"
              }`}
            >
              {status.message}
            </p>
          )}
        </article>

        <article className="glass rounded-2xl p-8 lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6">{txt.result}</h2>

          {!resultado && status.state !== "loading" && (
            <p className="text-slate-400">{txt.noQuery}</p>
          )}

          {status.state === "loading" && <p className="text-slate-400">{txt.loadingAddress}</p>}

          {resultado && (
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="glass rounded-xl p-4">
                <p className="text-slate-400">CEP</p>
                <p className="font-semibold text-slate-100">{resultado.cep}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-slate-400">{txt.street}</p>
                <p className="font-semibold text-slate-100">{resultado.logradouro || txt.notInformed}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-slate-400">{txt.district}</p>
                <p className="font-semibold text-slate-100">{resultado.bairro || txt.notInformed}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-slate-400">{txt.city}</p>
                <p className="font-semibold text-slate-100">{resultado.localidade}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-slate-400">{txt.stateCode}</p>
                <p className="font-semibold text-slate-100">{resultado.uf}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-slate-400">{txt.state}</p>
                <p className="font-semibold text-slate-100">{resultado.estado || txt.notInformed}</p>
              </div>
              <div className="glass rounded-xl p-4 sm:col-span-2">
                <p className="text-slate-400">{txt.complement}</p>
                <p className="font-semibold text-slate-100">{resultado.complemento || txt.notInformed}</p>
              </div>
            </div>
          )}
        </article>
      </div>

      <article className="glass rounded-2xl p-8 mt-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="text-2xl font-bold">{txt.searchedZips}</h2>
          <button
            type="button"
            onClick={() => setHistorico([])}
            disabled={historico.length === 0}
            className="border border-slate-700 text-slate-200 px-4 py-2 rounded-xl hover:border-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {txt.clearTable}
          </button>
        </div>

        {historico.length === 0 ? (
          <p className="text-slate-400">{txt.noHistory}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-700">
                  <th className="py-3 pr-4">CEP</th>
                  <th className="py-3 pr-4">{txt.street}</th>
                  <th className="py-3 pr-4">{txt.district}</th>
                  <th className="py-3 pr-4">{txt.city}</th>
                  <th className="py-3">{txt.stateCode}</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((item) => (
                  <tr key={item.cep} className="border-b border-slate-800/70">
                    <td className="py-3 pr-4 text-slate-100 font-semibold">{item.cep}</td>
                    <td className="py-3 pr-4 text-slate-300">{item.logradouro || "-"}</td>
                    <td className="py-3 pr-4 text-slate-300">{item.bairro || "-"}</td>
                    <td className="py-3 pr-4 text-slate-300">{item.localidade || "-"}</td>
                    <td className="py-3 text-slate-300">{item.uf || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  );
}
