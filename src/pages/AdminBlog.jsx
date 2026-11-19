import { Button, Input, PageDescription, PageHeader, PageTemplate, PageTitle, Panel, Select, Textarea } from "../components/ui/Patterns";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = `${import.meta.env.BASE_URL}api/admin/blog/posts.php`;

const EMPTY_FORM = {
  id: null,
  slug: "",
  title_pt: "",
  title_en: "",
  excerpt_pt: "",
  excerpt_en: "",
  content_pt: "",
  content_en: "",
  cover_image_url: "",
  status: "draft",
  published_at: "",
};

function toLocalDatetime(value) {
  if (!value) return "";
  const normalized = String(value).replace(" ", "T");
  return normalized.slice(0, 16);
}

function fromLocalDatetime(value) {
  if (!value) return null;
  return `${value.replace("T", " ")}:00`;
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

export default function AdminBlog() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.resolvedLanguage?.startsWith("en");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [notice, setNotice] = useState("");

  const txt = isEn
    ? {
        breadcrumbAdmin: "Admin panel",
        breadcrumbBlog: "Blog",
        title: "Blog editor",
        description: "Create, update, publish, and remove blog posts.",
        listTitle: "Registered posts",
        listEmpty: "No posts yet.",
        listLoading: "Loading posts...",
        newPost: "New post",
        edit: "Edit",
        delete: "Delete",
        save: "Save post",
        saving: "Saving...",
        formTitlePt: "Title (PT)",
        formTitleEn: "Title (EN)",
        formSlug: "Slug",
        formExcerptPt: "Excerpt (PT)",
        formExcerptEn: "Excerpt (EN)",
        formContentPt: "Content (PT)",
        formContentEn: "Content (EN)",
        formCover: "Cover image URL",
        formStatus: "Status",
        formPublishedAt: "Publish date",
        statusDraft: "Draft",
        statusPublished: "Published",
        loadError: "Failed to load posts.",
        saveError: "Failed to save post.",
        deleteError: "Failed to remove post.",
        saveSuccess: "Post saved successfully.",
        deleteSuccess: "Post removed successfully.",
      }
    : {
        breadcrumbAdmin: "Painel administrativo",
        breadcrumbBlog: "Blog",
        title: "Editor do blog",
        description: "Crie, atualize, publique e remova posts do blog.",
        listTitle: "Posts cadastrados",
        listEmpty: "Nenhum post cadastrado.",
        listLoading: "Carregando posts...",
        newPost: "Novo post",
        edit: "Editar",
        delete: "Excluir",
        save: "Salvar post",
        saving: "Salvando...",
        formTitlePt: "Titulo (PT)",
        formTitleEn: "Titulo (EN)",
        formSlug: "Slug",
        formExcerptPt: "Resumo (PT)",
        formExcerptEn: "Resumo (EN)",
        formContentPt: "Conteudo (PT)",
        formContentEn: "Conteudo (EN)",
        formCover: "URL da imagem de capa",
        formStatus: "Status",
        formPublishedAt: "Data de publicacao",
        statusDraft: "Rascunho",
        statusPublished: "Publicado",
        loadError: "Nao foi possivel carregar os posts.",
        saveError: "Nao foi possivel salvar o post.",
        deleteError: "Nao foi possivel remover o post.",
        saveSuccess: "Post salvo com sucesso.",
        deleteSuccess: "Post removido com sucesso.",
      };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPosts() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "same-origin",
      });
      const data = await parseJsonSafe(response);

      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok || !data?.ok) {
        throw new Error(txt.loadError);
      }

      setPosts(Array.isArray(data.posts) ? data.posts : []);
    } catch {
      setError(txt.loadError);
    } finally {
      setLoading(false);
    }
  }

  function editPost(post) {
    setForm({
      id: post.id,
      slug: post.slug || "",
      title_pt: post.title_pt || "",
      title_en: post.title_en || "",
      excerpt_pt: post.excerpt_pt || "",
      excerpt_en: post.excerpt_en || "",
      content_pt: post.content_pt || "",
      content_en: post.content_en || "",
      cover_image_url: post.cover_image_url || "",
      status: post.status || "draft",
      published_at: toLocalDatetime(post.published_at),
    });
    setNotice("");
    setError("");
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setNotice("");
    setError("");
  }

  async function savePost(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        ...form,
        published_at: fromLocalDatetime(form.published_at),
      };

      const method = payload.id ? "PUT" : "POST";
      const response = await fetch(API_URL, {
        method,
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await parseJsonSafe(response);

      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok || !data?.ok) {
        throw new Error(txt.saveError);
      }

      setNotice(txt.saveSuccess);
      resetForm();
      await loadPosts();
    } catch {
      setError(txt.saveError);
    } finally {
      setSaving(false);
    }
  }

  async function removePost(id) {
    if (!id) return;
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      const data = await parseJsonSafe(response);

      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok || !data?.ok) {
        throw new Error(txt.deleteError);
      }

      if (form.id === id) {
        resetForm();
      }
      setNotice(txt.deleteSuccess);
      await loadPosts();
    } catch {
      setError(txt.deleteError);
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageTemplate width="wide">
      <div className="mb-6 text-sm text-slate-400 flex flex-wrap gap-2">
        <Link to="/admin" className="hover:text-cyan-200 transition">
          {txt.breadcrumbAdmin}
        </Link>
        <span>/</span>
        <span className="text-cyan-300">{txt.breadcrumbBlog}</span>
      </div>

      <Panel as="div" layout="plain">
        <PageHeader><PageTitle className="text-white">{txt.title}</PageTitle>
        <PageDescription className="mt-3">{txt.description}</PageDescription></PageHeader>

        {error && (
          <p className="mt-5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        )}

        {notice && (
          <p className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {notice}
          </p>
        )}

        <div className="mt-8 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <Panel as="aside" layout="plain">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-cyan-300">{txt.listTitle}</h2>
              <Button variant="secondary"
                type="button"
                onClick={resetForm}
                className="border border-cyan-400/30 text-cyan-300 transition hover:border-cyan-300"
              >
                {txt.newPost}
              </Button>
            </div>

            <div className="mt-4 space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {loading && <p className="text-sm text-slate-400">{txt.listLoading}</p>}
              {!loading && posts.length === 0 && <p className="text-sm text-slate-400">{txt.listEmpty}</p>}
              {posts.map((post) => (
                <article key={post.id} className="rounded-xl border border-slate-700/80 bg-slate-900/35 p-4">
                  <p className="text-sm font-semibold text-white line-clamp-2">
                    {post.title_pt || post.title_en || post.slug}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{post.slug}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        post.status === "published"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                          : "bg-amber-500/15 text-amber-300 border border-amber-400/30"
                      }`}
                    >
                      {post.status === "published" ? txt.statusPublished : txt.statusDraft}
                    </span>

                    <div className="flex gap-2">
                      <Button variant="secondary"
                        type="button"
                        onClick={() => editPost(post)}
                        className="border border-slate-600 text-slate-200 hover:border-cyan-400"
                      >
                        {txt.edit}
                      </Button>
                      <Button variant="custom"
                        type="button"
                        onClick={() => removePost(post.id)}
                        className="rounded-lg border border-rose-500/40 px-2.5 py-1.5 text-xs text-rose-200 hover:bg-rose-500/10"
                      >
                        {txt.delete}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel as="form" layout="plain" onSubmit={savePost} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formTitlePt}</span>
                <Input
                  type="text"
                  value={form.title_pt}
                  onChange={(event) => setForm((prev) => ({ ...prev, title_pt: event.target.value }))}
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </label>

              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formTitleEn}</span>
                <Input
                  type="text"
                  value={form.title_en}
                  onChange={(event) => setForm((prev) => ({ ...prev, title_en: event.target.value }))}
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formSlug}</span>
                <Input
                  type="text"
                  value={form.slug}
                  onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </label>

              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formCover}</span>
                <Input
                  type="url"
                  value={form.cover_image_url}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, cover_image_url: event.target.value }))
                  }
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formExcerptPt}</span>
                <Textarea
                  rows="3"
                  value={form.excerpt_pt}
                  onChange={(event) => setForm((prev) => ({ ...prev, excerpt_pt: event.target.value }))}
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </label>

              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formExcerptEn}</span>
                <Textarea
                  rows="3"
                  value={form.excerpt_en}
                  onChange={(event) => setForm((prev) => ({ ...prev, excerpt_en: event.target.value }))}
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formContentPt}</span>
                <Textarea
                  rows="10"
                  value={form.content_pt}
                  onChange={(event) => setForm((prev) => ({ ...prev, content_pt: event.target.value }))}
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </label>

              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formContentEn}</span>
                <Textarea
                  rows="10"
                  value={form.content_en}
                  onChange={(event) => setForm((prev) => ({ ...prev, content_en: event.target.value }))}
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formStatus}</span>
                <Select
                  value={form.status}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                >
                  <option value="draft">{txt.statusDraft}</option>
                  <option value="published">{txt.statusPublished}</option>
                </Select>
              </label>

              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{txt.formPublishedAt}</span>
                <Input
                  type="datetime-local"
                  value={form.published_at}
                  onChange={(event) => setForm((prev) => ({ ...prev, published_at: event.target.value }))}
                  className="w-full border text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </label>
            </div>

            <Button variant="primary"
              type="submit"
              disabled={saving}
              className="text-slate-950 transition disabled:opacity-60 disabled:hover:bg-cyan-500"
            >
              {saving ? txt.saving : txt.save}
            </Button>
          </Panel>
        </div>
      </Panel>
    </PageTemplate>
  );
}
