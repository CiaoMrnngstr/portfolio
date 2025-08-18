import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-text">
      <h2>About Me</h2>
      <p>
        I'm Jebzter Catacutan, an aspiring web developer who enjoys building clean,
        responsive, and user-friendly websites. I'm currently studying at PHINMA Araullo University, 
        taking up a Bachelor of Science in Information Technology, majoring in System Development 
        and Web Development.
      </p>

      <p>
        My goal is to become a full-stack developer who can build powerful, scalable,
        and user-friendly applications. I aim to contribute to projects that solve 
        real-world problems and make people’s lives easier.
      </p>

      <p>
        Outside of coding, I enjoy playing chess, exploring new technologies, and 
        watching tech tutorials on YouTube. I also love collaborating with people 
        on creative projects.
      </p>

      <h3>Core Skills</h3>
      <ul>
        <li>Frontend Development (React, JavaScript, HTML, CSS)</li>
        <li>Backend Basics (PHP, MySQL)</li>
        <li>UI/UX Design Awareness</li>
        <li>Problem-Solving & Team Collaboration</li>
      </ul>
    </div>
  );
}

export default About;
