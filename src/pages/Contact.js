import React from 'react';
import './Contact.css';
import { FaFacebook, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <div className="contact-container">
      <h2>Get in Touch</h2>
      <p>I'd love to connect! Feel free to reach out or follow me online.</p>

      <div className="contact-info">
        <p><strong>Email:</strong> jebzterc@gmail.com</p>
        <p><strong>Location:</strong> Bongabon, Nueva Ecija, Philippines</p>
        <p><strong>Mobile Number:</strong> +639544255351</p>
      </div>

      <div className="social-icons">
        <a href="https://www.facebook.com/jebzter.catacutan/" target="_blank" rel="noopener noreferrer" className="icon fb">
          <FaFacebook />
        </a>
        <a href="https://github.com/CiaoMrnngstr" target="_blank" rel="noopener noreferrer" className="icon gh">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/jebzter-catacutan-b34707376/" target="_blank" rel="noopener noreferrer" className="icon li">
          <FaLinkedin />
        </a>
        <a href="mailto:jebzterc@gmail.com" target="_blank" rel="noopener noreferrer" className="icon gm">
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
}

export default Contact;
