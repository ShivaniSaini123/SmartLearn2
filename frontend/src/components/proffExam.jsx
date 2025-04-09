import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-600">Exam Timetable Management</h2>

      <form className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch:</label>
          <select
            value={branch}
            onChange={handleBranchChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EE">EE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester:</label>
          <input
            type="number"
            value={semester}
            onChange={handleSemesterChange}
            placeholder="Enter semester number"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Exams</h3>
          {exams.map((exam, index) => (
            <div key={index} className="mt-4 p-4 border rounded-md bg-white shadow-sm space-y-2">
              <input
                type="text"
                placeholder="Subject"
                value={exam.subject}
                onChange={(e) => handleExamChange(index, 'subject', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              />

              <input
                type="date"
                value={exam.date}
                onChange={(e) => handleExamChange(index, 'date', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              />

              <div className="flex space-x-2">
                <input
                  type="time"
                  value={exam.startTime}
                  onChange={(e) => handleExamChange(index, 'startTime', e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                />
                <input
                  type="time"
                  value={exam.endTime}
                  onChange={(e) => handleExamChange(index, 'endTime', e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addExamRow}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Another Exam
          </button>
        </div>

        <button
          onClick={handleAddTimetable}
          className="w-full mt-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Submit Timetable
        </button>
      </form>

      <form className="text-center">
        <h2 className="text-xl font-bold mb-4">Get Timetable</h2>
        <button
          onClick={handleGetTimetable}
          className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Fetch Timetable
        </button>
      </form>

      {timetable && (
        <div className="mt-8 p-6 border rounded-md bg-white shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-center text-blue-700">
            Timetable for {timetable.branch}, Semester {timetable.semester}
          </h3>
          <div className="space-y-4">
            {timetable.exams.map((exam, index) => (
              <div key={index} className="p-4 border-b border-gray-200">
                <p className="text-sm font-medium">Subject: {exam.subject}</p>
                <p className="text-sm">Date: {new Date(exam.date).toLocaleDateString()}</p>
                <p className="text-sm">Start Time: {exam.startTime}</p>
                <p className="text-sm">End Time: {exam.endTime}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProffExam;