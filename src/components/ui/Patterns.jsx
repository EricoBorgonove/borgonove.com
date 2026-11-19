import { Link } from "react-router-dom";
import { useId } from "react";
import "./patterns.css";

export function PageTemplate({ eyebrow, title, description, breadcrumbs = [], actions, children, className = "", width = "default", as: container = "section", ...props }) {
  const Container = container;
  return (
    <Container className={`ui-page ui-page--${width} ${className}`} {...props}>
      {breadcrumbs.length > 0 && <nav aria-label="Navegação estrutural" className="ui-breadcrumbs">
        <ol>{breadcrumbs.map(({ label, to }) => <li key={label}>{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</li>)}</ol>
      </nav>}
      {title && <header className="ui-page-header">
        <div>{eyebrow && <p className="ui-eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description && <p className="ui-description">{description}</p>}</div>
        {actions && <div className="ui-actions">{actions}</div>}
      </header>}
      {title ? <div className="ui-stack">{children}</div> : children}
    </Container>
  );
}

export function Section({ title, description, children, className = "", ...props }) {
  return <section className={`ui-section ${className}`} {...props}>{title && <header><h2>{title}</h2>{description && <p className="ui-muted">{description}</p>}</header>}{children}</section>;
}

export function Panel({ title, children, as: container = "section", layout = "stack", className = "", ...props }) {
  const Container = container;
  return <Container className={`ui-panel ${layout === "stack" ? "ui-panel--stack" : ""} ${className}`} {...props}>{title && <h2>{title}</h2>}{children}</Container>;
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
  const Heading = headingAs;
  const content = <>{badge && <Badge>{badge}</Badge>}<Heading>{title}</Heading><p className="ui-muted">{description}</p><span className="ui-card-action">{unavailable ? unavailableLabel : <>{action} <span aria-hidden="true">→</span></>}</span></>;
  return unavailable ? <article className="ui-card ui-card--unavailable">{content}</article> : <Link className="ui-card" to={to}>{content}</Link>;
}

export function Field({ label, hint, error, ...props }) {
  const generatedId = useId();
  const id = props.id || generatedId;
  return <div className="ui-field"><label htmlFor={id}>{label}</label><Input {...props} id={id} aria-invalid={error ? true : undefined} aria-describedby={error || hint ? `${id}-help` : undefined} />{(error || hint) && <p id={`${id}-help`} className={error ? "ui-field-error" : "ui-muted"}>{error || hint}</p>}</div>;
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
  return <div className={`ui-table-container ${className}`} {...props}>{children}</div>;
}

export function Notice({ children, tone = "info" }) {
  return <div className={`ui-notice ui-notice--${tone}`} role={tone === "error" ? "alert" : "status"}>{children}</div>;
}

export function EmptyState({ title, description, action }) {
  return <div className="ui-empty"><h3>{title}</h3><p className="ui-muted">{description}</p>{action}</div>;
}
