import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Select } from "../components/ui/Patterns";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { translatePtToEnWithMap } from "../utils/ptEnTranslate";
import BackButton from "../components/BackButton";
import roadmapCiberEnMap from "../data/roadmap-ciber-en-map.json";

const fases = [
  {
    titulo: "Fase 1 — Fundamentos de TI e Segurança",
    duracao: "4 a 8 semanas",
    topicos: [
      "Sistemas operacionais: Linux e Windows (usuário, permissões, processos, serviços).",
      "Redes: modelo OSI/TCP-IP, DNS, HTTP/HTTPS, portas, sub-redes e firewall.",
      "Linha de comando: Bash/PowerShell para automação básica.",
      "Conceitos de segurança: CIA (confidencialidade, integridade, disponibilidade), risco, ameaça e vulnerabilidade.",
    ],
    praticas: [
      "Montar um laboratório local com VirtualBox e 2 VMs (cliente e servidor).",
      "Capturar tráfego com Wireshark e identificar DNS, HTTP e TLS.",
      "Criar scripts simples para inventário de arquivos e monitoramento básico.",
    ],
    entregavel:
      "Relatório técnico com topologia do laboratório, comandos utilizados e evidências de captura de tráfego.",
  },
  {
    titulo: "Fase 2 — Segurança Ofensiva (Base)",
    duracao: "6 a 10 semanas",
    topicos: [
      "Reconhecimento e enumeração: DNS, serviços e superfícies de ataque.",
      "Web security: OWASP Top 10, autenticação, sessão, validação de entrada.",
      "Ferramentas: Nmap, Burp Suite, ffuf, sqlmap (uso ético em laboratório).",
      "Princípios de Pentest: escopo, autorização, metodologia e reporte.",
    ],
    praticas: [
      "Resolver máquinas de laboratório (TryHackMe / Hack The Box / PortSwigger Academy).",
      "Documentar exploração de vulnerabilidades de baixa e média criticidade.",
      "Criar checklist de testes para aplicações web.",
    ],
    entregavel:
      "Relatório de pentest educacional com achados, severidade, impacto e recomendações de correção.",
  },
  {
    titulo: "Fase 3 — Segurança Defensiva (Blue Team)",
    duracao: "6 a 10 semanas",
    topicos: [
      "Logs e telemetria: Syslog, Windows Event Logs, auditoria e trilhas.",
      "Detecção e resposta: SIEM, regras de correlação e alertas.",
      "Hardening: servidores Linux/Windows, políticas e segmentação de rede.",
      "Resposta a incidentes: identificação, contenção, erradicação e lições aprendidas.",
    ],
    praticas: [
      "Configurar centralização de logs (Wazuh/ELK/Splunk free).",
      "Criar playbooks de incidentes para phishing, malware e brute force.",
      "Aplicar baseline de hardening em uma VM web.",
    ],
    entregavel:
      "Pacote de defesa com regras de detecção, dashboard e playbook de resposta a incidentes.",
  },
  {
    titulo: "Fase 4 — Especialização e Carreira",
    duracao: "Contínua",
    topicos: [
      "Escolha de trilha: Red Team, Blue Team, AppSec, Cloud Security ou GRC.",
      "Padrões e frameworks: NIST CSF, ISO 27001, MITRE ATT&CK.",
      "Segurança em nuvem: IAM, redes, storage, monitoramento e postura.",
      "Comunicação executiva: priorização por risco e plano de mitigação.",
    ],
    praticas: [
      "Construir um portfólio público com 4 a 6 projetos reais de segurança.",
      "Publicar write-ups, resumos técnicos e post-mortem de laboratórios.",
      "Simular entrevistas técnicas com foco em cenários reais.",
    ],
    entregavel:
      "Roadmap individual de 90 dias com metas semanais, estudo dirigido e projetos de evidência.",
  },
];

