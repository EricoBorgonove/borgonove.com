import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateInterest } from "../src/utils/calculateInterest.js";

const calculate = (overrides = {}) => {
  return calculateInterest({ capital: "1000", rate: "2", periods: "12", type: "compostos", ...overrides });
};
test("preserva os resultados de juros simples e compostos", () => {
  assert.equal(calculate().montanteFinal.toFixed(2), "1268.24");
  assert.equal(calculate({ type: "simples" }).montanteFinal.toFixed(2), "1240.00");
  assert.equal(calculate().linhas.length, 12);
});
test("rejeita períodos fracionários, vazios, negativos e grandes sem quebrar a tela", () => {
  for (const periods of ["0.5", "1.5", "", "0", "-1", "Infinity", "1201", "1e9", "abc"]) {
    assert.equal(calculate({ periods }), null, `Períodos: ${periods}`);
  }
});
test("aceita taxa zero e rejeita números não finitos e overflow", () => {
  assert.equal(calculate({ rate: "0" }).montanteFinal, 1000);
  assert.equal(calculate({ capital: "Infinity" }), null);
  assert.equal(calculate({ rate: "Infinity" }), null);
  assert.equal(calculate({ rate: "-1" }), null);
  assert.equal(calculate({ capital: "1e308", rate: "100", periods: "1200" }), null);
});
