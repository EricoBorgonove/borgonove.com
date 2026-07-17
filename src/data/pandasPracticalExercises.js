import { copy } from "../utils/pandasLocale";

export const pandasPracticalExercises = [
  {
    slug: "saude-atendimentos",
    title: copy("Saúde / Atendimentos Hospitalares", "Health / Hospital Care"),
    shortTitle: copy("Saúde", "Health"),
    description: copy(
      "40 questões práticas com Excel para limpeza, qualidade, análise e visualização de atendimentos hospitalares.",
      "40 practical Excel questions for cleaning, quality checks, analysis, and visualization of hospital care data."
    ),
    format: "Excel",
    file: "dataset_saude_atendimentos_complexo.xlsx",
    download: "/datasets/python-pandas/dataset_saude_atendimentos_complexo.xlsx",
    structure: [
      copy("Atendimentos: 5070 registros com dados de pacientes, unidade, especialidade, tempo de espera, duração, custo, status e satisfação.", "Atendimentos: 5,070 records with patient, unit, specialty, wait time, duration, cost, status, and satisfaction data."),
      copy("Dicionario: descrição dos campos e possíveis tratamentos.", "Dicionario: field descriptions and possible treatments."),
      copy("Resumo_Didatico: contexto didático do dataset.", "Resumo_Didatico: teaching context for the dataset."),
    ],
    blocks: [
      {
        title: copy("Manipulação, Limpeza e Organização", "Manipulation, Cleaning, and Organization"),
        exercises: [
          copy("Importe o arquivo Excel e exiba as 10 primeiras linhas.", "Import the Excel file and display the first 10 rows."),
          copy("Verifique a estrutura geral do dataset com info().", "Check the dataset structure with info()."),
          copy("Identifique colunas com valores nulos.", "Identify columns with null values."),
          copy("Calcule o percentual de dados ausentes por coluna.", "Calculate the percentage of missing data by column."),
          copy("Remova registros duplicados.", "Remove duplicated records."),
          copy("Padronize nomes de pacientes para maiúsculas.", "Standardize patient names to uppercase."),
          copy("Corrija inconsistências em colunas categóricas, como sexo, estado civil e tipo sanguíneo quando existirem.", "Fix inconsistencies in categorical columns, such as sex, marital status, and blood type when available."),
          copy("Converta datas de admissão e alta para datetime quando existirem no dataset.", "Convert admission and discharge dates to datetime when available in the dataset."),
          copy("Calcule tempo médio de internação ou duração média do atendimento conforme as colunas disponíveis.", "Calculate average hospitalization time or average care duration according to the available columns."),
          copy("Filtre pacientes com idade superior a 60 anos.", "Filter patients older than 60."),
          copy("Liste pacientes internados ou atendidos por mais de 15 dias/minutos conforme a unidade temporal disponível.", "List patients hospitalized or served for more than 15 days/minutes according to the available time unit."),
          copy("Ordene por custo total de tratamento ou custo estimado.", "Sort by total treatment cost or estimated cost."),
          copy("Substitua valores ausentes de idade pela mediana.", "Replace missing age values with the median."),
          copy("Identifique registros com custo zerado ou negativo.", "Identify records with zero or negative cost."),
          copy("Crie faixa etária categorizada.", "Create categorized age groups."),
          copy("Normalize valores monetários.", "Normalize monetary values."),
          copy("Detecte outliers em custos hospitalares.", "Detect outliers in hospital costs."),
          copy("Remova caracteres inválidos em CPF ou documentos.", "Remove invalid characters from CPF or document fields."),
          copy("Crie coluna de custo diário médio ou custo por minuto de atendimento.", "Create an average daily cost or cost per service minute column."),
          copy("Agrupe pacientes por diagnóstico principal ou especialidade disponível.", "Group patients by main diagnosis or available specialty."),
        ],
      },
      {
        title: copy("Qualidade de Dados", "Data Quality"),
        exercises: [
          copy("Identifique especialidades com maior incidência de dados faltantes.", "Identify specialties with the highest incidence of missing data."),
          copy("Compare custos entre hospitais ou unidades.", "Compare costs across hospitals or units."),
          copy("Verifique distribuição por gênero.", "Check distribution by gender."),
          copy("Detecte internações ou atendimentos extremamente longos.", "Detect extremely long hospitalizations or appointments."),
          copy("Analise correlação entre idade e custo.", "Analyze correlation between age and cost."),
          copy("Identifique diagnósticos ou especialidades mais frequentes.", "Identify the most frequent diagnoses or specialties."),
          copy("Verifique sazonalidade por mês.", "Check seasonality by month."),
          copy("Analise frequência de readmissão ou retorno necessário.", "Analyze readmission frequency or required follow-up."),
          copy("Calcule taxa de mortalidade se a coluna existir no dataset.", "Calculate mortality rate if the column exists in the dataset."),
          copy("Verifique consistência entre alta e admissão ou entre data e duração do atendimento.", "Check consistency between discharge and admission or between date and service duration."),
        ],
      },
      {
        title: copy("Visualização e Storytelling", "Visualization and Storytelling"),
        exercises: [
          copy("Gere gráfico de barras por diagnóstico ou especialidade.", "Create a bar chart by diagnosis or specialty."),
          copy("Crie histograma de idade.", "Create an age histogram."),
          copy("Produza boxplot de custos.", "Create a cost boxplot."),
          copy("Faça heatmap de correlação.", "Create a correlation heatmap."),
          copy("Crie gráfico temporal de internações ou atendimentos mensais.", "Create a time chart of monthly hospitalizations or appointments."),
          copy("Analise distribuição geográfica.", "Analyze geographic distribution."),
          copy("Compare custos por sexo.", "Compare costs by sex."),
          copy("Gere dashboard básico com múltiplos gráficos.", "Create a basic dashboard with multiple charts."),
          copy("Produza insights sobre eficiência hospitalar.", "Produce insights about hospital efficiency."),
          copy("Desenvolva narrativa analítica para gestão pública ou privada.", "Develop an analytical narrative for public or private management."),
        ],
      },
    ],
  },
  {
    slug: "ecommerce-pedidos",
    title: copy("E-commerce / Pedidos e Clientes", "E-commerce / Orders and Customers"),
    shortTitle: copy("E-commerce", "E-commerce"),
    description: copy(
      "40 questões práticas com CSV para tratamento, análise comercial, qualidade de dados e visualizações.",
      "40 practical CSV questions for treatment, commercial analysis, data quality, and visualizations."
    ),
    format: "CSV",
    file: "dataset_ecommerce_pedidos_complexo.csv",
    download: "/datasets/python-pandas/dataset_ecommerce_pedidos_complexo.csv",
    structure: [
      copy("Pedidos com data, cliente, UF, cidade, canal, categoria, produto, quantidade, preço, desconto, frete, pagamento, entrega, avaliação e total informado.", "Orders with date, customer, state, city, channel, category, product, quantity, price, discount, shipping, payment, delivery, rating, and reported total."),
    ],
    blocks: [
      {
        title: copy("Manipulação e Tratamento", "Manipulation and Treatment"),
        exercises: [
          copy("Importe o CSV corretamente.", "Import the CSV correctly."),
          copy("Analise tipos de dados.", "Analyze data types."),
          copy("Corrija preços formatados incorretamente.", "Fix incorrectly formatted prices."),
          copy("Converta datas de compra e entrega.", "Convert purchase and delivery dates."),
          copy("Calcule tempo médio de entrega.", "Calculate average delivery time."),
          copy("Identifique pedidos atrasados.", "Identify delayed orders."),
          copy("Filtre pedidos acima de determinado valor.", "Filter orders above a given value."),
          copy("Agrupe por categoria de produto.", "Group by product category."),
          copy("Verifique clientes duplicados.", "Check duplicated customers."),
          copy("Limpe e padronize nomes de cidades.", "Clean and standardize city names."),
          copy("Identifique dados ausentes em avaliações.", "Identify missing data in ratings."),
          copy("Calcule ticket médio.", "Calculate average order value."),
          copy("Detecte outliers em valor de pedidos.", "Detect outliers in order values."),
          copy("Crie ranking de clientes por gasto.", "Create a customer ranking by spending."),
          copy("Analise cancelamentos.", "Analyze cancellations."),
          copy("Identifique produtos mais vendidos.", "Identify best-selling products."),
          copy("Calcule receita mensal.", "Calculate monthly revenue."),
          copy("Analise impacto de cupons.", "Analyze coupon impact."),
          copy("Crie coluna de lucro estimado.", "Create an estimated profit column."),
          copy("Normalize categorias.", "Normalize categories."),
        ],
      },
      {
        title: copy("Qualidade de Dados", "Data Quality"),
        exercises: [
          copy("Detecte padrões suspeitos de fraude.", "Detect suspicious fraud patterns."),
          copy("Compare métodos de pagamento.", "Compare payment methods."),
          copy("Verifique regiões com maior faturamento.", "Check regions with the highest revenue."),
          copy("Analise avaliações negativas.", "Analyze negative ratings."),
          copy("Compare tempo de entrega por transportadora, se a coluna existir.", "Compare delivery time by carrier if the column exists."),
          copy("Identifique sazonalidade de vendas.", "Identify sales seasonality."),
          copy("Analise recompra de clientes.", "Analyze customer repurchases."),
          copy("Verifique churn.", "Check churn."),
          copy("Identifique inconsistências em frete.", "Identify shipping inconsistencies."),
          copy("Relacione desconto e satisfação.", "Relate discount and satisfaction."),
        ],
      },
      {
        title: copy("Visualização", "Visualization"),
        exercises: [
          copy("Crie gráfico de vendas mensais.", "Create a monthly sales chart."),
          copy("Crie gráfico de pizza por categoria.", "Create a pie chart by category."),
          copy("Produza boxplot de ticket médio.", "Create an average order value boxplot."),
          copy("Faça heatmap de correlação.", "Create a correlation heatmap."),
          copy("Gere gráfico de barras por estado.", "Create a bar chart by state."),
          copy("Crie curva ABC de clientes.", "Create a customer ABC curve."),
          copy("Monte funil de vendas.", "Build a sales funnel."),
          copy("Gere dashboard comercial.", "Create a commercial dashboard."),
          copy("Crie storytelling para expansão de mercado.", "Create storytelling for market expansion."),
          copy("Produza relatório executivo de performance.", "Produce an executive performance report."),
        ],
      },
    ],
  },
  {
    slug: "educacao-online",
    title: copy("Educação Online / Plataforma EAD", "Online Education / E-learning Platform"),
    shortTitle: copy("Educação Online", "Online Education"),
    description: copy(
      "40 questões práticas com JSON para normalização, análise educacional, retenção e storytelling acadêmico.",
      "40 practical JSON questions for normalization, educational analysis, retention, and academic storytelling."
    ),
    format: "JSON",
    file: "dataset_educacao_online_complexo.json",
    download: "/datasets/python-pandas/dataset_educacao_online_complexo.json",
    structure: [
      copy("JSON com descrição, data de geração e 5800 registros de alunos com curso, modalidade, matrícula, último acesso, progresso, horas estudadas, nota, certificado, satisfação e localização.", "JSON with description, generation date, and 5,800 student records with course, modality, enrollment, last access, progress, study hours, grade, certificate, satisfaction, and location."),
    ],
    blocks: [
      {
        title: copy("Manipulação e Limpeza", "Manipulation and Cleaning"),
        exercises: [
          copy("Importe JSON para DataFrame.", "Import JSON into a DataFrame."),
          copy("Normalize estruturas aninhadas.", "Normalize nested structures."),
          copy("Verifique colunas ausentes.", "Check missing columns."),
          copy("Padronize cursos e categorias.", "Standardize courses and categories."),
          copy("Converta datas de matrícula.", "Convert enrollment dates."),
          copy("Calcule tempo médio de conclusão.", "Calculate average completion time."),
          copy("Identifique evasão escolar.", "Identify student dropout."),
          copy("Filtre alunos com baixo desempenho.", "Filter students with low performance."),
          copy("Agrupe por curso.", "Group by course."),
          copy("Calcule média geral por disciplina ou curso.", "Calculate overall average by subject or course."),
          copy("Detecte registros duplicados.", "Detect duplicated records."),
          copy("Trate notas inconsistentes.", "Handle inconsistent grades."),
          copy("Identifique acessos fora do padrão.", "Identify unusual accesses."),
          copy("Crie classificação por desempenho.", "Create a performance classification."),
          copy("Normalize formatos de email.", "Normalize email formats."),
          copy("Analise participação em fóruns se a coluna existir.", "Analyze forum participation if the column exists."),
          copy("Crie taxa de engajamento.", "Create an engagement rate."),
          copy("Detecte outliers de tempo de estudo.", "Detect study-time outliers."),
          copy("Organize por instituição se a coluna existir.", "Organize by institution if the column exists."),
          copy("Calcule retenção.", "Calculate retention."),
        ],
      },
      {
        title: copy("Qualidade e Análise", "Quality and Analysis"),
        exercises: [
          copy("Compare cursos mais populares.", "Compare the most popular courses."),
          copy("Analise desempenho por faixa etária se a coluna existir.", "Analyze performance by age group if the column exists."),
          copy("Verifique impacto de frequência em aprovação.", "Check the impact of attendance on approval."),
          copy("Identifique disciplinas críticas.", "Identify critical subjects."),
          copy("Compare modalidades.", "Compare modalities."),
          copy("Analise evasão por região.", "Analyze dropout by region."),
          copy("Verifique correlação entre engajamento e nota.", "Check correlation between engagement and grade."),
          copy("Identifique alunos premium vs gratuitos se a coluna existir.", "Identify premium vs free students if the column exists."),
          copy("Calcule satisfação média.", "Calculate average satisfaction."),
          copy("Verifique consistência temporal.", "Check temporal consistency."),
        ],
      },
      {
        title: copy("Visualização", "Visualization"),
        exercises: [
          copy("Crie histograma de notas.", "Create a grade histogram."),
          copy("Crie gráfico de evasão.", "Create a dropout chart."),
          copy("Gere barras por curso.", "Create bars by course."),
          copy("Faça heatmap de desempenho.", "Create a performance heatmap."),
          copy("Crie linha temporal de matrículas.", "Create an enrollment timeline."),
          copy("Produza boxplot de tempo de estudo.", "Create a study-time boxplot."),
          copy("Gere dashboard acadêmico.", "Create an academic dashboard."),
          copy("Crie storytelling sobre retenção estudantil.", "Create storytelling about student retention."),
          copy("Produza relatório institucional.", "Produce an institutional report."),
          copy("Elabore proposta de melhoria baseada em dados.", "Prepare a data-based improvement proposal."),
        ],
      },
    ],
  },
  {
    slug: "instagram-scraper-graficos",
    title: copy("Instagram Scraper / Análise Visual", "Instagram Scraper / Visual Analysis"),
    shortTitle: copy("Instagram", "Instagram"),
    description: copy(
      "50 questões práticas com CSV real para exploração, preparação, análise temporal e gráficos com Pandas, Matplotlib e Seaborn.",
      "50 practical CSV questions using a real dataset for exploration, preparation, temporal analysis, and charts with Pandas, Matplotlib, and Seaborn."
    ),
    format: "CSV",
    questionCount: 50,
    file: "dataset_instagram-scraper_2026-04-26_02-02-07-106.csv",
    download: "/datasets/python-pandas/dataset_instagram-scraper_2026-04-26_02-02-07-106.csv",
    structure: [
      copy("CSV exportado de scraper do Instagram com 10.437 publicações e 2.000 colunas no arquivo completo.", "CSV exported from an Instagram scraper with 10,437 posts and 2,000 columns in the full file."),
      copy("Colunas principais sugeridas: caption, commentsCount, likesCount, timestamp, type, ownerUsername, ownerFullName, videoPlayCount, videoViewCount, videoDuration, dimensionsHeight, dimensionsWidth, isCommentsDisabled e locationName.", "Suggested main columns: caption, commentsCount, likesCount, timestamp, type, ownerUsername, ownerFullName, videoPlayCount, videoViewCount, videoDuration, dimensionsHeight, dimensionsWidth, isCommentsDisabled, and locationName."),
      copy("Indicado para aulas de gráficos, engajamento, comparação entre perfis, conteúdo em vídeo e comportamento temporal.", "Recommended for classes on charts, engagement, profile comparison, video content, and temporal behavior."),
    ],
    blocks: [
      {
        title: copy("Exploração inicial e preparação dos dados", "Initial Exploration and Data Preparation"),
        exercises: [
          copy("Carregue o dataset no Jupyter usando pandas e visualize as 5 primeiras linhas.", "Load the dataset in Jupyter using pandas and display the first 5 rows."),
          copy("Exiba a quantidade de linhas e colunas do dataset.", "Display the number of rows and columns in the dataset."),
          copy("Liste todas as colunas disponíveis no dataset.", "List all available columns in the dataset."),
          copy("Crie um novo DataFrame contendo apenas as colunas principais para análise visual.", "Create a new DataFrame containing only the main columns for visual analysis."),
          copy("Verifique os tipos de dados das colunas selecionadas.", "Check the data types of the selected columns."),
          copy("Converta a coluna timestamp para o tipo datetime.", "Convert the timestamp column to datetime."),
          copy("Crie as colunas data, ano, mes, dia, hora e dia_semana a partir de timestamp.", "Create the data, ano, mes, dia, hora, and dia_semana columns from timestamp."),
          copy("Verifique a quantidade de valores ausentes em cada coluna selecionada.", "Check the number of missing values in each selected column."),
          copy("Substitua valores ausentes das colunas numéricas por zero.", "Replace missing values in numeric columns with zero."),
          copy("Crie uma coluna chamada total_interacoes, somando curtidas e comentários.", "Create a column called total_interacoes by adding likes and comments."),
        ],
      },
      {
        title: copy("Gráficos básicos com Seaborn", "Basic Charts with Seaborn"),
        exercises: [
          copy("Crie um gráfico de barras com a quantidade de publicações por tipo de post.", "Create a bar chart with the number of posts by post type."),
          copy("Crie um gráfico de barras com a quantidade de publicações por perfil (ownerUsername).", "Create a bar chart with the number of posts by profile (ownerUsername)."),
          copy("Crie um gráfico de barras mostrando os 10 perfis com mais publicações.", "Create a bar chart showing the 10 profiles with the most posts."),
          copy("Crie um histograma da quantidade de curtidas.", "Create a histogram of the number of likes."),
          copy("Crie um histograma da quantidade de comentários.", "Create a histogram of the number of comments."),
          copy("Crie um boxplot para identificar outliers em curtidas.", "Create a boxplot to identify outliers in likes."),
          copy("Crie um boxplot para identificar outliers em comentários.", "Create a boxplot to identify outliers in comments."),
          copy("Crie um gráfico de dispersão entre curtidas e comentários.", "Create a scatter plot between likes and comments."),
          copy("Crie um gráfico de dispersão entre visualizações de vídeo e curtidas.", "Create a scatter plot between video views and likes."),
          copy("Crie um gráfico de barras com a média de curtidas por tipo de post.", "Create a bar chart with the average likes by post type."),
        ],
      },
      {
        title: copy("Análise temporal", "Temporal Analysis"),
        exercises: [
          copy("Crie um gráfico com a quantidade de publicações por dia.", "Create a chart with the number of posts by day."),
          copy("Crie um gráfico com a quantidade de publicações por mês.", "Create a chart with the number of posts by month."),
          copy("Crie um gráfico com a quantidade de publicações por hora do dia.", "Create a chart with the number of posts by hour of day."),
          copy("Crie um gráfico mostrando a média de curtidas por hora do dia.", "Create a chart showing the average likes by hour of day."),
          copy("Crie um gráfico mostrando a média de comentários por hora do dia.", "Create a chart showing the average comments by hour of day."),
          copy("Crie um gráfico com a quantidade de publicações por dia da semana.", "Create a chart with the number of posts by day of week."),
          copy("Crie um gráfico com a média de interações por dia da semana.", "Create a chart with the average interactions by day of week."),
          copy("Crie um gráfico de linha com a evolução diária das curtidas médias.", "Create a line chart with the daily evolution of average likes."),
          copy("Crie um gráfico de linha com a evolução diária dos comentários médios.", "Create a line chart with the daily evolution of average comments."),
          copy("Crie um heatmap cruzando dia da semana e hora com a quantidade de publicações.", "Create a heatmap crossing day of week and hour with the number of posts."),
        ],
      },
      {
        title: copy("Comparações entre tipos de conteúdo", "Comparisons Between Content Types"),
        exercises: [
          copy("Compare a distribuição de curtidas entre imagens e vídeos.", "Compare the distribution of likes between images and videos."),
          copy("Compare a distribuição de comentários entre imagens e vídeos.", "Compare the distribution of comments between images and videos."),
          copy("Compare a média de visualizações entre os tipos de post.", "Compare the average views between post types."),
          copy("Compare a média de interações entre os tipos de post.", "Compare the average interactions between post types."),
          copy("Crie um gráfico de barras com o total de interações por tipo de post.", "Create a bar chart with total interactions by post type."),
          copy("Crie um violinplot da distribuição de curtidas por tipo de post.", "Create a violin plot of the likes distribution by post type."),
          copy("Crie um violinplot da distribuição de comentários por tipo de post.", "Create a violin plot of the comments distribution by post type."),
          copy("Crie um gráfico de dispersão entre duração do vídeo e visualizações.", "Create a scatter plot between video duration and views."),
          copy("Crie um gráfico de dispersão entre duração do vídeo e curtidas.", "Create a scatter plot between video duration and likes."),
          copy("Crie um gráfico com os 10 posts com maior quantidade de curtidas.", "Create a chart with the 10 posts with the highest number of likes."),
        ],
      },
      {
        title: copy("Análises mais interessantes", "More Interesting Analyses"),
        exercises: [
          copy("Crie uma coluna chamada tamanho_caption, contando a quantidade de caracteres da legenda.", "Create a column called tamanho_caption by counting the number of characters in the caption."),
          copy("Crie um histograma do tamanho das legendas.", "Create a histogram of caption length."),
          copy("Crie um gráfico de dispersão entre tamanho da legenda e curtidas.", "Create a scatter plot between caption length and likes."),
          copy("Crie um gráfico de dispersão entre tamanho da legenda e comentários.", "Create a scatter plot between caption length and comments."),
          copy("Crie uma coluna chamada qtd_hashtags, contando quantas hashtags aparecem em cada legenda.", "Create a column called qtd_hashtags by counting how many hashtags appear in each caption."),
          copy("Crie um gráfico de barras com a média de curtidas por quantidade de hashtags.", "Create a bar chart with the average likes by number of hashtags."),
          copy("Crie um gráfico de dispersão entre quantidade de hashtags e total de interações.", "Create a scatter plot between number of hashtags and total interactions."),
          copy("Crie um mapa de calor de correlação entre variáveis numéricas.", "Create a correlation heatmap between numeric variables."),
          copy("Crie uma coluna chamada engajamento_simples, calculando curtidas + comentários + visualizações de vídeo.", "Create a column called engajamento_simples by calculating likes + comments + video views."),
          copy("Crie um ranking visual dos 15 posts com maior engajamento simples.", "Create a visual ranking of the 15 posts with the highest simple engagement."),
        ],
      },
    ],
  },
  {
    slug: "transacoes-pix-fraude",
    title: copy("Transações Pix / Análise de Fraude", "Pix Transactions / Fraud Analysis"),
    shortTitle: copy("Pix Fraude", "Pix Fraud"),
    description: copy(
      "50 exercícios avançados com CSV para gráficos, análise temporal, outliers, correlação e qualidade de dados em transações Pix suspeitas.",
      "50 advanced CSV exercises for charts, temporal analysis, outliers, correlation, and data quality in suspicious Pix transactions."
    ),
    format: "CSV",
    questionCount: 50,
    file: "amostra_transacoes_pix_fraude_10000.csv",
    download: "/datasets/python-pandas/amostra_transacoes_pix_fraude_10000.csv",
    supportFiles: [
      {
        label: copy("Baixar código gerador 2M", "Download 2M generator code"),
        href: "/datasets/python-pandas/gerar_dataset_transacoes_pix_fraude_2M.py",
      },
      {
        label: copy("Baixar dicionário de dados", "Download data dictionary"),
        href: "/datasets/python-pandas/dicionario_dataset_transacoes_pix_fraude.md",
      },
    ],
    structure: [
      copy("Amostra sintética com 10.000 transações Pix para análise de risco, fraude e qualidade de dados.", "Synthetic sample with 10,000 Pix transactions for risk, fraud, and data quality analysis."),
      copy("Colunas principais: transacao_id, cliente_id, data_hora, canal, tipo_chave_pix, categoria, dispositivo, periodo_dia, valor_transacao, taxa_operacao, tempo_processamento_ms, cliente_idade, tempo_conta_meses, qtd_transacoes_24h, saldo_antes, saldo_depois, score_fraude, transacao_suspeita e status_transacao.", "Main columns: transacao_id, cliente_id, data_hora, canal, tipo_chave_pix, categoria, dispositivo, periodo_dia, valor_transacao, taxa_operacao, tempo_processamento_ms, cliente_idade, tempo_conta_meses, qtd_transacoes_24h, saldo_antes, saldo_depois, score_fraude, transacao_suspeita, and status_transacao."),
      copy("Indicado para aulas avançadas de Seaborn, diagnóstico visual, análise multivariada e storytelling analítico.", "Recommended for advanced Seaborn, visual diagnostics, multivariate analysis, and analytical storytelling classes."),
    ],
    setupCode: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

sns.set_theme(style="whitegrid")

df = pd.read_csv("amostra_transacoes_pix_fraude_10000.csv")

df["data_hora"] = pd.to_datetime(df["data_hora"])

df["ano"] = df["data_hora"].dt.year
df["mes"] = df["data_hora"].dt.month
df["dia"] = df["data_hora"].dt.day
df["hora"] = df["data_hora"].dt.hour
df["data"] = df["data_hora"].dt.date
df["dia_semana"] = df["data_hora"].dt.day_name()

df.head()`,
    blocks: [
      {
        title: copy("Diagnóstico visual da qualidade dos dados", "Visual Data Quality Diagnosis"),
        exercises: [
          copy("Crie um gráfico que mostre visualmente a presença ou ausência de dados em todas as colunas do dataset. O objetivo é identificar colunas com dados faltantes, padrões de ausência ou problemas estruturais.", "Create a chart that visually shows the presence or absence of data across all dataset columns. The goal is to identify columns with missing data, missingness patterns, or structural problems."),
          copy("Crie um gráfico de barras horizontais mostrando o percentual de valores ausentes em cada coluna. Mesmo que a base tenha poucos ausentes, prepare a análise para datasets reais.", "Create a horizontal bar chart showing the percentage of missing values in each column. Even if the dataset has few missing values, prepare the analysis for real datasets."),
          copy("Identifique se existem transações duplicadas com base em transacao_id. Depois, crie um gráfico comparando a quantidade de registros únicos e duplicados.", "Identify whether there are duplicated transactions based on transacao_id. Then create a chart comparing the number of unique and duplicated records."),
          copy("Crie uma coluna chamada diferenca_saldo, calculando saldo_antes - valor_transacao - saldo_depois. Depois, crie um histograma para verificar se essa diferença está próxima de zero.", "Create a column called diferenca_saldo by calculating saldo_antes - valor_transacao - saldo_depois. Then create a histogram to check whether this difference is close to zero."),
          copy("Use um boxplot para verificar se há outliers na coluna diferenca_saldo. Explique se os desvios podem indicar erro de cálculo, arredondamento ou inconsistência simulada.", "Use a boxplot to check for outliers in diferenca_saldo. Explain whether deviations may indicate calculation errors, rounding, or simulated inconsistency."),
          copy("Crie uma coluna chamada saldo_negativo, indicando se saldo_depois ficou menor que zero. Depois, crie um gráfico de barras mostrando a quantidade de transações com e sem saldo negativo.", "Create a column called saldo_negativo indicating whether saldo_depois is below zero. Then create a bar chart showing the number of transactions with and without negative balance."),
          copy("Crie um gráfico mostrando a proporção de transações com saldo_depois negativo por canal. Investigue se algum canal concentra mais inconsistências ou riscos financeiros.", "Create a chart showing the proportion of transactions with negative saldo_depois by channel. Investigate whether any channel concentrates more inconsistencies or financial risks."),
          copy("Crie um histograma da coluna cliente_idade. Depois, destaque visualmente faixas etárias incomuns, como clientes muito jovens ou muito idosos.", "Create a histogram of cliente_idade. Then visually highlight unusual age ranges, such as very young or very old customers."),
          copy("Crie uma variável chamada conta_nova, considerando contas com menos de 3 meses. Depois, crie um gráfico comparando a quantidade de contas novas e antigas.", "Create a variable called conta_nova for accounts under 3 months old. Then create a chart comparing the number of new and old accounts."),
          copy("Crie um gráfico de barras mostrando a proporção de transações suspeitas entre contas novas e contas antigas. Analise se contas recentes estão mais associadas a risco.", "Create a bar chart showing the proportion of suspicious transactions between new and old accounts. Analyze whether recent accounts are more associated with risk."),
        ],
      },
      {
        title: copy("Outliers e distribuição dos dados", "Outliers and Data Distribution"),
        exercises: [
          copy("Crie um histograma com KDE da variável valor_transacao. Depois, explique por que a distribuição tende a ser assimétrica.", "Create a histogram with KDE for valor_transacao. Then explain why the distribution tends to be asymmetric."),
          copy("Crie um novo gráfico de distribuição para valor_transacao usando transformação logarítmica. Compare com o gráfico anterior.", "Create a new distribution chart for valor_transacao using a logarithmic transformation. Compare it with the previous chart."),
          copy("Crie um boxplot comparando valor_transacao por status_transacao. Analise se transações recusadas ou em análise possuem valores mais altos.", "Create a boxplot comparing valor_transacao by status_transacao. Analyze whether refused or under-review transactions have higher values."),
          copy("Crie um violinplot para comparar a distribuição do valor das transações entre os diferentes status. Explique a diferença entre o boxplot e o violinplot.", "Create a violin plot to compare transaction value distribution across statuses. Explain the difference between a boxplot and a violin plot."),
          copy("Crie um boxplot de valor_transacao por categoria. Ordene as categorias pela mediana do valor da transação.", "Create a boxplot of valor_transacao by categoria. Order categories by the median transaction value."),
          copy("Calcule os limites inferior e superior usando IQR para valor_transacao. Crie uma coluna outlier_valor. Depois, crie um gráfico mostrando a quantidade de transações normais e outliers.", "Calculate lower and upper limits using IQR for valor_transacao. Create an outlier_valor column. Then create a chart showing the number of normal transactions and outliers."),
          copy("Crie um gráfico mostrando a proporção de transações suspeitas entre outliers e não outliers. Verifique se valores extremos estão associados ao score de fraude.", "Create a chart showing the proportion of suspicious transactions among outliers and non-outliers. Check whether extreme values are associated with fraud score."),
          copy("Crie um histograma com KDE da variável score_fraude. Analise se a maior parte das transações possui baixo, médio ou alto risco.", "Create a histogram with KDE for score_fraude. Analyze whether most transactions have low, medium, or high risk."),
          copy("Crie um boxplot comparando o score_fraude entre os canais de transação. Identifique visualmente quais canais apresentam maior risco.", "Create a boxplot comparing score_fraude across transaction channels. Visually identify which channels show higher risk."),
          copy("Crie um violinplot comparando score_fraude por dispositivo. Analise se dispositivos desconhecidos apresentam maior concentração de risco.", "Create a violin plot comparing score_fraude by device. Analyze whether unknown devices have a higher concentration of risk."),
        ],
      },
      {
        title: copy("Relações entre variáveis e padrões suspeitos", "Relationships Between Variables and Suspicious Patterns"),
        exercises: [
          copy("Crie um scatterplot entre valor_transacao e score_fraude. Use transacao_suspeita como cor.", "Create a scatter plot between valor_transacao and score_fraude. Use transacao_suspeita as color."),
          copy("Repita o gráfico anterior usando o valor da transação em escala logarítmica. Compare a legibilidade dos dois gráficos.", "Repeat the previous chart using transaction value on a logarithmic scale. Compare the readability of both charts."),
          copy("Crie um scatterplot entre qtd_transacoes_24h e score_fraude. Use status_transacao como cor.", "Create a scatter plot between qtd_transacoes_24h and score_fraude. Use status_transacao as color."),
          copy("Crie um scatterplot entre tempo_conta_meses e score_fraude. Analise se contas mais novas tendem a ter maior risco.", "Create a scatter plot between tempo_conta_meses and score_fraude. Analyze whether newer accounts tend to have higher risk."),
          copy("Crie um scatterplot entre saldo_depois e score_fraude. Use uma linha vertical para marcar o saldo zero.", "Create a scatter plot between saldo_depois and score_fraude. Use a vertical line to mark zero balance."),
          copy("Crie um gráfico de barras mostrando a taxa média de transacao_suspeita por periodo_dia. Ordene os períodos de forma lógica: madrugada, manhã, tarde e noite.", "Create a bar chart showing the average transacao_suspeita rate by periodo_dia. Order periods logically: madrugada, manhã, tarde, and noite."),
          copy("Crie um gráfico de barras agrupadas comparando a taxa de fraude por canal e periodo_dia.", "Create a grouped bar chart comparing fraud rate by channel and periodo_dia."),
          copy("Crie um gráfico mostrando a taxa média de fraude por dispositivo. Ordene do dispositivo mais arriscado para o menos arriscado.", "Create a chart showing the average fraud rate by device. Order from the riskiest to the least risky device."),
          copy("Crie um gráfico de barras horizontais com o score médio de fraude por categoria da transação.", "Create a horizontal bar chart with average fraud score by transaction category."),
          copy("Crie um gráfico comparando o score médio de fraude por tipo_chave_pix. Analise se algum tipo de chave apresenta risco mais elevado.", "Create a chart comparing average fraud score by tipo_chave_pix. Analyze whether any key type shows higher risk."),
        ],
      },
      {
        title: copy("Correlação, heatmaps e análise multivariada", "Correlation, Heatmaps, and Multivariate Analysis"),
        exercises: [
          copy("Crie um heatmap de correlação com as variáveis numéricas principais: valor_transacao, taxa_operacao, tempo_processamento_ms, cliente_idade, tempo_conta_meses, qtd_transacoes_24h, saldo_antes, saldo_depois, score_fraude e transacao_suspeita.", "Create a correlation heatmap with the main numeric variables: valor_transacao, taxa_operacao, tempo_processamento_ms, cliente_idade, tempo_conta_meses, qtd_transacoes_24h, saldo_antes, saldo_depois, score_fraude, and transacao_suspeita."),
          copy("Refaça o heatmap anterior usando máscara triangular para evitar repetição visual.", "Redo the previous heatmap using a triangular mask to avoid visual repetition."),
          copy("Crie um gráfico de barras mostrando a correlação de cada variável numérica com score_fraude. Ordene da maior para a menor correlação.", "Create a bar chart showing the correlation of each numeric variable with score_fraude. Sort from highest to lowest correlation."),
          copy("Crie um gráfico de barras mostrando a correlação das variáveis numéricas com transacao_suspeita. Explique quais variáveis parecem mais relacionadas à classificação de suspeita.", "Create a bar chart showing the correlation of numeric variables with transacao_suspeita. Explain which variables seem most related to suspicious classification."),
          copy("Crie um pairplot usando uma amostra de 1.000 registros e as variáveis valor_transacao, qtd_transacoes_24h, tempo_conta_meses e score_fraude. Use transacao_suspeita como cor.", "Create a pairplot using a 1,000-record sample and the variables valor_transacao, qtd_transacoes_24h, tempo_conta_meses, and score_fraude. Use transacao_suspeita as color."),
          copy("Crie um FacetGrid com histogramas de score_fraude, separados por status_transacao. Analise como o score se distribui em transações aprovadas, recusadas e em análise.", "Create a FacetGrid with score_fraude histograms separated by status_transacao. Analyze how the score is distributed across approved, refused, and under-review transactions."),
          copy("Crie pequenos gráficos separados por canal, mostrando a distribuição de valor_transacao. Use transformação logarítmica se necessário.", "Create small charts separated by channel showing the distribution of valor_transacao. Use logarithmic transformation if needed."),
          copy("Crie uma tabela cruzada entre canal e status_transacao. Depois, transforme essa tabela em heatmap.", "Create a crosstab between channel and status_transacao. Then transform this table into a heatmap."),
          copy("Crie uma tabela cruzada entre dispositivo e status_transacao. Depois, visualize com heatmap.", "Create a crosstab between device and status_transacao. Then visualize it with a heatmap."),
          copy("Crie um heatmap cruzando periodo_dia e status_transacao. Analise se determinados períodos concentram mais recusas ou análises.", "Create a heatmap crossing periodo_dia and status_transacao. Analyze whether certain periods concentrate more refusals or reviews."),
        ],
      },
      {
        title: copy("Séries temporais e comportamento transacional", "Time Series and Transactional Behavior"),
        exercises: [
          copy("Agrupe os dados por data e crie um gráfico de linha com a quantidade diária de transações.", "Group the data by date and create a line chart with the daily number of transactions."),
          copy("Crie uma série temporal mostrando o valor total transacionado por dia.", "Create a time series showing the total transaction value per day."),
          copy("Crie um gráfico de linha mostrando a evolução diária do score médio de fraude.", "Create a line chart showing the daily evolution of average fraud score."),
          copy("Crie uma série temporal mostrando a proporção diária de transações suspeitas.", "Create a time series showing the daily proportion of suspicious transactions."),
          copy("Crie um gráfico de barras mostrando a quantidade de transações por hora. Analise os horários de maior movimento.", "Create a bar chart showing the number of transactions by hour. Analyze peak movement times."),
          copy("Crie um gráfico de linha mostrando a taxa média de fraude por hora do dia. Compare com o volume de transações por hora.", "Create a line chart showing the average fraud rate by hour of day. Compare it with transaction volume by hour."),
          copy("Crie um heatmap mostrando a quantidade de transações por dia_semana e hora. Ordene corretamente os dias da semana.", "Create a heatmap showing the number of transactions by dia_semana and hour. Correctly order the days of the week."),
          copy("Crie um heatmap mostrando a taxa média de transacao_suspeita por dia_semana e hora. Compare com o heatmap anterior.", "Create a heatmap showing the average transacao_suspeita rate by dia_semana and hour. Compare it with the previous heatmap."),
          copy("Crie um gráfico mostrando o valor médio das transações por hora. Use periodo_dia como cor ou separação visual.", "Create a chart showing average transaction value by hour. Use periodo_dia as color or visual separation."),
          copy("Monte uma análise visual final com pelo menos 6 gráficos para responder: quais fatores parecem estar mais associados a transações Pix suspeitas? Inclua distribuição do score de fraude, score por canal, score por dispositivo, valor x score, fraude por período do dia e correlação com transacao_suspeita. Ao final, escreva uma conclusão analítica de 10 a 15 linhas.", "Build a final visual analysis with at least 6 charts to answer: which factors seem most associated with suspicious Pix transactions? Include fraud score distribution, score by channel, score by device, value x score, fraud by day period, and correlation with transacao_suspeita. At the end, write a 10-to-15-line analytical conclusion."),
        ],
      },
    ],
  },
];

export function findPandasPracticalExercise(slug) {
  return pandasPracticalExercises.find((exercise) => exercise.slug === slug);
}
