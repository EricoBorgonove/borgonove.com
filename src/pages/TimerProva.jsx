import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import logo from "../assets/images/logo.png";
import logoB9 from "../assets/images/logob9.png";

function formatHoraAtual(timestamp, locale) {
  return new Date(timestamp).toLocaleTimeString(locale, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatDuracao(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

export default function TimerProva() {
  const { text: uiText, message: uiMessage } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const locale = isEn ? "en-US" : "pt-BR";
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Exam Timer",
        subtitle: "Set the exam duration. The system shows current time and remaining time.",
        hours: "Hours",
        minutes: "Minutes",
        start: "Start",
        clear: "Clear",
        invalidTime: "Enter an exam time greater than zero.",
        currentTime: "Current time",
        remainingTime: "Remaining exam time",
        running: "Exam in progress",
        ended: "Time is up",
        configureStart: "Set and start the timer",
        expand: "Expand clocks",
        exitFullscreen: "Exit fullscreen",
        exit: "Exit",
      }
    : {
        back: "Voltar para utilidades",
        title: "Timer de Prova",
        subtitle: "Defina a duração da prova. O sistema mostra a hora atual e o tempo restante até o término.",
        hours: "Horas",
        minutes: "Minutos",
        start: "Iniciar",
        clear: "Limpar",
        invalidTime: "Informe um tempo de prova maior que zero.",
        currentTime: "Hora atual",
        remainingTime: "Tempo restante da prova",
        running: "Prova em andamento",
        ended: "Tempo encerrado",
        configureStart: "Configure e inicie o timer",
        expand: "Expandir relógios",
        exitFullscreen: "Sair da tela cheia",
        exit: "Sair",
      };

  const [horaDuracao, setHoraDuracao] = useState("2");
  const [minutoDuracao, setMinutoDuracao] = useState("0");
  const [endAt, setEndAt] = useState(null);
  const [now, setNow] = useState(() => Date.now());
  const [erro, setErro] = useState("");
  const [relogiosEmTelaCheia, setRelogiosEmTelaCheia] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!relogiosEmTelaCheia) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setRelogiosEmTelaCheia(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [relogiosEmTelaCheia]);

  const totalSegundosConfigurados = useMemo(() => {
    const horas = Number(horaDuracao) || 0;
    const minutos = Number(minutoDuracao) || 0;
    return horas * 3600 + minutos * 60;
  }, [horaDuracao, minutoDuracao]);

  const segundosRestantes = useMemo(() => {
    if (!endAt) {
      return 0;
    }
    return Math.max(0, Math.ceil((endAt - now) / 1000));
  }, [endAt, now]);

  const provaEmAndamento = endAt !== null && segundosRestantes > 0;
  const provaFinalizada = endAt !== null && segundosRestantes === 0;

  function iniciarTimer() {
    if (totalSegundosConfigurados <= 0) {
      setErro(txt.invalidTime);
      return;
    }

    setErro("");
    setEndAt(Date.now() + totalSegundosConfigurados * 1000);
  }

  function limparTimer() {
    setEndAt(null);
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
            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 5a1 1 0 0 0-2 0v5.59l-2.3 2.3a1 1 0 1 0 1.42 1.41l2.59-2.58A1 1 0 0 0 13 13V7Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>

      <Panel as="div" layout="plain">
        <p className="text-slate-400 mb-6">{uiText(txt.subtitle)}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.hours)}</span>
            <Input
              type="number"
              min="0"
              value={horaDuracao}
              onChange={(event) => setHoraDuracao(event.target.value)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.minutes)}</span>
            <Input
              type="number"
              min="0"
              max="59"
              value={minutoDuracao}
              onChange={(event) => setMinutoDuracao(event.target.value)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <Button variant="primary"
            type="button"
            onClick={iniciarTimer}
            className="text-slate-900 transition"
          >
            {uiText(txt.start)}
          </Button>

          <Button variant="secondary"
            type="button"
            onClick={limparTimer}
            className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition"
          >
            {uiText(txt.clear)}
          </Button>
        </div>

        {erro && <p className="text-red-400 text-sm mt-4">{uiMessage(erro)}</p>}
      </Panel>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Panel as="article" layout="plain">
          <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-3">{uiText(txt.currentTime)}</h2>
          <p className="text-4xl md:text-5xl font-black text-cyan-300">{uiText(formatHoraAtual(now, locale))}</p>
        </Panel>

        <Panel as="article" layout="plain">
          <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-3">{uiText(txt.remainingTime)}</h2>
          <p className="text-4xl md:text-5xl font-black text-cyan-300">
            {uiText(formatDuracao(segundosRestantes))}
          </p>
          {provaEmAndamento && <p className="text-emerald-300 text-sm mt-3">{uiText(txt.running)}</p>}
          {provaFinalizada && <p className="text-red-400 text-sm mt-3">{uiText(txt.ended)}</p>}
          {!endAt && <p className="text-slate-400 text-sm mt-3">{uiText(txt.configureStart)}</p>}
        </Panel>
      </div>

      <div className="mt-5 flex justify-end">
        <Button variant="secondary"
          type="button"
          onClick={() => setRelogiosEmTelaCheia(true)}
          className="border border-slate-700 text-slate-200 hover:border-cyan-400 transition"
        >
          {uiText(txt.expand)}
        </Button>
      </div>

      {relogiosEmTelaCheia && (
        <div className="fixed inset-0 z-[90] bg-slate-950/95 backdrop-blur-sm p-4 md:p-8">
          <Button variant="secondary"
            type="button"
            onClick={() => setRelogiosEmTelaCheia(false)}
            className="absolute top-4 right-4 h-9 w-9 border border-slate-600 text-slate-200 leading-none inline-flex items-center justify-center hover:border-cyan-400 transition"
            aria-label={uiText(txt.exitFullscreen)}
            title={uiText(txt.exit)}
          >
            ×
          </Button>

          <div className="h-full grid md:grid-cols-2 gap-6 pt-8">
            <Panel as="article" layout="plain" className="flex flex-col justify-center items-center text-center">
              <h2 className="text-xs md:text-sm uppercase tracking-wider text-slate-400 mb-4">
                {uiText(txt.currentTime)}
              </h2>
              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-cyan-300">
                {uiText(formatHoraAtual(now, locale))}
              </p>
            </Panel>

            <Panel as="article" layout="plain" className="flex flex-col justify-center items-center text-center">
              <h2 className="text-xs md:text-sm uppercase tracking-wider text-slate-400 mb-4">
                {uiText(txt.remainingTime)}
              </h2>
              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-cyan-300">
                {uiText(formatDuracao(segundosRestantes))}
              </p>
              {provaEmAndamento && <p className="text-emerald-300 text-sm mt-4">{uiText(txt.running)}</p>}
              {provaFinalizada && <p className="text-red-400 text-sm mt-4">{uiText(txt.ended)}</p>}
              {!endAt && <p className="text-slate-400 text-sm mt-4">{uiText(txt.configureStart)}</p>}
            </Panel>
          </div>

          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 opacity-90">
            <img src={logo} alt={uiText("Borgonove Tech")} className="h-6 md:h-7 w-auto footer-logo-dark" />
            <img src={logoB9} alt={uiText("Borgonove Tech")} className="h-6 md:h-7 w-auto footer-logo-light" />
          </div>
        </div>
      )}
    </PageTemplate>
  );
}
