import { PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { translatePtToEnWithMap } from "../utils/ptEnTranslate";
import notFoundEnMap from "../data/notfound-en-map.json";

export default function NotFound() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const tx = (value) => (isEn ? translatePtToEnWithMap(value, notFoundEnMap) : value);

  return (
    <PageTemplate>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-cyan-300 text-sm uppercase tracking-[0.25em] mb-4">{tx("Erro 404")}</p>
          <PageTitle className="mb-4">{tx("Página não encontrada")}</PageTitle>
          <p className="text-slate-400 mb-8 leading-relaxed">
            {tx("O endereço acessado não existe ou foi movido. Use uma das opções abaixo para continuar navegando.")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <BackButton
              fallbackTo="/"
              className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-3 rounded-xl font-semibold transition"
            >
              {tx("Voltar para página anterior")}
            </BackButton>
            <Link
              to="/"
              className="inline-flex items-center justify-center border border-cyan-400/40 hover:border-cyan-300 text-cyan-200 hover:text-cyan-100 px-6 py-3 rounded-xl font-semibold transition"
            >
              {tx("Ir para o início")}
            </Link>
          </div>
        </div>

        <Panel as="div" layout="plain">
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">{tx("Caminhos úteis")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { to: "/disciplinas", label: tx("Disciplinas"), text: tx("Conteúdos acadêmicos e trilhas por tema.") },
              { to: "/roadmaps", label: tx("Roadmaps"), text: tx("Rotas de estudo organizadas por objetivo.") },
              { to: "/utilidades", label: tx("Utilidades"), text: tx("Ferramentas rápidas para o dia a dia.") },
              { to: "/contato", label: tx("Contato"), text: tx("Fale conosco para suporte ou projetos.") },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-left transition hover:border-cyan-400"
              >
                <span className="block font-semibold text-slate-100 mb-1">{item.label}</span>
                <span className="block text-sm text-slate-400 leading-relaxed">{item.text}</span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </PageTemplate>
  );
}
