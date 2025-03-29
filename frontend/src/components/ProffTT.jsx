import React, { useState } from "react";
import axios from "axios";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">Timetable Form</h2>

        {/* Branch Selection */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Branch:</label>
          <select
            className="w-full p-2 border rounded-lg bg-gray-700 text-white"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            {["CSE", "ME", "EE", "ECE", "CHE", "BE"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Selection */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Semester:</label>
          <select
            className="w-full p-2 border rounded-lg bg-gray-700 text-white"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            {["1", "2", "3"].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
        </div>

        {/* Update Specific Day */}
        <div className="p-4 border rounded-lg bg-gray-700 text-white shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Update Specific Day</h3>
          <label className="block text-lg mb-2">Day:</label>
          <select
            className="w-full p-2 border rounded-lg bg-gray-600 text-white mb-4"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((d) => (
              <option key={d} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>

          {subjects.map((subject, index) => (
            <div key={index} className="mb-4">
              {["subjectName", "startTime", "endTime", "location"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                  className="w-full p-2 mb-2 border rounded-lg bg-gray-600 text-white"
                  value={subject[field]}
                  onChange={(e) => handleInputChange(e, index, field)}
                />
              ))}
            </div>
          ))}

          <button className="w-full bg-yellow-500 text-gray-900 font-bold p-2 rounded-lg mb-2" onClick={addSubjectField}>
            Add Subject
          </button>
          <button className="w-full bg-green-500 text-gray-900 font-bold p-2 rounded-lg" onClick={handleDayUpdate}>
            Update Day
          </button>
        </div>

        {/* Submit Entire Timetable */}
        <div className="p-4 border rounded-lg bg-gray-700 text-white shadow-lg mt-6">
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Submit Entire Timetable</h3>
          <button className="w-full bg-purple-500 text-gray-900 font-bold p-2 rounded-lg" onClick={handleTimetableSubmit}>
            Submit Timetable
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProffTimeTable;
