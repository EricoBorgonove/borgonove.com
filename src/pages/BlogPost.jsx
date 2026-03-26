import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = `${import.meta.env.BASE_URL}api/blog/posts.php`;

function pickLocalized(post, field, isEn) {
  const ptValue = post?.[`${field}_pt`] || "";
  const enValue = post?.[`${field}_en`] || "";
  return isEn ? enValue || ptValue : ptValue || enValue;
}

function formatDate(value, locale) {
  if (!value) return "";
  const date = new Date(String(value).replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
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

export default function BlogPost() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const locale = isEn ? "en" : "pt";

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const txt = isEn
    ? {
        back: "Back to blog",
        loading: "Loading article...",
        notFound: "Article not found.",
        genericError: "Could not load article.",
      }
    : {
        back: "Voltar para o blog",
        loading: "Carregando artigo...",
        notFound: "Artigo nao encontrado.",
        genericError: "Nao foi possivel carregar o artigo.",
      };

  useEffect(() => {
    let isActive = true;

    async function loadPost() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_URL}?slug=${encodeURIComponent(slug || "")}`, {
          method: "GET",
          credentials: "same-origin",
        });
        const data = await parseJsonSafe(response);
        if (!isActive) return;

        if (response.status === 404) {
          setError(txt.notFound);
          setPost(null);
          return;
        }

        if (!response.ok || !data?.ok || !data?.post) {
          throw new Error(txt.genericError);
        }

        setPost(data.post);
      } catch {
        if (isActive) {
          setError(txt.genericError);
          setPost(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadPost();
    return () => {
      isActive = false;
    };
  }, [slug, txt.genericError, txt.notFound]);

  const content = pickLocalized(post, "content", isEn);
  const paragraphs = content
    .split(/\n{2,}/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-4xl mx-auto">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition"
      >
        <span aria-hidden="true">←</span>
        <span>{txt.back}</span>
      </Link>

      {loading && <div className="glass rounded-2xl p-6 mt-6 text-sm text-slate-300">{txt.loading}</div>}

      {!loading && error && (
        <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-6 mt-6 text-sm text-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && post && (
        <article className="glass rounded-3xl p-8 md:p-10 mt-6">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/90">
            {formatDate(post.published_at || post.created_at, locale)}
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white mt-4 leading-tight">
            {pickLocalized(post, "title", isEn)}
          </h1>
          {pickLocalized(post, "excerpt", isEn) && (
            <p className="text-slate-300 text-lg mt-4 leading-relaxed">
              {pickLocalized(post, "excerpt", isEn)}
            </p>
          )}

          <div className="mt-8 space-y-5 text-slate-200 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={`${post.id}-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
