const replacements = [
  ["Lista", "List"],
  ["Fundamentos", "Fundamentals"],
  ["Tipos e Conversões", "Types and Conversions"],
  ["Matemática Aplicada", "Applied Mathematics"],
  ["Entrada, Validação e Mensagens", "Input, Validation and Messages"],
  ["Condicionais", "Conditionals"],
  ["Sistema de", "System for"],
  ["Plataforma de", "Platform for"],
  ["Gestão de", "Management of"],
  ["Rede de", "Network of"],
  ["Clínica de", "Clinic for"],
  ["Desenvolva", "Develop"],
  ["Construa", "Build"],
  ["Estruture", "Structure"],
  ["Modele", "Model"],
  ["Leia", "Read"],
  ["Imprima", "Print"],
  ["calcule", "calculate"],
  ["converta", "convert"],
  ["informe", "inform"],
  ["verifique", "check"],
  ["faça", "do"],
  ["utilize", "use"],
  ["crie", "create"],
  ["números", "numbers"],
  ["número", "number"],
  ["texto", "text"],
  ["palavras", "words"],
  ["palavra", "word"],
  ["nome", "name"],
  ["idade", "age"],
  ["média", "average"],
  ["soma", "sum"],
  ["subtração", "subtraction"],
  ["multiplicação", "multiplication"],
  ["divisão", "division"],
  ["resto", "remainder"],
  ["área", "area"],
  ["perímetro", "perimeter"],
  ["temperatura", "temperature"],
  ["salário", "salary"],
  ["desconto", "discount"],
  ["juros", "interest"],
  ["valor", "value"],
  ["preço", "price"],
  ["data", "date"],
  ["maior", "greater"],
  ["menor", "smaller"],
  ["ímpar", "odd"],
  ["positivo", "positive"],
  ["negativo", "negative"],
  ["inteiro", "integer"],
  ["decimal", "decimal"],
  ["questões", "questions"],
  ["questão", "question"],
  ["entidades", "entities"],
  ["entidade", "entity"],
  ["relacionamentos", "relationships"],
  ["relacionamento", "relationship"],
  ["regras", "rules"],
  ["regra", "rule"],
  ["paciente", "patient"],
  ["usuário", "user"],
  ["cliente", "client"],
  ["aluno", "student"],
  ["professor", "teacher"],
  ["curso", "course"],
  ["projeto", "project"],
  ["empresa", "company"],
  ["produto", "product"],
  ["pedido", "order"],
  ["contrato", "contract"],
  ["venda", "sale"],
  ["pagamento", "payment"],
  ["endereço", "address"],
  ["cidade", "city"],
  ["estado", "state"],
  ["país", "country"],
];

const cache = new Map();

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceToken(text, from, to) {
  const escaped = escapeRegex(from);

  if (from.includes(" ")) {
    return text.replace(new RegExp(escaped, "gi"), to);
  }

  const boundaryRegex = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu");
  return text.replace(boundaryRegex, to);
}

const sortedReplacements = [...replacements].sort((a, b) => b[0].length - a[0].length);

export function translatePtToEn(text) {
  if (!text) return "";
  if (cache.has(text)) return cache.get(text);

  let output = String(text);

  for (const [from, to] of sortedReplacements) {
    output = replaceToken(output, from, to);
  }

  output = output
    .replace(/\s+,/g, ",")
    .replace(/\s+\./g, ".")
    .replace(/\s{2,}/g, " ")
    .trim();

  cache.set(text, output);
  return output;
}

export function translatePtToEnWithMap(text, map) {
  if (!text) return "";
  if (map && Object.prototype.hasOwnProperty.call(map, text)) {
    return map[text];
  }
  return translatePtToEn(text);
}
