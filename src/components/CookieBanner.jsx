import { Button, Panel } from "./ui/Patterns";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const COOKIE_CONSENT_KEY = "borgonove_cookie_consent";

export default function CookieBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted";
  });

  function handleAccept() {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-[70]">
      <Panel as="div" layout="plain" className="rounded-2xl px-5 py-4 md:px-6 md:py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-200 leading-relaxed">
          {t("cookieBanner.text")}{" "}
          <Link
            to="/aviso-de-privacidade"
            className="font-semibold text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
          >
            {t("cookieBanner.privacyNotice")}
          </Link>
          .
        </p>
        <Button variant="custom"
          type="button"
          onClick={handleAccept}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-4 py-2 rounded-xl font-semibold transition"
        >
          {t("cookieBanner.accept")}
        </Button>
      </Panel>
    </div>
  );
}
