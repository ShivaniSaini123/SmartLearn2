
import React, { useState } from 'react';
import axios from 'axios';
import "./proffAddAssi.css";

const AddAssignment = () => {
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


//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-center mb-4">Add Assignment</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
//           <select name="branch" value={assignmentData.branch} onChange={handleChange} className="w-full p-2 border rounded" required>
//             <option value="">Select Branch</option>
//             {branches.map((branch) => (
//               <option key={branch} value={branch}>{branch}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
//           <select name="semester" value={assignmentData.semester} onChange={handleChange} className="w-full p-2 border rounded" required>
//             <option value="">Select Semester</option>
//             {semesters.map((semester) => (
//               <option key={semester} value={semester}>{semester}</option>
//             ))}
//           </select>
//         </div>

//         <input type="text" name="assignmentNumber" value={assignmentData.assignmentNumber} onChange={handleChange} placeholder="Assignment Number" className="w-full p-2 border rounded mb-4" required />
//         <input type="text" name="subject" value={assignmentData.subject} onChange={handleChange} placeholder="Subject" className="w-full p-2 border rounded mb-4" required />
//         <input type="text" name="chapter" value={assignmentData.chapter} onChange={handleChange} placeholder="Chapter" className="w-full p-2 border rounded mb-4" required />
//         <input type="datetime-local" name="deadline" value={assignmentData.deadline} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
//         <input type="text" name="professorName" value={assignmentData.professorName} onChange={handleChange} placeholder="Professor Name" className="w-full p-2 border rounded mb-4" required />
//         <textarea name="description" value={assignmentData.description} onChange={handleChange} placeholder="Assignment Description" className="w-full p-2 border rounded mb-4" required />
        
//         {/* File Upload Input */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Assignment File</label>
//           <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" required />
//         </div>

//         <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Assignment</button>
//       </form>
//     </div>
//   );
// };

// export default AddAssignment;

return (
    <div className="assignment-page">
      <div className="assignment-container">
        <h2>Add Assignment</h2>
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