const trilhas = [
  {
    nome: "Blue Team (SOC/Defesa)",
    foco: "Detecção, monitoramento e resposta a incidentes.",
    stack: "SIEM, EDR, threat hunting, hardening, forense inicial.",
  },
  {
    nome: "Red Team / Pentest",
    foco: "Descoberta e exploração controlada de vulnerabilidades.",
    stack: "Reconhecimento, exploração web, AD básico, reporte executivo.",
  },
  {
    nome: "AppSec",
    foco: "Segurança no ciclo de desenvolvimento (DevSecOps).",
    stack: "SAST, DAST, threat modeling, revisão de código e CI/CD seguro.",
  },
  {
    nome: "Cloud Security",
    foco: "Proteção de workloads e dados em nuvem.",
    stack: "IAM, rede, posture management, logging, compliance.",
  },
];

const certificacoes = [
  "Iniciante: Google Cybersecurity Certificate, Security+ (CompTIA).",
  "Intermediário: eJPT, CySA+, SC-200, PNPT.",
  "Avançado: OSCP, CISSP, CISM, CCSP (conforme objetivo).",
];

const projetosPortfolio = [
  "Laboratório com ataque e defesa documentados (com timeline do incidente).",
  "Dashboard de detecção com 10 regras e alertas validados.",
  "Relatório de pentest web com matriz de risco e plano de correção.",
  "Projeto de hardening completo de servidor com checklist e evidências.",
  "Mapa de ameaças (MITRE ATT&CK) para uma aplicação fictícia.",
];

const planoSemanal = [
  "8h teoria (conceitos, leitura e revisão).",
  "8h laboratório prático (hands-on orientado por objetivo).",
  "2h documentação (write-up técnico e lições aprendidas).",
  "2h revisão e planejamento da semana seguinte.",
];

const sprint90Dias = [
  {
    periodo: "Dias 1–14",
    foco: "Fundamentos fortes",
    entregas: [
      "Redes (TCP/IP, DNS, HTTP, SMTP, RDP), Linux e Windows básicos.",
      "Security+ e conceitos centrais: CIA, risco, ameaças e controles.",
      "Laboratório local com VMs e hardening inicial.",
    ],
  },
  {
    periodo: "Dias 15–42",
    foco: "Sistema + Scripting",
    entregas: [
      "Linux na prática (processos, permissões, serviços e logs).",
      "Python para automação de tarefas de segurança.",
      "Git/GitHub para versionar scripts, playbooks e relatórios.",
    ],
  },
  {
    periodo: "Dias 43–70",
    foco: "Detecção e observabilidade",
    entregas: [
      "Análise de tráfego com Wireshark/tcpdump e interpretação de PCAP.",
      "SIEM e logs (ELK/Splunk/Sentinel) com regras e dashboards básicos.",
      "Introdução a investigação e resposta a incidentes.",
    ],
  },
  {
    periodo: "Dias 71–90",
    foco: "Cloud + ofensiva controlada",
    entregas: [
      "Fundamentos de segurança em AWS/Azure/GCP e IAM.",
      "Prática em laboratórios autorizados (HTB, THM, PortSwigger).",
      "Projeto final com relatório executivo + técnico para portfólio.",
    ],
  },
];

const dominiosCarreira = [
  {
    dominio: "SOC Analyst / Blue Team",
    objetivo: "Detectar, investigar e responder incidentes com velocidade.",
    habilidades: "SIEM, EDR, análise de logs, MITRE ATT&CK e playbooks de IR.",
  },
  {
    dominio: "Penetration Testing / Red Team",
    objetivo: "Simular ataques reais para validar controles defensivos.",
    habilidades: "Recon, enumeração, exploração web/rede, AD e pós-exploração.",
  },
  {
    dominio: "Cloud Security",
    objetivo: "Proteger identidades, workloads e dados em nuvem.",
    habilidades: "IAM, CSPM, IaC security, auditoria e resposta em cloud.",
  },
  {
    dominio: "DFIR / Forense Digital",
    objetivo: "Preservar evidências e reconstruir incidentes com rigor.",
    habilidades: "Imagem forense, memória, timeline, artefatos e cadeia de custódia.",
  },
  {
    dominio: "Malware Analysis",
    objetivo: "Entender comportamento malicioso para detectar e conter.",
    habilidades: "Static/dynamic analysis, engenharia reversa e IOC.",
  },
  {
    dominio: "GRC",
    objetivo: "Conectar segurança técnica com risco e compliance.",
    habilidades: "NIST/ISO, avaliação de risco, políticas, auditoria e continuidade.",
  },
];

