import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";

const correctedPages = [
  "/disciplinas/python-pandas", "/disciplinas/python-pandas/exercicios-base",
  "/disciplinas/python-pandas/seaborn", "/disciplinas/postgresql/bancos-temporais",
  "/disciplinas/esbmc", "/disciplinas/esbmc/instalacao", "/disciplinas/protocolo-http",
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("site-language", "pt");
    localStorage.setItem("borgonove_cookie_consent", "accepted");
  });
});

for (const theme of ["dark", "light"]) {
  for (const width of [320, 390, 1440]) {
    test(`conteúdo cabe na tela e possui um main — ${theme}, ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.addInitScript((value) => localStorage.setItem("site-theme", value), theme);
      for (const route of correctedPages) {
        await page.goto(route);
        await expect(page.locator(".ui-page")).toBeVisible();
        await expect(page.locator("main")).toHaveCount(1);
        await page.evaluate(() => document.fonts.ready);
        const clipped = await page.evaluate(() => [...document.querySelectorAll("main h1,main h2,main h3,main p,main button,main label,main input,main a,main article")].filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width && rect.height && (rect.right > innerWidth + 3 || rect.left < -3) &&
            !el.closest('pre,.ui-table-container,[class~="overflow-x-auto"],[class~="overflow-x-scroll"],[class~="md:overflow-x-auto"]');
        }).map((el) => el.textContent.slice(0, 80)));
        expect(clipped, route).toEqual([]);
      }
    });
  }
}

test("calculadora rejeita períodos fracionários e excessivos e mantém os cálculos válidos", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/utilidades/calculadora-juros");
  await page.getByLabel("Capital inicial (R$)").fill("1000");
  await page.getByLabel("Taxa por período (%)").fill("2");
  for (const value of ["0.5", "1.5", "1201", "1e9"]) {
    await page.getByLabel("Quantidade de períodos").fill(value);
    await expect(page.getByRole("heading", { name: "Calculadora de Juros" })).toBeVisible();
    await expect(page.getByText("Informe valores finitos e uma quantidade inteira de períodos entre 1 e 1200.")).toBeVisible();
  }
  await page.getByLabel("Quantidade de períodos").fill("12");
  await expect(page.locator("main")).toContainText("1268.24");
  await page.getByLabel("Tipo de juros").selectOption("simples");
  await expect(page.locator("main")).toContainText("1240.00");
  expect(errors).toEqual([]);
});

for (const theme of ["dark", "light"]) {
test(`modal cabe em 320px, recebe foco e restaura foco — ${theme}`, async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.addInitScript((value) => localStorage.setItem("site-theme", value), theme);
  await page.goto("/utilidades/testador-regex");
  const trigger = page.locator("main button[aria-label]").first();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "O que são as flags?" });
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.y + box.height).toBeLessThanOrEqual(568);
  await expect(dialog.getByRole("button", { name: "Fechar" })).toBeFocused();
  const accessibility = await new AxeBuilder({ page }).include("dialog").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.mouse.click(2, 2);
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
}

test("regiões roláveis e contraste passam na auditoria das seis telas apontadas", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => localStorage.setItem("site-theme", "dark"));
  for (const route of ["/disciplinas/docker", "/disciplinas/postgresql/bancos-temporais", "/disciplinas/protocolo-http", "/disciplinas/python-pandas/exercicios-base", "/disciplinas/python-pandas/seaborn", "/disciplinas/python-pandas"]) {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    const audit = await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(audit.violations, route).toEqual([]);
  }
});

test("regiões com rolagem têm foco e as regiões que cabem não adicionam tabulação", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/disciplinas/python-pandas/seaborn");
  await expect(page.locator('.ui-scroll-region[tabindex="0"]').first()).toBeAttached();
  await expect.poll(() => page.locator(".ui-scroll-region").evaluateAll((regions) => regions.filter((el) => {
    const overflowing = el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
    return overflowing ? el.tabIndex !== 0 : el.hasAttribute("tabindex");
  }).length)).toBe(0);
  const region = page.locator('.ui-scroll-region[tabindex="0"]').first();
  await region.focus();
  await expect(region).toBeFocused();
  expect(await region.getAttribute("aria-label")).toBeTruthy();
});

test("rotas públicas continuam renderizando sem erros de JavaScript", async ({ page }) => {
  const source = readFileSync(new URL("../../src/App.jsx", import.meta.url), "utf8");
  const routes = [...source.matchAll(/path="([^"]+)"/g)].map((match) => match[1]).filter((route) => !route.includes(":") && !route.includes("*") && !route.startsWith("/admin"));
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [...routes, "/contato", "/rota-inexistente"]) {
    await page.goto(route);
    await expect(page.locator("main h1"), route).toHaveCount(1);
    await expect(page.locator("main"), route).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test("nomes acessíveis das regiões acompanham a troca de idioma", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/disciplinas/python-pandas/seaborn");
  await page.locator("select[aria-label]").first().selectOption("en");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.ui-table-container[tabindex="0"]').first()).toHaveAttribute("aria-label", "Scrollable table");
  await expect(page.locator('pre.ui-scroll-region[tabindex="0"]').first()).toHaveAttribute("aria-label", /^Code /);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator("select[aria-label]").first().selectOption("pt");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.ui-table-container[tabindex="0"]').first()).toHaveAttribute("aria-label", "Tabela com rolagem");
  await expect(page.locator('pre.ui-scroll-region[tabindex="0"]').first()).toHaveAttribute("aria-label", /^Código /);
});
