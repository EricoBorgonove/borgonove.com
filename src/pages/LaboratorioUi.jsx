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
    <Panel title="Dados da demonstração">
      <form onSubmit={submit} noValidate className="ui-stack">
        <Field label="Seu nome" name="name" autoComplete="name" required value={name} onChange={(event) => { setName(event.target.value); setResult(""); }} hint="Este exemplo funciona localmente e não salva dados." error={error} />
        <div className="ui-actions"><Button type="submit">Testar formulário</Button><Button variant="secondary" onClick={reset}>Limpar</Button></div>
      </form>
    </Panel>
    <Panel title="Resultado">
      {result ? <Notice>Olá, {result}! O formulário foi validado com sucesso.</Notice> : <EmptyState title="Nenhum resultado ainda" description="Envie o formulário para visualizar o estado de sucesso. Deixe o nome vazio para testar o erro." />}
    </Panel>
  </div>;
}

export default function LaboratorioUi() {
  const { example } = useParams();
  const selected = examples.find(({ slug }) => slug === example);
  const breadcrumbs = [{ label: "Início", to: "/" }, ...(example ? [{ label: "Laboratório UI", to: base }, { label: selected?.title || "Exemplo não encontrado" }] : [{ label: "Laboratório UI" }])];
  return <PageTemplate eyebrow="Ambiente de validação visual" title={selected ? `Template de ${selected.title.toLowerCase()}` : example ? "Exemplo não encontrado" : "Laboratório de componentes"} description={selected?.description || "Uma base compartilhada para construir telas consistentes. Valide os exemplos no celular e nos temas claro e escuro pelo menu do site."} breadcrumbs={breadcrumbs} actions={example && <Button to={base} variant="secondary">Voltar ao laboratório</Button>}>
    <Notice>Área de testes com conteúdo demonstrativo. Estes componentes também são usados nas telas do site; valide aqui as alterações no padrão compartilhado.</Notice>
    {!example && <>
      <Section title="Telas de referência" description="Três composições construídas com os mesmos componentes e medidas.">
        <CardGrid>{examples.map((item) => <ContentCard key={item.slug} title={item.title} description={item.description} badge="Template" to={`${base}/${item.slug}`} action="Abrir demonstração" />)}</CardGrid>
      </Section>
      <Section title="Elementos básicos" description="Botões, etiquetas, campos e mensagens reutilizáveis.">
        <Panel title="Ações e estados"><div className="ui-actions"><Button to={`${base}/formulario`}>Ação principal</Button><Button to={`${base}/catalogo`} variant="secondary">Ação secundária</Button><Button disabled>Indisponível</Button><Badge>Rascunho</Badge><Badge tone="success">Disponível</Badge></div><Notice>Mensagem informativa com texto e contraste padronizados.</Notice><Notice tone="error">Exemplo de mensagem de erro: revise os dados informados.</Notice></Panel>
        <DemoForm />
      </Section>
    </>}
    {example === "catalogo" && <Section title="Módulos da disciplina" description="Cards de mesma estrutura, com títulos e descrições de tamanhos diferentes."><CardGrid>
      <ContentCard title="Introdução à programação" description="Conceitos iniciais para começar a estudar." badge="Iniciante" to={`${base}/conteudo`} action="Ver conteúdo" />
      <ContentCard title="Estruturas de dados e resolução de problemas" description="Pratique a organização de informações e desenvolva soluções passo a passo com exercícios guiados e exemplos." badge="Prática" to={`${base}/conteudo`} action="Ver conteúdo" />
      <ContentCard title="Projeto final" description="Material em preparação para a próxima etapa da disciplina." badge="Projeto" unavailable />
    </CardGrid></Section>}
    {example === "conteudo" && <>
      <div className="ui-actions"><Badge>Material demonstrativo</Badge><Badge>Leitura · 5 min</Badge></div>
      <Panel title="Introdução à programação"><div className="ui-prose"><p>Uma tela de conteúdo usa a mesma largura, navegação e cabeçalho do catálogo. O corpo recebe uma estrutura própria para leitura.</p><h3>Objetivos da aula</h3><p>Entender como organizar uma sequência de instruções e reconhecer entradas, processamento e saídas.</p><h3>Atividade prática</h3><p>Descreva os passos necessários para calcular a média de três notas. Identifique quais informações entram e qual resultado será apresentado.</p></div></Panel>
      <Notice>Use seções e painéis para organizar o conteúdo sem redefinir bordas, cores e espaçamentos em cada página.</Notice>
      <div className="ui-actions"><Button to={`${base}/formulario`}>Ir para a atividade</Button><Button to={`${base}/catalogo`} variant="secondary">Voltar aos módulos</Button></div>
    </>}
    {example === "formulario" && <DemoForm />}
    {example && !selected && <EmptyState title="Este exemplo não existe" description="Escolha uma das telas disponíveis na galeria." action={<Button to={base}>Ver exemplos</Button>} />}
  </PageTemplate>;
}
