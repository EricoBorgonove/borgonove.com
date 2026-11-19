import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = `${import.meta.env.BASE_URL}api/blog/posts.php`;

function formatDate(value, locale) {
  if (!value) return "";
  const date = new Date(String(value).replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function pickLocalized(post, field, isEn) {
  const ptValue = post?.[`${field}_pt`] || "";
  const enValue = post?.[`${field}_en`] || "";
  return isEn ? enValue || ptValue : ptValue || enValue;
}

async function parseJsonSafe(response) {
  const raw = await response.text();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default function Blog() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const locale = isEn ? "en" : "pt";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const txt = isEn
    ? {
        title: "Blog",
        subtitle:
          "Technical articles, practical guides, and project updates published directly from the admin area.",
        readMore: "Read article",
        empty: "No published posts yet.",
        loading: "Loading posts...",
        error: "Could not load blog posts.",
      }
    : {
        title: "Blog",
        subtitle:
          "Artigos tecnicos, guias praticos e atualizacoes do projeto publicadas direto pela area administrativa.",
        readMore: "Ler artigo",
        empty: "Ainda nao existem posts publicados.",
        loading: "Carregando posts...",
        error: "Nao foi possivel carregar os posts do blog.",
      };

  useEffect(() => {
    let isActive = true;

    async function loadPosts() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "same-origin",
        });
        const data = await parseJsonSafe(response);
        if (!isActive) return;

        if (!response.ok || !data?.ok) {
          throw new Error(txt.error);
        }

        setPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch {
        if (isActive) {
          setError(txt.error);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadPosts();
    return () => {
      isActive = false;
    };
  }, [txt.error]);

  return (
    <PageTemplate>
      <PageHeader><PageTitle className="mb-4 text-white">{txt.title}</PageTitle>
      <PageDescription className="max-w-3xl">{txt.subtitle}</PageDescription></PageHeader>

      {loading && (
        <Panel as="div" layout="plain" className="text-sm text-slate-300">{txt.loading}</Panel>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-6 text-sm text-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <Panel as="div" layout="plain" className="text-sm text-slate-300">{txt.empty}</Panel>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Panel as="article" layout="plain" key={post.id} className="flex flex-col">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/90">
                {formatDate(post.published_at || post.created_at, locale)}
              </p>
              <h2 className="text-2xl font-bold text-white mt-3 leading-tight">
                {pickLocalized(post, "title", isEn)}
              </h2>
              <p className="text-slate-300 mt-3 leading-relaxed flex-1">
                {pickLocalized(post, "excerpt", isEn)}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-cyan-400/30 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-500/10"
              >
                {txt.readMore}
              </Link>
            </Panel>
          ))}
        </div>
      )}
    </PageTemplate>
  );
}