const topicosWebApp = [
  "Reconhecimento e enumeração de aplicações web.",
  "Autenticação, autorização e gestão de sessão (incluindo JWT).",
  "Validação de entrada: SQLi, XSS, SSRF, SSTI e command injection.",
  "Misconfigurações, exposição de backups e superfícies administrativas.",
];

const matrizCompetencias = [
  {
    eixo: "Fundamentos",
    itens: [
      "Redes e protocolos (DNS, HTTP/S, SMTP, RDP, SMB).",
      "Sistemas operacionais (Linux/Windows), processos e permissões.",
      "Bash/PowerShell + Python para automação.",
      "Criptografia, identidade e princípios de segurança.",
    ],
  },
  {
    eixo: "Detecção e Resposta",
    itens: [
      "SIEM, correlação, dashboards e alertas úteis.",
      "EDR/XDR, IOC/IOA, threat intel e hunting.",
      "Fluxo de IR (NIST/SANS): identificação até lições aprendidas.",
      "Forense inicial (memória, disco, timeline e artefatos).",
    ],
  },
  {
    eixo: "Ofensiva",
    itens: [
      "Recon, enumeração e modelagem de superfície de ataque.",
      "Web App Security (OWASP Top 10 + API Security).",
      "Pós-exploração, movimento lateral e escalonamento.",
      "Relatório técnico + executivo com plano de mitigação.",
    ],
  },
  {
    eixo: "Cloud e DevSecOps",
    itens: [
      "Shared Responsibility Model, IAM e segredos.",
      "Segurança de IaC (checkov/tfsec) e pipelines CI/CD.",
      "Postura de segurança (CSPM) e trilhas de auditoria.",
      "Containers/Kubernetes e resposta a incidentes em cloud.",
    ],
  },
];

const stacksFerramentas = [
  {
    categoria: "Enumeração e Pentest",
    ferramentas: "Nmap, Burp Suite, ffuf, sqlmap, Metasploit, Gobuster, Nikto",
  },
  {
    categoria: "Detecção e SOC",
    ferramentas: "Splunk, ELK, Microsoft Sentinel, Wazuh, Sysmon, Sigma, YARA",
  },
  {
    categoria: "Forense e Malware",
    ferramentas: "Volatility, Autopsy, FTK Imager, Procmon, Wireshark, x64dbg, Ghidra",
  },
  {
    categoria: "Cloud Security",
    ferramentas: "CloudTrail, GuardDuty, Azure Defender, Prowler, Checkov, tfsec",
  },
  {
    categoria: "Automação e Colaboração",
    ferramentas: "Python, Bash, PowerShell, Git/GitHub, Jira, Notion, Markdown",
  },
];

const plataformasPratica = [
  {
    nivel: "Base e guiado",
    itens: [
      "TryHackMe (trilhas estruturadas: SOC, web e fundamentos).",
      "PortSwigger Academy (laboratórios de segurança web).",
      "OverTheWire e Linux Journey (linha de comando e Linux).",
    ],
  },
  {
    nivel: "Intermediário",
    itens: [
      "Hack The Box (máquinas e desafios com maior autonomia).",
      "CyberDefenders / BTLO / LetsDefend (foco Blue Team e SOC).",
      "Laboratórios próprios com VMs vulneráveis + SIEM local.",
    ],
  },
  {
    nivel: "Avançado",
    itens: [
      "Purple teaming com cenários de ataque e defesa no mesmo ambiente.",
      "Projetos completos com ATT&CK mapping e métricas de detecção.",
      "Simulação de incidentes com runbook, RCA e lições aprendidas.",
    ],
  },
];

const certificacoesPorTrilha = [
  {
    trilha: "SOC / Blue Team",
    recomendacao: "Security+, BTL1, CySA+, SC-200, GCIA/GCIH",
  },
  {
    trilha: "Pentest / Red Team",
    recomendacao: "eJPT, PNPT, OSCP, CRTP/CRTE, OSEP",
  },
  {
    trilha: "Cloud Security",
    recomendacao: "AZ-900/SC-900, AWS Cloud Practitioner, AWS Security Specialty, CCSP",
  },
  {
    trilha: "GRC / Governança",
    recomendacao: "ISO 27001 Foundation, CISA, CRISC, CISSP/CISM",
  },
  {
    trilha: "DFIR / Malware",
    recomendacao: "CHFI, GCFE/GCFA, GREM, OSMR",
  },
];

