import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Social Icons */}
        <div className="social-icons">
          <a href="/" aria-label="Instagram"><Instagram /></a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter /></a>
          <a href="/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          <a href="/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <button onClick={toggleModal}>About Us</button>
          <a href="/">Contact</a>
          <a href="/">Terms & Conditions</a>
        </div>

        {/* Copyright */}
        <div className="copyright">
          © {new Date().getFullYear()} SmartLearn. All rights reserved.
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="footer-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Welcome to SmartLearn</h2>
            <p>
              SmartLearn is your ultimate academic companion, designed to streamline your college journey.
              Track your academic performance, manage tasks effortlessly, and unlock achievements through an engaging reward system.
              Stay organized, set goals, and showcase your progress—all in one smart platform.
            </p>
            <button className="close-btn" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
