import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AttendanceForm.css';

const AttendanceForm = () => {
  const { email } = useParams(); // Extract email from URL
  const [formData, setFormData] = useState({
    branch: '',
    semester: '',
    subject: '',
    otp: '',
  });
  const [attendanceData, setAttendanceData] = useState(null); // To store attendance records
  const [message, setMessage] = useState('');
  const [viewData, setViewData] = useState({
    branch: '',
    semester: '',
    subject: '',
  });

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViewChange = (e) => {
    setViewData({ ...viewData, [e.target.name]: e.target.value });
  };

  // Handle submitting the mark attendance form
  const handleSubmit = async (e) => {
    console.log('Submitting attendance with data:', { ...formData, email });

    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/mark', {
        ...formData,
        email, // Automatically include email from route
      }, {
        withCredentials: true,
      });

      setMessage(res.data.message); // Success message from the back-end
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error marking attendance');
    }
  };

  // Handle fetching attendance data
  const handleViewAttendance = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/view-attendance', {
        email, // Automatically include email from route
        ...viewData, // includes branch, semester, subject
      });

      // Set the attendance data received from the backend, including the percentage
      setAttendanceData(res.data); // Assume the backend now sends subject and percentage data
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error fetching attendance');
    }
  };

  return (
    <div className="attendance-container">
      <div className="attendance-box">
        {/* Mark Attendance Form */}
        <h2>Mark Attendance</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={formData.branch}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="otp"
            placeholder="OTP"
            value={formData.otp}
            onChange={handleChange}
            required
          />
          <button type="submit">Mark Attendance</button>
          {message && <p>{message}</p>}
        </form>

        {/* See Attendance Form */}
        <h2>See Attendance</h2>
        <form onSubmit={handleViewAttendance}>
          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={viewData.branch}
            onChange={handleViewChange}
            required
          />
          <input
            type="text"
            name="semester"
            placeholder="Semester"
            value={viewData.semester}
            onChange={handleViewChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={viewData.subject}
            onChange={handleViewChange}
            required
          />
          <button type="submit">See Attendance</button>
        </form>

        {/* Display Attendance Record */}
        {attendanceData && (
          <div className="attendance-record">
            <h3>Attendance Record for {attendanceData.subject}</h3>
            <p>Attendance Percentage: {attendanceData.attendancePercentage}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceForm;
