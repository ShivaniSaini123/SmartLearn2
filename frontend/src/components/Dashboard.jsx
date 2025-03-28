import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
// import user from './user.png';
import { EmailContext } from '../contexts/EmailContext';
import './Dashboard.css';

const Dashboard = () => {
  const [userdata, setUserdata] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { email } = useContext(EmailContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/students", { withCredentials: true });
      setUserdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/users?name=${searchTerm}`, { withCredentials: true });
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddFriend = async (identifier) => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/add-friend", { identifier, email });
      if (response.status === 200) {
        alert('Friend added successfully!');
      } else {
        alert('Failed to add friend');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Error adding friend');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Horizontal Navbar */}
      <nav className="navbar-horizontal">
        <div className="navbar-title">Dashboard</div>
        <div className="button-container">
          <button onClick={() => setIsModalOpen(true)}>Search</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
        </div>
        {/* <img src={user} alt="User" className="user-logo" /> */}
      </nav>

      {/* Vertical Navbar */}
      <div className="navbar-vertical">
        <button onClick={() => navigate(`/attendance/${encodeURIComponent(email)}`)}>Attendance</button>
        <button onClick={() => navigate(`/assignments/${encodeURIComponent(email)}`)}>Assignments</button>
        <button onClick={() => navigate(`/timetable`)}>Timetable</button>
        <button onClick={() => navigate('/exam')}>Events and Exam</button>
        <button onClick={() => navigate('/pomodoro')}>Pomodoro</button>
        <button onClick={() => navigate('/room')}>Join Room</button>
        <button onClick={() => navigate('/room')}>Friends</button>
      </div>
      {/* Search Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="search-modal" overlayClassName="search-overlay">
        <h2>Search Users</h2>
        <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
        <button onClick={handleSearch}>Search</button>
        <div className="search-results">
          {searchResults.map((user, index) => (
            <div key={index} className="search-result">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Student ID:</strong> {user.identifier}</p>
              <button onClick={() => handleAddFriend(user.identifier)}>Add Friend</button>
            </div>
          ))}
        </div>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Dashboard;