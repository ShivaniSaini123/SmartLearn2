import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Details = ({ email: propEmail }) => {

  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract email from URL if propEmail is not provided
  const [email, setEmail] = useState(propEmail || "");

  useEffect(() => {
    
    if (!propEmail) {
      const queryParams = new URLSearchParams(location.search);
      const emailFromUrl = queryParams.get("email");
      if (emailFromUrl) {
        setEmail(emailFromUrl);
      }
    }
  }, [propEmail, location.search]);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    yearOfStudy: "",
    semester: "",
    department: "",
    college: "",
    phone: "",
    role: "",
    identifier: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDetails = { ...formData, email };
    console.log("User Details:", userDetails);

    try {
      const response = await fetch("http://localhost:4000/api/v1/welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        alert("User created successfully!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
        alert("Error creating user: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.heading}>Enter Your Details</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
            </select>
          </div>

          {formData.role === "Student" && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Year of Study:</label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          )}

          {formData.role === "Professor" && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Semester:</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="1">3</option>
                <option value="2">4</option>
                <option value="1">5</option>
              </select>
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>College:</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              minLength={2}
              maxLength={100}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="^\d{10}$"
              required
              style={styles.input}
            />
          </div>

          {formData.role === "Student" && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Student Roll Number:</label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          )}

          {formData.role === "Professor" && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Professional Identity Number:</label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          )}

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },
  formCard: {
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  select: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};