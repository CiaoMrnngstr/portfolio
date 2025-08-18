import React from 'react';
import './Project.css';

// Kicks images
import proj1 from '../assets/kicks/home.jpeg';
import proj2 from '../assets/kicks/body.jpeg';
import proj3 from '../assets/kicks/shop.jpeg';
import proj4 from '../assets/kicks/footer.jpeg';

// PHINMA project images
import proj5 from '../assets/phinma/one.jpeg';
import proj6 from '../assets/phinma/two.jpeg';
import proj7 from '../assets/phinma/three.png';
import proj8 from '../assets/phinma/four.jpeg';

// PMCCA hospital project images
import proj9 from '../assets/PMCCA/login.jpeg';
import proj10 from '../assets/PMCCA/signup.jpeg';
import proj11 from '../assets/PMCCA/list.jpeg';
import proj12 from '../assets/PMCCA/records.jpeg';

function Project() {
  return (
    <div className="project-section">
      <h2 className="section-title">My Projects</h2>

      {/* Kicks Project */}
      <div className="project-item">
        <h3>1. Kicks Simple Responsive Website</h3>
        <p>
          This is my first project on my first year journey, I built this website using my iPad. 
          I used GitHub for my development software. It is a bit challenging since the screen is too small. 
          This website is all about a shoe company that gives comfortable wearable shoes to customers. 
          A clean and modern shoe e-commerce frontend design built using HTML, CSS, and JavaScript.
        </p>

        <div className="project-gallery">
          <img src={proj1} alt="Kicks Home" className="project-img" />
          <img src={proj2} alt="Kicks Body" className="project-img" />
          <img src={proj3} alt="Kicks Shop" className="project-img" />
          <img src={proj4} alt="Kicks Footer" className="project-img" />
        </div>

        {/* 🔗 Link Button */}
        <div className="project-buttons">
          <a
            href="https://ciaomrnngstr.github.io/SampleWeb/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            🌐 View Live Website
          </a>
        </div>
      </div>

      {/* PHINMA Project */}
      <div className="project-item">
        <h3>2. PHINMA AU Student Credential App</h3>
        <p>
          This system is a web-based project for our integrated projects in 3 subjects we had last semester. 
          It handles student credential records by keeping submitted files and images safe. 
          Instead of going to the physical registrar’s office, students can now pass their credentials online. 
          This app was built with Android Studio using WebView, while the backend was deployed in Awardspace.
        </p>

        <div className="project-gallery">
          <img src={proj5} alt="PHINMA Screen 1" className="project-img" />
          <img src={proj6} alt="PHINMA Screen 2" className="project-img" />
          <img src={proj7} alt="PHINMA Screen 3" className="project-img" />
          <img src={proj8} alt="PHINMA Screen 4" className="project-img" />
        </div>

        {/* 🔗 Download APK */}
        <div className="project-buttons">
          <a
            href="/myapp.apk"
            download
            className="btn btn-app"
          >
            ⬇️ Download Android App
          </a>
        </div>
      </div>

      {/* PMCCA Hospital Project */}
      <div className="project-item">
        <h3>3. PMCCA Hospital Management System</h3>
        <p>
          PMCCA is a system that allows hospital staff to manage patients' records digitally instead of paper-based. 
          It improves functionality, reliability, authentication, and efficiency for staff. 
          I developed this using HTML, CSS, JS for the frontend and PHP + phpMyAdmin for the backend and database.
        </p>

        <div className="project-gallery">
          <img src={proj9} alt="PMCCA Login" className="project-img" />
          <img src={proj10} alt="PMCCA Sign up" className="project-img" />
          <img src={proj11} alt="PMCCA List" className="project-img" />
          <img src={proj12} alt="PMCCA Record" className="project-img" />
        </div>

        {/* 🔗 Live Site */}
        <div className="project-buttons">
          <a
            href="http://pmccahospital.mywebcommunity.org/login.php"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            🏥 Visit Hospital Management System
          </a>
        </div>
      </div>
    </div>
  );
}

export default Project;
