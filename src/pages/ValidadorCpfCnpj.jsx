import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

function validarCpf(cpf) {
  if (!/^\d{11}$/.test(cpf)) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i += 1) {
    soma += Number(cpf[i]) * (10 - i);
  }
  let dig1 = (soma * 10) % 11;
  if (dig1 === 10) dig1 = 0;
  if (dig1 !== Number(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i += 1) {
    soma += Number(cpf[i]) * (11 - i);
  }
  let dig2 = (soma * 10) % 11;
  if (dig2 === 10) dig2 = 0;
  return dig2 === Number(cpf[10]);
}

function validarCnpj(cnpj) {
  if (!/^\d{14}$/.test(cnpj)) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let soma = 0;
  for (let i = 0; i < 12; i += 1) {
    soma += Number(cnpj[i]) * pesos1[i];
  }
  let resto = soma % 11;
  const dig1 = resto < 2 ? 0 : 11 - resto;
  if (dig1 !== Number(cnpj[12])) return false;

  soma = 0;
  for (let i = 0; i < 13; i += 1) {
    soma += Number(cnpj[i]) * pesos2[i];
  }
  resto = soma % 11;
  const dig2 = resto < 2 ? 0 : 11 - resto;
  return dig2 === Number(cnpj[13]);
}

export default function ValidadorCpfCnpj() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "CPF/CNPJ Validator",
        label: "CPF or CNPJ",
        placeholder: "Type CPF or CNPJ",
        enterDoc: "Enter CPF or CNPJ",
        validCpf: "Valid CPF",
        invalidCpf: "Invalid CPF",
        validCnpj: "Valid CNPJ",
        invalidCnpj: "Invalid CNPJ",
        invalidLength: "Invalid digit length",
        identifiedType: "Detected type",
      }
    : {
        back: "Voltar para utilidades",
        title: "Validador CPF/CNPJ",
        label: "CPF ou CNPJ",
        placeholder: "Digite CPF ou CNPJ",
        enterDoc: "Informe CPF ou CNPJ",
        validCpf: "CPF válido",
        invalidCpf: "CPF inválido",
        validCnpj: "CNPJ válido",
        invalidCnpj: "CNPJ inválido",
        invalidLength: "Quantidade de dígitos inválida",
        identifiedType: "Tipo identificado",
      };

  const [valor, setValor] = useState("");

  const resultado = useMemo(() => {
    const digits = onlyDigits(valor);
    if (!digits) return { tipo: "", valido: null, texto: txt.enterDoc };

    if (digits.length === 11) {
      const ok = validarCpf(digits);
      return { tipo: "CPF", valido: ok, texto: ok ? txt.validCpf : txt.invalidCpf };
    }

    if (digits.length === 14) {
      const ok = validarCnpj(digits);
      return { tipo: "CNPJ", valido: ok, texto: ok ? txt.validCnpj : txt.invalidCnpj };
    }

    return { tipo: "", valido: null, texto: txt.invalidLength };
  }, [txt.enterDoc, txt.invalidCnpj, txt.invalidCpf, txt.invalidLength, txt.validCnpj, txt.validCpf, valor]);

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-4xl mx-auto">
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{txt.back}
      </BackButton>

      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 3h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6l-2 2h-1l-2-2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v12h6l1.5 1.5L13 17h7V5H4Zm3 3h10v2H7V8Zm0 4h6v2H7v-2Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>

      <div className="glass rounded-2xl p-8">
        <label className="block">
          <span className="block text-sm text-slate-300 mb-2">{txt.label}</span>
          <input
            type="text"
            value={valor}
            onChange={(event) => setValor(event.target.value)}
            placeholder={txt.placeholder}
            className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </label>

        <div className="mt-6">
          <p className="text-sm text-slate-400">{txt.identifiedType}: {resultado.tipo || "-"}</p>
          <p
            className={`mt-2 text-lg font-semibold ${
              resultado.valido === true
                ? "text-emerald-300"
                : resultado.valido === false
                  ? "text-red-400"
                  : "text-slate-300"
            }`}
          >
            {resultado.texto}
          </p>
        </div>
      </div>
    </section>
  );
}
