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
    max-width: 450px;
    margin: 50px auto;
    padding: 25px;
    background: linear-gradient(135deg, #1a1a2e, #2a0845);
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
    font-family: 'Segoe UI', sans-serif;
    color: white;
  }

  .syllabus-form input,
  .syllabus-form textarea {
    width: 100%;
    padding: 12px;
    margin: 12px 0;
    border-radius: 8px;
    border: 1px solid #444;
    font-size: 15px;
    background-color: #111;
    color: white;
  }

  .syllabus-form input::placeholder,
  .syllabus-form textarea::placeholder {
    color: #aaa;
  }

  .syllabus-form button {
    width: 100%;
    padding: 12px;
    background: linear-gradient(to right, #7928ca, #4facfe);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .syllabus-form button:hover {
    opacity: 0.9;
  }
`}
</style>



      <form className="syllabus-form" onSubmit={handleSubmit}>
      <h2 style={{
  textAlign: 'center',
  background: 'linear-gradient(to right, #7928ca, #4facfe)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  fontSize: '26px'
}}>Add Syllabus</h2>



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
