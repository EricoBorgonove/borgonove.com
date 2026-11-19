import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel, Textarea } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

function randomIntInclusivo(min, max) {
  const range = max - min + 1;
  if (range <= 0) return min;

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

function shuffleArray(input) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomIntInclusivo(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function SorteioTimes() {
  const { text: uiText, message: uiMessage } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Team Draw",
        participants: "Participants (one per line)",
        teamsAmount: "Number of teams",
        drawTeams: "Draw teams",
        participantsCount: "Participants",
        invalidTeams: "Enter a valid number of teams.",
        notEnoughParticipants: "Number of participants must be greater than or equal to number of teams.",
        team: "Team",
      }
    : {
        back: "Voltar para utilidades",
        title: "Sorteio de Times",
        participants: "Participantes (um por linha)",
        teamsAmount: "Quantidade de times",
        drawTeams: "Sortear times",
        participantsCount: "Participantes",
        invalidTeams: "Informe uma quantidade válida de times.",
        notEnoughParticipants: "Número de participantes deve ser maior ou igual ao número de times.",
        team: "Time",
      };

  const [nomesInput, setNomesInput] = useState("");
  const [quantidadeTimes, setQuantidadeTimes] = useState("2");
  const [erro, setErro] = useState("");
  const [times, setTimes] = useState([]);

  const participantes = useMemo(
    () =>
      nomesInput
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean),
    [nomesInput]
  );

  function sortearTimes() {
    const qtdTimes = Number(quantidadeTimes);

    if (!Number.isInteger(qtdTimes) || qtdTimes <= 0) {
      setErro(txt.invalidTeams);
      return;
    }

    if (participantes.length < qtdTimes) {
      setErro(txt.notEnoughParticipants);
      return;
    }

    setErro("");
    const embaralhados = shuffleArray(participantes);
    const grupos = Array.from({ length: qtdTimes }, (_, index) => ({
      nome: `${txt.team} ${index + 1}`,
      membros: [],
    }));

    embaralhados.forEach((participante, index) => {
      grupos[index % qtdTimes].membros.push(participante);
    });

    setTimes(grupos);
  }

  return (
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{uiText(txt.back)}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M8 4h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4v-2h4v-8h-2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2H4v8h4v2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2V6a2 2 0 0 1 2-2Zm0 2v6h8V6H8Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>

      <Panel as="div" layout="plain">
        <div className="grid md:grid-cols-3 gap-6">
          <label className="block md:col-span-2">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.participants)}</span>
            <Textarea
              rows={9}
              value={nomesInput}
              onChange={(event) => setNomesInput(event.target.value)}
              placeholder={uiText("Ana\nBruno\nCarlos\nDaniela")}
              className="w-full border text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <div>
            <label className="block">
              <span className="block text-sm text-slate-300 mb-2">{uiText(txt.teamsAmount)}</span>
              <Input
                type="number"
                min="2"
                value={quantidadeTimes}
                onChange={(event) => setQuantidadeTimes(event.target.value)}
                className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </label>
            <Button variant="primary"
              type="button"
              onClick={sortearTimes}
              className="mt-4 w-full text-slate-900 transition"
            >
              {uiText(txt.drawTeams)}
            </Button>
            <p className="text-sm text-slate-400 mt-3">{uiText(txt.participantsCount)}: {uiText(participantes.length)}</p>
          </div>
        </div>

        {erro && <p className="text-red-400 text-sm mt-4">{uiMessage(erro)}</p>}
      </Panel>

      {times.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {times.map((time, teamIndex) => (
            <Panel as="article" layout="plain" key={time.nome}>
              <h2 className="text-xl font-bold text-cyan-300 mb-4">{uiText(txt.team)} {teamIndex + 1}</h2>
              <ul className="space-y-2 text-slate-300 text-sm">
                {time.membros.map((membro) => (
                  <li key={`${time.nome}-${membro}`}>{membro}</li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      )}
    </PageTemplate>
  );
}
