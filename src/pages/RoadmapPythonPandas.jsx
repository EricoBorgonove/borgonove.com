import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { copy, localize, pick } from "../utils/pandasLocale";

const semanas = [
  {
    titulo: copy("Semana 1: Anatomia, Estrutura e Ingestão", "Week 1: Anatomy, Structure, and Ingestion"),
    resumo: copy("Entender como o Pandas organiza a memória e como trazer dados de qualquer lugar.", "Understand how Pandas organizes memory and how to bring data from anywhere."),
    blocos: [
      {
        titulo: copy("Fundamentos de Memória", "Memory Fundamentals"),
        itens: [
          copy("Diferença entre copy vs view.", "Difference between copy vs view."),
          copy("Por que o erro SettingWithCopyWarning acontece.", "Why the SettingWithCopyWarning happens."),
        ],
      },
      {
        titulo: copy("Ingestão de Dados Multiformato", "Multi-format Data Ingestion"),
        itens: [
          copy("read_csv() com chunksize para arquivos gigantes e usecols para economizar memória.", "read_csv() with chunksize for huge files and usecols to save memory."),
          copy("read_excel() lidando com múltiplas abas.", "read_excel() handling multiple sheets."),
          copy("read_sql() conectando Pandas diretamente a bancos como SQLite e PostgreSQL.", "read_sql() connecting Pandas directly to databases such as SQLite and PostgreSQL."),
        ],
      },
      {
        titulo: copy("Inspeção Cirúrgica", "Surgical Inspection"),
        itens: [
          copy("df.memory_usage(deep=True) para auditar o peso de cada coluna.", "df.memory_usage(deep=True) to audit the weight of each column."),
          copy("Diferença entre index, eixo 0, e columns, eixo 1.", "Difference between index, axis 0, and columns, axis 1."),
        ],
      },
    ],
  },
  {
    titulo: copy("Semana 2: Manipulação Vetorizada e Limpeza Profunda", "Week 2: Vectorized Manipulation and Deep Cleaning"),
    resumo: copy("Aprender a pensar em blocos de dados em vez de linhas individuais.", "Learn to think in data blocks instead of individual rows."),
    blocos: [
      {
        titulo: copy("Lógica Vetorizada", "Vectorized Logic"),
        itens: [
          copy("Por que df['a'] + df['b'] é muito mais rápido que loops.", "Why df['a'] + df['b'] is much faster than loops."),
          copy("Conceito de SIMD: Single Instruction, Multiple Data.", "SIMD concept: Single Instruction, Multiple Data."),
        ],
      },
      {
        titulo: copy("Filtragem de Elite", "Advanced Filtering"),
        itens: [
          copy("Máscaras booleanas complexas: df[(condicao_A) & ~(condicao_B)].", "Complex boolean masks: df[(condition_A) & ~(condition_B)]."),
          copy("Uso de .loc[] para rótulo e .iloc[] para posição.", "Use .loc[] for labels and .iloc[] for position."),
        ],
      },
      {
        titulo: copy("Dados Inconsistentes", "Inconsistent Data"),
        itens: [
          copy("Regex com .str.extract() e .str.replace().", "Regex with .str.extract() and .str.replace()."),
          copy("Identificação de outliers com IQR usando df.quantile().", "Outlier identification with IQR using df.quantile()."),
        ],
      },
    ],
  },
  {
    titulo: copy("Semana 3: Transformações Complexas e Agregações", "Week 3: Complex Transformations and Aggregations"),
    resumo: copy("Remodelar tabelas para extrair inteligência de negócio.", "Reshape tables to extract business intelligence."),
    blocos: [
      {
        titulo: copy("Split-Apply-Combine", "Split-Apply-Combine"),
        itens: [
          copy("Como o groupby() funciona por debaixo do capô.", "How groupby() works under the hood."),
          copy("Agregações nomeadas com faturamento_total e ticket_medio.", "Named aggregations with faturamento_total and ticket_medio."),
        ],
      },
      {
        titulo: copy("Remodelagem", "Reshaping"),
        itens: [
          copy("pivot_table() para relatórios estilo Excel.", "pivot_table() for Excel-style reports."),
          copy("melt() para transformar tabelas largas em longas.", "melt() to transform wide tables into long tables."),
          copy("stack() e unstack() para manipular níveis de índices.", "stack() and unstack() to manipulate index levels."),
        ],
      },
      {
        titulo: copy("Joins de Dados", "Data Joins"),
        itens: [
          copy("Diferença prática entre merge(), baseado em colunas, e join(), baseado em índices.", "Practical difference between merge(), based on columns, and join(), based on indexes."),
        ],
      },
    ],
  },
  {
    titulo: copy("Semana 4: Séries Temporais e Engenharia de Performance", "Week 4: Time Series and Performance Engineering"),
    resumo: copy("Lidar com tempo, arquivos eficientes e grandes volumes locais.", "Handle time, efficient files, and large local volumes."),
    blocos: [
      {
        titulo: copy("Datetime Avançado", "Advanced Datetime"),
        itens: [
          copy("Criação de intervalos com pd.date_range().", "Create ranges with pd.date_range()."),
          copy("Cálculo de Lag e Lead com shift().", "Calculate Lag and Lead with shift()."),
          copy("resample() para converter segundos em minutos ou dias em trimestres.", "resample() to convert seconds into minutes or days into quarters."),
        ],
      },
      {
        titulo: copy("Big Data Local", "Local Big Data"),
        itens: [
          copy("Conversão de tipos object para category.", "Convert object types to category."),
          copy("Uso de formatos binários como to_parquet() e to_feather().", "Use binary formats such as to_parquet() and to_feather()."),
        ],
      },
      {
        titulo: copy("Estética e Estilo", "Aesthetics and Style"),
        itens: [
          copy("Uso do df.style para colorir células diretamente no Jupyter.", "Use df.style to color cells directly in Jupyter."),
          copy("Destaque visual de valores negativos, máximos, mínimos e faixas críticas.", "Visually highlight negative values, maximums, minimums, and critical ranges."),
        ],
      },
    ],
  },
];

