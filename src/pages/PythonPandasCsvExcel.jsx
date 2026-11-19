import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import { copy, localize, pick } from "../utils/pandasLocale";

const structureRows = [
  { feature: copy("Formato", "Format"), csv: copy("Texto simples (Plain Text).", "Plain text."), excel: copy("Binário (XML compactado).", "Binary (compressed XML).") },
  { feature: copy("Velocidade", "Speed"), csv: copy("Muito rápido para ler e salvar.", "Very fast to read and save."), excel: copy("Mais lento, exige processamento para descompactar.", "Slower, requires processing to decompress.") },
  { feature: copy("Peso", "File size"), csv: copy("Arquivos leves, apenas os dados.", "Light files, data only."), excel: copy("Arquivos pesados, incluem estilos, cores e fórmulas.", "Heavier files, include styles, colors, and formulas.") },
  { feature: copy("Capacidade", "Capacity"), csv: copy("Ilimitado, depende da memória do computador.", "Unlimited, depends on computer memory."), excel: copy("Limite de 1.048.576 linhas por aba.", "Limit of 1,048,576 rows per sheet.") },
  { feature: copy("Abas", "Sheets"), csv: copy("Apenas uma tabela por arquivo.", "Only one table per file."), excel: copy("Suporta múltiplas abas.", "Supports multiple sheets.") },
];

const commandRows = [
  { task: copy("Leitura Básica", "Basic reading"), csv: "df = pd.read_csv('dados.csv')", excel: "df = pd.read_excel('dados.xlsx')" },
  { task: copy("Definir Separador", "Set separator"), csv: "sep=';'", excel: copy("Não existe separador em binário", "No separator exists in binary files") },
  { task: copy("Escolher Aba", "Choose sheet"), csv: copy("Não suporta", "Not supported"), excel: "sheet_name='Vendas_2024'" },
  { task: copy("Pular Linhas", "Skip rows"), csv: "skiprows=2", excel: "skiprows=2" },
  { task: copy("Salvar", "Save"), csv: "df.to_csv('saida.csv')", excel: "df.to_excel('saida.xlsx')" },
];

