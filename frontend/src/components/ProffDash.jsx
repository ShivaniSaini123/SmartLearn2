import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "./ProffDash.css";

const ProffDashBoard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ date: "", subject: "", semester: "" });
  const [qrData, setQrData] = useState("");

  const handleNavigation = (route) => navigate(route);
  const handleMarkAttendance = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQrData("");
    setFormData({ date: "", subject: "", semester: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateQR = () => {
    const { date, subject, semester } = formData;
    if (date && subject && semester) {
      setQrData(`Date: ${date}, Subject: ${subject}, Semester: ${semester}`);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Professor Dashboard</h1>

      <div className="dashboard-grid">
        <button onClick={() => handleNavigation("/proffaddassign")} className="dashboard-btn">
          <i className="fas fa-file-alt"></i> Add Assignments
        </button>
        <button onClick={() => handleNavigation("/ProffTimeTable")} className="dashboard-btn">
          <i className="fas fa-calendar"></i> Add Time Table
        </button>
        <button onClick={() => handleNavigation("/ProffExam")} className="dashboard-btn">
          <i className="fas fa-pencil-alt"></i> Add Exam Schedule
        </button>
        <button onClick={() => handleNavigation("/ProffAddProjects")} className="dashboard-btn">
          <i className="fas fa-tasks"></i> Assign Project
        </button>
        <button onClick={handleMarkAttendance} className="dashboard-btn">
          <i className="fas fa-user-check"></i> Mark Attendance
        </button>
        <button onClick={() => handleNavigation("/AddSyllabus")} className="dashboard-btn">
          <i className="fas fa-book"></i> Add Syllabus
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Mark Attendance</h2>
            <div className="modal-form">
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="modal-input" />
              <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="modal-input" placeholder="Subject" />
              <input type="text" name="semester" value={formData.semester} onChange={handleInputChange} className="modal-input" placeholder="Semester" />
              <button onClick={handleGenerateQR} className="modal-btn generate">Generate</button>
              <button onClick={handleCloseModal} className="modal-btn close">Close</button>
            </div>
            {qrData && <div className="qr-container"><QRCodeCanvas value={qrData} size={200} /></div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProffDashBoard;
