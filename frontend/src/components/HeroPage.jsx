import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./HeroPage.css";
import im1 from "../assets/im2.png";
import im2 from "../assets/im1.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <Navbar />

      <div className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <h1>Welcome to SmartLearn</h1>
            <p>
              Empower your academic journey with goal tracking, rewards, and
              personalized insights – all in one place.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => navigate("/register")}>
                Get Started
              </button>
              <button className="secondary-btn" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          </div>

          <div className="hero-image">
            <img src={im1} alt="Smart Learning" />
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-img">
            <img src={im2} alt="Feature" />
          </div>
          <div className="feature-text">
            <h2>Why SmartLearn?</h2>
            <p>
              Track academic goals, earn rewards, and enjoy a gamified student
              experience.
            </p>
            <ul>
              <li>🎯 Goal Tracking</li>
              <li>🏆 Achievements & Rewards</li>
              <li>📊 Analytics Dashboard</li>
              <li>🗓️ Smart Scheduling</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
