import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProffDash.css";

const ProffDashBoard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ branch: "", subject: "", semester: "" });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleNavigation = (route) => navigate(route);
  const handleMarkAttendance = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOtp("");
    setFormData({ branch: "", subject: "", semester: "" });
    setMessage(""); // Reset message when modal is closed
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateOtp = async () => {
    const { branch, subject, semester } = formData;
    if (branch && subject && semester) {
      const newOtp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
      setOtp(newOtp.toString());
  
      try {
        const res = await fetch("http://localhost:4000/api/v1/attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ branch, subject, semester, otp: newOtp }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to save OTP");

        console.log("OTP stored in DB:", data.message);
        setMessage("OTP generated and stored successfully.");
      } catch (err) {
        console.error("Error saving OTP:", err.message);
        setMessage("Error generating OTP. Please try again.");
      }
    } else {
      setMessage("Please fill all fields before generating OTP.");
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
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="modal-input"
                placeholder="Branch"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="modal-input"
                placeholder="Subject"
              />
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="modal-input"
                placeholder="Semester"
              />
              <button onClick={generateOtp} className="modal-btn generate">Generate OTP</button>
              <button onClick={handleCloseModal} className="modal-btn close">Close</button>
            </div>
            {otp && <div className="otp-container"><h3>Your OTP: {otp}</h3></div>}
            {message && <div className="message-container"><p>{message}</p></div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProffDashBoard;
