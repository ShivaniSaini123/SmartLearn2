// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './Timetable.css';
// // import { useNavigate } from "react-router-dom";
// // const Timetable = () => {
// //   const [timetable, setTimetable] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();
// //   // Fetch timetable data based on semester and branch
// //     const email = localStorage.getItem("email");
// //   useEffect(() => {
// //     const fetchTimetable = async () => {
// //       try {
// //         const profileRes = await axios.get(
// //           `http://localhost:4000/api/v1/profile/${email}`
// //         );

// //         const user = profileRes.data;
        
// //         const semester = user.semester;
// //           const branch = user.department;
// //          const response = await axios.get(
// //           `http://localhost:4000/api/v1/getTt/${semester}/${branch}`
// //         );
// // console.log(profileRes.data)
// // console.log(response.data)
// //         setTimetable(response.data);
// //         // const response = await axios.get(`http://localhost:4000/api/v1/getTt/2/CSE`);
// //         // setTimetable(response.data);
// //         // setLoading(false);
// //         } catch (error) {
// //         console.error("Error fetching timetable:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //   //   fetchTimetable();
// //   // }, [semester, branch]);
// //   if (email) {
// //       fetchTimetable();
// //     } else {
// //       setLoading(false);
// //     }

// //   }, [email]);
// //   if (loading) return <p id="loading-text27">Loading...</p>;
// //   if (!timetable) return <p id="no-timetable-text27">Timetable not found.</p>;

// //   return (
// //     <div className="timetable-container" id="timetable-container27">
// //       <h2 id="timetable-header27">Timetable</h2>
// //  {/* Go Back Button */}
// //       <button
// //         type="button"
// //         className="go-back-btn"
// //         onClick={() => navigate(-1)}
// //         style={{
// //           marginBottom: "15px",
// //           padding: "8px 16px",
// //           background: "linear-gradient(120deg, #a078d4, #7e5dbf)",
// //           color: "white",
// //           border: "none",
// //           borderRadius: "8px",
// //           cursor: "pointer",
// //           fontWeight: "bold",
// //         }}
// //       >
// //         ← Go Back
// //       </button>
// //       <div className="timetable-grid" id="timetable-grid27">
// //         {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
// //           const daySchedule = timetable[day];

// //           return (
// //             <div key={day} className="day-tile" id={`day-tile-${day}27`}>
// //               <h3 id={`day-header-${day}27`}>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
// //               {daySchedule && daySchedule.length > 0 ? (
// //                 daySchedule.map((subject, index) => (
// //                   <div key={index} className="class-info" id={`class-info-${day}-${index}27`}>
// //                     <h4 id={`subject-name-${day}-${index}27`}>{subject.subjectName}</h4>
// //                     <p id={`class-time-${day}-${index}27`}>{subject.startTime} - {subject.endTime}</p>
// //                     <p id={`class-location-${day}-${index}27`}>{subject.location}</p>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <p id={`no-classes-${day}27`}>No classes scheduled.</p>
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Timetable;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Timetable.css";
// import { useNavigate } from "react-router-dom";

// const Timetable = () => {
//   const [timetable, setTimetable] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   const email = localStorage.getItem("email");

//   useEffect(() => {
//     const fetchTimetable = async () => {
//   try {
//     console.log("EMAIL:", email);

//     const profileRes = await axios.get(
//       `http://localhost:4000/api/v1/profile/${email}`
//     );

//     console.log("PROFILE RESPONSE:", profileRes.data);

//     const user = profileRes.data;

//     const semester = String(user.semester).trim();
//     const branch = String(user.department).trim();

//     console.log("SEMESTER:", semester);
//     console.log("BRANCH:", branch);

//     const response = await axios.get(
//       `http://localhost:4000/api/v1/getTt/${semester}/${branch}`
//     );

//     console.log("TIMETABLE RESPONSE:", response.data);

//     setTimetable(response.data);

//     console.log("STATE SHOULD UPDATE NOW");

//   } catch (error) {
//     console.log("FULL ERROR:");
//     console.log(error);

//     if (error.response) {
//       console.log(error.response.data);
//     }
//   } finally {
//     setLoading(false);
//   }
// };

//     if (email) {
//       fetchTimetable();
//     } else {
//       setLoading(false);
//     }
//   }, [email]);

