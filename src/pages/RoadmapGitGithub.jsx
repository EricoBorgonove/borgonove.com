import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";

function copy(pt, en) {
  return { pt, en };
}

function pickCopy(item, isEn) {
  return isEn ? item.en : item.pt;
}

const fases = [
  {
    titulo: copy("Fase 1 — Mentalidade Git e Primeiros Comandos", "Phase 1 — Git Mindset and First Commands"),
    duracao: copy("1 a 2 semanas", "1 to 2 weeks"),
    topicos: [
      copy("O que Git resolve: histórico, rastreabilidade, colaboração e segurança de mudança.", "What Git solves: history, traceability, collaboration, and safer change management."),
      copy("Repositório, working tree, staging area, commit e HEAD.", "Repository, working tree, staging area, commit, and HEAD."),
      copy("Comandos iniciais: init, status, add, commit, log e diff.", "Initial commands: init, status, add, commit, log, and diff."),
    ],
    praticas: [
      copy("Criar um repositório local e registrar pequenas mudanças em sequência.", "Create a local repository and register small sequential changes."),
      copy("Treinar mensagens de commit curtas, claras e orientadas a objetivo.", "Practice short, clear, goal-oriented commit messages."),
    ],
    entregavel: copy(
      "Repositório local com histórico consistente e README explicando cada comando utilizado.",
      "Local repository with consistent history and a README explaining each command used."
    ),
  },
  {
    titulo: copy("Fase 2 — Histórico, Revisão e Recuperação", "Phase 2 — History, Review, and Recovery"),
    duracao: copy("1 a 2 semanas", "1 to 2 weeks"),
    topicos: [
      copy("Leitura de histórico com log, show, diff e comparação entre commits.", "Reading history with log, show, diff, and commit comparisons."),
      copy("Restauração e correção com restore, reset, revert e checkout de referência.", "Restoration and fixes with restore, reset, revert, and checking out references."),
      copy("Quando desfazer com segurança sem apagar contexto do time.", "When to undo safely without destroying team context."),
    ],
    praticas: [
      copy("Simular erros e recuperar arquivos e commits localmente.", "Simulate mistakes and recover files and commits locally."),
      copy("Comparar abordagens entre reset e revert em cenários reais.", "Compare reset and revert approaches in real scenarios."),
    ],
    entregavel: copy(
      "Guia pessoal de recuperação com exemplos de incidentes comuns e comando recomendado.",
      "Personal recovery guide with examples of common incidents and the recommended command."
    ),
  },
  {
    titulo: copy("Fase 3 — Branches, Merge e Organização de Fluxo", "Phase 3 — Branches, Merge, and Workflow Structure"),
    duracao: copy("2 a 3 semanas", "2 to 3 weeks"),
    topicos: [
      copy("Criação, troca e exclusão de branches.", "Branch creation, switching, and deletion."),
      copy("Merge fast-forward, merge commit e resolução de conflitos.", "Fast-forward merge, merge commits, and conflict resolution."),
      copy("Fluxos simples de feature branch, hotfix e release.", "Simple feature branch, hotfix, and release flows."),
    ],
    praticas: [
      copy("Criar múltiplas branches e integrar mudanças com merge controlado.", "Create multiple branches and integrate changes with controlled merges."),
      copy("Resolver conflitos manualmente e documentar a causa de cada conflito.", "Resolve conflicts manually and document the cause of each conflict."),
    ],
    entregavel: copy(
      "Repositório com fluxo de branches demonstrado e conflitos resolvidos conscientemente.",
      "Repository showing a branch workflow and consciously resolved conflicts."
    ),
  },
  {
    titulo: copy("Fase 4 — GitHub, Repositórios Remotos e Colaboração Básica", "Phase 4 — GitHub, Remote Repositories, and Basic Collaboration"),
    duracao: copy("2 a 3 semanas", "2 to 3 weeks"),
    topicos: [
      copy("Remote, origin, push, pull, fetch e sincronização entre local e remoto.", "Remote, origin, push, pull, fetch, and synchronization between local and remote."),
      copy("Fork, clone e contribuição em projetos existentes.", "Fork, clone, and contribution to existing projects."),
      copy("Configuração básica de perfil, repositório, README e visibilidade.", "Basic setup of profile, repository, README, and visibility."),
    ],
    praticas: [
      copy("Publicar repositórios no GitHub e manter histórico limpo.", "Publish repositories on GitHub and keep history clean."),
      copy("Fazer clone em outra pasta/máquina e validar fluxo de sincronização.", "Clone into another folder/machine and validate the sync workflow."),
    ],
    entregavel: copy(
      "Conta GitHub organizada com repositórios publicados e fluxo remoto funcional.",
      "Well-organized GitHub account with published repositories and a working remote flow."
    ),
  },
  {
    titulo: copy("Fase 5 — Pull Requests, Review e Trabalho em Equipe", "Phase 5 — Pull Requests, Review, and Team Collaboration"),
    duracao: copy("2 a 3 semanas", "2 to 3 weeks"),
    topicos: [
      copy("Pull requests, revisão de código, comentários e approval.", "Pull requests, code review, comments, and approval."),
      copy("Boas práticas para descrição de PR, contexto, checklist e evidências.", "Best practices for PR descriptions, context, checklists, and evidence."),
      copy("Squash merge, rebase merge e merge commit no contexto do time.", "Squash merge, rebase merge, and merge commit in team workflows."),
    ],
    praticas: [
      copy("Abrir PRs simulados entre branches com revisão técnica.", "Open simulated PRs between branches with technical review."),
      copy("Refatorar branch com base em feedback e atualizar histórico.", "Refactor a branch based on feedback and update history."),
    ],
    entregavel: copy(
      "Ciclo completo de colaboração com PR, revisão, ajustes e merge final.",
      "Complete collaboration cycle with PR, review, adjustments, and final merge."
    ),
  },
  {
    titulo: copy("Fase 6 — GitHub Issues, Projects e Planejamento de Entrega", "Phase 6 — GitHub Issues, Projects, and Delivery Planning"),
    duracao: copy("1 a 2 semanas", "1 to 2 weeks"),
    topicos: [
      copy("Uso de GitHub Issues para backlog, bugs, tarefas e documentação de contexto.", "Using GitHub Issues for backlog, bugs, tasks, and context documentation."),
      copy("GitHub Projects para organizar fluxo de execução e prioridade.", "GitHub Projects to organize execution flow and priorities."),
      copy("Relacionamento entre issue, branch, commit e pull request.", "Relationship between issue, branch, commit, and pull request."),
    ],
    praticas: [
      copy("Montar backlog simples com labels, responsáveis e status.", "Set up a simple backlog with labels, owners, and status."),
      copy("Conectar PRs a issues e acompanhar entrega por quadro.", "Connect PRs to issues and track delivery through a project board."),
    ],
    entregavel: copy(
      "Projeto GitHub com backlog funcional, issues conectadas e rastreabilidade de entrega.",
      "GitHub Project with a functional backlog, linked issues, and delivery traceability."
    ),
  },
  {
    titulo: copy("Fase 7 — Git Avançado: Rebase, Cherry-pick, Stash e Tags", "Phase 7 — Advanced Git: Rebase, Cherry-pick, Stash, and Tags"),
    duracao: copy("2 a 3 semanas", "2 to 3 weeks"),
    topicos: [
      copy("Rebase local, histórico linear e cuidados com branch compartilhada.", "Local rebasing, linear history, and caution with shared branches."),
      copy("Cherry-pick, stash, amend, reflog e recuperação avançada.", "Cherry-pick, stash, amend, reflog, and advanced recovery."),
      copy("Tags, versionamento e releases.", "Tags, versioning, and releases."),
    ],
    praticas: [
      copy("Simular cenários de seleção de commits e limpeza de histórico.", "Simulate scenarios for selecting commits and cleaning history."),
      copy("Versionar uma entrega com tag e release notes.", "Version a delivery with a tag and release notes."),
    ],
    entregavel: copy(
      "Repositório com histórico refinado, tags de versão e domínio dos comandos avançados.",
      "Repository with refined history, version tags, and mastery of advanced commands."
    ),
  },
  {
    titulo: copy("Fase 8 — Portfólio, Automação e Maturidade Profissional", "Phase 8 — Portfolio, Automation, and Professional Maturity"),
    duracao: copy("Contínua", "Continuous"),
    topicos: [
      copy("README profissional, documentação de fluxo e padrão de contribuição.", "Professional README, workflow documentation, and contribution standards."),
      copy("Integração com CI, branch protection e automações iniciais.", "Integration with CI, branch protection, and initial automations."),
      copy("Uso de Git/GitHub como diferencial em entrevistas e projetos reais.", "Using Git/GitHub as a differentiator in interviews and real projects."),
    ],
    praticas: [
      copy("Publicar projetos com histórico limpo, issues e PRs demonstráveis.", "Publish projects with clean history, demonstrable issues, and PRs."),
      copy("Configurar uma pipeline simples com verificação automática.", "Set up a simple pipeline with automated checks."),
    ],
    entregavel: copy(
      "Portfólio com maturidade de colaboração, rastreabilidade e boas práticas reais de time.",
      "Portfolio showing collaboration maturity, traceability, and real team practices."
    ),
  },
];

