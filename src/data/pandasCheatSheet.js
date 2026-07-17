export const pandasCheatSheetSections = [
  {
    id: "carregamento-inspecao",
    title: "Carregamento e Inspeção de Dados",
    description: "Antes de transformar, você precisa entender o que tem em mãos.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "pd.read_csv()", description: "Carrega um arquivo CSV para um DataFrame.", example: "df = pd.read_csv('dados.csv')" },
      { command: "df.head()", description: "Exibe as primeiras n linhas, por padrão 5.", example: "df.head(10)" },
      { command: "df.info()", description: "Mostra o resumo técnico: colunas, tipos e memória.", example: "df.info()" },
      { command: "df.describe()", description: "Gera estatísticas descritivas como média e desvio.", example: "df.describe()" },
      { command: "df.shape", description: "Retorna uma tupla com linhas e colunas.", example: "linhas, colunas = df.shape" },
    ],
  },
  {
    id: "criacao-estrutura",
    title: "Criação e Estrutura de Dados",
    description: "Comandos para gerar dados do zero ou entender a anatomia do objeto.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "pd.DataFrame()", description: "Cria um DataFrame a partir de dict, list ou array.", example: "df = pd.DataFrame({'A': [1, 2]})" },
      { command: "pd.Series()", description: "Cria uma Series, uma coluna única.", example: "s = pd.Series([10, 20, 30])" },
      { command: "df.index", description: "Acessa os rótulos das linhas.", example: "df.index.tolist()" },
      { command: "df.columns", description: "Lista ou altera os nomes das colunas.", example: "df.columns = ['Novo1', 'Novo2']" },
      { command: "df.copy()", description: "Cria uma cópia profunda do objeto.", example: "df_backup = df.copy()" },
    ],
  },
  {
    id: "selecao-filtragem",
    title: "Seleção e Filtragem",
    description: "Aqui é onde você fatia seus dados para encontrar o que importa.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "df['coluna']", description: "Seleciona uma única coluna.", example: "df['nome_cliente']" },
      { command: "df.loc[]", description: "Filtra por rótulos, nomes de linhas ou colunas.", example: "df.loc[0:5, 'Preço']" },
      { command: "df.iloc[]", description: "Filtra por índices inteiros, usando posição.", example: "df.iloc[0:5, 0:2]" },
      { command: "df.query()", description: "Filtra dados usando uma expressão em string.", example: "df.query('idade > 25')" },
      { command: "df.drop()", description: "Remove colunas ou linhas específicas.", example: "df.drop(columns=['id'])" },
    ],
  },
  {
    id: "consultas-avancadas",
    title: "Consultas Avançadas e Filtragem Lógica",
    description: "Diferentes formas de extrair fatias específicas de informação.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "df.isin()", description: "Filtra valores que estão em uma lista.", example: "df[df['UF'].isin(['SP', 'RJ'])]" },
      { command: "df.where()", description: "Substitui valores onde a condição é falsa.", example: "df.where(df > 0, 0)" },
      { command: "df.duplicated()", description: "Identifica linhas duplicadas.", example: "df[df.duplicated()]" },
      { command: "df.unique()", description: "Retorna valores únicos de uma Series.", example: "df['categoria'].unique()" },
      { command: "df.nlargest()", description: "Retorna as n linhas com maiores valores.", example: "df.nlargest(5, 'vendas')" },
    ],
  },
  {
    id: "limpeza-manipulacao",
    title: "Limpeza e Manipulação",
    description: "Dados do mundo real costumam vir sujos. Esses comandos são seus melhores amigos.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "df.fillna()", description: "Substitui valores nulos por algo.", example: "df['vendas'].fillna(0)" },
      { command: "df.dropna()", description: "Remove linhas ou colunas com valores nulos.", example: "df.dropna(axis=0)" },
      { command: "df.rename()", description: "Altera o nome de colunas ou índices.", example: "df.rename(columns={'old': 'new'})" },
      { command: "df.astype()", description: "Converte o tipo de dado de uma coluna.", example: "df['preco'].astype(float)" },
      { command: "df.sort_values()", description: "Ordena o DataFrame por uma ou mais colunas.", example: "df.sort_values('data')" },
    ],
  },
  {
    id: "transformacao-vetorizada",
    title: "Transformação e Funções Vetorizadas",
    description: "Onde a mágica da manipulação acontece sem usar loops for.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "df.map()", description: "Mapeia valores de uma Series usando dict ou função.", example: "df['sexo'].map({'M': 0, 'F': 1})" },
      { command: "df.applymap()", description: "Aplica uma função a cada elemento do DataFrame.", example: "df.applymap(lambda x: x * 100)" },
      { command: "df.assign()", description: "Cria novas colunas de forma encadeada.", example: "df.assign(total=df.a + df.b)" },
      { command: "df.replace()", description: "Substitui valores específicos.", example: "df.replace('?', np.nan)" },
      { command: "pd.get_dummies()", description: "Converte variáveis categóricas em colunas 0/1.", example: "pd.get_dummies(df['cor'])" },
    ],
  },
  {
    id: "agrupamento-agregacao",
    title: "Agrupamento e Agregação",
    description: "Para gerar relatórios e insights rápidos.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "df.groupby()", description: "Agrupa dados com base em uma coluna.", example: "df.groupby('categoria').sum()" },
      { command: "df.merge()", description: "Une dois DataFrames no estilo JOIN do SQL.", example: "pd.merge(df1, df2, on='id')" },
      { command: "df.pivot_table()", description: "Cria uma tabela dinâmica.", example: "df.pivot_table(values='venda', index='mes')" },
      { command: "df.value_counts()", description: "Conta ocorrências de valores únicos.", example: "df['cor'].value_counts()" },
      { command: "df.apply()", description: "Aplica uma função a cada linha ou coluna.", example: "df['dobro'] = df['num'].apply(lambda x: x * 2)" },
    ],
  },
  {
    id: "combinacao-reshaping",
    title: "Combinação e Reformatagem (Reshaping)",
    description: "Para lidar com múltiplos datasets e mudar a estrutura da tabela.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "pd.concat()", description: "Empilha DataFrames na vertical ou horizontal.", example: "pd.concat([df1, df2], axis=0)" },
      { command: "df.melt()", description: "Transforma colunas em linhas, despivotando a tabela.", example: "df.melt(id_vars=['nome'])" },
      { command: "df.stack()", description: "Empilha o nível das colunas no índice.", example: "df.stack()" },
      { command: "df.explode()", description: "Transforma cada elemento de uma lista em uma linha.", example: "df.explode('lista_compras')" },
      { command: "df.join()", description: "Une DataFrames baseando-se no índice.", example: "df1.join(df2, lsuffix='_L')" },
    ],
  },
  {
    id: "series-temporais",
    title: "Séries Temporais (Datetime)",
    description: "O Pandas nasceu para finanças, então o suporte a datas é imbatível.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "pd.to_datetime()", description: "Converte strings para objetos de data.", example: "df['data'] = pd.to_datetime(df['data'])" },
      { command: "df.resample()", description: "Reamostra dados, como converter dias em meses.", example: "df.resample('M').mean()" },
      { command: "df.shift()", description: "Desloca dados, útil para calcular delta ou variação.", example: "df['ontem'] = df['venda'].shift(1)" },
      { command: "df.rolling()", description: "Faz cálculos de janelas móveis.", example: "df['media_7d'] = df['venda'].rolling(7).mean()" },
      { command: "df.dt.day_name()", description: "Extrai o nome do dia da semana.", example: "df['data'].dt.day_name()" },
    ],
  },
  {
    id: "estatistica-agregacao",
    title: "Estatística e Agregação",
    description: "Para análise exploratória profunda.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "df.corr()", description: "Calcula a correlação entre colunas.", example: "df.corr(numeric_only=True)" },
      { command: "df.aggregate()", description: "Aplica múltiplas funções de uma vez.", example: "df.agg(['sum', 'mean', 'std'])" },
      { command: "df.pct_change()", description: "Calcula a variação percentual entre linhas.", example: "df['crescimento'] = df['venda'].pct_change()" },
      { command: "df.cumsum()", description: "Calcula soma acumulada.", example: "df['estoque_total'] = df['entrada'].cumsum()" },
      { command: "df.nunique()", description: "Conta quantos valores distintos existem.", example: "df.nunique()" },
    ],
  },
  {
    id: "exportacao-dados",
    title: "Exportação de Dados",
    description: "Para salvar seu trabalho final.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "df.to_csv()", description: "Salva em CSV.", example: "df.to_csv('saida.csv', index=False)" },
      { command: "df.to_excel()", description: "Salva em Excel, requer openpyxl.", example: "df.to_excel('relatorio.xlsx')" },
      { command: "df.to_sql()", description: "Envia os dados para um banco SQL.", example: "df.to_sql('tabela', engine)" },
      { command: "df.to_json()", description: "Exporta para formato JSON.", example: "df.to_json(orient='records')" },
      { command: "df.to_parquet()", description: "Salva em formato Parquet, otimizado para Big Data.", example: "df.to_parquet('dados.parquet')" },
    ],
  },
  {
    id: "configuracoes-opcoes",
    title: "Configurações e Opções Globais",
    description: "Comandos para controlar como o Pandas se comporta e como exibe dados na tela.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "pd.set_option()", description: "Ajusta limites de exibição, como número de colunas.", example: "pd.set_option('display.max_columns', 50)" },
      { command: "pd.get_option()", description: "Verifica o valor atual de uma configuração.", example: "pd.get_option('display.precision')" },
      { command: "pd.reset_option()", description: "Retorna as configurações ao padrão de fábrica.", example: "pd.reset_option('all')" },
      { command: "df.memory_usage()", description: "Retorna o consumo de memória de cada coluna.", example: "df.memory_usage(deep=True)" },
    ],
  },
  {
    id: "strings",
    title: "Manipulação de Strings (.str)",
    description: "Esses métodos são aplicados a colunas de texto, como object ou string.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "df.str.contains()", description: "Verifica se um texto contém um padrão ou regex.", example: "df[df['email'].str.contains('@gmail')]" },
      { command: "df.str.split()", description: "Divide uma string em várias partes.", example: "df['nome'].str.split(' ', expand=True)" },
      { command: "df.str.strip()", description: "Remove espaços em branco no início e fim.", example: "df['cod'].str.strip()" },
      { command: "df.str.extract()", description: "Extrai grupos específicos usando regex.", example: "df['data'].str.extract(r'(\\d{4})')" },
      { command: "df.str.lower/upper", description: "Converte para minúsculo ou maiúsculo.", example: "df['cidade'].str.upper()" },
    ],
  },
  {
    id: "multi-index",
    title: "Multi-Index e Tabelas Hierárquicas",
    description: "Para quando você tem dados complexos com mais de uma dimensão de índice.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "df.set_index()", description: "Define uma ou mais colunas como índice.", example: "df.set_index(['ano', 'mes'])" },
      { command: "df.reset_index()", description: "Transforma o índice de volta em coluna.", example: "df.reset_index()" },
      { command: "df.unstack()", description: "Move o último nível do índice para as colunas.", example: "df.unstack(level=0)" },
      { command: "df.swaplevel()", description: "Inverte a ordem dos níveis de um Multi-Index.", example: "df.swaplevel(0, 1)" },
      { command: "df.xs()", description: "Seleciona uma seção transversal do Multi-Index.", example: "df.xs('2023', level='ano')" },
    ],
  },
  {
    id: "performance",
    title: "Performance e Grandes Volumes",
    description: "Comandos fundamentais para quando o DataFrame começa a travar o computador.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "pd.to_numeric()", description: "Converte para número, lidando com erros.", example: "pd.to_numeric(df['id'], errors='coerce')" },
      { command: "df.sample()", description: "Retorna uma amostra aleatória dos dados.", example: "df.sample(frac=0.1)" },
      { command: "pd.eval()", description: "Avalia expressões matemáticas com alta performance.", example: "pd.eval('df.a + df.b * 10')" },
      { command: "df.select_dtypes()", description: "Filtra colunas por tipo, como apenas números.", example: "df.select_dtypes(include=['number'])" },
      { command: "df.pipe()", description: "Aplica uma sequência de funções ao DataFrame.", example: "df.pipe(limpar).pipe(analisar)" },
    ],
  },
  {
    id: "outliers-discretizacao",
    title: "Tratamento de Outliers e Discretização",
    description: "Para preparar os dados para modelos de Machine Learning.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "pd.cut()", description: "Divide dados contínuos em bins fixos.", example: "pd.cut(df['idade'], bins=[0, 18, 60, 100])" },
      { command: "pd.qcut()", description: "Divide dados em quantis com a mesma quantidade de itens por bin.", example: "pd.qcut(df['renda'], q=4)" },
      { command: "df.clip()", description: "Limita valores abaixo ou acima de um limiar.", example: "df.clip(lower=0, upper=100)" },
      { command: "df.rank()", description: "Atribui posições, ou rankings, aos valores.", example: "df['posicao'] = df['nota'].rank()" },
    ],
  },
];