function ComparisonTable({ rows, columns }) {
  return (
    <TableContainer className="rounded-2xl border border-slate-800">
      <Table className="min-w-[760px] w-full text-left text-sm bg-slate-950/70">
        <thead className="bg-slate-900/90">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold text-slate-100">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[columns[0].key]} className="border-t border-slate-800">
              {columns.map((column, index) => (
                <td key={column.key} className="px-4 py-3 text-slate-300 align-top">
                  {index === 0 ? (
                    <span className="font-semibold text-cyan-300">{row[column.key]}</span>
                  ) : column.code ? (
                    <code className="text-slate-200">{row[column.key]}</code>
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default function PythonPandasCsvExcel() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const rows = {
    structure: localize(structureRows, isEn),
    commands: localize(commandRows, isEn),
  };
  const txt = {
    back: copy("Voltar para Tabelas de Referência", "Back to Reference Tables"),
    subtitle: copy("É a mesma coisa usar um Excel ou um CSV no Pandas? A resposta curta é: não.", "Is using Excel or CSV in Pandas the same thing? The short answer is: no."),
    practicalAnswer: copy("Resposta prática", "Practical answer"),
    practicalText: copy(
      "Embora o resultado final dentro do Pandas seja o mesmo, um DataFrame, a forma como o arquivo é estruturado, a performance e a confiabilidade mudam bastante. CSV é texto simples, leve e direto. Excel é um arquivo mais rico, com abas, tipos, estilos e metadados, mas custa mais processamento.",
      "Although the final result inside Pandas is the same, a DataFrame, the file structure, performance, and reliability change a lot. CSV is plain text, light, and direct. Excel is a richer file with sheets, types, styles, and metadata, but it costs more processing."
    ),
    structureTitle: copy("1. Diferença de Estrutura: Texto vs. Binário", "1. Structure Difference: Text vs. Binary"),
    feature: copy("Característica", "Feature"),
    csvPandas: copy("2. CSV no Pandas", "2. CSV in Pandas"),
    csvText: copy("O CSV é simples: ele não sabe o que é data, número ou moeda. O Pandas precisa inferir o tipo de cada coluna ao ler o texto.", "CSV is simple: it does not know what a date, number, or currency is. Pandas must infer each column type while reading the text."),
    advantage: copy("Vantagem:", "Advantage:"),
    csvAdvantage: copy("universal, qualquer sistema gera CSV.", "universal, any system can generate CSV."),
    attention: copy("Atenção:", "Watch out:"),
    csvAttention: copy("no Brasil, o separador pode ser ponto e vírgula, exigindo", "in Brazil, the separator may be a semicolon, requiring"),
    excelText: copy("O Excel guarda metadados sobre células, abas, tipos e formatações, por isso consegue preservar algumas informações com mais fidelidade.", "Excel stores metadata about cells, sheets, types, and formatting, so it can preserve some information more faithfully."),
    excelAdvantage: copy("permite escolher abas com", "lets you choose sheets with"),
    excelAttention: copy("exige bibliotecas extras, como", "requires extra libraries, such as"),
    excelAttentionEnd: copy("e usa mais CPU e memória.", "and uses more CPU and memory."),
    commandsTitle: copy("3. Comparativo de Comandos", "3. Command Comparison"),
    task: copy("Tarefa", "Task"),
    noCsv: copy("No CSV", "In CSV"),
    noExcel: copy("No Excel", "In Excel"),
    whenCsv: copy("Quando usar CSV?", "When to use CSV?"),
    csvWhen: [
      copy("Quando o dataset for grande, acima de 100MB ou 500 mil linhas.", "When the dataset is large, above 100MB or 500 thousand rows."),
      copy("Quando estiver movendo dados entre sistemas, como SQL para Python.", "When moving data between systems, such as SQL to Python."),
      copy("Quando velocidade de processamento for prioridade.", "When processing speed is the priority."),
    ],
    whenExcel: copy("Quando usar Excel?", "When to use Excel?"),
    excelWhen: [
      copy("Quando os dados forem inseridos manualmente por pessoas.", "When data is entered manually by people."),
      copy("Quando você precisar ler uma aba específica de um relatório complexo.", "When you need to read a specific sheet from a complex report."),
      copy("Quando houver datas ou formatos que precisam de mais contexto do arquivo original.", "When there are dates or formats that need more context from the original file."),
    ],
    trap: copy("A armadilha do Excel", "The Excel trap"),
    trapText: copy(
      "Muitos arquivos Excel têm células mescladas, títulos no meio da planilha ou múltiplas tabelas na mesma aba. Isso quebra a leitura automática do Pandas. O CSV, por ser texto bruto, força os dados a ficarem mais perto de uma tabela limpa.",
      "Many Excel files have merged cells, titles in the middle of the sheet, or multiple tables in the same sheet. This breaks automatic Pandas reading. CSV, because it is raw text, forces data to stay closer to a clean table."
    ),
    proTip: copy("Dica de Pro: se você tem um arquivo gigante e quer velocidade com mais inteligência, use Parquet com", "Pro tip: if you have a huge file and want speed with more intelligence, use Parquet with"),
    proTipEnd: copy("Ele é um padrão forte na Engenharia de Dados atual.", "It is a strong standard in modern Data Engineering."),
  };

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/python-pandas/tabelas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {pick(txt.back, isEn)}
        </BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 4h7v2H6v12h5v2H4V4Zm9 0h7v16h-7v-2h5V6h-5V4ZM8 9h4v2H8V9Zm0 4h4v2H8v-2Zm6-4h2v2h-2V9Zm0 4h2v2h-2v-2Z"
          />
        </svg>
        <span>CSV x Excel no Pandas</span>
      </PageTitle>
      <PageDescription>
        {pick(txt.subtitle, isEn)}
      </PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.practicalAnswer, isEn)}</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {pick(txt.practicalText, isEn)}
        </p>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{pick(txt.structureTitle, isEn)}</h2>
        <ComparisonTable
          rows={rows.structure}
          columns={[
            { key: "feature", label: pick(txt.feature, isEn) },
            { key: "csv", label: "CSV" },
            { key: "excel", label: "Excel (.xlsx, .xls)" },
          ]}
        />
      </Panel>

      <div className="grid gap-8 lg:grid-cols-2 mb-8">
        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.csvPandas, isEn)}</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {pick(txt.csvText, isEn)}
          </p>
          <div className="space-y-3 text-sm text-slate-300">
            <p><span className="font-semibold text-cyan-300">{pick(txt.advantage, isEn)}</span> {pick(txt.csvAdvantage, isEn)}</p>
            <p><span className="font-semibold text-cyan-300">{pick(txt.attention, isEn)}</span> {pick(txt.csvAttention, isEn)} <code className="text-slate-200">sep=';'</code>.</p>
          </div>
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Excel no Pandas</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {pick(txt.excelText, isEn)}
          </p>
          <div className="space-y-3 text-sm text-slate-300">
            <p><span className="font-semibold text-cyan-300">{pick(txt.advantage, isEn)}</span> {pick(txt.excelAdvantage, isEn)} <code className="text-slate-200">sheet_name</code>.</p>
            <p><span className="font-semibold text-cyan-300">{pick(txt.attention, isEn)}</span> {pick(txt.excelAttention, isEn)} <code className="text-slate-200">openpyxl</code>, {pick(txt.excelAttentionEnd, isEn)}</p>
          </div>
        </Panel>
      </div>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{pick(txt.commandsTitle, isEn)}</h2>
        <ComparisonTable
          rows={rows.commands}
          columns={[
            { key: "task", label: pick(txt.task, isEn) },
            { key: "csv", label: pick(txt.noCsv, isEn), code: true },
            { key: "excel", label: pick(txt.noExcel, isEn), code: true },
          ]}
        />
      </Panel>

      <div className="grid gap-8 lg:grid-cols-2 mb-8">
        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.whenCsv, isEn)}</h2>
          <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
            {txt.csvWhen.map((item) => <li key={item.pt}>{pick(item, isEn)}</li>)}
          </ul>
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.whenExcel, isEn)}</h2>
          <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
            {txt.excelWhen.map((item) => <li key={item.pt}>{pick(item, isEn)}</li>)}
          </ul>
        </Panel>
      </div>

      <Panel as="div" layout="plain">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.trap, isEn)}</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {pick(txt.trapText, isEn)}
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          {pick(txt.proTip, isEn)}{" "}
          <code className="text-cyan-300">df.to_parquet()</code>. {pick(txt.proTipEnd, isEn)}
        </p>
      </Panel>
    </PageTemplate>
  );
}
