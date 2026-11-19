import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import BackButton from "../components/BackButton";

const blocks = [
  {
    title: "Bloco 1 — Rotinas pessoais",
    description: "Descreva ações simples do cotidiano em uma sequência clara, completa e ordenada.",
    exercises: [
      "Faça um algoritmo em linguagem natural para acordar, levantar da cama e iniciar o dia.",
      "Faça um algoritmo em linguagem natural para escovar os dentes.",
      "Faça um algoritmo em linguagem natural para tomar banho.",
      "Faça um algoritmo em linguagem natural para lavar as mãos corretamente.",
      "Faça um algoritmo em linguagem natural para escolher uma roupa e se vestir.",
      "Faça um algoritmo em linguagem natural para arrumar a cama.",
      "Faça um algoritmo em linguagem natural para organizar uma mochila antes de ir à escola ou à faculdade.",
      "Faça um algoritmo em linguagem natural para preparar-se para dormir.",
      "Faça um algoritmo em linguagem natural para carregar a bateria de um celular.",
      "Faça um algoritmo em linguagem natural para configurar um despertador no celular.",
    ],
  },
  {
    title: "Bloco 2 — Cozinha e alimentação",
    description: "Organize ingredientes, utensílios, cuidados e etapas necessárias para preparar alimentos.",
    exercises: [
      "Faça um algoritmo em linguagem natural para fritar um ovo.",
      "Faça um algoritmo em linguagem natural para preparar um café.",
      "Faça um algoritmo em linguagem natural para fazer um sanduíche.",
      "Faça um algoritmo em linguagem natural para preparar um copo de suco em pó.",
      "Faça um algoritmo em linguagem natural para cozinhar arroz.",
      "Faça um algoritmo em linguagem natural para preparar macarrão instantâneo.",
      "Faça um algoritmo em linguagem natural para fazer pipoca na panela.",
      "Faça um algoritmo em linguagem natural para preparar uma salada.",
      "Faça um algoritmo em linguagem natural para aquecer uma refeição no micro-ondas com segurança.",
      "Faça um algoritmo em linguagem natural para lavar, secar e guardar a louça após uma refeição.",
    ],
  },
  {
    title: "Bloco 3 — Casa, estudo e organização",
    description: "Transforme tarefas que envolvem planejamento e organização em instruções executáveis.",
    exercises: [
      "Faça um algoritmo em linguagem natural para varrer um cômodo.",
      "Faça um algoritmo em linguagem natural para limpar uma mesa de estudos.",
      "Faça um algoritmo em linguagem natural para separar roupas claras e escuras antes da lavagem.",
      "Faça um algoritmo em linguagem natural para lavar roupas em uma máquina de lavar.",
      "Faça um algoritmo em linguagem natural para organizar livros em uma estante.",
      "Faça um algoritmo em linguagem natural para organizar arquivos em pastas no computador.",
      "Faça um algoritmo em linguagem natural para criar e salvar um documento de texto.",
      "Faça um algoritmo em linguagem natural para enviar um arquivo por e-mail.",
      "Faça um algoritmo em linguagem natural para estudar para uma prova.",
      "Faça um algoritmo em linguagem natural para realizar uma pesquisa escolar na internet e registrar as fontes consultadas.",
    ],
  },
  {
    title: "Bloco 4 — Deslocamento, compras e serviços",
    description: "Considere objetivos, recursos necessários, caminhos e confirmações ao descrever cada processo.",
    exercises: [
      "Faça um algoritmo em linguagem natural para sair de casa e chegar à escola ou à faculdade.",
      "Faça um algoritmo em linguagem natural para atravessar uma rua com segurança.",
      "Faça um algoritmo em linguagem natural para utilizar o transporte público.",
      "Faça um algoritmo em linguagem natural para solicitar uma corrida em um aplicativo de transporte.",
      "Faça um algoritmo em linguagem natural para abastecer um veículo em um posto de combustível.",
      "Faça um algoritmo em linguagem natural para fazer uma compra em um supermercado.",
      "Faça um algoritmo em linguagem natural para pagar uma compra com cartão.",
      "Faça um algoritmo em linguagem natural para sacar dinheiro em um caixa eletrônico.",
      "Faça um algoritmo em linguagem natural para fazer uma transferência bancária por PIX.",
      "Faça um algoritmo em linguagem natural para comprar um produto em uma loja virtual e acompanhar a entrega.",
    ],
  },
  {
    title: "Bloco 5 — Decisões e repetições",
    description: "Inclua condições como “se” e repetições como “enquanto” ou “até que” quando forem necessárias.",
    exercises: [
      "Faça um algoritmo em linguagem natural para decidir se deve levar um guarda-chuva antes de sair de casa.",
      "Faça um algoritmo em linguagem natural para verificar se uma porta foi trancada antes de sair.",
      "Faça um algoritmo em linguagem natural para escolher entre subir de elevador ou de escada.",
      "Faça um algoritmo em linguagem natural para decidir qual roupa usar de acordo com a temperatura.",
      "Faça um algoritmo em linguagem natural para verificar se há saldo suficiente antes de realizar uma compra.",
      "Faça um algoritmo em linguagem natural para procurar uma chave perdida em diferentes cômodos da casa.",
      "Faça um algoritmo em linguagem natural para lavar vários pratos até que a pia fique vazia.",
      "Faça um algoritmo em linguagem natural para regar todas as plantas de uma casa.",
      "Faça um algoritmo em linguagem natural para corrigir uma lista de exercícios, repetindo o processo até verificar todas as respostas.",
      "Faça um algoritmo em linguagem natural para realizar uma chamada telefônica e decidir o que fazer caso a pessoa não atenda.",
    ],
  },
];

