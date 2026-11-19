import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import BackButton from "../components/BackButton";

const esbmcCommandTable = {
  headers: ["Comando / Opção", "Finalidade", "Explicação", "Exemplo de uso"],
  rows: [
    ["esbmc arquivo.c", "Verificação básica", "Executa a verificação formal padrão sobre um arquivo em C. O ESBMC analisa o programa em busca de violações de propriedades, como erro de assertiva, ponteiro inválido e acesso indevido à memória.", "esbmc exemplo.c"],
    ["esbmc arquivo.cpp", "Verificar arquivo C++", "Usado para analisar programas escritos em C++. O ESBMC também possui suporte a C++, embora alguns recursos modernos possam exigir ajustes ou versões atualizadas.", "esbmc programa.cpp"],
    ["--help", "Exibir ajuda", "Mostra as opções disponíveis na versão instalada do ESBMC. É o comando mais indicado para confirmar quais flags estão disponíveis no ambiente local.", "esbmc --help"],
    ["--version", "Ver versão instalada", "Exibe a versão do ESBMC instalada no computador. Útil para documentar o ambiente usado no trabalho.", "esbmc --version"],
    ["--memory-leak-check", "Verificar vazamento de memória", "Ativa a verificação de vazamento de memória. É usado para detectar situações em que o programa aloca memória com malloc, calloc ou new, mas não libera corretamente com free ou delete.", "esbmc memoria.c --memory-leak-check"],
    ["--overflow-check", "Verificar overflow e underflow", "Verifica estouro ou subestouro aritmético. É útil em operações com inteiros, principalmente quando há soma, subtração, multiplicação ou conversão de tipos.", "esbmc calculo.c --overflow-check"],
    ["--bounds-check", "Verificar limites de vetor", "Analisa se o programa acessa posições inválidas de arrays ou vetores. Ajuda a detectar erros como acessar v[10] em um vetor de tamanho 5.", "esbmc vetor.c --bounds-check"],
    ["--no-bounds-check", "Ignorar verificação de limites", "Desativa a verificação de acesso fora dos limites de arrays. Deve ser usado com cuidado, pois pode esconder erros importantes.", "esbmc vetor.c --no-bounds-check"],
    ["--pointer-check", "Verificar ponteiros", "Ativa ou reforça a análise de segurança de ponteiros, como ponteiro nulo, ponteiro inválido e uso incorreto de memória.", "esbmc ponteiro.c --pointer-check"],
    ["--no-pointer-check", "Ignorar verificação de ponteiros", "Desativa a análise de ponteiros. Pode ser útil em testes específicos, mas reduz a segurança da verificação.", "esbmc ponteiro.c --no-pointer-check"],
    ["--div-by-zero-check", "Verificar divisão por zero", "Analisa se existe algum caminho de execução em que uma divisão por zero possa ocorrer.", "esbmc divisao.c --div-by-zero-check"],
    ["--no-div-by-zero-check", "Ignorar divisão por zero", "Desativa a checagem de divisão por zero. Normalmente não é recomendado em análises de segurança.", "esbmc divisao.c --no-div-by-zero-check"],
    ["--assertions", "Verificar assertivas", "Verifica comandos assert() presentes no código. Uma assertiva representa uma condição que deve ser verdadeira naquele ponto do programa.", "esbmc assertiva.c --assertions"],
    ["--no-assertions", "Ignorar assertivas", "Faz o ESBMC não considerar os comandos assert() como propriedades a serem verificadas.", "esbmc assertiva.c --no-assertions"],
    ["--unwind N", "Definir limite de laços", "Define quantas vezes os laços serão desenrolados durante a verificação. O valor N representa o limite de análise para estruturas como for, while e do while.", "esbmc laco.c --unwind 10"],
    ["--unwinding-assertions", "Verificar limite de desenrolamento", "Gera uma propriedade para confirmar se o limite de desenrolamento dos laços foi suficiente. Se falhar, significa que o --unwind pode ter sido baixo.", "esbmc laco.c --unwind 10 --unwinding-assertions"],
    ["--incremental-bmc", "BMC incremental", "Usa uma estratégia incremental de verificação, aumentando progressivamente os limites da análise. O repositório oficial informa que o ESBMC implementa BMC incremental baseado em SMT.", "esbmc programa.c --incremental-bmc"],
    ["--k-induction", "Verificação por indução", "Usa a técnica de k-induction para tentar provar propriedades além de uma simples busca limitada. É útil quando se deseja maior rigor em programas com laços.", "esbmc programa.c --k-induction"],
    ["--interval-analysis", "Análise por intervalos", "Auxilia a verificação inferindo intervalos possíveis para variáveis. Costuma ser usada junto com k-induction para melhorar a capacidade de prova.", "esbmc programa.c --k-induction --interval-analysis"],
    ["--floatbv", "Verificar ponto flutuante", "Utiliza representação bit-vetorial para operações com ponto flutuante. É útil para programas que usam float ou double.", "esbmc media.c --floatbv"],
    ["--nan-check", "Verificar ocorrência de NaN", "Analisa se operações de ponto flutuante podem gerar NaN, isto é, Not a Number.", "esbmc calculo_float.c --nan-check"],
    ["--pthread", "Verificar programas com threads", "Usado para programas concorrentes que utilizam pthread. Permite analisar problemas envolvendo múltiplas threads.", "esbmc threads.c --pthread"],
    ["--deadlock-check", "Verificar deadlock", "Analisa se o programa concorrente pode travar por espera circular ou uso incorreto de mutexes.", "esbmc mutex.c --pthread --deadlock-check"],
    ["--data-races-check", "Verificar corrida de dados", "Detecta situações em que duas ou mais threads acessam a mesma variável compartilhada sem sincronização adequada.", "esbmc corrida.c --pthread --data-races-check"],
    ["--lock-order-check", "Verificar ordem de locks", "Analisa problemas relacionados à ordem de aquisição de locks, que podem causar deadlock.", "esbmc locks.c --pthread --lock-order-check"],
    ["--show-vcc", "Mostrar condições de verificação", "Exibe as condições lógicas geradas pelo ESBMC antes de enviá-las ao solver. É útil para análise acadêmica mais detalhada.", "esbmc programa.c --show-vcc"],
    ["--smt2", "Gerar fórmula SMT-LIB", "Pode ser usado para visualizar ou exportar a fórmula lógica no formato SMT-LIB, quando suportado pela versão instalada.", "esbmc programa.c --smt2"],
    ["--solver nome", "Selecionar solver SMT", "Permite escolher o solucionador SMT utilizado, como Z3, Boolector ou outros, dependendo da instalação.", "esbmc programa.c --solver z3"],
    ["--z3", "Usar solver Z3", "Indica o uso do solver Z3, quando disponível no ambiente.", "esbmc programa.c --z3"],
    ["--boolector", "Usar solver Boolector", "Indica o uso do solver Boolector, quando disponível. Pode ser útil em problemas com bit-vectors.", "esbmc programa.c --boolector"],
    ["--timeout N", "Definir tempo máximo", "Define um limite de tempo para a verificação, em segundos. Útil para programas maiores ou análises que podem demorar.", "esbmc grande.c --timeout 60"],
    ["--verbosity N", "Controlar detalhamento da saída", "Define o nível de detalhes exibidos na execução. Quanto maior o valor, mais informações podem aparecer.", "esbmc programa.c --verbosity 4"],
    ["--quiet", "Saída reduzida", "Reduz a quantidade de mensagens exibidas no terminal. Útil para relatórios automatizados ou integração com CI/CD.", "esbmc programa.c --quiet"],
    ["--color", "Saída colorida", "Ativa cores na saída do terminal, facilitando a leitura visual dos resultados.", "esbmc programa.c --color"],
    ["--no-color", "Saída sem cores", "Remove cores da saída. Útil quando o resultado será copiado para relatório, arquivo .txt ou README.", "esbmc programa.c --no-color"],
    ["--context-bound N", "Limitar trocas de contexto", "Usado em programas concorrentes para definir o número máximo de trocas de contexto analisadas.", "esbmc threads.c --pthread --context-bound 2"],
    ["--function nome", "Verificar função específica", "Permite indicar uma função específica como ponto principal de verificação, quando suportado pela versão instalada.", "esbmc programa.c --function minha_funcao"],
    ["--main nome", "Definir função principal", "Usado quando se deseja informar ao ESBMC uma função de entrada diferente de main, quando disponível.", "esbmc programa.c --main teste"],
    ["-I caminho", "Incluir diretório de headers", "Informa ao ESBMC onde encontrar arquivos .h usados no programa.", "esbmc main.c -I ./include"],
    ["-D NOME=valor", "Definir macro", "Define uma macro de pré-processador, como ocorre no GCC. Útil para simular configurações de compilação.", "esbmc main.c -D TAM=10"],
    ["--32", "Verificar em arquitetura 32 bits", "Simula análise considerando arquitetura de 32 bits, quando suportado. Pode alterar tamanho de tipos e comportamento de ponteiros.", "esbmc programa.c --32"],
    ["--64", "Verificar em arquitetura 64 bits", "Simula análise considerando arquitetura de 64 bits. É comum em computadores modernos.", "esbmc programa.c --64"],
  ],
};

