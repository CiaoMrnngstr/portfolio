import { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import "./Project.css";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = projects.filter(
    (project) => filter === "All" || project.categories.includes(filter),
  );
  return (
    <section
      id="projects"
      className="section projects-section"
      aria-label="My Projects"
    >
      <div className="container">
        <div className="section-top">
          <SectionHeading
            number="03"
            eyebrow="Recent projects"
            title={
              <>
                A few things I've <span className="text-muted">built.</span>
              </>
            }
          >
            From my first website to a connected delivery platform. Each
            project, a step forward.
          </SectionHeading>
          <span className="project-count mono">
            {String(projects.length).padStart(2, "0")} SELECTED WORKS
          </span>
        </div>
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {["All", "Web", "Mobile", "Full-Stack"].map((category) => (
            <button
              key={category}
              aria-pressed={filter === category}
              className={
                filter === category ? "filter-button selected" : "filter-button"
              }
              onClick={() => setFilter(category)}
            >
              {category}
              {category === "All" && <span>{projects.length}</span>}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          Showing {visible.length} {filter === "All" ? "" : filter} projects
        </p>
        <div className="project-grid" key={filter}>
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