export default function AlgoritmosLinguagemNatural() {
  const { text: uiText } = useContentTranslation();

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas/algoritmos"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >{uiText("Voltar para Algoritmos")}</BackButton>
      </div>

      <PageHeader>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{uiText("Lista introdutória")}</p>
        <PageTitle className="mb-4">{uiText("Algoritmos em Linguagem Natural")}</PageTitle>
        <PageDescription className="max-w-4xl">{uiText("Escreva cada solução como uma sequência de passos claros e ordenados, sem utilizar uma linguagem de programação. Considere o início, o fim, os materiais necessários, as decisões e as repetições de cada processo.")}</PageDescription>
      </PageHeader>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {blocks.map((block, index) => (
          <Panel as="a" layout="plain"
            key={block.title}
            href={`#bloco-${index + 1}`}
            className="theme-hover-border rounded-2xl p-5 transition hover:-translate-y-1"
          >
            <p className="mb-2 text-sm font-semibold text-cyan-300">{uiText("Bloco ")}{uiText(index + 1)}</p>
            <p className="text-sm font-semibold text-slate-200">
              {uiText(block.title).replace(/^(Bloco|Block) \d+ — /, "")}
            </p>
          </Panel>
        ))}
      </div>

      <div className="space-y-8">
        {blocks.map((block, blockIndex) => (
          <Panel as="article" layout="plain"
            key={block.title}
            id={`bloco-${blockIndex + 1}`}
            className="scroll-mt-24"
          >
            <h2 className="mb-3 text-2xl font-semibold text-cyan-300">{uiText(block.title)}</h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">{uiText(block.description)}</p>

            <ol className="grid gap-3 md:grid-cols-2">
              {uiText(block.exercises.map((exercise, exerciseIndex) => {
                const questionNumber = blockIndex * 10 + exerciseIndex + 1;

                return (
                  <li
                    key={exercise}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm leading-relaxed text-slate-300"
                  >
                    <span className="font-semibold text-cyan-300">{uiText(questionNumber)}. </span>
                    {uiText(exercise)}
                  </li>
                );
              }))}
            </ol>
          </Panel>
        ))}
      </div>
    </PageTemplate>
  );
}
