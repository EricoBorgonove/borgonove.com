import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";
import { seabornChartSections } from "../data/seabornCheatSheet";

const quickLinks = [
  ["o-que-e", "O que é Seaborn?"],
  ["instalacao", "Instalação e importações"],
  ["carregando-dados", "Carregando qualquer dataset"],
  ["primeira-analise", "Primeira análise"],
  ["tipos-variaveis", "Tipos de variáveis"],
  ["escolha-grafico", "Escolhendo o gráfico correto"],
  ["categoricas", "Variáveis categóricas"],
  ["numericas", "Variáveis numéricas"],
  ["comparacao", "Comparação entre categorias"],
  ["relacoes", "Relação entre variáveis"],
  ["correlacao", "Correlação e heatmaps"],
  ["temporais", "Gráficos temporais"],
  ["qualidade", "Qualidade dos dados"],
  ["logaritmica", "Escala logarítmica"],
  ["avancados", "Gráficos avançados"],
  ["referencia", "Tabelas de referência"],
];

const chartGuide = [
  ["Quantos registros existem por categoria?", "countplot"],
  ["Como uma variável numérica está distribuída?", "histplot ou kdeplot"],
  ["Existem outliers?", "boxplot"],
  ["Como comparar uma variável numérica entre grupos?", "boxplot, violinplot ou barplot"],
  ["Duas variáveis numéricas têm relação?", "scatterplot ou regplot"],
  ["Como comparar médias por categoria?", "barplot"],
  ["Como visualizar correlação?", "heatmap"],
  ["Como analisar evolução temporal?", "lineplot"],
  ["Como visualizar várias relações ao mesmo tempo?", "pairplot"],
  ["Como separar gráficos por grupos?", "FacetGrid ou catplot"],
];

const seabornUses = [
  "analisar distribuições",
  "comparar categorias",
  "visualizar relações entre variáveis",
  "identificar outliers",
  "construir heatmaps",
  "explorar correlações",
  "criar gráficos agrupados",
  "apoiar análise exploratória de dados",
];

const variableExamples = [
  {
    title: "Variáveis numéricas",
    examples: "idade, preço, salário, nota, quantidade, tempo, valor, temperatura",
    code: 'df.select_dtypes(include="number").columns',
  },
  {
    title: "Variáveis categóricas",
    examples: "sexo, cidade, estado, produto, categoria, status, tipo, curso, turno",
    code: 'df.select_dtypes(include="object").columns',
  },
  {
    title: "Variáveis de data",
    examples: "data_venda, data_hora, created_at, timestamp",
    code: 'df.select_dtypes(include="datetime").columns',
  },
];

function Section({ id, title, children }) {
  const { text: uiText } = useContentTranslation();

  return (
    <Panel as="article" layout="plain" id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{uiText(title)}</h2>
      {children}
    </Panel>
  );
}

function MiniCard({ title, children }) {
  const { text: uiText } = useContentTranslation();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <h3 className="text-lg font-semibold text-slate-100 mb-3">{uiText(title)}</h3>
      {children}
    </div>
  );
}

