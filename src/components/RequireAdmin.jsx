import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminAuth } from "../hooks/useAdminAuth";

export default function RequireAdmin({ children }) {
  const { i18n } = useTranslation();
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");

  if (isLoading) {
    return (
      <section className="min-h-[70vh] px-6 py-24 max-w-4xl mx-auto flex items-center justify-center">
        <div className="glass rounded-2xl px-6 py-4 text-sm text-slate-300">
          {isEn ? "Loading protected access..." : "Carregando acesso protegido..."}
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
