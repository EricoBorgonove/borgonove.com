import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const roadmaps = [
  {
    id: "ciberseguranca",
    href: "/roadmaps/ciberseguranca",
    emBreve: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 2.1 6 2.25V11c0 4.1-2.6 8.1-6 9.6-3.4-1.5-6-5.5-6-9.6V6.35L12 4.1ZM11 8h2v5h-2V8Zm0 6h2v2h-2v-2Z"
        />
      </svg>
    ),
  },
  {
    id: "logica-programacao",
    href: "/roadmaps/logica-programacao",
    emBreve: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path fill="currentColor" d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v12h10V6H7Zm2 2h6v2H9V8Zm0 4h6v2H9v-2Z" />
      </svg>
    ),
  },
  {
    id: "javascript",
    href: "/roadmaps/javascript",
    emBreve: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path fill="currentColor" d="M4 4h16v16H4V4Zm2 2v12h12V6H6Zm4.2 8.8c0 1.2-.7 2.2-2.2 2.2-1 0-1.7-.4-2.1-1.2l1.4-.8c.2.4.3.7.7.7s.5-.2.5-.8V9h1.7v5.8Zm3.8 2.2c-1.4 0-2.3-.7-2.8-1.6l1.4-.8c.4.6.8.9 1.4.9s1-.3 1-.7c0-.5-.4-.7-1.2-1.1l-.4-.2c-1.2-.5-2-1.2-2-2.5 0-1.2 1-2.2 2.5-2.2 1.1 0 1.9.4 2.4 1.4l-1.3.8c-.3-.5-.6-.7-1.1-.7-.5 0-.8.3-.8.7 0 .5.3.6 1.1 1l.4.2c1.4.6 2.2 1.2 2.2 2.6 0 1.5-1.2 2.3-2.8 2.3Z" />
      </svg>
    ),
  },
  {
    id: "php",
    href: "/roadmaps/php",
    emBreve: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M4 5a2 2 0 0 1 2-2h7.5L20 9.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm10 0v5h5"
        />
        <path
          fill="currentColor"
          d="M7 11h2.7a1.9 1.9 0 1 1 0 3.8H8.6V17H7v-6Zm1.6 1.3v1.2h1c.5 0 .8-.2.8-.6s-.3-.6-.8-.6h-1Zm4-.3h2.6a1.73 1.73 0 0 1 .3 3.45L17 17h-1.8l-1-1.45H14V17h-1.4v-5Zm1.4 1.2v1.2h1c.46 0 .7-.2.7-.6s-.24-.6-.7-.6h-1Zm4.2-1.2H21v1.3h-2.2v.8h2v1.2h-2V17h-1.4v-5Z"
        />
      </svg>
    ),
  },
  {
    id: "banco-dados",
    emBreve: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path fill="currentColor" d="M12 3c-4.97 0-9 1.34-9 3v12c0 1.66 4.03 3 9 3s9-1.34 9-3V6c0-1.66-4.03-3-9-3Zm0 2c4.25 0 7 .99 7 1s-2.75 1-7 1-7-.99-7-1 2.75-1 7-1Zm0 5c2.9 0 5.45-.46 7-1.18V12c0 .01-2.75 1-7 1s-7-.99-7-1V8.82C6.55 9.54 9.1 10 12 10Zm0 5c2.9 0 5.45-.46 7-1.18V18c0 .01-2.75 1-7 1s-7-.99-7-1v-4.18C6.55 14.54 9.1 15 12 15Z" />
      </svg>
    ),
  },
  {
    id: "git-github",
    href: "/roadmaps/git-github",
    emBreve: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path fill="currentColor" d="M7 3a3 3 0 0 1 1 5.83V15a3 3 0 1 1-2 0V8.83A3 3 0 0 1 7 3Zm10 12a3 3 0 1 1-2 5.24 3 3 0 0 1 .58-5.5 6 6 0 0 0-5.16-4.68v-2a8 8 0 0 1 7.06 6.3A3 3 0 0 1 17 15ZM7 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
      </svg>
    ),
  },
  {
    id: "backend-apis",
    emBreve: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path fill="currentColor" d="M3 5a2 2 0 0 1 2-2h6v2H5v14h6v2H5a2 2 0 0 1-2-2V5Zm16 14h-6v2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-6v2h6v14Zm-9.3-3.3a1 1 0 0 1 0-1.4L12 12 9.7 9.7a1 1 0 1 1 1.4-1.4l3 3a1 1 0 0 1 0 1.4l-3 3a1 1 0 0 1-1.4 0Z" />
      </svg>
    ),
  },
  {
    id: "projetos-portfolio",
    emBreve: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2H4V5Zm0 4h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Zm4 3a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Zm0 4a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H8Z" />
      </svg>
    ),
  },
];

export default function Roadmaps() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage?.startsWith("en") ? "en-US" : "pt-BR";

  const roadmapsOrdenados = [...roadmaps].sort((a, b) =>
    t(`roadmaps.items.${a.id}.title`).localeCompare(t(`roadmaps.items.${b.id}.title`), locale)
  );

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6H6v6h3a3 3 0 1 1 0 6H6a3 3 0 0 1-3-3V6Zm12-3h3a3 3 0 1 1 0 6h-3v2h-2V6a3 3 0 0 1 3-3Zm0 4h3a1 1 0 1 0 0-2h-3a1 1 0 0 0 0 2Zm-2 6h2v2h3a1 1 0 1 1 0 2h-3a3 3 0 0 1-3-3v-1h1Z" />
        </svg>
        <span>{t("roadmaps.title")}</span>
      </h1>
      <p className="text-slate-400 text-lg mb-10">
        {t("roadmaps.description")}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmapsOrdenados.map((item) => {
          const isActive = !item.emBreve && Boolean(item.href);
          const card = (
            <article
              className={`relative overflow-hidden glass theme-hover-border p-6 rounded-2xl h-full transition duration-300 ${
                isActive ? "hover:-translate-y-2 cursor-pointer" : "opacity-95"
              }`}
            >
              {!isActive && (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
                  <span className="text-sky-100 text-sm md:text-base font-bold uppercase tracking-[0.2em]">
                    {t("common.comingSoon")}
                  </span>
                </div>
              )}
              <h2 className="text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
                <span className="text-cyan-300">{item.icon}</span>
                <span>{t(`roadmaps.items.${item.id}.title`)}</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed text-justify">
                {t(`roadmaps.items.${item.id}.description`)}
              </p>
            </article>
          );

          if (!isActive) {
            return <div key={item.id}>{card}</div>;
          }

          return (
            <Link key={item.id} to={item.href} className="block">
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
