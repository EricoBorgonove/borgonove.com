import { Button, PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useState } from "react";
import BackButton from "../components/BackButton";

const basicMoves = [
  {
    structure: "Sequência",
    drawing: "A -> B -> C",
    regex: "ab",
    meaning: "Você precisa ler a e depois b.",
  },
  {
    structure: "Escolha",
    drawing: "Duas setas saindo do mesmo estado",
    regex: "(a + b)",
    meaning: "Você pode seguir por um caminho ou pelo outro.",
  },
  {
    structure: "Repetição",
    drawing: "Uma seta que volta para o mesmo estado",
    regex: "a*",
    meaning: "Você pode ler a zero ou várias vezes.",
  },
];

const simplificationSteps = [
  {
    label: "Entrada",
    text: "Identifique como o caminho chega ao estado que será removido.",
    example: "por exemplo, chegando por a",
  },
  {
    label: "Loop",
    text: "Observe se existe repetição dentro desse estado.",
    example: "por exemplo, um loop em b vira b*",
  },
  {
    label: "Saída",
    text: "Identifique como o caminho sai desse estado para continuar a leitura.",
    example: "por exemplo, saindo por c",
  },
  {
    label: "Resultado",
    text: "Una entrada, repetição e saída em uma única expressão.",
    example: "a b* c",
  },
];

const checklist = [
  {
    title: "Agrupe as opções",
    text: "Se duas transições com símbolos diferentes levam ao mesmo estado, escreva como uma escolha. Por exemplo: (0 + 1).",
  },
  {
    title: "Cuidado com o vira-volta",
    text: "Se há um caminho que vai de q1 para q2 e uma transição que volta de q2 para q1, o trajeto completo forma um ciclo. Envolva o caminho de ida e volta entre parênteses e aplique o asterisco.",
  },
  {
    title: "Traduza pelo menos um",
    text: "Quando o autômato exige que um caminho aconteça antes da repetição, escreva o caminho uma vez e depois repita o mesmo bloco com asterisco: X(X)*.",
  },
];

const subdisciplines = [
  {
    id: "afd-er",
    label: "AFD para ER",
    title: "Transformação de AFD em Expressão Regular",
    description:
      "Leitura de caminhos, escolhas, repetições e simplificação de estados intermediários.",
  },
  {
    id: "cadeia-vazia",
    label: "Cadeia vazia",
    title: "Cadeia vazia (ϵ) na Expressão Regular",
    description:
      "Como representar autômatos que aceitam a cadeia vazia desde o estado inicial.",
  },
];

const epsilonCases = [
  {
    title: "1. Usando o asterisco (*)",
    subtitle: "A forma mais comum",
    text:
      "Quando o autômato permite repetir um caminho zero ou mais vezes, o próprio asterisco já inclui a cadeia vazia. Isso acontece porque repetir zero vezes significa não consumir nenhum símbolo.",
    exampleTitle: "Exemplo",
    example: "a*",
    translation: "Aceita ϵ, a, aa, aaa e assim por diante.",
  },
  {
    title: "2. Usando soma com ϵ",
    subtitle: "Quando há caminhos específicos",
    text:
      "Se o autômato aceita a cadeia vazia, mas também possui caminhos definidos que não são apenas um loop simples, a cadeia vazia deve aparecer explicitamente como uma alternativa.",
    exampleTitle: "Exemplo",
    example: "(ϵ + ab)",
    translation: "Ou o autômato aceita sem ler nada, ou lê a sequência ab.",
  },
  {
    title: "3. Cadeia vazia no meio de um fluxo",
    subtitle: "Quando uma parte é opcional",
    text:
      "A cadeia vazia também pode indicar que um trecho da expressão é opcional. Nesse caso, a escolha entre consumir ou não consumir um símbolo aparece antes da continuação obrigatória.",
    exampleTitle: "Exemplo",
    example: "(ϵ + 0)11",
    translation: "Pode começar com 0 ou não, mas depois precisa ler 11.",
  },
];

