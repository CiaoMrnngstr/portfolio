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
    text: "Currently studying at PHINMA Araullo University, pursuing a Bachelor of Science in Information Technology, majoring in System Development & Web Development.",
  },
  {
    title: "Current Focus",
    Icon: Code2,
    text: "Improving my skills in frontend (React, JavaScript, CSS) and backend basics (PHP, MySQL). Building real-world projects to sharpen my problem-solving and teamwork skills.",
  },
  {
    title: "Goal",
    Icon: Rocket,
    text: "To become a full-stack developer who can build powerful, scalable, and user-friendly applications that solve real-world problems.",
  },
  {
    title: "Outside of Coding",
    Icon: Gamepad2,
    text: "I enjoy playing games, exploring new technologies, and watching tech tutorials on YouTube. I also love collaborating on creative projects.",
  },
];
const skills = [
  "Frontend Development (React, JavaScript, HTML, CSS)",
  "Backend Basics (PHP, MySQL)",
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
              I'm Jebzter Catacutan, an aspiring web developer who enjoys
              building clean, responsive, and user-friendly websites.
            </p>
            <div className="stats reveal">
              <div>
                <strong>
                  {String(projects.length).padStart(2, "0")}
                  <span>+</span>
                </strong>
                <span>Projects built</span>
              </div>
              <div>
                <strong>
                  {technologies.length}
                  <span>+</span>
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
