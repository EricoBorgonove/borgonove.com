import { useContentTranslation } from "../hooks/useContentTranslation";
import { Input, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

function formatInOffset(date, offsetHours) {
  const utcMs = date.getTime() + date.getTimezoneOffset() * 60000;
  const target = new Date(utcMs + offsetHours * 3600000);

  const yyyy = target.getUTCFullYear();
  const mm = String(target.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(target.getUTCDate()).padStart(2, "0");
  const hh = String(target.getUTCHours()).padStart(2, "0");
  const mi = String(target.getUTCMinutes()).padStart(2, "0");
  const ss = String(target.getUTCSeconds()).padStart(2, "0");

  const sign = offsetHours >= 0 ? "+" : "-";
  const abs = Math.abs(offsetHours);
  const zone = `UTC${sign}${String(abs).padStart(2, "0")}:00`;

  return `${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss} (${zone})`;
}

export default function ConversorDataHora() {
  const { text: uiText } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const locale = isEn ? "en-US" : "pt-BR";
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Date and Time Converter",
        source: "Source date/time (local)",
        targetOffset: "Target offset (UTC)",
        localTime: "Local time",
        utcTime: "UTC time",
        targetZoneTime: "Time in target zone",
        timestamp: "Timestamp (ms)",
        invalid: "Fill in a valid date/time."
      }
    : {
        back: "Voltar para utilidades",
        title: "Conversor de Datas e Horas",
        source: "Data/Hora de origem (local)",
        targetOffset: "Offset alvo (UTC)",
        localTime: "Horário local",
        utcTime: "Horário UTC",
        targetZoneTime: "Horário no fuso alvo",
        timestamp: "Timestamp (ms)",
        invalid: "Preencha uma data/hora válida."
      };

  const [dateInput, setDateInput] = useState("");
  const [targetOffset, setTargetOffset] = useState("");

  const resultado = useMemo(() => {
    if (!dateInput) {
      return null;
    }

    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return null;
    }

    const offset = Number(targetOffset);
    if (Number.isNaN(offset)) {
      return null;
    }

    return {
      local: date.toLocaleString(locale),
      utc: date.toISOString().replace("T", " ").replace(".000Z", " UTC"),
      custom: formatInOffset(date, offset),
      timestamp: String(date.getTime()),
    };
  }, [dateInput, locale, targetOffset]);

  return (
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{uiText(txt.back)}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 5a1 1 0 0 0-2 0v6a1 1 0 0 0 .3.7l3.5 3.5a1 1 0 1 0 1.4-1.4L13 12.6V7Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>

      <Panel as="div" layout="plain">
        <div className="grid md:grid-cols-2 gap-6">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.source)}</span>
            <Input
              type="datetime-local"
              value={dateInput}
              onChange={(event) => setDateInput(event.target.value)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.targetOffset)}</span>
            <Input
              type="number"
              min="-12"
              max="14"
              value={targetOffset}
              onChange={(event) => setTargetOffset(event.target.value)}
              placeholder="-3"
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        {resultado ? (
          <div className="grid md:grid-cols-2 gap-4 mt-8 text-sm">
            <Panel as="div" layout="plain">
              <p className="text-slate-400">{uiText(txt.localTime)}</p>
              <p className="text-slate-100 font-semibold mt-1">{uiText(resultado.local)}</p>
            </Panel>
            <Panel as="div" layout="plain">
              <p className="text-slate-400">{uiText(txt.utcTime)}</p>
              <p className="text-slate-100 font-semibold mt-1">{uiText(resultado.utc)}</p>
            </Panel>
            <Panel as="div" layout="plain" className="md:col-span-2">
              <p className="text-slate-400">{uiText(txt.targetZoneTime)}</p>
              <p className="text-slate-100 font-semibold mt-1">{uiText(resultado.custom)}</p>
            </Panel>
            <Panel as="div" layout="plain" className="md:col-span-2">
              <p className="text-slate-400">{uiText(txt.timestamp)}</p>
              <p className="text-slate-100 font-semibold mt-1 break-all">{uiText(resultado.timestamp)}</p>
            </Panel>
          </div>
        ) : (
          <p className="mt-6 text-slate-400">{uiText(txt.invalid)}</p>
        )}
      </Panel>
    </PageTemplate>
  );
}