const workCommandTable = {
  headers: ["Situação no trabalho", "Comando recomendado", "O que demonstrar no texto"],
  rows: [
    ["Verificar um fragmento original simples", "esbmc original.c", "O ESBMC foi executado sobre o fragmento original para identificar possíveis violações."],
    ["Verificar um fragmento corrigido simples", "esbmc corrigido.c", "O fragmento corrigido foi submetido à mesma análise para confirmar a remoção da falha."],
    ["Testar acesso inválido a vetor", "esbmc vetor.c --bounds-check", "A ferramenta verifica se algum índice ultrapassa os limites válidos do array."],
    ["Testar ponteiro nulo", "esbmc ponteiro.c --pointer-check", "A ferramenta verifica se há desreferenciamento de ponteiro inválido ou nulo."],
    ["Testar uso após free", "esbmc memoria.c --pointer-check", "A análise busca identificar uso indevido de memória dinâmica."],
    ["Testar vazamento de memória", "esbmc memoria.c --memory-leak-check", "A ferramenta verifica se a memória alocada foi liberada corretamente."],
    ["Testar overflow", "esbmc overflow.c --overflow-check", "A análise verifica se operações aritméticas ultrapassam os limites do tipo."],
    ["Testar divisão por zero", "esbmc divisao.c --div-by-zero-check", "A ferramenta verifica se algum caminho de execução permite divisor igual a zero."],
    ["Testar laços", "esbmc laco.c --unwind 10", "O ESBMC verifica o programa considerando até 10 iterações do laço."],
    ["Testar laços com garantia do limite", "esbmc laco.c --unwind 10 --unwinding-assertions", "O teste verifica se o limite escolhido foi suficiente para analisar o laço."],
    ["Testar com k-induction", "esbmc programa.c --k-induction", "A ferramenta tenta provar propriedades usando indução, ampliando o rigor da análise."],
    ["Testar ponto flutuante", "esbmc float.c --floatbv", "O ESBMC verifica operações com float e double."],
    ["Testar programa com threads", "esbmc threads.c --pthread", "A ferramenta analisa comportamento concorrente."],
    ["Testar corrida de dados", "esbmc threads.c --pthread --data-races-check", "A verificação busca acessos simultâneos inseguros a variáveis compartilhadas."],
    ["Testar deadlock", "esbmc mutex.c --pthread --deadlock-check", "A ferramenta verifica se locks ou mutexes podem travar a execução."],
    ["Gerar saída mais detalhada", "esbmc programa.c --verbosity 4", "A saída detalhada ajuda a interpretar o processo de verificação."],
    ["Gerar saída mais limpa", "esbmc programa.c --quiet --no-color", "A saída fica mais adequada para colar em relatório ou README."],
  ],
};

