import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import ArchitectureTopicDiagram from "../components/ArchitectureTopicDiagram";
import {
  arquiteturaSoftwareArticles,
  getArquiteturaSoftwareArticle,
} from "../data/arquiteturaSoftwareArticles";

function getArticleByIndex(index) {
  return arquiteturaSoftwareArticles[index] || null;
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

export default function ArquiteturaSoftware() {
  const { i18n } = useTranslation();
  const { temaSlug } = useParams();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const article = temaSlug
    ? getArquiteturaSoftwareArticle(temaSlug)
    : arquiteturaSoftwareArticles[0];

  if (!article) {
    return <Navigate to="/disciplinas/arquitetura-software-techplay" replace />;
  }

  const currentIndex = arquiteturaSoftwareArticles.findIndex((item) => item.slug === article.slug);
  const previousArticle = getArticleByIndex(currentIndex - 1);
  const nextArticle = getArticleByIndex(currentIndex + 1);

  const txt = isEn
    ? {
        back: "Back to subjects",
        breadcrumb: "Subjects",
        title: "Software Architecture: TechPlay Themes",
        subtitle:
          "Complementary subject built from the 20 TechPlay themes used in the draw, expanding the discussion after the base lessons from the PPT files.",
        topicIndex: "Topic index",
        topicIndexDescription:
          "Use the sequence below as a complementary paged track. Each topic opens as its own article with interpretation, examples, trade-offs, and diagram.",
        currentTopic: "Current article",
        topicLabel: "Topic",
        whyItMatters: "Why this topic matters",
        keyPoints: "Key ideas to retain",
        decisions: "Architectural decisions behind the theme",
        practicalExample: "Practical example",
        watchouts: "Frequent mistakes and traps",
        previous: "Previous article",
        next: "Next article",
        startOfSubject: "Start of the subject",
        endOfSubject: "End of the subject",
        progressLabel: "Progress",
        articleContext: "Why this article belongs in the subject",
        articleContextText:
          "This article directly supports the overall subject because it explains a structural decision, a trade-off, or a recurring pattern in real systems.",
        overviewTitle: "What this subject delivers",
        overviewItems: [
          "Complement the base lessons with 20 focused architecture themes.",
          "Deepen styles, patterns, trade-offs, and architectural reasoning.",
          "Study each topic as an article with example, traps, and decision framing.",
          "Use the subject after the PPT-based track as an expansion layer.",
        ],
      }
    : {
        back: "Voltar para Disciplinas",
        breadcrumb: "Disciplinas",
        title: "Arquitetura de Software: Temas TechPlay",
        subtitle:
          "Disciplina complementar construída a partir dos 20 temas do TechPlay usados no sorteio, aprofundando a discussão depois das aulas-base dos PPTs.",
        topicIndex: "Índice dos temas",
        topicIndexDescription:
          "Use a sequência abaixo como uma trilha complementar paginada. Cada tema abre como um artigo próprio com interpretação, exemplos, trade-offs e diagrama.",
        currentTopic: "Artigo atual",
        topicLabel: "Tema",
        whyItMatters: "Por que este tema importa",
        keyPoints: "Ideias centrais para fixar",
        decisions: "Decisões arquiteturais por trás do tema",
        practicalExample: "Exemplo prático",
        watchouts: "Erros e armadilhas frequentes",
        previous: "Artigo anterior",
        next: "Próximo artigo",
        startOfSubject: "Início da disciplina",
        endOfSubject: "Fim da disciplina",
        progressLabel: "Progressão",
        articleContext: "Por que este artigo pertence à disciplina",
        articleContextText:
          "Este artigo sustenta o entendimento global da disciplina porque explica uma decisão estrutural, um trade-off ou um padrão recorrente em sistemas reais.",
        overviewTitle: "O que esta disciplina entrega",
        overviewItems: [
          "Complemento das aulas-base com 20 temas focados de arquitetura.",
          "Aprofundamento em estilos, padrões, trade-offs e raciocínio arquitetural.",
          "Leitura de cada tema como artigo com exemplo, armadilhas e decisão técnica.",
          "Uso ideal depois da trilha principal baseada nos PPTs.",
        ],
      };

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-7xl mx-auto">
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

      <div className="glass rounded-[32px] p-8 md:p-10 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -top-16 left-10 h-52 w-52 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
        <div className="relative grid gap-8 xl:grid-cols-[1.25fr,0.75fr] xl:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{txt.currentTopic}</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{txt.title}</h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{txt.subtitle}</p>

            <div className="grid gap-4 md:grid-cols-2 mt-8">
              {txt.overviewItems.map((item) => (
                <div key={item} className="rounded-[22px] border border-white/10 bg-slate-950/35 px-5 py-4 text-sm text-slate-200 leading-7">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel rounded-[28px] p-6 xl:sticky xl:top-24">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">{txt.topicIndex}</p>
            <p className="text-sm text-slate-300 leading-7 mb-5">{txt.topicIndexDescription}</p>
            <div className="grid gap-3 max-h-[420px] overflow-y-auto pr-1">
              {arquiteturaSoftwareArticles.map((item) => {
                const isActive = item.slug === article.slug;

                return (
                  <Link
                    key={item.slug}
                    to={`/disciplinas/arquitetura-software-techplay/${item.slug}`}
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
          </div>
        </div>
      </div>

      <article className="glass rounded-[32px] p-8 md:p-10 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {txt.topicLabel} {article.order}
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            {txt.currentTopic}
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
                  {article.order} / {arquiteturaSoftwareArticles.length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-sm text-slate-400 mb-1">{txt.articleContext}</p>
                <p className="text-sm text-slate-200 leading-7">
                  {txt.articleContextText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-6 xl:grid-cols-2 mb-8">
        <ArticleSection title={txt.keyPoints} items={article.keyPoints} tone="cyan" />
        <ArticleSection title={txt.decisions} items={article.decisions} tone="emerald" />
      </div>

      <ArchitectureTopicDiagram diagram={article.diagram} />

      <div className="grid gap-6 xl:grid-cols-2 mt-8">
        <section className="glass rounded-[28px] p-6 md:p-8">
          <h3 className="text-2xl font-black text-white mb-4">{txt.practicalExample}</h3>
          <p className="text-slate-300 leading-8">{article.practicalExample}</p>
        </section>

        <section className="glass rounded-[28px] p-6 md:p-8">
          <h3 className="text-2xl font-black text-white mb-4">{txt.watchouts}</h3>
          <ul className="space-y-3">
            {article.watchouts.map((item) => (
              <li key={item} className="flex gap-3 text-slate-300 leading-7">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-8">
        {previousArticle ? (
          <Link
            to={`/disciplinas/arquitetura-software-techplay/${previousArticle.slug}`}
            className="glass rounded-[26px] p-6 hover:border-cyan-400/30 transition"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">{txt.previous}</p>
            <p className="text-lg font-black text-white leading-7">{previousArticle.title}</p>
          </Link>
        ) : (
          <div className="glass rounded-[26px] p-6 opacity-60">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">{txt.previous}</p>
            <p className="text-lg font-black text-slate-400 leading-7">{txt.startOfSubject}</p>
          </div>
        )}

        {nextArticle ? (
          <Link
            to={`/disciplinas/arquitetura-software-techplay/${nextArticle.slug}`}
            className="glass rounded-[26px] p-6 hover:border-cyan-400/30 transition text-left"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">{txt.next}</p>
            <p className="text-lg font-black text-white leading-7">{nextArticle.title}</p>
          </Link>
        ) : (
          <div className="glass rounded-[26px] p-6 opacity-60">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">{txt.next}</p>
            <p className="text-lg font-black text-slate-400 leading-7">{txt.endOfSubject}</p>
          </div>
        )}
      </div>
    </section>
  );
}
