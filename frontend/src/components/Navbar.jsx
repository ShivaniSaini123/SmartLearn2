import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleHome = () => navigate("/");

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleHome} role="button" aria-label="Homepage">
        SmartLearn
      </div>

      <div className="nav-links">
        <button className="nav-btn" onClick={handleLogin}>
          Login
        </button>
        <button className="nav-btn primary" onClick={handleRegister}>
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
