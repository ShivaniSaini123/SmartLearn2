import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AttendanceForm.css';

const AttendanceForm = () => {
  const { email } = useParams();
  const [activeTab, setActiveTab] = useState('mark'); // Toggle between forms
  const [formData, setFormData] = useState({ branch: '', semester: '', subject: '', otp: '' });
  const [viewData, setViewData] = useState({ branch: '', semester: '', subject: '' });
  const [message, setMessage] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleViewChange = (e) => setViewData({ ...viewData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/mark', {
        ...formData,
        email,
      }, { withCredentials: true });

      setMessage(res.data.message);
      setFormData({ branch: '', semester: '', subject: '', otp: '' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error marking attendance');
    }
  };

  const handleViewAttendance = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/view-attendance', {
        email,
        ...viewData,
      });
      setAttendanceData(res.data);
      setMessage('');
      setViewData({ branch: '', semester: '', subject: '' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error fetching attendance');
    }
  };
const handleTabSwitch = (tab) => {
  setActiveTab(tab);
  setMessage('');
  setAttendanceData(null);
};

  return (
    <div className="attendance-container">
      <div className="tab-buttons">
       <button className={activeTab === 'mark' ? 'active' : ''} onClick={() => handleTabSwitch('mark')}>Mark Attendance</button>
<button className={activeTab === 'view' ? 'active' : ''} onClick={() => handleTabSwitch('view')}>See Attendance</button>

      </div>

      <div className="attendance-box">
        {activeTab === 'mark' && (
          <form onSubmit={handleSubmit} className="form-section">
            <h2>Mark Attendance</h2>
            <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} required />
            <input type="text" name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} required />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
            <input type="text" name="otp" placeholder="OTP" value={formData.otp} onChange={handleChange} required />
            <button type="submit">Submit</button>
            {message && <p className="message">{message}</p>}
          </form>
        )}

        {activeTab === 'view' && (
          <form onSubmit={handleViewAttendance} className="form-section">
            <h2>See Attendance</h2>
            <input type="text" name="branch" placeholder="Branch" value={viewData.branch} onChange={handleViewChange} required />
            <input type="text" name="semester" placeholder="Semester" value={viewData.semester} onChange={handleViewChange} required />
            <input type="text" name="subject" placeholder="Subject" value={viewData.subject} onChange={handleViewChange} required />
            <button type="submit">Check</button>
            {message && <p className="message">{message}</p>}
          </form>
        )}

        {attendanceData && (
          <div className="attendance-record">
            <h3>Subject: {attendanceData.subject}</h3>
            <p>Attendance: <strong>{attendanceData.attendancePercentage}%</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceForm;
