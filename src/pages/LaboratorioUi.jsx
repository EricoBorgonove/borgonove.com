import { useContentTranslation } from "../hooks/useContentTranslation";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Button, CardGrid, ContentCard, EmptyState, Field, Notice, PageTemplate, Panel, Section } from "../components/ui/Patterns";

const base = "/laboratorio-ui";
const examples = [
  { slug: "catalogo", title: "Catálogo", description: "Listas de disciplinas, módulos e ferramentas com cards consistentes." },
  { slug: "conteudo", title: "Conteúdo", description: "Aulas e materiais com hierarquia de títulos e leitura confortável." },
  { slug: "formulario", title: "Formulário", description: "Campos, validação, ações e resultados com o mesmo padrão." },
];

function DemoForm() {
  const { text: uiText, message: uiMessage } = useContentTranslation();

  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");
  const error = submitted && !name.trim() ? "Informe seu nome para continuar." : "";
  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
    setResult(name.trim());
  }
  function reset() {
    setName(""); setSubmitted(false); setResult("");
  }
  return <div className="ui-demo-columns">
    <Panel title={uiText("Dados da demonstração")}>
      <form onSubmit={submit} noValidate className="ui-stack">
        <Field label={uiText("Seu nome")} name="name" autoComplete="name" required value={name} onChange={(event) => { setName(event.target.value); setResult(""); }} hint={uiText("Este exemplo funciona localmente e não salva dados.")} error={uiMessage(error)} />
        <div className="ui-actions"><Button type="submit">{uiText("Testar formulário")}</Button><Button variant="secondary" onClick={reset}>{uiText("Limpar")}</Button></div>
      </form>
    </Panel>
    <Panel title={uiText("Resultado")}>
      {result ? <Notice>{uiText("Olá, ")}{result}{uiText("! O formulário foi validado com sucesso.")}</Notice> : <EmptyState title={uiText("Nenhum resultado ainda")} description={uiText("Envie o formulário para visualizar o estado de sucesso. Deixe o nome vazio para testar o erro.")} />}
    </Panel>
  </div>;
}

export default function LaboratorioUi() {
  const { text: uiText } = useContentTranslation();

  const { example } = useParams();
  const selected = examples.find(({ slug }) => slug === example);
  const breadcrumbs = [{ label: "Início", to: "/" }, ...(example ? [{ label: "Laboratório UI", to: base }, { label: selected?.title || "Exemplo não encontrado" }] : [{ label: "Laboratório UI" }])];
  return <PageTemplate eyebrow={uiText("Ambiente de validação visual")} title={selected ? uiText("Template de {{0}}", [uiText(selected.title)]) : uiText(example ? "Exemplo não encontrado" : "Laboratório de componentes")} description={uiText(selected?.description || "Uma base compartilhada para construir telas consistentes. Valide os exemplos no celular e nos temas claro e escuro pelo menu do site.")} breadcrumbs={breadcrumbs} actions={example && <Button to={base} variant="secondary">{uiText("Voltar ao laboratório")}</Button>}>
    <Notice>{uiText("Área de testes com conteúdo demonstrativo. Estes componentes também são usados nas telas do site; valide aqui as alterações no padrão compartilhado.")}</Notice>
    {!example && <>
      <Section title={uiText("Telas de referência")} description={uiText("Três composições construídas com os mesmos componentes e medidas.")}>
        <CardGrid>{examples.map((item) => <ContentCard key={item.slug} title={uiText(item.title)} description={uiText(item.description)} badge={uiText("Template")} to={`${base}/${item.slug}`} action={uiText("Abrir demonstração")} />)}</CardGrid>
      </Section>
      <Section title={uiText("Elementos básicos")} description={uiText("Botões, etiquetas, campos e mensagens reutilizáveis.")}>
        <Panel title={uiText("Ações e estados")}><div className="ui-actions"><Button to={`${base}/formulario`}>{uiText("Ação principal")}</Button><Button to={`${base}/catalogo`} variant="secondary">{uiText("Ação secundária")}</Button><Button disabled>{uiText("Indisponível")}</Button><Badge>{uiText("Rascunho")}</Badge><Badge tone="success">{uiText("Disponível")}</Badge></div><Notice>{uiText("Mensagem informativa com texto e contraste padronizados.")}</Notice><Notice tone="error">{uiText("Exemplo de mensagem de erro: revise os dados informados.")}</Notice></Panel>
        <DemoForm />
      </Section>
    </>}
    {example === "catalogo" && <Section title={uiText("Módulos da disciplina")} description={uiText("Cards de mesma estrutura, com títulos e descrições de tamanhos diferentes.")}><CardGrid>
      <ContentCard title={uiText("Introdução à programação")} description={uiText("Conceitos iniciais para começar a estudar.")} badge={uiText("Iniciante")} to={`${base}/conteudo`} action={uiText("Ver conteúdo")} />
      <ContentCard title={uiText("Estruturas de dados e resolução de problemas")} description={uiText("Pratique a organização de informações e desenvolva soluções passo a passo com exercícios guiados e exemplos.")} badge={uiText("Prática")} to={`${base}/conteudo`} action={uiText("Ver conteúdo")} />
      <ContentCard title={uiText("Projeto final")} description={uiText("Material em preparação para a próxima etapa da disciplina.")} badge={uiText("Projeto")} unavailable />
    </CardGrid></Section>}
    {example === "conteudo" && <>
      <div className="ui-actions"><Badge>{uiText("Material demonstrativo")}</Badge><Badge>{uiText("Leitura · 5 min")}</Badge></div>
      <Panel title={uiText("Introdução à programação")}><div className="ui-prose"><p>{uiText("Uma tela de conteúdo usa a mesma largura, navegação e cabeçalho do catálogo. O corpo recebe uma estrutura própria para leitura.")}</p><h3>{uiText("Objetivos da aula")}</h3><p>{uiText("Entender como organizar uma sequência de instruções e reconhecer entradas, processamento e saídas.")}</p><h3>{uiText("Atividade prática")}</h3><p>{uiText("Descreva os passos necessários para calcular a média de três notas. Identifique quais informações entram e qual resultado será apresentado.")}</p></div></Panel>
      <Notice>{uiText("Use seções e painéis para organizar o conteúdo sem redefinir bordas, cores e espaçamentos em cada página.")}</Notice>
      <div className="ui-actions"><Button to={`${base}/formulario`}>{uiText("Ir para a atividade")}</Button><Button to={`${base}/catalogo`} variant="secondary">{uiText("Voltar aos módulos")}</Button></div>
    </>}
    {example === "formulario" && <DemoForm />}
    {example && !selected && <EmptyState title={uiText("Este exemplo não existe")} description={uiText("Escolha uma das telas disponíveis na galeria.")} action={<Button to={base}>{uiText("Ver exemplos")}</Button>} />}
  </PageTemplate>;
}
