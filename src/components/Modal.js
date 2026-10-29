import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children, className = "", onKeyDown }) {
  const dialog = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    const initial = element.querySelector("[data-initial-focus]") || element.querySelector("button");
    initial?.focus();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  function handleKey(event) {
    onKeyDown?.(event);
    if (event.key !== "Tab") return;
    const controls = [...dialog.current.querySelectorAll('a[href], button:not([disabled]), input, [tabindex="0"]')]
      .filter((element) => element.tabIndex >= 0 && !element.hidden && element.getAttribute("aria-hidden") !== "true");
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  }
  return (
    <dialog ref={dialog} className={`modal ${className}`} aria-label={title}
      onCancel={(event) => { event.preventDefault(); closeRef.current(); }}
      onKeyDown={handleKey}
      onClick={(event) => { if (event.target === event.currentTarget) closeRef.current(); }}>
      <div className="modal-shell">
        <header className="modal-heading">
          <p>{title}</p>
          <button className="icon-button" aria-label={`Close ${title}`} onClick={onClose}><X size={20} aria-hidden="true" /></button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
