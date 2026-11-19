import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

const MODULOS_PT = [
  {
    titulo: "1. Preparação do ambiente",
    descricao:
      "Instale o Git, configure seu nome e e-mail e valide se está tudo pronto no terminal.",
    passos: [
      "Baixe e instale o Git: https://git-scm.com/downloads",
      "No Windows, use Git Bash; no macOS/Linux, use o terminal padrão.",
      "Configure seu usuário global do Git.",
      "Confira a configuração aplicada.",
    ],
    comandos: [
      "git --version",
      'git config --global user.name "Seu Nome"',
      'git config --global user.email "seu@email.com"',
      "git config --global --list",
    ],
  },
  {
    titulo: "2. Criar repositório local",
    descricao: "Crie a pasta do projeto, inicialize o repositório e faça o primeiro commit.",
    passos: [
      "Crie a pasta e entre nela.",
      "Inicialize o repositório Git.",
      "Crie um arquivo inicial (README.md).",
      "Adicione os arquivos na staging area e faça o primeiro commit.",
    ],
    comandos: [
      "mkdir meu-projeto",
      "cd meu-projeto",
      "git init",
      'echo "# Meu Projeto" > README.md',
      "git add .",
      'git commit -m "feat: commit inicial"',
    ],
  },
  {
    titulo: "3. Criar repositório no GitHub e conectar",
    descricao:
      "Crie o repositório no GitHub (sem README) e associe o projeto local como remote origin.",
    passos: [
      "No GitHub: clique em New repository.",
      "Defina o nome do repositório e crie sem arquivos iniciais.",
      "Copie a URL HTTPS ou SSH do repositório.",
      "No terminal, adicione o remote origin.",
    ],
    comandos: [
      "git remote add origin https://github.com/SEU_USUARIO/seu-repo.git",
      "git remote -v",
    ],
  },
  {
    titulo: "4. Primeiro push para o GitHub",
    descricao: "Envie a branch principal local para o GitHub.",
    passos: [
      "Verifique o nome da branch atual (main ou master).",
      "Se necessário, renomeie para main.",
      "Faça o push inicial com upstream.",
    ],
    comandos: [
      "git branch",
      "git branch -M main",
      "git push -u origin main",
    ],
  },
  {
    titulo: "5. Fluxo diário: add, commit e push",
    descricao:
      "Depois de alterar arquivos, use esse fluxo para enviar atualizações com histórico claro.",
    passos: [
      "Verifique o que foi alterado.",
      "Adicione os arquivos desejados.",
      "Crie um commit com mensagem objetiva.",
      "Envie para o GitHub.",
    ],
    comandos: [
      "git status",
      "git add .",
      'git commit -m "feat: descrição da alteração"',
      "git push",
    ],
  },
  {
    titulo: "6. Clonar e atualizar com pull",
    descricao:
      "Para baixar um projeto existente, clone o repositório; para atualizar, use pull.",
    passos: [
      "Clone o repositório em uma máquina nova.",
      "Entre na pasta do projeto.",
      "Atualize com as mudanças mais recentes do GitHub.",
    ],
    comandos: [
      "git clone https://github.com/SEU_USUARIO/seu-repo.git",
      "cd seu-repo",
      "git pull origin main",
    ],
  },
  {
    titulo: "7. Trabalhar com branches (recomendado)",
    descricao:
      "Crie uma branch para cada tarefa, publique no GitHub e depois integre na main.",
    passos: [
      "Crie e troque para uma nova branch.",
      "Faça commits nessa branch.",
      "Envie a branch para o GitHub.",
      "Após revisão, faça merge da branch na main.",
    ],
    comandos: [
      "git checkout -b feature/minha-tarefa",
      "git add .",
      'git commit -m "feat: minha tarefa"',
      "git push -u origin feature/minha-tarefa",
      "git checkout main",
      "git pull origin main",
      "git merge feature/minha-tarefa",
      "git push origin main",
    ],
  },
  {
    titulo: "8. Comandos de apoio e resolução rápida",
    descricao: "Atalhos úteis para consultar histórico e corrigir cenários comuns.",
    passos: [
      "Consultar histórico resumido.",
      "Ver branches locais/remotas.",
      "Remover arquivo do stage sem apagar arquivo local.",
      "Sincronizar remotos.",
    ],
    comandos: [
      "git log --oneline --graph --decorate -n 15",
      "git branch -a",
      "git restore --staged NOME_DO_ARQUIVO",
      "git fetch --all --prune",
    ],
  },
];

