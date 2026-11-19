import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";
import { copy, localize, pick } from "../utils/pandasLocale";

const datasets = [
  {
    id: "series-acessos",
    title: copy("Dataset 1 — Series: acessos ao site", "Dataset 1 — Series: website visits"),
    description: copy("Prática com séries temporais, índice datetime, valores nulos, média móvel, outliers e visualização.", "Practice with time series, datetime indexes, null values, moving averages, outliers, and visualization."),
    file: "dataset_series_acessos_site.csv",
    download: "/datasets/python-pandas/dataset_series_acessos_site.csv",
    exercises: [
      copy("Carregue o arquivo dataset_series_acessos_site.csv.", "Load the dataset_series_acessos_site.csv file."),
      copy("Converta a coluna data_hora para o tipo datetime.", "Convert the data_hora column to datetime."),
      copy("Transforme a coluna data_hora em índice.", "Set the data_hora column as the index."),
      copy("Verifique a quantidade de valores nulos.", "Check the number of null values."),
      copy("Substitua os valores nulos pela média da série.", "Replace null values with the Series mean."),
      copy("Calcule média, mediana, mínimo e máximo de acessos.", "Calculate mean, median, minimum, and maximum visits."),
      copy("Identifique os 10 maiores valores de acessos.", "Identify the 10 highest visit values."),
      copy("Identifique os 10 menores valores de acessos.", "Identify the 10 lowest visit values."),
      copy("Calcule a média de acessos por dia.", "Calculate average visits per day."),
      copy("Calcule a soma de acessos por dia.", "Calculate total visits per day."),
      copy("Calcule a média de acessos por hora do dia.", "Calculate average visits by hour of day."),
      copy("Identifique o horário com maior média de acessos.", "Identify the hour with the highest average visits."),
      copy("Crie uma média móvel de 24 horas.", "Create a 24-hour moving average."),
      copy("Compare acessos reais com média móvel.", "Compare real visits with the moving average."),
      copy("Identifique possíveis outliers.", "Identify possible outliers."),
      copy("Remova ou trate os outliers.", "Remove or handle the outliers."),
      copy("Faça um gráfico da série temporal.", "Create a time series chart."),
      copy("Faça um gráfico da média diária.", "Create a daily average chart."),
      copy("Faça um gráfico da média por hora.", "Create an hourly average chart."),
      copy("Gere um resumo interpretativo dos padrões encontrados.", "Generate an interpretive summary of the patterns found."),
    ],
  },
  {
    id: "dataframe-alunos",
    title: copy("Dataset 2 — DataFrame: alunos", "Dataset 2 — DataFrame: students"),
    description: copy("Prática com análise acadêmica, agrupamentos, percentuais, filtros, correlação e gráficos comparativos.", "Practice with academic analysis, groupings, percentages, filters, correlation, and comparative charts."),
    file: "dataset_dataframe_alunos.csv",
    download: "/datasets/python-pandas/dataset_dataframe_alunos.csv",
    exercises: [
      copy("Carregue o arquivo dataset_dataframe_alunos.csv.", "Load the dataset_dataframe_alunos.csv file."),
      copy("Verifique dimensões, colunas e tipos de dados.", "Check dimensions, columns, and data types."),
      copy("Identifique valores nulos por coluna.", "Identify null values by column."),
      copy("Calcule média geral das notas AV1, AV2 e média final.", "Calculate the overall average for AV1, AV2, and final grade."),
      copy("Calcule a média por curso.", "Calculate the average by course."),
      copy("Calcule a média por disciplina.", "Calculate the average by subject."),
      copy("Calcule a média por campus.", "Calculate the average by campus."),
      copy("Conte alunos por curso.", "Count students by course."),
      copy("Conte alunos por situação.", "Count students by status."),
      copy("Calcule percentual de aprovados, final e reprovados.", "Calculate the percentage of passed, final exam, and failed students."),
      copy("Identifique os 20 alunos com maior média.", "Identify the 20 students with the highest average."),
      copy("Identifique os 20 alunos com menor frequência.", "Identify the 20 students with the lowest attendance."),
      copy("Filtre alunos reprovados por frequência.", "Filter students failed by attendance."),
      copy("Compare desempenho entre bolsistas e não bolsistas.", "Compare performance between scholarship and non-scholarship students."),
      copy("Compare desempenho entre modalidades.", "Compare performance between modalities."),
      copy("Calcule média de horas de estudo por curso.", "Calculate average study hours by course."),
      copy("Verifique correlação entre horas de estudo e média.", "Check correlation between study hours and average grade."),
      copy("Gere gráfico de alunos por curso.", "Generate a chart of students by course."),
      copy("Gere gráfico de situação acadêmica.", "Generate a chart of academic status."),
      copy("Produza uma análise final do desempenho acadêmico.", "Produce a final analysis of academic performance."),
    ],
  },
  {
    id: "vendas-ecommerce",
    title: copy("Dataset 3 — CSV: vendas e-commerce", "Dataset 3 — CSV: e-commerce sales"),
    description: copy("Prática com auditoria comercial, duplicatas, faturamento, ticket médio, avaliações e gráficos de vendas.", "Practice with commercial auditing, duplicates, revenue, average order value, reviews, and sales charts."),
    file: "dataset_csv_vendas_ecommerce.csv",
    download: "/datasets/python-pandas/dataset_csv_vendas_ecommerce.csv",
    exercises: [
      copy("Carregue o arquivo dataset_csv_vendas_ecommerce.csv.", "Load the dataset_csv_vendas_ecommerce.csv file."),
      copy("Verifique dimensões, colunas e tipos.", "Check dimensions, columns, and types."),
      copy("Identifique valores nulos.", "Identify null values."),
      copy("Identifique pedidos duplicados.", "Identify duplicated orders."),
      copy("Remova duplicatas.", "Remove duplicates."),
      copy("Calcule faturamento total.", "Calculate total revenue."),
      copy("Calcule faturamento por produto.", "Calculate revenue by product."),
      copy("Calcule faturamento por categoria.", "Calculate revenue by category."),
      copy("Calcule faturamento por canal de venda.", "Calculate revenue by sales channel."),
      copy("Calcule faturamento por UF.", "Calculate revenue by state abbreviation."),
      copy("Identifique os 10 maiores pedidos.", "Identify the 10 largest orders."),
      copy("Identifique os produtos mais vendidos em quantidade.", "Identify the best-selling products by quantity."),
      copy("Calcule ticket médio.", "Calculate average order value."),
      copy("Calcule desconto médio aplicado.", "Calculate the average applied discount."),
      copy("Compare formas de pagamento.", "Compare payment methods."),
      copy("Calcule avaliação média por produto.", "Calculate average rating by product."),
      copy("Identifique produtos com pior avaliação média.", "Identify products with the worst average rating."),
      copy("Gere gráfico de faturamento por produto.", "Generate a revenue by product chart."),
      copy("Gere gráfico de faturamento por canal.", "Generate a revenue by channel chart."),
      copy("Produza uma análise final das vendas.", "Produce a final sales analysis."),
    ],
  },
  {
    id: "analytics-empresa",
    title: copy("Dataset 4 — Excel: analytics empresa", "Dataset 4 — Excel: company analytics"),
    description: copy("Prática profissional com múltiplas abas, relacionamentos, dados sujos, métricas derivadas e leitura de Excel no Pandas.", "Professional practice with multiple sheets, relationships, messy data, derived metrics, and Excel reading in Pandas."),
    file: "dataset_analytics_empresa.xlsx",
    download: "/datasets/python-pandas/dataset_analytics_empresa.xlsx",
    sheetStructure: [
      copy("clientes: id_cliente, nome, idade, genero, cidade, estado, data_cadastro, renda_estimada, score_credito.", "clientes: id_cliente, nome, idade, genero, cidade, estado, data_cadastro, renda_estimada, score_credito."),
      copy("produtos: id_produto, nome_produto, categoria, custo, preco, margem.", "produtos: id_produto, nome_produto, categoria, custo, preco, margem."),
      copy("vendas: id_venda, data_venda, id_cliente, id_produto, quantidade, valor_unitario, desconto, valor_total.", "vendas: id_venda, data_venda, id_cliente, id_produto, quantidade, valor_unitario, desconto, valor_total."),
      copy("financeiro: id_transacao, data, tipo, categoria, valor, descricao.", "financeiro: id_transacao, data, tipo, categoria, valor, descricao."),
      copy("marketing: campanha, canal, investimento, leads, conversoes, receita_gerada.", "marketing: campanha, canal, investimento, leads, conversoes, receita_gerada."),
    ],
    complexity: [
      copy("Mais de 1000 registros por aba.", "More than 1,000 records per sheet."),
      copy("Relacionamentos entre tabelas, simulando um banco relacional.", "Relationships between tables, simulating a relational database."),
      copy("Dados sujos com nulos, inconsistências e duplicidade pontual.", "Messy data with nulls, inconsistencies, and occasional duplicates."),
      copy("Métricas derivadas como margem, ticket médio e ROI.", "Derived metrics such as margin, average order value, and ROI."),
      copy("Cenário realista de analytics empresarial.", "Realistic business analytics scenario."),
    ],
    generationCode: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

np.random.seed(42)

# Depois de criar os DataFrames clientes, produtos, vendas, financeiro e marketing:
with pd.ExcelWriter("dataset_analytics_empresa.xlsx") as writer:
    clientes.to_excel(writer, sheet_name="clientes", index=False)
    produtos.to_excel(writer, sheet_name="produtos", index=False)
    vendas.to_excel(writer, sheet_name="vendas", index=False)
    financeiro.to_excel(writer, sheet_name="financeiro", index=False)
    marketing.to_excel(writer, sheet_name="marketing", index=False)`,
    exerciseBlocks: [
      {
        title: copy("Bloco 1 — Leitura e estrutura", "Block 1 — Reading and structure"),
        range: "1–5",
        exercises: [
          copy("Carregue todas as abas do arquivo dataset_analytics_empresa.xlsx em DataFrames separados.", "Load all sheets from dataset_analytics_empresa.xlsx into separate DataFrames."),
          copy("Exiba as dimensões (shape) de cada tabela.", "Display the dimensions (shape) of each table."),
          copy("Liste os tipos de dados de cada coluna em todas as abas.", "List the data types of each column across all sheets."),
          copy("Verifique a quantidade de valores nulos por tabela.", "Check the number of null values by table."),
          copy("Converta todas as colunas de data para o tipo datetime.", "Convert all date columns to datetime."),
        ],
      },
      {
        title: copy("Bloco 2 — Relacionamentos", "Block 2 — Relationships"),
        range: "6–10",
        exercises: [
          copy("Realize um JOIN entre vendas e clientes para obter dados completos de cada venda.", "Perform a JOIN between sales and customers to obtain complete data for each sale."),
          copy("Realize um JOIN entre vendas e produtos para incluir categoria e margem.", "Perform a JOIN between sales and products to include category and margin."),
          copy("Crie um DataFrame único consolidando cliente + produto + venda.", "Create a single DataFrame consolidating customer + product + sale."),
          copy("Calcule o valor total de vendas por cliente.", "Calculate total sales value by customer."),
          copy("Identifique os 10 clientes que mais gastaram.", "Identify the 10 customers who spent the most."),
        ],
      },
      {
        title: copy("Bloco 3 — Análise de vendas", "Block 3 — Sales analysis"),
        range: "11–15",
        exercises: [
          copy("Calcule o faturamento total da empresa.", "Calculate the company's total revenue."),
          copy("Calcule o faturamento por categoria de produto.", "Calculate revenue by product category."),
          copy("Calcule o ticket médio por cliente.", "Calculate average order value by customer."),
          copy("Identifique o produto mais vendido em quantidade.", "Identify the product with the highest quantity sold."),
          copy("Analise o impacto do desconto comparando média de valor com e sem desconto.", "Analyze the impact of discounts by comparing average value with and without discounts."),
        ],
      },
      {
        title: copy("Bloco 4 — Análise de clientes", "Block 4 — Customer analysis"),
        range: "16–18",
        exercises: [
          copy("Classifique os clientes por faixa de renda: baixa, média e alta.", "Classify customers by income range: low, medium, and high."),
          copy("Verifique a relação entre renda e gasto total.", "Check the relationship between income and total spending."),
          copy("Analise se clientes com maior score de crédito gastam mais.", "Analyze whether customers with higher credit scores spend more."),
        ],
      },
      {
        title: copy("Bloco 5 — Marketing + Financeiro", "Block 5 — Marketing + Finance"),
        range: "19–20",
        helper: "ROI = (receita_gerada - investimento) / investimento",
        exercises: [
          copy("Calcule o ROI de cada campanha de marketing.", "Calculate the ROI of each marketing campaign."),
          copy("Compare total de receitas vs despesas e determine se a empresa teve lucro ou prejuízo.", "Compare total revenue vs expenses and determine whether the company had profit or loss."),
        ],
      },
    ],
  },
];

export default function PythonPandasExercicios() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const localizedDatasets = localize(datasets, isEn);
  const txt = {
    back: copy("Voltar para Python Pandas", "Back to Python Pandas"),
    title: copy("Exercícios com Datasets Pandas", "Exercises with Pandas Datasets"),
    subtitle: copy(
      "Listas práticas para treinar Series, DataFrames, vendas e analytics empresarial com arquivos para download.",
      "Practical lists to train Series, DataFrames, sales, and business analytics with downloadable files."
    ),
    file: copy("Arquivo:", "File:"),
    download: copy("Baixar dataset", "Download dataset"),
    formula: copy("Fórmula:", "Formula:"),
    excelStructure: copy("Estrutura do Excel", "Excel structure"),
    includedComplexity: copy("Complexidade incluída", "Included complexity"),
    referenceCode: copy("Código de referência para gerar no Jupyter", "Reference code to generate in Jupyter"),
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
            d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v4h14V5H5Zm0 6v8h14v-8H5Zm2 2h4v2H7v-2Zm0 3h7v2H7v-2Zm6-3h4v2h-4v-2Z"
          />
        </svg>
        <span>{pick(txt.title, isEn)}</span>
      </PageTitle>
      <PageDescription>
        {pick(txt.subtitle, isEn)}
      </PageDescription></PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
        {localizedDatasets.map((dataset, index) => (
          <Panel as="a" layout="plain"
            key={dataset.id}
            href={`#${dataset.id}`}
            className="rounded-2xl p-5 theme-hover-border transition hover:-translate-y-1"
          >
            <p className="text-sm font-semibold text-cyan-300 mb-2">Dataset {index + 1}</p>
            <h2 className="text-lg font-bold text-slate-100 mb-2">{dataset.title.replace(/^Dataset \d+ — /, "")}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{dataset.description}</p>
          </Panel>
        ))}
      </div>

      <div className="space-y-8">
        {localizedDatasets.map((dataset) => (
          <Panel as="article" layout="plain" key={dataset.id} id={dataset.id} className="scroll-mt-24">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{dataset.title}</h2>
                <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">{dataset.description}</p>
                <p className="mt-3 text-sm text-slate-500">
                  {pick(txt.file, isEn)} <code className="text-slate-300">{dataset.file}</code>
                </p>
              </div>
              <a
                href={dataset.download}
                download
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                {pick(txt.download, isEn)}
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            {dataset.exerciseBlocks ? (
              <div className="space-y-5">
                {dataset.exerciseBlocks.map((block) => {
                  const firstNumber = Number(block.range.split("–")[0]);
                  return (
                    <div key={block.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                      <h3 className="text-lg font-semibold text-slate-100 mb-2">
                        {block.title} <span className="text-sm font-medium text-cyan-300">({block.range})</span>
                      </h3>
                      {block.helper && (
                        <p className="mb-4 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                          {pick(txt.formula, isEn)} <code>{block.helper}</code>
                        </p>
                      )}
                      <ol className="grid gap-3 md:grid-cols-2">
                        {block.exercises.map((exercise, index) => (
                          <li key={exercise} className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 leading-relaxed">
                            <span className="font-semibold text-cyan-300">{firstNumber + index}. </span>
                            {exercise}
                          </li>
                        ))}
                      </ol>
                    </div>
                  );
                })}
              </div>
            ) : (
              <ol className="grid gap-3 md:grid-cols-2">
                {dataset.exercises.map((exercise, index) => (
                  <li key={exercise} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 leading-relaxed">
                    <span className="font-semibold text-cyan-300">{index + 1}. </span>
                    {exercise}
                  </li>
                ))}
              </ol>
            )}

            {dataset.sheetStructure && (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">{pick(txt.excelStructure, isEn)}</h3>
                  <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                    {dataset.sheetStructure.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">{pick(txt.includedComplexity, isEn)}</h3>
                  <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                    {dataset.complexity.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {dataset.generationCode && (
              <details className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <summary className="cursor-pointer text-lg font-semibold text-slate-100">
                  {pick(txt.referenceCode, isEn)}
                </summary>
                <div className="mt-4">
                  <CodeBlock>{dataset.generationCode}</CodeBlock>
                </div>
              </details>
            )}
          </Panel>
        ))}
      </div>
    </PageTemplate>
  );
}
