import "./App.css";
import Details from './components/Details'; 
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./components/HeroPage";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
// import Analytics from './components/Analytics';

const pageTransition = {
  initial: { opacity: 0, x: 200, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -200, scale: 0.95 },
  transition: { duration: 0.7, ease: "easeInOut" },
};

function App() {
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistrationSuccess = (userEmail) => {
    console.log("Registered Email(in app.js):", userEmail);
    setEmail(userEmail);
    setIsRegistered(true);
  };

  const handleChallengeCreate = async (challengeData) => {
    await fetch("http://localhost:4000/api/v1/challenges/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(challengeData),
    });
  };

  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route
            path="/"
            element={
              <motion.div {...pageTransition}>
                <HeroPage />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div {...pageTransition}>
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div {...pageTransition}>
                <Register onSuccess={handleRegistrationSuccess} />
              </motion.div>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <motion.div {...pageTransition}>
                <VerifyOtp email={email} />
              </motion.div>
            }
          />
        <Route
            path="/dashboard"
            element={
              <motion.div {...pageTransition}>
                <Dashboard email={email} />
              </motion.div>
            }
          />
          <Route
            path="/details"
            element={
              <motion.div {...pageTransition}>
                <Details email={email} />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;