import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import { pandasPracticalExercises } from "../data/pandasPracticalExercises";
import { copy, pick } from "../utils/pandasLocale";

const EXAM_LOGIN = "aluno";
const EXAM_PASSWORD = "123456";
const DEFAULT_STUDENT_NAME = "Aluno";

const examUsers = {
  aluno: {
    name: DEFAULT_STUDENT_NAME,
    welcome: `Bem-vindo ${DEFAULT_STUDENT_NAME}`,
  },
  erico: {
    name: "Prof. Érico Borgonove",
    welcome: "Bem-vindo Mestre dos Magos Prof. Érico Borgonove",
  },
  adonai: { name: "Adonai Clebe Rodrigues Jaques" },
  adrinne: { name: "Adrinne Miranda Vital" },
  alvaro: { name: "Álvaro Gabriel de Aguiar Batista" },
  bianca: { name: "Bianca da Cruz Dutra" },
  chardeney: { name: "Chardeney de Oliveira Corrêa Júnior" },
  davi: { name: "Davi Matheus Ferreira Sales" },
  denis: { name: "Denis Moura de Oliveira Rocha" },
  ederson: { name: "Ederson Barbosa Vieira" },
  enzo: { name: "Enzo Gabriel Figueiredo de Pinho" },
  gabriel: { name: "Gabriel Fellipe Silva de Souza" },
  guilherme: { name: "Guilherme Amorim Monteiro" },
  gustavo: { name: "Gustavo Mendes de Castro" },
  itaina: { name: "Itaina Evangelista Araujo" },
  joao: { name: "Joao Pedro Freire Damasceno" },
  marcus: { name: "Marcus Vinicius Ribeiro Lima" },
  leticis: { name: "Maria Letícia Reis Monteiro" },
  rayara: { name: "Maria Rayara Balieiro Gomes" },
  naiara: { name: "Naiara Andrade Barbosa de Noronha" },
  patrick: { name: "Patrick Suell da Costa Ribeiro" },
  rodrigo: { name: "Rodrigo de Almeida Jaques" },
  rogerio: { name: "Rogerio de Jesus Rodrigues da Silva" },
  safira: { name: "Safira Mendes da Frota" },
  caetano: { name: "Thiago de Carvalho Caetano do Vale" },
  ramos: { name: "Thiago Ramos Nunes" },
};

