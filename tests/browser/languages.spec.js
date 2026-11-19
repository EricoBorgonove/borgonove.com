import { test, expect } from "@playwright/test";

const pages = [
  ["/disciplinas/algoritmos/linguagem-natural", "Algoritmos em Linguagem Natural", "Algorithms in Natural Language"],
  ["/disciplinas/postgresql/material-apoio", "PostgreSQL: Material de apoio", "PostgreSQL: Reference Materials"],
  ["/disciplinas/esbmc/tabelas-comandos", "Tabelas de comandos", "Command reference tables"],
  ["/disciplinas/python/estacionamento", "Sistema de Estacionamento", "Parking Management System"],
  ["/disciplinas/python-pandas/prova", "Prova Final de Pandas", "Pandas Final Exam"],
  ["/laboratorio-ui", "Laboratório de componentes", "Components Laboratory"],
];

for (const language of ["pt", "en"]) {
  test(`telas antes monolíngues carregam em ${language}`, async ({ page }) => {
    await page.addInitScript((locale) => {
      localStorage.setItem("site-language", locale);
      localStorage.setItem("borgonove_cookie_consent", "accepted");
      sessionStorage.setItem("pandasExamAccess", "true");
      sessionStorage.setItem("pandasExamStudentName", "Estudante de teste");
    }, language);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const [route, pt, en] of pages) {
      await page.goto(route);
      await expect(page.locator('main[aria-busy="false"]')).toBeVisible({ timeout: 15000 });
      await expect(page.locator("main h1")).toHaveText(language === "pt" ? pt : en);
      await expect(page.locator("html")).toHaveAttribute("lang", language === "pt" ? "pt-BR" : "en");
    }
    expect(errors).toEqual([]);
  });
}

test("trocar idioma preserva o nome digitado e o estado do formulário", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "pt");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/laboratorio-ui/formulario");
  await page.locator('input[name="name"]').fill("Copiar");
  await page.locator('main form button[type="submit"]').click();
  await expect(page.getByText("Olá, Copiar! O formulário foi validado com sucesso.", { exact: true })).toBeVisible();
  await page.locator("select[aria-label]").first().selectOption("en");
  await expect(page.locator('main[aria-busy="false"]')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('input[name="name"]')).toHaveValue("Copiar");
  await expect(page.getByText("Hello, Copiar! The form was validated successfully.", { exact: true })).toBeVisible();
});

test("exemplos SQL permanecem idênticos e a busca usa as descrições no idioma escolhido", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "pt");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/disciplinas/postgresql/material-apoio/tipos-de-dados");
  const original = await page.locator("main code").allTextContents();
  await page.locator("select[aria-label]").first().selectOption("en");
  await expect(page.locator('main[aria-busy="false"]')).toBeVisible({ timeout: 15000 });
  expect(await page.locator("main code").allTextContents()).toEqual(original);
  await page.locator("#busca-tabela-postgresql").fill("rounding");
  await expect(page.locator("tbody tr").first()).toBeVisible();
  await expect(page.locator("main")).toContainText("rounding");
});

test("português dispensa o catálogo inglês e falha de carregamento oferece recuperação", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "pt");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  const requests = [];
  page.on("request", (request) => {
    if (request.url().includes("/locales/en/content")) requests.push(request.url());
  });
  await page.goto("/disciplinas/python");
  await expect(page.locator("main h1")).toBeVisible();
  expect(requests).toEqual([]);
  await page.route("**/src/locales/en/content.json*", (route) => route.abort());
  await page.locator("select[aria-label]").first().selectOption("en");
  await expect(page.getByText("Could not load the English content.", { exact: true })).toBeVisible();
  await page.unroute("**/src/locales/en/content.json*");
  await Promise.all([
    page.waitForEvent("load"),
    page.getByRole("button", { name: "Reload page", exact: true }).click(),
  ]);
  await page.locator("select[aria-label]").first().selectOption("en");
  await expect(page.locator('main[aria-busy="false"]')).toBeVisible({ timeout: 15000 });
  await expect(page.locator("main")).toContainText("Back to Subjects");
});

test("diagramas HTTP seguem o idioma e mantêm os métodos e códigos técnicos", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "pt");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/disciplinas/protocolo-http");
  const cycle = page.getByRole("img", { name: /ciclo de requisição|request and response cycle/ });
  const pt = await cycle.evaluate(async (image) => (await fetch(image.src)).text());
  expect(pt).toContain("REQUISIÇÃO HTTP");
  expect(pt).toContain("GET / POST / PUT / PATCH / DELETE");
  await page.locator("select[aria-label]").first().selectOption("en");
  await expect(page.locator('main[aria-busy="false"]')).toBeVisible({ timeout: 15000 });
  await expect(cycle).toHaveAttribute("alt", "HTTP request and response cycle diagram");
  const en = await cycle.evaluate(async (image) => (await fetch(image.src)).text());
  expect(en).toContain("HTTP REQUEST");
  expect(en).toContain("GET / POST / PUT / PATCH / DELETE");
});

