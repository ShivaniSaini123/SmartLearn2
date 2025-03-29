import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Timetable.css';

const Timetable = ({ semester, branch }) => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch timetable data based on semester and branch
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/getTt/2/CSE`);
        setTimetable(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [semester, branch]);

  if (loading) return <p id="loading-text27">Loading...</p>;
  if (!timetable) return <p id="no-timetable-text27">Timetable not found.</p>;

  return (
    <div className="timetable-container" id="timetable-container27">
      <h2 id="timetable-header27">Timetable for {semester} - {branch}</h2>

      <div className="timetable-grid" id="timetable-grid27">
        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
          const daySchedule = timetable[day];

          return (
            <div key={day} className="day-tile" id={`day-tile-${day}27`}>
              <h3 id={`day-header-${day}27`}>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
              {daySchedule.length > 0 ? (
                daySchedule.map((subject, index) => (
                  <div key={index} className="class-info" id={`class-info-${day}-${index}27`}>
                    <h4 id={`subject-name-${day}-${index}27`}>{subject.subjectName}</h4>
                    <p id={`class-time-${day}-${index}27`}>{subject.startTime} - {subject.endTime}</p>
                    <p id={`class-location-${day}-${index}27`}>{subject.location}</p>
                  </div>
                ))
              ) : (
                <p id={`no-classes-${day}27`}>No classes scheduled.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;