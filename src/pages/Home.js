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
      <div className="intro-card">
        <img src={profileImage} alt="My Profile" className="profile-img" />
        <div className="intro-text">
          <h2>Hi, I'm Jebzter Catacutan</h2>
          <p>Web Dev Student at PHINMA Araullo University</p>
          <a href="/project" className="btn">View Projects</a>
        </div>
      </div>

      <div className="bio">
        <p>
          I’m currently pursuing a Bachelor of Science in Information Technology,
          majoring in System Development. I enjoy building clean, functional,
          and responsive websites using modern technologies. I'm passionate about building responsive and user-friendly websites using React, HTML, and CSS.
          This portfolio is a showcase of the projects I've built while learning and growing as a developer.
        </p>
      </div>

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

      <div className="home-links">
        <a href="/project" className="btn">Projects</a>
        <a href="/contact" className="btn">Contact</a>
      </div>
    </div>
  );
}

export default Home;
