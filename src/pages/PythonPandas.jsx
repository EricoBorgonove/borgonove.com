import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";
import { copy, pick } from "../utils/pandasLocale";

const vscodeExample = `import pandas as pd

data = {'Produto': ['Notebook', 'Mouse'], 'Preço': [4500, 150]}
df = pd.DataFrame(data)

print(df) # Exibe no terminal`;

const vscodeExampleEn = `import pandas as pd

data = {'Product': ['Notebook', 'Mouse'], 'Price': [4500, 150]}
df = pd.DataFrame(data)

print(df) # Shows it in the terminal`;

const jupyterExample = `import pandas as pd

df = pd.read_csv('seus_dados.csv')
df  # Apenas digitar o nome do objeto renderiza a tabela bonita`;

const jupyterExampleEn = `import pandas as pd

df = pd.read_csv('your_data.csv')
df  # Typing the object name renders a clean table`;

const integratedExample = `import pandas as pd
import numpy as np

# 1. Criando dados de exemplo
dados = {
    'Data': ['2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02'],
    'Vendedor': ['Ana', 'Bruno', 'Ana', 'Bruno'],
    'Vendas': [1000, 1500, np.nan, 2000],
    'Comissao': [0.1, 0.1, 0.1, 0.1]
}

df = pd.DataFrame(dados)

# 2. Limpeza: preencher o valor faltante com a média de vendas
df['Vendas'] = df['Vendas'].fillna(df['Vendas'].mean())

# 3. Transformação: criar coluna de valor total
df['Ganho_Vendedor'] = df['Vendas'] * df['Comissao']

# 4. Agregação: total de vendas por vendedor
relatorio = df.groupby('Vendedor')['Vendas'].sum().reset_index()

# 5. Exibição
print("Tabela Processada:")
print(df)
print("\\nRelatório Final:")
print(relatorio)`;

const integratedExampleEn = `import pandas as pd
import numpy as np

# 1. Creating sample data
data = {
    'Date': ['2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02'],
    'Seller': ['Ana', 'Bruno', 'Ana', 'Bruno'],
    'Sales': [1000, 1500, np.nan, 2000],
    'Commission': [0.1, 0.1, 0.1, 0.1]
}

df = pd.DataFrame(data)

# 2. Cleaning: fill the missing value with the sales average
df['Sales'] = df['Sales'].fillna(df['Sales'].mean())

# 3. Transformation: create a total value column
df['Seller_Earnings'] = df['Sales'] * df['Commission']

# 4. Aggregation: total sales by seller
report = df.groupby('Seller')['Sales'].sum().reset_index()

# 5. Display
print("Processed Table:")
print(df)
print("\\nFinal Report:")
print(report)`;

