import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../contexts/EmailContext";
import './Login.css'; // Import styles for the Login component

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { setEmail: setEmails } = useContext(EmailContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const responseData = await response.json();
      console.log(responseData); // Log the full response object
      console.log("Before:", responseData?.data?.role); // Log the role inside the 'data' object
      
      if (response.ok) {
        setEmails(email);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("user", JSON.stringify({
          id: responseData.data._id,
          email: responseData.data.email,
          role: responseData.data.role,
          college: responseData.data.college,
          department: responseData.data.department,
          phone: responseData.data.phone,
          yearOfStudy: responseData.data.yearOfStudy
        }));
  
        const role = responseData?.data?.role || "Student"; // Access role from responseData.data
        console.log("Role is:", role); // Log the resolved role
  
        const targetRoute = role === "Professor" ? "/classDashBoard" : "/dashboard";
        navigate(targetRoute);
      } else {
        setError(responseData.message || "Login failed, please try again");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };
  
  
  return (
    <div id="login1-container">
      <div id="login1-card">
        <h2 id="login1-title">Login</h2>

        {error && <p id="error-message1">{error}</p>}

        <form onSubmit={handleLogin} id="login1-form">
          <div className="form1-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter You Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form1-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" id="login1-button">
            Log In
          </button>
        </form>

        <p id="login1-footer">
          Don't have an account?{" "}
          <a href="/register" id="register-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;