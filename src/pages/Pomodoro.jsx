import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

function formatDuration(seconds) {
  const safe = Math.max(0, seconds);
  const mm = String(Math.floor(safe / 60)).padStart(2, "0");
  const ss = String(safe % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function Pomodoro() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Pomodoro Timer",
        focusMinutes: "Focus minutes",
        breakMinutes: "Break minutes",
        presetDefault: "Default 25/5",
        presetDeep: "Deep work 50/10",
        presetShort: "Short 15/3",
        applyManual: "Apply manual",
        currentMode: "Current mode",
        focus: "Focus",
        break: "Break",
        finishedCycles: "Completed cycles",
        pause: "Pause",
        start: "Start",
        reset: "Reset",
      }
    : {
        back: "Voltar para utilidades",
        title: "Cronômetro Pomodoro",
        focusMinutes: "Minutos de foco",
        breakMinutes: "Minutos de pausa",
        presetDefault: "Padrão 25/5",
        presetDeep: "Profundo 50/10",
        presetShort: "Curto 15/3",
        applyManual: "Aplicar manual",
        currentMode: "Modo atual",
        focus: "Foco",
        break: "Pausa",
        finishedCycles: "Ciclos finalizados",
        pause: "Pausar",
        start: "Iniciar",
        reset: "Resetar",
      };

  const [focusMinutes, setFocusMinutes] = useState("25");
  const [breakMinutes, setBreakMinutes] = useState("5");
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!running) return undefined;

    const focusSecs = Math.max(1, (Number(focusMinutes) || 25) * 60);
    const breakSecs = Math.max(1, (Number(breakMinutes) || 5) * 60);

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        if (mode === "focus") {
          setMode("break");
          setCycles((current) => current + 1);
          return breakSecs;
        }
        setMode("focus");
        return focusSecs;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [breakMinutes, focusMinutes, mode, running]);

  const progress = useMemo(() => {
    const total = Math.max(1, (Number(mode === "focus" ? focusMinutes : breakMinutes) || 1) * 60);
    const done = total - secondsLeft;
    return Math.max(0, Math.min(100, (done / total) * 100));
  }, [breakMinutes, focusMinutes, mode, secondsLeft]);

  function applyPreset(focus, pause) {
    setFocusMinutes(String(focus));
    setBreakMinutes(String(pause));
    setMode("focus");
    setSecondsLeft(focus * 60);
    setRunning(false);
    setCycles(0);
  }

  function resetTimer() {
    const focusSecs = Math.max(1, (Number(focusMinutes) || 25) * 60);
    setMode("focus");
    setSecondsLeft(focusSecs);
    setRunning(false);
  }

  function syncManualMinutes() {
    const focusSecs = Math.max(1, (Number(focusMinutes) || 25) * 60);
    const breakSecs = Math.max(1, (Number(breakMinutes) || 5) * 60);
    setSecondsLeft(mode === "focus" ? focusSecs : breakSecs);
    setRunning(false);
  }

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-5xl mx-auto">
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{txt.back}
      </BackButton>

      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M9 2h6a1 1 0 1 1 0 2h-1v1.1A8 8 0 1 1 10 5.1V4H9a1 1 0 1 1 0-2Zm3 5a1 1 0 0 0-1 1v4.6l3 1.8a1 1 0 1 0 1-1.72l-2-1.2V8a1 1 0 0 0-1-1Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>

      <div className="glass rounded-2xl p-8">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.focusMinutes}</span>
            <input
              type="number"
              min="1"
              value={focusMinutes}
              onChange={(event) => setFocusMinutes(event.target.value)}
              className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{txt.breakMinutes}</span>
            <input
              type="number"
              min="1"
              value={breakMinutes}
              onChange={(event) => setBreakMinutes(event.target.value)}
              className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 text-sm">
          <button type="button" onClick={() => applyPreset(25, 5)} className="border border-slate-700 px-3 py-1.5 rounded-lg hover:border-cyan-400 transition">{txt.presetDefault}</button>
          <button type="button" onClick={() => applyPreset(50, 10)} className="border border-slate-700 px-3 py-1.5 rounded-lg hover:border-cyan-400 transition">{txt.presetDeep}</button>
          <button type="button" onClick={() => applyPreset(15, 3)} className="border border-slate-700 px-3 py-1.5 rounded-lg hover:border-cyan-400 transition">{txt.presetShort}</button>
          <button type="button" onClick={syncManualMinutes} className="border border-slate-700 px-3 py-1.5 rounded-lg hover:border-cyan-400 transition">{txt.applyManual}</button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm uppercase tracking-wider text-slate-400">{txt.currentMode}</p>
          <p className="text-2xl font-bold text-cyan-300 mt-1">{mode === "focus" ? txt.focus : txt.break}</p>
          <p className="text-6xl md:text-7xl font-black mt-4">{formatDuration(secondsLeft)}</p>

          <div className="w-full h-3 rounded-full bg-slate-800 mt-6 overflow-hidden">
            <div className="h-full bg-cyan-400 transition-all" style={{ width: `${progress}%` }} />
          </div>

          <p className="text-slate-400 text-sm mt-3">{txt.finishedCycles}: {cycles}</p>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mt-6">
          <button
            type="button"
            onClick={() => setRunning((prev) => !prev)}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-xl font-semibold transition"
          >
            {running ? txt.pause : txt.start}
          </button>
          <button
            type="button"
            onClick={resetTimer}
            className="border border-slate-700 text-slate-200 px-6 py-2.5 rounded-xl hover:border-cyan-400 transition"
          >
            {txt.reset}
          </button>
        </div>
      </div>
    </section>
  );
}
