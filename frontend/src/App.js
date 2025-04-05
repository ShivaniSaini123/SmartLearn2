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
import ProffDashBoard from "./components/ProffDash";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProffTimeTable from './components/ProffTT';
import Pomodoro from "./components/Pomodoro";
import Timetable from "./components/Timetable";

import ProfilePage from "./components/Profile";

import Assignment from "./components/Assignment";
import ProffAddAssign from './components/ProffAddAssign';
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
            path="/assignments"
            element={
                <Assignment />
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
          <Route
            path="/timetable"
            element={
              <motion.div {...pageTransition}>
                <Timetable email={email} />
              </motion.div>
            }
          />
          <Route
          path="/profile"
          element={<ProfilePage/>}
        />
          <Route 
            path="/pomodoro" 
            element={<Pomodoro />} 
          />
           {/* <Route
            path="/timetable"
            element={
                <Timetable />
            }
          /> */}
          <Route
            path="classDashBoard"
            element={
              <motion.div {...pageTransition}>
                <ProffDashBoard />
              </motion.div>
            }
          />
          {/* <Route
            path="/timetable/:email"
            element={
              <motion.div {...pageTransition}>
                <Timetable />
              </motion.div>
            }
          /> */}
          <Route path="/ProffTimeTable" element={<ProffTimeTable />} />
          <Route path="/proffaddassign" element={<ProffAddAssign />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;