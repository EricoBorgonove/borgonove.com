import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Patterns";

export default function Dialog({ open, onClose, title, closeLabel = "Fechar", children }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!open) return;
    const previousFocus = document.activeElement;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open]);

  const content = <dialog ref={ref} className="ui-dialog" aria-labelledby={titleId}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }}>
    <div className="ui-dialog-content">
      <header className="ui-dialog-header">
        <h2 id={titleId}>{title}</h2>
        <Button variant="secondary" onClick={onClose} aria-label={closeLabel}>{closeLabel}</Button>
      </header>
      {children}
    </div>
  </dialog>;
  return typeof document === "undefined" ? content : createPortal(content, document.body);
}
