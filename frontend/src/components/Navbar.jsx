import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const LoginHandler = () => navigate('/login');
  const RegisterHandler = () => navigate('/register');

   

  return (
    <nav id="navbar-container">
      <div id="navbar-content">
        <div id="navbar-logo" onClick={() => navigate('/')}>
          SmartLearn
        </div>
       

        {/* Desktop Menu */}
        <div id="navbar-buttons" className="hidden md:flex">
          <button
            id="login-button"
            onClick={LoginHandler}
            className="navbar-button"
          >
            Login
          </button>
          <button
            id="register-button2"
            onClick={RegisterHandler}
            className="navbar-button"
          >
            Register
          </button>
        </div>

        
      </div>

     
    </nav>
  );
};

export default Navbar;