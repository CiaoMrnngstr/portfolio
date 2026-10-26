import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  Github,
  Sparkles,
} from "lucide-react";
import DeliveryPreview from "./DeliveryPreview";
import ProjectAccess from "./ProjectAccess";
import ProjectCaseStudy from "./ProjectCaseStudy";

function ProjectLink({ href, label, Icon, title, projectTitle }) {
  return href ? (
    <a
      className="project-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      aria-label={`${label}: ${projectTitle} (opens in a new tab)`}
    >
      <Icon size={15} aria-hidden="true" />
      {label}
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  ) : (
    <span
      className="unavailable-link"
      tabIndex={0}
      title={`${label} is not published yet`}
    >
      <button className="project-link" disabled>
        <Icon size={15} aria-hidden="true" />
        {label}
      </button>
      <span className="link-tooltip">Not published yet</span>
    </span>
  );
}

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article
      className={`project-card${project.featured ? " featured-project" : ""}`}
      style={{ "--card-delay": `${index * 55}ms` }}
      aria-labelledby={`project-${project.id}`}
    >
      <div className={`project-thumbnail thumbnail-${project.id}`}>
        {project.images.length ? (
          <img
            src={project.images[0].src}
            alt={project.images[0].alt}
            width="960"
            height="600"
            loading="lazy"
            decoding="async"
          />
        ) : project.id === "bitulok-express" ? (
          <DeliveryPreview />
        ) : (
          <div className="generic-preview">
            <Code2 size={40} aria-hidden="true" />
            <span>{project.title}</span>
          </div>
        )}
        {!project.featured && (
          <span className="thumbnail-category">{project.categories[0]}</span>
        )}
      </div>
      <div className="project-content">
        {project.featured && (
          <div className="featured-label">
            <Sparkles size={14} aria-hidden="true" />
            FEATURED PROJECT<span>CAPSTONE</span>
          </div>
        )}
        <h3 id={`project-${project.id}`}>{project.title}</h3>
        {project.subtitle && (
          <p className="project-subtitle">{project.subtitle}</p>
        )}
        <p className="project-description">{project.description}</p>
        <ul className="tech-badges" aria-label="Built with">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-actions">
          {project.links?.length ? (
            <a
              className="project-link"
              href={`#try-${project.id}`}
              aria-label={`Live Demo: choose a ${project.title} app`}
            >
              <ExternalLink size={15} aria-hidden="true" />
              Live Demo
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ) : (
            <ProjectLink
              href={project.liveUrl}
              label="Live Demo"
              Icon={ExternalLink}
              title={project.liveLabel}
              projectTitle={project.title}
            />
          )}
          <ProjectLink
            href={project.githubUrl}
            label="GitHub"
            Icon={Github}
            projectTitle={project.title}
          />
        </div>
        {project.downloadUrl && (
          <a className="app-download" href={project.downloadUrl} download>
            <Download size={15} aria-hidden="true" />
            {project.downloadLabel}
          </a>
        )}
        <details
          className="project-details"
          onToggle={(event) => setExpanded(event.currentTarget.open)}
        >
          <summary>
            {project.featured
              ? "Case study & architecture"
              : "Project story & screenshots"}
            <ChevronDown size={15} aria-hidden="true" />
          </summary>
          <p>{project.story}</p>
          {expanded && <ProjectCaseStudy study={project.caseStudy} />}
          {expanded && project.links?.length > 0 && (
            <ProjectAccess project={project} detail />
          )}
          {expanded && project.images.length > 0 && (
            <div className="project-gallery">
              {project.images.map((image) => (
                <a
                  key={image.src}
                  href={image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enlarge ${image.alt} (opens in a new tab)`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width="480"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          )}
        </details>
      </div>
      {project.links?.length > 0 && <ProjectAccess project={project} />}
    </article>
  );
}
