import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";

let server;
let ui;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    optimizeDeps: { noDiscovery: true, entries: [], include: [] },
  });
  ui = await server.ssrLoadModule("/src/components/ui/Patterns.jsx");
});
after(async () => { await server?.close(); });
const render = (element) => renderToStaticMarkup(h(MemoryRouter, null, element));

test("PageTemplate sem título mantém o conteúdo e os atributos sem criar cabeçalho vazio", () => {
  const html = render(h(ui.PageTemplate, { id: "aula", width: "wide" }, h("h1", null, "Aula")));
  assert.match(html, /<section[^>]*id="aula"/);
  assert.match(html, /ui-page--wide/);
  assert.doesNotMatch(html, /<header/);
  assert.match(html, /<h1>Aula<\/h1>/);
});
test("Panel preserva a semântica de formulários e detalhes expansíveis", () => {
  assert.match(render(h(ui.Panel, { as: "form", method: "post", layout: "plain" }, "Campos")), /<form[^>]*method="post"/);
  const html = render(h(ui.Panel, { as: "details", open: true, layout: "plain" }, h("summary", null, "Mostrar")));
  assert.match(html, /<details[^>]*open=""/);
  assert.match(html, /<summary>Mostrar<\/summary>/);
});
test("Button preserva submit, reset, disabled e ações de navegação", () => {
  assert.match(render(h(ui.Button, { type: "submit", disabled: true }, "Enviar")), /<button type="submit"[^>]*disabled=""/);
  assert.match(render(h(ui.Button, { type: "reset" }, "Limpar")), /type="reset"/);
  assert.match(render(h(ui.Button, { to: "/disciplinas" }, "Abrir")), /href="\/disciplinas"/);
});
test("Field associa label, input e mensagem de erro", () => {
  const html = render(h(ui.Field, { id: "nome", label: "Nome", error: "Obrigatório", required: true }));
  assert.match(html, /for="nome"/);
  assert.match(html, /id="nome"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /aria-describedby="nome-help"/);
  assert.match(html, /id="nome-help"/);
});
test("Controles preservam os atributos nativos usados pelas ferramentas", () => {
  const html = render(h(ui.Input, { type: "number", min: 1, max: 20, step: ".5", defaultValue: 3, name: "quantidade" }));
  for (const value of ['type="number"', 'min="1"', 'max="20"', 'step=".5"', 'value="3"', 'name="quantidade"']) assert(html.includes(value));
  assert.match(render(h(ui.Input, { type: "checkbox", defaultChecked: true })), /checked=""/);
  assert.match(render(h(ui.Textarea, { rows: 6, defaultValue: "Texto" })), /rows="6"[^>]*>Texto<\/textarea>/);
  assert.match(render(h(ui.Select, { name: "idioma", defaultValue: "pt" }, h("option", {value: "pt"}, "PT"))), /selected=""/);
});
test("ContentCard indisponível não cria link e permite manter a hierarquia h2", () => {
  const html = render(h(ui.ContentCard, { title: "Módulo", headingAs: "h2", unavailable: true, unavailableLabel: "Coming soon" }));
  assert.match(html, /<h2>Módulo<\/h2>/);
  assert.match(html, /Coming soon/);
  assert.doesNotMatch(html, /<a\b/);
});
test("Table mantém os elementos de tabela dentro do container rolável", () => {
  const html = render(h(ui.TableContainer, null, h(ui.Table, null, h("tbody", null, h("tr", null, h("td", null, "Valor"))))));
  assert.match(html, /ui-table-container/);
  assert.match(html, /<table[^>]*><tbody><tr><td>Valor<\/td><\/tr><\/tbody><\/table>/);
});
