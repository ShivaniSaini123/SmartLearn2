import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <footer id="footer">
      <div className="container">
        {/* Social Icons */}
        <div id="social-icons" className="social-icons">
          <a href="/" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="https://x.com/" aria-label="Twitter">
            <Twitter />
          </a>
          <a href="/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="/" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <button onClick={toggleModal}>About Us</button>
          <a href="/" target="_blank" rel="noopener noreferrer">Contact</a>
          <a href="/">Terms & Conditions</a>
        </div>

        {/* Copyright */}
        <div className="copyright">
          © {new Date().getFullYear()} SmartLearn. All rights reserved.
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div id="modal-overlay" onClick={toggleModal}>
          <div id="footer-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header">Welcome to SmartLearn</h2>
            <p className="modal-content">
            SmartLearn is your ultimate academic companion, designed to streamline your college journey.
Track your academic performance, manage tasks effortlessly, and unlock achievements through an engaging reward system.
Stay organized, set goals, and showcase your progress—all in one smart platform
            </p>
            <button onClick={toggleModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;