import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import ptCommon from "./locales/pt/common.json";

const resources = {
  pt: { common: ptCommon },
  en: { common: enCommon },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    supportedLngs: ["pt", "en"],
    defaultNS: "common",
    ns: ["common"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "site-language",
    },
  });

if (typeof document !== "undefined") {
  const lang = i18n.resolvedLanguage || i18n.language || "pt";
  document.documentElement.lang = lang.startsWith("en") ? "en" : "pt-BR";

  i18n.on("languageChanged", (nextLang) => {
    document.documentElement.lang = nextLang.startsWith("en") ? "en" : "pt-BR";
  });
}

export default i18n;

