import { useContentTranslation } from "../hooks/useContentTranslation";
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
  const { text: uiText } = useContentTranslation();

  return (
    <PageTemplate>
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >{uiText("Voltar para Disciplinas")}</BackButton>
      </div>

      <PageHeader>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{uiText("Linguagem de programação")}</p>
        <PageTitle className="mb-4">{uiText("Python")}</PageTitle>
        <PageDescription>{uiText("Exercícios práticos para consolidar lógica, funções, estruturas de dados, orientação a objetos e pequenos sistemas de terminal.")}</PageDescription>
      </PageHeader>

      <CardGrid>
        {modules.map((module) => (
          <ContentCard key={module.href} to={module.href} title={uiText(module.title)} headingAs="h2"
            description={uiText(module.description)} badge={uiText(module.tag)} action={uiText("Abrir exercício")} />
        ))}
      </CardGrid>
    </PageTemplate>
  );
}