export default function PythonPandas() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = {
    back: copy("Voltar para Disciplinas", "Back to Subjects"),
    description: copy(
      "Introdução didática para entender o que é Pandas, como instalar e como usar no VS Code ou Jupyter.",
      "A practical introduction to what Pandas is, how to install it, and how to use it in VS Code or Jupyter."
    ),
    tables: copy("Tabelas de referência", "Reference tables"),
    exercises: copy("Exercícios de Pandas", "Pandas exercises"),
    whatIs: copy("O que é o Pandas?", "What is Pandas?"),
    whatIsText: copy(
      "O Pandas é uma biblioteca de código aberto para Python, focada em manipulação e análise de dados. O nome deriva de Panel Data, um termo econométrico para conjuntos de dados que incluem observações ao longo do tempo.",
      "Pandas is an open-source Python library focused on data manipulation and analysis. Its name comes from Panel Data, an econometrics term for datasets that include observations over time."
    ),
    seriesText: copy("Uma matriz unidimensional, como uma única coluna no Excel.", "A one-dimensional array, like a single Excel column."),
    dataFrameText: copy("Uma estrutura bidimensional, como uma tabela, com linhas e colunas rotuladas.", "A two-dimensional structure, like a table, with labeled rows and columns."),
    install: copy("Como instalar", "How to install"),
    vsCodeTerminal: copy("No VS Code ou Terminal Padrão", "In VS Code or a Standard Terminal"),
    pipText: copy("Se você usa o Python puro, instale via pip no terminal do VS Code.", "If you use plain Python, install it with pip in the VS Code terminal."),
    tip: copy("Dica: geralmente instalamos junto o", "Tip: we usually install"),
    tipEnd: copy("para trabalhar com arquivos Excel.", "along with it to work with Excel files."),
    anaconda: copy("No Jupyter com Anaconda", "In Jupyter with Anaconda"),
    condaText: copy(
      "Se você baixou o Anaconda Navigator, o Pandas já vem pré-instalado. Para instalar ou atualizar em um ambiente específico do Conda, use:",
      "If you downloaded Anaconda Navigator, Pandas is already preinstalled. To install or update it in a specific Conda environment, use:"
    ),
    useTitle: copy("Como usar: VS Code vs. Jupyter", "How to use it: VS Code vs. Jupyter"),
    useText: copy("Embora o código Python seja o mesmo, a experiência de uso muda conforme o ambiente.", "Although the Python code is the same, the usage experience changes depending on the environment."),
    pyFiles: copy("No VS Code (arquivos .py)", "In VS Code (.py files)"),
    pyFilesText: copy(
      "No VS Code, você escreve o script completo e executa de uma vez. Para visualizar o DataFrame, use",
      "In VS Code, you write the full script and run it at once. To view the DataFrame, use"
    ),
    pyFilesTextEnd: copy("ou a extensão Data Viewer.", "or the Data Viewer extension."),
    notebookText: copy(
      "O Jupyter permite executar código em células e ver o resultado imediatamente abaixo, de forma formatada e visual.",
      "Jupyter lets you run code in cells and see the result immediately below in a formatted, visual way."
    ),
    integrated: copy("Exemplo prático integrado", "Integrated practical example"),
    integratedText: copy(
      "Um fluxo real costuma carregar ou criar dados, limpar valores ausentes, calcular novas colunas e gerar um relatório agregado.",
      "A real workflow usually loads or creates data, cleans missing values, calculates new columns, and generates an aggregated report."
    ),
    workflow: copy("Dica de fluxo de trabalho", "Workflow tip"),
    workflowExplore: copy(
      "Use o Jupyter ou Anaconda para a fase de exploração: testar filtros, criar gráficos e entender os dados.",
      "Use Jupyter or Anaconda for exploration: testing filters, creating charts, and understanding the data."
    ),
    workflowAutomate: copy(
      "Use o VS Code com arquivos .py quando sua análise estiver pronta e você quiser criar um sistema automatizado.",
      "Use VS Code with .py files when your analysis is ready and you want to build an automated system."
    ),
  };

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {pick(txt.back, isEn)}
        </BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M12 2.5c-4.6 0-4.3 2-4.3 2v2.1h4.4v.7H5.9S3 6.9 3 11.6s2.5 4.5 2.5 4.5h1.5v-2.2s-.1-2.5 2.5-2.5h4.4s2.4 0 2.4-2.3V4.9s.4-2.4-4.3-2.4Zm-2.5 1.4a.8.8 0 1 1 0 1.7.8.8 0 0 1 0-1.7Zm7.5 3.9v2.1s.1 2.5-2.5 2.5h-4.4s-2.4 0-2.4 2.3v4.2s-.4 2.4 4.3 2.4 4.3-2 4.3-2v-2.1h-4.4v-.7h6.2s2.9.4 2.9-4.3-2.5-4.5-2.5-4.5H17Zm-2.5 10.6a.8.8 0 1 1 0 1.7.8.8 0 0 1 0-1.7Z"
          />
        </svg>
        <span>Python Pandas</span>
      </PageTitle>
      <PageDescription>
        {pick(txt.description, isEn)}
      </PageDescription></PageHeader>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link
            to="/disciplinas/python-pandas/tabelas"
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            {pick(txt.tables, isEn)}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/disciplinas/python-pandas/listas-exercicios"
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
          >
            {pick(txt.exercises, isEn)}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/disciplinas/python-pandas/matplotlib"
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
          >
            Matplotlib
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/disciplinas/python-pandas/seaborn"
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
          >
            Seaborn
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Link
          to="/roadmaps/python-pandas"
          className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
        >
          Roadmap
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.whatIs, isEn)}</h2>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            {pick(txt.whatIsText, isEn)}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Series</h3>
              <p>{pick(txt.seriesText, isEn)}</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">DataFrame</h3>
              <p>{pick(txt.dataFrameText, isEn)}</p>
            </article>
          </div>
        </div>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.install, isEn)}</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-3">{pick(txt.vsCodeTerminal, isEn)}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {pick(txt.pipText, isEn)}
            </p>
            <CodeBlock language="bash">pip install pandas</CodeBlock>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              {pick(txt.tip, isEn)} <code className="text-cyan-300">numpy</code> {isEn ? "and" : "e"}{" "}
              <code className="text-cyan-300">openpyxl</code> {pick(txt.tipEnd, isEn)}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-3">{pick(txt.anaconda, isEn)}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {pick(txt.condaText, isEn)}
            </p>
            <CodeBlock language="bash">conda install pandas</CodeBlock>
          </article>
        </div>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.useTitle, isEn)}</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {pick(txt.useText, isEn)}
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-3">{pick(txt.pyFiles, isEn)}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {pick(txt.pyFilesText, isEn)} <code className="text-cyan-300">print()</code> {pick(txt.pyFilesTextEnd, isEn)}
            </p>
            <CodeBlock>{isEn ? vscodeExampleEn : vscodeExample}</CodeBlock>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-3">No Jupyter Notebook / Anaconda (.ipynb)</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {pick(txt.notebookText, isEn)}
            </p>
            <CodeBlock>{isEn ? jupyterExampleEn : jupyterExample}</CodeBlock>
          </article>
        </div>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.integrated, isEn)}</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {pick(txt.integratedText, isEn)}
        </p>
        <CodeBlock>{isEn ? integratedExampleEn : integratedExample}</CodeBlock>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.workflow, isEn)}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <p className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 leading-relaxed">
            {pick(txt.workflowExplore, isEn)}
          </p>
          <p className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 leading-relaxed">
            {pick(txt.workflowAutomate, isEn)}
          </p>
        </div>
      </Panel>
    </PageTemplate>
  );
}
