import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { translateContent, translateMessage, loadContentCatalog } from "../src/utils/contentTranslation.js";
import catalog from "../src/locales/en/content.json" with { type: "json" };
import ptCommon from "../src/locales/pt/common.json" with { type: "json" };
import enCommon from "../src/locales/en/common.json" with { type: "json" };
await loadContentCatalog();

test("conteúdo tem português e inglês sem perder espaços de composição", () => {
  assert.equal(translateContent("Voltar para PostgreSQL", "pt"), "Voltar para PostgreSQL");
  assert.equal(translateContent("Voltar para PostgreSQL", "en"), "Back to PostgreSQL");
  assert.equal(translateContent(" Copiar ", "en-US"), " Copy ");
});
test("tradução preserva valores interpolados, React e código técnico", () => {
  assert.equal(translateContent("Questão {{0}}", "en", [7]), "Question 7");
  assert.equal(translateContent("Questão {{0}}", "pt", [7]), "Questão 7");
  assert.equal(translateContent("Questão 7", "en"), "Question 7");
  const element = createElement("code", null, "SELECT * FROM tabela;");
  assert.equal(translateContent(element, "en"), element);
  assert.equal(translateContent("SELECT * FROM tabela;", "en"), "SELECT * FROM tabela;");
  assert.equal(translateContent("/disciplinas/python", "en"), "/disciplinas/python");
  assert.equal(translateContent(42, "en"), 42);
});
test("catálogo não tem entradas vazias e preserva os marcadores de interpolação", () => {
  for (const [pt, en] of Object.entries(catalog)) {
    assert(en.trim(), pt);
    assert.deepEqual((en.match(/\{\{\d+\}\}/g) || []).sort(), (pt.match(/\{\{\d+\}\}/g) || []).sort(), pt);
  }
});

test("recursos comuns possuem as mesmas chaves em português e inglês", () => {
  function keys(value, prefix = "") {
    if (typeof value === "string") return [prefix];
    return Object.entries(value).flatMap(([key, child]) => keys(child, prefix ? `${prefix}.${key}` : key));
  }
  assert.deepEqual(keys(ptCommon).sort(), keys(enCommon).sort());
});

test("mensagens criadas antes da troca de idioma acompanham o idioma atual", () => {
  const original = "Informe um CEP válido com 8 dígitos.";
  const english = translateMessage(original, "en");
  assert.notEqual(english, original);
  assert.equal(translateMessage(english, "pt"), original);
});