const projetoFinal = [
  copy("Baixe um dataset de Preços de Combustíveis no Brasil usando dados públicos.", "Download a Brazilian Fuel Prices dataset using public data."),
  copy("Remova nulos, converta datas e trate colunas de preço com vírgula em vez de ponto.", "Remove nulls, convert dates, and handle price columns with commas instead of dots."),
  copy("Crie uma coluna com a média móvel de 7 dias do preço da gasolina.", "Create a column with the 7-day moving average of gasoline price."),
  copy("Gere uma tabela dinâmica com preço médio por Estado e por Mês.", "Generate a pivot table with average price by State and Month."),
  copy("Converta Estado e Região para category e compare o tamanho antes e depois.", "Convert State and Region to category and compare size before and after."),
  copy("Salve o resultado final em um arquivo .parquet.", "Save the final result in a .parquet file."),
];

const checklist = [
  { nivel: copy("Iniciante", "Beginner"), competencia: copy("Abrir CSV e filtrar colunas.", "Open CSV files and filter columns.") },
  { nivel: copy("Intermediário", "Intermediate"), competencia: copy("Agrupar dados e tratar valores nulos.", "Group data and handle null values.") },
  { nivel: copy("Avançado", "Advanced"), competencia: copy("Unir tabelas diferentes e manipular datas.", "Join different tables and manipulate dates.") },
  { nivel: copy("Expert", "Expert"), competencia: copy("Otimizar memória e criar funções vetorizadas complexas.", "Optimize memory and create complex vectorized functions.") },
];

