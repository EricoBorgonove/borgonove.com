import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
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
  const { text: uiText, message: uiMessage } = useContentTranslation();

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
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{uiText(txt.back)}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M10.5 3a7.5 7.5 0 1 1-4.7 13.34l-2.57 2.57a1 1 0 1 1-1.42-1.42l2.57-2.57A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>

      <div className="grid lg:grid-cols-5 gap-8">
        <Panel as="article" layout="plain" className="lg:col-span-2">
          <p className="text-slate-400 text-sm mb-6">{uiText(txt.subtitle)}</p>

          <form onSubmit={handleBuscar} className="space-y-4">
            <label htmlFor="cep" className="block text-sm text-slate-300">{uiText("CEP")}</label>
            <div className="relative">
              <Input
                id="cep"
                name="cep"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={9}
                value={cep}
                onChange={(event) => setCep(maskCep(event.target.value))}
                placeholder="00000-000"
                className="ui-input--trailing-icon w-full border text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
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
              <Button variant="primary"
                type="submit"
                className="text-slate-900 transition disabled:opacity-60"
                disabled={status.state === "loading"}
              >
                {uiText(txt.search)}
              </Button>
              <Button variant="secondary"
                type="button"
                onClick={handleLimpar}
                className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition"
              >
                {uiText(txt.clear)}
              </Button>
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
              {uiMessage(status.message)}
            </p>
          )}
        </Panel>

        <Panel as="article" layout="plain" className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6">{uiText(txt.result)}</h2>

          {!resultado && status.state !== "loading" && (
            <p className="text-slate-400">{uiText(txt.noQuery)}</p>
          )}

          {status.state === "loading" && <p className="text-slate-400">{uiText(txt.loadingAddress)}</p>}

          {resultado && (
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <Panel as="div" layout="plain">
                <p className="text-slate-400">{uiText("CEP")}</p>
                <p className="font-semibold text-slate-100">{uiText(resultado.cep)}</p>
              </Panel>
              <Panel as="div" layout="plain">
                <p className="text-slate-400">{uiText(txt.street)}</p>
                <p className="font-semibold text-slate-100">{uiText(resultado.logradouro || txt.notInformed)}</p>
              </Panel>
              <Panel as="div" layout="plain">
                <p className="text-slate-400">{uiText(txt.district)}</p>
                <p className="font-semibold text-slate-100">{uiText(resultado.bairro || txt.notInformed)}</p>
              </Panel>
              <Panel as="div" layout="plain">
                <p className="text-slate-400">{uiText(txt.city)}</p>
                <p className="font-semibold text-slate-100">{uiText(resultado.localidade)}</p>
              </Panel>
              <Panel as="div" layout="plain">
                <p className="text-slate-400">{uiText(txt.stateCode)}</p>
                <p className="font-semibold text-slate-100">{uiText(resultado.uf)}</p>
              </Panel>
              <Panel as="div" layout="plain">
                <p className="text-slate-400">{uiText(txt.state)}</p>
                <p className="font-semibold text-slate-100">{uiText(resultado.estado || txt.notInformed)}</p>
              </Panel>
              <Panel as="div" layout="plain" className="sm:col-span-2">
                <p className="text-slate-400">{uiText(txt.complement)}</p>
                <p className="font-semibold text-slate-100">{uiText(resultado.complemento || txt.notInformed)}</p>
              </Panel>
            </div>
          )}
        </Panel>
      </div>

      <Panel as="article" layout="plain" className="mt-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="text-2xl font-bold">{uiText(txt.searchedZips)}</h2>
          <Button variant="secondary"
            type="button"
            onClick={() => setHistorico([])}
            disabled={historico.length === 0}
            className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uiText(txt.clearTable)}
          </Button>
        </div>

        {historico.length === 0 ? (
          <p className="text-slate-400">{uiText(txt.noHistory)}</p>
        ) : (
          <TableContainer>
            <Table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-700">
                  <th className="py-3 pr-4">{uiText("CEP")}</th>
                  <th className="py-3 pr-4">{uiText(txt.street)}</th>
                  <th className="py-3 pr-4">{uiText(txt.district)}</th>
                  <th className="py-3 pr-4">{uiText(txt.city)}</th>
                  <th className="py-3">{uiText(txt.stateCode)}</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((item) => (
                  <tr key={item.cep} className="border-b border-slate-800/70">
                    <td className="py-3 pr-4 text-slate-100 font-semibold">{uiText(item.cep)}</td>
                    <td className="py-3 pr-4 text-slate-300">{uiText(item.logradouro || "-")}</td>
                    <td className="py-3 pr-4 text-slate-300">{uiText(item.bairro || "-")}</td>
                    <td className="py-3 pr-4 text-slate-300">{uiText(item.localidade || "-")}</td>
                    <td className="py-3 text-slate-300">{uiText(item.uf || "-")}</td>
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
