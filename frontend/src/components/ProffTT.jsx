import React, { useState } from "react";
import axios from "axios";
import "./ProffTT.css";

const initialSubjectState = { subjectName: "", startTime: "", endTime: "", location: "" };

const ProffTimeTable = () => {
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("1");
  const [day, setDay] = useState("monday");
  const [subjects, setSubjects] = useState([initialSubjectState]);

  const handleInputChange = (e, index, field) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((sub, i) => (i === index ? { ...sub, [field]: e.target.value } : sub))
    );
  };

  const addSubjectField = () => setSubjects([...subjects, initialSubjectState]);

  const handleTimetableSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/createOrUpdateTimetable", {
        semester,
        branch,
        schedule: { [day]: subjects },
      });
      alert("Timetable submitted: " + response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error submitting timetable");
    }
  };

  const handleDayUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/updateDaySchedule/${semester}/${branch}/${day}`,
        { subjects }
      );
      alert("Day updated: " + response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error updating day");
    }
  };

  return (
<div className="timetable-page">
  <div className="timetable-container">
    <h2 className="timetable-title">Timetable Form</h2>

    {/* Branch Select */}
    <div className="form-group">
      <label>Branch:</label>
      <select className="form-input" value={branch} onChange={(e) => setBranch(e.target.value)}>
        {["CSE", "ME", "EE", "ECE", "CHE", "BE"].map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
    </div>

    {/* Semester Select */}
    <div className="form-group">
      <label>Semester:</label>
      <select className="form-input" value={semester} onChange={(e) => setSemester(e.target.value)}>
        {["1", "2", "3"].map((s) => (
          <option key={s} value={s}>Semester {s}</option>
        ))}
      </select>
    </div>

    {/* Day Update Section */}
    <div className="section-card">
      <h3 className="section-title">Update Specific Day</h3>

      <label>Day:</label>
      <select className="form-input" value={day} onChange={(e) => setDay(e.target.value)}>
        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((d) => (
          <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
        ))}
      </select>

      {subjects.map((subject, index) => (
        <div key={index} className="subject-card">
          {["subjectName", "startTime", "endTime", "location"].map((field) => (
            <input
              key={field}
              type="text"
              className="form-input small"
              placeholder={field.replace(/([A-Z])/g, " $1").trim()}
              value={subject[field]}
              onChange={(e) => handleInputChange(e, index, field)}
            />
          ))}
        </div>
      ))}

      <button className="form-button add" onClick={addSubjectField}>Add Subject</button>
      <button className="form-button update" onClick={handleDayUpdate}>Update Day</button>
    </div>

    {/* Submit Full Timetable */}
    <div className="section-card mt">
      <h3 className="section-title">Submit Entire Timetable</h3>
      <button className="form-button submit" onClick={handleTimetableSubmit}>Submit Timetable</button>
    </div>
  </div>
</div>

  );
};

export default ProffTimeTable;
