import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h2>About Me</h2>
      <p className="about-intro">
        I'm Jebzter Catacutan, an aspiring web developer who enjoys building clean,
        responsive, and user-friendly websites.
      </p>

      {/* Timeline */}
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>🎓 Education</h3>
            <p>
              Currently studying at PHINMA Araullo University, pursuing a
              Bachelor of Science in Information Technology, majoring in System
              Development & Web Development.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>💻 Current Focus</h3>
            <p>
              Improving my skills in frontend (React, JavaScript, CSS) and
              backend basics (PHP, MySQL). Building real-world projects to
              sharpen my problem-solving and teamwork skills.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>🚀 Goal</h3>
            <p>
              To become a full-stack developer who can build powerful,
              scalable, and user-friendly applications that solve real-world
              problems.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>🎯 Outside of Coding</h3>
            <p>
              I enjoy playing games, exploring new technologies, and watching
              tech tutorials on YouTube. I also love collaborating on creative
              projects.
            </p>
          </div>
        </div>
      </div>

      {/* Core Skills */}
      <h3 className="skills-title">Core Skills</h3>
      <ul className="skills-list">
        <li>Frontend Development (React, JavaScript, HTML, CSS)</li>
        <li>Backend Basics (PHP, MySQL)</li>
        <li>UI/UX Design Awareness</li>
        <li>Problem-Solving & Team Collaboration</li>
      </ul>
    </div>
  );
}

export default About;
