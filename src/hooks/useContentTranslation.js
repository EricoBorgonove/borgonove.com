import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { translateContent, translateMessage, loadContentCatalog, getContentCatalogState, subscribeContentCatalog } from "../utils/contentTranslation";

export function useContentTranslation() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language || "pt";
  const state = useSyncExternalStore(subscribeContentCatalog, getContentCatalogState, getContentCatalogState);
  useEffect(() => {
    if (language.startsWith("en")) loadContentCatalog().catch(() => {});
  }, [language]);
  const contentLanguage = state === "ready" ? language : "pt";
  const text = useCallback((value, substitutions) => translateContent(value, contentLanguage, substitutions), [contentLanguage]);
  const message = useCallback((value) => translateMessage(value, contentLanguage), [contentLanguage]);
  return { text, message, language, ready: !language.startsWith("en") || state === "ready", state, retry: () => window.location.reload() };
}
