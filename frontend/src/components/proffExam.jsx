import React, { useState } from 'react';
import axios from 'axios';
import './proffExam.css';

const ProffExam = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [exams, setExams] = useState([{ subject: '', date: '', startTime: '', endTime: '' }]);
  const [timetable, setTimetable] = useState(null);

  // Handle input change for branch and semester
  const handleBranchChange = (e) => setBranch(e.target.value);
  const handleSemesterChange = (e) => setSemester(e.target.value);

  // Handle exam inputs
  const handleExamChange = (index, field, value) => {
    const newExams = [...exams];
    newExams[index][field] = value;
    setExams(newExams);
  };

  // Add an additional row for exam details
  const addExamRow = () => {
    setExams([...exams, { subject: '', date: '', startTime: '', endTime: '' }]);
  };

  // Submit new timetable to backend
  const handleAddTimetable = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/addTimetable', {
        branch,
        semester: parseInt(semester),
        exams,
      });
      alert(response.data.message);
      setBranch('');
      setSemester('');
      setExams([{ subject: '', date: '', startTime: '', endTime: '' }]);
    } catch (error) {
      alert('Error adding timetable');
    }
  };

  // Fetch existing timetable based on branch and semester
  const handleGetTimetable = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/getTimetable`, { params: { branch, semester: parseInt(semester) } });
      setTimetable(response.data);
    } catch (error) {
      alert('No timetable found for this branch and semester.');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Exam Timetable Management</h2>

      <form className="form-section">
        <div className="form-group">
          <label>Branch:</label>
          <select value={branch} onChange={handleBranchChange}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EE">EE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
          </select>
        </div>

        <div className="form-group">
          <label>Semester:</label>
          <input
            type="number"
            value={semester}
            onChange={handleSemesterChange}
            placeholder="Enter semester number"
          />
        </div>

        <div>
          <h3 className="section-title">Exams</h3>
          {exams.map((exam, index) => (
            <div key={index} className="exam-card">
              <input
                type="text"
                placeholder="Subject"
                value={exam.subject}
                onChange={(e) => handleExamChange(index, 'subject', e.target.value)}
              />
              <input
                type="date"
                value={exam.date}
                onChange={(e) => handleExamChange(index, 'date', e.target.value)}
              />
              <div className="time-inputs">
                <input
                  type="time"
                  value={exam.startTime}
                  onChange={(e) => handleExamChange(index, 'startTime', e.target.value)}
                />
                <input
                  type="time"
                  value={exam.endTime}
                  onChange={(e) => handleExamChange(index, 'endTime', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addExamRow}>
            Add Another Exam
          </button>
        </div>

        <button className="submit-btn" onClick={handleAddTimetable}>
          Submit Timetable
        </button>
      </form>

      <form className="fetch-form">
        <h2>Get Timetable</h2>
        <button className="fetch-btn" onClick={handleGetTimetable}>
          Fetch Timetable
        </button>
      </form>

      {timetable && (
        <div className="timetable-display">
          <h3>
            Timetable for {timetable.branch}, Semester {timetable.semester}
          </h3>
          <div className="exam-list">
            {timetable.exams.map((exam, index) => (
              <div key={index} className="exam-item">
                <p><strong>Subject:</strong> {exam.subject}</p>
                <p><strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}</p>
                <p><strong>Start Time:</strong> {exam.startTime}</p>
                <p><strong>End Time:</strong> {exam.endTime}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProffExam;