import {
  Code2,
  GraduationCap,
  Rocket,
  Gamepad2,
  ArrowUpRight,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/projects";
import { technologies } from "../data/technologies";
import "./About.css";

const highlights = [
  {
    title: "Education",
    Icon: GraduationCap,
    text: "Fourth-year BS Information Technology student at PHINMA Araullo University, with graduation expected in July 2027. Previously graduated with honors from Bongabon Senior High School, HUMSS, in 2023.",
  },
  {
    title: "Current Focus",
    Icon: Code2,
    text: "Building Bitulok Express as its sole full-stack developer: React web apps, React Native mobile apps, and a Node.js and Firebase backend. Strengthening practical skills through complete, connected applications.",
  },
  {
    title: "Goal",
    Icon: Rocket,
    text: "Seeking an IT internship where I can contribute to real projects, learn from experienced developers, and grow as a full-stack developer.",
  },
  {
    title: "Outside of Coding",
    Icon: Gamepad2,
    text: "Music and guitar, art and painting, gaming, movies, and chess keep me curious outside of development. I bring that same patience and creativity to solving problems.",
  },
];
const skills = [
  "Web & Mobile Development (React, React Native)",
  "Backend & Databases (Node.js, Firebase, SQL)",
  "UI/UX Design Awareness",
  "Problem-Solving & Team Collaboration",
];

export default function About() {
  return (
    <section id="about" className="section about-section" aria-label="About Me">
      <div className="container">
        <div className="about-grid">
          <div>
            <SectionHeading
              number="01"
              eyebrow="A little about me"
              title={
                <>
                  Curiosity drives me.
                  <br />
                  <span className="text-muted">Code brings it to life.</span>
                </>
              }
            />
            <p className="about-intro reveal">
              I'm Jebzter Catacutan, an aspiring full-stack developer who
              enjoys building useful, approachable software. From my first
              website on an iPad to a delivery platform spanning web and mobile,
              every project has given me something new to learn.
            </p>
            <div className="stats reveal">
              <div>
                <strong>
                  {String(projects.length).padStart(2, "0")}
                </strong>
                <span>Selected projects</span>
              </div>
              <div>
                <strong>
                  {technologies.length}
                </strong>
                <span>Technologies explored</span>
              </div>
              <div>
                <strong>01</strong>
                <span>Capstone journey</span>
              </div>
            </div>
            <div className="core-skills reveal">
              <h3>Core Skills</h3>
              <ul>
                {skills.map((skill) => (
                  <li key={skill}>
                    <ArrowUpRight size={15} aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="timeline reveal">
            {highlights.map(({ title, Icon, text }, index) => (
              <article className="timeline-item" key={title}>
                <div className="timeline-icon">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <span className="timeline-index mono">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
