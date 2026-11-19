import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel, Select } from "../components/ui/Patterns";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

const firstNames = [
  "Ana",
  "Bruno",
  "Carlos",
  "Daniela",
  "Erica",
  "Felipe",
  "Giovana",
  "Henrique",
  "Isabela",
  "João",
  "Karen",
  "Lucas",
  "Marina",
  "Nicolas",
  "Olivia",
  "Paulo",
  "Rafaela",
  "Sergio",
  "Tatiane",
  "Victor",
];

const lastNames = [
  "Silva",
  "Souza",
  "Oliveira",
  "Santos",
  "Lima",
  "Costa",
  "Pereira",
  "Rodrigues",
  "Almeida",
  "Araujo",
];

const cities = [
  "Manaus",
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Porto Alegre",
  "Fortaleza",
  "Recife",
  "Salvador",
  "Brasília",
];

const statesUf = ["AM", "SP", "RJ", "MG", "PR", "RS", "CE", "PE", "BA", "DF"];
const countries = ["Brasil", "Portugal", "Argentina", "Chile", "Uruguai", "Mexico"];
const streets = ["Rua das Flores", "Av. Central", "Rua Amazonas", "Rua das Acácias", "Av. Brasil", "Rua A", "Rua B", "Travessa 10"];
const shortTexts = ["ativo", "pendente", "cancelado", "aprovado", "rejeitado", "em análise"];
const longTexts = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Projeto em fase de levantamento e definição de requisitos.",
  "Registro gerado automaticamente para testes de integração.",
  "Dados simulados para validação de front-end e API.",
];

function randomInt(min, max) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  if (maxInt <= minInt) return minInt;

  const range = maxInt - minInt + 1;
  if (globalThis.crypto?.getRandomValues) {
    const maxUint32 = 0xffffffff;
    const maxCryptoRange = maxUint32 + 1;

    // getRandomValues em Uint32 só cobre até 2^32 valores.
    // Para ranges maiores (ex.: timestamps), cai para Math.random para evitar loop infinito.
    if (range <= maxCryptoRange) {
      const limit = maxUint32 - (maxCryptoRange % range);
      const buffer = new Uint32Array(1);
      let value = 0;
      do {
        globalThis.crypto.getRandomValues(buffer);
        value = buffer[0];
      } while (value > limit);
      return minInt + (value % range);
    }
  }

  return Math.floor(Math.random() * range) + minInt;
}

function pickRandom(array) {
  return array[randomInt(0, array.length - 1)];
}

function randomName() {
  return `${pickRandom(firstNames)} ${pickRandom(lastNames)}`;
}

function randomFirstName() {
  return pickRandom(firstNames);
}

function randomLastName() {
  return pickRandom(lastNames);
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function randomEmail(name, id) {
  const base = normalizeText(name).replace(/_+/g, ".");
  return `${base || "usuario"}.${id}@exemplo.com`;
}

function randomUsername(name, id) {
  const base = normalizeText(name).replace(/_+/g, "");
  return `user_${base || "anon"}_${id}`;
}

function randomStrongPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*";
  let password = "";
  for (let i = 0; i < 12; i += 1) {
    password += chars[randomInt(0, chars.length - 1)];
  }
  return password;
}

function generateCpf() {
  const n = [];
  for (let i = 0; i < 9; i += 1) n.push(randomInt(0, 9));

  let sum = 0;
  for (let i = 0; i < 9; i += 1) sum += n[i] * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  n.push(d1);

  sum = 0;
  for (let i = 0; i < 10; i += 1) sum += n[i] * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  n.push(d2);

  return `${n[0]}${n[1]}${n[2]}.${n[3]}${n[4]}${n[5]}.${n[6]}${n[7]}${n[8]}-${n[9]}${n[10]}`;
}

function generateCnpj() {
  const n = [];
  for (let i = 0; i < 12; i += 1) n.push(randomInt(0, 9));

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i += 1) sum += n[i] * w1[i];
  let r = sum % 11;
  const d1 = r < 2 ? 0 : 11 - r;
  n.push(d1);

  sum = 0;
  for (let i = 0; i < 13; i += 1) sum += n[i] * w2[i];
  r = sum % 11;
  const d2 = r < 2 ? 0 : 11 - r;
  n.push(d2);

  return `${n[0]}${n[1]}.${n[2]}${n[3]}${n[4]}.${n[5]}${n[6]}${n[7]}/${n[8]}${n[9]}${n[10]}${n[11]}-${n[12]}${n[13]}`;
}

