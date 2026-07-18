import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

const modules = [
  {
    title: "POO: Sistema de Estacionamento",
    description:
      "Exercício prático para treinar classes, objetos, dicionários, validações, datas, horários e menu interativo em Python.",
    href: "/disciplinas/python/estacionamento",
    tag: "Programação Orientada a Objetos",
  },
];

export default function Python() {
  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >
          Voltar para Disciplinas
        </BackButton>
      </div>

      <div className="mb-10 max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Linguagem de programação
        </p>
        <h1 className="mb-4 text-4xl font-black md:text-5xl">Python</h1>
        <p className="text-lg leading-relaxed text-slate-400">
          Exercícios práticos para consolidar lógica, funções, estruturas de dados, orientação a objetos e pequenos sistemas de terminal.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {modules.map((module) => (
          <Link key={module.href} to={module.href} className="group block">
            <article className="glass theme-hover-border h-full rounded-2xl p-6 transition duration-300 hover:-translate-y-1">
              <span className="mb-4 inline-flex rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                {module.tag}
              </span>
              <h2 className="mb-3 text-2xl font-semibold text-slate-100">{module.title}</h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">{module.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                Abrir exercício
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
