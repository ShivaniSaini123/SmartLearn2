import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Assignment.css"; 
import AddAssignmentForm from "./AddAssignmentForm"; // Import the form component

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState([]);
  const [groupedAssignments, setGroupedAssignments] = useState({});
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(null); // Track form visibility

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/assignments");
      const fetchedAssignments = response.data;

      if (!Array.isArray(fetchedAssignments)) {
        console.error("Invalid API response: Expected an array", fetchedAssignments);
        return;
      }

      setAssignments(fetchedAssignments);

      const grouped = fetchedAssignments.reduce((acc, assignment) => {
        acc[assignment.branch] = acc[assignment.branch] || [];
        acc[assignment.branch].push(assignment);
        return acc;
      }, {});

      setGroupedAssignments(grouped);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="assignments-container">
      <h1 className="title">All Assignments</h1>

      <div className="scrollable-content">
        {Object.keys(groupedAssignments).length > 0 ? (
          Object.keys(groupedAssignments).map((branch, index) => (
            <div key={index} className="branch-section">
              <h3 
                className="branch-title"
                onClick={() => setSelectedBranch(branch === selectedBranch ? null : branch)}
                style={{ cursor: "pointer" }}
              >
                {branch} Assignments
              </h3>

              <button 
                className="submit-btn" 
                onClick={() => setShowSubmissionForm(branch === showSubmissionForm ? null : branch)}
              >
                {showSubmissionForm === branch ? "Close Form" : "Submit Assignment"}
              </button>

              {showSubmissionForm === branch && <AddAssignmentForm refreshAssignments={fetchAssignments} />} 

              {selectedBranch === branch && (
                <ul className="assignments-list">
                  {groupedAssignments[branch].map((assignment, idx) => (
                    <li key={idx} className="assignment-card">
                      <h4>{assignment.subject} - {assignment.chapter}</h4>
                      <p><strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleString()}</p>
                      <p><strong>Professor:</strong> {assignment.professorName}</p>
                      <p><strong>Description:</strong> {assignment.description}</p>
                      {assignment.attachments && assignment.attachments.length > 0 && (
                        <div>
                          <h5>Attachments:</h5>
                          <ul className="attachments-list">
                            {assignment.attachments.map((file, fileIdx) => (
                              <li key={fileIdx}>
                                <a href={`http://localhost:4000${file.url}`} target="_blank" rel="noopener noreferrer">
                                  {file.filename}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="no-assignments">No assignments found.</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentsList;
