import { CardGrid, ContentCard, PageDescription, PageHeader, PageTemplate, PageTitle } from "../components/ui/Patterns";
import { useTranslation } from "react-i18next";

const disciplinas = [
  {
    id: "afd",
    href: "/disciplinas/afd",
  },
  {
    id: "algoritmos",
    href: "/disciplinas/algoritmos",
  },
  {
    id: "analise-dados",
    href: "/disciplinas/analise-dados",
  },
  {
    id: "arquitetura-software",
    href: "/disciplinas/arquitetura-software",
  },
  {
    id: "desenvolvimento-web",
    href: null,
  },
  {
    id: "docker",
    href: "/disciplinas/docker",
  },
  {
    id: "esbmc",
    href: "/disciplinas/esbmc",
  },
  {
    id: "git-github",
    href: "/disciplinas/git-github",
  },
  {
    id: "modelagem-banco-dados",
    href: "/disciplinas/modelagem-dados",
  },
  {
    id: "protocolo-http",
    href: "/disciplinas/protocolo-http",
  },
  {
    id: "postgresql",
    href: "/disciplinas/postgresql",
  },
  {
    id: "python",
    href: "/disciplinas/python",
  },
  {
    id: "python-pandas",
    href: "/disciplinas/python-pandas",
  },
  {
    id: "tailwind-css",
    href: "/disciplinas/tailwind-css",
  },
];

export default function Disciplinas() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage?.startsWith("en") ? "en-US" : "pt-BR";
  const disciplinasOrdenadas = [...disciplinas].sort((a, b) =>
    t(`subjects.items.${a.id}.title`).localeCompare(t(`subjects.items.${b.id}.title`), locale)
  );

  return (
    <PageTemplate>
      <PageHeader><PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M12 3 2 7l10 4 8-3.2V17h2V7L12 3Zm-6 8v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11l-6 2.4L6 11Z"
          />
        </svg>
        <span>{t("subjects.title")}</span>
      </PageTitle>
      <PageDescription>
        {t("subjects.description")}
      </PageDescription></PageHeader>

      <CardGrid>
        {disciplinasOrdenadas.map((disciplina) => (
          <ContentCard key={disciplina.id} to={disciplina.href} headingAs="h2"
            title={t(`subjects.items.${disciplina.id}.title`)}
            description={t(`subjects.items.${disciplina.id}.description`)}
            action={i18n.resolvedLanguage?.startsWith("en") ? "Open subject" : "Abrir disciplina"}
            unavailable={!disciplina.href} unavailableLabel={t("common.comingSoon")} />
        ))}
      </CardGrid>
    </PageTemplate>
  );
}
