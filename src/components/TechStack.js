import {
  SiNodedotjs,
  SiFirebase,
  SiGit,
  SiExpo,
  SiPhp,
  SiMysql,
  SiVite,
} from "react-icons/si";
import { Code2, Database, Wrench, Braces, Globe, Github, MapPin, Mail, Server } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { technologies } from "../data/technologies";
import "./TechStack.css";
const icons = {
  node: SiNodedotjs,
  firebase: SiFirebase,
  git: SiGit,
  expo: SiExpo,
  php: SiPhp,
  mysql: SiMysql,
  vite: SiVite,
  database: Database,
  github: Github,
  code: Code2,
  map: MapPin,
  mail: Mail,
  server: Server,
};
const groups = [
  { name: "Languages", detail: "The foundations", Icon: Braces },
  { name: "Frontend", detail: "The experience", Icon: Code2 },
  { name: "Backend", detail: "Under the hood", Icon: Database },
  { name: "Tools", detail: "The workflow", Icon: Wrench },
  { name: "APIs & Services", detail: "Connected apps", Icon: Globe },
];
export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="section tech-section"
      aria-label="Tech Stack"
    >
      <div className="container">
        <div className="section-top">
          <SectionHeading
            number="02"
            eyebrow="My development toolkit"
            title={
              <>
                The tools behind <span className="text-muted">the ideas.</span>
              </>
            }
          />
          <p className="section-side-note">
            Tech Stack
            <br />
            <span>Always learning. Always adding.</span>
          </p>
        </div>
        <div className="tech-groups">
          {groups.map(({ name, detail, Icon }) => (
            <article className="tech-group reveal" key={name}>
              <div className="tech-group-heading">
                <Icon size={18} aria-hidden="true" />
                <h3>{name}</h3>
                <span>{detail}</span>
              </div>
              <ul className="tech-list">
                {technologies
                  .filter((tech) => tech.group === name)
                  .map((tech) => {
                    const Brand = icons[tech.icon];
                    return (
                      <li
                        key={tech.name}
                        className="tech-item"
                        aria-label={tech.name}
                      >
                        <span className="tech-icon">
                          {tech.image ? (
                            <img
                              src={tech.image}
                              alt=""
                              width="38"
                              height="38"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <Brand
                              size={34}
                              style={{ color: tech.color }}
                              aria-hidden="true"
                            />
                          )}
                        </span>
                        <span>{tech.name}</span>
                        <span className="tech-tooltip" aria-hidden="true">
                          {tech.name}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
