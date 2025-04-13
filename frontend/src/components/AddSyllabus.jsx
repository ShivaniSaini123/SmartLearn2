import React, { useState } from 'react';

function AddSyllabus() {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [syllabus, setSyllabus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!branch || !semester || !subject || !syllabus) {
      alert('All fields are required.');
      return;
    }
  
    const syllabusData = {
      branchName: branch,
      semesters: [
        {
          semesterNumber: parseInt(semester),
          subjects: [
            {
              subjectName: subject,
              chapters: [
                {
                  chapterName: 'Introduction', // or make this a field
                  resources: {
                    studyMaterialLink: syllabus,
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  
    try {
      const response = await fetch('http://localhost:4000/api/syllabus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(syllabusData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        alert('Failed to add syllabus.');
        return;
      }
  
      const data = await response.json();
      console.log('Success:', data);
      alert('Syllabus added successfully.');
      setBranch('');
      setSemester('');
      setSubject('');
      setSyllabus('');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the syllabus.');
    }
  };
  
  return (
    <>
      <style>
  {`
    .syllabus-form {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      background: rgb(245, 241, 241);
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      font-family: Arial, sans-serif;
      color: black; /* Ensures form text is black */
    }

    .syllabus-form input,
    .syllabus-form textarea {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 16px;
      color: black; /* Input and textarea text color */
    }

    .syllabus-form button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }

    .syllabus-form button:hover {
      background-color: #0056b3;
    }
  `}
</style>


      <form className="syllabus-form" onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'center', color: 'black' }}>Add Syllabus</h2>


        <input
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Branch"
        />
        <input
          type="text"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          placeholder="Semester"
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
        />
        <textarea
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
          placeholder="Syllabus Details"
          rows={4}
        />
        <button type="submit">Add Syllabus</button>
      </form>
    </>
  );
}

export default AddSyllabus;
