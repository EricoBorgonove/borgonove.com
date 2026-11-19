import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle } from "../components/ui/Patterns";
import ContactForm from "../components/ContactForm";
import { useTranslation } from "react-i18next";

export default function Contato() {
  const { text: uiText } = useContentTranslation();

  const { t } = useTranslation();

  return (
    <PageTemplate className="text-left">
      <PageHeader className="mx-auto">
        <PageTitle className="mb-6 flex items-center justify-start gap-3 text-left">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
            <path
              fill="currentColor"
              d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v.35l-9 5.4-9-5.4V6Zm0 2.68V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.68l-8.49 5.1a1 1 0 0 1-1.02 0L3 8.68Z"
            />
          </svg>
          <span>{uiText(t("contactPage.title"))}</span>
        </PageTitle>
        <PageDescription>
          {uiText(t("contactPage.description"))}
        </PageDescription>
      </PageHeader>

      <ContactForm />
    </PageTemplate>
  );
}
