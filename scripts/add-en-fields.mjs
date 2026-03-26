import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translatePtToEn } from '../src/utils/ptEnTranslate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const algoritmosPath = path.join(root, 'src/data/algoritmos-listas.json');
const modelagensPath = path.join(root, 'src/data/modelagens-listas.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function enrichAlgoritmos(listas) {
  return listas.map((lista) => ({
    ...lista,
    tipo_en: lista.tipo_en || translatePtToEn(lista.tipo),
    titulo_en: lista.titulo_en || translatePtToEn(lista.titulo),
    questoes: (lista.questoes || []).map((q) => ({
      ...q,
      texto_en: q.texto_en || translatePtToEn(q.texto),
    })),
  }));
}

function enrichModelagens(items) {
  return items.map((item) => ({
    ...item,
    titulo_en: item.titulo_en || translatePtToEn(item.titulo),
    descricao_en: item.descricao_en || translatePtToEn(item.descricao),
  }));
}

const algoritmos = readJson(algoritmosPath);
const modelagens = readJson(modelagensPath);

const algoritmosEnriched = enrichAlgoritmos(algoritmos);
const modelagensEnriched = enrichModelagens(modelagens);

writeJson(algoritmosPath, algoritmosEnriched);
writeJson(modelagensPath, modelagensEnriched);

console.log(`algoritmos atualizados: ${algoritmosEnriched.length} listas`);
console.log(`modelagens atualizadas: ${modelagensEnriched.length} itens`);