function CommandTable({ table }) {
  const { text: uiText } = useContentTranslation();

  return (
    <TableContainer className="rounded-2xl border border-slate-700/70">
      <Table className="min-w-full divide-y divide-slate-700/70 text-left text-sm">
        <thead className="bg-slate-950/50">
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-semibold text-cyan-200">
                {uiText(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 bg-slate-950/20">
          {table.rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) => (
                <td key={`${row[0]}-${cell}-${index}`} className="px-4 py-3 text-slate-300 align-top">
                  {uiText(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default function EsbmcTabelasComandos() {
  const { text: uiText } = useContentTranslation();

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/esbmc" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">{uiText("Voltar para ESBMC")}</BackButton>
      </div>

      <PageHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300 mb-3">{uiText("Referência operacional")}</p>
        <PageTitle className="mb-5">{uiText("Tabelas de comandos")}</PageTitle>
        <PageDescription className="text-justify max-w-4xl">{uiText("Abaixo está uma tabela completa de comandos do ESBMC, com finalidade, explicação e exemplo de uso. A documentação oficial apresenta exemplos como ")}<code className="text-cyan-200">esbmc file.c --memory-leak-check</code>{uiText(", e o repositório oficial informa que o ESBMC utiliza BMC incremental e k-induction com solvers SMT.")}</PageDescription>
      </PageHeader>

      <div className="space-y-6">
        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">{uiText("Exemplo oficial com BMC incremental")}</h2>
          <p className="text-slate-300 leading-relaxed text-justify mb-5">{uiText("O README oficial utiliza o comando abaixo como exemplo de verificação de programa C com a estratégia de BMC incremental. Essa opção aumenta progressivamente os limites da análise e é uma das estratégias implementadas pelo ESBMC com base em SMT.")}</p>
          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/30 p-5">
            <p className="font-mono text-sm text-cyan-100">{uiText("esbmc file.c --incremental-bmc")}</p>
          </div>
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-bold text-cyan-300 mb-5">{uiText("Tabela de comandos do ESBMC")}</h2>
          <CommandTable table={esbmcCommandTable} />
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">{uiText("Tabela de comandos mais importantes para o trabalho")}</h2>
          <p className="text-slate-300 leading-relaxed text-justify mb-5">{uiText("Esta tabela relaciona situações comuns do projeto com o comando recomendado e a interpretação que pode ser registrada na análise.")}</p>
          <CommandTable table={workCommandTable} />
        </Panel>
      </div>
    </PageTemplate>
  );
}
