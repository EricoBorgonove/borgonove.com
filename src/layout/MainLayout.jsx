import CookieBanner from "../components/CookieBanner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContentTranslation } from "../hooks/useContentTranslation";
import { useTranslation } from "react-i18next";

export default function MainLayout({ children }) {
  const { ready, state, retry } = useContentTranslation();
  const { t } = useTranslation();
  return (
    <div className="app-shell bg-slate-950 text-white overflow-x-hidden glow min-h-screen">
      <Navbar />
      <main className="pt-28" aria-busy={!ready}>
        <div hidden={!ready}>{children}</div>
        {!ready && <div className="mx-auto max-w-5xl px-6 py-24" role="status">
          <p>{t(state === "error" ? "common.ui.translationError" : "common.ui.loadingTranslations")}</p>
          {state === "error" && <button type="button" className="ui-button ui-button--secondary mt-4" onClick={retry}>{t("common.ui.retryTranslations")}</button>}
        </div>}
      </main>
      <CookieBanner />
      <Footer />
    </div>
  );
}
