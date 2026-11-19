let englishContent = {};
let lowercase = new Map();
let templates = [];
let portugueseMessages = new Map();
let state = "idle";
let pending;
const listeners = new Set();

export const getContentCatalogState = () => state;
export function subscribeContentCatalog(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function publish(next) {
  state = next;
  listeners.forEach((listener) => listener());
}
export function loadContentCatalog() {
  if (state === "ready") return Promise.resolve();
  if (pending) return pending;
  publish("loading");
  pending = import("../locales/en/contentCatalog.js").then((module) => {
    englishContent = module.default;
    portugueseMessages = new Map(Object.entries(englishContent).map(([pt, en]) => [en, pt]));
    lowercase = new Map(Object.entries(englishContent).map(([pt, en]) => [pt.toLocaleLowerCase("pt-BR"), en]));
    templates = Object.entries(englishContent).filter(([key]) => key.includes("{{") && key.replace(/\{\{\d+\}\}/g, "").trim().length >= 5).map(([source, target]) => {
  const indices = [];
  const pattern = source.split(/(\{\{\d+\}\})/g).map((part) => {
    const match = part.match(/^\{\{(\d+)\}\}$/);
    if (match) { indices.push(Number(match[1])); return "(.*?)"; }
    return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }).join("");
  return { pattern: new RegExp(`^${pattern}$`, "s"), indices, target };
    });
    publish("ready");
  }).catch((error) => {
    pending = undefined;
    publish("error");
    throw error;
  });
  return pending;
}

export function translateContent(value, language, substitutions) {
  if (Array.isArray(value)) return value.map((item) => translateContent(item, language));
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  let result = value;
  if (language?.startsWith("en") && trimmed) {
    let translated = Object.hasOwn(englishContent, trimmed) ? englishContent[trimmed] : lowercase.get(trimmed.toLocaleLowerCase("pt-BR"));
    if (!translated) for (const template of templates) {
      const match = trimmed.match(template.pattern);
      if (!match) continue;
      const values = {};
      template.indices.forEach((index, position) => { values[index] = match[position + 1]; });
      translated = template.target.replace(/\{\{(\d+)\}\}/g, (_, index) => values[index]);
      break;
    }
    if (translated) result = value.slice(0, value.indexOf(trimmed)) + translated + value.slice(value.indexOf(trimmed) + trimmed.length);
  }
  if (substitutions) result = result.replace(/\{\{(\d+)\}\}/g, (_, index) => String(substitutions[Number(index)] ?? ""));
  return result;
}

// Messages stored in state may have been created before the user changed language.
// Apply reverse lookup only to application messages, never to arbitrary user content.
export function translateMessage(value, language) {
  if (typeof value !== "string") return value;
  if (language?.startsWith("en")) return translateContent(value, language);
  if (Object.hasOwn(englishContent, value.trim())) return value;
  return portugueseMessages.get(value) || value;
}