const marcosMaturidade = [
  "Júnior: executa playbooks, investiga alertas e documenta com qualidade.",
  "Pleno: cria detecções, melhora processos e conduz incidentes de média complexidade.",
  "Sênior: lidera resposta, define estratégia técnica e orienta equipe/projetos.",
];

const referenciasBase = [
  {
    nome: "Cybersecurity Mastery Roadmap",
    tipo: "Trilha ampla e estruturada de evolução em cibersegurança.",
    url: "https://github.com/Hamed233/Cybersecurity-Mastery-Roadmap",
  },
  {
    nome: "roadmap.sh - Cyber Security",
    tipo: "Mapa visual de tópicos e progressão por domínio.",
    url: "https://roadmap.sh/cyber-security",
  },
  {
    nome: "GitHub Topics - cybersecurity-roadmap",
    tipo: "Curadoria de repositórios e trilhas da comunidade.",
    url: "https://github.com/topics/cybersecurity-roadmap",
  },
  {
    nome: "90DaysOfCyberSecurity",
    tipo: "Plano intensivo com progressão prática diária.",
    url: "https://github.com/farhanashrafdev/90DaysOfCyberSecurity",
  },
  {
    nome: "Cybersecurity Roadmaps (UNK9)",
    tipo: "Consolidação de roadmaps e caminhos de estudo.",
    url: "https://unk9vvn.github.io/cybersecurity-roadmaps",
  },
];

const perfilOpcoes = [
  { id: "todos" },
  { id: "iniciante" },
  { id: "blue-team" },
  { id: "red-team" },
  { id: "appsec" },
  { id: "cloud-security" },
  { id: "dfir" },
  { id: "grc" },
];

const secoesPorPerfil = {
  iniciante: ["fase-1", "section-sprint90", "section-labs", "section-plano", "section-portfolio"],
  "blue-team": [
    "fase-1",
    "fase-3",
    "section-matriz",
    "section-stack",
    "section-labs",
    "section-dominios",
    "section-especializacoes",
    "section-plano",
    "section-cert-trilha",
    "section-marcos",
    "section-portfolio",
  ],
  "red-team": [
    "fase-1",
    "fase-2",
    "section-matriz",
    "section-stack",
    "section-labs",
    "section-dominios",
    "section-especializacoes",
    "section-plano",
    "section-cert-trilha",
    "section-portfolio",
  ],
  appsec: [
    "fase-1",
    "fase-2",
    "fase-4",
    "section-matriz",
    "section-stack",
    "section-labs",
    "section-dominios",
    "section-especializacoes",
    "section-plano",
    "section-cert-trilha",
    "section-portfolio",
  ],
  "cloud-security": [
    "fase-1",
    "fase-4",
    "section-matriz",
    "section-stack",
    "section-labs",
    "section-dominios",
    "section-especializacoes",
    "section-plano",
    "section-cert-trilha",
    "section-marcos",
    "section-portfolio",
  ],
  dfir: [
    "fase-1",
    "fase-3",
    "section-matriz",
    "section-stack",
    "section-labs",
    "section-dominios",
    "section-especializacoes",
    "section-plano",
    "section-cert-trilha",
    "section-marcos",
    "section-portfolio",
  ],
  grc: [
    "fase-1",
    "fase-4",
    "section-matriz",
    "section-dominios",
    "section-plano",
    "section-cert-trilha",
    "section-marcos",
    "section-portfolio",
  ],
};

