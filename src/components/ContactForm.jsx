import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, Panel, Textarea } from "./ui/Patterns";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const CHALLENGE_COOKIE_REGEX = /document\.cookie\s*=\s*["']([^"']+)["']/i;

export default function ContactForm() {
  const { text: uiText, message: uiMessage } = useContentTranslation();

  const { t } = useTranslation();
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function mapApiError(errorCode) {
    switch (errorCode) {
      case "CAMPOS_OBRIGATORIOS":
        return t("contactForm.errorMap.required");
      case "EMAIL_INVALIDO":
        return t("contactForm.errorMap.invalidEmail");
      case "MENSAGEM_LONGA":
        return t("contactForm.errorMap.longMessage");
      case "SMTP_CONFIG_INCOMPLETA":
        return t("contactForm.errorMap.smtpConfig");
      case "SMTP_ENVIO_FALHOU":
      case "ENVIO_FALHOU":
        return t("contactForm.errorMap.sendFail");
      default:
        return t("contactForm.errorMap.fallback");
    }
  }

  function applyHumanChallengeCookie(rawResponse) {
    if (typeof document === "undefined") return false;
    const match = rawResponse.match(CHALLENGE_COOKIE_REGEX);
    if (!match) return false;

    const cookiePair = match[1].split(";")[0]?.trim();
    if (!cookiePair || !cookiePair.includes("=")) return false;

    document.cookie = `${cookiePair}; path=/`;
    document.cookie = `${cookiePair}; path=/api`;
    return true;
  }

  async function sendContact(apiUrl, formData) {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
      credentials: "same-origin",
    });

    const raw = await response.text();
    let data = {};
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      data = {};
    }

    return { response, raw, data };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ state: "loading", message: t("contactForm.sending") });

    try {
      const form = event.currentTarget;
      const apiUrl = `${import.meta.env.BASE_URL}api/contact.php`;
      const payload = {
        nome: form.nome.value,
        email: form.email.value,
        mensagem: form.mensagem.value,
        website: form.website?.value || "",
      };

      const makeFormData = () => {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return formData;
      };

      let { response, raw, data } = await sendContact(apiUrl, makeFormData());

      if (response.status === 409 && applyHumanChallengeCookie(raw)) {
        ({ response, raw, data } = await sendContact(apiUrl, makeFormData()));
      }

      if (!response.ok || !data.ok) {
        if (response.status === 409) {
          throw new Error(t("contactForm.errorMap.challenge"));
        }
        throw new Error(data.message || mapApiError(data.error));
      }

      form.reset();
      setStatus({ state: "success", message: t("contactForm.success") });
    } catch (error) {
      setStatus({ state: "error", message: error.message || t("contactForm.errorDefault") });
    }
  }

  return (
    <Panel as="form" layout="plain" className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="text-left">
          <label htmlFor="nome" className="block text-sm text-slate-300 mb-2">
            {uiText(t("contactForm.name"))}
          </label>
          <Input
            id="nome"
            name="nome"
            type="text"
            required
            placeholder={uiText(t("contactForm.placeholderName"))}
            className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="text-left">
          <label htmlFor="email" className="block text-sm text-slate-300 mb-2">
            {uiText(t("contactForm.email"))}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder={uiText(t("contactForm.placeholderEmail"))}
            className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      <div className="mt-6 text-left">
        <label htmlFor="mensagem" className="block text-sm text-slate-300 mb-2">
          {uiText(t("contactForm.message"))}
        </label>
        <Textarea
          id="mensagem"
          name="mensagem"
          rows="6"
          required
          placeholder={uiText(t("contactForm.placeholderMessage"))}
          className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">{uiText("Website")}</label>
        <Input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <Button variant="custom"
          type="submit"
          disabled={status.state === "loading"}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 px-10 py-4 rounded-xl font-semibold text-slate-900 hover:scale-105 transition disabled:opacity-60 disabled:hover:scale-100"
        >
          {uiText(t("contactForm.submit"))}
        </Button>
        {status.message && (
          <p
            className={`text-sm ${
              status.state === "error" ? "text-red-400" : "text-emerald-300"
            }`}
          >
            {uiMessage(status.message)}
          </p>
        )}
      </div>
    </Panel>
  );
}
