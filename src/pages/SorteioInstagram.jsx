import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";
const SESSION_KEY = "instagram_draw_admin_auth";
const GRAPH_VERSION = "v22.0";

function randomIntInclusivo(min, max) {
  const range = max - min + 1;
  if (range <= 0) {
    return min;
  }

  if (globalThis.crypto?.getRandomValues) {
    const maxUint32 = 0xffffffff;
    const limit = maxUint32 - ((maxUint32 + 1) % range);
    const buffer = new Uint32Array(1);
    let randomValue = 0;
    do {
      globalThis.crypto.getRandomValues(buffer);
      randomValue = buffer[0];
    } while (randomValue > limit);
    return min + (randomValue % range);
  }

  return Math.floor(Math.random() * range) + min;
}

function extrairShortcode(linkPost) {
  try {
    const url = new URL(linkPost);
    const match = url.pathname.match(/\/(?:p|reel|tv)\/([^/?#]+)/i);
    return match?.[1] || "";
  } catch {
    return "";
  }
}

function shortcodeDePermalink(permalink) {
  const match = permalink.match(/\/(?:p|reel|tv)\/([^/?#]+)/i);
  return match?.[1] || "";
}

async function requestGraph(url, accessToken) {
  const endpoint = new URL(url);
  endpoint.searchParams.set("access_token", accessToken);
  const response = await fetch(endpoint.toString());
  if (!response.ok) {
    throw new Error("Falha na consulta da API do Instagram.");
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message || "Erro retornado pela API do Instagram.");
  }
  return data;
}

async function encontrarMediaIdPorLink({ accessToken, igUserId, linkPost }) {
  const shortcode = extrairShortcode(linkPost);
  if (!shortcode) {
    throw new Error("Link da publicação inválido.");
  }

  let nextUrl = `https://graph.facebook.com/${GRAPH_VERSION}/${igUserId}/media?fields=id,permalink&limit=100`;
  let tentativas = 0;

  while (nextUrl && tentativas < 30) {
    const data = await requestGraph(nextUrl, accessToken);
    const media = (data.data || []).find((item) => shortcodeDePermalink(item.permalink) === shortcode);
    if (media?.id) {
      return media.id;
    }
    nextUrl = data.paging?.next || "";
    tentativas += 1;
  }

  throw new Error("Não foi possível localizar a publicação no usuário informado.");
}

async function buscarComentariosDoMedia({ accessToken, mediaId }) {
  const comentarios = [];
  let nextUrl = `https://graph.facebook.com/${GRAPH_VERSION}/${mediaId}/comments?fields=id,username,text,timestamp&limit=100`;
  let tentativas = 0;

  while (nextUrl && tentativas < 40) {
    const data = await requestGraph(nextUrl, accessToken);
    for (const item of data.data || []) {
      comentarios.push({
        id: item.id,
        usuario: item.username || "usuario_sem_nome",
        comentario: item.text || "",
      });
    }
    nextUrl = data.paging?.next || "";
    tentativas += 1;
  }

  return comentarios;
}

export default function SorteioInstagram() {
  const { text: uiText, message: uiMessage } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Instagram Giveaway (Comments)",
        protectedAccess: "Protected access",
        protectedDesc: "To use this utility, log in with your site username and password.",
        user: "Username",
        password: "Password",
        enter: "Sign in",
        invalidLogin: "Invalid username or password.",
        logout: "Sign out",
        apiDesc: "Provide API token, IG user ID and post link to load comments.",
        requiredFields: "Fill token, IG user ID and post link.",
        noComments: "This post has no comments for drawing.",
        fetchError: "Failed to fetch comments.",
        token: "Access Token",
        userId: "IG User ID",
        postLink: "Post link",
        oneCommentPerUser: "Use only 1 comment per user",
        searching: "Searching...",
        searchComments: "Search comments from link",
        drawing: "Drawing...",
        startDraw: "Start draw",
        reset: "Reset",
        noParticipants: "Fetch comments before drawing.",
        validParticipants: "Valid participants",
        loadingDraw: "Drawing in progress",
        processingComments: "Processing comments...",
        selecting: "Selecting...",
        loadAndStart: "Load comments and start the draw.",
        winner: "Winner",
        noWinner: "No winner selected.",
        viewPost: "View post",
      }
    : {
        back: "Voltar para utilidades",
        title: "Sorteio Instagram (Comentários)",
        protectedAccess: "Acesso protegido",
        protectedDesc: "Para usar essa utilidade, faça login com usuário e senha do site.",
        user: "Usuário",
        password: "Senha",
        enter: "Entrar",
        invalidLogin: "Usuário ou senha inválidos.",
        logout: "Sair",
        apiDesc: "Informe o token da API, ID do usuário IG e link da publicação para carregar comentários.",
        requiredFields: "Preencha token, ID do usuário IG e link da publicação.",
        noComments: "A publicação não possui comentários para sorteio.",
        fetchError: "Falha ao buscar comentários.",
        token: "Access Token",
        userId: "IG User ID",
        postLink: "Link da publicação",
        oneCommentPerUser: "Considerar apenas 1 comentário por usuário",
        searching: "Buscando...",
        searchComments: "Buscar comentários do link",
        drawing: "Sorteando...",
        startDraw: "Iniciar sorteio",
        reset: "Resetar",
        noParticipants: "Busque comentários antes de sortear.",
        validParticipants: "Participantes válidos",
        loadingDraw: "Carregando sorteio",
        processingComments: "Processando comentários...",
        selecting: "Selecionando...",
        loadAndStart: "Carregue comentários e inicie o sorteio.",
        winner: "Vencedor",
        noWinner: "Nenhum vencedor definido.",
        viewPost: "Ver publicação",
      };

  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [isAdminAutorizado, setIsAdminAutorizado] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  });

  const [linkPost, setLinkPost] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [igUserId, setIgUserId] = useState("");
  const [semDuplicidadeUsuario, setSemDuplicidadeUsuario] = useState(true);
  const [comentariosBase, setComentariosBase] = useState([]);
  const [erro, setErro] = useState("");
  const [statusBusca, setStatusBusca] = useState("idle");
  const [sorteando, setSorteando] = useState(false);
  const [candidatoAtual, setCandidatoAtual] = useState(null);
  const [vencedor, setVencedor] = useState(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const participantes = useMemo(() => {
    if (!semDuplicidadeUsuario) {
      return comentariosBase;
    }
    const map = new Map();
    for (const item of comentariosBase) {
      const key = item.usuario.toLowerCase().replace(/\s+/g, "");
      if (!map.has(key)) {
        map.set(key, item);
      }
    }
    return [...map.values()];
  }, [comentariosBase, semDuplicidadeUsuario]);

  function limparTimers() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  useEffect(() => () => limparTimers(), []);

  function autenticarAdmin(event) {
    event.preventDefault();
    if (loginUser === ADMIN_USER && loginPass === ADMIN_PASS) {
      setIsAdminAutorizado(true);
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setErro("");
      return;
    }
    setErro(txt.invalidLogin);
  }

  function sairAdmin() {
    setIsAdminAutorizado(false);
    setLoginUser("");
    setLoginPass("");
    setComentariosBase([]);
    setVencedor(null);
    setCandidatoAtual(null);
    setErro("");
    window.sessionStorage.removeItem(SESSION_KEY);
    limparTimers();
  }

  async function buscarComentariosViaLink() {
    if (!accessToken || !igUserId || !linkPost) {
      setErro(txt.requiredFields);
      return;
    }

    setErro("");
    setStatusBusca("loading");
    setComentariosBase([]);
    setCandidatoAtual(null);
    setVencedor(null);

    try {
      const mediaId = await encontrarMediaIdPorLink({ accessToken, igUserId, linkPost });
      const comentarios = await buscarComentariosDoMedia({ accessToken, mediaId });

      if (comentarios.length === 0) {
        setErro(txt.noComments);
        setStatusBusca("idle");
        return;
      }

      setComentariosBase(comentarios);
      setStatusBusca("success");
    } catch (error) {
      setErro(error.message || txt.fetchError);
      setStatusBusca("idle");
    }
  }

  function sortear() {
    if (participantes.length === 0) {
      setErro(txt.noParticipants);
      return;
    }

    setErro("");
    setSorteando(true);
    setVencedor(null);

    intervalRef.current = setInterval(() => {
      const idx = randomIntInclusivo(0, participantes.length - 1);
      setCandidatoAtual(participantes[idx]);
    }, 120);

    const duracaoMs = randomIntInclusivo(3500, 6000);
    timeoutRef.current = setTimeout(() => {
      limparTimers();
      const vencedorIndex = randomIntInclusivo(0, participantes.length - 1);
      const escolhido = participantes[vencedorIndex];
      setCandidatoAtual(escolhido);
      setVencedor(escolhido);
      setSorteando(false);
    }, duracaoMs);
  }

  function resetar() {
    limparTimers();
    setSorteando(false);
    setCandidatoAtual(null);
    setVencedor(null);
    setErro("");
  }

  return (
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{uiText(txt.back)}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>

      {!isAdminAutorizado ? (
        <Panel as="form" layout="plain" onSubmit={autenticarAdmin} className="max-w-xl">
          <h2 className="text-2xl font-bold mb-2">{uiText(txt.protectedAccess)}</h2>
          <p className="text-slate-400 text-sm mb-6">{uiText(txt.protectedDesc)}</p>
          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm text-slate-300 mb-2">{uiText(txt.user)}</span>
              <Input
                type="text"
                value={loginUser}
                onChange={(event) => setLoginUser(event.target.value)}
                className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </label>
            <label className="block">
              <span className="block text-sm text-slate-300 mb-2">{uiText(txt.password)}</span>
              <Input
                type="password"
                value={loginPass}
                onChange={(event) => setLoginPass(event.target.value)}
                className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </label>
          </div>
          <Button variant="primary"
            type="submit"
            className="mt-6 text-slate-900 transition"
          >
            {uiText(txt.enter)}
          </Button>
          {erro && <p className="text-red-400 text-sm mt-4">{uiMessage(erro)}</p>}
        </Panel>
      ) : (
        <>
          <Panel as="div" layout="plain">
            <div className="flex justify-end mb-4">
              <Button variant="secondary"
                type="button"
                onClick={sairAdmin}
                className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition"
              >
                {uiText(txt.logout)}
              </Button>
            </div>

            <p className="text-slate-400 mb-6">{uiText(txt.apiDesc)}</p>

            <div className="space-y-4">
              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{uiText(txt.token)}</span>
                <Input
                  type="password"
                  value={accessToken}
                  onChange={(event) => setAccessToken(event.target.value)}
                  placeholder={uiText("EAAB...")}
                  className="w-full border text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{uiText(txt.userId)}</span>
                <Input
                  type="text"
                  value={igUserId}
                  onChange={(event) => setIgUserId(event.target.value)}
                  placeholder="1784..."
                  className="w-full border text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="block text-sm text-slate-300 mb-2">{uiText(txt.postLink)}</span>
                <Input
                  type="url"
                  value={linkPost}
                  onChange={(event) => setLinkPost(event.target.value)}
                  placeholder={uiText("https://www.instagram.com/p/...")}
                  className="w-full border text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </label>
              <label className="inline-flex items-center gap-2 text-slate-300">
                <Input
                  type="checkbox"
                  checked={semDuplicidadeUsuario}
                  onChange={(event) => setSemDuplicidadeUsuario(event.target.checked)}
                  className="h-4 w-4 accent-cyan-400"
                />
                {uiText(txt.oneCommentPerUser)}
              </label>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button variant="primary"
                type="button"
                onClick={buscarComentariosViaLink}
                disabled={statusBusca === "loading"}
                className="text-slate-900 transition disabled:opacity-60"
              >
                {uiText(statusBusca === "loading" ? txt.searching : txt.searchComments)}
              </Button>
              <Button variant="secondary"
                type="button"
                onClick={sortear}
                disabled={sorteando || participantes.length === 0}
                className="border border-cyan-600/70 text-cyan-300 hover:border-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uiText(sorteando ? txt.drawing : txt.startDraw)}
              </Button>
              <Button variant="secondary"
                type="button"
                onClick={resetar}
                className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition"
              >
                {uiText(txt.reset)}
              </Button>
            </div>

            {erro && <p className="text-red-400 text-sm mt-4">{uiMessage(erro)}</p>}
            <p className="text-slate-400 text-sm mt-4">
              {uiText(txt.validParticipants)}: <strong className="text-slate-200">{uiText(participantes.length)}</strong>
            </p>
          </Panel>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Panel as="article" layout="plain">
              <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-3">{uiText(txt.loadingDraw)}</h2>
              {sorteando ? (
                <div>
                  <div className="inline-flex items-center gap-2 text-cyan-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 animate-pulse" />
                    {uiText(txt.processingComments)}
                  </div>
                  <p className="text-3xl md:text-4xl font-black text-cyan-200 mt-4 break-all">
                    {uiText(candidatoAtual?.usuario || txt.selecting)}
                  </p>
                </div>
              ) : (
                <p className="text-slate-400">{uiText(txt.loadAndStart)}</p>
              )}
            </Panel>

            <Panel as="article" layout="plain">
              <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-3">{uiText(txt.winner)}</h2>
              {!vencedor ? (
                <p className="text-slate-400">{uiText(txt.noWinner)}</p>
              ) : (
                <div>
                  <p className="text-3xl md:text-4xl font-black text-emerald-300 break-all">
                    {vencedor.usuario}
                  </p>
                  <p className="text-slate-300 mt-3">"{vencedor.comentario}"</p>
                  {linkPost && (
                    <a
                      href={linkPost}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex mt-4 text-cyan-300 hover:text-cyan-200"
                    >
                      {uiText(txt.viewPost)}
                    </a>
                  )}
                </div>
              )}
            </Panel>
          </div>
        </>
      )}
    </PageTemplate>
  );
}
