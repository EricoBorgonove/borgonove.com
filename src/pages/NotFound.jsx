import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";
import { translatePtToEnWithMap } from "../utils/ptEnTranslate";
import notFoundEnMap from "../data/notfound-en-map.json";

export default function NotFound() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const tx = (value) => (isEn ? translatePtToEnWithMap(value, notFoundEnMap) : value);

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-4xl mx-auto text-center">
      <p className="text-cyan-300 text-sm uppercase tracking-[0.25em] mb-4">{tx("Erro 404")}</p>
      <h1 className="text-4xl md:text-5xl font-black mb-4">{tx("Página não encontrada")}</h1>
      <p className="text-slate-400 mb-8">
        {tx("O endereço acessado não existe ou foi movido.")}
      </p>

      <BackButton
        fallbackTo="/"
        className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-3 rounded-xl font-semibold transition"
      >
        {tx("Voltar para página anterior")}
      </BackButton>
    </section>
  );
}