function normalizeLogin(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getExamUser(login) {
  return examUsers[normalizeLogin(login)];
}

const exerciseLinks = [
  {
    id: "base",
    href: "/disciplinas/python-pandas/exercicios-base",
    title: copy("Exercícios Base de Pandas", "Pandas Base Exercises"),
    description: copy(
      "Pratique Series, DataFrames e arquivos CSV com blocos introdutórios e código inicial.",
      "Practice Series, DataFrames, and CSV files with introductory blocks and starter code."
    ),
    meta: copy("Series, DataFrames e CSV", "Series, DataFrames, and CSV"),
  },
  {
    id: "datasets",
    href: "/disciplinas/python-pandas/exercicios",
    title: copy("Exercícios com Datasets Pandas", "Exercises with Pandas Datasets"),
    description: copy(
      "Resolva listas com datasets de acessos, alunos, vendas e analytics empresarial.",
      "Solve lists with website visits, students, sales, and business analytics datasets."
    ),
    meta: copy("CSV, Excel e analytics", "CSV, Excel, and analytics"),
  },
  {
    id: "prova-anaconda",
    title: copy("Prova Pandas", "Pandas Exam"),
    description: copy(
      "Acesso restrito para avaliação prática com Pandas, Seaborn e Matplotlib.",
      "Restricted access for a practical assessment with Pandas, Seaborn, and Matplotlib."
    ),
    meta: copy("Avaliação prática", "Practical assessment"),
    requiresLogin: true,
  },
];

export default function PythonPandasExerciciosLinks() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loginAluno, setLoginAluno] = useState("");
  const [senha, setSenha] = useState("");
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = {
    back: copy("Voltar para Python Pandas", "Back to Python Pandas"),
    title: copy("Exercícios de Pandas", "Pandas Exercises"),
    description: copy(
      "Escolha uma das listas de exercícios da disciplina para praticar Pandas.",
      "Choose one of the subject's exercise lists to practice Pandas."
    ),
    open: copy("Abrir lista", "Open list"),
    access: copy("Acessar prova", "Access exam"),
    studentName: copy("Login aluno", "Student login"),
    password: copy("Senha", "Password"),
    enter: copy("Entrar", "Enter"),
    cancel: copy("Cancelar", "Cancel"),
    incorrect: copy("Dados incorretos.", "Incorrect data."),
    restrictedAccess: copy("Acesso à Prova Pandas", "Pandas Exam Access"),
  };
  const practicalLinks = pandasPracticalExercises.map((exercise) => ({
    id: exercise.slug,
    href: `/disciplinas/python-pandas/listas-exercicios/${exercise.slug}`,
    title: exercise.title,
    description: exercise.description,
    meta: copy(`${exercise.format} • ${exercise.questionCount || 40} questões`, `${exercise.format} • ${exercise.questionCount || 40} questions`),
  }));
  const allExerciseLinks = [...exerciseLinks, ...practicalLinks];

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-5xl mx-auto">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/python-pandas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {pick(txt.back, isEn)}
        </BackButton>
      </div>

      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v4h14V5H5Zm0 6v8h14v-8H5Zm2 2h4v2H7v-2Zm0 3h7v2H7v-2Zm6-3h4v2h-4v-2Z"
          />
        </svg>
        <span>{pick(txt.title, isEn)}</span>
      </h1>
      <p className="text-slate-400 text-lg mb-10">
        {pick(txt.description, isEn)}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {allExerciseLinks.map((item) => item.requiresLogin ? (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setShowError(false);
              setIsModalOpen(true);
            }}
            className="block text-left"
          >
            <article className="relative overflow-hidden glass theme-hover-border p-8 rounded-2xl h-full transition duration-300 hover:-translate-y-2">
              <p className="text-sm font-semibold text-cyan-300 mb-3">
                {pick(item.meta, isEn)}
              </p>
              <h2 className="text-xl font-semibold text-cyan-400 mb-3">
                {pick(item.title, isEn)}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {pick(item.description, isEn)}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                {pick(txt.access, isEn)}
                <span aria-hidden="true">→</span>
              </span>
            </article>
          </button>
        ) : (
          <Link key={item.id} to={item.href} className="block">
            <article className="relative overflow-hidden glass theme-hover-border p-8 rounded-2xl h-full transition duration-300 hover:-translate-y-2">
              <p className="text-sm font-semibold text-cyan-300 mb-3">
                {pick(item.meta, isEn)}
              </p>
              <h2 className="text-xl font-semibold text-cyan-400 mb-3">
                {pick(item.title, isEn)}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {pick(item.description, isEn)}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                {pick(txt.open, isEn)}
                <span aria-hidden="true">→</span>
              </span>
            </article>
          </Link>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-cyan-950/30">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Prova Pandas
                </p>
                <h2 className="text-2xl font-semibold text-slate-100">
                  {pick(txt.restrictedAccess, isEn)}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100"
                aria-label={pick(txt.cancel, isEn)}
              >
                ×
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                const examUser = getExamUser(loginAluno);

                if (examUser && senha === EXAM_PASSWORD) {
                  window.sessionStorage.setItem("pandasExamAccess", "true");
                  window.sessionStorage.setItem("pandasExamLogin", normalizeLogin(loginAluno) || EXAM_LOGIN);
                  window.sessionStorage.setItem("pandasExamStudentName", examUser.name);
                  window.sessionStorage.setItem("pandasExamWelcome", examUser.welcome || `Bem-vindo ${examUser.name}`);
                  setShowError(false);
                  setIsModalOpen(false);
                  navigate("/disciplinas/python-pandas/prova");
                  return;
                }

                setShowError(true);
              }}
            >
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  {pick(txt.studentName, isEn)}
                </span>
                <input
                  type="text"
                  value={loginAluno}
                  onChange={(event) => {
                    setLoginAluno(event.target.value);
                    setShowError(false);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                  autoComplete="username"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  {pick(txt.password, isEn)}
                </span>
                <input
                  type="password"
                  value={senha}
                  onChange={(event) => {
                    setSenha(event.target.value);
                    setShowError(false);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                  autoComplete="current-password"
                />
              </label>

              {showError && (
                <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                  {pick(txt.incorrect, isEn)}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100"
                >
                  {pick(txt.cancel, isEn)}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  {pick(txt.enter, isEn)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
