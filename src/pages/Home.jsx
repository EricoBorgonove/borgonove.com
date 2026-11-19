import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import sobreBg from "../assets/images/innovalabs-software-developer-6521720.jpg";
import projetosBg from "../assets/images/vecteezy_digital-transformation-technology-strategy-iot-internet-of_12520352.jpg";

const diferenciais = [
  {
    key: "innovativeDevelopment",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="m8.7 16.7-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0Zm6.6 0a1 1 0 0 1 0-1.4l3.3-3.3-3.3-3.3a1 1 0 1 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4 0Z"
        />
      </svg>
    ),
  },
  {
    key: "educationTechnology",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M12 3 2 7l10 4 8-3.2V17h2V7L12 3Zm-6 8v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11l-6 2.4L6 11Z"
        />
      </svg>
    ),
  },
  {
    key: "smartAutomation",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M12 2a1 1 0 0 1 1 1v1.06a8 8 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 6a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z"
        />
      </svg>
    ),
  },
  {
    key: "strategicProjects",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm1 4v10h14V7H5Zm2 2h4v2H7V9Zm0 4h4v2H7v-2Zm6-4h4v6h-4V9Z"
        />
      </svg>
    ),
  },
];

const servicos = [
  {
    key: "webDev",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-2.4 2.4a1 1 0 0 1-1.41 0L7.76 17H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v9h4.17a1 1 0 0 1 .7.29L11 17.41l1.88-1.88a1 1 0 0 1 .7-.29H20V6H4Z"
        />
      </svg>
    ),
  },
  {
    key: "customSystems",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-5v2h5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-7v2h1a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h1v-2H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h5V9H6a2 2 0 0 1-2-2V5Zm2 0v2h12V5H6Zm0 8v2h12v-2H6Z"
        />
      </svg>
    ),
  },
  {
    key: "technicalConsulting",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M5 3h10l4 4v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm8 1.5V8h3.5L13 4.5ZM7 11h10v2H7v-2Zm0 4h10v2H7v-2Z"
        />
      </svg>
    ),
  },
  {
    key: "dataAnalysis",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M4 20a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v13h14a1 1 0 1 1 0 2H4Zm3-3a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1Zm5 0a1 1 0 0 1-1-1V9a1 1 0 1 1 2 0v7a1 1 0 0 1-1 1Zm5 0a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v9a1 1 0 0 1-1 1Z"
        />
      </svg>
    ),
  },
  {
    key: "infrastructure",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M4 4h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-7v2h7a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-7v1a1 1 0 1 1-2 0v-1H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7v-2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v3h16V6H4Zm0 9v3h16v-3H4Z"
        />
      </svg>
    ),
  },
  {
    key: "automations",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M10.9 2a1 1 0 0 1 .98.8l.33 1.64a7.72 7.72 0 0 1 1.58.66l1.42-.9a1 1 0 0 1 1.25.13l1.41 1.41a1 1 0 0 1 .13 1.25l-.9 1.42c.25.5.47 1.03.64 1.58l1.66.33a1 1 0 0 1 .8.98v2a1 1 0 0 1-.8.98l-1.66.33a7.8 7.8 0 0 1-.64 1.58l.9 1.42a1 1 0 0 1-.13 1.25l-1.41 1.41a1 1 0 0 1-1.25.13l-1.42-.9a7.72 7.72 0 0 1-1.58.66l-.33 1.64a1 1 0 0 1-.98.8h-2a1 1 0 0 1-.98-.8l-.33-1.64a7.72 7.72 0 0 1-1.58-.66l-1.42.9a1 1 0 0 1-1.25-.13l-1.41-1.41a1 1 0 0 1-.13-1.25l.9-1.42a7.8 7.8 0 0 1-.64-1.58l-1.66-.33a1 1 0 0 1-.8-.98v-2a1 1 0 0 1 .8-.98l1.66-.33c.17-.55.39-1.08.64-1.58l-.9-1.42a1 1 0 0 1 .13-1.25L5.96 4.3a1 1 0 0 1 1.25-.13l1.42.9a7.72 7.72 0 0 1 1.58-.66l.33-1.64A1 1 0 0 1 11.52 2h-2.04Zm1.1 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  const { text: uiText } = useContentTranslation();

  const { t } = useTranslation();
  const projectItems = t("home.projects.items", { returnObjects: true });

  return (
    <PageTemplate as="div" width="landing">
      <section id="inicio" className="min-h-screen flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <PageTitle>
            {uiText(t("home.hero.titleBefore"))}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {uiText(t("home.hero.titleHighlight"))}
            </span>{" "}
            {uiText(t("home.hero.titleAfter"))}
          </PageTitle>

          <p className="mt-8 text-lg text-slate-400 max-w-2xl mx-auto">
            {uiText(t("home.hero.description"))}
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <a
              href="#projetos"
              className="bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              {uiText(t("home.hero.projects"))}
            </a>

            <Link
              to="/contato"
              className="border border-slate-600 px-8 py-3 rounded-xl hover:border-cyan-400 transition"
            >
              {uiText(t("home.hero.contact"))}
            </Link>
          </div>
        </div>
      </section>

      <section id="sobre" className="relative isolate overflow-hidden py-32">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sobreBg})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10 sobre-overlay" aria-hidden="true" />

        <div className="relative z-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{uiText(t("home.about.title"))}</h2>
            <p className="text-slate-400 leading-relaxed text-lg text-justify sobre-descricao">
              {uiText(t("home.about.description"))}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Panel as="div" layout="plain" className="hover:-translate-y-2 hover:!border-cyan-400/40 home-hover-card transition duration-300">
              <h3 className="text-3xl font-bold text-cyan-400">+100</h3>
              <p className="text-slate-400 text-sm mt-2">{uiText(t("home.about.stats.projects"))}</p>
            </Panel>
            <Panel as="div" layout="plain" className="hover:-translate-y-2 hover:!border-cyan-400/40 home-hover-card transition duration-300">
              <h3 className="text-3xl font-bold text-cyan-400">+800</h3>
              <p className="text-slate-400 text-sm mt-2">{uiText(t("home.about.stats.students"))}</p>
            </Panel>
            <Panel as="div" layout="plain" className="hover:-translate-y-2 hover:!border-cyan-400/40 home-hover-card transition duration-300">
              <h3 className="text-3xl font-bold text-cyan-400">
                {uiText(t("home.about.stats.strategy").split(" ")[0])}
              </h3>
              <p className="text-slate-400 text-sm mt-2">{uiText(t("home.about.stats.strategy"))}</p>
            </Panel>
            <Panel as="div" layout="plain" className="hover:-translate-y-2 hover:!border-cyan-400/40 home-hover-card transition duration-300">
              <h3 className="text-3xl font-bold text-cyan-400">
                {uiText(t("home.about.stats.performance").split(" ")[0])}
              </h3>
              <p className="text-slate-400 text-sm mt-2">{uiText(t("home.about.stats.performance"))}</p>
            </Panel>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-900/60 border-y border-slate-800/70">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              {uiText(t("home.solutions.title"))}
            </h2>
            <p className="text-slate-400 text-lg mt-8 text-justify">
              {uiText(t("home.solutions.description"))}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {diferenciais.map((item) => (
              <Panel as="article" layout="plain"
                key={item.key}
                className="h-full flex flex-col transition duration-300 hover:-translate-y-2 hover:!border-cyan-400/40 home-hover-card"
              >
                <div className="h-16 w-16 rounded-full bg-slate-800/70 border border-slate-700 text-cyan-300 flex items-center justify-center">
                  {uiText(item.icon)}
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-3">{uiText(t(`home.solutions.items.${item.key}.title`))}</h3>
                <p className="text-slate-400 text-justify">{uiText(t(`home.solutions.items.${item.key}.description`))}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section id="servicos" className="py-16 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">{uiText(t("home.services.title"))}</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {servicos.map((item) => (
              <Panel as="article" layout="plain"
                key={item.key}
                className="h-full transition duration-300 hover:-translate-y-2 hover:!border-cyan-400/40 home-hover-card"
              >
                <h3 className="text-xl font-semibold mb-4 text-cyan-400 inline-flex items-center justify-center gap-2">
                  <span className="text-cyan-300 [&_svg]:h-5 [&_svg]:w-5">{uiText(item.icon)}</span>
                  <span>{uiText(t(`home.services.items.${item.key}.title`))}</span>
                </h3>
                <p className="text-slate-400 text-sm">{uiText(t(`home.services.items.${item.key}.description`))}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section id="projetos" className="relative isolate overflow-hidden py-24">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${projetosBg})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10 sobre-overlay" aria-hidden="true" />

        <div className="relative z-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">{uiText(t("home.projects.title"))}</h2>
            <p className="text-slate-400 mt-4">
              {uiText(t("home.projects.description"))}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projectItems.map((title) => (
                <Panel as="article" layout="plain"
                  key={title}
                  className="hover:-translate-y-2 hover:!border-cyan-400/40 home-hover-card transition duration-300"
                >
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">{uiText(title)}</h3>
                  <p className="text-slate-400 text-sm">
                    {uiText(t("home.projects.cardDescription"))}
                  </p>
                </Panel>
              ))}
          </div>
        </div>
      </section>

    </PageTemplate>
  );
}
