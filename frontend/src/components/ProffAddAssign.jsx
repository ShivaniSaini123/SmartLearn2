
import React, { useState } from 'react';
import axios from 'axios';
import "./proffAddAssi.css";
import { useNavigate } from "react-router-dom";
const AddAssignment = () => {
  const navigate = useNavigate();
  const [assignmentData, setAssignmentData] = useState({
    assignmentNumber: '',
    subject: '',
    chapter: '',
    deadline: '',
    professorName: '',
    description: '',
    branch: '',
    semester: '',
    email: '',
  });
  const [file, setFile] = useState(null);

  const branches = ['CSE', 'ECE', 'Mechanical', 'Civil', 'IT'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const handleChange = (e) => {
    setAssignmentData({
      ...assignmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = `${assignmentData.branch}${assignmentData.semester}@gmail.com`.trim();
    const formData = new FormData();

    Object.entries(assignmentData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    formData.append('email', email);

    if (file) {
      formData.append('attachments', file);
      // Ensure this matches the multer field name
    }

    try {
        const response = await axios.post('http://localhost:4000/api/v1/addAssignmentProff', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }, // Important for multer
        });

        alert(response.data.message);
    } catch (error) {
        console.error('Error submitting:', error);
        alert('Error: Could not add assignment');
    }
};
return (
    <div className="assignment-page">
      <div className="assignment-container">
        <h2>Add Assignment</h2>
         {/* Go Back Button */}
      <button
        type="button"
        className="go-back-btn"
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "15px",
          padding: "8px 16px",
          background: "linear-gradient(120deg, #a078d4, #7e5dbf)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ← Go Back
      </button>
        <form className="assignment-form" onSubmit={handleSubmit}>

          <label>Branch</label>
          <select
            name="branch"
            value={assignmentData.branch}
            onChange={handleChange}
            required
          >
            <option value="">Select Branch</option>
            {branches.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <label>Semester</label>
          <select
            name="semester"
            value={assignmentData.semester}
            onChange={handleChange}
            required
          >
            <option value="">Select Semester</option>
            {semesters.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <input
            type="text"
            name="assignmentNumber"
            placeholder="Assignment Number"
            value={assignmentData.assignmentNumber}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={assignmentData.subject}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="chapter"
            placeholder="Chapter"
            value={assignmentData.chapter}
            onChange={handleChange}
            required
          />

          <input
            type="datetime-local"
            name="deadline"
            value={assignmentData.deadline}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="professorName"
            placeholder="Professor Name"
            value={assignmentData.professorName}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Assignment Description"
            value={assignmentData.description}
            onChange={handleChange}
            required
          />

          <div className="file-wrapper">
            <label className="file-label">Upload Assignment File</label>
            <input type="file" onChange={handleFileChange} required />
          </div>

          <button type="submit">Add Assignment</button>
        </form>
      </div>
    </div>
  );
};

export default AddAssignment;