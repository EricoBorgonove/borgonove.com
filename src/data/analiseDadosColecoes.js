import listaExercicios90Questoes from "./analise-dados-listas.json";
import listaAnaliseCredito from "./analise-credito-listas.json";

export const analiseDadosColecoes = [
  {
    slug: "lista-exercicios-90-questoes",
    title: "Dataset de alunos e notas",
    title_en: "Students and Grades Dataset",
    description:
      "Lista inicial com 90 exercícios cobrindo estatística descritiva, distribuição, rankings, risco acadêmico, correlação e visualização com pandas.",
    description_en:
      "Initial list with 90 exercises covering descriptive statistics, distributions, rankings, academic risk, correlation, and pandas-based visualization.",
    badge: "90 questões",
    badge_en: "90 questions",
    datasetExample: `{
  "aluno_1": {
    "nome": "Ana Silva",
    "turno": "Noite",
    "periodo": 3,
    "notas": [7.5, 8.2, 6.9]
  }
}`,
    datasetExample_en: `{
  "student_1": {
    "name": "Ana Silva",
    "shift": "Night",
    "term": 3,
    "grades": [7.5, 8.2, 6.9]
  }
}`,
    listas: listaExercicios90Questoes,
  },
  {
    slug: "dataset-analise-credito",
    title: "Dataset para análise de crédito",
    title_en: "Credit Analysis Dataset",
    description:
      "Lista com a mesma sequência de 90 exercícios para explorar estatística, rankings, risco, correlação e visualização em um contexto de análise de crédito.",
    description_en:
      "List with the same sequence of 90 exercises to explore statistics, rankings, risk, correlation, and visualization in a credit analysis context.",
    badge: "90 questões",
    badge_en: "90 questions",
    datasetExample: `clientes = {
  "cliente_1": {
    "nome": "Ana Silva",
    "idade": 32,
    "renda": 4500.0,
    "divida": 1200.0,
    "atrasos": 1
  }
}`,
    datasetExample_en: `clients = {
  "client_1": {
    "name": "Ana Silva",
    "age": 32,
    "income": 4500.0,
    "debt": 1200.0,
    "delays": 1
  }
}`,
    listas: listaAnaliseCredito,
  },
];

export function getAnaliseDadosCollection(slug) {
  return analiseDadosColecoes.find((item) => item.slug === slug) || null;
}
