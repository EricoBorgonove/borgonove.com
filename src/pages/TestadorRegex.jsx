import { useContentTranslation } from "../hooks/useContentTranslation";
import { Button, Input, PageTemplate, PageTitle, Panel, Select, Textarea } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import Dialog from "../components/ui/Dialog";

const REGEX_TEMPLATES = [
  {
    id: "email",
    label: "Email",
    pattern: "\\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[A-Za-z]{2,}\\b",
    flags: "g",
    exemplo: "contato@dominio.com",
    keywords: ["email", "e-mail", "mail"],
  },
  {
    id: "telefone_br",
    label: "Telefone BR",
    pattern: "(?:\\+55\\s?)?(?:\\(?\\d{2}\\)?\\s?)?\\d{4,5}-?\\d{4}",
    flags: "g",
    exemplo: "(92) 98255-3114",
    keywords: ["telefone", "fone", "celular", "whatsapp", "contato"],
  },
  {
    id: "celular_br",
    label: "Celular BR (9 dígitos)",
    pattern: "(?:\\+55\\s?)?(?:\\(?\\d{2}\\)?\\s?)?9\\d{4}-?\\d{4}",
    flags: "g",
    exemplo: "(11) 98888-7777",
    keywords: ["celular", "movel", "telefone"],
  },
  {
    id: "cpf",
    label: "CPF formatado",
    pattern: "\\b\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}\\b",
    flags: "g",
    exemplo: "123.456.789-10",
    keywords: ["cpf", "documento"],
  },
  {
    id: "cnpj",
    label: "CNPJ formatado",
    pattern: "\\b\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}\\b",
    flags: "g",
    exemplo: "12.345.678/0001-99",
    keywords: ["cnpj", "empresa"],
  },
  {
    id: "cep",
    label: "CEP",
    pattern: "\\b\\d{5}-?\\d{3}\\b",
    flags: "g",
    exemplo: "69000-000",
    keywords: ["cep", "postal", "endereco"],
  },
  {
    id: "url",
    label: "URL",
    pattern: "\\bhttps?:\\/\\/[\\w.-]+(?:\\/[\\w\\-./?%&=+#]*)?\\b",
    flags: "g",
    exemplo: "https://borgonove.tech",
    keywords: ["url", "link", "site", "http"],
  },
  {
    id: "ipv4",
    label: "IPv4",
    pattern: "\\b(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)){3}\\b",
    flags: "g",
    exemplo: "192.168.0.1",
    keywords: ["ip", "ipv4", "rede"],
  },
  {
    id: "data_br",
    label: "Data BR (dd/mm/aaaa)",
    pattern: "\\b(?:0[1-9]|[12]\\d|3[01])\\/(?:0[1-9]|1[0-2])\\/(?:19|20)\\d{2}\\b",
    flags: "g",
    exemplo: "15/02/2026",
    keywords: ["data", "dd/mm", "nascimento"],
  },
  {
    id: "hora_24",
    label: "Hora (24h)",
    pattern: "\\b(?:[01]\\d|2[0-3]):[0-5]\\d(?:[:][0-5]\\d)?\\b",
    flags: "g",
    exemplo: "23:59:59",
    keywords: ["hora", "horario", "tempo"],
  },
  {
    id: "senha_forte",
    label: "Senha forte",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$",
    flags: "",
    exemplo: "Aa@12345",
    keywords: ["senha", "forte", "password"],
  },
  {
    id: "somente_numeros",
    label: "Somente números",
    pattern: "^\\d+$",
    flags: "",
    exemplo: "123456",
    keywords: ["numero", "digitos", "so numeros"],
  },
  {
    id: "somente_letras",
    label: "Somente letras",
    pattern: "^[A-Za-z]+$",
    flags: "",
    exemplo: "Texto",
    keywords: ["letras", "alfabetico"],
  },
  {
    id: "letras_espacos",
    label: "Letras e espaços",
    pattern: "^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$",
    flags: "",
    exemplo: "Nome Completo",
    keywords: ["nome", "letras", "espacos"],
  },
  {
    id: "placa_mercosul",
    label: "Placa Mercosul",
    pattern: "\\b[A-Z]{3}\\d[A-Z]\\d{2}\\b",
    flags: "g",
    exemplo: "BRA2E19",
    keywords: ["placa", "carro", "veiculo"],
  },
  {
    id: "hashtag",
    label: "Hashtag",
    pattern: "(?:^|\\s)#[A-Za-zÀ-ÖØ-öø-ÿ0-9_]+",
    flags: "g",
    exemplo: "#tecnologia #dev",
    keywords: ["hashtag", "tag", "rede social"],
  },
  {
    id: "usuario_social",
    label: "@usuario",
    pattern: "(?:^|\\s)@[A-Za-z0-9._]{1,30}",
    flags: "g",
    exemplo: "@erico.borgonove",
    keywords: ["usuario", "arroba", "instagram", "social"],
  },
  {
    id: "html_tag",
    label: "Tag HTML",
    pattern:
      "<\\/?[A-Za-z][A-Za-z0-9]*(?:\\s+[A-Za-z_:][-A-Za-z0-9_:.]*(?:=(?:\"[^\"]*\"|'[^']*'|[^\\s\"'=<>`]+))?)*\\s*\\/?>",
    flags: "g",
    exemplo: "<div class='box'>",
    keywords: ["html", "tag", "markup"],
  },
  {
    id: "moeda_br",
    label: "Valor monetário BR",
    pattern: "R\\$\\s?\\d{1,3}(?:\\.\\d{3})*,\\d{2}",
    flags: "g",
    exemplo: "R$ 1.234,56",
    keywords: ["moeda", "real", "preco", "valor"],
  },
  {
    id: "uuid",
    label: "UUID",
    pattern: "\\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}\\b",
    flags: "g",
    exemplo: "550e8400-e29b-41d4-a716-446655440000",
    keywords: ["uuid", "guid", "id unico"],
  },
];