export default function RoadmapPythonPandas() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const weeks = localize(semanas, isEn);
  const finalProject = localize(projetoFinal, isEn);
  const checklistItems = localize(checklist, isEn);
  const txt = {
    backPandas: copy("Voltar para Pandas", "Back to Pandas"),
    backRoadmaps: copy("Voltar para Roadmaps", "Back to Roadmaps"),
    title: copy("Roadmap de Maestria em Pandas", "Pandas Mastery Roadmap"),
    subtitle: copy(
      "Do zero ao arquiteto de dados: quatro semanas para dominar ingestão, limpeza, agregação, tempo e performance.",
      "From zero to data architect: four weeks to master ingestion, cleaning, aggregation, time, and performance."
    ),
    finalExercise: copy("Exercício de Graduação: Projeto Final", "Graduation Exercise: Final Project"),
    competencies: copy("Checklist de Competências", "Competency Checklist"),
    level: copy("Nível", "Level"),
    competency: copy("Competência", "Competency"),
    ready: copy("Você se sente pronto para começar a Semana 1?", "Do you feel ready to start Week 1?"),
  };

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-wrap gap-4">
        <Link
          to="/disciplinas/python-pandas"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1em] w-[1em] shrink-0">
            <path
              fill="currentColor"
              d="M10.7 5.3a1 1 0 0 1 0 1.4L6.42 11H20a1 1 0 1 1 0 2H6.41l4.3 4.3a1 1 0 1 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.41 0Z"
            />
          </svg>
          {pick(txt.backPandas, isEn)}
        </Link>
        <Link
          to="/roadmaps"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1em] w-[1em] shrink-0">
            <path
              fill="currentColor"
              d="M10.7 5.3a1 1 0 0 1 0 1.4L6.42 11H20a1 1 0 1 1 0 2H6.41l4.3 4.3a1 1 0 1 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.41 0Z"
            />
          </svg>
          {pick(txt.backRoadmaps, isEn)}
        </Link>
      </div>

      <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 4h16v4H4V4Zm0 6h6v10H6a2 2 0 0 1-2-2v-8Zm8 0h8v8a2 2 0 0 1-2 2h-6V10Zm2 2v2h4v-2h-4Zm0 4v2h3v-2h-3ZM6 12v2h2v-2H6Zm0 4v2h2v-2H6Z"
          />
        </svg>
        <span>{pick(txt.title, isEn)}</span>
      </h1>
      <p className="text-slate-400 text-lg mb-8">
        {pick(txt.subtitle, isEn)}
      </p>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {weeks.map((semana, index) => (
          <article key={semana.titulo} className="glass rounded-2xl p-6 md:p-8">
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 text-lg font-black text-cyan-300">
                {index + 1}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2">{semana.titulo}</h2>
                <p className="text-sm text-slate-400 leading-relaxed">{semana.resumo}</p>
              </div>
            </div>

            <div className="space-y-4">
              {semana.blocos.map((bloco) => (
                <div key={bloco.titulo} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">{bloco.titulo}</h3>
                  <ul className="space-y-2 text-sm text-slate-300 leading-relaxed">
                    {bloco.itens.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.finalExercise, isEn)}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {finalProject.map((item, index) => (
            <p key={item} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-cyan-300">{index + 1}. </span>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{pick(txt.competencies, isEn)}</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="min-w-[680px] w-full text-left text-sm bg-slate-950/70">
            <thead className="bg-slate-900/90">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-100">{pick(txt.level, isEn)}</th>
                <th className="px-4 py-3 font-semibold text-slate-100">{pick(txt.competency, isEn)}</th>
              </tr>
            </thead>
            <tbody>
              {checklistItems.map((item) => (
                <tr key={item.nivel} className="border-t border-slate-800">
                  <td className="px-4 py-3 font-semibold text-cyan-300">{item.nivel}</td>
                  <td className="px-4 py-3 text-slate-300">{item.competencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm text-slate-400">
          {pick(txt.ready, isEn)}
        </p>
      </div>
    </section>
  );
}
