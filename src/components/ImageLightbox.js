import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

export default function ImageLightbox({ images, index, onChange, onClose, title }) {
  const dialog = useRef(null);
  const viewport = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const image = images[index];
  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    setZoomed(false);
    if (viewport.current) {
      viewport.current.scrollTop = 0;
      viewport.current.scrollLeft = 0;
    }
  }, [index]);
  function navigate(delta) {
    onChange((index + delta + images.length) % images.length);
  }
  function handleKey(event) {
    if (!zoomed && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
      event.preventDefault();
      navigate(event.key === "ArrowRight" ? 1 : -1);
    }
    if (event.key === "Tab") {
      const buttons = dialog.current.querySelectorAll("button");
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }
  return (
    <dialog ref={dialog} className="image-lightbox" aria-label={`${title} image viewer`}
      onClose={onClose} onKeyDown={handleKey}
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      <div className="lightbox-panel">
        <div className="lightbox-toolbar">
          <p>{title}<span>{index + 1} / {images.length}</span></p>
          <button className="icon-button" aria-label={zoomed ? "Fit image to screen" : "Zoom image"}
            aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>
            {zoomed ? <ZoomOut aria-hidden="true" /> : <ZoomIn aria-hidden="true" />}
          </button>
          <button className="icon-button" aria-label="Close image viewer" onClick={() => dialog.current.close()}>
            <X aria-hidden="true" />
          </button>
        </div>
        <div ref={viewport} className={`lightbox-image${zoomed ? " is-zoomed" : ""}`}>
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} decoding="async" />
        </div>
        <div className="lightbox-caption">
          {images.length > 1 && <button className="icon-button" aria-label="Previous image" onClick={() => navigate(-1)}><ChevronLeft aria-hidden="true" /></button>}
          <p>{image.label || image.alt}</p>
          {images.length > 1 && <button className="icon-button" aria-label="Next image" onClick={() => navigate(1)}><ChevronRight aria-hidden="true" /></button>}
        </div>
      </div>
    </dialog>
  );
}