const TEMPLATE_LABELS_EN = {
  email: "Email",
  telefone_br: "BR Phone",
  celular_br: "BR Mobile (9 digits)",
  cpf: "Formatted CPF",
  cnpj: "Formatted CNPJ",
  cep: "ZIP Code",
  url: "URL",
  ipv4: "IPv4",
  data_br: "BR Date (dd/mm/yyyy)",
  hora_24: "Time (24h)",
  senha_forte: "Strong password",
  somente_numeros: "Numbers only",
  somente_letras: "Letters only",
  letras_espacos: "Letters and spaces",
  placa_mercosul: "Mercosur plate",
  hashtag: "Hashtag",
  usuario_social: "@username",
  html_tag: "HTML tag",
  moeda_br: "BR currency value",
  uuid: "UUID",
};

const FLAGS_HELP_TEXT_PT = `Flags são modificadores da regex (comportamento da busca).

As principais em JavaScript:
g (global): pega todas as ocorrências, não só a primeira.
i (ignore case): ignora maiúsculas/minúsculas.
m (multiline): ^ e $ passam a funcionar por linha.
s (dotAll): . também casa quebra de linha.
u (unicode): trata corretamente caracteres Unicode.
y (sticky): casa apenas na posição exata atual.

Exemplo:
regex: abc
texto: ABC abc Abc
sem flag: encontra abc (primeira exata)
com i: encontra ABC
com gi: encontra ABC, abc, Abc (todas)`;

