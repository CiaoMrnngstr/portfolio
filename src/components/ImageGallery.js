import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

export default function ImageGallery({ images, title, phones = false }) {
  const [selected, setSelected] = useState(null);
  const track = useRef(null);
  function scrollGallery(direction) {
    const item = track.current.querySelector("button");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.current.scrollBy({ left: direction * (item.offsetWidth + 20), behavior: reduceMotion ? "instant" : "smooth" });
  }
  return (
    <div className={phones ? "phone-gallery" : "screenshot-gallery"}>
      {phones && <div className="gallery-heading">
        <div><h4>A closer look</h4><p>Swipe to explore. Select a screen to enlarge.</p></div>
        <div className="gallery-controls">
          <button className="icon-button" aria-label="Scroll screenshots left" onClick={() => scrollGallery(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button className="icon-button" aria-label="Scroll screenshots right" onClick={() => scrollGallery(1)}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>}
      <div ref={track} className={phones ? "phone-track" : "project-gallery"} aria-label={`${title} screenshots`}>
        {images.map((image, index) => (
          <button key={image.src} className={phones ? "phone-shot" : "gallery-shot"} onClick={() => setSelected(index)}
            aria-label={`Enlarge ${image.label || image.alt}`}>
            <span className="shot-image"><img src={image.src} alt={image.alt} width={image.width || 960} height={image.height || 600} loading="lazy" decoding="async" /></span>
            {phones && <span className="shot-caption"><span><small>0{index + 1}</small>{image.label}</span><Maximize2 size={15} aria-hidden="true" /></span>}
          </button>
        ))}
      </div>
      {selected !== null && <ImageLightbox images={images} index={selected} onChange={setSelected} onClose={() => setSelected(null)} title={title} />}
    </div>
  );
}