const matrizCompetencias = [
  {
    eixo: copy("Fundamentos Git", "Git Fundamentals"),
    itens: [
      copy("Entende working tree, staging, commit e HEAD.", "Understands working tree, staging, commit, and HEAD."),
      copy("Lê histórico e compara mudanças com segurança.", "Reads history and compares changes safely."),
      copy("Recupera arquivos e commits sem desespero.", "Recovers files and commits without panic."),
    ],
  },
  {
    eixo: copy("Colaboração", "Collaboration"),
    itens: [
      copy("Trabalha com branches, merge e pull requests.", "Works with branches, merge, and pull requests."),
      copy("Escreve commits e PRs com contexto técnico claro.", "Writes commits and PRs with clear technical context."),
      copy("Participa de revisão e ajuste de código em fluxo real.", "Participates in code review and adjustments in a real workflow."),
    ],
  },
  {
    eixo: copy("GitHub Operacional", "Operational GitHub"),
    itens: [
      copy("Publica, sincroniza e mantém repositórios remotos.", "Publishes, synchronizes, and maintains remote repositories."),
      copy("Usa issues, labels e projects para acompanhar entrega.", "Uses issues, labels, and projects to track delivery."),
      copy("Relaciona tarefas, branches, commits e merges.", "Relates tasks, branches, commits, and merges."),
    ],
  },
  {
    eixo: copy("Maturidade Profissional", "Professional Maturity"),
    itens: [
      copy("Domina rebase, tags, releases e limpeza de histórico.", "Masters rebase, tags, releases, and history cleanup."),
      copy("Evita ações destrutivas em branches compartilhadas.", "Avoids destructive actions on shared branches."),
      copy("Documenta fluxo e entrega com previsibilidade.", "Documents workflow and delivery with predictability."),
    ],
  },
];