const FLAGS_HELP_TEXT_EN = `Flags are regex modifiers (search behavior).

Main ones in JavaScript:
g (global): matches all occurrences, not only the first.
i (ignore case): ignores uppercase/lowercase.
m (multiline): ^ and $ work line by line.
s (dotAll): . also matches line breaks.
u (unicode): properly handles Unicode characters.
y (sticky): matches only at the exact current position.

Example:
regex: abc
text: ABC abc Abc
without flags: finds abc (first exact)
with i: finds ABC
with gi: finds ABC, abc, Abc (all)`;

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function TestadorRegex() {
  const { text: uiText } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn
    ? {
        back: "Back to utilities",
        title: "Regex Tester",
        byType: "Generator by type",
        pickType: "Choose one of the 20 common types",
        selectType: "Select a type...",
        describeNeed: "Describe what you need",
        describePlaceholder: "Ex: validate email, capture hashtag, URL",
        suggestions: "Automatic suggestions:",
        regexInput: "Regular expression (without / /)",
        flags: "Flags",
        flagsHelpLabel: "Flags explanation",
        flagsHelpTitle: "What are flags?",
        copyRegex: "Copy regex",
        testText: "Test text",
        testTextPlaceholder: "Text for testing",
        result: "Result",
        chooseToTest: "Choose a type or enter an expression to test.",
        invalidRegex: "Invalid regex",
        noMatch: "No matches found.",
        matchesFound: "Matches found",
        value: "Value",
        index: "Index",
        groups: "Groups",
        close: "Close",
        flagsModalTitle: "What are flags?",
      }
    : {
        back: "Voltar para utilidades",
        title: "Corretor de Regex",
        byType: "Gerador por tipo",
        pickType: "Escolha um dos 20 tipos comuns",
        selectType: "Selecione um tipo...",
        describeNeed: "Descreva o que você precisa",
        describePlaceholder: "Ex: validar email, capturar hashtag, URL",
        suggestions: "Sugestões automáticas:",
        regexInput: "Expressão regular (sem / /)",
        flags: "Flags",
        flagsHelpLabel: "Explicação das flags",
        flagsHelpTitle: "O que são flags?",
        copyRegex: "Copiar regex",
        testText: "Texto de teste",
        testTextPlaceholder: "Texto para teste",
        result: "Resultado",
        chooseToTest: "Escolha um tipo ou informe uma expressão para testar.",
        invalidRegex: "Regex inválida",
        noMatch: "Nenhum match encontrado.",
        matchesFound: "Matches encontrados",
        value: "Valor",
        index: "Índice",
        groups: "Grupos",
        close: "Fechar",
        flagsModalTitle: "O que são as flags?",
      };

  const flagsHelpText = isEn ? FLAGS_HELP_TEXT_EN : FLAGS_HELP_TEXT_PT;
  const getTemplateLabel = (template) => (isEn ? TEMPLATE_LABELS_EN[template.id] || template.label : template.label);

  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("");
  const [text, setText] = useState("");
  const [tipoDesejado, setTipoDesejado] = useState("");
  const [templateSelecionado, setTemplateSelecionado] = useState("");
  const [showFlagsModal, setShowFlagsModal] = useState(false);

  const resultado = useMemo(() => {
    if (!pattern.trim()) {
      return { valid: null, matches: [] };
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches = [];

      if (flags.includes("g")) {
        for (const match of text.matchAll(regex)) {
          matches.push({
            value: match[0],
            index: match.index ?? -1,
            groups: match.slice(1),
          });
        }
      } else {
        const single = text.match(regex);
        if (single) {
          matches.push({
            value: single[0],
            index: single.index ?? -1,
            groups: single.slice(1),
          });
        }
      }

      return { valid: true, matches };
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }, [pattern, flags, text]);

  const sugestoes = useMemo(() => {
    const query = normalizeText(tipoDesejado);
    if (!query) {
      return [];
    }

    return REGEX_TEMPLATES.map((template) => {
      const labels = [
        normalizeText(template.label),
        normalizeText(isEn ? TEMPLATE_LABELS_EN[template.id] || template.label : template.label),
      ];
      const keywords = template.keywords.map((k) => normalizeText(k));

      let score = 0;
      if (labels.some((label) => label.includes(query))) score += 4;

      for (const keyword of keywords) {
        if (keyword.includes(query) || query.includes(keyword)) {
          score += 3;
        }
      }

      for (const term of query.split(/\s+/)) {
        if (!term) continue;
        if (labels.some((label) => label.includes(term))) score += 1;
        if (keywords.some((k) => k.includes(term))) score += 1;
      }

      return { template, score };
    })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item) => item.template);
  }, [tipoDesejado, isEn]);

  function aplicarTemplate(template) {
    setPattern(template.pattern);
    setFlags(template.flags);
    setText(template.exemplo);
    setTemplateSelecionado(template.id);
  }

  async function copiarRegex() {
    if (!pattern) return;
    const literal = `/${pattern}/${flags}`;
    await navigator.clipboard.writeText(literal);
  }

  return (
    <PageTemplate>
      <BackButton fallbackTo="/utilidades" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">{uiText(txt.back)}
      </BackButton>

      <PageTitle className="mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 3h16a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2Zm-2 7h20v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9Zm4 2v2h3v-2H6Zm5 0v2h7v-2h-7Zm-5 4v2h5v-2H6Zm7 0v2h5v-2h-5Z"
          />
        </svg>
        <span>{uiText(txt.title)}</span>
      </PageTitle>

      <Panel as="div" layout="plain">
        <h2 className="text-xl font-bold mb-4">{uiText(txt.byType)}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.pickType)}</span>
            <Select
              value={templateSelecionado}
              onChange={(event) => {
                const template = REGEX_TEMPLATES.find((item) => item.id === event.target.value);
                setTemplateSelecionado(event.target.value);
                if (template) aplicarTemplate(template);
              }}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="">{uiText(txt.selectType)}</option>
              {REGEX_TEMPLATES.map((item) => (
                <option key={item.id} value={item.id}>
                  {uiText(getTemplateLabel(item))}
                </option>
              ))}
            </Select>
          </label>

          <label className="block">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.describeNeed)}</span>
            <Input
              type="text"
              value={tipoDesejado}
              onChange={(event) => setTipoDesejado(event.target.value)}
              placeholder={uiText(txt.describePlaceholder)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>
        </div>

        {sugestoes.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-slate-400 mb-2">{uiText(txt.suggestions)}</p>
            <div className="flex flex-wrap gap-2">
              {sugestoes.map((template) => (
                <Button variant="secondary"
                  key={template.id}
                  type="button"
                  onClick={() => aplicarTemplate(template)}
                  className="border border-slate-700 hover:border-cyan-400 transition"
                >
                  {uiText(getTemplateLabel(template))}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <label className="block md:col-span-2">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.regexInput)}</span>
            <Input
              type="text"
              value={pattern}
              onChange={(event) => setPattern(event.target.value)}
              placeholder={uiText("\\\\bpalavra\\\\b")}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between mb-2">
              <span className="block text-sm text-slate-300">{uiText(txt.flags)}</span>
              <Button variant="secondary"
                type="button"
                onClick={() => setShowFlagsModal(true)}
                className="shrink-0 border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition"
                aria-label={uiText(txt.flagsHelpLabel)}
                title={uiText(txt.flagsHelpTitle)}
              >
                ?
              </Button>
            </div>
            <Input
              type="text"
              value={flags}
              onChange={(event) => setFlags(event.target.value)}
              placeholder={uiText("gim")}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>

          <div className="flex items-end">
            <Button variant="secondary"
              type="button"
              onClick={copiarRegex}
              disabled={!pattern}
              className="w-full border border-slate-700 text-slate-200 hover:border-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uiText(txt.copyRegex)}
            </Button>
          </div>

          <label className="block md:col-span-2">
            <span className="block text-sm text-slate-300 mb-2">{uiText(txt.testText)}</span>
            <Textarea
              rows={8}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={uiText(txt.testTextPlaceholder)}
              className="w-full border text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </label>
        </div>
      </Panel>

      <Panel as="article" layout="plain" className="mt-8">
        <h2 className="text-xl font-bold mb-4">{uiText(txt.result)}</h2>

        {uiText(resultado.valid === null ? (
          <p className="text-slate-400">{uiText(txt.chooseToTest)}</p>
        ) : !resultado.valid ? (
          <p className="text-red-400">{uiText(txt.invalidRegex)}: {uiText(resultado.message)}</p>
        ) : resultado.matches.length === 0 ? (
          <p className="text-slate-400">{uiText(txt.noMatch)}</p>
        ) : (
          <div className="space-y-3">
            <p className="text-slate-300 text-sm">{uiText(txt.matchesFound)}: {uiText(resultado.matches.length)}</p>
            {resultado.matches.map((item, index) => (
              <Panel as="div" layout="plain" key={`${item.index}-${index}`} className="text-sm">
                <p>
                  <span className="text-slate-400">{uiText(txt.value)}:</span>{" "}
                  <span className="text-cyan-200">{uiText(item.value)}</span>
                </p>
                <p>
                  <span className="text-slate-400">{uiText(txt.index)}:</span> {uiText(item.index)}
                </p>
                <p>
                  <span className="text-slate-400">{uiText(txt.groups)}:</span>{" "}
                  {uiText(item.groups.length > 0 ? item.groups.join(" | ") : "-")}
                </p>
              </Panel>
            ))}
          </div>
        ))}
      </Panel>

      <Dialog open={showFlagsModal} onClose={() => setShowFlagsModal(false)} title={uiText(txt.flagsModalTitle)} closeLabel={uiText(txt.close)}>
        <pre className="ui-dialog-text whitespace-pre-wrap text-sm leading-relaxed font-sans">
          {flagsHelpText}
        </pre>
      </Dialog>
    </PageTemplate>
  );
}
