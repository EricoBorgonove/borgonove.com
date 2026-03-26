import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const categorias = [
  {
    id: "sorteios",
    items: [
      {
        id: "sorteio-numeros",
        to: "/utilidades/sorteio-numeros",
      },
      {
        id: "sorteio-instagram",
        to: "/utilidades/sorteio-instagram",
      },
      {
        id: "sorteio-times",
        to: "/utilidades/sorteio-times",
      },
    ],
  },
  {
    id: "tempo-produtividade",
    items: [
      {
        id: "timer-prova",
        to: "/utilidades/timer-prova",
      },
      {
        id: "pomodoro",
        to: "/utilidades/pomodoro",
      },
    ],
  },
  {
    id: "documentos-financas",
    items: [
      {
        id: "validador-cpf-cnpj",
        to: "/utilidades/validador-cpf-cnpj",
      },
      {
        id: "busca-cep",
        to: "/utilidades/busca-cep",
      },
      {
        id: "calculadora-juros",
        to: "/utilidades/calculadora-juros",
      },
      {
        id: "imc",
        to: "/utilidades/imc",
      },
    ],
  },
  {
    id: "dev-tools",
    items: [
      {
        id: "gerador-senhas",
        to: "/utilidades/gerador-senhas",
      },
      {
        id: "conversor-data-hora",
        to: "/utilidades/conversor-data-hora",
      },
      {
        id: "gerador-qrcode",
        to: "/utilidades/gerador-qrcode",
      },
      {
        id: "mock-sql-json",
        to: "/utilidades/mock-sql-json",
      },
      {
        id: "testador-regex",
        to: "/utilidades/testador-regex",
      },
      {
        id: "comparador-textos",
        to: "/utilidades/comparador-textos",
      },
    ],
  },
];

export default function Utilidades() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage?.startsWith("en") ? "en-US" : "pt-BR";

  const categoriasOrdenadas = [...categorias]
    .map((categoria) => ({
      ...categoria,
      items: [...categoria.items].sort((a, b) =>
        t(`utilities.categories.${categoria.id}.items.${a.id}.title`).localeCompare(
          t(`utilities.categories.${categoria.id}.items.${b.id}.title`),
          locale
        )
      ),
    }))
    .sort((a, b) =>
      t(`utilities.categories.${a.id}.title`).localeCompare(
        t(`utilities.categories.${b.id}.title`),
        locale
      )
    );

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M10.59 3.41a2 2 0 0 1 2.82 0l7.18 7.18a2 2 0 0 1 0 2.82l-7.18 7.18a2 2 0 0 1-2.82 0L3.4 13.41a2 2 0 0 1 0-2.82l7.18-7.18Zm1.41 2L5.23 12 12 18.77 18.77 12 12 5.23ZM11 8h2v5h-2V8Zm0 6h2v2h-2v-2Z"
          />
        </svg>
        <span>{t("utilities.title")}</span>
      </h1>

      <div className="space-y-10">
        {categoriasOrdenadas.map((categoria) => (
          <section key={categoria.id}>
            <header className="mb-5">
              <h2 className="text-2xl font-bold text-cyan-300">
                {t(`utilities.categories.${categoria.id}.title`)}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {t(`utilities.categories.${categoria.id}.description`)}
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              {categoria.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="glass theme-hover-border rounded-2xl p-8 transition duration-300 hover:-translate-y-2 block"
                >
                  <article>
                    <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                      {t(`utilities.categories.${categoria.id}.items.${item.id}.title`)}
                    </h3>
                    <p className="text-slate-400">
                      {t(`utilities.categories.${categoria.id}.items.${item.id}.description`)}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