//   if (loading) {
//     return <p id="loading-text27">Loading...</p>;
//   }

//   if (!timetable) {
//     return <p id="no-timetable-text27">Timetable not found.</p>;
//   }

//   return (
//     <div className="timetable-container" id="timetable-container27">
//       <h2 id="timetable-header27">Timetable</h2>

//       {/* Go Back Button */}
//       <button
//         type="button"
//         className="go-back-btn"
//         onClick={() => navigate(-1)}
//         style={{
//           marginBottom: "15px",
//           padding: "8px 16px",
//           background: "linear-gradient(120deg, #a078d4, #7e5dbf)",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           fontWeight: "bold",
//         }}
//       >
//         ← Go Back
//       </button>

//       <div className="timetable-grid" id="timetable-grid27">
//         {[
//           "monday",
//           "tuesday",
//           "wednesday",
//           "thursday",
//           "friday",
//           "saturday",
//           "sunday",
//         ].map((day) => {
//           const daySchedule = timetable[day];

//           return (
//             <div
//               key={day}
//               className="day-tile"
//               id={`day-tile-${day}27`}
//             >
//               <h3 id={`day-header-${day}27`}>
//                 {day.charAt(0).toUpperCase() + day.slice(1)}
//               </h3>

//               {daySchedule && daySchedule.length > 0 ? (
//                 daySchedule.map((subject, index) => (
//                   <div
//                     key={index}
//                     className="class-info"
//                     id={`class-info-${day}-${index}27`}
//                   >
//                     <h4 id={`subject-name-${day}-${index}27`}>
//                       {subject.subjectName}
//                     </h4>

//                     <p id={`class-time-${day}-${index}27`}>
//                       {subject.startTime} - {subject.endTime}
//                     </p>

//                     <p id={`class-location-${day}-${index}27`}>
//                       {subject.location}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p id={`no-classes-${day}27`}>
//                   No classes scheduled.
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Timetable;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Timetable.css";
import { useNavigate } from "react-router-dom";

const Timetable = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        // GET PROFILE FROM LOCAL STORAGE
        const storedProfile = JSON.parse(
          localStorage.getItem("userProfile")
        );

        console.log("STORED PROFILE:", storedProfile);

        if (!storedProfile) {
          console.log("No profile found in localStorage");
          return;
        }

        // GET SEMESTER AND BRANCH
        const semester = String(storedProfile.semester).trim();
        const branch = String(storedProfile.department).trim();

        console.log("SEMESTER:", semester);
        console.log("BRANCH:", branch);

        // FETCH TIMETABLE
        const response = await axios.get(
          `http://localhost:4000/api/v1/getTt/${semester}/${branch}`
        );

        console.log("TIMETABLE RESPONSE:", response.data);

        setTimetable(response.data);

      } catch (error) {
        console.error("Error fetching timetable:", error);

        if (error.response) {
          console.log(error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  if (loading) {
    return <p id="loading-text27">Loading...</p>;
  }

  if (!timetable) {
    return <p id="no-timetable-text27">Timetable not found.</p>;
  }

  return (
    <div className="timetable-container" id="timetable-container27">
      <h2 id="timetable-header27">Timetable</h2>

      {/* GO BACK BUTTON */}
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

      <div className="timetable-grid" id="timetable-grid27">
        {[
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ].map((day) => {
          const daySchedule = timetable[day];

          return (
            <div
              key={day}
              className="day-tile"
              id={`day-tile-${day}27`}
            >
              <h3 id={`day-header-${day}27`}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </h3>

              {daySchedule && daySchedule.length > 0 ? (
                daySchedule.map((subject, index) => (
                  <div
                    key={index}
                    className="class-info"
                    id={`class-info-${day}-${index}27`}
                  >
                    <h4 id={`subject-name-${day}-${index}27`}>
                      {subject.subjectName}
                    </h4>

                    <p id={`class-time-${day}-${index}27`}>
                      {subject.startTime} - {subject.endTime}
                    </p>

                    <p id={`class-location-${day}-${index}27`}>
                      {subject.location}
                    </p>
                  </div>
                ))
              ) : (
                <p id={`no-classes-${day}27`}>
                  No classes scheduled.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;