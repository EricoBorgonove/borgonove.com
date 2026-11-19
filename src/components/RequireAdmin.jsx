import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageTemplate, Panel } from "./ui/Patterns";
import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminAuth } from "../hooks/useAdminAuth";

export default function RequireAdmin({ children }) {
  const { text: uiText } = useContentTranslation();

  const { i18n } = useTranslation();
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");

  if (isLoading) {
    return (
      <PageTemplate className="flex items-center justify-center">
        <Panel as="div" layout="plain" className="text-sm text-slate-300">
          {uiText(isEn ? "Loading protected access..." : "Carregando acesso protegido...")}
        </Panel>
      </PageTemplate>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
