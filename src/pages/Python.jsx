import { CardGrid, ContentCard, PageDescription, PageHeader, PageTemplate, PageTitle } from "../components/ui/Patterns";
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
    <PageTemplate>
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >
          Voltar para Disciplinas
        </BackButton>
      </div>

      <PageHeader>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Linguagem de programação
        </p>
        <PageTitle className="mb-4">Python</PageTitle>
        <PageDescription>
          Exercícios práticos para consolidar lógica, funções, estruturas de dados, orientação a objetos e pequenos sistemas de terminal.
        </PageDescription>
      </PageHeader>

      <CardGrid>
        {modules.map((module) => (
          <ContentCard key={module.href} to={module.href} title={module.title} headingAs="h2"
            description={module.description} badge={module.tag} action="Abrir exercício" />
        ))}
      </CardGrid>
    </PageTemplate>
  );
}