function randomDateIso() {
  const start = new Date("2023-01-01T00:00:00Z").getTime();
  return new Date(randomInt(start, Date.now())).toISOString();
}

function randomDateOnly() {
  return randomDateIso().slice(0, 10);
}

function randomTimeOnly() {
  const hh = String(randomInt(0, 23)).padStart(2, "0");
  const mm = String(randomInt(0, 59)).padStart(2, "0");
  const ss = String(randomInt(0, 59)).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function randomMoneyBr() {
  const inteiro = randomInt(10, 9999);
  const centavos = String(randomInt(0, 99)).padStart(2, "0");
  return `R$ ${inteiro.toLocaleString("pt-BR")},${centavos}`;
}

function randomDomain() {
  return `${normalizeText(randomLastName()) || "site"}${randomInt(1, 999)}.com`;
}

function randomUrl() {
  return `https://www.${randomDomain()}`;
}

function randomIpv4() {
  return `${randomInt(1, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;
}

function randomUuidV4() {
  const hex = "0123456789abcdef";
  const build = (size) => {
    let str = "";
    for (let i = 0; i < size; i += 1) str += hex[randomInt(0, hex.length - 1)];
    return str;
  };
  return `${build(8)}-${build(4)}-4${build(3)}-${["8", "9", "a", "b"][randomInt(0, 3)]}${build(3)}-${build(12)}`;
}

function randomHexColor() {
  const hex = "0123456789ABCDEF";
  let value = "#";
  for (let i = 0; i < 6; i += 1) value += hex[randomInt(0, hex.length - 1)];
  return value;
}

const DATA_TYPES = [
  { id: "id_seq", label: "ID sequencial", defaultField: "id", valueType: "number", generate: ({ rowIndex }) => rowIndex + 1 },
  { id: "uuid", label: "UUID", defaultField: "uuid", valueType: "string", generate: () => randomUuidV4() },
  { id: "nome_completo", label: "Nome completo", defaultField: "nome", valueType: "string", generate: () => randomName() },
  { id: "primeiro_nome", label: "Primeiro nome", defaultField: "primeiro_nome", valueType: "string", generate: () => randomFirstName() },
  { id: "sobrenome", label: "Sobrenome", defaultField: "sobrenome", valueType: "string", generate: () => randomLastName() },
  { id: "email", label: "Email", defaultField: "email", valueType: "string", generate: ({ rowIndex }) => randomEmail(randomName(), rowIndex + 1) },
  { id: "username", label: "Username", defaultField: "username", valueType: "string", generate: ({ rowIndex }) => randomUsername(randomName(), rowIndex + 1) },
  { id: "senha_forte", label: "Senha forte", defaultField: "senha", valueType: "string", generate: () => randomStrongPassword() },
  { id: "cpf", label: "CPF válido", defaultField: "cpf", valueType: "string", generate: () => generateCpf() },
  { id: "cnpj", label: "CNPJ válido", defaultField: "cnpj", valueType: "string", generate: () => generateCnpj() },
  { id: "telefone", label: "Telefone BR", defaultField: "telefone", valueType: "string", generate: () => `(${randomInt(11, 99)}) ${randomInt(1000, 9999)}-${randomInt(1000, 9999)}` },
  { id: "celular", label: "Celular BR", defaultField: "celular", valueType: "string", generate: () => `(${randomInt(11, 99)}) 9${randomInt(1000, 9999)}-${randomInt(1000, 9999)}` },
  { id: "cep", label: "CEP", defaultField: "cep", valueType: "string", generate: () => `${randomInt(10000, 99999)}-${randomInt(100, 999)}` },
  { id: "cidade", label: "Cidade", defaultField: "cidade", valueType: "string", generate: () => pickRandom(cities) },
  { id: "estado_uf", label: "Estado (UF)", defaultField: "uf", valueType: "string", generate: () => pickRandom(statesUf) },
  { id: "pais", label: "País", defaultField: "pais", valueType: "string", generate: () => pickRandom(countries) },
  { id: "endereco", label: "Endereço", defaultField: "endereco", valueType: "string", generate: () => `${pickRandom(streets)}, ${randomInt(1, 9999)}` },
  { id: "numero_inteiro", label: "Número inteiro", defaultField: "numero", valueType: "number", generate: () => randomInt(1, 100000) },
  { id: "numero_decimal", label: "Número decimal", defaultField: "valor_decimal", valueType: "number", generate: () => Number((Math.random() * 10000).toFixed(2)) },
  { id: "booleano", label: "Booleano", defaultField: "ativo", valueType: "boolean", generate: () => randomInt(0, 1) === 1 },
  { id: "data_iso", label: "Data ISO", defaultField: "data_iso", valueType: "string", generate: () => randomDateOnly() },
  { id: "hora_hms", label: "Hora HH:mm:ss", defaultField: "hora", valueType: "string", generate: () => randomTimeOnly() },
  { id: "datetime_iso", label: "DateTime ISO", defaultField: "created_at", valueType: "string", generate: () => randomDateIso() },
  { id: "url", label: "URL", defaultField: "url", valueType: "string", generate: () => randomUrl() },
  { id: "dominio", label: "Domínio", defaultField: "dominio", valueType: "string", generate: () => randomDomain() },
  { id: "ipv4", label: "IPv4", defaultField: "ip", valueType: "string", generate: () => randomIpv4() },
  { id: "moeda_br", label: "Moeda BR", defaultField: "preco", valueType: "string", generate: () => randomMoneyBr() },
  { id: "texto_curto", label: "Texto curto", defaultField: "status", valueType: "string", generate: () => pickRandom(shortTexts) },
  { id: "texto_longo", label: "Texto longo", defaultField: "descricao", valueType: "string", generate: () => pickRandom(longTexts) },
  { id: "cor_hex", label: "Cor HEX", defaultField: "cor", valueType: "string", generate: () => randomHexColor() },
];

const TYPE_LABELS_EN = {
  id_seq: "Sequential ID",
  uuid: "UUID",
  nome_completo: "Full name",
  primeiro_nome: "First name",
  sobrenome: "Last name",
  email: "Email",
  username: "Username",
  senha_forte: "Strong password",
  cpf: "Valid CPF",
  cnpj: "Valid CNPJ",
  telefone: "BR phone",
  celular: "BR mobile",
  cep: "ZIP code",
  cidade: "City",
  estado_uf: "State (UF)",
  pais: "Country",
  endereco: "Address",
  numero_inteiro: "Integer number",
  numero_decimal: "Decimal number",
  booleano: "Boolean",
  data_iso: "ISO date",
  hora_hms: "Time HH:mm:ss",
  datetime_iso: "ISO datetime",
  url: "URL",
  dominio: "Domain",
  ipv4: "IPv4",
  moeda_br: "BR currency",
  texto_curto: "Short text",
  texto_longo: "Long text",
  cor_hex: "HEX color",
};

const MANUAL_FIELD_MIN = 1;
const MANUAL_FIELD_MAX = 30;
const MAX_ROWS = 500;
const PREVIEW_ROWS = 80;
const GENERATION_CHUNK = 40;

function createManualField() {
  return { name: "", typeId: "texto_curto" };
}

function sanitizeFieldName(value, fallback) {
  const sanitized = normalizeText(value).replace(/^\d+/, "");
  return sanitized || fallback;
}

function ensureUniqueFieldNames(fields) {
  const used = new Map();
  return fields.map((field) => {
    const keyBase = field.key;
    const count = used.get(keyBase) || 0;
    used.set(keyBase, count + 1);
    if (count === 0) return field;
    return { ...field, key: `${keyBase}_${count + 1}` };
  });
}

function sqlValue(value, typeDef) {
  if (value === null || value === undefined) return "NULL";
  if (typeDef.valueType === "number") return String(value);
  if (typeDef.valueType === "boolean") return value ? "TRUE" : "FALSE";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function buildSqlInsert(rows, columns, tableName) {
  if (rows.length === 0 || columns.length === 0) return "";

  const table = sanitizeFieldName(tableName.trim() || "tabela_mock", "tabela_mock");
  const columnsSql = columns.map((col) => col.key).join(", ");

  const values = rows
    .map((row) => {
      const vals = columns.map((col) => sqlValue(row[col.key], col.typeDef));
      return `(${vals.join(", ")})`;
    })
    .join(",\n");

  return `INSERT INTO ${table} (${columnsSql})\nVALUES\n${values};`;
}

function waitForNextTick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

export default function MockSqlJson() {
  const { text: uiText, message: uiMessage } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Mock SQL/JSON Generator",
        recordsAmount: "Number of records",
        tableName: "Table name",
        fieldSelectionMode: "Field selection mode",
        listMode: "List with 30 types",
        manualMode: "Manual fields",
        availableTypes: "Available types",
        selected: "Selected",
        fieldsAmount: "Number of fields",
        fieldNamePlaceholder: "Field name",
        validQuantity: "Enter a valid quantity",
        selectAtLeastOneType: "Select at least one data type from the list.",
        validManualFields: "Enter a valid quantity of manual fields.",
        fillManualNames: "Fill all manual field names.",
        generating: "Generating...",
        generateData: "Generate data",
        clear: "Clear",
        generatingRecords: "Generating records",
        copyFull: "Copy full",
        previewShowing: "Preview showing",
        of: "of",
        records: "records",
        generateToViewJson: "Generate data to preview JSON.",
        generateToViewSql: "Generate data to preview SQL.",
      }
    : {
        back: "Voltar para utilidades",
        title: "Gerador de SQL/JSON Mock",
        recordsAmount: "Quantidade de registros",
        tableName: "Nome da tabela",
        fieldSelectionMode: "Modo de seleção de campos",
        listMode: "Lista com 30 tipos",
        manualMode: "Campos manuais",
        availableTypes: "Tipos disponíveis",
        selected: "Selecionados",
        fieldsAmount: "Quantidade de campos",
        fieldNamePlaceholder: "Nome do campo",
        validQuantity: "Informe uma quantidade válida",
        selectAtLeastOneType: "Selecione pelo menos um tipo de dado da lista.",
        validManualFields: "Informe uma quantidade válida de campos manuais.",
        fillManualNames: "Preencha o nome de todos os campos manuais.",
        generating: "Gerando...",
        generateData: "Gerar dados",
        clear: "Limpar",
        generatingRecords: "Gerando registros",
        copyFull: "Copiar completo",
        previewShowing: "Preview exibindo",
        of: "de",
        records: "registros",
        generateToViewJson: "Gere dados para visualizar o JSON.",
        generateToViewSql: "Gere dados para visualizar o SQL.",
      };

  const getTypeLabel = (typeDef) => {
    if (!isEn) return typeDef.label;
    return TYPE_LABELS_EN[typeDef.id] || typeDef.label;
  };

  const [quantidade, setQuantidade] = useState("");
  const [tableName, setTableName] = useState("");
  const [modoCampos, setModoCampos] = useState("lista");
  const [selectedTypeIds, setSelectedTypeIds] = useState(["id_seq", "nome_completo", "email", "datetime_iso"]);
  const [manualCount, setManualCount] = useState("3");
  const [manualFields, setManualFields] = useState([createManualField(), createManualField(), createManualField()]);
  const [erro, setErro] = useState("");
  const [data, setData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (modoCampos !== "manual") return;

    const parsed = Number(manualCount);
    if (!Number.isInteger(parsed)) return;

    const target = Math.max(MANUAL_FIELD_MIN, Math.min(MANUAL_FIELD_MAX, parsed));
    setManualFields((prev) => {
      if (prev.length === target) return prev;
      if (prev.length > target) return prev.slice(0, target);
      return [...prev, ...Array.from({ length: target - prev.length }, () => createManualField())];
    });
  }, [manualCount, modoCampos]);

  const previewData = useMemo(() => data.slice(0, PREVIEW_ROWS), [data]);
  const jsonOutput = useMemo(() => JSON.stringify(previewData, null, 2), [previewData]);
  const sqlOutput = useMemo(() => buildSqlInsert(previewData, columnDefs, tableName), [columnDefs, previewData, tableName]);

  function toggleType(typeId) {
    setSelectedTypeIds((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      }
      return [...prev, typeId];
    });
  }

  function updateManualField(index, patch) {
    setManualFields((prev) => prev.map((field, i) => (i === index ? { ...field, ...patch } : field)));
  }

  function getColumnsFromListMode() {
    const defs = selectedTypeIds
      .map((typeId) => DATA_TYPES.find((item) => item.id === typeId))
      .filter(Boolean)
      .map((typeDef) => ({
        key: sanitizeFieldName(typeDef.defaultField, "campo"),
        label: getTypeLabel(typeDef),
        typeDef,
      }));

    return ensureUniqueFieldNames(defs);
  }

  function getColumnsFromManualMode() {
    const defs = manualFields.map((field, index) => {
      const typeDef = DATA_TYPES.find((item) => item.id === field.typeId) || DATA_TYPES[0];
      return {
        key: sanitizeFieldName(field.name, `campo_${index + 1}`),
        label: field.name || `${isEn ? "Field" : "Campo"} ${index + 1}`,
        typeDef,
      };
    });

    return ensureUniqueFieldNames(defs);
  }

  async function gerarDados() {
    if (isGenerating) return;

    const parsedQtd = Number(quantidade);
    if (!Number.isInteger(parsedQtd) || parsedQtd <= 0) {
      setErro(`${txt.validQuantity} (1 a ${MAX_ROWS}).`);
      return;
    }

    const qtd = Math.max(1, Math.min(MAX_ROWS, parsedQtd));
    let columns = [];

    if (modoCampos === "lista") {
      columns = getColumnsFromListMode();
      if (columns.length === 0) {
        setErro(txt.selectAtLeastOneType);
        return;
      }
    } else {
      const parsedManualCount = Number(manualCount);
      if (!Number.isInteger(parsedManualCount) || parsedManualCount < MANUAL_FIELD_MIN) {
        setErro(txt.validManualFields);
        return;
      }

      const camposSemNome = manualFields.some((field) => !field.name.trim());
      if (camposSemNome) {
        setErro(txt.fillManualNames);
        return;
      }

      columns = getColumnsFromManualMode();
    }

    setErro("");
    setIsGenerating(true);
    setProgress(0);

    try {
      const rows = [];
      for (let start = 0; start < qtd; start += GENERATION_CHUNK) {
        const end = Math.min(start + GENERATION_CHUNK, qtd);
        for (let rowIndex = start; rowIndex < end; rowIndex += 1) {
          const row = {};
          columns.forEach((col) => {
            row[col.key] = col.typeDef.generate({ rowIndex, row });
          });
          rows.push(row);
        }
        setProgress(Math.round((rows.length / qtd) * 100));
        await waitForNextTick();
      }

      setColumnDefs(columns);
      setData(rows);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  }

  function limparTudo() {
    setData([]);
    setColumnDefs([]);
    setErro("");
    setProgress(0);
  }

  async function copyText(content) {
    if (!content) return;
    await navigator.clipboard.writeText(content);
  }

  async function copyFullJson() {
    if (data.length === 0) return;
    await copyText(JSON.stringify(data, null, 2));
  }

  async function copyFullSql() {
    if (data.length === 0) return;
    await copyText(buildSqlInsert(data, columnDefs, tableName));
  }

  return (
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{uiText(txt.back)}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 3h16a2 2 0 0 1 2 2v4H2V5a2 2 0 0 1 2-2Zm-2 8h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8Zm4 2a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6Zm0 4a1 1 0 0 0 0 2h7a1 1 0 1 0 0-2H6Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>

      <Panel as="div" layout="plain">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.recordsAmount)}</span>
            <Input
              type="number"
              min="1"
              max={MAX_ROWS}
              placeholder="10"
              value={quantidade}
              onChange={(event) => setQuantidade(event.target.value)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.tableName)}</span>
            <Input
              type="text"
              value={tableName}
              placeholder={uiText("tabela_mock")}
              onChange={(event) => setTableName(event.target.value)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        <div className="mt-6">
          <p className="text-sm text-slate-300 mb-2">{uiText(txt.fieldSelectionMode)}</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="custom"
              type="button"
              onClick={() => setModoCampos("lista")}
              className={`px-4 py-2 rounded-xl border transition ${
                modoCampos === "lista" ? "bg-cyan-500 text-slate-900 border-cyan-400" : "border-slate-700 text-slate-200 hover:border-cyan-400"
              }`}
            >
              {uiText(txt.listMode)}
            </Button>
            <Button variant="custom"
              type="button"
              onClick={() => setModoCampos("manual")}
              className={`px-4 py-2 rounded-xl border transition ${
                modoCampos === "manual" ? "bg-cyan-500 text-slate-900 border-cyan-400" : "border-slate-700 text-slate-200 hover:border-cyan-400"
              }`}
            >
              {uiText(txt.manualMode)}
            </Button>
          </div>
        </div>

        {modoCampos === "lista" ? (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-300">{uiText(txt.availableTypes)} ({uiText(DATA_TYPES.length)})</p>
              <p className="text-xs text-slate-400">{uiText(txt.selected)}: {uiText(selectedTypeIds.length)}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {DATA_TYPES.map((type) => (
                <label key={type.id} className="inline-flex items-center gap-2 text-sm text-slate-300 bg-slate-900/40 border border-slate-700 rounded-lg px-3 py-2">
                  <Input
                    type="checkbox"
                    checked={selectedTypeIds.includes(type.id)}
                    onChange={() => toggleType(type.id)}
                    className="h-4 w-4 accent-cyan-400"
                  />
                  {uiText(getTypeLabel(type))}
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <label className="block max-w-xs">
              <span className="block text-sm text-slate-300 mb-2">{uiText(txt.fieldsAmount)}</span>
              <Input
                type="number"
                min={MANUAL_FIELD_MIN}
                max={MANUAL_FIELD_MAX}
                value={manualCount}
                onChange={(event) => setManualCount(event.target.value)}
                className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </label>

            <div className="mt-4 space-y-3">
              {manualFields.map((field, index) => (
                <div key={`manual-${index}`} className="grid md:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    value={field.name}
                    onChange={(event) => updateManualField(index, { name: event.target.value })}
                    placeholder={uiText("{{0}} {{1}}", [txt.fieldNamePlaceholder, index + 1])}
                    className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                  <Select
                    value={field.typeId}
                    onChange={(event) => updateManualField(index, { typeId: event.target.value })}
                    className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    {DATA_TYPES.map((type) => (
                      <option key={`manual-type-${type.id}`} value={type.id}>
                        {uiText(getTypeLabel(type))}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="primary"
            type="button"
            onClick={gerarDados}
            disabled={isGenerating}
            className="text-slate-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {uiText(isGenerating ? txt.generating : txt.generateData)}
          </Button>
          <Button variant="secondary"
            type="button"
            onClick={limparTudo}
            disabled={isGenerating}
            className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {uiText(txt.clear)}
          </Button>
        </div>

        {isGenerating && (
          <div className="mt-4">
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-cyan-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-slate-300 mt-2">{uiText(txt.generatingRecords)}: {uiText(progress)}%</p>
          </div>
        )}

        {erro && <p className="text-red-400 text-sm mt-4">{uiMessage(erro)}</p>}
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <Panel as="article" layout="plain">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">{uiText("JSON")}</h2>
            <Button variant="secondary"
              type="button"
              disabled={data.length === 0}
              onClick={copyFullJson}
              className="border border-slate-700 hover:border-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uiText(txt.copyFull)}
            </Button>
          </div>
          {data.length > 0 ? (
            <>
              <p className="text-xs text-slate-400 mb-2">
                {uiText(txt.previewShowing)} {uiText(Math.min(PREVIEW_ROWS, data.length))} {uiText(txt.of)} {uiText(data.length)} {uiText(txt.records)}.
              </p>
              <pre className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-xs text-slate-200 overflow-auto max-h-[420px]">{jsonOutput}</pre>
            </>
          ) : (
            <p className="text-slate-400 text-sm">{uiText(txt.generateToViewJson)}</p>
          )}
        </Panel>

        <Panel as="article" layout="plain">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">{uiText("SQL")}</h2>
            <Button variant="secondary"
              type="button"
              disabled={data.length === 0}
              onClick={copyFullSql}
              className="border border-slate-700 hover:border-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uiText(txt.copyFull)}
            </Button>
          </div>
          {data.length > 0 ? (
            <>
              <p className="text-xs text-slate-400 mb-2">
                {uiText(txt.previewShowing)} {uiText(Math.min(PREVIEW_ROWS, data.length))} {uiText(txt.of)} {uiText(data.length)} {uiText(txt.records)}.
              </p>
              <pre className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-xs text-slate-200 overflow-auto max-h-[420px]">{sqlOutput}</pre>
            </>
          ) : (
            <p className="text-slate-400 text-sm">{uiText(txt.generateToViewSql)}</p>
          )}
        </Panel>
      </div>
    </PageTemplate>
  );
}
