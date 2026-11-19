import { Button, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";

const cards = {
  pt: [
    {
      title: "Blog",
      description: "Gerencie posts, rascunhos e publicações do blog diretamente pelo painel.",
      cta: "Abrir editor do blog",
      to: "/admin/blog",
    },
    {
      title: "TechPlay",
      description: "Acesso ao núcleo de disciplinas, temas e organização inicial da plataforma.",
      cta: "Abrir disciplinas",
      to: "/admin/techplay/disciplinas",
    },
  ],
  en: [
    {
      title: "Blog",
      description: "Manage blog posts, drafts, and published content directly from the admin panel.",
      cta: "Open blog editor",
      to: "/admin/blog",
    },
    {
      title: "TechPlay",
      description: "Access the initial discipline and theme management area for the platform.",
      cta: "Open disciplines",
      to: "/admin/techplay/disciplinas",
    },
  ],
};

export default function AdminArea() {
  const { i18n } = useTranslation();
  const { signOut, adminUser } = useAdminAuth();
  const navigate = useNavigate();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        eyebrow: "Administrative area",
        title: "Admin panel",
        description: "Protected access is active. Select the module you want to manage.",
        logout: "Sign out",
        backToSite: "Back to site",
        signedAs: "Signed in as",
      }
    : {
        eyebrow: "Área administrativa",
        title: "Painel administrativo",
        description: "Acesso protegido ativo. Selecione o módulo que deseja gerenciar.",
        logout: "Sair",
        backToSite: "Voltar para o site",
        signedAs: "Sessão de",
      };

  async function handleLogout() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  const items = isEn ? cards.en : cards.pt;

  return (
    <PageTemplate>
      <Panel as="div" layout="plain" className="overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_32%)]" />

        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{txt.eyebrow}</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <PageTitle className="text-white mb-4">{txt.title}</PageTitle>
              <p className="text-slate-300 text-lg leading-relaxed">{txt.description}</p>
              {adminUser?.username && (
                <p className="mt-3 text-sm text-cyan-200/90">
                  {txt.signedAs}: <span className="font-semibold">{adminUser.username}</span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="secondary"
                type="button"
                onClick={() => navigate("/")}
                className="border border-slate-700 text-slate-200 transition hover:border-cyan-400"
              >
                {txt.backToSite}
              </Button>
              <Button variant="primary"
                type="button"
                onClick={handleLogout}
                className="text-slate-950 transition"
              >
                {txt.logout}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-10">
            {items.map((item) => (
              <Panel as="article" layout="plain"
                key={item.title}

              >
                <h2 className="text-lg font-semibold text-cyan-300 mb-2">{item.title}</h2>
                <p className="text-sm leading-6 text-slate-300">{item.description}</p>
                {item.to && item.cta && (
                  <Link
                    to={item.to}
                    className="mt-5 inline-flex items-center justify-center rounded-xl border border-cyan-400/30 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-500/10"
                  >
                    {item.cta}
                  </Link>
                )}
              </Panel>
            ))}
          </div>
        </div>
      </Panel>
    </PageTemplate>
  );
}
