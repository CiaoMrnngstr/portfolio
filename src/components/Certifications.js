import { useState } from "react";
import { ArrowUpRight, Award, BadgeCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ImageLightbox from "./ImageLightbox";
import { certifications } from "../data/certifications";

const certificateImages = certifications.filter((certificate) => certificate.src).map((certificate) => ({
  ...certificate, alt: `${certificate.title} certificate awarded to Jebzter Catacutan`, label: certificate.title,
}));

export default function Certifications() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="certifications" className="section certifications-section" aria-label="Certifications">
      <div className="container">
        <SectionHeading number="04" eyebrow="Learning beyond the classroom" title={<>Building skills. <span className="text-muted">Earning credentials.</span></>}>
          Continued learning in cloud infrastructure, networking, Linux, and computer systems servicing.
        </SectionHeading>
        <div className="certification-grid">
          {certifications.map((certificate) => (
            <article className={`certificate-card${certificate.src ? "" : " certificate-text-only"}`} key={certificate.id} aria-labelledby={`cert-${certificate.id}`}>
              {certificate.src ? (
                <button className="certificate-preview" aria-label={`View certificate: ${certificate.title}`}
                  onClick={() => setSelected(certificateImages.findIndex((image) => image.id === certificate.id))}>
                  <img src={certificate.src} alt={`${certificate.title} certificate`} width={certificate.width} height={certificate.height} loading="lazy" decoding="async" />
                  <span>View certificate <ArrowUpRight size={16} aria-hidden="true" /></span>
                </button>
              ) : <div className="certificate-symbol" aria-hidden="true"><BadgeCheck size={48} strokeWidth={1.25} /><span>NC II</span></div>}
              <div className="certificate-content">
                <p className="credential-issuer"><Award size={15} aria-hidden="true" />{certificate.issuer} · {certificate.year}</p>
                <h3 id={`cert-${certificate.id}`}>{certificate.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selected !== null && <ImageLightbox images={certificateImages} index={selected} onChange={setSelected} onClose={() => setSelected(null)} title="Certifications" />}
    </section>
  );
}
