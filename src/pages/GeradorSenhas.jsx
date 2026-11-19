import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

function randomIntInclusivo(min, max) {
  const range = max - min + 1;
  if (range <= 0) {
    return min;
  }

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

function calcularForca(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { level: "weak", className: "text-red-400" };
  if (score <= 4) return { level: "medium", className: "text-yellow-300" };
  return { level: "strong", className: "text-emerald-300" };
}

export default function GeradorSenhas() {
  const { text: uiText, message: uiMessage } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Password Generator",
        length: "Length",
        upper: "Uppercase",
        lower: "Lowercase",
        numbers: "Numbers",
        symbols: "Symbols",
        generate: "Generate password",
        copy: "Copy",
        generated: "Generated password",
        clickGenerate: "Click Generate password",
        strength: "Strength",
        strengthWeak: "Weak",
        strengthMedium: "Medium",
        strengthStrong: "Strong",
        msgChooseType: "Select at least one character type.",
        msgCopied: "Password copied.",
        msgCopyFail: "Could not copy automatically."
      }
    : {
        back: "Voltar para utilidades",
        title: "Gerador de Senhas",
        length: "Tamanho",
        upper: "Maiúsculas",
        lower: "Minúsculas",
        numbers: "Números",
        symbols: "Símbolos",
        generate: "Gerar senha",
        copy: "Copiar",
        generated: "Senha gerada",
        clickGenerate: "Clique em Gerar senha",
        strength: "Força",
        strengthWeak: "Fraca",
        strengthMedium: "Média",
        strengthStrong: "Forte",
        msgChooseType: "Selecione ao menos um tipo de caractere.",
        msgCopied: "Senha copiada.",
        msgCopyFail: "Não foi possível copiar automaticamente."
      };

  const [length, setLength] = useState("");
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const pool = useMemo(() => {
    let chars = "";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%&*()-_=+?";
    return chars;
  }, [useLower, useNumbers, useSymbols, useUpper]);

  const strength = useMemo(() => calcularForca(password), [password]);

  function generatePassword() {
    if (!pool) {
      setMessage(txt.msgChooseType);
      return;
    }

    const size = Math.max(4, Math.min(64, Number(length) || 12));
    let result = "";
    for (let i = 0; i < size; i += 1) {
      result += pool[randomIntInclusivo(0, pool.length - 1)];
    }

    setPassword(result);
    setMessage("");
  }

  async function copyPassword() {
    if (!password) {
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      setMessage(txt.msgCopied);
    } catch {
      setMessage(txt.msgCopyFail);
    }
  }

  return (
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{uiText(txt.back)}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M20 10h-1.1a6.9 6.9 0 0 0-1.08-2.6l.78-.78a1 1 0 1 0-1.42-1.42l-.78.78A6.9 6.9 0 0 0 13.8 4.9V3.8a1 1 0 1 0-2 0v1.1A6.9 6.9 0 0 0 9.2 6l-.78-.78A1 1 0 1 0 7 6.64l.78.78A6.9 6.9 0 0 0 6.7 10H5.6a1 1 0 1 0 0 2h1.1c.2.94.57 1.82 1.08 2.6l-.78.78A1 1 0 0 0 8.42 16.8l.78-.78c.78.51 1.66.88 2.6 1.08v1.1a1 1 0 1 0 2 0v-1.1c.94-.2 1.82-.57 2.6-1.08l.78.78a1 1 0 0 0 1.42-1.42l-.78-.78c.51-.78.88-1.66 1.08-2.6H20a1 1 0 1 0 0-2Zm-7.2 3.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>

      <Panel as="div" layout="plain">
        <div className="grid md:grid-cols-2 gap-6">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.length)}</span>
            <Input
              type="number"
              min="4"
              max="64"
              value={length}
              onChange={(event) => setLength(event.target.value)}
              placeholder="12"
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
            <label className="inline-flex items-center gap-2">
              <Input type="checkbox" checked={useUpper} onChange={(event) => setUseUpper(event.target.checked)} className="h-4 w-4 accent-cyan-400" />
              {uiText(txt.upper)}
            </label>
            <label className="inline-flex items-center gap-2">
              <Input type="checkbox" checked={useLower} onChange={(event) => setUseLower(event.target.checked)} className="h-4 w-4 accent-cyan-400" />
              {uiText(txt.lower)}
            </label>
            <label className="inline-flex items-center gap-2">
              <Input type="checkbox" checked={useNumbers} onChange={(event) => setUseNumbers(event.target.checked)} className="h-4 w-4 accent-cyan-400" />
              {uiText(txt.numbers)}
            </label>
            <label className="inline-flex items-center gap-2">
              <Input type="checkbox" checked={useSymbols} onChange={(event) => setUseSymbols(event.target.checked)} className="h-4 w-4 accent-cyan-400" />
              {uiText(txt.symbols)}
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="primary" type="button" onClick={generatePassword} className="text-slate-900 transition">
            {uiText(txt.generate)}
          </Button>
          <Button variant="secondary" type="button" onClick={copyPassword} className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition">
            {uiText(txt.copy)}
          </Button>
        </div>

        <div className="mt-6">
          <p className="text-sm text-slate-400 mb-2">{uiText(txt.generated)}</p>
          <p className="bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 break-all min-h-12">
            {password || uiText(txt.clickGenerate)}
          </p>
          {password && (
            <p className={`text-sm mt-3 ${strength.className}`}>
              {uiText(txt.strength)}: {uiText(strength.level === "weak" ? txt.strengthWeak : strength.level === "medium" ? txt.strengthMedium : txt.strengthStrong)}
            </p>
          )}
          {message && <p className="text-sm mt-2 text-slate-300">{uiMessage(message)}</p>}
        </div>
      </Panel>
    </PageTemplate>
  );
}
