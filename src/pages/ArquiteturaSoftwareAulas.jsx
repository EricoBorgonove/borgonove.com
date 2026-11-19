import { PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import ArchitectureTopicDiagram from "../components/ArchitectureTopicDiagram";
import {
  arquiteturaSoftwareAulas,
  getArquiteturaSoftwareAula,
} from "../data/arquiteturaSoftwareAulas";
import {
  getArquiteturaSoftwareAulaConteudo,
} from "../data/arquiteturaSoftwareAulasConteudo";

function getAulaByIndex(index) {
  return arquiteturaSoftwareAulas[index] || null;
}

function ArticleSection({ title, items, tone = "cyan" }) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-400/25 bg-emerald-500/10"
      : tone === "amber"
        ? "border-amber-400/25 bg-amber-500/10"
        : "border-cyan-400/25 bg-cyan-500/10";

  return (
    <section className={`rounded-[24px] border p-6 ${toneClass}`}>
      <h3 className="text-xl font-black text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm md:text-base leading-7 text-slate-100">
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-white/80" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ArquiteturaSoftwareAulas() {
  const { i18n } = useTranslation();
  const { aulaSlug } = useParams();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const article = aulaSlug ? getArquiteturaSoftwareAula(aulaSlug) : arquiteturaSoftwareAulas[0];
  const lessonContent = getArquiteturaSoftwareAulaConteudo(article?.slug);

  if (!article) {
    return <Navigate to="/disciplinas/arquitetura-software" replace />;
  }

  const currentIndex = arquiteturaSoftwareAulas.findIndex((item) => item.slug === article.slug);
  const previousArticle = getAulaByIndex(currentIndex - 1);
  const nextArticle = getAulaByIndex(currentIndex + 1);

  const txt = isEn
    ? {
        back: "Back to subjects",
        breadcrumb: "Subjects",
        title: "Software Architecture",
        subtitle:
          "Base track organized as a complete subject, with lesson-by-lesson progression before moving to the complementary theme track.",
        topicIndex: "Lesson index",
        topicIndexDescription:
          "This first subject is organized as a paged sequence of lessons. Each lesson develops one major part of the discipline with explanation, implications, and practical interpretation.",
        currentTopic: "Current lesson",
        topicLabel: "Lesson",
        whyItMatters: "Why this lesson matters",
        keyPoints: "Main ideas of the lesson",
        decisions: "Architectural decisions emphasized here",
        practicalExample: "Concrete interpretation",
        watchouts: "Misreadings to avoid",
        previous: "Previous lesson",
        next: "Next lesson",
        startOfSubject: "Start of the subject",
        endOfSubject: "End of the subject",
        progressLabel: "Progress",
        lessonRoleText:
          "This lesson deepens one essential stage of the subject and prepares the student for the next architectural decisions.",
        overviewTitle: "What this first subject covers",
        lessonFlow: "Full lesson development",
        lessonFlowDescription:
          "Below, the content is written as a real class. The student should be able to learn from the lesson directly, without depending on support material.",
        activityTitle: "Suggested class activity",
        questionsTitle: "Closing questions",
        takeawayTitle: "Expected lesson outcome",
        overviewItems: [
          "A structured path with complete lessons, not topic summaries.",
          "Foundation before the complementary 20-theme track.",
          "Progression from concepts to architectural decision-making.",
          "Diagrams and teaching support to reinforce understanding and discussion.",
        ],
        complementaryTitle: "Complementary subject",
        complementaryText:
          "After finishing this base track, continue into the subject built from the 20 TechPlay themes.",
        complementaryCta: "Open complementary themes",
      }
    : {
        back: "Voltar para Disciplinas",
        breadcrumb: "Disciplinas",
        title: "Arquitetura de Software",
        subtitle:
          "Trilha-base organizada como disciplina completa, com progressão aula a aula antes de avançar para a trilha complementar de temas.",
        topicIndex: "Índice das aulas",
        topicIndexDescription:
          "Esta primeira disciplina foi organizada como sequência paginada de aulas. Cada aula desenvolve uma parte central do conteúdo com explicação, implicações e leitura prática.",
        currentTopic: "Aula atual",
        topicLabel: "Aula",
        whyItMatters: "Por que esta aula importa",
        keyPoints: "Ideias centrais da aula",
        decisions: "Decisões arquiteturais enfatizadas aqui",
        practicalExample: "Leitura prática",
        watchouts: "Interpretações erradas para evitar",
        previous: "Aula anterior",
        next: "Próxima aula",
        startOfSubject: "Início da disciplina",
        endOfSubject: "Fim da disciplina",
        progressLabel: "Progressão",
        lessonRoleText:
          "Esta aula aprofunda uma etapa essencial da disciplina e prepara o aluno para as próximas decisões arquiteturais.",
        overviewTitle: "O que esta primeira disciplina cobre",
        lessonFlow: "Desenvolvimento completo da aula",
        lessonFlowDescription:
          "Abaixo, o conteudo foi escrito como aula de verdade. O aluno deve conseguir aprender diretamente pela trilha, sem depender de material de apoio externo.",
        activityTitle: "Atividade sugerida da aula",
        questionsTitle: "Perguntas de fechamento",
        takeawayTitle: "Resultado esperado da aula",
        overviewItems: [
          "Trilha estruturada em aulas completas, e não em resumos de tópicos.",
          "Base conceitual antes da trilha complementar dos 20 temas.",
          "Progressão do fundamento até a tomada de decisão arquitetural.",
          "Diagramas e apoio de leitura para reforçar entendimento e discussão.",
        ],
        complementaryTitle: "Disciplina complementar",
        complementaryText:
          "Depois de concluir esta trilha-base, avance para a disciplina construída a partir dos 20 temas do TechPlay.",
        complementaryCta: "Abrir temas complementares",
      };

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {txt.back}
        </BackButton>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-cyan-300 mb-6">
        <Link to="/disciplinas" className="hover:text-cyan-200 transition">
          {txt.breadcrumb}
        </Link>
        <span className="text-slate-500">/</span>
        <span className="text-slate-300">{txt.title}</span>
      </div>

      <Panel as="div" layout="plain" className="mb-8 overflow-hidden relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -top-16 left-10 h-52 w-52 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative grid gap-8 xl:grid-cols-[1.25fr,0.75fr] xl:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{txt.currentTopic}</p>
            <PageTitle className="text-white mb-4">{txt.title}</PageTitle>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{txt.subtitle}</p>

            <div className="grid gap-4 md:grid-cols-2 mt-8">
              {txt.overviewItems.map((item) => (
                <div key={item} className="rounded-[22px] border border-white/10 bg-slate-950/35 px-5 py-4 text-sm text-slate-200 leading-7">
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-[26px] border border-emerald-400/20 bg-emerald-500/10 px-6 py-5 mt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/80 mb-3">
                {txt.complementaryTitle}
              </p>
              <p className="text-sm leading-7 text-slate-100 mb-4">{txt.complementaryText}</p>
              <Link
                to="/disciplinas/arquitetura-software-techplay"
                className="inline-flex items-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                {txt.complementaryCta}
              </Link>
            </div>
          </div>

          <Panel as="div" layout="plain" className="xl:sticky xl:top-24">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">{txt.topicIndex}</p>
            <p className="text-sm text-slate-300 leading-7 mb-5">{txt.topicIndexDescription}</p>
            <div className="grid gap-3 max-h-[420px] overflow-y-auto pr-1">
              {arquiteturaSoftwareAulas.map((item) => {
                const isActive = item.slug === article.slug;

                return (
                  <Link
                    key={item.slug}
                    to={`/disciplinas/arquitetura-software/${item.slug}`}
                    className={`rounded-2xl border px-4 py-3 transition ${
                      isActive
                        ? "border-cyan-400/40 bg-cyan-500/10"
                        : "border-white/10 bg-slate-950/30 hover:border-cyan-400/30 hover:bg-white/5"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 mb-2">
                      {txt.topicLabel} {item.order}
                    </p>
                    <p className="text-sm font-semibold text-white leading-6">{item.title}</p>
                  </Link>
                );
              })}
            </div>
          </Panel>
        </div>
      </Panel>

      <Panel as="article" layout="plain" className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {txt.topicLabel} {article.order}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{article.title}</h2>
        <p className="text-cyan-200/90 text-lg leading-relaxed mb-6">{article.summary}</p>

        <div className="grid gap-6 xl:grid-cols-[1.3fr,0.7fr]">
          <div className="space-y-6">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-6">
              <p className="text-slate-200 leading-8 text-[1.02rem]">{article.explanation}</p>
            </div>

            <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-6">
              <h3 className="text-xl font-black text-white mb-4">{txt.whyItMatters}</h3>
              <p className="text-slate-100 leading-8">{article.importance}</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">{txt.currentTopic}</p>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-sm text-slate-400 mb-1">{txt.progressLabel}</p>
                <p className="text-2xl font-black text-cyan-300">
                  {article.order} / {arquiteturaSoftwareAulas.length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-sm text-slate-400 mb-1">{txt.overviewTitle}</p>
                <p className="text-sm text-slate-200 leading-7">
                  {txt.lessonRoleText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-2 mb-8">
        <ArticleSection title={txt.keyPoints} items={article.keyPoints} tone="cyan" />
        <ArticleSection title={txt.decisions} items={article.decisions} tone="emerald" />
      </div>

      {lessonContent && (
        <Panel as="section" layout="plain" className="mb-8">
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{txt.lessonFlow}</p>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">{txt.lessonFlow}</h3>
            <p className="text-slate-300 text-lg leading-relaxed">{txt.lessonFlowDescription}</p>
          </div>

          <div className="space-y-6">
            {lessonContent.sections.map((section, index) => (
              <article key={section.title} className="rounded-[28px] border border-white/10 bg-slate-950/35 p-6 md:p-8">
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 text-sm font-black text-cyan-300">
                    {index + 1}
                  </div>
                  <h4 className="text-2xl font-black text-white leading-8">{section.title}</h4>
                </div>

                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-slate-200 leading-8 text-[1.02rem]">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="grid gap-3 md:grid-cols-2 mt-6">
                  {section.bullets.map((bullet) => (
                    <div key={bullet} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 leading-7">
                      {bullet}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Panel>
      )}

      <ArchitectureTopicDiagram diagram={article.diagram} />

      <div className="grid gap-6 xl:grid-cols-2 mt-8">
        <Panel as="section" layout="plain">
          <h3 className="text-2xl font-black text-white mb-4">{txt.practicalExample}</h3>
          <p className="text-slate-300 leading-8">{article.practicalExample}</p>
        </Panel>

        <Panel as="section" layout="plain">
          <h3 className="text-2xl font-black text-white mb-4">{txt.watchouts}</h3>
          <ul className="space-y-3">
            {article.watchouts.map((item) => (
              <li key={item} className="flex gap-3 text-slate-300 leading-7">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {lessonContent && (
        <div className="grid gap-6 xl:grid-cols-2 mt-8">
          <Panel as="section" layout="plain">
            <h3 className="text-2xl font-black text-white mb-4">{txt.activityTitle}</h3>
            <h4 className="text-lg font-semibold text-cyan-300 mb-3">{lessonContent.activity.title}</h4>
            <p className="text-slate-300 leading-8">{lessonContent.activity.description}</p>
          </Panel>

          <Panel as="section" layout="plain">
            <h3 className="text-2xl font-black text-white mb-4">{txt.questionsTitle}</h3>
            <ul className="space-y-3">
              {lessonContent.questions.map((question) => (
                <li key={question} className="flex gap-3 text-slate-300 leading-7">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      {lessonContent && (
        <Panel as="section" layout="plain" className="mt-8">
          <h3 className="text-2xl font-black text-white mb-4">{txt.takeawayTitle}</h3>
          <p className="text-slate-200 leading-8 text-[1.02rem]">{lessonContent.takeaway}</p>
        </Panel>
      )}

      <div className="grid gap-4 md:grid-cols-2 mt-8">
        {previousArticle ? (
          <Panel as={Link} layout="plain"
            to={`/disciplinas/arquitetura-software/${previousArticle.slug}`}
            className="hover:border-cyan-400/30 transition"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">{txt.previous}</p>
            <p className="text-lg font-black text-white leading-7">{previousArticle.title}</p>
          </Panel>
        ) : (
          <Panel as="div" layout="plain" className="opacity-60">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">{txt.previous}</p>
            <p className="text-lg font-black text-slate-400 leading-7">{txt.startOfSubject}</p>
          </Panel>
        )}

        {nextArticle ? (
          <Panel as={Link} layout="plain"
            to={`/disciplinas/arquitetura-software/${nextArticle.slug}`}
            className="hover:border-cyan-400/30 transition text-left"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">{txt.next}</p>
            <p className="text-lg font-black text-white leading-7">{nextArticle.title}</p>
          </Panel>
        ) : (
          <Panel as="div" layout="plain" className="opacity-60">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">{txt.next}</p>
            <p className="text-lg font-black text-slate-400 leading-7">{txt.endOfSubject}</p>
          </Panel>
        )}
      </div>
    </PageTemplate>
  );
}