const plano90Dias = [
  {
    periodo: copy("Dias 1–20", "Days 1–20"),
    foco: copy("Base local do Git", "Local Git foundation"),
    entregas: [
      copy("Comandos iniciais, histórico e recuperação básica.", "Initial commands, history, and basic recovery."),
      copy("Repositório de treino com múltiplos commits conscientes.", "Training repository with multiple intentional commits."),
    ],
  },
  {
    periodo: copy("Dias 21–40", "Days 21–40"),
    foco: copy("Branches e integração", "Branches and integration"),
    entregas: [
      copy("Fluxo com feature branches e resolução de conflitos.", "Workflow with feature branches and conflict resolution."),
      copy("Comparação prática entre merge e rebase local.", "Practical comparison between merge and local rebase."),
    ],
  },
  {
    periodo: copy("Dias 41–65", "Days 41–65"),
    foco: copy("GitHub e colaboração", "GitHub and collaboration"),
    entregas: [
      copy("Repositórios remotos, PRs, issues e projects.", "Remote repositories, PRs, issues, and projects."),
      copy("Backlog simples conectado ao fluxo de entrega.", "Simple backlog connected to the delivery workflow."),
    ],
  },
  {
    periodo: copy("Dias 66–90", "Days 66–90"),
    foco: copy("Maturidade e portfólio", "Maturity and portfolio"),
    entregas: [
      copy("Tags, releases, branch protection e automação inicial.", "Tags, releases, branch protection, and initial automation."),
      copy("Projeto público com histórico limpo e colaboração demonstrável.", "Public project with clean history and demonstrable collaboration."),
    ],
  },
];

