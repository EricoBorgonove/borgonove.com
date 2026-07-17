import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";
import { matplotlibChartSections, matplotlibCompleteExample } from "../data/matplotlibCheatSheet";
import { copy, localize, pick } from "../utils/pandasLocale";

const matplotlibCompleteExampleEn = `import matplotlib.pyplot as plt
import pandas as pd

# 1. Preparing the data
data = {
    'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    'Sales': [2500, 3200, 2800, 4100, 3900],
    'Targets': [2000, 3000, 3000, 4000, 4000]
}
df = pd.DataFrame(data)

# 2. Creating the structure (OO Style - the right way to do it)
fig, ax = plt.subplots(figsize=(8, 5))

# 3. Plotting the data
ax.plot(df['Month'], df['Sales'], marker='o', label='Actual Sales', color='blue', linewidth=2)
ax.step(df['Month'], df['Targets'], where='mid', label='Monthly Target', color='red', linestyle='--')

# 4. Advanced customization
ax.set_title('Sales Performance vs Targets', fontsize=14, fontweight='bold')
ax.set_xlabel('Month of 2026')
ax.set_ylabel('Revenue ($)')
ax.legend()
ax.grid(alpha=0.3)

# 5. Finalization
plt.tight_layout()
plt.show()`;

function DataTable({ section }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="min-w-[760px] w-full text-left text-sm bg-slate-950/70">
        <thead className="bg-slate-900/90">
          <tr>
            {section.columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold text-slate-100">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.items.map((item, rowIndex) => (
            <tr key={`${section.id}-${rowIndex}`} className="border-t border-slate-800">
              {section.columns.map((column, columnIndex) => (
                <td key={`${section.id}-${rowIndex}-${column.key}`} className="px-4 py-3 text-slate-300 align-top">
                  {columnIndex === 0 || column.key === "example" ? (
                    <code className={columnIndex === 0 ? "font-semibold text-cyan-300" : "text-slate-200"}>
                      {item[column.key]}
                    </code>
                  ) : (
                    item[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PythonMatplotlib() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const sections = localize(matplotlibChartSections, isEn);
  const txt = {
    back: copy("Voltar para Python Pandas", "Back to Python Pandas"),
    subtitle: copy(
      "Se o Pandas é o cérebro que processa os dados, o Matplotlib é a voz que comunica os resultados.",
      "If Pandas is the brain that processes data, Matplotlib is the voice that communicates the results."
    ),
    whatIs: copy("O que é o Matplotlib?", "What is Matplotlib?"),
    whatIsText: copy(
      "O Matplotlib é a biblioteca fundamental para visualização de dados em Python. Ele cria visualizações estáticas, animadas e interativas, e quase todas as outras bibliotecas de visualização, como Seaborn e o Pandas Plotting, são construídas sobre ele. O módulo mais usado é o",
      "Matplotlib is the foundational data visualization library in Python. It creates static, animated, and interactive visualizations, and almost every other visualization library, such as Seaborn and Pandas Plotting, is built on top of it. The most used module is"
    ),
    pyplotEnd: copy("que oferece uma interface semelhante à do MATLAB.", "which provides an interface similar to MATLAB."),
    install: copy("Instalação", "Installation"),
    installText: copy("No terminal, prompt do Anaconda ou ambiente Python configurado:", "In the terminal, Anaconda prompt, or configured Python environment:"),
    anatomy: copy("A Anatomia de uma Figura", "The Anatomy of a Figure"),
    figure: copy("A janela ou página inteira onde tudo é desenhado.", "The full window or page where everything is drawn."),
    axes: copy("O gráfico em si, a área com os eixos X e Y. Uma Figure pode ter vários Axes.", "The chart itself, the area with the X and Y axes. A Figure can have several Axes."),
    quickNav: copy("Navegação Rápida", "Quick Navigation"),
    completeExample: copy("Exemplo Completo: Do Dado ao Gráfico Profissional", "Complete Example: From Data to Professional Chart"),
    completeText: copy("Exemplo unindo Pandas e Matplotlib para criar um gráfico de qualidade técnica.", "Example combining Pandas and Matplotlib to create a technically solid chart."),
    tips: copy("Dicas de Especialista", "Expert Tips"),
    readyStyles: copy("Estilos Prontos", "Ready-made styles"),
    readyStylesText: copy("para temas rápidos.", "for quick themes."),
    oo: copy("Interface OO", "OO Interface"),
    ooText: copy("Prefira", "Prefer"),
    ooTextEnd: copy("Isso dá mais controle do que usar apenas", "This gives more control than using only"),
    colors: copy("Cores", "Colors"),
    colorsText: copy("Você pode usar nomes, como", "You can use names, such as"),
    colorsTextMid: copy("hexadecimais, como", "hex values, such as"),
    colorsTextEnd: copy("ou escalas de cinza, como", "or grayscale values, such as"),
  };

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-7xl mx-auto">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/python-pandas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {pick(txt.back, isEn)}
        </BackButton>
      </div>

      <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 19h16v2H4a2 2 0 0 1-2-2V3h2v16Zm3-2H5V9h2v8Zm4 0H9V5h2v12Zm4 0h-2v-6h2v6Zm4 0h-2V7h2v10Zm-8.2-5.4 3.3-3.3 2 2L21 5.4 19.6 4l-3.5 3.5-2-2L9.4 10.2 7.7 8.5 6.3 9.9l3.1 3.1 1.4-1.4Z"
          />
        </svg>
        <span>Python Matplotlib</span>
      </h1>
      <p className="text-slate-400 text-lg mb-8">
        {pick(txt.subtitle, isEn)}
      </p>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.whatIs, isEn)}</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {pick(txt.whatIsText, isEn)}{" "}
          <code className="text-cyan-300">pyplot</code>, {pick(txt.pyplotEnd, isEn)}
        </p>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.install, isEn)}</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {pick(txt.installText, isEn)}
        </p>
        <CodeBlock language="bash">{`pip install matplotlib
# ou
conda install matplotlib`}</CodeBlock>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.anatomy, isEn)}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Figure</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {pick(txt.figure, isEn)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Axes</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {pick(txt.axes, isEn)}
            </p>
          </article>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">{pick(txt.quickNav, isEn)}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400 transition"
            >
              {index + 1}. {section.title}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <article key={section.id} id={section.id} className="glass rounded-2xl p-6 md:p-8 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-5">
              {index + 1}. {section.title}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">{section.description}</p>
            <DataTable section={section} />
          </article>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 my-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
          {pick(txt.completeExample, isEn)}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {pick(txt.completeText, isEn)}
        </p>
        <CodeBlock>{isEn ? matplotlibCompleteExampleEn : matplotlibCompleteExample}</CodeBlock>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.tips, isEn)}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">{pick(txt.readyStyles, isEn)}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Use <code className="text-cyan-300">plt.style.use('ggplot')</code> ou{" "}
              <code className="text-cyan-300">plt.style.use('seaborn-v0_8')</code> {pick(txt.readyStylesText, isEn)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">{pick(txt.oo, isEn)}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {pick(txt.ooText, isEn)} <code className="text-cyan-300">fig, ax = plt.subplots()</code>. {pick(txt.ooTextEnd, isEn)}{" "}
              <code className="text-cyan-300">plt.plot()</code>.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">{pick(txt.colors, isEn)}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {pick(txt.colorsText, isEn)} <code className="text-cyan-300">'red'</code>, {pick(txt.colorsTextMid, isEn)}{" "}
              <code className="text-cyan-300">'#FF5733'</code>, {pick(txt.colorsTextEnd, isEn)}{" "}
              <code className="text-cyan-300">'0.5'</code>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
