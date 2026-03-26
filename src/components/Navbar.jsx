import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import algoritmosListas from "../data/algoritmos-listas.json";
import logo from "../assets/images/logo.png";
import logoB9 from "../assets/images/logob9.png";
import { useAdminAuth } from "../hooks/useAdminAuth";

const sectionItems = [
  { href: "/roadmaps", label: "Roadmaps" },
];

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function slugify(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }
  const savedTheme = window.localStorage.getItem("site-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return "dark";
}

function ThemeToggle({ theme, onToggle, labels, className = "" }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-9 w-[78px] items-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${
        isDark ? "bg-black border-black" : "bg-orange-500 border-orange-500"
      } ${className}`}
      aria-label={isDark ? labels.toLight : labels.toDark}
      title={isDark ? labels.light : labels.dark}
    >
      <span
        className={`absolute text-white transition-all duration-300 ${
          isDark ? "left-3" : "right-3"
        }`}
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
              fill="currentColor"
              d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
              fill="currentColor"
              d="M12 5a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Zm0 11a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM6 11a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2h1Zm13 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM7.05 7.05a1 1 0 0 1 1.41 0l.71.7a1 1 0 0 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41Zm7.78 7.78a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42ZM7.76 14.83a1 1 0 0 1 1.41 1.41l-.7.71a1 1 0 0 1-1.42-1.41l.71-.71Zm8.48-8.48a1 1 0 0 1 1.41 1.41l-.7.71a1 1 0 1 1-1.42-1.41l.71-.71ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
            />
          </svg>
        )}
      </span>
      <span
        className={`absolute h-7 w-7 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.35)] transition-all duration-300 ${
          isDark ? "right-1" : "left-1"
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">{isDark ? labels.darkActive : labels.lightActive}</span>
    </button>
  );
}

