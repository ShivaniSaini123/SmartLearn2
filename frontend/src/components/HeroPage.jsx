import React, { useState } from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './HeroPage.css';

const HeroPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWatchDemoClick = () => {
    window.open("https://www.canva.com/design/DAGU3FJtxXU/LWObNTd8q4eO32liihgsfA/view?utm_content=DAGU3FJtxXU&utm_campaign=designshare&utm_medium=link&utm_source=editor", "_blank");
  };

  const handleStartTrialClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div id="hero-container">
        {/* Background Elements */}
        <div id="animated-background">
          <div className="bg-circle" id="circle-pink"></div>
          <div className="bg-circle" id="circle-blue"></div>
        </div>

        {/* Main Content */}
        <div id="content-container2">
          <div id="text-content2">
            <h1 id="hero-title2">Redefine Your College Journey</h1>
            <p id="hero-description2">
              Optimize productivity, conquer deadlines, and unlock your full academic potential
              with the ultimate student performance powerhouse. 🚀
            </p>
            <div id="button-container2">
              <button id="start-trial-button2" onClick={handleStartTrialClick}>Start Free Trial</button>
              <button id="watch-demo-button2" onClick={handleWatchDemoClick}>Watch Demo</button>
            </div>
          </div>

          {/* Features */}
          <div id="features-container">
            <div className="feature-card" id="feature-track-genius">
              <Sparkles className="feature-icon" />
              <h3 className="feature-title">TrackGenius</h3>
              <p className="feature-description">Transform the Way You Study.</p>
            </div>
            <div className="feature-card" id="feature-hyper-focus">
              <Brain className="feature-icon" />
              <h3 className="feature-title">HyperFocus</h3>
              <p className="feature-description">Nothing stands between you and success.</p>
            </div>
            <div className="feature-card" id="feature-neuro-track">
              <Zap className="feature-icon" />
              <h3 className="feature-title">NeuroTrack</h3>
              <p className="feature-description">Understand your focus, enhance your results.</p>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div id="modal-overlay">
            <div id="modal-content">
              <h2>Please log in or sign up to explore</h2>
              <button id="close-modal-button" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HeroPage;
