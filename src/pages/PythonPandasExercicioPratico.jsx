import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";
import { findPandasPracticalExercise } from "../data/pandasPracticalExercises";
import { copy, localize, pick } from "../utils/pandasLocale";

export default function PythonPandasExercicioPratico() {
  const { exerciseSlug } = useParams();
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const exercise = findPandasPracticalExercise(exerciseSlug);

  if (!exercise) {
    return <Navigate to="/disciplinas/python-pandas/listas-exercicios" replace />;
  }

  const localizedExercise = localize(exercise, isEn);
  const blockStartNumbers = localizedExercise.blocks.reduce((starts, block, index) => {
    const previousStart = starts[index - 1] || 1;
    const previousLength = localizedExercise.blocks[index - 1]?.exercises.length || 0;
    starts.push(index === 0 ? 1 : previousStart + previousLength);
    return starts;
  }, []);
  const txt = {
    back: copy("Voltar para Exercícios de Pandas", "Back to Pandas Exercises"),
    file: copy("Arquivo:", "File:"),
    download: copy("Baixar dataset", "Download dataset"),
    structure: copy("Estrutura do dataset", "Dataset structure"),
    supportMaterials: copy("Materiais de apoio", "Support materials"),
    initialSetup: copy("Preparação inicial obrigatória", "Required initial setup"),
  };

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/python-pandas/listas-exercicios" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {pick(txt.back, isEn)}
        </BackButton>
      </div>

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <PageHeader>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {localizedExercise.format}
          </p>
          <PageTitle className="mb-4 flex items-center gap-3">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
              <path
                fill="currentColor"
                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v4h14V5H5Zm0 6v8h14v-8H5Zm2 2h4v2H7v-2Zm0 3h7v2H7v-2Zm6-3h4v2h-4v-2Z"
              />
            </svg>
            <span>{localizedExercise.title}</span>
          </PageTitle>
          <PageDescription className="max-w-4xl">
            {localizedExercise.description}
          </PageDescription>
          <PageDescription className="mt-4 text-sm">
            {pick(txt.file, isEn)} <code className="text-slate-300">{localizedExercise.file}</code>
          </PageDescription>
        </PageHeader>
        <a
          href={localizedExercise.download}
          download
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          {pick(txt.download, isEn)}
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      {localizedExercise.supportFiles && (
        <Panel as="div" layout="plain" className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.supportMaterials, isEn)}</h2>
          <div className="flex flex-wrap gap-3">
            {localizedExercise.supportFiles.map((file) => (
              <a
                key={file.href}
                href={file.href}
                download
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/20"
              >
                {file.label}
                <span aria-hidden="true">↓</span>
              </a>
            ))}
          </div>
        </Panel>
      )}

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.structure, isEn)}</h2>
        <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
          {localizedExercise.structure.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Panel>

      {localizedExercise.setupCode && (
        <Panel as="div" layout="plain" className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">{pick(txt.initialSetup, isEn)}</h2>
          <CodeBlock>{localizedExercise.setupCode}</CodeBlock>
        </Panel>
      )}

      <div className="space-y-8">
        {localizedExercise.blocks.map((block, blockIndex) => {
          const firstNumber = blockStartNumbers[blockIndex];
          return (
            <Panel as="article" layout="plain" key={block.title}>
              <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{block.title}</h2>
              <ol className="grid gap-3 md:grid-cols-2">
                {block.exercises.map((item, index) => (
                  <li key={item} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 leading-relaxed">
                    <span className="font-semibold text-cyan-300">{firstNumber + index}. </span>
                    {item}
                  </li>
                ))}
              </ol>
            </Panel>
          );
        })}
      </div>
    </PageTemplate>
  );
}
