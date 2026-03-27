import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const disciplinas = [
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
    <section className="min-h-[70vh] px-6 py-24 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M12 3 2 7l10 4 8-3.2V17h2V7L12 3Zm-6 8v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11l-6 2.4L6 11Z"
          />
        </svg>
        <span>{t("subjects.title")}</span>
      </h1>
      <p className="text-slate-400 text-lg mb-10">
        {t("subjects.description")}
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {disciplinasOrdenadas.map((disciplina) => {
          const isActive = Boolean(disciplina.href);
          const card = (
            <article
              className={`relative overflow-hidden glass theme-hover-border p-8 rounded-2xl h-full transition duration-300 ${
                isActive ? "hover:-translate-y-2" : "opacity-95"
              }`}
            >
              {!isActive && (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
                  <span className="text-sky-100 text-sm md:text-base font-bold uppercase tracking-[0.2em]">
                    {t("common.comingSoon")}
                  </span>
                </div>
              )}
              <h2 className="text-lg font-semibold text-cyan-400 mb-2">
                {t(`subjects.items.${disciplina.id}.title`)}
              </h2>
              <p className="text-slate-400 text-sm">
                {t(`subjects.items.${disciplina.id}.description`)}
              </p>
            </article>
          );

          if (!disciplina.href) {
            return <div key={disciplina.id}>{card}</div>;
          }

          return (
            <Link key={disciplina.id} to={disciplina.href} className="block">
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
