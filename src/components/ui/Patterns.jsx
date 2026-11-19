import { useContentTranslation } from "../../hooks/useContentTranslation";
import { Link } from "react-router-dom";
import { useId } from "react";
import "./patterns.css";
import ScrollRegion from "./ScrollRegion";
import { useTranslation } from "react-i18next";

export function PageTemplate({ eyebrow, title, description, breadcrumbs = [], actions, children, className = "", width = "default", as: container = "section", ...props }) {
  const { text: uiText } = useContentTranslation();

  const Container = container;
  return (
    <Container className={`ui-page ui-page--${width} ${className}`} {...props}>
      {breadcrumbs.length > 0 && <nav aria-label={uiText("Navegação estrutural")} className="ui-breadcrumbs">
        <ol>{breadcrumbs.map(({ label, to }) => <li key={label}>{to ? <Link to={to}>{uiText(label)}</Link> : <span aria-current="page">{uiText(label)}</span>}</li>)}</ol>
      </nav>}
      {title && <header className="ui-page-header">
        <div>{eyebrow && <p className="ui-eyebrow">{uiText(eyebrow)}</p>}<h1>{uiText(title)}</h1>{description && <p className="ui-description">{uiText(description)}</p>}</div>
        {actions && <div className="ui-actions">{uiText(actions)}</div>}
      </header>}
      {title ? <div className="ui-stack">{children}</div> : children}
    </Container>
  );
}

export function Section({ title, description, children, className = "", ...props }) {
  const { text: uiText } = useContentTranslation();

  return <section className={`ui-section ${className}`} {...props}>{title && <header><h2>{uiText(title)}</h2>{description && <p className="ui-muted">{uiText(description)}</p>}</header>}{children}</section>;
}

export function Panel({ title, children, as: container = "section", layout = "stack", className = "", ...props }) {
  const { text: uiText } = useContentTranslation();

  const Container = container;
  return <Container className={`ui-panel ${layout === "stack" ? "ui-panel--stack" : ""} ${className}`} {...props}>{title && <h2>{uiText(title)}</h2>}{children}</Container>;
}

export function Badge({ children, tone = "neutral" }) {


  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>;
}

export function Button({ children, to, variant = "primary", type = "button", className: customClass = "", ...props }) {


  const className = `${variant === "custom" ? "ui-action" : `ui-button ui-button--${variant}`} ${customClass}`;
  return to ? <Link className={className} to={to} {...props}>{children}</Link> : <button type={type} className={className} {...props}>{children}</button>;
}

export function CardGrid({ children, className = "", ...props }) {


  return <div className={`ui-card-grid ${className}`} {...props}>{children}</div>;
}

export function ContentCard({ title, description, badge, to, action = "Explorar", unavailable = false, unavailableLabel = "Em breve", headingAs = "h3" }) {
  const { text: uiText } = useContentTranslation();

  const Heading = headingAs;
  const content = <>{badge && <Badge>{uiText(badge)}</Badge>}<Heading>{uiText(title)}</Heading><p className="ui-muted">{uiText(description)}</p><span className="ui-card-action">{uiText(unavailable ? unavailableLabel : <>{uiText(action)} <span aria-hidden="true">→</span></>)}</span></>;
  return unavailable ? <article className="ui-card ui-card--unavailable">{uiText(content)}</article> : <Link className="ui-card" to={to}>{uiText(content)}</Link>;
}

export function Field({ label, hint, error, ...props }) {
  const { text: uiText } = useContentTranslation();

  const generatedId = useId();
  const id = props.id || generatedId;
  return <div className="ui-field"><label htmlFor={id}>{uiText(label)}</label><Input {...props} id={id} aria-invalid={error ? true : undefined} aria-describedby={error || hint ? `${id}-help` : undefined} />{(error || hint) && <p id={`${id}-help`} className={error ? "ui-field-error" : "ui-muted"}>{uiText(error || hint)}</p>}</div>;
}

export function PageTitle({ children, className = "", ...props }) {


  return <h1 className={`ui-page-title ${className}`} {...props}>{children}</h1>;
}

export function PageHeader({ children, className = "", ...props }) {


  return <header className={`ui-content-header ${className}`} {...props}>{children}</header>;
}

export function PageDescription({ children, className = "", ...props }) {


  return <p className={`ui-description ${className}`} {...props}>{children}</p>;
}

export function Input({ className = "", ...props }) {
  return <input className={`ui-input ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }) {
  return <textarea className={`ui-input ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }) {


  return <select className={`ui-input ${className}`} {...props}>{children}</select>;
}

export function Table({ className = "", children, ...props }) {


  return <table className={`ui-table ${className}`} {...props}>{children}</table>;
}

export function TableContainer({ className = "", children, ...props }) {
  const { text: uiText } = useContentTranslation();

  const { t } = useTranslation();
  return <ScrollRegion aria-label={uiText(t("common.ui.scrollTable"))} className={`ui-table-container ${className}`} {...props}>{children}</ScrollRegion>;
}

export function Notice({ children, tone = "info" }) {


  return <div className={`ui-notice ui-notice--${tone}`} role={tone === "error" ? "alert" : "status"}>{children}</div>;
}

export function EmptyState({ title, description, action }) {
  const { text: uiText } = useContentTranslation();

  return <div className="ui-empty"><h3>{uiText(title)}</h3><p className="ui-muted">{uiText(description)}</p>{uiText(action)}</div>;
}
