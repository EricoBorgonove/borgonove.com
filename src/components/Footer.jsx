import { useContentTranslation } from "../hooks/useContentTranslation";
import { Panel } from "./ui/Patterns";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/images/logo.png";
import logoB9 from "../assets/images/logob9.png";

function IconChevronRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-400">
      <path
        fill="currentColor"
        d="M9.3 5.3a1 1 0 0 0 0 1.4L14.6 12l-5.3 5.3a1 1 0 1 0 1.4 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.4 0Z"
      />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-400">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
      />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-400">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.3 11.3 0 0 0 3.54.56 1 1 0 0 1 1 1V21a1 1 0 0 1-1 1A19 19 0 0 1 2 4a1 1 0 0 1 1-1h3.9a1 1 0 0 1 1 1 11.3 11.3 0 0 0 .56 3.54 1 1 0 0 1-.24 1l-1.62 1.62Z"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-400">
      <path
        fill="currentColor"
        d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v.35l-9 5.4-9-5.4V6Zm0 2.68V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.68l-8.49 5.1a1 1 0 0 1-1.02 0L3 8.68Z"
      />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/erico.borgonove",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5zm5-3a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ericoborgonove/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5zM3 8.98h3.96V21H3zM9.5 8.98h3.8v1.64h.05a4.17 4.17 0 0 1 3.75-2.06c4.01 0 4.75 2.64 4.75 6.07V21h-3.96v-5.47c0-1.3-.02-2.98-1.81-2.98-1.82 0-2.1 1.42-2.1 2.89V21H9.5z"
        />
      </svg>
    ),
  },
  {
    label: "Lattes",
    href: "http://lattes.cnpq.br/5737380193383374",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M3 4a2 2 0 0 1 2-2h10l6 6v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4Zm12 0v4h4l-4-4Zm-8 9a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H7Zm0 4a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2H7Zm0-8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H7Z"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@erico.borgonove",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M23 12.02s0-3.1-.4-4.47a3.22 3.22 0 0 0-2.25-2.28C18.8 4.86 12 4.86 12 4.86s-6.8 0-8.35.41A3.22 3.22 0 0 0 1.4 7.55C1 8.92 1 12.02 1 12.02s0 3.1.4 4.47a3.22 3.22 0 0 0 2.25 2.28c1.55.41 8.35.41 8.35.41s6.8 0 8.35-.41a3.22 3.22 0 0 0 2.25-2.28c.4-1.37.4-4.47.4-4.47zM9.75 15.02V9.02l5.5 3z"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/EricoBorgonove",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.8-.25.8-.56v-2.18c-3.26.72-3.95-1.4-3.95-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.1-.75.4-1.26.73-1.55-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.2a11.08 11.08 0 0 1 5.83 0c2.22-1.51 3.2-1.2 3.2-1.2.64 1.65.24 2.87.12 3.17.75.82 1.2 1.87 1.2 3.15 0 4.5-2.75 5.5-5.36 5.79.41.36.78 1.08.78 2.18v3.23c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5z"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  const { text: uiText } = useContentTranslation();

  const { t } = useTranslation();
  const location = useLocation();
  const showContactBanner = location.pathname !== "/contato";
  const educationItems = t("footer.educationItems", { returnObjects: true });
  const serviceItems = t("footer.serviceItems", { returnObjects: true });

  return (
    <footer className="site-footer border-t border-slate-800 bg-slate-950/70">
      {showContactBanner && (
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <Panel as="div" layout="plain" className="rounded-2xl p-6 md:p-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">{uiText(t("footer.ctaTitle"))}</h3>
              <p className="text-slate-400 text-sm mt-1">
                {uiText(t("footer.ctaText"))}
              </p>
            </div>
            <Link
              to="/contato"
              className="footer-cta-link bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-5 py-2.5 rounded-xl font-semibold transition text-center"
            >
              {uiText(t("footer.ctaButton"))}
            </Link>
          </Panel>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4 justify-items-center md:justify-items-stretch text-center md:text-left">
        <div className="max-w-[220px] mx-auto md:mx-0">
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt={uiText("Borgonove Tech")} className="h-8 w-auto footer-logo-dark" />
            <img src={logoB9} alt={uiText("Borgonove Tech")} className="h-8 w-auto footer-logo-light" />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed text-justify">
            {uiText(t("footer.description"))}
          </p>
          <div className="flex items-center justify-center gap-4 mt-5">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-cyan-400 transition"
                aria-label={uiText(item.label)}
                title={uiText(item.label)}
              >
                {uiText(item.icon)}
              </a>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/aviso-de-privacidade" className="text-xs text-slate-500 hover:text-cyan-300 transition">
              {uiText(t("footer.privacyNotice"))}
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider text-slate-400 mb-4">{uiText(t("footer.contact"))}</h4>
          <div className="space-y-3 text-sm">
            <a
              className="flex items-center justify-center md:justify-start gap-2 text-slate-200 hover:text-cyan-400"
              href="mailto:contato@borgonove.com"
            >
              <IconMail />{uiText("contato@borgonove.com")}</a>
            <a
              className="flex items-center justify-center md:justify-start gap-2 text-slate-200 hover:text-cyan-400"
              href="tel:+5592982553114"
            >
              <IconPhone />
              +55 (92) 98255-3114
            </a>
            <p className="flex items-center justify-center md:justify-start gap-2 text-slate-400">
              <IconMapPin />{uiText("Manaus - AM")}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider text-slate-400 mb-4">{uiText(t("footer.education"))}</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {educationItems.map((item) => (
              <li key={item} className="flex items-center justify-center md:justify-start gap-2">
                <IconChevronRight />
                <span>{uiText(item)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider text-slate-400 mb-4">{uiText(t("footer.services"))}</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {serviceItems.map((item) => (
              <li key={item} className="flex items-center justify-center md:justify-start gap-2">
                <IconChevronRight />
                <span>{uiText(item)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xs text-slate-500">
            <p>{uiText(t("footer.support"))}</p>
            <p>{uiText(t("footer.supportHours"))}</p>
          </div>
        </div>
      </div>

      <div className="py-3 text-center text-xs text-slate-600 flex flex-col items-center gap-1">
        <p>{uiText("© 2026 Borgonove.tech")}</p>
      </div>
    </footer>
  );
}