function TextList({ items }) {
  const { text: uiText } = useContentTranslation();

  return (
    <ul className="grid gap-2 text-sm text-slate-300 leading-relaxed sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
          <span>{uiText(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function DataTable({ section }) {
  const { text: uiText } = useContentTranslation();

  return (
    <TableContainer className="rounded-2xl border border-slate-800">
      <Table className="min-w-[760px] w-full text-left text-sm bg-slate-950/70">
        <thead className="bg-slate-900/90">
          <tr>
            {section.columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold text-slate-100">
                {uiText(column.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.items.map((item, rowIndex) => (
            <tr key={`${section.id}-${rowIndex}`} className="border-t border-slate-800">
              {section.columns.map((column, columnIndex) => (
                <td key={`${section.id}-${rowIndex}-${column.key}`} className="px-4 py-3 text-slate-300 align-top">
                  {uiText(columnIndex === 0 || column.key === "example" ? (
                    <code className={columnIndex === 0 ? "font-semibold text-cyan-300" : "text-slate-200"}>
                      {item[column.key]}
                    </code>
                  ) : (
                    item[column.key]
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default function PythonSeaborn() {
  const { text: uiText } = useContentTranslation();

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/python-pandas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">{uiText("Voltar para Python Pandas")}</BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M3 16.5c2.2 0 3.3-.8 4.4-1.6 1-.8 2-1.5 4-1.5s3 .7 4 1.5c1.1.8 2.2 1.6 4.6 1.6v2c-3 0-4.5-1.1-5.8-2-1-.7-1.6-1.1-2.8-1.1s-1.8.4-2.8 1.1c-1.3.9-2.8 2-5.6 2v-2Zm0-5c2.2 0 3.3-.8 4.4-1.6 1-.8 2-1.5 4-1.5s3 .7 4 1.5c1.1.8 2.2 1.6 4.6 1.6v2c-3 0-4.5-1.1-5.8-2-1-.7-1.6-1.1-2.8-1.1s-1.8.4-2.8 1.1c-1.3.9-2.8 2-5.6 2v-2Zm0-5c2.2 0 3.3-.8 4.4-1.6 1-.8 2-1.5 4-1.5s3 .7 4 1.5c1.1.8 2.2 1.6 4.6 1.6v2c-3 0-4.5-1.1-5.8-2-1-.7-1.6-1.1-2.8-1.1s-1.8.4-2.8 1.1c-1.3.9-2.8 2-5.6 2v-2Z"
          />
        </svg>
        <span>{uiText("Python Seaborn")}</span>
      </PageTitle>
      <PageDescription className="max-w-5xl">{uiText("Aula prática para criar gráficos estatísticos em Python e escolher a visualização adequada conforme o tipo de variável e a pergunta de análise.")}</PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{uiText("Objetivo da aula")}</h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-5xl">{uiText("Ensinar como utilizar a biblioteca Seaborn para criar gráficos estatísticos em Python, explorando padrões, distribuições, comparações, relações entre variáveis, correlações e problemas de qualidade dos dados em diferentes tipos de datasets. Ao final, o aluno deve saber escolher o gráfico adequado conforme o tipo de variável e a pergunta de análise.")}</p>
      </Panel>

      <Panel as="nav" layout="plain" className="rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">{uiText("Navegação rápida")}</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map(([id, label], index) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400"
            >
              {uiText(index + 1)}. {uiText(label)}
            </a>
          ))}
        </div>
      </Panel>

      <div className="space-y-8">
        <Section id="o-que-e" title={uiText("1. O que é Seaborn?")}>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">{uiText("Seaborn é uma biblioteca de visualização baseada no Matplotlib, muito usada para criar gráficos estatísticos de forma mais simples, elegante e informativa.")}</p>
          <TextList items={seabornUses} />
        </Section>

        <Section id="instalacao" title={uiText("2. Instalação e importações básicas")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <MiniCard title={uiText("Instalação")}>
              <CodeBlock language="bash">pip install seaborn</CodeBlock>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">{uiText("No Anaconda, geralmente o Seaborn já vem instalado. Caso não esteja:")}</p>
              <div className="mt-4">
                <CodeBlock language="bash">conda install seaborn</CodeBlock>
              </div>
            </MiniCard>
            <MiniCard title={uiText("Importações e tema")}>
              <CodeBlock>{`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

sns.set_theme(style="whitegrid")`}</CodeBlock>
            </MiniCard>
          </div>
        </Section>

        <Section id="carregando-dados" title={uiText("3. Carregando qualquer dataset")}>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">{uiText("A ideia é adaptar apenas o nome do arquivo e a função de leitura conforme o formato do dataset.")}</p>
          <div className="grid gap-5 lg:grid-cols-3">
            <MiniCard title={uiText("CSV")}>
              <CodeBlock>{`df = pd.read_csv("seu_arquivo.csv")
df.head()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Excel")}>
              <CodeBlock>{`df = pd.read_excel("seu_arquivo.xlsx")
df.head()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("JSON")}>
              <CodeBlock>{`df = pd.read_json("seu_arquivo.json")
df.head()`}</CodeBlock>
            </MiniCard>
          </div>
        </Section>

        <Section id="primeira-analise" title={uiText("4. Primeira análise do dataset")}>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">{uiText("Antes de criar gráficos, o aluno precisa conhecer o tamanho, os tipos, as colunas e o resumo estatístico dos dados.")}</p>
          <CodeBlock>{`df.shape
df.info()
df.head()
df.describe()
df.columns`}</CodeBlock>
        </Section>

        <Section id="tipos-variaveis" title={uiText("5. Identificando tipos de variáveis")}>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">{uiText("Essa etapa define quais gráficos fazem sentido. Um erro comum é tentar usar o mesmo gráfico para todo tipo de coluna.")}</p>
          <div className="grid gap-5 lg:grid-cols-3">
            {variableExamples.map((item) => (
              <MiniCard key={item.title} title={uiText(item.title)}>
                <p className="mb-4 text-sm text-slate-400 leading-relaxed">{uiText(item.examples)}</p>
                <CodeBlock>{item.code}</CodeBlock>
              </MiniCard>
            ))}
          </div>
        </Section>

        <Section id="escolha-grafico" title={uiText("6. Escolhendo o gráfico correto")}>
          <TableContainer className="rounded-2xl border border-slate-800">
            <Table className="min-w-[760px] w-full text-left text-sm bg-slate-950/70">
              <thead className="bg-slate-900/90">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-100">{uiText("Pergunta de análise")}</th>
                  <th className="px-4 py-3 font-semibold text-slate-100">{uiText("Tipo de gráfico")}</th>
                </tr>
              </thead>
              <tbody>
                {chartGuide.map(([question, chart]) => (
                  <tr key={question} className="border-t border-slate-800">
                    <td className="px-4 py-3 text-slate-300 align-top">{uiText(question)}</td>
                    <td className="px-4 py-3 text-cyan-200 align-top"><code>{chart}</code></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Section>

        <Section id="categoricas" title={uiText("7. Gráficos para variáveis categóricas")}>
          <div className="space-y-5">
            <MiniCard title={uiText("Countplot")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Use quando quiser contar registros por categoria.")}</p>
              <CodeBlock>{`sns.countplot(data=df, x="coluna_categorica")
plt.title("Quantidade por categoria")
plt.xticks(rotation=45)
plt.show()`}</CodeBlock>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">{uiText("Exemplos: alunos por curso, vendas por produto, clientes por cidade ou transações por status.")}</p>
            </MiniCard>
            <div className="grid gap-5 lg:grid-cols-2">
              <MiniCard title={uiText("Countplot horizontal")}>
                <p className="mb-4 text-sm text-slate-400">{uiText("Quando houver muitas categorias, prefira o gráfico horizontal.")}</p>
                <CodeBlock>{`sns.countplot(data=df, y="coluna_categorica")
plt.title("Quantidade por categoria")
plt.show()`}</CodeBlock>
              </MiniCard>
              <MiniCard title={uiText("Ordenando categorias")}>
                <CodeBlock>{`ordem = df["coluna_categorica"].value_counts().index

sns.countplot(data=df, y="coluna_categorica", order=ordem)
plt.title("Categorias ordenadas por frequência")
plt.show()`}</CodeBlock>
              </MiniCard>
            </div>
          </div>
        </Section>

        <Section id="numericas" title={uiText("8. Gráficos para variáveis numéricas")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <MiniCard title={uiText("Histplot")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Use para analisar a distribuição de uma variável numérica.")}</p>
              <CodeBlock>{`sns.histplot(data=df, x="coluna_numerica", bins=30, kde=True)
plt.title("Distribuição da variável")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("KDE Plot")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Mostra a curva de densidade da variável.")}</p>
              <CodeBlock>{`sns.kdeplot(data=df, x="coluna_numerica", fill=True)
plt.title("Curva de densidade")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Boxplot")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Use para identificar mediana, dispersão e outliers.")}</p>
              <CodeBlock>{`sns.boxplot(data=df, x="coluna_numerica")
plt.title("Boxplot da variável")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Boxplot por categoria")}>
              <CodeBlock>{`sns.boxplot(data=df, x="coluna_categorica", y="coluna_numerica")
plt.title("Distribuição da variável numérica por categoria")
plt.xticks(rotation=45)
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Violinplot")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Mostra a distribuição dos dados com mais detalhe que o boxplot.")}</p>
              <CodeBlock>{`sns.violinplot(data=df, x="coluna_categorica", y="coluna_numerica")
plt.title("Distribuição por categoria")
plt.xticks(rotation=45)
plt.show()`}</CodeBlock>
            </MiniCard>
          </div>
        </Section>

        <Section id="comparacao" title={uiText("9. Comparação entre categorias")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <MiniCard title={uiText("Barplot")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Use para comparar médias ou agregações. Por padrão, o barplot calcula a média da variável numérica.")}</p>
              <CodeBlock>{`sns.barplot(data=df, x="coluna_categorica", y="coluna_numerica")
plt.title("Média da variável por categoria")
plt.xticks(rotation=45)
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Barplot com dados já agrupados")}>
              <CodeBlock>{`resumo = (
    df.groupby("coluna_categorica")["coluna_numerica"]
    .mean()
    .reset_index()
)

sns.barplot(data=resumo, x="coluna_categorica", y="coluna_numerica")
plt.title("Média por categoria")
plt.xticks(rotation=45)
plt.show()`}</CodeBlock>
            </MiniCard>
          </div>
        </Section>

        <Section id="relacoes" title={uiText("10. Relação entre variáveis numéricas")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <MiniCard title={uiText("Scatterplot")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Use quando quiser verificar relação entre duas variáveis numéricas.")}</p>
              <CodeBlock>{`sns.scatterplot(data=df, x="coluna_numerica_1", y="coluna_numerica_2")
plt.title("Relação entre duas variáveis")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Scatterplot com cor por categoria")}>
              <CodeBlock>{`sns.scatterplot(
    data=df,
    x="coluna_numerica_1",
    y="coluna_numerica_2",
    hue="coluna_categorica"
)

plt.title("Relação entre variáveis com agrupamento")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Regplot")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Use para mostrar tendência linear.")}</p>
              <CodeBlock>{`sns.regplot(data=df, x="coluna_numerica_1", y="coluna_numerica_2")
plt.title("Relação com linha de tendência")
plt.show()`}</CodeBlock>
            </MiniCard>
          </div>
        </Section>

        <Section id="correlacao" title={uiText("11. Correlação entre variáveis")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <MiniCard title={uiText("Matriz de correlação")}>
              <CodeBlock>{`corr = df.select_dtypes(include="number").corr()
corr`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Heatmap de correlação")}>
              <CodeBlock>{`plt.figure(figsize=(10, 6))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm")
plt.title("Mapa de calor de correlação")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Heatmap com máscara triangular")}>
              <CodeBlock>{`mask = np.triu(np.ones_like(corr, dtype=bool))

plt.figure(figsize=(10, 6))
sns.heatmap(corr, mask=mask, annot=True, fmt=".2f", cmap="coolwarm")
plt.title("Correlação entre variáveis numéricas")
plt.show()`}</CodeBlock>
            </MiniCard>
          </div>
        </Section>

        <Section id="temporais" title={uiText("12. Gráficos temporais")}>
          <div className="space-y-5">
            <MiniCard title={uiText("Preparando coluna de data")}>
              <CodeBlock>{`df["coluna_data"] = pd.to_datetime(df["coluna_data"], errors="coerce")

df["ano"] = df["coluna_data"].dt.year
df["mes"] = df["coluna_data"].dt.month
df["dia"] = df["coluna_data"].dt.day
df["hora"] = df["coluna_data"].dt.hour
df["data"] = df["coluna_data"].dt.date
df["dia_semana"] = df["coluna_data"].dt.day_name()`}</CodeBlock>
            </MiniCard>
            <div className="grid gap-5 lg:grid-cols-2">
              <MiniCard title={uiText("Lineplot por data")}>
                <CodeBlock>{`serie_temporal = (
    df.groupby("data")
    .size()
    .reset_index(name="quantidade")
)

sns.lineplot(data=serie_temporal, x="data", y="quantidade")
plt.title("Quantidade de registros ao longo do tempo")
plt.xticks(rotation=45)
plt.show()`}</CodeBlock>
              </MiniCard>
              <MiniCard title={uiText("Média ao longo do tempo")}>
                <CodeBlock>{`media_tempo = (
    df.groupby("data")["coluna_numerica"]
    .mean()
    .reset_index()
)

sns.lineplot(data=media_tempo, x="data", y="coluna_numerica")
plt.title("Média da variável ao longo do tempo")
plt.xticks(rotation=45)
plt.show()`}</CodeBlock>
              </MiniCard>
            </div>
          </div>
        </Section>

        <Section id="qualidade" title={uiText("13. Qualidade dos dados com gráficos")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <MiniCard title={uiText("Valores ausentes")}>
              <CodeBlock>{`ausentes = df.isna().mean().sort_values(ascending=False) * 100

ausentes = ausentes[ausentes > 0].reset_index()
ausentes.columns = ["coluna", "percentual_ausente"]

sns.barplot(data=ausentes, x="percentual_ausente", y="coluna")
plt.title("Percentual de valores ausentes por coluna")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Duplicidades")}>
              <CodeBlock>{`duplicados = df.duplicated().sum()
unicos = len(df) - duplicados

dados_dup = pd.DataFrame({
    "tipo": ["Únicos", "Duplicados"],
    "quantidade": [unicos, duplicados]
})

sns.barplot(data=dados_dup, x="tipo", y="quantidade")
plt.title("Registros únicos x duplicados")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Outliers com IQR")}>
              <CodeBlock>{`coluna = "coluna_numerica"

Q1 = df[coluna].quantile(0.25)
Q3 = df[coluna].quantile(0.75)
IQR = Q3 - Q1

limite_inferior = Q1 - 1.5 * IQR
limite_superior = Q3 + 1.5 * IQR

df["outlier"] = (
    (df[coluna] < limite_inferior) |
    (df[coluna] > limite_superior)
)

sns.countplot(data=df, x="outlier")
plt.title("Quantidade de registros normais e outliers")
plt.show()`}</CodeBlock>
            </MiniCard>
          </div>
        </Section>

        <Section id="logaritmica" title={uiText("14. Escala logarítmica")}>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">{uiText("Use quando uma variável tiver muitos valores pequenos e poucos valores muito grandes.")}</p>
          <div className="grid gap-5 lg:grid-cols-2">
            <MiniCard title={uiText("Criando a transformação")}>
              <CodeBlock>{`df["log_coluna"] = np.log1p(df["coluna_numerica"])`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Comparando distribuições")}>
              <CodeBlock>{`sns.histplot(data=df, x="coluna_numerica", bins=50, kde=True)
plt.title("Distribuição original")
plt.show()

sns.histplot(data=df, x="log_coluna", bins=50, kde=True)
plt.title("Distribuição com transformação logarítmica")
plt.show()`}</CodeBlock>
            </MiniCard>
          </div>
        </Section>

        <Section id="avancados" title={uiText("15. Gráficos avançados")}>
          <div className="grid gap-5 lg:grid-cols-2">
            <MiniCard title={uiText("Pairplot")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Use para comparar várias variáveis numéricas ao mesmo tempo.")}</p>
              <CodeBlock>{`colunas = ["num1", "num2", "num3"]

sns.pairplot(df[colunas])
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Pairplot com categoria")}>
              <CodeBlock>{`sns.pairplot(df[colunas + ["coluna_categorica"]], hue="coluna_categorica")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("FacetGrid")}>
              <p className="mb-4 text-sm text-slate-400">{uiText("Use para criar vários gráficos separados por grupo.")}</p>
              <CodeBlock>{`g = sns.FacetGrid(df, col="coluna_categorica")
g.map_dataframe(sns.histplot, x="coluna_numerica")
plt.show()`}</CodeBlock>
            </MiniCard>
            <MiniCard title={uiText("Catplot")}>
              <CodeBlock>{`sns.catplot(
    data=df,
    x="coluna_categorica",
    y="coluna_numerica",
    kind="box"
)

plt.xticks(rotation=45)
plt.show()`}</CodeBlock>
            </MiniCard>
          </div>
        </Section>

        <Section id="referencia" title={uiText("16. Tabelas de referência rápida")}>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">{uiText("Estas tabelas complementam a aula com um resumo direto dos principais comandos do Seaborn, quando usar cada um e exemplos curtos para consulta durante os exercícios.")}</p>
          <div className="space-y-6">
            {seabornChartSections.map((section) => (
              <div key={section.id} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <h3 className="text-xl font-semibold text-cyan-200 mb-2">{uiText(section.title)}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{uiText(section.description)}</p>
                <DataTable section={section} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </PageTemplate>
  );
}
