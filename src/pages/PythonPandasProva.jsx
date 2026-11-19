import { Button, Input, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";

const starterCode = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

url = "https://data.nasa.gov/resource/gh4g-9sfh.csv?$limit=50000"

df = pd.read_csv(url)

df.head()`;

const geoCode = `sns.scatterplot(
    data=df,
    x="reclong",
    y="reclat",
    hue="fall",
    alpha=0.5
)

plt.title("Distribuição geográfica dos meteoritos")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()`;

const preparationCode = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

sns.set_theme(style="whitegrid")

pd.set_option("display.max_columns", None)
pd.set_option("display.max_rows", 100)`;

const finalCleaningCode = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

sns.set_theme(style="whitegrid")

url = "https://data.nasa.gov/resource/gh4g-9sfh.csv?$limit=50000"

df_original = pd.read_csv(url)

df = df_original.copy()

df.columns = (
    df.columns
    .str.lower()
    .str.strip()
    .str.replace(" ", "_")
    .str.replace("-", "_")
)

df["year_original"] = df["year"]
df["year"] = pd.to_datetime(df["year"], errors="coerce").dt.year

df["mass"] = pd.to_numeric(df["mass"], errors="coerce")
df["reclat"] = pd.to_numeric(df["reclat"], errors="coerce")
df["reclong"] = pd.to_numeric(df["reclong"], errors="coerce")

ano_limite = 2026

df = df[
    (df["year"].notna()) &
    (df["year"] >= 800) &
    (df["year"] <= ano_limite)
].copy()

df["year"] = df["year"].astype(int)

df = df.drop_duplicates().copy()

df["massa_kg"] = df["mass"] / 1000

bins = [0, 100, 1000, 10000, 100000, np.inf]

labels = [
    "muito leve",
    "leve",
    "médio",
    "pesado",
    "extremamente pesado"
]

df["faixa_massa"] = pd.cut(
    df["mass"],
    bins=bins,
    labels=labels,
    include_lowest=True
)

df["decada"] = (df["year"] // 10) * 10

df.head()`;

const criteria = [
  ["Importação e compreensão inicial do dataset", "1,0"],
  ["Limpeza, conversão e tratamento dos dados", "2,0"],
  ["Análise exploratória com Pandas", "2,0"],
  ["Qualidade dos gráficos com Seaborn/Matplotlib", "3,0"],
  ["Interpretação dos resultados", "1,5"],
  ["Organização do notebook e clareza das respostas", "0,5"],
  ["Total", "10,0"],
];

const examParts = [
  {
    title: "Parte 1 — Conhecimento inicial do dataset",
    questions: [
      "Importe o dataset diretamente da URL fornecida e exiba as 10 primeiras linhas.",
      "Mostre a quantidade de linhas e colunas do dataset.",
      "Liste todos os nomes das colunas e explique, com suas palavras, o que cada uma representa.",
      "Verifique os tipos de dados de cada coluna. Quais colunas precisam de conversão para serem analisadas corretamente?",
      "Calcule a quantidade e o percentual de valores ausentes em cada coluna.",
    ],
  },
  {
    title: "Parte 2 — Limpeza e preparação dos dados",
    questions: [
      "Padronize os nomes das colunas para letras minúsculas, sem espaços e sem caracteres especiais.",
      "Converta a coluna referente ao ano para o formato de data ou extraia apenas o ano numérico corretamente.",
      "Converta a massa do meteorito para valor numérico, tratando possíveis erros de conversão.",
      "Remova ou trate registros com ano inválido, ausente ou incompatível com uma análise histórica.",
      "Verifique se existem registros duplicados. Caso existam, remova-os ou justifique por que devem permanecer.",
      "Crie uma nova coluna chamada massa_kg, convertendo a massa de gramas para quilogramas.",
      "Crie uma nova coluna categorizando os meteoritos por faixa de massa: muito leve, leve, médio, pesado e extremamente pesado.",
    ],
  },
  {
    title: "Parte 3 — Análise exploratória com Pandas",
    questions: [
      "Qual é o meteorito mais pesado do dataset? Mostre nome, ano, massa e localização.",
      "Quais são os 10 meteoritos mais pesados registrados?",
      "Quantos meteoritos foram classificados como Fell e quantos como Found?",
      "Qual é a massa média dos meteoritos para cada tipo de registro: Fell e Found?",
      "Quais são as 15 classificações de meteoritos mais frequentes?",
      "Em qual ano houve o maior número de registros de meteoritos?",
      "Agrupe os dados por década e descubra em qual década houve mais registros.",
      "Calcule a média, mediana, desvio padrão, mínimo e máximo da massa dos meteoritos.",
    ],
  },
  {
    title: "Parte 4 — Visualização de dados com Seaborn",
    questions: [
      "Crie um gráfico de barras mostrando a quantidade de meteoritos Fell e Found.",
      "Crie um gráfico de barras com as 10 classificações de meteoritos mais frequentes.",
      "Crie um histograma da massa dos meteoritos. Depois, explique por que esse gráfico pode ficar distorcido.",
      "Crie um novo histograma usando escala logarítmica ou filtrando valores extremos para melhorar a visualização.",
      "Crie um boxplot comparando a massa dos meteoritos Fell e Found.",
      "Crie um gráfico de linha mostrando a evolução da quantidade de registros por ano.",
      "Crie um gráfico de linha mostrando a evolução da quantidade de registros por década.",
      "Crie um gráfico de dispersão usando longitude, latitude e massa dos meteoritos.",
      "Crie um heatmap mostrando a correlação entre variáveis numéricas do dataset.",
      "Escolha uma pergunta própria sobre o dataset, produza uma análise com Pandas, gere um gráfico com Seaborn e escreva uma conclusão interpretativa.",
    ],
  },
];

const answerGuide = {
  1: {
    title: "Importação do dataset",
    codes: [`url = "https://data.nasa.gov/resource/gh4g-9sfh.csv?$limit=50000"

df_original = pd.read_csv(url)

df_original.head(10)`],
    expected: [
      "Você precisa mostrar que consegue carregar o dataset diretamente da internet e visualizar as primeiras linhas.",
      "Observe que o dataset traz informações sobre meteoritos, como nome, classificação, massa, ano, tipo de registro e localização.",
    ],
  },
  2: {
    title: "Quantidade de linhas e colunas",
    codes: [`df_original.shape`, `linhas, colunas = df_original.shape

print(f"Quantidade de linhas: {linhas}")
print(f"Quantidade de colunas: {colunas}")`],
    expected: ["Você deve identificar o tamanho do dataset, ou seja, quantos registros e quantas variáveis existem."],
  },
  3: {
    title: "Nomes das colunas e significados",
    codes: [`df_original.columns`, `for coluna in df_original.columns:
    print(coluna)`],
    table: [
      ["name", "Nome do meteorito"],
      ["id", "Identificador do registro"],
      ["nametype", "Tipo do nome registrado"],
      ["recclass", "Classe ou composição do meteorito"],
      ["mass", "Massa do meteorito em gramas"],
      ["fall", "Indica se o meteorito foi observado caindo ou apenas encontrado"],
      ["year", "Ano associado ao registro"],
      ["reclat", "Latitude"],
      ["reclong", "Longitude"],
      ["geolocation", "Informação geográfica combinada"],
    ],
  },
  4: {
    title: "Tipos de dados e conversões necessárias",
    codes: [`df_original.info()`, `df_original.dtypes`],
    table: [
      ["year", "Pode vir como texto/data completa", "Converter para ano numérico"],
      ["mass", "Pode vir como texto", "Converter para número"],
      ["reclat", "Pode vir como texto", "Converter para número"],
      ["reclong", "Pode vir como texto", "Converter para número"],
    ],
  },
  5: {
    title: "Valores ausentes",
    codes: [`valores_ausentes = df_original.isna().sum()

percentual_ausentes = (df_original.isna().mean() * 100).round(2)

tabela_ausentes = pd.DataFrame({
    "valores_ausentes": valores_ausentes,
    "percentual_ausentes": percentual_ausentes
})

tabela_ausentes.sort_values(by="percentual_ausentes", ascending=False)`],
    expected: [
      "Você deve identificar quais colunas têm mais valores ausentes.",
      "Preste atenção especial em colunas como massa, ano e coordenadas, pois elas podem ter dados faltantes.",
    ],
  },
  6: {
    title: "Padronização dos nomes das colunas",
    intro: "Antes das questões de limpeza, crie uma cópia do dataset original.",
    codes: [`df = df_original.copy()`, `df.columns = (
    df.columns
    .str.lower()
    .str.strip()
    .str.replace(" ", "_")
    .str.replace("-", "_")
)

df.columns`],
    expected: ["Ao final, seus nomes de colunas devem estar padronizados para facilitar o uso no código."],
  },
  7: {
    title: "Conversão do ano",
    codes: [`df["year_original"] = df["year"]

df["year"] = pd.to_datetime(df["year"], errors="coerce").dt.year

df[["year_original", "year"]].head()`],
    expected: ["A coluna year deve conter apenas o ano em formato numérico. Por exemplo: 1880-01-01T00:00:00.000 deve virar 1880."],
  },
  8: {
    title: "Conversão da massa",
    codes: [`df["mass"] = pd.to_numeric(df["mass"], errors="coerce")

df["mass"].dtype`],
    expected: ["A coluna mass deve ficar numérica para que você consiga calcular média, soma, mediana, máximo e mínimo."],
  },
  9: {
    title: "Tratamento de anos inválidos",
    codes: [`ano_limite = 2026

df["ano_invalido"] = df["year"].isna() | (df["year"] < 800) | (df["year"] > ano_limite)

df["ano_invalido"].value_counts()`, `df = df[
    (df["year"].notna()) &
    (df["year"] >= 800) &
    (df["year"] <= ano_limite)
].copy()

df["year"] = df["year"].astype(int)

df.shape`],
    expected: ["Você deve remover ou justificar registros com anos ausentes, muito antigos de forma suspeita ou maiores que o ano atual."],
  },
  10: {
    title: "Registros duplicados",
    codes: [`duplicados = df.duplicated().sum()

print(f"Quantidade de registros duplicados: {duplicados}")`, `df = df.drop_duplicates().copy()

df.shape`],
    expected: ["Você deve verificar se há registros repetidos. Se houver, pode removê-los para evitar distorções na análise."],
  },
  11: {
    title: "Criação da coluna massa_kg",
    codes: [`df["massa_kg"] = df["mass"] / 1000

df[["name", "mass", "massa_kg"]].head()`],
    expected: ["Lembre que a massa original está em gramas. A coluna massa_kg ajuda você a interpretar os valores em quilogramas."],
  },
  12: {
    title: "Faixas de massa",
    codes: [`bins = [0, 100, 1000, 10000, 100000, np.inf]

labels = [
    "muito leve",
    "leve",
    "médio",
    "pesado",
    "extremamente pesado"
]

df["faixa_massa"] = pd.cut(
    df["mass"],
    bins=bins,
    labels=labels,
    include_lowest=True
)

df[["name", "mass", "massa_kg", "faixa_massa"]].head()`, `df["faixa_massa"].value_counts()`],
    expected: ["Você deve criar uma variável categórica para facilitar a comparação das massas dos meteoritos."],
  },
  13: {
    title: "Meteorito mais pesado",
    codes: [`meteorito_mais_pesado = df.loc[df["mass"].idxmax()]

meteorito_mais_pesado`, `df.loc[
    df["mass"].idxmax(),
    ["name", "year", "mass", "massa_kg", "fall", "recclass", "reclat", "reclong"]
]`],
    expected: ["Você deve identificar o meteorito com maior valor na coluna mass e apresentar os campos principais."],
  },
  14: {
    title: "10 meteoritos mais pesados",
    codes: [`top_10_pesados = df.sort_values(by="mass", ascending=False).head(10)

top_10_pesados[
    ["name", "year", "mass", "massa_kg", "fall", "recclass"]
]`],
    expected: ["Apresente uma tabela clara com os 10 meteoritos de maior massa."],
  },
  15: {
    title: "Fell e Found",
    codes: [`df["fall"].value_counts()`, `df["fall"].value_counts(normalize=True).mul(100).round(2)`],
    expected: ["Você deve comparar a quantidade de meteoritos observados caindo (Fell) e encontrados posteriormente (Found)."],
  },
  16: {
    title: "Massa média por tipo de registro",
    codes: [`df.groupby("fall")["mass"].mean().sort_values(ascending=False)`, `df.groupby("fall")["massa_kg"].mean().sort_values(ascending=False)`, `df.groupby("fall")["massa_kg"].agg(["count", "mean", "median", "min", "max"]).round(2)`],
    expected: ["Ao interpretar o resultado, destaque que médias podem ser influenciadas por valores extremos."],
  },
  17: {
    title: "15 classificações mais frequentes",
    codes: [`top_15_classes = df["recclass"].value_counts().head(15)

top_15_classes`],
    expected: ["Sua resposta deve apresentar as classes mais comuns da coluna recclass."],
  },
  18: {
    title: "Ano com mais registros",
    codes: [`registros_por_ano = df["year"].value_counts().sort_values(ascending=False)

registros_por_ano.head(10)`, `ano_mais_registros = registros_por_ano.idxmax()
quantidade = registros_por_ano.max()

print(f"Ano com mais registros: {ano_mais_registros}")
print(f"Quantidade de registros: {quantidade}")`],
    expected: ["Você deve identificar o ano com maior quantidade de registros e mostrar a quantidade encontrada."],
  },
  19: {
    title: "Registros por década",
    codes: [`df["decada"] = (df["year"] // 10) * 10

registros_por_decada = df["decada"].value_counts().sort_index()

registros_por_decada`, `decada_mais_registros = registros_por_decada.idxmax()
quantidade_decada = registros_por_decada.max()

print(f"Década com mais registros: {decada_mais_registros}")
print(f"Quantidade de registros: {quantidade_decada}")`],
    expected: ["Você deve criar uma variável de década e usá-la para analisar a distribuição temporal dos registros."],
  },
  20: {
    title: "Estatísticas da massa",
    codes: [`estatisticas_massa = df["mass"].describe()

estatisticas_massa`, `df["mass"].agg(["mean", "median", "std", "min", "max"]).round(2)`, `df["massa_kg"].agg(["mean", "median", "std", "min", "max"]).round(2)`],
    expected: ["Na interpretação, compare média e mediana e explique o efeito dos meteoritos extremamente pesados."],
  },
  21: {
    title: "Barras de Fell e Found",
    codes: [`plt.figure(figsize=(8, 5))

sns.countplot(
    data=df,
    x="fall"
)

plt.title("Quantidade de meteoritos por tipo de registro")
plt.xlabel("Tipo de registro")
plt.ylabel("Quantidade")
plt.show()`],
    expected: ["Use o gráfico para comparar visualmente quantos meteoritos foram encontrados e quantos foram observados caindo."],
  },
  22: {
    title: "10 classificações mais frequentes em gráfico",
    codes: [`top_10_classes = df["recclass"].value_counts().head(10).index

plt.figure(figsize=(12, 6))

sns.countplot(
    data=df[df["recclass"].isin(top_10_classes)],
    y="recclass",
    order=top_10_classes
)

plt.title("10 classificações de meteoritos mais frequentes")
plt.xlabel("Quantidade")
plt.ylabel("Classificação")
plt.show()`],
    expected: ["Você deve identificar, pelo gráfico, quais classes de meteoritos aparecem com maior frequência."],
  },
  23: {
    title: "Histograma da massa",
    codes: [`plt.figure(figsize=(10, 5))

sns.histplot(
    data=df,
    x="mass",
    bins=50,
    kde=True
)

plt.title("Distribuição da massa dos meteoritos")
plt.xlabel("Massa em gramas")
plt.ylabel("Frequência")
plt.show()`],
    expected: ["Explique que o gráfico pode ficar distorcido porque existem poucos meteoritos com massas extremamente altas. Esses valores extremos comprimem a maior parte dos dados no início do eixo x."],
  },
  24: {
    title: "Histograma com escala logarítmica ou sem extremos",
    codes: [`df_massas_validas = df[df["mass"] > 0].copy()

plt.figure(figsize=(10, 5))

sns.histplot(
    data=df_massas_validas,
    x="mass",
    bins=50,
    log_scale=True,
    kde=True
)

plt.title("Distribuição da massa dos meteoritos em escala logarítmica")
plt.xlabel("Massa em gramas - escala logarítmica")
plt.ylabel("Frequência")
plt.show()`, `limite_superior = df["mass"].quantile(0.99)

df_sem_extremos = df[df["mass"] <= limite_superior]

plt.figure(figsize=(10, 5))

sns.histplot(
    data=df_sem_extremos,
    x="mass",
    bins=50,
    kde=True
)

plt.title("Distribuição da massa sem os 1% maiores valores")
plt.xlabel("Massa em gramas")
plt.ylabel("Frequência")
plt.show()`],
    expected: ["Mostre que, com escala logarítmica ou remoção de extremos, a distribuição fica mais legível."],
  },
  25: {
    title: "Boxplot por tipo de registro",
    codes: [`plt.figure(figsize=(8, 5))

sns.boxplot(
    data=df,
    x="fall",
    y="mass"
)

plt.title("Boxplot da massa por tipo de registro")
plt.xlabel("Tipo de registro")
plt.ylabel("Massa em gramas")
plt.show()`, `plt.figure(figsize=(8, 5))

sns.boxplot(
    data=df[df["mass"] > 0],
    x="fall",
    y="mass"
)

plt.yscale("log")

plt.title("Boxplot da massa por tipo de registro - escala logarítmica")
plt.xlabel("Tipo de registro")
plt.ylabel("Massa em gramas - escala logarítmica")
plt.show()`],
    expected: ["Use o boxplot para comentar a assimetria e a presença de outliers na massa dos meteoritos."],
  },
  26: {
    title: "Evolução por ano",
    codes: [`registros_por_ano = df.groupby("year").size().reset_index(name="quantidade")

plt.figure(figsize=(14, 6))

sns.lineplot(
    data=registros_por_ano,
    x="year",
    y="quantidade"
)

plt.title("Evolução da quantidade de registros de meteoritos por ano")
plt.xlabel("Ano")
plt.ylabel("Quantidade de registros")
plt.show()`],
    expected: ["Observe períodos de maior concentração de registros e comente possíveis mudanças ao longo do tempo."],
  },
  27: {
    title: "Evolução por década",
    codes: [`registros_por_decada = df.groupby("decada").size().reset_index(name="quantidade")

plt.figure(figsize=(12, 6))

sns.lineplot(
    data=registros_por_decada,
    x="decada",
    y="quantidade",
    marker="o"
)

plt.title("Evolução da quantidade de registros de meteoritos por década")
plt.xlabel("Década")
plt.ylabel("Quantidade de registros")
plt.show()`],
    expected: ["Explique que agrupar por década reduz ruídos e facilita a visualização das tendências históricas."],
  },
  28: {
    title: "Dispersão geográfica com massa",
    codes: [`df["reclat"] = pd.to_numeric(df["reclat"], errors="coerce")
df["reclong"] = pd.to_numeric(df["reclong"], errors="coerce")

df_geo = df.dropna(subset=["reclat", "reclong", "mass"]).copy()`, `plt.figure(figsize=(12, 6))

sns.scatterplot(
    data=df_geo,
    x="reclong",
    y="reclat",
    size="mass",
    hue="fall",
    alpha=0.5,
    sizes=(10, 300)
)

plt.title("Distribuição geográfica dos meteoritos")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.legend(bbox_to_anchor=(1.05, 1), loc="upper left")
plt.show()`],
    expected: ["Use o gráfico para observar a distribuição espacial dos meteoritos registrados. Represente a massa pelo tamanho dos pontos e o tipo de registro pela cor."],
  },
  29: {
    title: "Heatmap de correlação",
    codes: [`colunas_numericas = df.select_dtypes(include=["int64", "float64"])

correlacao = colunas_numericas.corr()

plt.figure(figsize=(10, 6))

sns.heatmap(
    correlacao,
    annot=True,
    cmap="coolwarm",
    fmt=".2f"
)

plt.title("Mapa de correlação entre variáveis numéricas")
plt.show()`],
    expected: ["Analise se há relação linear entre variáveis como ano, massa, latitude e longitude. Se muitas correlações forem fracas, isso também é uma conclusão válida."],
  },
  30: {
    title: "Pergunta própria, análise e gráfico",
    intro: "Exemplo de pergunta própria: os meteoritos mais pesados estão concentrados em alguma faixa de massa específica?",
    codes: [`df["faixa_massa"].value_counts()`, `ordem_faixas = [
    "muito leve",
    "leve",
    "médio",
    "pesado",
    "extremamente pesado"
]

plt.figure(figsize=(10, 5))

sns.countplot(
    data=df,
    x="faixa_massa",
    order=ordem_faixas
)

plt.title("Quantidade de meteoritos por faixa de massa")
plt.xlabel("Faixa de massa")
plt.ylabel("Quantidade")
plt.xticks(rotation=30)
plt.show()`],
    expected: ["Na conclusão, destaque se a maior parte dos meteoritos se concentra nas faixas de menor massa. Comente também que meteoritos extremamente pesados aparecem em menor quantidade, mas influenciam muito estatísticas como a média."],
  },
};

const advancedExamParts = [
  {
    title: "Parte 5 — Qualidade dos dados e validações",
    questions: [
      "Verifique se existem meteoritos com massa igual a zero ou massa negativa. Caso existam, explique por que esses registros podem prejudicar a análise.",
      "Identifique quantos registros possuem latitude ou longitude ausente.",
      "Verifique se existem coordenadas geográficas inválidas, considerando que latitude deve estar entre -90 e 90, e longitude entre -180 e 180.",
      "Crie um novo dataframe contendo apenas meteoritos com coordenadas geográficas válidas.",
      "Verifique se existem registros com ano muito antigo ou muito recente em relação ao contexto do dataset. Explique como você decidiria se esses dados devem ser mantidos ou removidos.",
      "Calcule o percentual de registros válidos após a remoção de anos inválidos, massas ausentes e coordenadas inválidas.",
    ],
  },
  {
    title: "Parte 6 — Agrupamentos e tabelas comparativas",
    questions: [
      "Descubra quais são as 20 classes de meteoritos com maior massa total registrada.",
      "Calcule a massa média, mediana e máxima para cada uma das 10 classes mais frequentes.",
      "Compare a quantidade de meteoritos Fell e Found dentro das 10 classes mais comuns.",
      "Crie uma tabela cruzada entre fall e faixa_massa, mostrando a quantidade de registros em cada combinação.",
      "Transforme a tabela cruzada da questão anterior em percentual por linha, para comparar melhor a distribuição entre Fell e Found.",
      "Identifique qual faixa de massa concentra a maior quantidade de meteoritos e explique o resultado.",
    ],
  },
  {
    title: "Parte 7 — Análise temporal avançada",
    questions: [
      "Crie uma nova coluna chamada seculo, classificando os meteoritos pelo século do registro.",
      "Calcule a quantidade de meteoritos registrados por século.",
      "Crie um gráfico de barras mostrando a quantidade de meteoritos por século.",
      "Descubra qual século possui a maior massa total registrada.",
      "Calcule a massa média dos meteoritos por década.",
      "Crie um gráfico de linha mostrando a massa média dos meteoritos ao longo das décadas.",
      "Identifique os 5 anos com maior massa total registrada de meteoritos.",
      "Compare o número de registros antes e depois do ano 2000.",
    ],
  },
  {
    title: "Parte 8 — Visualizações e síntese intermediária",
    questions: [
      "Crie um gráfico de barras horizontal mostrando os 15 meteoritos mais pesados do dataset.",
      "Crie um gráfico de dispersão entre ano e massa, usando escala logarítmica no eixo da massa.",
      "Crie um boxplot da massa dos meteoritos por faixa de massa.",
      "Crie um violinplot comparando a distribuição da massa entre meteoritos Fell e Found.",
      "Crie um gráfico de barras empilhadas mostrando a distribuição de Fell e Found por década.",
      "Crie um gráfico de calor mostrando a quantidade de meteoritos por década e por faixa de massa.",
      "Crie um gráfico de dispersão geográfica usando latitude e longitude, diferenciando os pontos pela faixa de massa.",
      "Crie um gráfico que mostre somente os meteoritos extremamente pesados no mapa de latitude e longitude.",
      "Escreva uma análise interpretativa respondendo: os meteoritos encontrados depois da queda parecem ter comportamento diferente dos meteoritos observados caindo? Use pelo menos uma tabela e um gráfico para justificar.",
      "Produza uma conclusão final da análise, destacando três descobertas importantes, dois problemas de qualidade dos dados e uma sugestão de melhoria para futuras análises.",
    ],
  },
  {
    title: "Parte 9 — Engenharia de atributos geográficos e outliers",
    questions: [
      "Crie uma coluna chamada hemisferio, classificando os meteoritos de acordo com a latitude: Hemisfério Norte, Hemisfério Sul ou Linha do Equador.",
      "Crie uma coluna chamada zona_longitude, classificando os meteoritos como localizados no hemisfério oriental, ocidental ou meridiano de Greenwich.",
      "Crie uma coluna chamada quadrante_geografico, combinando latitude e longitude para classificar os meteoritos em quatro quadrantes: Nordeste, Noroeste, Sudeste e Sudoeste.",
      "Crie um gráfico de barras mostrando a quantidade de meteoritos em cada quadrante geográfico.",
      "Identifique os meteoritos com massa acima do percentil 95 e crie um novo dataframe apenas com esses registros.",
      "Use o método do intervalo interquartil para identificar outliers na massa dos meteoritos.",
      "Calcule o percentual de outliers em relação ao total de registros válidos de massa.",
      "Compare a média e a mediana da massa com e sem outliers.",
    ],
  },
  {
    title: "Parte 10 — Texto, períodos históricos e exportação",
    questions: [
      "Crie uma coluna chamada grupo_classe, extraindo o grupo principal da coluna recclass.",
      "Mostre os 10 grupos de classe mais frequentes.",
      "Crie um gráfico de barras horizontal com os 10 grupos de classe mais frequentes.",
      "Calcule a massa mediana dos meteoritos por grupo_classe, considerando apenas grupos com pelo menos 30 registros.",
      "Crie um gráfico mostrando a massa mediana dos 15 grupos de classe com maiores medianas.",
      "Crie uma coluna chamada periodo_historico, dividindo os registros em: antes de 1800, 1800 a 1899, 1900 a 1949, 1950 a 1999 e 2000 em diante.",
      "Calcule a quantidade de meteoritos por período histórico e por tipo de registro fall.",
      "Crie um gráfico de barras agrupadas mostrando fall por período histórico.",
      "Calcule o percentual de Fell e Found dentro de cada período histórico.",
      "Identifique os nomes de meteoritos que aparecem mais de uma vez no dataset.",
      "Verifique se existem meteoritos com mesma combinação de name, year, mass, reclat e reclong.",
      "Para cada uma das 10 classes mais frequentes, identifique o meteorito mais pesado.",
      "Crie um gráfico de dispersão entre ano e massa, diferenciando os pontos por fall e usando escala logarítmica na massa.",
      "Calcule a média móvel de 10 anos da quantidade anual de registros.",
      "Crie um gráfico de linha mostrando a quantidade anual de registros e a média móvel de 10 anos.",
      "Crie um heatmap simples de valores ausentes para as principais colunas do dataset.",
      "Crie uma tabela cruzada entre grupo_classe e faixa_massa.",
      "Transforme a tabela da questão anterior em percentual por linha.",
      "Crie um heatmap com os percentuais de faixa de massa para os 10 grupos de classe mais frequentes.",
      "Crie um gráfico de densidade geográfica usando latitude e longitude.",
      "Exporte o dataset limpo para um arquivo CSV chamado meteoritos_limpo.csv.",
      "Escreva uma conclusão final da análise, destacando padrões temporais, padrões de massa, padrões geográficos e problemas de qualidade dos dados.",
    ],
  },
];

const allExamParts = [...examParts, ...advancedExamParts];

Object.assign(answerGuide, {
  31: {
    title: "Massas zero ou negativas",
    codes: [`massas_invalidas = df[df["mass"] <= 0]

print(f"Quantidade de meteoritos com massa zero ou negativa: {len(massas_invalidas)}")

massas_invalidas[["name", "year", "mass", "fall", "recclass"]].head()`],
    expected: ["Verifique se existem massas iguais a zero ou negativas. Explique que esses registros podem indicar erro de preenchimento, ausência de medição ou problema de conversão, prejudicando estatísticas, gráficos em escala logarítmica e análises de distribuição."],
  },
  32: {
    title: "Latitude ou longitude ausente",
    codes: [`lat_ausente = df["reclat"].isna().sum()
long_ausente = df["reclong"].isna().sum()

lat_ou_long_ausente = df[
    df["reclat"].isna() | df["reclong"].isna()
]

print(f"Latitude ausente: {lat_ausente}")
print(f"Longitude ausente: {long_ausente}")
print(f"Latitude ou longitude ausente: {len(lat_ou_long_ausente)}")`],
    expected: ["Identifique a ausência de coordenadas geográficas. Registros sem latitude ou longitude não entram em mapas, mas ainda podem ser aproveitados em análises de massa, classificação e evolução temporal."],
  },
  33: {
    title: "Coordenadas geográficas inválidas",
    codes: [`coordenadas_invalidas = df[
    df["reclat"].notna() &
    df["reclong"].notna() &
    (
        ~df["reclat"].between(-90, 90) |
        ~df["reclong"].between(-180, 180)
    )
]

print(f"Quantidade de coordenadas inválidas: {len(coordenadas_invalidas)}")

coordenadas_invalidas[["name", "reclat", "reclong", "year", "mass"]].head()`],
    expected: ["Valide as coordenadas usando os limites reais de latitude e longitude. Coordenadas fora desses intervalos indicam erro e devem ser removidas ou corrigidas antes da análise espacial."],
  },
  34: {
    title: "DataFrame geográfico válido",
    codes: [`df_geo_valido = df[
    df["reclat"].notna() &
    df["reclong"].notna() &
    df["reclat"].between(-90, 90) &
    df["reclong"].between(-180, 180)
].copy()

df_geo_valido.shape`],
    expected: ["Crie um dataframe específico para análises geográficas, mantendo apenas registros com latitude e longitude preenchidas e dentro dos intervalos válidos."],
  },
  35: {
    title: "Anos suspeitos",
    codes: [`ano_atual = 2026

anos_suspeitos = df[
    df["year"].isna() |
    (df["year"] < 800) |
    (df["year"] > ano_atual)
]

print(f"Quantidade de anos suspeitos: {len(anos_suspeitos)}")

anos_suspeitos[["name", "year", "mass", "fall", "recclass"]].head()`, `df["year"].describe()
df.sort_values("year")[["name", "year", "mass", "fall", "recclass"]].head(10)
df.sort_values("year", ascending=False)[["name", "year", "mass", "fall", "recclass"]].head(10)`],
    expected: ["Identifique anos ausentes, muito antigos ou futuros. Decida se cada caso deve permanecer com base no contexto histórico e na confiabilidade do registro."],
  },
  36: {
    title: "Percentual de registros válidos",
    codes: [`ano_atual = 2026

condicao_ano = (
    df["year"].notna() &
    (df["year"] >= 800) &
    (df["year"] <= ano_atual)
)

condicao_massa = (
    df["mass"].notna() &
    (df["mass"] > 0)
)

condicao_coordenadas = (
    df["reclat"].notna() &
    df["reclong"].notna() &
    df["reclat"].between(-90, 90) &
    df["reclong"].between(-180, 180)
)

df_validos = df[
    condicao_ano &
    condicao_massa &
    condicao_coordenadas
].copy()

percentual_validos = (len(df_validos) / len(df)) * 100

print(f"Total de registros: {len(df)}")
print(f"Registros válidos: {len(df_validos)}")
print(f"Percentual válido: {percentual_validos:.2f}%")`],
    expected: ["Calcule quantos registros permanecem após critérios mínimos de qualidade e explique se o dataset ainda tem volume suficiente para análises confiáveis."],
  },
  37: {
    title: "20 classes com maior massa total",
    codes: [`massa_total_por_classe = (
    df.groupby("recclass")["mass"]
    .sum()
    .sort_values(ascending=False)
    .head(20)
)

massa_total_por_classe`],
    expected: ["Agrupe por classe e some as massas. Comente que o resultado pode ser influenciado pela quantidade de registros e por poucos meteoritos extremamente pesados."],
  },
  38: {
    title: "Estatísticas das 10 classes mais frequentes",
    codes: [`top_10_classes = df["recclass"].value_counts().head(10).index

estatisticas_top_classes = (
    df[df["recclass"].isin(top_10_classes)]
    .groupby("recclass")["mass"]
    .agg(["count", "mean", "median", "max"])
    .sort_values("count", ascending=False)
    .round(2)
)

estatisticas_top_classes`],
    expected: ["Compare média, mediana e máximo por classe. Explique que a média pode subir por valores extremos, enquanto a mediana descreve melhor o valor típico."],
  },
  39: {
    title: "Fell e Found nas classes mais comuns",
    codes: [`top_10_classes = df["recclass"].value_counts().head(10).index

comparacao_fall_classes = pd.crosstab(
    df[df["recclass"].isin(top_10_classes)]["recclass"],
    df[df["recclass"].isin(top_10_classes)]["fall"]
)

comparacao_fall_classes`],
    expected: ["Construa a tabela cruzada para observar, dentro das classes mais frequentes, quantos meteoritos foram observados caindo e quantos foram encontrados posteriormente."],
  },
  40: {
    title: "Tabela cruzada fall x faixa_massa",
    codes: [`tabela_fall_faixa = pd.crosstab(
    df["fall"],
    df["faixa_massa"]
)

tabela_fall_faixa`],
    expected: ["Compare a distribuição das faixas de massa dentro de cada tipo de registro e observe se Fell e Found parecem semelhantes ou diferentes."],
  },
  41: {
    title: "Percentual por linha em fall x faixa_massa",
    codes: [`tabela_fall_faixa_percentual = pd.crosstab(
    df["fall"],
    df["faixa_massa"],
    normalize="index"
) * 100

tabela_fall_faixa_percentual.round(2)`],
    expected: ["Transforme os valores absolutos em percentuais por linha para comparar Fell e Found mesmo quando os totais de cada grupo são diferentes."],
  },
  42: {
    title: "Faixa de massa mais comum",
    codes: [`contagem_faixa_massa = df["faixa_massa"].value_counts()

faixa_mais_comum = contagem_faixa_massa.idxmax()
quantidade_faixa_mais_comum = contagem_faixa_massa.max()

print(f"Faixa de massa mais comum: {faixa_mais_comum}")
print(f"Quantidade: {quantidade_faixa_mais_comum}")

contagem_faixa_massa`],
    expected: ["Identifique a faixa mais frequente e explique que faixas mais leves costumam concentrar mais registros, enquanto meteoritos muito grandes são raros e impactam muito as estatísticas de massa."],
  },
  43: {
    title: "Coluna seculo",
    codes: [`df["seculo"] = ((df["year"] - 1) // 100) + 1

df[["name", "year", "seculo"]].head()`, `df["seculo_texto"] = df["seculo"].astype(str) + "º século"

df[["name", "year", "seculo_texto"]].head()`],
    expected: ["Crie uma variável temporal a partir do ano. A classificação por século facilita comparações históricas em períodos mais longos."],
  },
  44: {
    title: "Registros por século",
    codes: [`registros_por_seculo = df["seculo"].value_counts().sort_index()

registros_por_seculo`, `registros_por_seculo_df = (
    df.groupby("seculo")
    .size()
    .reset_index(name="quantidade")
)

registros_por_seculo_df`],
    expected: ["Agrupe os registros por século e conte a quantidade de meteoritos em cada período."],
  },
  45: {
    title: "Gráfico de meteoritos por século",
    codes: [`registros_por_seculo_df = (
    df.groupby("seculo")
    .size()
    .reset_index(name="quantidade")
)

plt.figure(figsize=(10, 5))

sns.barplot(
    data=registros_por_seculo_df,
    x="seculo",
    y="quantidade"
)

plt.title("Quantidade de meteoritos registrados por século")
plt.xlabel("Século")
plt.ylabel("Quantidade de registros")
plt.show()`],
    expected: ["Use o gráfico para discutir se há aumento em séculos recentes, considerando avanços científicos, exploração territorial e catalogação."],
  },
  46: {
    title: "Século com maior massa total",
    codes: [`massa_total_por_seculo = (
    df.groupby("seculo")["mass"]
    .sum()
    .sort_values(ascending=False)
)

massa_total_por_seculo`, `seculo_maior_massa = massa_total_por_seculo.idxmax()
maior_massa_total = massa_total_por_seculo.max()

print(f"Século com maior massa total: {seculo_maior_massa}")
print(f"Massa total registrada: {maior_massa_total:.2f} gramas")`],
    expected: ["Some a massa por século e destaque que a massa total pode ser influenciada por poucos meteoritos muito grandes, não apenas pela quantidade de registros."],
  },
  47: {
    title: "Massa média por década",
    codes: [`massa_media_por_decada = (
    df.groupby("decada")["mass"]
    .mean()
    .reset_index(name="massa_media")
)

massa_media_por_decada.head()`],
    expected: ["Calcule a massa média por década e considere que outliers podem distorcer essa média."],
  },
  48: {
    title: "Linha da massa média por década",
    codes: [`plt.figure(figsize=(12, 6))

sns.lineplot(
    data=massa_media_por_decada,
    x="decada",
    y="massa_media",
    marker="o"
)

plt.title("Massa média dos meteoritos por década")
plt.xlabel("Década")
plt.ylabel("Massa média em gramas")
plt.show()`, `plt.figure(figsize=(12, 6))

sns.lineplot(
    data=massa_media_por_decada[massa_media_por_decada["massa_media"] > 0],
    x="decada",
    y="massa_media",
    marker="o"
)

plt.yscale("log")

plt.title("Massa média dos meteoritos por década — escala logarítmica")
plt.xlabel("Década")
plt.ylabel("Massa média em gramas")
plt.show()`],
    expected: ["Interprete as oscilações da massa média ao longo das décadas e observe que meteoritos extremamente pesados podem explicar picos específicos."],
  },
  49: {
    title: "5 anos com maior massa total",
    codes: [`top_5_anos_massa_total = (
    df.groupby("year")["mass"]
    .sum()
    .sort_values(ascending=False)
    .head(5)
)

top_5_anos_massa_total`, `anos_top_5 = top_5_anos_massa_total.index

df[df["year"].isin(anos_top_5)][
    ["name", "year", "mass", "massa_kg", "fall", "recclass"]
].sort_values("mass", ascending=False).head(20)`],
    expected: ["Identifique os anos com maior soma de massa e verifique se isso ocorre por um único meteorito muito grande ou por vários registros de massa elevada."],
  },
  50: {
    title: "Antes e depois de 2000",
    codes: [`df["periodo_2000"] = np.where(
    df["year"] < 2000,
    "Antes de 2000",
    "2000 em diante"
)

comparacao_2000 = df["periodo_2000"].value_counts()

comparacao_2000`, `comparacao_2000_percentual = (
    df["periodo_2000"]
    .value_counts(normalize=True)
    .mul(100)
    .round(2)
)

comparacao_2000_percentual`],
    expected: ["Compare os períodos e considere que diferenças podem refletir mudanças de catalogação, tecnologia, interesse científico e ampliação das bases de dados."],
  },
});

Object.assign(answerGuide, {
  71: {
    title: "Gráfico dos grupos de classe",
    codes: [`plt.figure(figsize=(10, 6))

sns.barplot(
    x=top_10_grupos.values,
    y=top_10_grupos.index
)

plt.title("10 grupos de classe mais frequentes")
plt.xlabel("Quantidade")
plt.ylabel("Grupo de classe")
plt.show()`],
    expected: ["Use barras horizontais para melhorar a leitura dos nomes dos grupos e apresentar os grupos mais comuns com clareza."],
  },
  72: {
    title: "Massa mediana por grupo com 30 registros",
    codes: [`contagem_grupos = df["grupo_classe"].value_counts()

grupos_com_30_ou_mais = contagem_grupos[contagem_grupos >= 30].index

massa_mediana_grupo = (
    df[df["grupo_classe"].isin(grupos_com_30_ou_mais)]
    .groupby("grupo_classe")["mass"]
    .median()
    .sort_values(ascending=False)
)

massa_mediana_grupo.head(15)`],
    expected: ["Aplique um mínimo de registros antes de comparar medianas para evitar conclusões frágeis baseadas em grupos muito pequenos."],
  },
  73: {
    title: "Gráfico das maiores medianas por grupo",
    codes: [`top_15_mediana_grupo = massa_mediana_grupo.head(15)

plt.figure(figsize=(12, 6))

sns.barplot(
    x=top_15_mediana_grupo.values,
    y=top_15_mediana_grupo.index
)

plt.title("15 grupos de classe com maior massa mediana")
plt.xlabel("Massa mediana em gramas")
plt.ylabel("Grupo de classe")
plt.show()`],
    expected: ["Represente os grupos com maiores medianas e explique que a mediana reduz o efeito de meteoritos extremamente pesados isolados."],
  },
  74: {
    title: "Coluna periodo_historico",
    codes: [`bins_periodo = [0, 1799, 1899, 1949, 1999, 2026]

labels_periodo = [
    "antes de 1800",
    "1800 a 1899",
    "1900 a 1949",
    "1950 a 1999",
    "2000 em diante"
]

df["periodo_historico"] = pd.cut(
    df["year"],
    bins=bins_periodo,
    labels=labels_periodo
)

df["periodo_historico"].value_counts().sort_index()`],
    expected: ["Crie uma variável temporal categórica para comparar períodos longos sem depender apenas de anos individuais."],
  },
  75: {
    title: "Período histórico x fall",
    codes: [`tabela_periodo_fall = pd.crosstab(
    df["periodo_historico"],
    df["fall"]
)

tabela_periodo_fall`],
    expected: ["Apresente a tabela cruzada e observe diferenças entre meteoritos observados caindo e encontrados posteriormente ao longo do tempo."],
  },
  76: {
    title: "Barras agrupadas por período histórico",
    codes: [`plt.figure(figsize=(12, 6))

sns.countplot(
    data=df,
    x="periodo_historico",
    hue="fall"
)

plt.title("Tipo de registro por período histórico")
plt.xlabel("Período histórico")
plt.ylabel("Quantidade")
plt.xticks(rotation=30)
plt.legend(title="Tipo de registro")
plt.show()`],
    expected: ["Mostre a distribuição de Fell e Found em cada período histórico e interprete possíveis mudanças na forma de registro."],
  },
  77: {
    title: "Percentual de fall por período",
    codes: [`percentual_periodo_fall = pd.crosstab(
    df["periodo_historico"],
    df["fall"],
    normalize="index"
) * 100

percentual_periodo_fall.round(2)`],
    expected: ["Use percentuais por linha para comparar períodos com tamanhos diferentes sem depender apenas dos números absolutos."],
  },
  78: {
    title: "Nomes repetidos",
    codes: [`nomes_repetidos = df["name"].value_counts()

nomes_repetidos = nomes_repetidos[nomes_repetidos > 1]

nomes_repetidos.head(20)`],
    expected: ["Verifique duplicidade por nome. Nomes repetidos podem indicar fragmentos, variações de catalogação ou duplicidades que precisam ser investigadas."],
  },
  79: {
    title: "Duplicados por combinação de colunas",
    codes: [`colunas_verificacao = ["name", "year", "mass", "reclat", "reclong"]

duplicados_chave = df.duplicated(subset=colunas_verificacao).sum()

print(f"Duplicados pela combinação selecionada: {duplicados_chave}")`, `df[df.duplicated(subset=colunas_verificacao, keep=False)][colunas_verificacao].head(20)`],
    expected: ["Analise duplicidade por combinação de atributos importantes, não apenas pela linha inteira."],
  },
  80: {
    title: "Mais pesado por classe frequente",
    codes: [`top_10_classes = df["recclass"].value_counts().head(10).index

df_top_classes = df[df["recclass"].isin(top_10_classes)].copy()

mais_pesado_por_classe = (
    df_top_classes
    .sort_values("mass", ascending=False)
    .groupby("recclass")
    .head(1)
)

mais_pesado_por_classe[
    ["recclass", "name", "year", "mass", "massa_kg", "fall"]
].sort_values("mass", ascending=False)`],
    expected: ["Mostre o meteorito mais pesado dentro de cada classe comum e demonstre domínio de ordenação, agrupamento e seleção de registros principais."],
  },
  81: {
    title: "Dispersão ano x massa por fall",
    codes: [`df_massa_positiva = df[df["mass"] > 0].copy()

plt.figure(figsize=(12, 6))

sns.scatterplot(
    data=df_massa_positiva,
    x="year",
    y="mass",
    hue="fall",
    alpha=0.5
)

plt.yscale("log")

plt.title("Relação entre ano e massa dos meteoritos")
plt.xlabel("Ano")
plt.ylabel("Massa em gramas - escala logarítmica")
plt.show()`],
    expected: ["Use escala logarítmica para revelar melhor os valores menores, já que a massa varia muito e possui extremos."],
  },
  82: {
    title: "Média móvel de 10 anos",
    codes: [`registros_ano = (
    df.groupby("year")
    .size()
    .reset_index(name="quantidade")
    .sort_values("year")
)

registros_ano["media_movel_10_anos"] = (
    registros_ano["quantidade"]
    .rolling(window=10, min_periods=1)
    .mean()
)

registros_ano.head()`],
    expected: ["Calcule a média móvel para suavizar oscilações anuais e observar tendências temporais mais gerais."],
  },
  83: {
    title: "Linha anual e média móvel",
    codes: [`plt.figure(figsize=(14, 6))

sns.lineplot(
    data=registros_ano,
    x="year",
    y="quantidade",
    label="Quantidade anual"
)

sns.lineplot(
    data=registros_ano,
    x="year",
    y="media_movel_10_anos",
    label="Média móvel de 10 anos"
)

plt.title("Quantidade anual de registros e média móvel de 10 anos")
plt.xlabel("Ano")
plt.ylabel("Quantidade de registros")
plt.legend()
plt.show()`],
    expected: ["Mostre a série anual e a curva suavizada, explicando que a média móvel ajuda a identificar tendências no tempo."],
  },
  84: {
    title: "Heatmap de valores ausentes",
    codes: [`colunas_principais = [
    "name", "year", "mass", "fall", "recclass", "reclat", "reclong"
]

plt.figure(figsize=(10, 6))

sns.heatmap(
    df[colunas_principais].isna(),
    cbar=False
)

plt.title("Mapa de valores ausentes nas principais colunas")
plt.xlabel("Colunas")
plt.ylabel("Registros")
plt.show()`],
    expected: ["Visualize ausências nas principais colunas e observe se os dados faltantes estão concentrados em variáveis específicas."],
  },
  85: {
    title: "Tabela grupo_classe x faixa_massa",
    codes: [`tabela_grupo_faixa = pd.crosstab(
    df["grupo_classe"],
    df["faixa_massa"]
)

tabela_grupo_faixa.head(20)`],
    expected: ["Cruze o grupo textual simplificado com a faixa de massa para observar padrões de peso por grupo."],
  },
  86: {
    title: "Percentual por grupo_classe",
    codes: [`tabela_grupo_faixa_percentual = pd.crosstab(
    df["grupo_classe"],
    df["faixa_massa"],
    normalize="index"
) * 100

tabela_grupo_faixa_percentual.round(2).head(20)`],
    expected: ["Use percentuais dentro de cada grupo para comparar grupos de tamanhos diferentes corretamente."],
  },
  87: {
    title: "Heatmap percentual grupo x faixa",
    codes: [`top_10_grupos = df["grupo_classe"].value_counts().head(10).index

heatmap_dados = tabela_grupo_faixa_percentual.loc[top_10_grupos]

plt.figure(figsize=(12, 6))

sns.heatmap(
    heatmap_dados,
    annot=True,
    fmt=".1f"
)

plt.title("Percentual de faixa de massa nos 10 grupos mais frequentes")
plt.xlabel("Faixa de massa")
plt.ylabel("Grupo de classe")
plt.show()`],
    expected: ["Compare visualmente a distribuição das faixas de massa entre os grupos mais frequentes."],
  },
  88: {
    title: "Densidade geográfica",
    codes: [`df_geo = df.dropna(subset=["reclat", "reclong"]).copy()

plt.figure(figsize=(12, 6))

sns.kdeplot(
    data=df_geo,
    x="reclong",
    y="reclat",
    fill=True,
    thresh=0.05
)

plt.title("Densidade geográfica dos registros de meteoritos")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()`],
    expected: ["Mostre áreas com maior densidade de registros e explique que isso não significa necessariamente maior queda de meteoritos nessas regiões."],
  },
  89: {
    title: "Exportação do dataset limpo",
    codes: [`df.to_csv("meteoritos_limpo.csv", index=False)`, `df_teste = pd.read_csv("meteoritos_limpo.csv")

df_teste.head()`],
    expected: ["Salve o resultado do tratamento em um novo arquivo para reutilizar a base limpa sem repetir todo o processo."],
  },
  90: {
    title: "Conclusão final completa",
    codes: [`total_registros = len(df)
media_massa = df["mass"].mean()
mediana_massa = df["mass"].median()
classe_mais_frequente = df["recclass"].value_counts().idxmax()
ano_mais_registros = df["year"].value_counts().idxmax()

print("Total de registros:", total_registros)
print("Média da massa:", media_massa)
print("Mediana da massa:", mediana_massa)
print("Classe mais frequente:", classe_mais_frequente)
print("Ano com mais registros:", ano_mais_registros)`],
    expected: ["Escreva uma conclusão interpretativa, não apenas uma lista de números. Conecte padrões temporais, massa, geografia e qualidade dos dados, destacando limitações e possibilidades de aprofundamento."],
  },
});

Object.assign(answerGuide, {
  51: {
    title: "15 meteoritos mais pesados em barras",
    codes: [`top_15_pesados = (
    df.sort_values("mass", ascending=False)
    .head(15)
)

plt.figure(figsize=(12, 7))

sns.barplot(
    data=top_15_pesados,
    x="mass",
    y="name"
)

plt.title("15 meteoritos mais pesados")
plt.xlabel("Massa em gramas")
plt.ylabel("Meteorito")
plt.show()`],
    expected: ["Use barras horizontais para facilitar a leitura dos nomes e mostre que poucos registros concentram massas muito superiores à maioria do dataset."],
  },
  52: {
    title: "Dispersão ano x massa com log",
    codes: [`df_massa_positiva = df[df["mass"] > 0].copy()

plt.figure(figsize=(12, 6))

sns.scatterplot(
    data=df_massa_positiva,
    x="year",
    y="mass",
    alpha=0.5
)

plt.yscale("log")

plt.title("Dispersão entre ano e massa dos meteoritos")
plt.xlabel("Ano")
plt.ylabel("Massa em gramas — escala logarítmica")
plt.show()`],
    expected: ["Aplique escala logarítmica porque a massa varia muito e os valores extremos dificultam a leitura na escala comum."],
  },
  53: {
    title: "Boxplot por faixa de massa",
    codes: [`ordem_faixas = [
    "muito leve",
    "leve",
    "médio",
    "pesado",
    "extremamente pesado"
]

plt.figure(figsize=(12, 6))

sns.boxplot(
    data=df[df["mass"] > 0],
    x="faixa_massa",
    y="mass",
    order=ordem_faixas
)

plt.yscale("log")

plt.title("Boxplot da massa por faixa de massa")
plt.xlabel("Faixa de massa")
plt.ylabel("Massa em gramas — escala logarítmica")
plt.xticks(rotation=30)
plt.show()`],
    expected: ["Compare as faixas de massa e use escala logarítmica para tornar a visualização mais legível."],
  },
  54: {
    title: "Violinplot Fell x Found",
    codes: [`plt.figure(figsize=(10, 6))

sns.violinplot(
    data=df[df["mass"] > 0],
    x="fall",
    y="mass"
)

plt.yscale("log")

plt.title("Distribuição da massa por tipo de registro")
plt.xlabel("Tipo de registro")
plt.ylabel("Massa em gramas — escala logarítmica")
plt.show()`],
    expected: ["Interprete a forma das distribuições e observe possíveis diferenças entre meteoritos observados caindo e meteoritos encontrados depois."],
  },
  55: {
    title: "Barras empilhadas por década e fall",
    codes: [`tabela_decada_fall = pd.crosstab(
    df["decada"],
    df["fall"]
)

tabela_decada_fall.plot(
    kind="bar",
    stacked=True,
    figsize=(14, 6)
)

plt.title("Distribuição de Fell e Found por década")
plt.xlabel("Década")
plt.ylabel("Quantidade de registros")
plt.xticks(rotation=45)
plt.legend(title="Tipo de registro")
plt.show()`],
    expected: ["Analise a evolução de Fell e Found por década e considere que a catalogação histórica pode influenciar os resultados."],
  },
  56: {
    title: "Heatmap década x faixa de massa",
    codes: [`heatmap_decada_faixa = pd.crosstab(
    df["decada"],
    df["faixa_massa"]
)

plt.figure(figsize=(12, 8))

sns.heatmap(
    heatmap_decada_faixa,
    annot=False
)

plt.title("Quantidade de meteoritos por década e faixa de massa")
plt.xlabel("Faixa de massa")
plt.ylabel("Década")
plt.show()`, `plt.figure(figsize=(12, 8))

sns.heatmap(
    heatmap_decada_faixa,
    annot=True,
    fmt="d"
)

plt.title("Quantidade de meteoritos por década e faixa de massa")
plt.xlabel("Faixa de massa")
plt.ylabel("Década")
plt.show()`],
    expected: ["Use o heatmap para identificar combinações de década e faixa de massa com maior concentração de registros."],
  },
  57: {
    title: "Mapa por faixa de massa",
    codes: [`df_geo_valido = df[
    df["reclat"].notna() &
    df["reclong"].notna() &
    df["reclat"].between(-90, 90) &
    df["reclong"].between(-180, 180)
].copy()

plt.figure(figsize=(14, 7))

sns.scatterplot(
    data=df_geo_valido,
    x="reclong",
    y="reclat",
    hue="faixa_massa",
    alpha=0.6
)

plt.title("Distribuição geográfica dos meteoritos por faixa de massa")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.legend(title="Faixa de massa", bbox_to_anchor=(1.05, 1), loc="upper left")
plt.show()`],
    expected: ["Diferencie os pontos pela faixa de massa e interprete a distribuição considerando ocorrência, busca humana, registro e catalogação."],
  },
  58: {
    title: "Mapa dos extremamente pesados",
    codes: [`df_extremamente_pesados = df_geo_valido[
    df_geo_valido["faixa_massa"] == "extremamente pesado"
].copy()

plt.figure(figsize=(14, 7))

sns.scatterplot(
    data=df_extremamente_pesados,
    x="reclong",
    y="reclat",
    size="mass",
    alpha=0.7,
    sizes=(30, 500)
)

plt.title("Distribuição geográfica dos meteoritos extremamente pesados")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()`],
    expected: ["Filtre os meteoritos extremamente pesados e evite afirmar que uma região recebe mais meteoritos sem considerar viés de registro."],
  },
  59: {
    title: "Análise Fell x Found com tabela e gráfico",
    codes: [`comparacao_fall = (
    df.groupby("fall")["mass"]
    .agg(["count", "mean", "median", "std", "min", "max"])
    .round(2)
)

comparacao_fall`, `percentual_fall_faixa = pd.crosstab(
    df["fall"],
    df["faixa_massa"],
    normalize="index"
) * 100

percentual_fall_faixa.round(2)`, `plt.figure(figsize=(10, 6))

sns.boxplot(
    data=df[df["mass"] > 0],
    x="fall",
    y="mass"
)

plt.yscale("log")

plt.title("Comparação da massa entre Fell e Found")
plt.xlabel("Tipo de registro")
plt.ylabel("Massa em gramas — escala logarítmica")
plt.show()`],
    expected: ["Compare Fell e Found usando tabela e gráfico. Discuta quantidade, média, mediana e faixas de massa, lembrando que diferenças históricas, geográficas e de catalogação podem influenciar o resultado."],
  },
  60: {
    title: "Conclusão final intermediária",
    codes: [`total_registros = len(df)

classe_mais_frequente = df["recclass"].value_counts().idxmax()
faixa_mais_comum = df["faixa_massa"].value_counts().idxmax()
ano_mais_registros = df["year"].value_counts().idxmax()

valores_ausentes = df[["mass", "year", "reclat", "reclong"]].isna().sum()

print(f"Total de registros: {total_registros}")
print(f"Classe mais frequente: {classe_mais_frequente}")
print(f"Faixa de massa mais comum: {faixa_mais_comum}")
print(f"Ano com mais registros: {ano_mais_registros}")
print()
print("Valores ausentes:")
print(valores_ausentes)`],
    expected: ["Escreva uma conclusão interpretativa conectando descobertas estatísticas, gráficos e problemas de qualidade dos dados. Não entregue apenas uma lista de números."],
  },
  61: {
    title: "Coluna hemisferio",
    codes: [`def classificar_hemisferio(lat):
    if pd.isna(lat):
        return "sem coordenada"
    elif lat > 0:
        return "Hemisfério Norte"
    elif lat < 0:
        return "Hemisfério Sul"
    else:
        return "Linha do Equador"

df["hemisferio"] = df["reclat"].apply(classificar_hemisferio)

df["hemisferio"].value_counts()`],
    expected: ["Crie uma variável categórica a partir da latitude e interprete a concentração por hemisfério considerando também busca, registro e catalogação."],
  },
  62: {
    title: "Coluna zona_longitude",
    codes: [`def classificar_longitude(lon):
    if pd.isna(lon):
        return "sem coordenada"
    elif lon > 0:
        return "Hemisfério Oriental"
    elif lon < 0:
        return "Hemisfério Ocidental"
    else:
        return "Meridiano de Greenwich"

df["zona_longitude"] = df["reclong"].apply(classificar_longitude)

df["zona_longitude"].value_counts()`],
    expected: ["Transforme longitude em uma categoria interpretável para facilitar análises geográficas amplas."],
  },
  63: {
    title: "Coluna quadrante_geografico",
    codes: [`def classificar_quadrante(linha):
    lat = linha["reclat"]
    lon = linha["reclong"]

    if pd.isna(lat) or pd.isna(lon):
        return "sem coordenada"

    if lat >= 0 and lon >= 0:
        return "Nordeste"
    elif lat >= 0 and lon < 0:
        return "Noroeste"
    elif lat < 0 and lon >= 0:
        return "Sudeste"
    else:
        return "Sudoeste"

df["quadrante_geografico"] = df.apply(classificar_quadrante, axis=1)

df["quadrante_geografico"].value_counts()`],
    expected: ["Combine latitude e longitude para enriquecer a análise espacial e identificar padrões por região do globo."],
  },
  64: {
    title: "Barras por quadrante geográfico",
    codes: [`plt.figure(figsize=(10, 5))

sns.countplot(
    data=df,
    x="quadrante_geografico",
    order=df["quadrante_geografico"].value_counts().index
)

plt.title("Quantidade de meteoritos por quadrante geográfico")
plt.xlabel("Quadrante geográfico")
plt.ylabel("Quantidade")
plt.xticks(rotation=30)
plt.show()`],
    expected: ["Compare os quadrantes visualmente e discuta fatores como áreas de busca, condições ambientais, densidade populacional e histórico de catalogação."],
  },
  65: {
    title: "Meteoritos acima do percentil 95",
    codes: [`limite_p95 = df["mass"].quantile(0.95)

df_top_5_massa = df[df["mass"] > limite_p95].copy()

print(f"Limite do percentil 95: {limite_p95:.2f} gramas")
print(f"Quantidade de meteoritos acima do P95: {len(df_top_5_massa)}")

df_top_5_massa[["name", "year", "mass", "massa_kg", "fall", "recclass"]].head()`],
    expected: ["Identifique os 5% mais pesados para estudar valores extremos sem descartá-los automaticamente."],
  },
  66: {
    title: "Outliers por IQR",
    codes: [`q1 = df["mass"].quantile(0.25)
q3 = df["mass"].quantile(0.75)

iqr = q3 - q1

limite_inferior = q1 - 1.5 * iqr
limite_superior = q3 + 1.5 * iqr

outliers_massa = df[
    (df["mass"] < limite_inferior) |
    (df["mass"] > limite_superior)
].copy()

print(f"Q1: {q1:.2f}")
print(f"Q3: {q3:.2f}")
print(f"IQR: {iqr:.2f}")
print(f"Limite inferior: {limite_inferior:.2f}")
print(f"Limite superior: {limite_superior:.2f}")
print(f"Quantidade de outliers: {len(outliers_massa)}")`],
    expected: ["Aplique o método IQR e explique que a massa tende a ter muitos outliers porque poucos meteoritos são muito mais pesados que a maioria."],
  },
  67: {
    title: "Percentual de outliers",
    codes: [`total_validos_massa = df["mass"].notna().sum()

percentual_outliers = (len(outliers_massa) / total_validos_massa) * 100

print(f"Percentual de outliers: {percentual_outliers:.2f}%")`],
    expected: ["Calcule a proporção de valores extremos e explique que mesmo uma parcela pequena pode alterar média e desvio padrão."],
  },
  68: {
    title: "Média e mediana com e sem outliers",
    codes: [`df_sem_outliers = df[
    (df["mass"] >= limite_inferior) &
    (df["mass"] <= limite_superior)
].copy()

comparacao = pd.DataFrame({
    "com_outliers": [
        df["mass"].mean(),
        df["mass"].median()
    ],
    "sem_outliers": [
        df_sem_outliers["mass"].mean(),
        df_sem_outliers["mass"].median()
    ]
}, index=["media", "mediana"])

comparacao.round(2)`],
    expected: ["Mostre que a média costuma ser mais afetada por outliers que a mediana. Em distribuições assimétricas, a mediana geralmente representa melhor o valor típico."],
  },
  69: {
    title: "Coluna grupo_classe",
    codes: [`df["grupo_classe"] = (
    df["recclass"]
    .astype(str)
    .str.extract(r"^([A-Za-z]+)")
)

df[["recclass", "grupo_classe"]].head(20)`],
    expected: ["Use manipulação de texto para simplificar classificações específicas em grupos principais."],
  },
  70: {
    title: "10 grupos de classe mais frequentes",
    codes: [`top_10_grupos = df["grupo_classe"].value_counts().head(10)

top_10_grupos`],
    expected: ["Identifique os grupos principais mais frequentes e reduza a complexidade da coluna recclass."],
  },
});

const deliveryItems = [
  "Código executado.",
  "Gráficos gerados.",
  "Comentários explicando cada etapa.",
  "Respostas interpretativas, não apenas código.",
  "Conclusão final com os principais achados.",
];

const partStartNumbers = allExamParts.reduce((starts, part, index) => {
  const previousStart = starts[index - 1] || 1;
  const previousLength = allExamParts[index - 1]?.questions.length || 0;
  starts.push(index === 0 ? 1 : previousStart + previousLength);
  return starts;
}, []);

function AnswerContent({ answer }) {
  if (!answer) return null;

  return (
    <div className="space-y-5">
      {answer.intro && <p className="text-sm leading-relaxed text-slate-300">{answer.intro}</p>}

      {answer.codes?.map((code, index) => (
        <CodeBlock key={`${answer.title}-code-${index}`}>{code}</CodeBlock>
      ))}

      {answer.table && (
        <TableContainer className="rounded-2xl border border-slate-800">
          <Table className="min-w-full divide-y divide-slate-800 text-sm">
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {answer.table.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((cell, index) => (
                    <td key={`${cell}-${index}`} className={`px-4 py-3 ${index === 0 ? "font-semibold text-cyan-200" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      {answer.expected && (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Resposta esperada
          </h4>
          <div className="space-y-2 text-sm leading-relaxed text-slate-200">
            {answer.expected.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ExpectedAnswerHint({ answer }) {
  if (!answer?.expected) return null;

  return (
    <div className="mb-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
        Resposta esperada
      </h4>
      <div className="space-y-2 text-sm leading-relaxed text-slate-200">
        {answer.expected.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default function PythonPandasProva() {
  const hasAccess = window.sessionStorage.getItem("pandasExamAccess") === "true";
  const studentName = window.sessionStorage.getItem("pandasExamStudentName") || "Aluno";
  const welcomeMessage = window.sessionStorage.getItem("pandasExamWelcome") || `Bem-vindo ${studentName}`;
  const [passwordQuestion, setPasswordQuestion] = useState(null);
  const [answerQuestion, setAnswerQuestion] = useState(null);
  const [isCleaningPasswordOpen, setIsCleaningPasswordOpen] = useState(false);
  const [isCleaningAnswerOpen, setIsCleaningAnswerOpen] = useState(false);
  const [questionPassword, setQuestionPassword] = useState("");
  const [cleaningPassword, setCleaningPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [cleaningPasswordError, setCleaningPasswordError] = useState(false);

  if (!hasAccess) {
    return <Navigate to="/disciplinas/python-pandas/listas-exercicios" replace />;
  }

  function openPasswordModal(questionNumber) {
    setPasswordQuestion(questionNumber);
    setAnswerQuestion(null);
    setQuestionPassword("");
    setPasswordError(false);
  }

  function closePasswordModal() {
    setPasswordQuestion(null);
    setAnswerQuestion(null);
    setQuestionPassword("");
    setPasswordError(false);
  }

  function openCleaningPasswordModal() {
    setCleaningPassword("");
    setCleaningPasswordError(false);
    setIsCleaningPasswordOpen(true);
  }

  function closeCleaningPasswordModal() {
    setCleaningPassword("");
    setCleaningPasswordError(false);
    setIsCleaningPasswordOpen(false);
  }

  function closeCleaningAnswerModal() {
    setIsCleaningAnswerOpen(false);
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();

    if (questionPassword === `nasa@${passwordQuestion}`) {
      setAnswerQuestion(passwordQuestion);
      setQuestionPassword("");
      setPasswordError(false);
      return;
    }

    setPasswordError(true);
  }

  function handleCleaningPasswordSubmit(event) {
    event.preventDefault();

    if (cleaningPassword === "nasa@limpeza") {
      closeCleaningPasswordModal();
      setIsCleaningAnswerOpen(true);
      return;
    }

    setCleaningPasswordError(true);
  }

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/python-pandas/listas-exercicios" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          Voltar para Exercícios de Pandas
        </BackButton>
      </div>

      <div className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Avaliação prática
        </p>
        <PageTitle className="mb-4 flex items-center gap-3">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
            <path
              fill="currentColor"
              d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v4h14V5H5Zm0 6v8h14v-8H5Zm2 2h4v2H7v-2Zm0 3h7v2H7v-2Zm6-3h4v2h-4v-2Z"
            />
          </svg>
          <span>Prova Final de Pandas</span>
        </PageTitle>
        <div className="mb-5 inline-flex max-w-full rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-200">
          {welcomeMessage}
        </div>
        <p className="max-w-4xl text-lg leading-relaxed text-slate-400">
          Análise exploratória completa com o dataset Meteorite Landings, disponível no portal de dados abertos da NASA.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Enunciado</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-300">
            <p>
              Você recebeu um dataset real contendo registros de meteoritos encontrados ou observados em queda na Terra. Sua tarefa é realizar uma análise exploratória completa, tratando problemas de qualidade dos dados, produzindo visualizações e extraindo conclusões relevantes.
            </p>
            <p>
              A NASA informa que o dataset contém dados da The Meteoritical Society e disponibiliza campos como tipo do meteorito, massa, ano, coordenadas, latitude, longitude e informações de localização.
            </p>
          </div>
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Fonte sugerida</h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-300">
            Dataset Meteorite Landings, disponível no portal de dados abertos da NASA.
          </p>
          <a
            href="https://data.nasa.gov/dataset/meteorite-landings?utm_source=chatgpt.com"
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
          >
            Abrir dataset
            <span aria-hidden="true">→</span>
          </a>
        </Panel>
      </div>

      <Panel as="div" layout="plain" className="mt-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Código inicial sugerido</h2>
        <CodeBlock>{starterCode}</CodeBlock>
      </Panel>

      <Panel as="div" layout="plain" className="mt-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Critérios de avaliação</h2>
        <TableContainer className="rounded-2xl border border-slate-800">
          <Table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead className="bg-slate-950/70 text-left text-slate-300">
              <tr>
                <th className="px-4 py-3 font-semibold">Critério</th>
                <th className="px-4 py-3 font-semibold">Pontuação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {criteria.map(([criterion, score]) => (
                <tr key={criterion} className={criterion === "Total" ? "exam-total-row bg-cyan-500/10 font-semibold text-cyan-100" : ""}>
                  <td className="px-4 py-3">{criterion}</td>
                  <td className="px-4 py-3">{score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Panel>

      <div className="mt-8 space-y-8">
        {allExamParts.map((part, partIndex) => (
          <Panel as="article" layout="plain" key={part.title}>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{part.title}</h2>
            <ol className="grid gap-3 md:grid-cols-2">
              {part.questions.map((question, index) => {
                const questionNumber = partStartNumbers[partIndex] + index;

                return (
                <li key={question} className="text-sm leading-relaxed text-slate-300">
                  <Button variant="secondary"
                    type="button"
                    onClick={() => openPasswordModal(questionNumber)}
                    className="exam-question-button h-full w-full border border-slate-800 bg-slate-950/60 text-left transition hover:border-cyan-400/60 hover:text-slate-100"
                  >
                    <span className="font-semibold text-cyan-300">{questionNumber}. </span>
                    {question}
                  </Button>
                </li>
                );
              })}
            </ol>
          </Panel>
        ))}
      </div>

      <Panel as="div" layout="plain" className="mt-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Desafio extra</h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-300">
          Além das questões da prova, você pode conquistar até 1 ponto extra criando uma análise geográfica simples com latitude e longitude. Procure identificar regiões do mundo com maior concentração de registros e explique o que essa distribuição pode indicar.
        </p>
        <CodeBlock>{geoCode}</CodeBlock>
      </Panel>

      <Panel as="div" layout="plain" className="mt-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Código consolidado de limpeza</h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-300">
          Acesse aqui o bloco completo de preparação dos dados, separado dos gabaritos das questões. Use a senha de limpeza para visualizar o código.
        </p>
        <Button variant="primary"
          type="button"
          onClick={openCleaningPasswordModal}
          className="inline-flex items-center gap-2 text-slate-950 transition"
        >
          Abrir limpeza
          <span aria-hidden="true">→</span>
        </Button>
      </Panel>

      <Panel as="div" layout="plain" className="mt-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Orientações para entrega</h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-300">
          Entregue um notebook .ipynb contendo:
        </p>
        <ul className="grid gap-3 md:grid-cols-2">
          {deliveryItems.map((item) => (
            <li key={item} className="flex gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Panel>

      {passwordQuestion !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
          <div className={`flex max-h-full w-full flex-col rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-cyan-950/30 ${answerQuestion === passwordQuestion ? "max-w-5xl" : "max-w-md"}`}>
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 p-5 md:p-6">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {answerQuestion === passwordQuestion ? "Gabarito — Prova Final" : "Gabarito protegido"}
                </p>
                <h2 className="text-2xl font-semibold text-slate-100">
                  {answerQuestion === passwordQuestion
                    ? `Questão ${passwordQuestion}: ${answerGuide[passwordQuestion]?.title}`
                    : `Questão ${passwordQuestion}`}
                </h2>
                {answerQuestion === passwordQuestion && (
                  <p className="mt-2 text-sm text-slate-400">
                    Dataset: Meteorite Landings — NASA
                  </p>
                )}
              </div>
              <Button variant="secondary"
                type="button"
                onClick={closePasswordModal}
                className="border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100"
                aria-label="Fechar"
              >
                ×
              </Button>
            </div>

            <div className="min-h-0 overflow-y-auto p-5 md:p-6">
              {answerQuestion === passwordQuestion ? (
                <>
                  <details className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-cyan-200">
                      0. Preparação inicial
                    </summary>
                    <div className="mt-4">
                      <CodeBlock>{preparationCode}</CodeBlock>
                    </div>
                  </details>

                  <AnswerContent answer={answerGuide[passwordQuestion]} />
                </>
              ) : (
                <>
                  <ExpectedAnswerHint answer={answerGuide[passwordQuestion]} />

                  <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-300">
                        Senha da questão
                      </span>
                      <Input
                        type="password"
                        value={questionPassword}
                        onChange={(event) => {
                          setQuestionPassword(event.target.value);
                          setPasswordError(false);
                        }}
                        className="w-full border text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                        autoComplete="off"
                        autoFocus
                      />
                    </label>

                    {passwordError && (
                      <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                        Senha incorreta.
                      </p>
                    )}

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      <Button variant="secondary"
                        type="button"
                        onClick={closePasswordModal}
                        className="border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100"
                      >
                        Cancelar
                      </Button>
                      <Button variant="primary"
                        type="submit"
                        className="text-slate-950 transition"
                      >
                        Abrir gabarito
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isCleaningPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-cyan-950/30">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Gabarito protegido
                </p>
                <h2 className="text-2xl font-semibold text-slate-100">
                  Limpeza consolidada
                </h2>
              </div>
              <Button variant="secondary"
                type="button"
                onClick={closeCleaningPasswordModal}
                className="border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100"
                aria-label="Fechar"
              >
                ×
              </Button>
            </div>

            <form className="space-y-4" onSubmit={handleCleaningPasswordSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  Senha da limpeza
                </span>
                <Input
                  type="password"
                  value={cleaningPassword}
                  onChange={(event) => {
                    setCleaningPassword(event.target.value);
                    setCleaningPasswordError(false);
                  }}
                  className="w-full border text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                  autoComplete="off"
                  autoFocus
                />
              </label>

              {cleaningPasswordError && (
                <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                  Senha incorreta.
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button variant="secondary"
                  type="button"
                  onClick={closeCleaningPasswordModal}
                  className="border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100"
                >
                  Cancelar
                </Button>
                <Button variant="primary"
                  type="submit"
                  className="text-slate-950 transition"
                >
                  Abrir limpeza
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCleaningAnswerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-6 backdrop-blur-sm">
          <div className="flex max-h-full w-full max-w-5xl flex-col rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-cyan-950/30">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 p-5 md:p-6">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Gabarito — Limpeza
                </p>
                <h2 className="text-2xl font-semibold text-slate-100">
                  Código final consolidado de limpeza
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Use este bloco como preparação do dataset antes das análises.
                </p>
              </div>
              <Button variant="secondary"
                type="button"
                onClick={closeCleaningAnswerModal}
                className="border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100"
                aria-label="Fechar limpeza"
              >
                ×
              </Button>
            </div>

            <div className="min-h-0 overflow-y-auto p-5 md:p-6">
              <CodeBlock>{finalCleaningCode}</CodeBlock>
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
  );
}
