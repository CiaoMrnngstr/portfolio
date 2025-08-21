import React from 'react';
import './Home.css';
import profileImage from '../assets/me1.jpeg';
import htmlIcon from '../assets/icons/html.png';
import cssIcon from '../assets/icons/css.png';
import jsIcon from '../assets/icons/js.png';
import reactIcon from '../assets/icons/react.png';
import javaIcon from '../assets/icons/java.png';
import pyIcon from '../assets/icons/py.png';

function Home() {
  return (
    <div className="home-container">
      {/* Intro Card */}
      <div className="intro-card">
        <img src={profileImage} alt="My Profile" className="profile-img" />
        <div className="intro-text">
          <h2>Hi, I'm <span className="highlight">Jebzter Catacutan</span></h2>
          <p>Aspiring Full-Stack Developer | Sys Dev Student</p>
          <div className="intro-buttons">
            <a href="/project" className="btn">🚀 View Projects</a>
            <a href="/contact" className="btn">📩 Contact Me</a>
            <a href="/cv.pdf" download className="btn">📄 Download CV</a>
          </div>
        </div>
      </div>

      {/* Tech Stack Snapshot */}
      <div className="skills">
        <h3>Tech Stack</h3>
        <div className="skills-icons">
          <img src={htmlIcon} alt="HTML" />
          <img src={cssIcon} alt="CSS" />
          <img src={jsIcon} alt="JavaScript" />
          <img src={reactIcon} alt="React" />
          <img src={javaIcon} alt="Java" />
          <img src={pyIcon} alt="Python" />
        </div>
      </div>
    </div>
  );
}

export default Home;
