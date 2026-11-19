import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import { analiseDadosColecoes } from "../data/analiseDadosColecoes";

function getCollectionTitle(item, isEn) {
  return isEn ? item.title_en || item.title : item.title;
}

function getCollectionDescription(item, isEn) {
  return isEn ? item.description_en || item.description : item.description;
}

function getCollectionBadge(item, isEn) {
  return isEn ? item.badge_en || item.badge : item.badge;
}

export default function AnaliseDados() {
  const { text: uiText } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const sortLocale = isEn ? "en-US" : "pt-BR";
  const txt = isEn
    ? {
        back: "Back to subjects",
        title: "Data Analysis",
        description:
          "Exercise lists to be solved for data analysis using Python and Anaconda.",
        openList: "Open list",
      }
    : {
        back: "Voltar para Disciplinas",
        title: "Análise de Dados",
        description:
          "Listas de exercícios para serem resolvidas para análise de dados com Python e Anaconda.",
        openList: "Abrir lista",
      };

  const colecoesOrdenadas = [...analiseDadosColecoes].sort((a, b) =>
    getCollectionTitle(a, isEn).localeCompare(getCollectionTitle(b, isEn), sortLocale)
  );

  return (
    <PageTemplate>
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {uiText(txt.back)}
        </BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h1.5a2 2 0 0 1 1.88 1.32L9.72 5H18a2 2 0 0 1 2 2v1H4V5Zm0 4h16v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9Zm3 2a1 1 0 0 0 0 2h1v3a1 1 0 1 0 2 0v-3h1a1 1 0 1 0 0-2H7Zm7 0a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Zm3 1a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>
      <PageDescription>{uiText(txt.description)}</PageDescription></PageHeader>

      <div className="grid gap-6 md:grid-cols-2">
        {colecoesOrdenadas.map((colecao) => (
          <Link
            key={colecao.slug}
            to={`/disciplinas/analise-dados/${colecao.slug}`}
            className="block"
          >
            <Panel as="article" layout="plain" className="theme-hover-border h-full transition duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-xl font-semibold text-cyan-300">
                  {uiText(getCollectionTitle(colecao, isEn))}
                </h2>
                <span className="inline-flex items-center rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold text-slate-950">
                  {uiText(getCollectionBadge(colecao, isEn))}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {uiText(getCollectionDescription(colecao, isEn))}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                {uiText(txt.openList)}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M13.3 5.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4l3.3-3.3H5a1 1 0 1 1 0-2h11.6l-3.3-3.3a1 1 0 0 1 0-1.4Z"
                  />
                </svg>
              </span>
            </Panel>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
}