function LanguageToggle({ currentLanguage, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={currentLanguage}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 bg-slate-900/70 border border-slate-700 rounded-xl px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
      >
        <option value="pt">PT</option>
        <option value="en">EN</option>
      </select>
    </label>
  );
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);
  const searchContainerRef = useRef(null);
  const mobileSearchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguage =
    (i18n.resolvedLanguage || i18n.language || "pt").startsWith("en") ? "en" : "pt";
  const isEn = currentLanguage === "en";

  const searchItems = useMemo(() => {
    const pageLabel = isEn ? "Page" : "Página";
    const subjectLabel = isEn ? "Subject" : "Disciplina";

    const baseSearchItems = [
      {
        title: isEn ? "Home" : "Início",
        subtitle: "Home",
        path: "/#inicio",
        keywords: "home inicio inico principal",
      },
      {
        title: t("roadmaps.title"),
        subtitle: pageLabel,
        path: "/roadmaps",
        keywords: "roadmaps trilhas tracks learning aprendizado estudos",
      },
      {
        title: t("roadmapPages.ciber.title"),
        subtitle: t("roadmaps.title"),
        path: "/roadmaps/ciberseguranca",
        keywords: "ciberseguranca cybersecurity cyber security blue team red team soc pentest appsec cloud security",
      },
      {
        title: t("roadmapPages.javascript.title"),
        subtitle: t("roadmaps.title"),
        path: "/roadmaps/javascript",
        keywords: "javascript js ecmascript dom async await node api front-end back-end",
      },
      {
        title: t("roadmapPages.logic.title"),
        subtitle: t("roadmaps.title"),
        path: "/roadmaps/logica-programacao",
        keywords: "logica lógica programming logic algoritmos pseudocodigo estruturas repeticao condicional funcoes",
      },
      {
        title: isEn ? "Privacy Notice" : "Aviso de Privacidade",
        subtitle: pageLabel,
        path: "/aviso-de-privacidade",
        keywords: "privacidade privacy lgpd cookies dados data",
      },
      {
        title: t("navbar.blog"),
        subtitle: pageLabel,
        path: "/blog",
        keywords: "blog artigos articles novidades",
      },
      {
        title: t("navbar.utilities"),
        subtitle: pageLabel,
        path: "/utilidades",
        keywords: "utilities utilidades ferramentas tools",
      },
      {
        title: isEn ? "ZIP Code Finder" : "Buscador de CEP",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/busca-cep",
        keywords: "cep zipcode zip code endereco address viacep busca finder",
      },
      {
        title: isEn ? "BMI Calculator" : "Calculadora de IMC",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/imc",
        keywords: "imc bmi massa corporal body mass",
      },
      {
        title: isEn ? "Exam Timer" : "Timer de Prova",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/timer-prova",
        keywords: "timer tempo prova exam countdown cronometro relógio",
      },
      {
        title: isEn ? "Number Draw" : "Sorteio de Números",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/sorteio-numeros",
        keywords: "draw sorteio numeros numbers random aleatorio",
      },
      {
        title: isEn ? "Instagram Draw" : "Sorteio Instagram",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/sorteio-instagram",
        keywords: "instagram comentario comment draw sorteio",
      },
      {
        title: isEn ? "Password Generator" : "Gerador de Senhas",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/gerador-senhas",
        keywords: "senha password generator segura forte",
      },
      {
        title: isEn ? "CPF/CNPJ Validator" : "Validador CPF/CNPJ",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/validador-cpf-cnpj",
        keywords: "cpf cnpj validate validator documento document",
      },
      {
        title: isEn ? "Date/Time Converter" : "Conversor de Datas/Horas",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/conversor-data-hora",
        keywords: "data date hora time converter timezone fuso utc",
      },
      {
        title: isEn ? "Interest Calculator" : "Calculadora de Juros",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/calculadora-juros",
        keywords: "juros interest simples compostos compound",
      },
      {
        title: isEn ? "QR Code Generator" : "Gerador de QR Code",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/gerador-qrcode",
        keywords: "qrcode qr code generator gerar",
      },
      {
        title: isEn ? "Team Draw" : "Sorteio de Times",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/sorteio-times",
        keywords: "times teams draw groups grupos",
      },
      {
        title: isEn ? "Pomodoro Timer" : "Cronômetro Pomodoro",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/pomodoro",
        keywords: "pomodoro focus foco pausa break timer",
      },
      {
        title: isEn ? "SQL/JSON Mock Generator" : "Gerador SQL/JSON Mock",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/mock-sql-json",
        keywords: "sql json mock test data dados",
      },
      {
        title: isEn ? "Text Comparator" : "Comparador de Textos",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/comparador-textos",
        keywords: "comparador comparator textos text diff linhas lines",
      },
      {
        title: isEn ? "Regex Tester" : "Corretor de Regex",
        subtitle: t("navbar.utilities"),
        path: "/utilidades/testador-regex",
        keywords: "regex regular expression expressoes regulares",
      },
      {
        title: t("navbar.subjects"),
        subtitle: pageLabel,
        path: "/disciplinas",
        keywords: "disciplinas subjects ensino educacao education",
      },
      {
        title: t("subjects.items.algoritmos.title"),
        subtitle: subjectLabel,
        path: "/disciplinas/algoritmos",
        keywords: "algoritmos algorithms listas exercicios exercises logic logica",
      },
      {
        title: t("subjects.items.analise-dados.title"),
        subtitle: subjectLabel,
        path: "/disciplinas/analise-dados",
        keywords:
          "analise de dados análise de dados data analysis pandas estatistica estatística correlacao correlação outliers dashboard graficos gráficos",
      },
      {
        title: isEn ? "Students and Grades Dataset" : "Dataset de alunos e notas",
        subtitle: t("subjects.items.analise-dados.title"),
        path: "/disciplinas/analise-dados/lista-exercicios-90-questoes",
        keywords:
          "lista exercicios analise dados 90 questoes pandas estatistica correlacao visualizacao dataset alunos notas",
      },
      {
        title: isEn ? "Credit Analysis Dataset" : "Dataset para análise de crédito",
        subtitle: t("subjects.items.analise-dados.title"),
        path: "/disciplinas/analise-dados/dataset-analise-credito",
        keywords:
          "analise de credito análise de crédito credit analysis dataset score risco inadimplencia inadimplência clientes pandas estatistica",
      },
      {
        title: t("subjects.items.arquitetura-software.title"),
        subtitle: subjectLabel,
        path: "/disciplinas/arquitetura-software",
        keywords:
          "arquitetura software architecture ppt aulas base fundamentos escalabilidade latencia requisitos nao funcionais hibridas",
      },
      {
        title: t("subjects.items.arquitetura-software-techplay.title"),
        subtitle: subjectLabel,
        path: "/disciplinas/arquitetura-software-techplay",
        keywords:
          "arquitetura software architecture techplay microservices monolito monolith camadas layers ddd clean hexagonal cap c4 eventos",
      },
      {
        title: t("subjects.items.modelagem-banco-dados.title"),
        subtitle: subjectLabel,
        path: "/disciplinas/modelagem-dados",
        keywords: "modelagem modelagem dados data modeling der entidade relacionamento",
      },
      {
        title: t("subjects.items.git-github.title"),
        subtitle: subjectLabel,
        path: "/disciplinas/git-github",
        keywords: "git github commit branch push pull clone merge",
      },
      {
        title: t("subjects.items.protocolo-http.title"),
        subtitle: subjectLabel,
        path: "/disciplinas/protocolo-http",
        keywords: "http protocolo protocol rest api status code codes 200 404 500 verbs get post put patch delete",
      },
      {
        title: t("navbar.contact"),
        subtitle: pageLabel,
        path: "/contato",
        keywords: "contato contact fale conosco talk email telefone phone",
      },
      {
        title: t("navbar.adminArea"),
        subtitle: pageLabel,
        path: "/admin",
        keywords: "admin administrativa dashboard painel login restrito protected",
      },
    ];

    const listaItems = algoritmosListas.map((lista) => ({
      title: isEn ? lista.titulo_en || lista.titulo : lista.titulo,
      subtitle: `${t("navbar.subjects")} • ${isEn ? lista.tipo_en || lista.tipo : lista.tipo}`,
      path: `/disciplinas/algoritmos#${slugify(isEn ? lista.titulo_en || lista.titulo : lista.titulo)}`,
      keywords: `${lista.titulo} ${lista.tipo} ${lista.titulo_en || ""} ${lista.tipo_en || ""} algoritmos algorithms exercicios exercises lista list`,
    }));

    return [...baseSearchItems, ...listaItems];
  }, [isEn, t]);

  const searchResults = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());

    if (!normalizedQuery) {
      return [];
    }

    return searchItems
      .filter((item) =>
        normalizeText(`${item.title} ${item.subtitle} ${item.keywords}`).includes(normalizedQuery)
      )
      .slice(0, 8);
  }, [query, searchItems]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  function handleLanguageChange(nextLanguage) {
    i18n.changeLanguage(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("site-language", nextLanguage);
    }
  }

  function handleNavigate(path) {
    if (path === `${location.pathname}${location.hash}`) {
      closeSearch();
      setOpen(false);
      return;
    }

    navigate(path);
    closeSearch();
    setOpen(false);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    if (searchResults.length === 0) {
      return;
    }

    handleNavigate(searchResults[0].path);
  }

  function handleCloseMobileMenu() {
    setOpen(false);
  }

  useEffect(() => {
    const isLight = theme === "light";
    document.body.classList.toggle("light-theme", isLight);
    document.documentElement.style.colorScheme = isLight ? "light" : "dark";
    window.localStorage.setItem("site-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    searchInputRef.current?.focus();

    function handleOutsideClick(event) {
      const clickedDesktopSearch =
        searchContainerRef.current && searchContainerRef.current.contains(event.target);
      const clickedMobileSearch =
        mobileSearchContainerRef.current && mobileSearchContainerRef.current.contains(event.target);

      if (!clickedDesktopSearch && !clickedMobileSearch) {
        closeSearch();
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        closeSearch();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [searchOpen]);

  const themeLabels = {
    toLight: t("navbar.theme.toLight"),
    toDark: t("navbar.theme.toDark"),
    light: t("navbar.theme.light"),
    dark: t("navbar.theme.dark"),
    darkActive: t("navbar.theme.darkActive"),
    lightActive: t("navbar.theme.lightActive"),
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
      <div className="glass rounded-2xl px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between gap-3">
        <Link to="/" className="inline-flex items-center gap-3 min-w-0 shrink">
          <img
            src={theme === "light" ? logoB9 : logo}
            alt="Borgonove Tech"
            className="h-5 sm:h-6 md:h-7 w-auto max-w-[140px] sm:max-w-[170px] md:max-w-none object-contain"
          />
          <span className="sr-only">Borgonove.tech</span>
        </Link>

        <nav className="hidden md:flex gap-10 text-sm font-medium">
          <span
            className="text-cyan-300"
            title={t("navbar.adminArea")}
          >
            {t("navbar.me")}
          </span>
          {sectionItems.map((item) => (
            <Link key={item.href} to={item.href} className="menu-link">
              {t("navbar.roadmaps")}
            </Link>
          ))}
          <Link to="/blog" className="menu-link">
            {t("navbar.blog")}
          </Link>
          <Link to="/utilidades" className="menu-link">
            {t("navbar.utilities")}
          </Link>
          <Link to="/disciplinas" className="menu-link">
            {t("navbar.subjects")}
          </Link>
        </nav>

        <div ref={searchContainerRef} className="hidden md:flex items-center gap-4 relative">
          {!searchOpen && (
            <button
              type="button"
              className="border border-slate-700 text-slate-200 px-3 py-2 rounded-xl hover:border-cyan-400 transition"
              aria-label={t("navbar.search.open")}
              onClick={() => setSearchOpen(true)}
            >
              {t("navbar.search.open")}
            </button>
          )}

          {searchOpen && (
            <form onSubmit={handleSearchSubmit} className="relative w-52">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              >
                <path
                  fill="currentColor"
                  d="M10.5 3a7.5 7.5 0 1 1-4.7 13.34l-2.57 2.57a1 1 0 1 1-1.42-1.42l2.57-2.57A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
                />
              </svg>
              <input
                ref={searchInputRef}
                type="search"
                placeholder={t("navbar.search.placeholder")}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-11 pr-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
              />

              {query.trim() && (
                <div className="absolute top-full mt-2 left-0 w-full glass rounded-xl p-2 z-50">
                  {searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((item) => (
                        <button
                          key={`${item.path}-${item.title}`}
                          type="button"
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800/70 transition"
                          onClick={() => handleNavigate(item.path)}
                        >
                          <p className="text-sm text-slate-100">{item.title}</p>
                          <p className="text-xs text-slate-400">{item.subtitle}</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="px-3 py-2 text-sm text-slate-400">{t("navbar.search.none")}</p>
                  )}
                </div>
              )}
            </form>
          )}

          {!searchOpen && (
            <Link
              to="/contato"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-5 py-2 rounded-xl font-semibold transition"
            >
              {t("navbar.contact")}
            </Link>
          )}

          <LanguageToggle
            currentLanguage={currentLanguage}
            onChange={handleLanguageChange}
            label={t("navbar.language")}
          />

          <Link
            to="/admin"
            className={`h-9 min-w-9 rounded-xl border border-slate-700 inline-flex items-center justify-center px-3 transition ${
              isAuthenticated
                ? "bg-cyan-500/15 border-cyan-400 text-cyan-300"
                : "text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
            }`}
            title={t("navbar.adminArea")}
            aria-label={t("navbar.adminArea")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
              <path
                fill="currentColor"
                d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 2.1 6 2.25V11c0 4.1-2.6 8.1-6 9.6-3.4-1.5-6-5.5-6-9.6V6.35L12 4.1ZM9 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z"
              />
            </svg>
          </Link>

          <ThemeToggle theme={theme} onToggle={toggleTheme} labels={themeLabels} />
        </div>

        <button
          type="button"
          className="md:hidden text-2xl"
          aria-label={t("navbar.menuOpen")}
          onClick={() => setOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="glass rounded-2xl mt-3 px-6 py-6 md:hidden">
          <span className="block py-2 text-cyan-300" title={t("navbar.adminArea")}>
            {t("navbar.me")}
          </span>
          {sectionItems.map((item) => (
            <Link key={item.href} to={item.href} className="block py-2" onClick={handleCloseMobileMenu}>
              {t("navbar.roadmaps")}
            </Link>
          ))}
          <Link to="/blog" className="block py-2" onClick={handleCloseMobileMenu}>
            {t("navbar.blog")}
          </Link>
          <Link to="/utilidades" className="block py-2" onClick={handleCloseMobileMenu}>
            {t("navbar.utilities")}
          </Link>
          <Link to="/disciplinas" className="block py-2" onClick={handleCloseMobileMenu}>
            {t("navbar.subjects")}
          </Link>
          <Link
            to="/contato"
            onClick={handleCloseMobileMenu}
            className="mt-2 block w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-4 py-2 rounded-xl font-semibold text-center transition"
          >
            {t("navbar.talkToUs")}
          </Link>
          <Link
            to="/admin"
            onClick={handleCloseMobileMenu}
            className={`mt-2 w-full border px-3 py-2 rounded-xl inline-flex items-center justify-center gap-2 transition ${
              isAuthenticated
                ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                : "border-slate-700 text-slate-200 hover:border-cyan-400"
            }`}
            title={t("navbar.adminArea")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
              <path
                fill="currentColor"
                d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 2.1 6 2.25V11c0 4.1-2.6 8.1-6 9.6-3.4-1.5-6-5.5-6-9.6V6.35L12 4.1ZM9 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z"
              />
            </svg>
            <span>{t("navbar.adminArea")}</span>
          </Link>
          <div className="mt-2 flex items-center justify-center gap-2">
            <LanguageToggle
              currentLanguage={currentLanguage}
              onChange={handleLanguageChange}
              label={t("navbar.language")}
            />
            <ThemeToggle theme={theme} onToggle={toggleTheme} labels={themeLabels} />
          </div>
          <div ref={mobileSearchContainerRef}>
            <button
              type="button"
              className="mt-4 w-full border border-slate-700 text-slate-200 px-3 py-2 rounded-xl"
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              {t("navbar.search.open")}
            </button>
            {searchOpen && (
              <form onSubmit={handleSearchSubmit} className="relative mt-3">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <path
                    fill="currentColor"
                    d="M10.5 3a7.5 7.5 0 1 1-4.7 13.34l-2.57 2.57a1 1 0 1 1-1.42-1.42l2.57-2.57A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder={t("navbar.search.placeholder")}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-11 pr-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
                />
                {query.trim() && (
                  <div className="mt-2 glass rounded-xl p-2">
                    {searchResults.length > 0 ? (
                      <div className="space-y-1">
                        {searchResults.map((item) => (
                          <button
                            key={`mobile-${item.path}-${item.title}`}
                            type="button"
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800/70 transition"
                            onClick={() => handleNavigate(item.path)}
                          >
                            <p className="text-sm text-slate-100">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.subtitle}</p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="px-3 py-2 text-sm text-slate-400">{t("navbar.search.none")}</p>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
