import { useContentTranslation } from "../hooks/useContentTranslation";
import { PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";
import { translatePtToEnWithMap } from "../utils/ptEnTranslate";
import privacyEnMap from "../data/privacy-en-map.json";

const secoes = [
  {
    titulo: "1. Dados Que Podemos Coletar",
    itens: [
      "Dados informados por você em formulários, como nome, e-mail e mensagem.",
      "Dados técnicos de navegação, como endereço IP, navegador, dispositivo e páginas acessadas.",
      "Dados de uso gerados por cookies e tecnologias semelhantes.",
    ],
  },
  {
    titulo: "2. Finalidades Do Tratamento",
    itens: [
      "Responder solicitações de contato e prestar suporte.",
      "Melhorar a experiência de navegação, desempenho e segurança do site.",
      "Realizar análises estatísticas de acesso e uso de funcionalidades.",
      "Personalizar conteúdo e comunicações, quando aplicável.",
    ],
  },
  {
    titulo: "3. Base Legal (LGPD)",
    itens: [
      "Execução de procedimentos preliminares e atendimento de solicitações.",
      "Legítimo interesse para melhoria contínua e segurança do serviço.",
      "Consentimento, quando necessário para determinadas tecnologias de rastreio.",
    ],
  },
  {
    titulo: "4. Compartilhamento De Dados",
    itens: [
      "Seus dados podem ser tratados por provedores de hospedagem, e-mail e ferramentas técnicas.",
      "Não comercializamos dados pessoais.",
      "Compartilhamentos ocorrem apenas quando necessários, com controles de segurança.",
    ],
  },
  {
    titulo: "5. Cookies E Tecnologias Semelhantes",
    itens: [
      "Utilizamos cookies para lembrar preferências, medir desempenho e otimizar serviços.",
      "Você pode gerenciar cookies no navegador, ciente de que isso pode afetar funcionalidades.",
      "Ao continuar navegando e aceitar o aviso, você concorda com esse uso nos termos deste aviso.",
    ],
  },
  {
    titulo: "6. Armazenamento E Segurança",
    itens: [
      "Adotamos medidas técnicas e administrativas para proteger dados pessoais.",
      "Os dados são mantidos pelo período necessário ao cumprimento das finalidades descritas.",
      "Quando aplicável, dados podem ser eliminados ou anonimizados ao fim do ciclo de uso.",
    ],
  },
  {
    titulo: "7. Direitos Do Titular",
    itens: [
      "Confirmação e acesso aos dados tratados.",
      "Correção de dados incompletos, inexatos ou desatualizados.",
      "Anonimização, bloqueio ou eliminação quando cabível.",
      "Portabilidade, informação sobre compartilhamento e revogação de consentimento.",
    ],
  },
  {
    titulo: "8. Contato Para Privacidade",
    itens: ["Para solicitações relacionadas à privacidade e LGPD, entre em contato pelo e-mail contato@borgonove.com."],
  },
  {
    titulo: "9. Atualizações Deste Aviso",
    itens: ["Este aviso pode ser atualizado periodicamente para refletir melhorias técnicas, legais ou operacionais."],
  },
];

export default function AvisoPrivacidade() {
  const { text: uiText } = useContentTranslation();

  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const tx = (value) => (isEn ? translatePtToEnWithMap(value, privacyEnMap) : value);

  return (
    <PageTemplate>
      <BackButton fallbackTo="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">
        {uiText(tx("Voltar para início"))}
      </BackButton>

      <PageHeader><PageTitle className="mb-4">{uiText(tx("Aviso de Privacidade"))}</PageTitle>
      <PageDescription className="text-sm">
        {uiText(isEn ? "Last updated: February 16, 2026." : "Última atualização: 16 de fevereiro de 2026.")}
      </PageDescription></PageHeader>

      <Panel as="div" layout="plain" className="space-y-6">
        <p className="text-slate-300 leading-relaxed text-justify">
          {uiText(tx(
            "A Borgonove.Tech respeita sua privacidade e trata dados pessoais com responsabilidade, transparência e segurança, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)."
          ))}
        </p>

        {secoes.map((secao) => (
          <article key={secao.titulo}>
            <h2 className="text-lg font-semibold text-cyan-300 mb-2">{uiText(tx(secao.titulo))}</h2>
            <ul className="space-y-1 text-sm text-slate-300 list-disc list-inside">
              {secao.itens.map((item) => (
                <li key={item} className="text-justify">
                  {uiText(tx(item))}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Panel>
    </PageTemplate>
  );
}