const especializacoes = [
  {
    nome: copy("Fluxo de equipe com GitHub", "Team workflow with GitHub"),
    foco: copy("Pull requests, revisão, issues, projects e colaboração previsível.", "Pull requests, review, issues, projects, and predictable collaboration."),
    stack: copy("Git, GitHub, PR templates, labels, Projects, branch protection.", "Git, GitHub, PR templates, labels, Projects, branch protection."),
  },
  {
    nome: copy("Git para backend e plataformas", "Git for backend and platforms"),
    foco: copy("Histórico limpo, releases, hotfixes e estabilidade operacional.", "Clean history, releases, hotfixes, and operational stability."),
    stack: copy("Tags, release branches, CI, revert, cherry-pick, versioning.", "Tags, release branches, CI, revert, cherry-pick, versioning."),
  },
  {
    nome: copy("Git para open source", "Git for open source"),
    foco: copy("Forks, contribuição pública, discussão assíncrona e rastreabilidade.", "Forks, public contribution, asynchronous discussion, and traceability."),
    stack: copy("Fork, upstream, issues, discussions, PRs, code review.", "Fork, upstream, issues, discussions, PRs, code review."),
  },
];

const stackFerramentas = [
  {
    categoria: copy("Base", "Core"),
    ferramentas: copy("Git CLI, terminal, editor, GitHub account e chave SSH", "Git CLI, terminal, editor, GitHub account, and SSH key"),
  },
  {
    categoria: copy("Colaboração", "Collaboration"),
    ferramentas: copy("GitHub Issues, Projects, Pull Requests, labels e reviewers", "GitHub Issues, Projects, Pull Requests, labels, and reviewers"),
  },
  {
    categoria: copy("Qualidade de fluxo", "Workflow quality"),
    ferramentas: copy("Branch protection, CODEOWNERS, templates de issue/PR e CI básica", "Branch protection, CODEOWNERS, issue/PR templates, and basic CI"),
  },
];

const errosComuns = [
  copy("Comitar tudo sem revisar o staging.", "Committing everything without reviewing the staging area."),
  copy("Usar reset destrutivo em branch compartilhada.", "Using destructive reset on a shared branch."),
  copy("Abrir PR sem contexto, checklist ou objetivo claro.", "Opening a PR without context, checklist, or a clear goal."),
  copy("Não puxar mudanças do remoto antes de integrar trabalho local.", "Not pulling remote changes before integrating local work."),
  copy("Tratar Git como obrigação mecânica e não como ferramenta de comunicação.", "Treating Git as a mechanical obligation instead of a communication tool."),
];

const projetosPortfolio = [
  {
    nome: copy("Repositório de treino Git", "Git training repository"),
    escopo: copy("Histórico com múltiplos cenários: commit, merge, conflito, revert e tag.", "History with multiple scenarios: commit, merge, conflict, revert, and tag."),
  },
  {
    nome: copy("Projeto colaborativo com PRs", "Collaborative project with PRs"),
    escopo: copy("Equipe simulada com branches, reviews e merge orientado por checklist.", "Simulated team with branches, reviews, and checklist-driven merges."),
  },
  {
    nome: copy("Board de entrega no GitHub", "Delivery board on GitHub"),
    escopo: copy("Backlog, issues, labels, projeto e rastreabilidade fim a fim.", "Backlog, issues, labels, project board, and end-to-end traceability."),
  },
];

