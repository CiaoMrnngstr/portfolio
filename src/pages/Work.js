import { ArrowDown, ArrowUpRight, Download, Plus } from "lucide-react";
import { projects } from "../data/projects";
import ArchitectureMap from "../components/ArchitectureMap";
import ScreenshotGallery from "../components/ScreenshotGallery";

export function ProjectLinks({ project }) {
  return <div className="project-links">
    {project.links.map((link) => link.href ? (
      <a className="text-link" key={link.label} href={link.href} download={link.download || undefined}
        target={link.download ? undefined : "_blank"} rel={link.download ? undefined : "noopener noreferrer"}>
        {link.label}{link.download ? <Download size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
      </a>
    ) : (
      <span className="pending-link" key={link.label}><Download size={15} aria-hidden="true" />{link.label}<small>TODO · download</small></span>
    ))}
  </div>;
}

function CaseStudy({ project }) {
  return <details className="case-study" id={`case-${project.id}`}>
    <summary><span>Inside the project</span><span className="summary-hint mono">Case notes</span><Plus size={20} aria-hidden="true" /></summary>
    <div className="case-content">
      <div className="case-text-grid">
        <div><p className="eyebrow">01 / The problem</p><p>{project.problem}</p></div>
        <div><p className="eyebrow">02 / My role</p><h4>{project.role}</h4><p>{project.responsibility}</p></div>
        <div><p className="eyebrow">03 / Key features</p><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
        <div><p className="eyebrow">04 / The outcome</p><p>{project.outcome}</p><p className="case-stack"><strong>Built with</strong> {project.tech.join(" · ")}</p></div>
      </div>
      {project.images.length > 0 && project.id !== "fitness-tracker" && <ScreenshotGallery project={project} />}
      {project.screenshotTodo && <p className="todo-note">{project.screenshotTodo}</p>}
    </div>
  </details>;
}

export default function Work() {
  const [bitulok, fitness, ...archive] = projects;
  return <section id="projects" className="section work-section" aria-labelledby="work-title">
    <div className="section-heading reveal">
      <div><p className="eyebrow">01 / Selected work</p><h2 id="work-title">Ideas made <em>real.</em></h2></div>
      <p>From a first website to a connected delivery platform.<br />A few things I've built along the way.</p>
    </div>
    <article className="featured-work reveal" id="project-bitulok-express" aria-labelledby="title-bitulok">
      <div className="featured-topline mono"><span>01 / Featured capstone</span><span>Gabaldon, Nueva Ecija</span></div>
      <div className="featured-grid">
        <div className="project-intro">
          <p className="eyebrow">{bitulok.category}</p><h3 id="title-bitulok">{bitulok.title}</h3><p className="project-pitch">{bitulok.description}</p>
          <p className="project-role">{bitulok.role}<span>{bitulok.date}</span></p>
          <ul className="stack-tags" aria-label="Bitulok technology stack">{bitulok.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <ProjectLinks project={bitulok} />
        </div>
        <ArchitectureMap />
      </div>
      <CaseStudy project={bitulok} />
    </article>
    <article className="fitness-work reveal" id="project-fitness-tracker" aria-labelledby="title-fitness">
      <div className="fitness-grid">
        <ScreenshotGallery project={fitness} phones />
        <div className="project-intro">
          <p className="eyebrow">02 / {fitness.category}</p><h3 id="title-fitness">A little movement.<br /><em>A daily habit.</em></h3>
          <h4 className="project-name">{fitness.title}</h4><p className="project-pitch">{fitness.description}</p>
          <p className="project-role">{fitness.role}<span>{fitness.date}</span></p>
          <ul className="fitness-highlights"><li>Find your workout.</li><li>Build your challenge.</li><li>See your progress.</li></ul>
          <ul className="stack-tags" aria-label="Fitness technology stack">{fitness.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <a className="text-link" href="#case-fitness-tracker" onClick={() => { document.getElementById("case-fitness-tracker").open = true; }}>Read the case notes<ArrowDown size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <CaseStudy project={fitness} />
    </article>
    <div className="archive-heading"><p className="eyebrow">The earlier chapters</p><span className="mono">03 — 05</span></div>
    <div className="work-archive">
      {archive.map((project, index) => <article key={project.id} className="archive-project reveal" id={`project-${project.id}`} aria-labelledby={`title-${project.id}`}>
        <div className="archive-cover"><img src={project.images[0].src} alt={project.images[0].alt} width={project.images[0].width} height={project.images[0].height} loading="lazy" decoding="async" /><span className="mono">0{index + 3}</span></div>
        <div className="archive-copy"><p className="eyebrow">{project.category}</p><h3 id={`title-${project.id}`}>{project.title}</h3><p>{project.description}</p>
          <p className="project-role">{project.role}<span>{project.date}</span></p><ProjectLinks project={project} />
        </div>
        <CaseStudy project={project} />
      </article>)}
    </div>
  </section>;
}
