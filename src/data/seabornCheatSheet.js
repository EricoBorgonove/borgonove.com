export const seabornChartSections = [
  {
    id: "relacionamento",
    title: "Comandos de Relacionamento (Variáveis Numéricas)",
    description: "Ideais para entender como uma variável afeta a outra.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "sns.scatterplot()", description: "Gráfico de dispersão com suporte a cores por categoria.", example: "sns.scatterplot(data=df, x='vendas', y='lucro', hue='regiao')" },
      { command: "sns.lineplot()", description: "Gráfico de linha com intervalo de confiança automático.", example: "sns.lineplot(data=df, x='data', y='valor')" },
      { command: "sns.regplot()", description: "Gráfico de dispersão com uma linha de regressão linear.", example: "sns.regplot(data=df, x='idade', y='gasto')" },
      { command: "sns.lmplot()", description: "Versão avançada do regplot para múltiplas subgrades.", example: "sns.lmplot(data=df, x='x', y='y', col='categoria')" },
    ],
  },
  {
    id: "distribuicao",
    title: "Comandos de Distribuição",
    description: "Para entender a forma dos seus dados e identificar outliers ou tendências centrais.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "sns.histplot()", description: "Histograma moderno com opção de curva KDE.", example: "sns.histplot(df['idade'], kde=True)" },
      { command: "sns.kdeplot()", description: "Gráfico de Densidade de Kernel, uma versão suavizada do histograma.", example: "sns.kdeplot(df['preco'], fill=True)" },
      { command: "sns.ecdfplot()", description: "Gráfico de distribuição cumulativa empírica.", example: "sns.ecdfplot(data=df, x='tempo')" },
      { command: "sns.rugplot()", description: "Adiciona marcas nos eixos para mostrar observações individuais.", example: "sns.rugplot(df['valor'])" },
    ],
  },
  {
    id: "categorias",
    title: "Comandos de Categorias",
    description: "Essenciais para comparar grupos, como vendas por gênero ou notas por turma.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "sns.barplot()", description: "Barras que mostram a média e o erro padrão automaticamente.", example: "sns.barplot(data=df, x='mes', y='vendas')" },
      { command: "sns.boxplot()", description: "Visualiza quartis, mediana e outliers de forma clara.", example: "sns.boxplot(data=df, x='categoria', y='preco')" },
      { command: "sns.violinplot()", description: "Combina boxplot com KDE, mostrando a densidade dos dados.", example: "sns.violinplot(data=df, x='classe', y='nota')" },
      { command: "sns.countplot()", description: "Conta o número de ocorrências de cada categoria.", example: "sns.countplot(data=df, x='origem')" },
      { command: "sns.stripplot()", description: "Gráfico de dispersão onde um dos eixos é categórico.", example: "sns.stripplot(data=df, x='dia', y='total')" },
    ],
  },
  {
    id: "matriz-facetas",
    title: "Comandos de Matriz e Facetas (Múltiplos Gráficos)",
    description: "Para encontrar padrões escondidos em grandes conjuntos de variáveis.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "sns.heatmap()", description: "Mapa de calor, perfeito para matriz de correlação.", example: "sns.heatmap(df.corr(), annot=True)" },
      { command: "sns.pairplot()", description: "Cria uma matriz de gráficos para todas as colunas numéricas.", example: "sns.pairplot(df, hue='target')" },
      { command: "sns.jointplot()", description: "Mostra a relação entre duas variáveis e suas distribuições.", example: "sns.jointplot(data=df, x='x', y='y')" },
      { command: "sns.FacetGrid()", description: "Cria uma grade de gráficos baseada em variáveis categóricas.", example: "g = sns.FacetGrid(df, col='tempo')" },
    ],
  },
  {
    id: "estetica-temas",
    title: "Estética e Temas",
    description: "Permite mudar globalmente o visual dos gráficos do Seaborn e também do Matplotlib.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "sns.set_theme()", description: "Define tema, paleta e fontes globalmente.", example: "sns.set_theme(style='darkgrid')" },
      { command: "sns.despine()", description: "Remove as bordas desnecessárias do gráfico.", example: "sns.despine()" },
      { command: "sns.color_palette()", description: "Define cores como viridis, magma ou pastel.", example: "sns.set_palette('flare')" },
    ],
  },
];

export const seabornCompleteExample = `import seaborn as sns
import matplotlib.pyplot as plt

# 1. Carregando dataset nativo do Seaborn para teste
tips = sns.load_dataset("tips")

# 2. Configurando o visual
sns.set_theme(style="whitegrid")

# 3. Criando um gráfico complexo:
# Mostra a relação conta vs gorjeta, separando por fumante/não fumante e por horário
g = sns.relplot(
    data=tips,
    x="total_bill", y="tip",
    hue="smoker", style="smoker", size="size",
    col="time", palette="viridis"
)

g.set_axis_labels("Total da Conta (R$)", "Gorjeta (R$)")
g.set_titles("Horário: {col_name}")

plt.show()`;
