// import React, { useState, useEffect, useCallback } from "react";
// import "./Goals.css";

// const Goals = () => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     type: "daily",
//     priority: "medium",
//     deadline: "",
//     userId: "", // fetched from localStorage
//   });

//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [goals, setGoals] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [deadlineError, setDeadlineError] = useState("");
//   const [goalBeingEdited, setGoalBeingEdited] = useState(null);
//   const [editForm, setEditForm] = useState({
//   title: "",
//   description: "",
//   type: "daily",
//   priority: "medium",
//   deadline: "",
// });


//   // Set today's date on mount
//   useEffect(() => {
//     const today = new Date().toISOString().split("T")[0];
//     setSelectedDate(today);
//   }, []);

//   // Fetch user from localStorage
//   useEffect(() => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (storedUser?.email) {
//         setForm((prevForm) => ({
//           ...prevForm,
//           userId: storedUser.email,
//         }));
//       }
//     } catch (err) {
//       console.error("Error reading user from localStorage", err);
//     }
//   }, []);
//   console.log("User ID:", form.userId);
//   console.log("Selected Date:", selectedDate);
  
//   // Fetch goals from backend
//   const fetchGoals = useCallback(async (selectedDate) => {
//     if (!form.userId || !selectedDate) {
//       console.log("Skipping fetch, userId or date missing.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/v1/goals/${form.userId}?date=${selectedDate}`
//       );

//       if (!res.ok) throw new Error(`Server returned ${res.status}`);
//       const result = await res.json();

//       console.log("Fetched goals response:", result);  // Log entire response
//       setGoals(result || []);  // Ensure the response has `data`
//     } catch (err) {
//       console.error("Error fetching goals:", err);
//       alert("❌ Could not fetch goals.");
//     } finally {
//       setLoading(false);
//     }
// }, [form.userId, selectedDate]);


//   // Fetch goals whenever userId or selectedDate changes
//   useEffect(() => {
//     if (form.userId && selectedDate) {
//       fetchGoals(selectedDate);
//     }
//   }, [form.userId, selectedDate, fetchGoals]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (e.target.name === "deadline") {
//       setDeadlineError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const deadlineDate = new Date(form.deadline);
//     if (isNaN(deadlineDate)) {
//       setDeadlineError("Please enter a valid deadline.");
//       setLoading(false);
//       return;
//     }

//     if (!form.userId) {
//       alert("User ID missing. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:4000/api/v1/goals", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         alert("✅ Goal added!");
//         setForm((prev) => ({
//           ...prev,
//           title: "",
//           description: "",
//           deadline: "",
//         }));
//         fetchGoals(selectedDate); // refresh goals
//       } else {
//         alert("❌ Error: " + (result.message || result.error));
//       }
//     } catch (err) {
//       console.error("Submit error:", err);
//       alert("❌ Server error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (goalId) => {
//     const confirm = window.confirm("Are you sure you want to delete this goal?");
//     if (!confirm) return;
  
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:4000/api/v1/goals/${goalId}`, {
//         method: "DELETE",
//       });
  
//       const result = await res.json();
  
//       if (res.ok) {
//         alert("✅ Goal deleted!");
//         fetchGoals(selectedDate); // Refresh list
//       } else {
//         alert("❌ Error: " + (result.message || result.error));
//       }
//     } catch (err) {
//       console.error("Error deleting goal:", err);
//       alert("❌ Could not delete goal.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!goalBeingEdited) return;
  
//     try {
//       const res = await fetch(`http://localhost:4000/api/v1/goals/${goalBeingEdited}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editForm),
//       });
  
//       const result = await res.json();
  
//       if (res.ok) {
//         alert("✅ Goal updated!");
//         setGoalBeingEdited(null);
//         fetchGoals(selectedDate);
//       } else {
//         alert("❌ Error: " + (result.message || result.error));
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("❌ Failed to update goal.");
//     }
//   };
  
//   const handleEditClick = (goal) => {
//     setGoalBeingEdited(goal._id);
//     setEditForm({
//       title: goal.title,
//       description: goal.description,
//       type: goal.type,
//       priority: goal.priority,
//       deadline: goal.deadline.split("T")[0], // Format date
//     });
//   };
  
  

//   return (
//     <div className="goal-container">
//       <h2>My Goals</h2>
//       <button className="add-goal-btn" onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Cancel" : "Set Goal"}
//       </button>

//       {showForm && (
//         <form className="goal-form" onSubmit={handleSubmit}>
//           <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Goal Title"
//             required
//           />
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Description"
//           />
//           <select name="type" value={form.type} onChange={handleChange}>
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//           </select>
//           <select name="priority" value={form.priority} onChange={handleChange}>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//           <input
//             type="date"
//             name="deadline"
//             value={form.deadline}
//             onChange={handleChange}
//           />
//           {deadlineError && <p className="error">{deadlineError}</p>}
//           <button type="submit" disabled={loading}>
//             {loading ? "Adding..." : "Add Goal"}
//           </button>
//         </form>
//       )}

