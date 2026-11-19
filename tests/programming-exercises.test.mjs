import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("blocos e textos do banco possuem tradução inglesa, preservando identificadores", () => {
  const bank = JSON.parse(readFileSync(new URL("../src/data/programacao-discursiva.json", import.meta.url)));
  const catalog = JSON.parse(readFileSync(new URL("../src/locales/en/content.json", import.meta.url)));
  function check(value) {
    if (typeof value === "string" && /[a-zÀ-ÿ]/i.test(value)) assert.ok(catalog[value], value);
    else if (value && typeof value === "object") Object.values(value).forEach(check);
  }
  check(bank);
  for (const block of bank.blocks) assert.notEqual(catalog[block.title], block.title);
  for (const question of bank.blocks.flatMap((block) => block.questions)) {
    for (const match of question.input?.matchAll(/=\s*([^\.\n]+)(?=\.|$)/g) || []) {
      const value = match[1].trim();
      if (!/^[A-Za-zÀ-ÿ]/.test(value)) continue;
      assert.ok(catalog[question.input].includes(value), `Dado de entrada preservado: ${value}`);
      if (question.output.includes(value)) assert.ok(catalog[question.output].includes(value), `Dado de saída preservado: ${value}`);
    }
    if (question.output?.includes("Dentro")) assert.ok(catalog[question.output].includes("Within"));
    for (const paragraph of question.paragraphs) {
      const identifiers = [...paragraph.match(/\b[A-Z][a-z]+(?:[A-Z][a-zA-Z]*)+\b/g) || [], ...[...paragraph.matchAll(/(?:função|procedimento|Implemente|e) ([A-Z][a-zA-Z]+)\b/g)].map((match) => match[1])];
      for (const identifier of identifiers) {
        assert.ok(catalog[paragraph].includes(identifier), `Identificador preservado: ${identifier}`);
      }
    }
  }
});

test("banco discursivo contém os 12 blocos e as 600 questões completas e ordenadas", () => {
  const bank = JSON.parse(readFileSync(new URL("../src/data/programacao-discursiva.json", import.meta.url)));
  assert.equal(bank.blocks.length, 12);
  const questions = bank.blocks.flatMap((block) => {
    assert.equal(block.questions.length, 50);
    assert.ok(block.title && block.guidance);
    return block.questions;
  });
  assert.deepEqual(questions.map((question) => question.number), Array.from({ length: 600 }, (_, i) => i + 1));
  for (const question of questions) {
    assert.ok(question.title);
    assert.ok(question.paragraphs.length >= 2, `Contexto e enunciado da questão ${question.number}`);
    assert.ok((question.input && question.output) || question.example, `Exemplo da questão ${question.number}`);
  }
  assert.equal(questions[0].title, "O último barco da feira");
  assert.equal(questions.at(-1).title, "O mosaico da praça");
  assert.deepEqual(questions[251].table.rows[2], ["3", "Luan", "1", "Sim"]);
});
