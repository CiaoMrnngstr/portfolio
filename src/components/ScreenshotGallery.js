import { useState } from "react";
import { ArrowLeft, ArrowRight, Expand, ZoomIn, ZoomOut } from "lucide-react";
import Modal from "./Modal";

export function ImageViewer({ images, initialIndex = 0, title, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(false);
  const image = images[index];
  function change(delta) {
    setIndex((index + delta + images.length) % images.length);
    setZoom(false);
  }
  return <Modal title={title} onClose={onClose} className="image-modal" onKeyDown={(event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault(); change(event.key === "ArrowLeft" ? -1 : 1);
    }
  }}>
    <div className={`image-viewport${zoom ? " zoomed" : ""}`}>
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
    </div>
    <div className="viewer-controls">
      <button className="icon-button" aria-label="Previous image" disabled={images.length === 1} onClick={() => change(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
      <p aria-live="polite">{image.label || image.alt}<span className="mono">{index + 1} / {images.length}</span></p>
      <button className="icon-button" aria-label={zoom ? "Fit image" : "Zoom image"} aria-pressed={zoom} onClick={() => setZoom(!zoom)}>{zoom ? <ZoomOut size={20} aria-hidden="true" /> : <ZoomIn size={20} aria-hidden="true" />}</button>
      <button className="icon-button" aria-label="Next image" disabled={images.length === 1} onClick={() => change(1)}><ArrowRight size={20} aria-hidden="true" /></button>
    </div>
  </Modal>;
}

export default function ScreenshotGallery({ project, phones = false }) {
  const [selected, setSelected] = useState(0);
  const [viewer, setViewer] = useState(null);
  const image = project.images[selected];
  return (
    <div className={phones ? "phone-gallery" : "screen-gallery"} role="group" aria-label={`${project.title} screenshot gallery`}>
      {phones ? (
        <>
          <div className="phone-stage">
            <span className="phone-stage-word" aria-hidden="true">move.</span>
            <button className="phone-frame" aria-label={`Enlarge ${image.label}`} onClick={() => setViewer(selected)}>
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
              <span className="image-expand"><Expand size={18} aria-hidden="true" /></span>
            </button>
            <div className="phone-note mono"><span>Designed for<br />the everyday.</span><span>↖ Tap to explore</span></div>
          </div>
          <div className="gallery-tabs" aria-label="Fitness screenshots">
            {project.images.map((item, index) => <button key={item.src} aria-pressed={selected === index} onClick={() => setSelected(index)}>
              <span className="mono">0{index + 1}</span>{item.label}
            </button>)}
          </div>
        </>
      ) : (
        <div className="screenshot-grid">
          {project.images.map((item, index) => <button key={item.src} className="screen-shot" aria-label={`Enlarge ${project.title}: ${item.label}`} onClick={() => setViewer(index)}>
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
            <span>{item.label}<Expand size={16} aria-hidden="true" /></span>
          </button>)}
        </div>
      )}
      {viewer !== null && <ImageViewer images={project.images} initialIndex={viewer} title={`${project.title} screenshots`} onClose={() => setViewer(null)} />}
    </div>
  );
}
