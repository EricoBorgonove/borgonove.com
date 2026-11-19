import { Button, PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";

const tabs = [
  {
    id: "visao-geral",
    label: "Visão geral",
    description: "Escolha o caminho de instalação adequado.",
  },
  {
    id: "windows",
    label: "Windows",
    description: "Release oficial ou WSL com Ubuntu.",
  },
  {
    id: "ubuntu",
    label: "Ubuntu/Linux",
    description: "PPA oficial, releases e dependências.",
  },
  {
    id: "macos",
    label: "macOS",
    description: "Homebrew, Xcode, SDK e sysroot.",
  },
  {
    id: "build",
    label: "Build avançado",
    description: "Clang, solvers, frontends e CMake.",
  },
  {
    id: "validacao",
    label: "Como executar",
    description: "Validar instalação e rodar os primeiros testes.",
  },
];

const officialLinks = [
  {
    title: "Repositório oficial do ESBMC",
    url: "https://github.com/esbmc/esbmc",
    description: "Código-fonte, README, exemplos, releases e documentação principal do projeto.",
  },
  {
    title: "Releases oficiais",
    url: "https://github.com/esbmc/esbmc/releases",
    description: "Página para baixar binários oficiais, incluindo pacotes para Ubuntu e Windows.",
  },
  {
    title: "Instruções de build",
    url: "https://github.com/esbmc/esbmc/blob/master/BUILDING.md",
    description: "Guia oficial para compilar o ESBMC a partir do código-fonte.",
  },
  {
    title: "PPA oficial do ESBMC",
    url: "https://launchpad.net/~esbmc/+archive/ubuntu/esbmc",
    description: "Pacote oficial para instalação em Ubuntu 22.04 e 24.04.",
  },
];

const dependencyRows = [
  ["clang", "Sim", "11.0.0"],
  ["boost", "Sim", "1.77"],
  ["CMake", "Sim", "3.18.0"],
  ["Boolector", "Não", "3.2.2"],
  ["CVC4", "Não", "1.8"],
  ["CVC5", "Não", "1.1.2"],
  ["MathSAT", "Não", "5.5.4"],
  ["Yices", "Não", "2.6.4"],
  ["Z3", "Não", "4.13.3"],
  ["Bitwuzla", "Não", "0.8.0"],
];

const installChoices = [
  {
    title: "Uso rápido no Ubuntu",
    text: "Use o PPA oficial. É o caminho recomendado para usuários gerais no Ubuntu 22.04 e 24.04.",
  },
  {
    title: "Uso rápido no Windows",
    text: "Baixe o binário oficial pela página de releases ou use Ubuntu no WSL para seguir o fluxo Linux.",
  },
  {
    title: "Uso no macOS",
    text: "Prepare Homebrew, Xcode ou Command Line Tools e compile a partir do código-fonte.",
  },
  {
    title: "Pesquisa ou ambiente controlado",
    text: "Compile por código-fonte para controlar solvers, frontends opcionais e flags do CMake.",
  },
];

const basicCommands = [
  {
    title: "Execução básica",
    description: "Executa a verificação padrão sobre um arquivo C.",
    command: "esbmc arquivo.c",
  },
  {
    title: "Vazamento de memória",
    description: "Ativa a verificação de memória alocada e não liberada.",
    command: "esbmc arquivo.c --memory-leak-check",
  },
  {
    title: "K-induction",
    description: "Usa prova por indução para aumentar o rigor em programas com laços.",
    command: "esbmc arquivo.c --k-induction",
  },
  {
    title: "Ponto flutuante",
    description: "Usa representação bit-vetorial para operações com float e double.",
    command: "esbmc arquivo.c --floatbv",
  },
  {
    title: "Limite de laços",
    description: "Define o número máximo de desenrolamentos de laços.",
    command: "esbmc arquivo.c --unwind 10",
  },
];

function DependencyTable() {
  return (
    <TableContainer className="rounded-2xl border border-slate-700/70">
      <Table className="min-w-full divide-y divide-slate-700/70 text-left text-sm">
        <thead className="bg-slate-950/50">
          <tr>
            <th className="px-4 py-3 font-semibold text-cyan-200">Pacote</th>
            <th className="px-4 py-3 font-semibold text-cyan-200">Obrigatório</th>
            <th className="px-4 py-3 font-semibold text-cyan-200">Versão mínima</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 bg-slate-950/20">
          {dependencyRows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell) => (
                <td key={`${row[0]}-${cell}`} className="px-4 py-3 text-slate-300 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

function SectionCard({ title, children }) {
  return (
    <Panel as="article" layout="plain" className="min-w-0 overflow-hidden">
      <h2 className="text-2xl font-bold text-cyan-300 mb-4">{title}</h2>
      {children}
    </Panel>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <SectionCard title="Links oficiais usados nesta orientação">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          A instalação deve ser feita a partir das fontes oficiais do projeto. Use os links abaixo para baixar binários, consultar o README e conferir o guia de compilação.
        </p>
        <div className="grid min-w-0 md:grid-cols-2 gap-4">
          {officialLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="min-w-0 rounded-2xl border border-slate-700/70 bg-slate-950/30 p-5 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
            >
              <span className="block text-lg font-semibold text-cyan-300 mb-2">{link.title}</span>
              <span className="block text-sm text-slate-300 leading-relaxed text-justify">{link.description}</span>
              <span className="mt-3 block break-all text-xs text-emerald-200">{link.url}</span>
            </a>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Escolha do caminho de instalação">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          A documentação oficial apresenta caminhos diferentes conforme o sistema operacional e o nível de controle desejado. Para uso comum, prefira instalação por pacote ou binário. Para pesquisa, reprodução de ambiente ou ativação de solvers/frontends, use build por código-fonte.
        </p>
        <div className="grid min-w-0 md:grid-cols-2 gap-4">
          {installChoices.map((item) => (
            <div key={item.title} className="min-w-0 rounded-2xl border border-slate-700/70 bg-slate-950/30 p-5">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed text-justify">{item.text}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Requisitos para compilação">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          O guia oficial recomenda pelo menos 6 GB de RAM. Clang, Boost e CMake são requisitos principais. Os solvers são opcionais no build, mas necessários para verificar muitos programas; o guia recomenda incluir pelo menos Boolector.
        </p>
        <DependencyTable />
      </SectionCard>
    </div>
  );
}

function WindowsTab() {
  return (
    <div className="space-y-6">
      <SectionCard title="Opção A: binário oficial para Windows">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          O README oficial informa que há binários para Windows na página de releases. Esse é o caminho mais simples quando o objetivo é apenas executar a ferramenta. Link: <a className="text-cyan-200 hover:text-cyan-100" href="https://github.com/esbmc/esbmc/releases" target="_blank" rel="noreferrer">https://github.com/esbmc/esbmc/releases</a>.
        </p>
        <ol className="list-decimal list-inside space-y-3 text-sm text-slate-300">
          <li>Acesse a página de releases do repositório oficial do ESBMC.</li>
          <li>Baixe o pacote correspondente ao Windows.</li>
          <li>Extraia em uma pasta fixa, por exemplo <code className="text-cyan-200">C:\Tools\esbmc</code>.</li>
          <li>Adicione essa pasta ao <code className="text-cyan-200">PATH</code> do Windows.</li>
          <li>Abra um novo terminal e execute <code className="text-cyan-200">esbmc --version</code>.</li>
        </ol>
      </SectionCard>

      <SectionCard title="Opção B: WSL com Ubuntu">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          O guia de build informa que o processo foi testado em Windows 10 com Ubuntu no WSL v1 ou v2. Essa opção é recomendada quando você quer usar os comandos Linux dentro do Windows.
        </p>
        <CodeBlock language="bash" label="WSL / Ubuntu">
          {"sudo add-apt-repository ppa:esbmc/esbmc\nsudo apt update\nsudo apt install esbmc\nesbmc --version"}
        </CodeBlock>
      </SectionCard>
    </div>
  );
}

function UbuntuTab() {
  return (
    <div className="space-y-6">
      <SectionCard title="Instalação oficial via PPA">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          No Ubuntu, a forma mais simples de instalar o ESBMC é pelo PPA oficial do projeto. A documentação recomenda esse caminho para usuários gerais e informa suporte ao Ubuntu 22.04 e 24.04. Link do PPA: <a className="text-cyan-200 hover:text-cyan-100" href="https://launchpad.net/~esbmc/+archive/ubuntu/esbmc" target="_blank" rel="noreferrer">https://launchpad.net/~esbmc/+archive/ubuntu/esbmc</a>.
        </p>
        <CodeBlock language="bash" label="Ubuntu 22.04 / 24.04">
          {"sudo add-apt-repository ppa:esbmc/esbmc\nsudo apt update\nsudo apt install esbmc"}
        </CodeBlock>
      </SectionCard>

      <SectionCard title="Binário oficial para Ubuntu">
        <p className="text-slate-300 leading-relaxed text-justify">
          A documentação também informa que o binário mais recente para Ubuntu pode ser baixado pela página de releases do GitHub. Esse caminho é útil quando você não quer usar PPA nem compilar. Link: <a className="text-cyan-200 hover:text-cyan-100" href="https://github.com/esbmc/esbmc/releases" target="_blank" rel="noreferrer">https://github.com/esbmc/esbmc/releases</a>.
        </p>
      </SectionCard>

      <SectionCard title="Dependências para build no Linux">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Para compilar por código-fonte, instale as dependências básicas listadas no guia oficial.
        </p>
        <CodeBlock language="bash" label="Linux / Ubuntu">
          {"sudo apt-get update && sudo apt-get install build-essential git gperf libgmp-dev cmake bison curl flex g++-multilib linux-libc-dev libboost-all-dev libtinfo-dev ninja-build python3-setuptools unzip wget python3-pip openjdk-8-jre"}
        </CodeBlock>
      </SectionCard>
    </div>
  );
}

function MacosTab() {
  return (
    <div className="space-y-6">
      <SectionCard title="Preparar dependências com Homebrew">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          No macOS, o caminho mais completo é compilar a partir do código-fonte. Use Homebrew para instalar ferramentas e bibliotecas básicas, além de Python/PySMT.
        </p>
        <CodeBlock language="bash" label="macOS / Homebrew">
          {"brew install gmp cmake boost ninja python3 wget automake flex bison z3\npip3 install PySMT"}
        </CodeBlock>
      </SectionCard>

      <SectionCard title="Xcode, Command Line Tools e SDK">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          O guia oficial orienta verificar se o SDK do Xcode está disponível. Se você não tiver o Xcode completo, use o sysroot das Command Line Tools no CMake.
        </p>
        <div className="grid min-w-0 lg:grid-cols-2 gap-5">
          <CodeBlock language="bash" label="Verificar SDK do Xcode">
            {"ls /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/usr/include/"}
          </CodeBlock>
          <CodeBlock language="bash" label="Sysroot com Command Line Tools">
            {"-DC2GOTO_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk"}
          </CodeBlock>
        </div>
      </SectionCard>

      <SectionCard title="Ajustes comuns no macOS">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Em alguns ambientes, variáveis antigas podem atrapalhar a busca por headers e SDKs. No projeto, remover essas variáveis ajudou a permitir que o compilador usasse os caminhos corretos do macOS/Xcode.
        </p>
        <CodeBlock language="bash" label="Limpar variáveis de ambiente">
          {"unset C_INCLUDE_PATH\nunset CPLUS_INCLUDE_PATH\nunset CPATH\nunset SDKROOT"}
        </CodeBlock>
      </SectionCard>

      <SectionCard title="Z3 instalado pelo Homebrew">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Quando o Z3 for instalado pelo Homebrew, o guia de build observa que pode ser necessário copiar o diretório do pacote para o workspace usado na compilação.
        </p>
        <CodeBlock language="bash" label="Copiar Z3">
          {"cp -rp $(brew info z3 | egrep \"/usr[/a-zA-Z\\.0-9]+ \" -o) z3"}
        </CodeBlock>
      </SectionCard>
    </div>
  );
}

function BuildTab() {
  return (
    <div className="space-y-6">
      <SectionCard title="Clonar o código-fonte">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          O código-fonte está disponível no repositório oficial do ESBMC no GitHub: <a className="text-cyan-200 hover:text-cyan-100" href="https://github.com/esbmc/esbmc" target="_blank" rel="noreferrer">https://github.com/esbmc/esbmc</a>. A documentação sugere organizar o projeto em uma pasta própria.
        </p>
        <CodeBlock language="bash" label="Clonar repositório">
          {"mkdir ESBMC_Project\ncd ESBMC_Project\ngit clone https://github.com/esbmc/esbmc\ncd esbmc"}
        </CodeBlock>
      </SectionCard>

      <SectionCard title="Preparar Clang">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          O ESBMC usa Clang como frontend para C/C++/CHERI/CUDA. A documentação descreve build estático com Clang externo ou download automático de dependências.
        </p>
        <div className="grid min-w-0 gap-5">
          <CodeBlock language="bash" label="Clang externo para build estático">
            {"wget https://github.com/llvm/llvm-project/releases/download/llvmorg-16.0.0/clang+llvm-16.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz\ntar xfJ clang+llvm-16.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz\nESBMC_CLANG=$(echo -D{LLVM,Clang}_DIR=$PWD/clang+llvm-16.0.0-x86_64-linux-gnu-ubuntu-18.04)\nESBMC_STATIC=ON"}
          </CodeBlock>
          <CodeBlock language="bash" label="Download pelo build">
            {"ESBMC_CLANG=-DDOWNLOAD_DEPENDENCIES=ON\nESBMC_STATIC=ON"}
          </CodeBlock>
        </div>
      </SectionCard>

      <SectionCard title="Solvers SMT opcionais">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          O guia lista Bitwuzla, Boolector, CVC4, CVC5, MathSAT, Yices 2 e Z3. Os solvers são opcionais para compilar, mas necessários para muitas verificações. A documentação recomenda incluir pelo menos Boolector.
        </p>
        <div className="grid min-w-0 lg:grid-cols-2 gap-5">
          <CodeBlock language="bash" label="Z3 no macOS">
            {"brew install z3"}
          </CodeBlock>
          <CodeBlock language="bash" label="Bitwuzla">
            {"git clone --depth=1 --branch=0.8.0 https://github.com/bitwuzla/bitwuzla.git\ncd bitwuzla\n./configure.py --prefix $PWD/../bitwuzla-release\ncd build\nmeson install"}
          </CodeBlock>
        </div>
      </SectionCard>

      <SectionCard title="Frontends opcionais">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Para Solidity, habilite o frontend com <code className="text-cyan-200">-DENABLE_SOLIDITY_FRONTEND=On</code>. Para Python, instale <code className="text-cyan-200">ast2json</code> e habilite <code className="text-cyan-200">-DENABLE_PYTHON_FRONTEND=On</code>.
        </p>
        <div className="grid min-w-0 lg:grid-cols-2 gap-5">
          <CodeBlock language="bash" label="Python frontend">
            {"pip3 install ast2json\n# usar no CMake:\n-DENABLE_PYTHON_FRONTEND=On"}
          </CodeBlock>
          <CodeBlock language="bash" label="Solidity frontend">
            {"# usar no CMake:\n-DENABLE_SOLIDITY_FRONTEND=On"}
          </CodeBlock>
        </div>
      </SectionCard>

      <SectionCard title="Configurar e compilar com CMake/Ninja">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Depois de instalar dependências, preparar Clang e escolher solvers, configure o ESBMC com CMake e compile com Ninja.
        </p>
        <CodeBlock language="bash" label="Build simplificado">
          {"cd ESBMC_Project/esbmc\nmkdir build\ncd build\ncmake .. -GNinja -DBUILD_TESTING=On -DENABLE_REGRESSION=On $ESBMC_CLANG -DBUILD_STATIC=${ESBMC_STATIC:-ON} -DCMAKE_INSTALL_PREFIX:PATH=$PWD/../../release\ncmake --build .\nninja install"}
        </CodeBlock>
      </SectionCard>
    </div>
  );
}

function ValidationTab() {
  return (
    <div className="space-y-6">
      <SectionCard title="Validar a instalação">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Depois de instalar ou compilar, confira se o binário está acessível no terminal. Também registre a versão usada no trabalho.
        </p>
        <div className="grid min-w-0 lg:grid-cols-2 gap-5">
          <CodeBlock language="bash" label="Verificar versão">
            {"esbmc --version"}
          </CodeBlock>
          <CodeBlock language="bash" label="Ver ajuda">
            {"esbmc --help"}
          </CodeBlock>
        </div>
      </SectionCard>

      <SectionCard title="Criar um primeiro arquivo de teste">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Para confirmar que a ferramenta está funcionando, crie um programa C simples com uma assertiva falsa. Esse exemplo deve produzir falha de verificação, pois a propriedade <code className="text-cyan-200">x &gt;= 0</code> não é satisfeita.
        </p>
        <CodeBlock language="bash" label="Criar arquivo assertiva.c">
          {"cat > assertiva.c <<'EOF'\n#include <assert.h>\n\nint main() {\n  int x = -1;\n  assert(x >= 0);\n  return 0;\n}\nEOF"}
        </CodeBlock>
      </SectionCard>

      <SectionCard title="Executar a verificação">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Execute o ESBMC passando o arquivo C como argumento. Se o programa violar uma propriedade, a saída deve indicar falha e apresentar informações do contraexemplo.
        </p>
        <CodeBlock language="bash" label="Rodar ESBMC">
          {"esbmc assertiva.c"}
        </CodeBlock>
        <div className="mt-5 rounded-2xl border border-slate-700/70 bg-slate-950/30 p-5">
          <p className="text-sm font-semibold text-cyan-200 mb-2">Resultado esperado</p>
          <p className="font-mono text-sm text-rose-200">VERIFICATION FAILED</p>
        </div>
      </SectionCard>

      <SectionCard title="Corrigir o arquivo e executar novamente">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Agora altere o valor da variável para satisfazer a assertiva. A verificação deve passar dentro dos limites analisados.
        </p>
        <CodeBlock language="bash" label="Criar arquivo corrigido.c">
          {"cat > corrigido.c <<'EOF'\n#include <assert.h>\n\nint main() {\n  int x = 1;\n  assert(x >= 0);\n  return 0;\n}\nEOF\n\nesbmc corrigido.c"}
        </CodeBlock>
        <div className="mt-5 rounded-2xl border border-slate-700/70 bg-slate-950/30 p-5">
          <p className="text-sm font-semibold text-cyan-200 mb-2">Resultado esperado</p>
          <p className="font-mono text-sm text-emerald-200">VERIFICATION SUCCESSFUL</p>
        </div>
      </SectionCard>

      <SectionCard title="Comandos básicos de execução">
        <p className="text-slate-300 leading-relaxed text-justify mb-6">
          Com o ESBMC instalado, execute a ferramenta sobre arquivos C/C++ e adicione opções conforme a propriedade que deseja verificar.
        </p>
        <div className="grid min-w-0 md:grid-cols-2 gap-5">
          {basicCommands.map((item) => (
            <div key={item.command} className="min-w-0 rounded-2xl border border-slate-700/70 bg-slate-950/30 p-5">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">{item.description}</p>
              <CodeBlock language="bash" label="Terminal">
                {item.command}
              </CodeBlock>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Salvar a saída em arquivo">
        <p className="text-slate-300 leading-relaxed text-justify mb-5">
          Para usar a saída no relatório, redirecione o resultado para um arquivo de texto. Use <code className="text-cyan-200">--no-color</code> quando quiser evitar caracteres de cor no terminal.
        </p>
        <CodeBlock language="bash" label="Salvar saída">
          {"esbmc assertiva.c --no-color > saida-esbmc.txt\nesbmc corrigido.c --no-color > saida-corrigido.txt"}
        </CodeBlock>
      </SectionCard>
    </div>
  );
}

export default function EsbmcInstalacao() {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId]
  );

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas/esbmc" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          Voltar para ESBMC
        </BackButton>
      </div>

      <PageHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300 mb-3">
          Guia operacional
        </p>
        <PageTitle className="mb-5">Instalação Windows/Linux/macOS</PageTitle>
        <PageDescription className="text-justify max-w-4xl">
          Guia baseado na documentação oficial do ESBMC, organizado por subtelas para separar instalação rápida, configuração por sistema operacional, build avançado e validação do ambiente.
        </PageDescription>
      </PageHeader>

      <div className="grid min-w-0 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">
        <Panel as="aside" layout="plain" className="lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
            Subtelas de instalação
          </p>
          <div className="space-y-2">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab.id;

              return (
                <Button variant="custom"
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-100"
                      : "border-slate-700/60 bg-slate-950/20 text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-400/10"
                  }`}
                >
                  <span className="block text-sm font-semibold">{tab.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                    {tab.description}
                  </span>
                </Button>
              );
            })}
          </div>
        </Panel>

        <main className="min-w-0 space-y-6">
          <Panel as="article" layout="plain" className="min-w-0 overflow-hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300 mb-3">
              {activeTab.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {activeTab.description}
            </h2>
          </Panel>

          {activeTab.id === "visao-geral" && <OverviewTab />}
          {activeTab.id === "windows" && <WindowsTab />}
          {activeTab.id === "ubuntu" && <UbuntuTab />}
          {activeTab.id === "macos" && <MacosTab />}
          {activeTab.id === "build" && <BuildTab />}
          {activeTab.id === "validacao" && <ValidationTab />}
        </main>
      </div>
    </PageTemplate>
  );
}