const rotinaEstudo = [
  copy("20 minutos de teoria e leitura de histórico/comandos.", "20 minutes of theory and history/command reading."),
  copy("40 minutos de prática em repositório de laboratório.", "40 minutes of practice in a lab repository."),
  copy("20 minutos de colaboração simulada com branch, PR ou issue.", "20 minutes of simulated collaboration with a branch, PR, or issue."),
  copy("10 minutos para registrar erros, comandos e aprendizados.", "10 minutes to record mistakes, commands, and lessons learned."),
];

const referenciasBase = [
  {
    nome: "roadmap.sh/git-github",
    tipo: copy("Roadmap principal de Git e GitHub.", "Main Git and GitHub roadmap."),
    url: "https://roadmap.sh/git-github",
  },
  {
    nome: "roadmap.sh/git-github beginner",
    tipo: copy("Versão focada em iniciantes.", "Beginner-focused version."),
    url: "https://roadmap.sh/git-github?r=git-github-beginner",
  },
  {
    nome: "Alura — Git e GitHub: compartilhando e colaborando em projetos",
    tipo: copy("Curso prático com fluxo de colaboração.", "Practical course focused on collaboration workflow."),
    url: "https://www.alura.com.br/curso-online-git-github-compartilhando-colaborando-projetos?srsltid=AfmBOorpZTmafZ3R97BeobzGS8-sXt1_PvlQg3eoMnoNoJrHYCEJSYZN",
  },
  {
    nome: "DEV.to — Getting Started with Git and GitHub",
    tipo: copy("Roadmap simples e introdutório da comunidade.", "Simple introductory roadmap from the community."),
    url: "https://dev.to/charalambosioannou/getting-started-with-git-and-github-a-simple-roadmap-lfn",
  },
  {
    nome: "Alura — Plano de estudos Git/GitHub",
    tipo: copy("Referência complementar de progressão de estudo.", "Complementary study progression reference."),
    url: "https://cursos.alura.com.br/meu-plano-de-estudos-isabela-pereira1-1676480319266-p537993",
  },
  {
    nome: "GitHub Blog — GitHub for beginners: Issues and Projects",
    tipo: copy("Material oficial com foco em Issues e Projects.", "Official material focused on Issues and Projects."),
    url: "https://github.blog/developer-skills/github/github-for-beginners-getting-started-with-github-issues-and-projects/",
  },
];