test("404 do servidor respeita o idioma escolhido antes do idioma do navegador", async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("site-language")) localStorage.setItem("site-language", "pt");
  });
  await page.goto("/404.shtml");
  await expect(page.locator("h1")).toHaveText("Página não encontrada");
  await page.evaluate(() => localStorage.setItem("site-language", "en"));
  await page.reload();
  await expect(page.locator("h1")).toHaveText("Page not found");
});

test("mensagem de erro já exibida muda de inglês para português", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "en");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/utilidades/busca-cep");
  await expect(page.locator('main[aria-busy="false"]')).toBeVisible({ timeout: 15000 });
  await page.locator('main form button[type="submit"]').click();
  await expect(page.getByText("Enter a valid ZIP code with 8 digits.", { exact: true })).toBeVisible();
  await page.locator("select[aria-label]").first().selectOption("pt");
  await expect(page.getByText("Informe um CEP válido com 8 dígitos.", { exact: true })).toBeVisible();
});

test("conteúdo inglês mantém o layout no celular", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "en");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/disciplinas/afd", "/disciplinas/esbmc", "/disciplinas/postgresql/bancos-temporais", "/disciplinas/python-pandas", "/disciplinas/python-pandas/seaborn", "/disciplinas/python/estacionamento", "/laboratorio-ui"]) {
    await page.goto(route);
    await expect(page.locator('main[aria-busy="false"]')).toBeVisible({ timeout: 15000 });
    const clipped = await page.evaluate(() => [...document.querySelectorAll("main h1,main h2,main h3,main p,main button,main label,main input,main a,main article")].filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width && rect.height && (rect.right > innerWidth + 3 || rect.left < -3) && !element.closest('pre,.ui-table-container,[class~="overflow-x-auto"],[class~="overflow-x-scroll"]');
    }).map((element) => element.textContent.slice(0, 80)));
    expect(clipped, route).toEqual([]);
  }
});

test("resultados de regex preservam o texto pesquisado e seus grupos", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "en");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.goto("/utilidades/testador-regex");
  await expect(page.locator('main[aria-busy="false"]')).toBeVisible({ timeout: 15000 });
  await page.locator('main input[type="text"]').nth(1).fill("(.+)");
  await page.locator("main textarea").fill("Copiar");
  const result = page.locator("main article").last();
  await expect(result.locator("span.text-cyan-200")).toHaveText("Copiar");
  await expect(result).toContainText("Groups: Copiar");
});

test("nomes de equipes do painel não são traduzidos", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "en");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.route("**/api/admin/session.php", (route) => route.fulfill({ json: { ok: true, authenticated: true, user: { username: "teste" } } }));
  await page.goto("/admin/techplay/disciplinas/arquitetura-software");
  await page.locator("#equipes-sorteio").fill("Copiar");
  await page.getByRole("button", { name: "Draw teams into topics", exact: true }).click();
  await expect(page.getByText("Team: Copiar", { exact: true })).toBeVisible();
});

test("conteúdo editorial usa exatamente o campo inglês cadastrado", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "en");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.route("**/api/blog/posts.php?slug=*", (route) => route.fulfill({ json: { ok: true, post: { id: 1, slug: "teste", title_pt: "Post de teste", title_en: "Test post", excerpt_pt: "", excerpt_en: "", content_pt: "Outro conteúdo", content_en: "Copiar\n\nNome" } } }));
  await page.goto("/blog/teste");
  await expect(page.getByRole("heading", { name: "Test post", exact: true })).toBeVisible();
  await expect(page.getByText("Copiar", { exact: true })).toBeVisible();
  await expect(page.getByText("Nome", { exact: true })).toBeVisible();
});

test("busca de comandos considera a descrição em inglês", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "en");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.goto("/disciplinas/postgresql/o-que-e-postgresql");
  await expect(page.locator('main[aria-busy="false"]')).toBeVisible({ timeout: 15000 });
  await page.locator("#busca-comandos-postgresql").fill("connected");
  await expect(page.getByText(/^1\/9/)).toBeVisible();
  await expect(page.getByText("No commands found", { exact: true })).not.toBeVisible();
});

test("histórico do IMC acompanha o idioma sem recalcular nem perder os valores", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "en");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/utilidades/imc");
  await page.getByRole("button", { name: "Calculate", exact: true }).click();
  await expect(page.locator("tbody tr")).toContainText("Normal weight");
  await expect(page.locator("tbody tr")).toContainText("18.5 to 24.99");
  await page.locator("select[aria-label]").first().selectOption("pt");
  await expect(page.locator("tbody tr")).toContainText("Peso normal");
  await expect(page.locator("tbody tr")).toContainText("18.5 a 24.99");
  await expect(page.locator("tbody tr")).toHaveCount(1);
});