export default function Afd() {
  const [activeSubdiscipline, setActiveSubdiscipline] = useState(subdisciplines[0].id);
  const selectedSubdiscipline =
    subdisciplines.find((subdiscipline) => subdiscipline.id === activeSubdiscipline) ??
    subdisciplines[0];

  return (
    <PageTemplate>
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          Voltar para Disciplinas
        </BackButton>
      </div>

      <PageHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300 mb-3">
          Autômatos Finitos Determinísticos
        </p>
        <PageTitle className="mb-5">AFD</PageTitle>
        <PageDescription className="text-xl md:text-2xl text-cyan-200 font-semibold">
          {selectedSubdiscipline.title}
        </PageDescription>
        <p className="text-slate-300 text-lg leading-relaxed text-justify max-w-4xl">
          Esta matéria reúne subdisciplinas de estudo sobre Autômatos Finitos Determinísticos. O objetivo é aprender a ler o diagrama formalmente, interpretar estados de aceitação e traduzir caminhos aceitos para Expressões Regulares.
        </p>
      </PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
          Subdisciplinas
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {subdisciplines.map((subdiscipline) => {
            const isActive = subdiscipline.id === activeSubdiscipline;

            return (
              <Button variant="custom"
                key={subdiscipline.id}
                type="button"
                onClick={() => setActiveSubdiscipline(subdiscipline.id)}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-100"
                    : "border-slate-700/60 bg-slate-950/20 text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-400/10"
                }`}
              >
                <span className="block text-sm font-semibold">{subdiscipline.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                  {subdiscipline.description}
                </span>
              </Button>
            );
          })}
        </div>
      </Panel>

      <div className="space-y-6">
        {activeSubdiscipline === "afd-er" ? (
          <>
        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            1. Identifique o ponto de partida e a chegada
          </h2>
          <p className="text-slate-300 leading-relaxed text-justify mb-4">
            Todo AFD possui um estado inicial, indicado pela seta que chega de fora do diagrama, e um ou mais estados de aceitação, normalmente desenhados com círculo duplo. A expressão regular final precisa representar todos os caminhos que começam no estado inicial e terminam em algum estado de aceitação.
          </p>
          <p className="text-slate-300 leading-relaxed text-justify">
            Quando houver mais de um estado final, cada caminho aceito deve ser considerado. Na expressão regular, esses caminhos são combinados com o operador de escolha, representado pelo sinal de soma. Em outras palavras, se um autômato aceita por dois caminhos diferentes, a expressão final deve contemplar as duas possibilidades.
          </p>
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            2. Aprenda os três movimentos básicos
          </h2>
          <p className="text-slate-300 leading-relaxed text-justify mb-5">
            A maior parte dos autômatos pode ser interpretada a partir de três estruturas simples: sequência, escolha e repetição. Ao reconhecer essas peças no desenho, a tradução para Expressão Regular fica muito mais segura.
          </p>
          <TableContainer className="rounded-2xl border border-slate-700/70">
            <Table className="min-w-full divide-y divide-slate-700/70 text-left text-sm">
              <thead className="bg-slate-950/50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-cyan-200">Estrutura</th>
                  <th className="px-4 py-3 font-semibold text-cyan-200">No desenho</th>
                  <th className="px-4 py-3 font-semibold text-cyan-200">Na ER</th>
                  <th className="px-4 py-3 font-semibold text-cyan-200">O que significa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/20">
                {basicMoves.map((move) => (
                  <tr key={move.structure}>
                    <td className="px-4 py-3 text-slate-300 align-top font-semibold">{move.structure}</td>
                    <td className="px-4 py-3 text-slate-300 align-top">{move.drawing}</td>
                    <td className="px-4 py-3 text-cyan-100 align-top font-mono">{move.regex}</td>
                    <td className="px-4 py-3 text-slate-300 align-top">{move.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            3. Use a técnica da simplificação
          </h2>
          <p className="text-slate-300 leading-relaxed text-justify mb-5">
            Uma forma prática de transformar o autômato é imaginar que os estados intermediários serão removidos aos poucos. Para remover um estado q, observe como se chega nele, quais loops existem dentro dele e como se sai dele. A expressão que substitui esse estado é formada pela sequência entrada, loop e saída.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            {simplificationSteps.map((step) => (
              <div key={step.label} className="rounded-2xl border border-slate-700/70 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">{step.label}</h3>
                <p className="text-sm text-slate-300 leading-relaxed text-justify mb-3">{step.text}</p>
                <p className="text-xs text-emerald-200">{step.example}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-5">
            <p className="text-sm font-semibold text-emerald-100 mb-2">Exemplo de leitura</p>
            <p className="text-slate-300 leading-relaxed text-justify">
              Se o caminho chega ao estado q por a, permanece nele repetindo b e sai por c, então o trecho inteiro pode ser representado por <span className="font-mono text-cyan-100">ab*c</span>.
            </p>
          </div>
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            4. Checklist para não se perder
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {checklist.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-700/70 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed text-justify">{item.text}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">Resumo visual</h2>
          <p className="text-slate-300 leading-relaxed text-justify">
            Ao transformar um AFD em uma Expressão Regular, leia o desenho como se estivesse contando a história dos caminhos aceitos: eu começo no estado inicial, posso escolher entre determinados símbolos, talvez repita um trecho algumas vezes, passo pelos estados necessários e termino em um estado de aceitação. A expressão regular é a forma algébrica dessa história.
          </p>
        </Panel>
          </>
        ) : (
          <>
            <Panel as="article" layout="plain">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                Quando o AFD aceita a cadeia vazia?
              </h2>
              <p className="text-slate-300 leading-relaxed text-justify mb-4">
                Um autômato aceita a cadeia vazia quando o estado inicial também é um estado final. No desenho, isso aparece quando a seta de início aponta para uma bolinha com círculo duplo. Como nenhuma transição precisa ser percorrida para aceitar a entrada, a Expressão Regular final deve ser capaz de gerar ϵ.
              </p>
              <p className="text-slate-300 leading-relaxed text-justify">
                Existem duas formas principais de representar essa situação: deixar que o asterisco represente a repetição zero vezes ou somar explicitamente a cadeia vazia à expressão. A escolha depende da estrutura do autômato.
              </p>
            </Panel>

            <div className="grid lg:grid-cols-3 gap-5">
              {epsilonCases.map((item) => (
                <Panel as="article" layout="plain" key={item.title}>
                  <p className="text-sm font-semibold text-emerald-300 mb-2">{item.subtitle}</p>
                  <h2 className="text-xl font-bold text-cyan-300 mb-4">{item.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed text-justify mb-5">
                    {item.text}
                  </p>
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-950/30 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">
                      {item.exampleTitle}
                    </p>
                    <p className="font-mono text-2xl font-bold text-cyan-100 mb-3">{item.example}</p>
                    <p className="text-sm text-slate-300 leading-relaxed text-justify">
                      {item.translation}
                    </p>
                  </div>
                </Panel>
              ))}
            </div>

            <Panel as="article" layout="plain">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                Como identificar no desenho?
              </h2>
              <p className="text-slate-300 leading-relaxed text-justify mb-4">
                Sempre que a seta de início apontar diretamente para um estado de aceitação, a Expressão Regular precisa aceitar a cadeia vazia. Isso significa que deve existir alguma forma de chegar ao resultado sem consumir símbolos.
              </p>
              <p className="text-slate-300 leading-relaxed text-justify">
                Se a expressão final não permite gerar vazio, mas o estado inicial do autômato é final, então a expressão está incompleta. Em geral, isso é corrigido com um asterisco envolvendo o trecho adequado ou com uma soma explícita usando ϵ.
              </p>
            </Panel>

            <Panel as="article" layout="plain">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">Dica de ouro</h2>
              <p className="text-slate-300 leading-relaxed text-justify">
                Ao finalizar uma Expressão Regular, faça sempre a pergunta: “se eu não ler nenhum símbolo, essa expressão ainda pode aceitar?”. Se a resposta for não, mas o estado inicial do AFD for final, revise a expressão. Provavelmente está faltando um <span className="font-mono text-cyan-100">ϵ</span>, um <span className="font-mono text-cyan-100">+</span> com alternativa vazia ou um <span className="font-mono text-cyan-100">*</span> aplicado ao bloco correto.
              </p>
            </Panel>
          </>
        )}
      </div>
    </PageTemplate>
  );
}
