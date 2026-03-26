import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

export default function GeradorQrCode() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "QR Code Generator",
        textOrLink: "Text or link",
        textPlaceholder: "Type the QR Code content here",
        size: "Size (px)",
        download: "Download PNG",
        empty: "Enter some text to generate the QR Code.",
        alt: "Generated QR Code"
      }
    : {
        back: "Voltar para utilidades",
        title: "Gerador de QR Code",
        textOrLink: "Texto ou link",
        textPlaceholder: "Digite aqui o conteúdo do QR Code",
        size: "Tamanho (px)",
        download: "Baixar PNG",
        empty: "Informe um texto para gerar o QR Code.",
        alt: "QR Code gerado"
      };

  const [text, setText] = useState("");
  const [size, setSize] = useState("300");

  const qrUrl = useMemo(() => {
    if (!text.trim()) {
      return "";
    }

    const safeSize = Math.max(120, Math.min(800, Number(size) || 300));
    const params = new URLSearchParams({
      size: `${safeSize}x${safeSize}`,
      data: text,
      margin: "8",
    });
    return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
  }, [size, text]);

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-5xl mx-auto">
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{txt.back}
      </BackButton>

      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M3 3h8v8H3V3Zm2 2v4h4V5H5Zm8-2h8v8h-8V3Zm2 2v4h4V5h-4ZM3 13h8v8H3v-8Zm2 2v4h4v-4H5Zm8 0h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 4h2v2h-2v-2Zm4 0h4v2h-4v-2Zm0-4h4v2h-4v-2Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-8">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.textOrLink}</span>
            <textarea
              rows={6}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={txt.textPlaceholder}
              className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block mt-4">
            <span className="block text-sm text-slate-300 mb-2">{txt.size}</span>
            <input
              type="number"
              min="120"
              max="800"
              value={size}
              onChange={(event) => setSize(event.target.value)}
              className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center">
          {qrUrl ? (
            <>
              <img src={qrUrl} alt={txt.alt} className="rounded-xl bg-white p-3" />
              <a
                href={qrUrl}
                download="qrcode.png"
                className="mt-5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-5 py-2.5 rounded-xl font-semibold transition"
              >
                {txt.download}
              </a>
            </>
          ) : (
            <p className="text-slate-400">{txt.empty}</p>
          )}
        </div>
      </div>
    </section>
  );
}