export default function RoadmapCiberseguranca() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const tx = (value) => (isEn ? translatePtToEnWithMap(value, roadmapCiberEnMap) : value);
  const [perfilSelecionado, setPerfilSelecionado] = useState("todos");
  const sectionRef = useRef(null);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const detailsList = container.querySelectorAll('[data-roadmap-detail="true"]');
    detailsList.forEach((detail) => {
      detail.open = false;
    });

    if (perfilSelecionado === "todos") return;

    const secoes = new Set(secoesPorPerfil[perfilSelecionado] || []);
    detailsList.forEach((detail) => {
      if (secoes.has(detail.dataset.roadmapKey)) {
        detail.open = true;
      }
    });
  }, [perfilSelecionado]);

  return (
    <PageTemplate ref={sectionRef}>
      <BackButton fallbackTo="/roadmaps" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">
        {t("roadmapPages.common.backToRoadmaps")}
      </BackButton>

      <PageHeader><PageTitle className="mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 2.1 6 2.25V11c0 4.1-2.6 8.1-6 9.6-3.4-1.5-6-5.5-6-9.6V6.35L12 4.1ZM11 8h2v5h-2V8Zm0 6h2v2h-2v-2Z"
          />
        </svg>
        <span>{t("roadmapPages.ciber.title")}</span>
      </PageTitle>
      <PageDescription>
        {t("roadmapPages.ciber.subtitle")}
      </PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="mb-8">
        <label htmlFor="perfil-roadmap" className="block text-sm text-slate-300 mb-2">
          {t("roadmapPages.ciber.filterLabel")}
        </label>
        <Select
          id="perfil-roadmap"
          value={perfilSelecionado}
          onChange={(event) => setPerfilSelecionado(event.target.value)}
          className="w-full md:max-w-md border text-slate-100 focus:outline-none focus:border-cyan-400"
        >
          {perfilOpcoes.map((perfil) => (
            <option key={perfil.id} value={perfil.id}>
              {t(`roadmapPages.ciber.profiles.${perfil.id}`)}
            </option>
          ))}
        </Select>
        <p className="text-xs text-slate-400 mt-2">
          {t("roadmapPages.ciber.filterHelp")}
        </p>
      </Panel>

      <Panel as="div" layout="plain" className="mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2v2Zm1.1-7.8-.9.9A1.9 1.9 0 0 0 13 11h-2v-.5a3 3 0 0 1 .88-2.12l1.24-1.24A1.5 1.5 0 1 0 10 6H8a3.5 3.5 0 1 1 6.1 2.2Z" />
          </svg>
          <span>{t("roadmapPages.common.howToUseTrack")}</span>
        </h2>
        <div className="mt-4">
          <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
            <li className="text-justify">{t("roadmapPages.ciber.howToUse.0")}</li>
            <li className="text-justify">{t("roadmapPages.ciber.howToUse.1")}</li>
            <li className="text-justify">{t("roadmapPages.ciber.howToUse.2")}</li>
            <li className="text-justify">{t("roadmapPages.ciber.howToUse.3")}</li>
          </ol>
        </div>
      </Panel>

      <div className="space-y-5 mb-10">
        {fases.map((fase, index) => (
          <Panel as="details" layout="plain"
            key={fase.titulo}

            data-roadmap-detail="true"
            data-roadmap-key={`fase-${index + 1}`}
          >
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path fill="currentColor" d="M11 2h2v4h-2V2Zm7.07 2.93 1.41 1.41-2.83 2.83-1.41-1.41 2.83-2.83ZM20 11h2v2h-2v-2ZM4 11h2v2H4v-2Zm2.34-4.66 1.41-1.41 2.83 2.83-1.41 1.41-2.83-2.83ZM12 7a5 5 0 1 0 5 5h-5V7Z" />
                  </svg>
                  <span>{tx(fase.titulo)}</span>
                </h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-600 text-slate-300">
                  {tx(fase.duracao)}
                </span>
              </div>
            </summary>

            <div className="mt-5">
              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">{t("roadmapPages.common.topics")}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-5">
                {fase.topicos.map((topico) => (
                  <li key={topico} className="text-justify">
                    {tx(topico)}
                  </li>
                ))}
              </ul>

              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">{t("roadmapPages.common.practices")}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-5">
                {fase.praticas.map((pratica) => (
                  <li key={pratica} className="text-justify">
                    {tx(pratica)}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-slate-200">
                <span className="font-semibold text-cyan-300">{t("roadmapPages.common.deliverable")}:</span> {tx(fase.entregavel)}
              </p>

              {fase.titulo.includes("Ofensiva") && (
                <>
                  <h3 className="text-sm uppercase tracking-wide text-slate-400 mt-5 mb-2">
                    {tx("Complemento (Web App Security)")}
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                    {topicosWebApp.map((item) => (
                      <li key={item} className="text-justify">
                        {tx(item)}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Panel>
        ))}
      </div>

      <Panel as="details" layout="plain" className="mb-8" data-roadmap-detail="true" data-roadmap-key="section-sprint90">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 6a2 2 0 0 1 2-2h2V2h2v2h4V2h2v2h2a2 2 0 0 1 2 2v3H4V6Zm0 5h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Zm3 2v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Z" />
            </svg>
            <span>{t("roadmapPages.common.intensive90Days")}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {sprint90Dias.map((bloco) => (
            <article key={bloco.periodo} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300 mb-1">
                {tx(bloco.periodo)}
              </p>
              <h3 className="text-base font-semibold text-slate-100 mb-2">{tx(bloco.foco)}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                {bloco.entregas.map((item) => (
                  <li key={item} className="text-justify">
                    {tx(item)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8" data-roadmap-detail="true" data-roadmap-key="section-matriz">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6H6v6h3a3 3 0 1 1 0 6H6a3 3 0 0 1-3-3V6Zm12-3h3a3 3 0 1 1 0 6h-3v2h-2V6a3 3 0 0 1 3-3Zm0 4h3a1 1 0 1 0 0-2h-3a1 1 0 0 0 0 2Zm-2 6h2v2h3a1 1 0 1 1 0 2h-3a3 3 0 0 1-3-3v-1h1Z" />
            </svg>
            <span>{t("roadmapPages.ciber.competencyMatrix")}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {matrizCompetencias.map((bloco) => (
            <article key={bloco.eixo} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100 mb-2">{tx(bloco.eixo)}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                {bloco.itens.map((item) => (
                  <li key={item} className="text-justify">
                    {tx(item)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8" data-roadmap-detail="true" data-roadmap-key="section-stack">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 3c-4.97 0-9 1.34-9 3v12c0 1.66 4.03 3 9 3s9-1.34 9-3V6c0-1.66-4.03-3-9-3Zm0 2c4.25 0 7 .99 7 1s-2.75 1-7 1-7-.99-7-1 2.75-1 7-1Zm0 5c2.9 0 5.45-.46 7-1.18V12c0 .01-2.75 1-7 1s-7-.99-7-1V8.82C6.55 9.54 9.1 10 12 10Zm0 5c2.9 0 5.45-.46 7-1.18V18c0 .01-2.75 1-7 1s-7-.99-7-1v-4.18C6.55 14.54 9.1 15 12 15Z" />
            </svg>
            <span>{t("roadmapPages.ciber.toolsStackLayered")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {stacksFerramentas.map((item) => (
            <article key={item.categoria} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{tx(item.categoria)}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{tx(item.ferramentas)}</p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8" data-roadmap-detail="true" data-roadmap-key="section-labs">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2H4V5Zm0 4h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Zm3 3h10v2H7v-2Zm0 4h6v2H7v-2Z" />
            </svg>
            <span>{t("roadmapPages.ciber.labsProgressivePractice")}</span>
          </h2>
        </summary>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {plataformasPratica.map((bloco) => (
            <article key={bloco.nivel} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100 mb-2">{tx(bloco.nivel)}</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                {bloco.itens.map((item) => (
                  <li key={item} className="text-justify">
                    {tx(item)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8" data-roadmap-detail="true" data-roadmap-key="section-dominios">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 3 2 7l10 4 8-3.2V17h2V7L12 3Zm-6 8v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11l-6 2.4L6 11Z" />
            </svg>
            <span>{t("roadmapPages.ciber.domainsAndCareers")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {dominiosCarreira.map((item) => (
            <article key={item.dominio} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{tx(item.dominio)}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{tx(item.objetivo)}</p>
              <p className="text-xs text-slate-400 mt-2">
                <span className="font-semibold text-slate-300">{t("roadmapPages.ciber.keySkills")}:</span>{" "}
                {tx(item.habilidades)}
              </p>
            </article>
          ))}
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Panel as="details" layout="plain" data-roadmap-detail="true" data-roadmap-key="section-especializacoes">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M12 2 2 7l10 5 8-4v6h2V7L12 2Zm-6 11v4.5C6 19.43 8.69 21 12 21s6-1.57 6-3.5V13l-6 3-6-3Z" />
              </svg>
              <span>{t("roadmapPages.common.specializations")}</span>
            </h2>
          </summary>
          <div className="space-y-4 mt-4">
            {trilhas.map((trilha) => (
              <div key={trilha.nome} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-cyan-300">
                    <path fill="currentColor" d="M9.3 5.3a1 1 0 0 0 0 1.4L14.6 12l-5.3 5.3a1 1 0 1 0 1.4 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.4 0Z" />
                  </svg>
                  <span>{tx(trilha.nome)}</span>
                </h3>
                <p className="text-sm text-slate-300 mt-1 text-justify">{tx(trilha.foco)}</p>
                <p className="text-xs text-slate-400 mt-2">
                  <span className="font-semibold text-slate-300">{t("roadmapPages.common.stack")}:</span> {tx(trilha.stack)}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel as="details" layout="plain" data-roadmap-detail="true" data-roadmap-key="section-plano">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2h2V2Zm12 7H5v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9Zm-2 3v2h-2v-2h2Zm-4 0v2h-2v-2h2Zm-4 0v2H7v-2h2Z" />
              </svg>
              <span>{t("roadmapPages.ciber.weeklyPlan")}</span>
            </h2>
          </summary>
          <div className="mt-4">
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-5">
              {planoSemanal.map((item) => (
                <li key={item} className="text-justify">
                  {tx(item)}
                </li>
              ))}
            </ul>

            <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">{t("roadmapPages.common.certifications")}</h3>
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              {certificacoes.map((item) => (
                <li key={item} className="text-justify">
                  {tx(item)}
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <Panel as="details" layout="plain" className="mb-8" data-roadmap-detail="true" data-roadmap-key="section-cert-trilha">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 3 2 7l10 4 8-3.2V17h2V7L12 3Zm-6 8v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11l-6 2.4L6 11Z" />
            </svg>
            <span>{t("roadmapPages.ciber.certificationsByTrack")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {certificacoesPorTrilha.map((item) => (
            <article key={item.trilha} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{tx(item.trilha)}</h3>
              <p className="text-sm text-slate-300 mt-1 text-justify">{tx(item.recomendacao)}</p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mb-8" data-roadmap-detail="true" data-roadmap-key="section-marcos">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6H6v6h3a3 3 0 1 1 0 6H6a3 3 0 0 1-3-3V6Zm12-3h3a3 3 0 1 1 0 6h-3v2h-2V6a3 3 0 0 1 3-3Zm0 4h3a1 1 0 1 0 0-2h-3a1 1 0 0 0 0 2Zm-2 6h2v2h3a1 1 0 1 1 0 2h-3a3 3 0 0 1-3-3v-1h1Z" />
            </svg>
            <span>{t("roadmapPages.ciber.professionalMaturityMilestones")}</span>
          </h2>
        </summary>
        <div className="mt-4">
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
            {marcosMaturidade.map((item) => (
              <li key={item} className="text-justify">
                {tx(item)}
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <Panel as="details" layout="plain" data-roadmap-detail="true" data-roadmap-key="section-portfolio">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2H4V5Zm0 4h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Zm4 3a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Zm0 4a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H8Z" />
            </svg>
            <span>{t("roadmapPages.common.portfolioProjects")}</span>
          </h2>
        </summary>
        <div className="mt-4">
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-6">
            {projetosPortfolio.map((item) => (
              <li key={item} className="text-justify">
                {tx(item)}
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <Panel as="details" layout="plain" className="mt-8">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path fill="currentColor" d="M12 4a8 8 0 0 1 8 8v7a1 1 0 1 1-2 0v-7a6 6 0 1 0-12 0v7a1 1 0 1 1-2 0v-7a8 8 0 0 1 8-8Zm-1 8h2v6h-2v-6Zm0-4h2v2h-2V8Z" />
            </svg>
            <span>{t("roadmapPages.common.baseReferencesUsed")}</span>
          </h2>
        </summary>
        <div className="space-y-4 mt-4">
          {referenciasBase.map((item) => (
            <article key={item.url} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
              <h3 className="font-semibold text-slate-100">{tx(item.nome)}</h3>
              <p className="text-sm text-slate-300 mt-1">{tx(item.tipo)}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cyan-300 hover:text-cyan-200 underline mt-2 inline-block"
              >
                {t("roadmapPages.common.openReference")}
              </a>
            </article>
          ))}
        </div>
      </Panel>
    </PageTemplate>
  );
}
