import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button } from "./ui/Patterns";
import { useState } from "react";
import ScrollRegion from "./ui/ScrollRegion";
import { useTranslation } from "react-i18next";

const languageLabels = {
  bash: "Terminal",
  shell: "Terminal",
  python: "Python",
  text: "Texto",
};

export default function CodeBlock({ children, language = "python", label }) {
  const { text: uiText } = useContentTranslation();

  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const code = String(children ?? "");
  const languageLabel = uiText(label || languageLabels[language] || language);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="code-block min-w-0 max-w-full overflow-hidden rounded-2xl border">
      <div className="code-block-header flex items-center justify-between gap-3 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">
          {uiText(languageLabel)}
        </span>
        <Button variant="custom"
          type="button"
          onClick={handleCopy}
          className="code-copy-button inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition"
          aria-label={uiText("Copiar código")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
              fill="currentColor"
              d="M8 7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1H8V7Zm-5 4a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7Zm3-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H6Z"
            />
          </svg>
          {uiText(copied ? "Copiado" : "Copiar")}
        </Button>
      </div>
      <ScrollRegion as="pre" aria-label={uiText(t("common.ui.codeRegion", { language: languageLabel }))} className="code-block-pre max-w-full overflow-x-auto px-4 py-4 text-sm leading-7">
        <code className={`language-${language}`}>{code}</code>
      </ScrollRegion>
    </div>
  );
}
