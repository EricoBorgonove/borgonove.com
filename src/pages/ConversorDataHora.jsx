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
    <section className="min-h-[70vh] px-6 py-24 max-w-5xl mx-auto">
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{txt.back}
      </BackButton>

      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 5a1 1 0 0 0-2 0v6a1 1 0 0 0 .3.7l3.5 3.5a1 1 0 1 0 1.4-1.4L13 12.6V7Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>

      <div className="glass rounded-2xl p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.source}</span>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(event) => setDateInput(event.target.value)}
              className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.targetOffset}</span>
            <input
              type="number"
              min="-12"
              max="14"
              value={targetOffset}
              onChange={(event) => setTargetOffset(event.target.value)}
              placeholder="-3"
              className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        {resultado ? (
          <div className="grid md:grid-cols-2 gap-4 mt-8 text-sm">
            <div className="glass rounded-xl p-4">
              <p className="text-slate-400">{txt.localTime}</p>
              <p className="text-slate-100 font-semibold mt-1">{resultado.local}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-slate-400">{txt.utcTime}</p>
              <p className="text-slate-100 font-semibold mt-1">{resultado.utc}</p>
            </div>
            <div className="glass rounded-xl p-4 md:col-span-2">
              <p className="text-slate-400">{txt.targetZoneTime}</p>
              <p className="text-slate-100 font-semibold mt-1">{resultado.custom}</p>
            </div>
            <div className="glass rounded-xl p-4 md:col-span-2">
              <p className="text-slate-400">{txt.timestamp}</p>
              <p className="text-slate-100 font-semibold mt-1 break-all">{resultado.timestamp}</p>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-slate-400">{txt.invalid}</p>
        )}
      </div>
    </section>
  );
}
