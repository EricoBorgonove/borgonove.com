import { test, expect } from "@playwright/test";

for (const language of ["pt", "en"]) {
  test(`banco discursivo: navegação, exemplos e busca em ${language}`, async ({ page }) => {
    await page.addInitScript((locale) => {
      localStorage.setItem("site-language", locale);
      localStorage.setItem("borgonove_cookie_consent", "accepted");
    }, language);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/disciplinas/algoritmos");
    await page.getByRole("link", { name: /600/ }).click();
    await expect(page).toHaveURL(/programacao-discursiva$/);
    await expect(page.locator("main h1")).toHaveText(language === "pt" ? "Banco de questões discursivas de programação" : "Programming Written Exercise Bank");
    await expect(page.getByRole("navigation", { name: language === "pt" ? "Blocos de exercícios" : "Exercise blocks" }).getByRole("link")).toHaveCount(12);
    await page.getByRole("navigation", { name: language === "pt" ? "Blocos de exercícios" : "Exercise blocks" }).getByRole("link").first().click();
    await expect(page.locator("#questao-001")).toContainText("Careiro");
    await page.getByRole("searchbox").fill("252");
    await expect(page.locator("#questao-252 table tbody tr")).toHaveCount(4);
    await expect(page.locator("#questao-252 table")).toContainText("Luan");
    await page.getByRole("searchbox").fill("600");
    await expect(page.locator("#questao-600")).toBeVisible();
    await page.getByRole("searchbox").fill(language === "pt" ? "mosaico" : "mosaic");
    await expect(page.locator("article")).toHaveCount(12);
    await expect(page.locator("#questao-600")).toBeVisible();
    await page.getByRole("searchbox").fill("xyz-inexistente-0123");
    await expect(page.getByRole("status")).toContainText(language === "pt" ? "Nenhuma questão" : "No questions");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