//       <div className="date-filter">
//         <label htmlFor="goal-date">Filter by Date: </label>
//         <input
//           type="date"
//           id="goal-date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />
//       </div>

//       <div className="goal-list">
//         <h3>Goals:</h3>
//         {console.log("Goals array:", goals)}
//         {goals.length === 0 ? (
//           <p>No goals for this date.</p>
//         ) : (
//           goals.map((goal) => (
//             <div key={goal._id} className="goal-item">
//               <h4>{goal.title}</h4>
//               <p>{goal.description}</p>
//               <p>Priority: {goal.priority}</p>
//               <p>Type: {goal.type}</p>
//               <p>Deadline: {goal.deadline}</p>
//               <button onClick={() => handleEditClick(goal)}>✏ Edit</button>
//               <button onClick={() => handleDelete(goal._id)} className="delete-btn">
//                 🗑 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Goals;
import React, { useState, useEffect, useCallback } from "react";
import "./Goals.css";

const Goals = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "daily",
    priority: "medium",
    deadline: "",
    userId: "",
  });

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [goals, setGoals] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const [goalBeingEdited, setGoalBeingEdited] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    type: "daily",
    priority: "medium",
    deadline: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.email) {
        setForm((prevForm) => ({
          ...prevForm,
          userId: storedUser.email,
        }));
      }
    } catch (err) {
      console.error("Error reading user from localStorage", err);
    }
  }, []);

  const fetchGoals = useCallback(async (date) => {
    if (!form.userId || !date) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/goals/${form.userId}?date=${date}`
      );
      const result = await res.json();
      setGoals(result || []);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ Failed to fetch goals.");
    } finally {
      setLoading(false);
    }
  }, [form.userId]);

  useEffect(() => {
    if (form.userId && selectedDate) {
      fetchGoals(selectedDate);
    }
  }, [form.userId, selectedDate, fetchGoals]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "deadline") setDeadlineError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const deadlineDate = new Date(form.deadline);
    if (isNaN(deadlineDate)) {
      setDeadlineError("Please enter a valid deadline.");
      return;
    }

    if (!form.userId) {
      alert("User ID missing.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/v1/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Goal added!");
        setForm((prev) => ({
          ...prev,
          title: "",
          description: "",
          deadline: "",
        }));
        fetchGoals(selectedDate);
      } else {
        alert("❌ Error: " + (result.message || result.error));
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (goalId) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/v1/goals/${goalId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Goal deleted!");
        fetchGoals(selectedDate);
      } else {
        alert("❌ Error: " + (result.message || result.error));
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Could not delete goal.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (goal) => {
    setGoalBeingEdited(goal._id);
    setEditForm({
      title: goal.title,
      description: goal.description,
      type: goal.type,
      priority: goal.priority,
      deadline: goal.deadline.split("T")[0],
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!goalBeingEdited) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/v1/goals/${goalBeingEdited}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Goal updated!");
        setGoalBeingEdited(null);
        fetchGoals(selectedDate);
      } else {
        alert("❌ Error: " + (result.message || result.error));
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update goal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="goal-container">
      <h2>🎯 My Goals</h2>
      <button className="add-goal-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "➕ Set Goal"}
      </button>

      {showForm && (
        <form className="goal-form" onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Goal Title"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
          />
          {deadlineError && <p className="error">{deadlineError}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Goal"}
          </button>
        </form>
      )}

      <div className="date-filter">
        <label htmlFor="goal-date">📅 Filter by Date:</label>
        <input
          type="date"
          id="goal-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="goal-list">
        <h3>📌 Goals:</h3>
        {loading ? (
          <p>Loading goals...</p>
        ) : goals.length === 0 ? (
          <p>No goals for this date.</p>
        ) : (
          goals.map((goal) => (
            <div key={goal._id} className="goal-item">
              {goalBeingEdited === goal._id ? (
                <form className="edit-form" onSubmit={handleUpdate}>
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    required
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                  />
                  <select name="type" value={editForm.type} onChange={handleEditChange}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <select
                    name="priority"
                    value={editForm.priority}
                    onChange={handleEditChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="date"
                    name="deadline"
                    value={editForm.deadline}
                    onChange={handleEditChange}
                    required
                  />
                  <button type="submit">💾 Save</button>
                  <button type="button" onClick={() => setGoalBeingEdited(null)}>
                    ❌ Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h4>{goal.title}</h4>
                  <p>{goal.description}</p>
                  <p>Type: {goal.type}</p>
                  <p>Priority: {goal.priority}</p>
                  <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                  <button onClick={() => handleEditClick(goal)}>✏ Edit</button>
                  <button onClick={() => handleDelete(goal._id)} className="delete-btn">
                    🗑 Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Goals;
