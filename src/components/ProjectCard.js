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

function ProjectLink({ href, label, Icon, title, projectTitle }) {
  if (!href) return null;
  return (
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
        <div className="project-title-row">
          <h3 id={`project-${project.id}`}>{project.title}</h3>
          {project.badge && (
            <span className="project-badge">{project.badge}</span>
          )}
        </div>
        {project.subtitle && (
          <p className="project-subtitle">{project.subtitle}</p>
        )}
        <p className="project-description">{project.description}</p>
        <ul className="tech-badges" aria-label="Built with">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {(project.liveUrl || project.githubUrl) && (
          <div className="project-actions">
            <ProjectLink
              href={project.liveUrl}
              label="Live Demo"
              Icon={ExternalLink}
              title={project.liveLabel}
              projectTitle={project.title}
            />
            <ProjectLink
              href={project.githubUrl}
              label="GitHub"
              Icon={Github}
              projectTitle={project.title}
            />
          </div>
        )}
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
              ? "Explore the architecture"
              : "Project story & screenshots"}
            <ChevronDown size={15} aria-hidden="true" />
          </summary>
          <p>{project.story}</p>
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
    </article>
  );
}
