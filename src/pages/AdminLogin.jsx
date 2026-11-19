import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminAuth } from "../hooks/useAdminAuth";

export default function AdminLogin() {
  const { text: uiText, message: uiMessage } = useContentTranslation();

  const { i18n } = useTranslation();
  const { signIn, isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/admin";
  const txt = isEn
    ? {
        back: "Back to site",
        eyebrow: "Restricted access",
        title: "Administrative sign in",
        description: "Enter your credentials to access the administrative area.",
        username: "Username",
        password: "Password",
        submit: "Enter admin area",
        invalidLogin: "Invalid username or password.",
        loading: "Validating current session...",
        unavailable: "Could not connect to authentication server.",
      }
    : {
        back: "Voltar para o site",
        eyebrow: "Acesso restrito",
        title: "Login administrativo",
        description: "Informe suas credenciais para acessar a área administrativa.",
        username: "Usuário",
        password: "Senha",
        submit: "Entrar na área administrativa",
        invalidLogin: "Usuário ou senha inválidos.",
        loading: "Validando sessão atual...",
        unavailable: "Não foi possível conectar ao servidor de autenticação.",
      };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate, redirectTo]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = await signIn(username, password);

    if (!result.ok) {
      setError(result.error === "NETWORK_ERROR" ? txt.unavailable : txt.invalidLogin);
      setIsSubmitting(false);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <PageTemplate>
      <div className="max-w-xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition"
        >
          <span aria-hidden="true">←</span>
          <span>{uiText(txt.back)}</span>
        </Link>

        <Panel as="div" layout="plain" className="mt-6 border border-cyan-400/10 shadow-[0_24px_80px_rgba(6,182,212,0.12)]">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{uiText(txt.eyebrow)}</p>
          <PageHeader><PageTitle className="text-white mb-4">{uiText(txt.title)}</PageTitle>
          <PageDescription>
            {uiText(isLoading ? txt.loading : txt.description)}
          </PageDescription></PageHeader>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="block text-sm text-slate-300 mb-2">{uiText(txt.username)}</span>
              <Input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                disabled={isLoading || isSubmitting}
                className="w-full border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block">
              <span className="block text-sm text-slate-300 mb-2">{uiText(txt.password)}</span>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                disabled={isLoading || isSubmitting}
                className="w-full border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </label>

            {error && (
              <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {uiMessage(error)}
              </p>
            )}

            <Button variant="primary"
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full text-slate-950 transition"
            >
              {uiText(isSubmitting ? (isEn ? "Authenticating..." : "Autenticando...") : txt.submit)}
            </Button>
          </form>
        </Panel>
      </div>
    </PageTemplate>
  );
}
