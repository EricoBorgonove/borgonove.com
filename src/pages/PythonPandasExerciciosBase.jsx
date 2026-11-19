import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";
import { copy, localize, pick } from "../utils/pandasLocale";

const blocks = [
  {
    id: "series",
    title: copy("Bloco 1 — Series com Pandas", "Block 1 — Series with Pandas"),
    description: copy("Primeiros exercícios para entender Series, filtros, estatísticas e operações básicas.", "First exercises to understand Series, filters, statistics, and basic operations."),
    baseCode: `import pandas as pd
import numpy as np

vendas = pd.Series([150, 230, 90, 400, 320, 180, 600, 50, 700, 280])`,
    extraCode: `serie_grande = pd.Series(np.random.randint(1, 1001, 100))`,
    exercises: [
      copy("Exiba a Series completa.", "Display the full Series."),
      copy("Mostre apenas os 5 primeiros valores.", "Show only the first 5 values."),
      copy("Mostre apenas os 3 últimos valores.", "Show only the last 3 values."),
      copy("Calcule a soma total das vendas.", "Calculate the total sales sum."),
      copy("Calcule a média das vendas.", "Calculate the average sales value."),
      copy("Encontre o maior valor da Series.", "Find the highest value in the Series."),
      copy("Encontre o menor valor da Series.", "Find the lowest value in the Series."),
      copy("Mostre todos os valores maiores que 300.", "Show all values greater than 300."),
      copy("Mostre todos os valores menores ou iguais a 180.", "Show all values less than or equal to 180."),
      copy("Conte quantos valores existem na Series.", "Count how many values exist in the Series."),
      copy("Ordene os valores em ordem crescente.", "Sort the values in ascending order."),
      copy("Ordene os valores em ordem decrescente.", "Sort the values in descending order."),
      copy("Crie uma nova Series com 100 valores aleatórios entre 1 e 1000.", "Create a new Series with 100 random values between 1 and 1000."),
      copy("Calcule a média da serie_grande.", "Calculate the average of serie_grande."),
      copy("Mostre os valores da serie_grande maiores que 800.", "Show the values in serie_grande greater than 800."),
      copy("Conte quantos valores são maiores que 500.", "Count how many values are greater than 500."),
      copy("Calcule o desvio padrão da serie_grande.", "Calculate the standard deviation of serie_grande."),
      copy("Substitua todos os valores menores que 100 por 0.", "Replace all values below 100 with 0."),
      copy("Crie uma Series com nomes de alunos e suas notas.", "Create a Series with student names and their grades."),
      copy("Mostre apenas os alunos com nota maior ou igual a 7.", "Show only students with grades greater than or equal to 7."),
    ],
  },
  {
    id: "dataframes",
    title: copy("Bloco 2 — DataFrames", "Block 2 — DataFrames"),
    description: copy("Exercícios para seleção de colunas, filtros, criação de coluna, agrupamento e DataFrames maiores.", "Exercises for column selection, filters, column creation, grouping, and larger DataFrames."),
    baseCode: `dados = {
    "Nome": ["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda", "Gabriel", "Helena"],
    "Idade": [20, 25, 30, 22, 28, 24, 35, 27],
    "Curso": ["Python", "Excel", "Python", "Power BI", "Python", "Excel", "Power BI", "Python"],
    "Nota": [8.5, 6.0, 7.2, 9.1, 5.5, 7.8, 6.9, 10.0],
    "Mensalidade": [300, 250, 300, 400, 300, 250, 400, 300]
}

df = pd.DataFrame(dados)`,
    extraCode: `df_grande = pd.DataFrame({
    "Aluno": [f"Aluno {i}" for i in range(1, 101)],
    "Idade": np.random.randint(18, 50, 100),
    "Nota": np.random.uniform(0, 10, 100).round(1),
    "Curso": np.random.choice(["Python", "Excel", "Power BI", "SQL"], 100)
})`,
    exercises: [
      copy("Exiba o DataFrame completo.", "Display the full DataFrame."),
      copy("Mostre as 5 primeiras linhas.", "Show the first 5 rows."),
      copy("Mostre as 3 últimas linhas.", "Show the last 3 rows."),
      copy("Exiba apenas a coluna Nome.", "Display only the Nome column."),
      copy("Exiba as colunas Nome e Curso.", "Display the Nome and Curso columns."),
      copy("Mostre os alunos do curso de Python.", "Show students from the Python course."),
      copy("Mostre os alunos com nota maior ou igual a 7.", "Show students with grades greater than or equal to 7."),
      copy("Mostre os alunos com idade maior que 25.", "Show students older than 25."),
      copy("Calcule a média das notas.", "Calculate the grade average."),
      copy("Calcule a maior nota.", "Calculate the highest grade."),
      copy("Calcule a menor nota.", "Calculate the lowest grade."),
      copy("Crie uma nova coluna chamada Situação: Aprovado se Nota >= 7 e Reprovado se Nota < 7.", "Create a new column called Situacao: Aprovado if Nota >= 7 and Reprovado if Nota < 7."),
      copy("Conte quantos alunos foram aprovados.", "Count how many students passed."),
      copy("Calcule a média de nota por curso.", "Calculate the average grade by course."),
      copy("Calcule o total de mensalidades por curso.", "Calculate total tuition by course."),
      copy("Ordene o DataFrame pela coluna Nota.", "Sort the DataFrame by the Nota column."),
      copy("Ordene o DataFrame pela coluna Idade.", "Sort the DataFrame by the Idade column."),
      copy("Filtre alunos do curso de Python com nota maior que 8.", "Filter Python course students with grades greater than 8."),
      copy("Crie um DataFrame grande com 100 alunos fictícios.", "Create a large DataFrame with 100 fictional students."),
      copy("No df_grande, calcule a média de nota por curso.", "In df_grande, calculate the average grade by course."),
    ],
  },
  {
    id: "csv",
    title: copy("Bloco 3 — CSV", "Block 3 — CSV"),
    description: copy("Exercícios para criar, ler, analisar e exportar arquivos CSV com Pandas.", "Exercises to create, read, analyze, and export CSV files with Pandas."),
    baseCode: `dados_vendas = pd.DataFrame({
    "Produto": ["Notebook", "Mouse", "Teclado", "Monitor", "Cadeira", "Mesa", "Webcam", "Headset"],
    "Categoria": ["Informática", "Informática", "Informática", "Informática", "Móveis", "Móveis", "Informática", "Informática"],
    "Quantidade": [5, 20, 15, 7, 3, 4, 10, 12],
    "Preco": [3500, 80, 150, 900, 700, 850, 250, 300]
})

dados_vendas.to_csv("vendas.csv", index=False)

df_vendas = pd.read_csv("vendas.csv")`,
    extraCode: `df_csv_grande = pd.DataFrame({
    "Produto": np.random.choice(["Notebook", "Mouse", "Teclado", "Monitor", "Cadeira"], 500),
    "Categoria": np.random.choice(["Informática", "Móveis"], 500),
    "Quantidade": np.random.randint(1, 50, 500),
    "Preco": np.random.randint(50, 5000, 500)
})

df_csv_grande.to_csv("vendas_grandes.csv", index=False)`,
    exercises: [
      copy("Leia o arquivo vendas.csv.", "Read the vendas.csv file."),
      copy("Exiba as 5 primeiras linhas.", "Display the first 5 rows."),
      copy("Exiba as informações gerais com info().", "Display general information with info()."),
      copy("Exiba as estatísticas com describe().", "Display statistics with describe()."),
      copy("Mostre apenas a coluna Produto.", "Show only the Produto column."),
      copy("Mostre os produtos da categoria Informática.", "Show products from the Informatica category."),
      copy("Mostre os produtos com preço maior que 500.", "Show products with price greater than 500."),
      copy("Crie uma coluna chamada Total com a fórmula Quantidade * Preco.", "Create a column called Total with the formula Quantidade * Preco."),
      copy("Calcule o faturamento total.", "Calculate total revenue."),
      copy("Encontre o produto mais caro.", "Find the most expensive product."),
      copy("Encontre o produto mais barato.", "Find the cheapest product."),
      copy("Ordene os produtos pelo preço.", "Sort products by price."),
      copy("Ordene os produtos pelo total vendido.", "Sort products by total sold."),
      copy("Calcule o total vendido por categoria.", "Calculate total sold by category."),
      copy("Calcule a média de preço por categoria.", "Calculate average price by category."),
      copy("Salve o novo DataFrame em um arquivo chamado vendas_analisadas.csv.", "Save the new DataFrame in a file called vendas_analisadas.csv."),
      copy("Leia novamente o arquivo vendas_analisadas.csv.", "Read the vendas_analisadas.csv file again."),
      copy("Crie um CSV grande com 500 vendas fictícias.", "Create a large CSV with 500 fictional sales."),
      copy("Leia o arquivo vendas_grandes.csv e crie a coluna Total.", "Read the vendas_grandes.csv file and create the Total column."),
      copy("Descubra qual categoria teve maior faturamento total.", "Find out which category had the highest total revenue."),
    ],
  },
];

