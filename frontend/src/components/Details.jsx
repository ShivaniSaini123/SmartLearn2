import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Details.css";

const Details = ({ email: propEmail }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from URL if not provided as a prop
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store semester for both & yearOfStudy only for Students
    const userDetails = {
      ...formData,
      email,
      semester: formData.semester || "1", // Ensure semester is stored
      ...(formData.role === "Student" && { yearOfStudy: formData.yearOfStudy || "1" }) // Include yearOfStudy only for students
    };

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
    <div className="container">
  <div className="formCard">
    <h2 className="details-heading">Enter Your Details</h2>
    <form onSubmit={handleSubmit} className="details-form">
      <div className="details-form-group">
        <label className="details-label">Name:</label>
       <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  required
  className="input" // <- updated from "details-input"
/>

      </div>

      {/* Repeat for all fields with matching classNames */}


          <div className="formGroup">
            <label className="label">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="formGroup">
            <label className="label">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
            </select>
          </div>

          {formData.role === "Student" && (
            <div className="formGroup">
              <label className="label">Year of Study:</label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                required
                className="select"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          )}

          <div className="formGroup">
            <label className="label">Semester:</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">Select Semester</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label className="label">Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="formGroup">
            <label className="label">College:</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="formGroup">
            <label className="label">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="^\d{10}$"
              className="input"
            />
          </div>

          <div className="formGroup">
            <label className="label">
              {formData.role === "Student"
                ? "Student Roll Number"
                : "Professional Identity Number"}
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;