export default function RoadmapGitGithub() {
  const { text: uiText } = useContentTranslation();

  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");

  const txt = {
    title: isEn ? "Git and GitHub Roadmap" : "Roadmap de Git e GitHub",
    subtitle: isEn
      ? "A practical track to master version control, collaboration, pull requests, issues, projects, and a professional team workflow."
      : "Trilha prática para dominar versionamento, colaboração, pull requests, issues, projects e fluxo profissional de equipe.",
    howToUseTitle: isEn ? "How to use this track" : "Como usar esta trilha",
    howToUse: isEn
      ? [
          "Start with local Git before depending on GitHub.",
          "Train recovery and conflict resolution instead of memorizing only happy-path commands.",
          "Treat commits, PRs, and issues as communication artifacts, not just buttons.",
          "Build one public repository that proves your workflow maturity.",
        ]
      : [
          "Comece pelo Git local antes de depender do GitHub.",
          "Treine recuperação e conflitos, não apenas comandos de caminho feliz.",
          "Trate commits, PRs e issues como artefatos de comunicação, não só botões.",
          "Construa ao menos um repositório público que prove sua maturidade de fluxo.",
        ],
    competencyMatrix: isEn ? "Competency matrix" : "Matriz de competências",
    toolsStack: isEn ? "Tools and collaboration stack" : "Stack de ferramentas e colaboração",
    studyRoutine: isEn ? "Suggested study routine" : "Rotina de estudo sugerida",
  };

  return (
    <PageTemplate>
      <BackButton fallbackTo="/roadmaps" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">
        {uiText(t("roadmapPages.common.backToRoadmaps"))}
      </BackButton>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path fill="currentColor" d="M7 3a3 3 0 0 1 1 5.83V15a3 3 0 1 1-2 0V8.83A3 3 0 0 1 7 3Zm10 12a3 3 0 1 1-2 5.24 3 3 0 0 1 .58-5.5 6 6 0 0 0-5.16-4.68v-2a8 8 0 0 1 7.06 6.3A3 3 0 0 1 17 15ZM7 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>
      <PageDescription>{uiText(txt.subtitle)}</PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2v2Zm1.1-7.8-.9.9A1.9 1.9 0 0 0 13 11h-2v-.5a3 3 0 0 1 .88-2.12l1.24-1.24A1.5 1.5 0 1 0 10 6H8a3.5 3.5 0 1 1 6.1 2.2Z" />
          </svg>
          <span>{uiText(txt.howToUseTitle)}</span>
        </h2>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside mt-4">
          {txt.howToUse.map((item) => (
            <li key={item} className="text-justify">
              {uiText(item)}
            </li>
          ))}
        </ol>
      </Panel>

      <div className="space-y-5 mb-10">
        {fases.map((fase) => (
          <Panel as="details" layout="plain" key={pickCopy(fase.titulo, isEn)}>
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path fill="currentColor" d="M11 2h2v4h-2V2Zm7.07 2.93 1.41 1.41-2.83 2.83-1.41-1.41 2.83-2.83ZM20 11h2v2h-2v-2ZM4 11h2v2H4v-2Zm2.34-4.66 1.41-1.41 2.83 2.83-1.41 1.41-2.83-2.83ZM12 7a5 5 0 1 0 5 5h-5V7Z" />
                  </svg>
                  <span>{uiText(pickCopy(fase.titulo, isEn))}</span>
                </h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-600 text-slate-300">
                  {uiText(pickCopy(fase.duracao, isEn))}
                </span>
              </div>
            </summary>

            <div className="mt-5">
              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">{uiText(t("roadmapPages.common.topics"))}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-5">
                {fase.topicos.map((topico) => (
                  <li key={pickCopy(topico, isEn)} className="text-justify">
                    {uiText(pickCopy(topico, isEn))}
                  </li>
                ))}
              </ul>

              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">{uiText(t("roadmapPages.common.practices"))}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-5">
                {fase.praticas.map((pratica) => (
                  <li key={pickCopy(pratica, isEn)} className="text-justify">
                    {uiText(pickCopy(pratica, isEn))}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-slate-200">
                <span className="font-semibold text-cyan-300">{uiText(t("roadmapPages.common.deliverable"))}:</span>{" "}
                {uiText(pickCopy(fase.entregavel, isEn))}
              </p>
            </div>
          </Panel>
        ))}
      </div>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6H6v6h3a3 3 0 1 1 0 6H6a3 3 0 0 1-3-3V6Zm12-3h3a3 3 0 1 1 0 6h-3v2h-2V6a3 3 0 0 1 3-3Zm0 4h3a1 1 0 1 0 0-2h-3a1 1 0 0 0 0 2Zm-2 6h2v2h3a1 1 0 1 1 0 2h-3a3 3 0 0 1-3-3v-1h1Z" />
            </svg>
            <span>{uiText(txt.competencyMatrix)}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {matrizCompetencias.map((bloco) => (
            <article key={pickCopy(bloco.eixo, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100 mb-2">{uiText(pickCopy(bloco.eixo, isEn))}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                {bloco.itens.map((item) => (
                  <li key={pickCopy(item, isEn)} className="text-justify">
                    {uiText(pickCopy(item, isEn))}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 6a2 2 0 0 1 2-2h2V2h2v2h4V2h2v2h2a2 2 0 0 1 2 2v3H4V6Zm0 5h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Zm3 2v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Z" />
            </svg>
            <span>{uiText(t("roadmapPages.common.intensive90Days"))}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {plano90Dias.map((bloco) => (
            <article key={pickCopy(bloco.periodo, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300 mb-1">
                {uiText(pickCopy(bloco.periodo, isEn))}
              </p>
              <h3 className="text-base font-semibold text-slate-100 mb-2">{uiText(pickCopy(bloco.foco, isEn))}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                {bloco.entregas.map((item) => (
                  <li key={pickCopy(item, isEn)} className="text-justify">
                    {uiText(pickCopy(item, isEn))}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 3 2 7l10 4 8-3.2V17h2V7L12 3Zm-6 8v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11l-6 2.4L6 11Z" />
            </svg>
            <span>{uiText(t("roadmapPages.common.specializations"))}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {especializacoes.map((item) => (
            <article key={pickCopy(item.nome, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{uiText(pickCopy(item.nome, isEn))}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{uiText(pickCopy(item.foco, isEn))}</p>
              <p className="text-xs text-slate-400 mt-2">
                <span className="font-semibold text-slate-300">{uiText(t("roadmapPages.common.stack"))}:</span>{" "}
                {uiText(pickCopy(item.stack, isEn))}
              </p>
            </article>
          ))}
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M3 5a2 2 0 0 1 2-2h6v2H5v14h6v2H5a2 2 0 0 1-2-2V5Zm16 14h-6v2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-6v2h6v14Zm-9.3-3.3a1 1 0 0 1 0-1.4L12 12 9.7 9.7a1 1 0 1 1 1.4-1.4l3 3a1 1 0 0 1 0 1.4l-3 3a1 1 0 0 1-1.4 0Z" />
              </svg>
              <span>{uiText(txt.toolsStack)}</span>
            </h2>
          </summary>
          <div className="space-y-4 mt-4">
            {stackFerramentas.map((item) => (
              <article key={pickCopy(item.categoria, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                <h3 className="font-semibold text-slate-100">{uiText(pickCopy(item.categoria, isEn))}</h3>
                <p className="text-sm text-slate-300 mt-1 text-justify">{uiText(pickCopy(item.ferramentas, isEn))}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9h-9V3Zm-1 0v10h10a10 10 0 1 1-10-10Z" />
              </svg>
              <span>{uiText(txt.studyRoutine)}</span>
            </h2>
          </summary>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mt-4">
            {rotinaEstudo.map((item) => (
              <li key={pickCopy(item, isEn)} className="text-justify">
                {uiText(pickCopy(item, isEn))}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.3 13.3-1.4 1.4L12 13.8l-2.9 2.9-1.4-1.4 2.9-2.9-2.9-2.9 1.4-1.4L12 11l2.9-2.9 1.4 1.4-2.9 2.9 2.9 2.9Z" />
              </svg>
              <span>{uiText(t("roadmapPages.common.commonMistakesToAvoid"))}</span>
            </h2>
          </summary>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mt-4">
            {errosComuns.map((item) => (
              <li key={pickCopy(item, isEn)} className="text-justify">
                {uiText(pickCopy(item, isEn))}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel as="details" layout="plain">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2H4V5Zm0 4h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Zm4 3a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Zm0 4a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H8Z" />
              </svg>
              <span>{uiText(t("roadmapPages.common.portfolioProjects"))}</span>
            </h2>
          </summary>
          <div className="space-y-4 mt-4">
            {projetosPortfolio.map((item) => (
              <article key={pickCopy(item.nome, isEn)} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                <h3 className="font-semibold text-slate-100">{uiText(pickCopy(item.nome, isEn))}</h3>
                <p className="text-sm text-slate-300 mt-1 text-justify">{uiText(pickCopy(item.escopo, isEn))}</p>
              </article>
            ))}
          </div>
        </Panel>
      </div>

      <Panel as="details" layout="plain">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 4a8 8 0 0 1 8 8v7a1 1 0 1 1-2 0v-7a6 6 0 1 0-12 0v7a1 1 0 1 1-2 0v-7a8 8 0 0 1 8-8Zm-1 8h2v6h-2v-6Zm0-4h2v2h-2V8Z" />
            </svg>
            <span>{uiText(t("roadmapPages.common.baseReferencesUsed"))}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {referenciasBase.map((item) => (
            <article key={item.url} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{uiText(item.nome)}</h3>
              <p className="text-sm text-slate-300 mt-1">{uiText(pickCopy(item.tipo, isEn))}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cyan-300 hover:text-cyan-200 underline mt-2 inline-block"
              >
                {uiText(t("roadmapPages.common.openReference"))}
              </a>
            </article>
          ))}
        </div>
      </Panel>
    </PageTemplate>
  );
}