export default function PythonPandasExerciciosBase() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const localizedBlocks = localize(blocks, isEn);
  const txt = {
    back: copy("Voltar para Python Pandas", "Back to Python Pandas"),
    title: copy("Exercícios Base de Pandas", "Pandas Base Exercises"),
    subtitle: copy(
      "Lista introdutória para praticar Series, DataFrames e arquivos CSV antes dos exercícios com datasets completos.",
      "Introductory list to practice Series, DataFrames, and CSV files before the full dataset exercises."
    ),
    block: copy("Bloco", "Block"),
    baseCode: copy("Base inicial", "Initial base"),
    supportCode: copy("Código de apoio", "Support code"),
  };

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/python-pandas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {pick(txt.back, isEn)}
        </BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v4h14V5H5Zm0 6v8h14v-8H5Zm2 2h3v2H7v-2Zm0 3h7v2H7v-2Zm8-3h2v2h-2v-2Z"
          />
        </svg>
        <span>{pick(txt.title, isEn)}</span>
      </PageTitle>
      <PageDescription>
        {pick(txt.subtitle, isEn)}
      </PageDescription></PageHeader>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {localizedBlocks.map((block, index) => (
          <Panel as="a" layout="plain"
            key={block.id}
            href={`#${block.id}`}
            className="rounded-2xl p-5 theme-hover-border transition hover:-translate-y-1"
          >
            <p className="text-sm font-semibold text-cyan-300 mb-2">{pick(txt.block, isEn)} {index + 1}</p>
            <h2 className="text-lg font-bold text-slate-100 mb-2">{block.title.replace(/^(Bloco|Block) \d+ — /i, "")}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{block.description}</p>
          </Panel>
        ))}
      </div>

      <div className="space-y-8">
        {localizedBlocks.map((block) => (
          <Panel as="article" layout="plain" key={block.id} id={block.id} className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{block.title}</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">{block.description}</p>

            <div className="mb-6 grid gap-5 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-100 mb-3">{pick(txt.baseCode, isEn)}</h3>
                <CodeBlock>{block.baseCode}</CodeBlock>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100 mb-3">{pick(txt.supportCode, isEn)}</h3>
                <CodeBlock>{block.extraCode}</CodeBlock>
              </div>
            </div>

            <ol className="grid gap-3 md:grid-cols-2">
              {block.exercises.map((exercise, index) => (
                <li key={exercise} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-cyan-300">{index + 1}. </span>
                  {exercise}
                </li>
              ))}
            </ol>
          </Panel>
        ))}
      </div>
    </PageTemplate>
  );
}