export const pandasAdvancedSections = [
  {
    id: "otimizacao-dtypes",
    title: "Otimização de Tipos de Dados (Dtypes)",
    description:
      "Por padrão, o Pandas é generoso com a memória, o que pode travar o computador em datasets grandes. Saber converter tipos é essencial.",
    notes: [
      {
        title: "Int8 / Int16 / Int32 / Int64",
        text: "Se sua coluna de idade só vai até 120, você não precisa de um int64. Use int8 para economizar memória.",
      },
      {
        title: "Categorical",
        text: "Se uma coluna tem muitos valores repetidos, como Masculino e Feminino, converta para category. O Pandas armazena o texto uma vez e usa números para representar as repetições.",
      },
    ],
    code: `# Verificando o consumo real em bytes
print(df.memory_usage(deep=True))

# Convertendo para economizar memória
df['genero'] = df['genero'].astype('category')
df['idade'] = pd.to_numeric(df['idade'], downcast='integer')`,
  },
  {
    id: "joins-merges-concats",
    title: "Joins, Merges e Concatenações Detalhadas",
    description:
      "Entender as uniões evita a criação acidental de dados duplicados ou nulos.",
    columns: [
      { key: "operation", label: "Operação" },
      { key: "type", label: "Tipo de União" },
      { key: "usage", label: "Uso Principal" },
    ],
    items: [
      { operation: "Inner Join", type: "Interseção", usage: "Mantém apenas chaves presentes em ambos os DataFrames." },
      { operation: "Left Join", type: "Preservação", usage: "Mantém tudo do DataFrame da esquerda e traz o que encontrar na direita." },
      { operation: "Outer Join", type: "União Total", usage: "Mantém todos os registros de ambos e preenche com NaN onde não há par." },
      { operation: "Cross Join", type: "Produto Cartesiano", usage: "Combina cada linha da esquerda com todas as linhas da direita." },
    ],
    code: "df_final = pd.merge(df1, df2, on='chave_comum', how='left')",
  },
  {
    id: "window-functions",
    title: "Operações de Janela (Window Functions)",
    description:
      "Funções avançadas para análise de tendências, suavização de ruído e sinais ao longo do tempo.",
    notes: [
      {
        title: "Rolling (Janela Móvel)",
        text: "Usada para suavizar ruídos, como médias móveis.",
      },
      {
        title: "Expanding (Janela Expansiva)",
        text: "Acumula estatísticas desde o início do dataset até o ponto atual.",
      },
      {
        title: "EWM (Exponential Weighted Moving)",
        text: "Dá mais peso aos dados recentes, comum em análises financeiras e trading.",
      },
    ],
    code: `# Média móvel de 30 dias para análise de preços
df['media_30d'] = df['preco'].rolling(window=30).mean()`,
  },
  {
    id: "dados-ausentes-avancado",
    title: "Tratamento de Dados Ausentes (Aprofundado)",
    description:
      "Não apenas apague os dados. Entenda por que eles estão faltando antes de escolher a técnica.",
    notes: [
      {
        title: "MCAR (Missing Completely at Random)",
        text: "Falha técnica aleatória, sem relação com outras variáveis.",
      },
      {
        title: "MAR (Missing at Random)",
        text: "O dado falta devido a outra variável, como um grupo responder menos a determinado tipo de pesquisa.",
      },
      {
        title: "MNAR (Not at Random)",
        text: "O dado falta por causa do próprio valor, como pessoas com salários muito altos não declararem renda.",
      },
    ],
    columns: [
      { key: "command", label: "Técnica" },
      { key: "usage", label: "Quando usar" },
    ],
    items: [
      { command: "df.interpolate()", usage: "Preenche lacunas seguindo a tendência dos números vizinhos, ótimo para sensores e séries temporais." },
      { command: "df.fillna(method='ffill')", usage: "Propaga o último valor válido para frente." },
    ],
  },
  {
    id: "vectorization-vs-apply",
    title: "Otimização de Performance: Vectorization vs Apply",
    description:
      "O erro número 1 é usar apply para tudo. Prefira operações vetorizadas sempre que possível.",
    columns: [
      { key: "level", label: "Nível" },
      { key: "approach", label: "Abordagem" },
      { key: "detail", label: "Leitura prática" },
    ],
    items: [
      { level: "Nível 1", approach: "Vetorização", detail: "Operações nativas do Pandas, como df['a'] + df['b']. É a mais rápida." },
      { level: "Nível 2", approach: "Numpy Ufuncs", detail: "Funções como np.log(df['a']). Quase tão rápido quanto a vetorização nativa." },
      { level: "Nível 3", approach: "Apply", detail: "É um loop for disfarçado. Use apenas quando não houver alternativa matemática clara." },
    ],
  },
  {
    id: "diagnostico-auditoria",
    title: "Comandos de Diagnóstico e Auditoria",
    description:
      "Antes de analisar, audite se os dados são confiáveis.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "reveal", label: "O que ele revela" },
    ],
    items: [
      { command: "df.isna().sum()", reveal: "Total de nulos por coluna." },
      { command: "df.nunique()", reveal: "Cardinalidade, ou quantos valores distintos existem." },
      { command: "df.skew()", reveal: "Assimetria da distribuição, útil para escolher modelos de Machine Learning." },
      { command: "df.profile_report()", reveal: "Com ydata-profiling, gera um relatório HTML completo." },
    ],
  },
];
