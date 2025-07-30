import React from 'react';
import './Project.css';
// Importing images for projects
// Importing images for projects
import proj1 from '../assets/kicks/home.jpeg';
import proj2 from '../assets/kicks/body.jpeg';
import proj3 from '../assets/kicks/shop.jpeg';
import proj4 from '../assets/kicks/footer.jpeg';
// Importing images for PHINMA project
import proj5 from '../assets/phinma/one.jpeg';
import proj6 from '../assets/phinma/two.jpeg';
import proj7 from '../assets/phinma/three.png';
import proj8 from '../assets/phinma/four.jpeg';

import proj9 from '../assets/PMCCA/login.jpeg';
import proj10 from '../assets/PMCCA/signup.jpeg';
import proj11 from '../assets/PMCCA/list.jpeg';
import proj12 from '../assets/PMCCA/records.jpeg';
function Project() {
  return (
    <div className="project-section">
      <h2 className="section-title">My Projects</h2>

      {/* Grouped Kicks Project */}
      <div className="project-item">
        <h3>1. Kicks Simple Responsive Website</h3>
        <p>This is my frist project on my first year journey, I built thisd website using my iPad, I used the Github for my development software, it is a bit challenging since the screen is too small. This website is all about a shoe company that gives a confortabile wearable shoes to the customers. A clean and modern shoe e-commerce frontend design. Built using HTML, CSS, and JavaScript. Below are different screens from the project:</p>

        <div className="project-gallery">
          <img src={proj1} alt="Kicks Home" className="project-img" />
          <img src={proj2} alt="Kicks Body" className="project-img" />
          <img src={proj3} alt="Kicks Shop" className="project-img" />
          <img src={proj4} alt="Kicks Footer" className="project-img" />
        </div>
      </div>

      {/* Grouped PHINMA Project */}
      <div className="project-item">
        <h3>2. PHINMA AU Student Credential App</h3>
        <p>This system is a web based for our integrated projects in 3 subjects we have last semester, this deals with the records by handling the credentials of the students by keeping the files and images submitted safe. This creates a hassle free for the students and also for the registrar at PHINMA South Araullo University like instead of going to the physical branches for the AU, students can now pass their credentials through online, talk about the availability. as you can see to the pictures, this is an app version to the website that created by the developer of our group, this app was developed through using the Android Studio while the backend is in the  free web hosting or the Awardspace, all the backend and frointend is inside this web hosting, the app which I developed isn't fully an application, I used the web view for saving the time.A UI concept for PHINMA AU’s student portal system. Designed to be intuitive and modern, focusing on user experience for students and faculty alike.</p>

        <div className="project-gallery">
          <img src={proj5} alt="PHINMA Screen 1" className="project-img" />
          <img src={proj6} alt="PHINMA Screen 2" className="project-img" />
          <img src={proj7} alt="PHINMA Screen 3" className="project-img" />
          <img src={proj8} alt="PHINMA Screen 4" className="project-img" />
        </div>
      </div>

      {/* Grouped PHINMA Project */}
      <div className="project-item">
        <h3>3. PMCCA Hospital Management System</h3>
        <p>PMCCA means literally nothing, it is just our first last names mixed together for the originaloty purposes only, this system allows the staff to manage the patients' records instead of the traditional way to manage the papers. This saves a lot of time for the staff in the hospital. This system offers a functionalit, reliabilility, authentication, and availability. I developed this one by using the HTML, CSS, JS, and lastly for the backend and database, the PHP and phpMyAdmin. A UI concept for PHINMA AU’s student portal system. Designed to be intuitive and modern, focusing on user experience for students and faculty alike.</p>

        <div className="project-gallery">
          <img src={proj9} alt="PMCCA Login" className="project-img" />
          <img src={proj10} alt="PMCCA Sign up" className="project-img" />
          <img src={proj11} alt="PMCCA List" className="project-img" />
          <img src={proj12} alt="PMCCA Record" className="project-img" />
        </div>
      </div>
    </div>
  );
}

export default Project;
