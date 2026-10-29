import { useState } from "react";
import { ArrowUpRight, Download, Expand, Music2, Guitar, Palette, Gamepad2, Clapperboard } from "lucide-react";
import { certifications } from "../data/certifications";
import { profile } from "../data/profile";
import { ImageViewer } from "./ScreenshotGallery";

const skillGroups = [
  { label: "The interface", note: "Web & mobile", skills: ["HTML", "CSS", "JavaScript", "React", "React Native"] },
  { label: "Under the hood", note: "Languages & services", skills: ["Java", "Python", "Node.js", "Firebase", "Cloud Functions"] },
  { label: "The data layer", note: "Storage & structure", skills: ["Firestore", "SQL", "MySQL", "MongoDB"] },
  { label: "On my desk", note: "Everyday tools", skills: ["GitHub", "VS Code", "Android Studio", "Git", "Expo", "Vite"] },
];

export function AboutAndSkills() {
  return <section id="about" className="section about-section" aria-labelledby="about-title">
    <div className="about-grid reveal">
      <div><p className="eyebrow">02 / The person behind the work</p><h2 id="about-title">Started on an iPad.<br /><em>Still exploring.</em></h2><p className="about-location mono">Cabanatuan City, Philippines ↗</p></div>
      <div className="about-story"><p className="lead">I'm Jebzter, a fourth-year BS Information Technology student building for the web, for mobile, and for the places they meet.</p>
        <p>My first project was a shoe storefront, written on an iPad. Today, I'm the solo full-stack developer of Bitulok Express: four applications, different users, and one connected delivery workflow.</p>
        <p>I'm looking for an IT internship where I can contribute to real software, learn from an experienced team, and get better at the details that make a system work.</p>
        <a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer">Explore my GitHub<ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </div>
    <div id="tech-stack" className="skills-area reveal" tabIndex={-1}>
      <div className="skills-heading"><h3>Tools I work with</h3><p className="mono">A toolkit, always evolving.</p></div>
      <div className="skills-grid">{skillGroups.map((group, index) => <div className="skill-column" key={group.label}>
        <span className="skill-index mono">0{index + 1}</span><h4>{group.label}</h4><p className="skill-note">{group.note}</p>
        <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      </div>)}</div>
    </div>
  </section>;
}

export function Journey() {
  const [certificate, setCertificate] = useState(null);
  return <section id="journey" className="section journey-section" aria-labelledby="journey-title">
    <div className="journey-intro reveal"><p className="eyebrow">03 / Learning, in progress</p><h2 id="journey-title">The path<br /><em>so far.</em></h2><p>Classrooms, projects, and the things I keep learning along the way.</p><span className="journey-mark" aria-hidden="true">↳</span></div>
    <div className="journey-timeline reveal">
      <div className="timeline-entry"><span className="timeline-year mono">2027</span><div><p className="eyebrow">Education · expected July 2027</p><h3>BS Information Technology</h3><p>PHINMA Araullo University</p><span className="timeline-status">Currently in my fourth year</span></div></div>
      <div id="certifications" className="timeline-entry" tabIndex={-1}><span className="timeline-year mono">2026</span><div>
        <p className="eyebrow">Certifications</p>
        {certifications.filter((item) => item.year === "2026").map((item) => <div key={item.id} className={`qualification ${item.id === "tesda" ? "tesda-qualification" : ""}`}>
          <h3>{item.title}</h3><p>{item.issuer}</p>
          {item.src && <button className="text-link" onClick={() => setCertificate(item)}>View certificate<ArrowUpRight size={16} aria-hidden="true" /></button>}
        </div>)}
      </div></div>
      <div className="timeline-entry"><span className="timeline-year mono">2025</span><div><p className="eyebrow">Cloud & data certifications</p>
        {certifications.filter((item) => item.year === "2025").map((item) => <div key={item.id} className="qualification">
          <h3>{item.title}</h3><p>{item.issuer}</p><button className="text-link" onClick={() => setCertificate(item)}>View certificate<ArrowUpRight size={16} aria-hidden="true" /></button>
        </div>)}
      </div></div>
      <div className="timeline-entry"><span className="timeline-year mono">2023</span><div><p className="eyebrow">Education · 2021–2023</p><h3>Bongabon Senior High School</h3><p>Humanities and Social Sciences (HUMSS)</p><span className="timeline-status">Graduated with honors</span></div></div>
    </div>
    {certificate && <ImageViewer title={certificate.title} images={[{ ...certificate, alt: `${certificate.title} certificate issued to Jebzter Catacutan`, label: certificate.issuer }]} onClose={() => setCertificate(null)} />}
  </section>;
}

export function BeyondCode() {
  const interests = [{ label: "Music", Icon: Music2 }, { label: "Guitar", Icon: Guitar }, { label: "Art & painting", Icon: Palette }, { label: "Gaming", Icon: Gamepad2 }, { label: "Movies", Icon: Clapperboard }];
  return <section id="beyond" className="beyond-section reveal" aria-labelledby="beyond-title">
    <div className="beyond-art" aria-hidden="true"><div className="vinyl"><span>JC<br /><small>SIDE B</small></span></div><span className="vinyl-note mono">Off the clock.</span></div>
    <div className="beyond-copy"><p className="eyebrow">The other side</p><h2 id="beyond-title">Beyond <em>code.</em></h2><p>Usually listening to music, picking up a guitar, or making something with a brush instead of a keyboard. There's room for a game, a film, or a little chess, too.</p>
      <ul className="interest-list">{interests.map(({ label, Icon }) => <li key={label}><Icon size={16} aria-hidden="true" />{label}</li>)}<li><span className="chess-icon" aria-hidden="true">♞</span>Chess</li></ul>
    </div>
  </section>;
}

export function Resume() {
  const [preview, setPreview] = useState(false);
  const image = { src: "/images/resume-preview.webp", alt: "Jebzter Catacutan CV with profile, projects, education, and certifications; phone number omitted", label: "Jebzter Catacutan · Curriculum vitae", width: 1224, height: 1584 };
  return <section id="resume" className="resume-section reveal" aria-labelledby="resume-title">
    <div className="resume-copy"><p className="eyebrow">04 / On one page</p><h2 id="resume-title">The story,<br /><em>to take with you.</em></h2><p>My experience, education, projects, and certifications in a single document.</p>
      <a className="button paper-button" href={profile.cv} download={profile.cvFilename}>Download CV<Download size={18} aria-hidden="true" /></a>
      <span className="resume-format mono">PDF · 1 page</span>
    </div>
    <button className="resume-preview" aria-label="Preview Jebzter Catacutan CV" onClick={() => setPreview(true)}>
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" /><span><Expand size={17} aria-hidden="true" />Take a closer look</span>
    </button>
    {preview && <ImageViewer title="CV preview" images={[image]} onClose={() => setPreview(false)} />}
  </section>;
}
