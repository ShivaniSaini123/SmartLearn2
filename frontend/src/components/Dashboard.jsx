import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EmailContext } from '../contexts/EmailContext';
import DashboardWidgets from './DashboardWidgets';
import { FaUserCircle } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [userdata, setUserdata] = useState({});
  const { email } = useContext(EmailContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/students", { withCredentials: true });
      setUserdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Horizontal Navbar */}
      <nav className="navbar-horizontal">
        <div className="navbar-title">Dashboard</div>
        <div className="button-container">
          <button
            onClick={() => navigate(`/profile/${encodeURIComponent(email)}`)}
            className="profile-button"
            aria-label="Profile"
          >
            <FaUserCircle size={24} />
          </button>

        </div>
      </nav>

      {/* Vertical Navbar */}
      <div className="navbar-vertical">
        <button onClick={() => navigate(`/attendance/${encodeURIComponent(email)}`)}>Attendance</button>
        <button onClick={() => navigate(`/assignments`)}>Assignments</button>
        <button onClick={() => navigate(`/timetable`)}>Timetable</button>
        <button onClick={() => navigate('/exam')}>Events and Exam</button>
        <button onClick={() => navigate('/pomodoro')}>Pomodoro</button>
        <button onClick={() => navigate('/goals')}>Set Goals</button>
        <button onClick={() => navigate('/meet')}>Virtual Room</button>
        <button onClick={() => navigate('/chat')}>Chat Room</button>
        <button onClick={() => navigate('/studymaterials')}>Study Materials</button>
      </div>

      {/* Main Content with Widgets */}
      <main className="main-content">
        <DashboardWidgets userdata={userdata} />
      </main>
    </div>
  );
};

export default Dashboard;