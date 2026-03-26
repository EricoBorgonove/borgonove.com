import ContactForm from "../components/ContactForm";
import { useTranslation } from "react-i18next";

export default function Contato() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[70vh] px-6 py-24 text-left">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center justify-start gap-3 text-left">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
            <path
              fill="currentColor"
              d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v.35l-9 5.4-9-5.4V6Zm0 2.68V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.68l-8.49 5.1a1 1 0 0 1-1.02 0L3 8.68Z"
            />
          </svg>
          <span>{t("contactPage.title")}</span>
        </h1>
        <p className="text-slate-400 mb-12">
          {t("contactPage.description")}
        </p>
      </div>

      <ContactForm />
    </section>
  );
}