const MODULOS_EN = [
  {
    titulo: "1. Environment setup",
    descricao:
      "Install Git, configure your name and email, and validate that everything is ready in the terminal.",
    passos: [
      "Download and install Git: https://git-scm.com/downloads",
      "On Windows, use Git Bash; on macOS/Linux, use the default terminal.",
      "Configure your global Git user.",
      "Check the applied configuration.",
    ],
    comandos: [
      "git --version",
      'git config --global user.name "Your Name"',
      'git config --global user.email "you@email.com"',
      "git config --global --list",
    ],
  },
  {
    titulo: "2. Create a local repository",
    descricao: "Create the project folder, initialize the repository, and make the first commit.",
    passos: [
      "Create the folder and enter it.",
      "Initialize the Git repository.",
      "Create an initial file (README.md).",
      "Add files to the staging area and create the first commit.",
    ],
    comandos: [
      "mkdir my-project",
      "cd my-project",
      "git init",
      'echo "# My Project" > README.md',
      "git add .",
      'git commit -m "feat: initial commit"',
    ],
  },
  {
    titulo: "3. Create a GitHub repository and connect",
    descricao:
      "Create the repository on GitHub (without README) and link your local project as remote origin.",
    passos: [
      "On GitHub: click New repository.",
      "Set the repository name and create it without initial files.",
      "Copy the repository HTTPS or SSH URL.",
      "In terminal, add the remote origin.",
    ],
    comandos: [
      "git remote add origin https://github.com/YOUR_USER/your-repo.git",
      "git remote -v",
    ],
  },
  {
    titulo: "4. First push to GitHub",
    descricao: "Send your local main branch to GitHub.",
    passos: [
      "Check your current branch name (main or master).",
      "If needed, rename it to main.",
      "Run the initial push with upstream.",
    ],
    comandos: [
      "git branch",
      "git branch -M main",
      "git push -u origin main",
    ],
  },
  {
    titulo: "5. Daily flow: add, commit and push",
    descricao:
      "After changing files, use this flow to send updates with a clear history.",
    passos: [
      "Check what was changed.",
      "Add the desired files.",
      "Create a commit with an objective message.",
      "Push to GitHub.",
    ],
    comandos: [
      "git status",
      "git add .",
      'git commit -m "feat: change description"',
      "git push",
    ],
  },
  {
    titulo: "6. Clone and update with pull",
    descricao:
      "To download an existing project, clone the repository; to update it, use pull.",
    passos: [
      "Clone the repository on a new machine.",
      "Enter the project folder.",
      "Update with the latest changes from GitHub.",
    ],
    comandos: [
      "git clone https://github.com/YOUR_USER/your-repo.git",
      "cd your-repo",
      "git pull origin main",
    ],
  },
  {
    titulo: "7. Work with branches (recommended)",
    descricao:
      "Create one branch per task, publish it on GitHub, and then integrate into main.",
    passos: [
      "Create and switch to a new branch.",
      "Commit changes on this branch.",
      "Push the branch to GitHub.",
      "After review, merge the branch into main.",
    ],
    comandos: [
      "git checkout -b feature/my-task",
      "git add .",
      'git commit -m "feat: my task"',
      "git push -u origin feature/my-task",
      "git checkout main",
      "git pull origin main",
      "git merge feature/my-task",
      "git push origin main",
    ],
  },
  {
    titulo: "8. Support commands and quick fixes",
    descricao: "Useful shortcuts to inspect history and fix common scenarios quickly.",
    passos: [
      "Check compact history.",
      "See local/remote branches.",
      "Remove file from stage without deleting local file.",
      "Sync remotes.",
    ],
    comandos: [
      "git log --oneline --graph --decorate -n 15",
      "git branch -a",
      "git restore --staged FILE_NAME",
      "git fetch --all --prune",
    ],
  },
];

export default function GitGithub() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to subjects",
        title: "Git and GitHub",
        subtitle: "Practical track from repository creation to full push and pull workflow.",
        objectiveTitle: "Subject goal",
        objective:
          "By the end, you will be able to create a local repository, connect it to GitHub, push code, update with pull, and work with branches in daily tasks.",
        commands: "Commands",
      }
    : {
        back: "Voltar para Disciplinas",
        title: "Git e GitHub",
        subtitle: "Trilha prática desde a criação do repositório até o fluxo completo de push e pull.",
        objectiveTitle: "Objetivo da disciplina",
        objective:
          "Ao final, você conseguirá criar um repositório local, conectar com GitHub, enviar código, atualizar projeto com pull e trabalhar com branches no dia a dia.",
        commands: "Comandos",
      };

  const modulos = isEn ? MODULOS_EN : MODULOS_PT;

  return (
    <PageTemplate>
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">{txt.back}</BackButton>
      </div>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.8-.25.8-.56v-2.18c-3.26.72-3.95-1.4-3.95-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.1-.75.4-1.26.73-1.55-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.2a11.08 11.08 0 0 1 5.83 0c2.22-1.51 3.2-1.2 3.2-1.2.64 1.65.24 2.87.12 3.17.75.82 1.2 1.87 1.2 3.15 0 4.5-2.75 5.5-5.36 5.79.41.36.78 1.08.78 2.18v3.23c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5Z"
          />
        </svg>
        <span>{txt.title}</span>
      </PageTitle>
      <PageDescription>{txt.subtitle}</PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-lg font-semibold text-cyan-300 mb-2">{txt.objectiveTitle}</h2>
        <p className="text-sm text-slate-300 leading-relaxed">{txt.objective}</p>
      </Panel>

      <div className="space-y-5">
        {modulos.map((modulo) => (
          <Panel as="details" layout="plain" key={modulo.titulo}>
            <summary className="cursor-pointer text-lg font-semibold text-cyan-300">
              {modulo.titulo}
            </summary>
            <p className="mt-3 text-sm text-slate-300">{modulo.descricao}</p>

            <ol className="mt-4 space-y-2 text-sm text-slate-300 list-decimal list-inside">
              {modulo.passos.map((passo) => (
                <li key={passo} className="text-justify">
                  {passo}
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">{txt.commands}</p>
              <pre className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-xs text-slate-200 overflow-auto">
                {modulo.comandos.join("\n")}
              </pre>
            </div>
          </Panel>
        ))}
      </div>
    </PageTemplate>
  );
}
