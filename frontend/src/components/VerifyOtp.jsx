import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './VerifyOtp.css';

const VerifyOtp = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending OTP verification request for:", { email, otp });
      const response = await fetch("http://localhost:4000/api/v1/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("data is:", data);

      if (response.ok) {
        navigate("/details"); 
      } else {
        setError(data.message || "Verification failed, please try again");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div id="verify-container" className="flex items-center justify-center min-h-screen bg-cover bg-center text-white">
      <div id="verify-box" className="w-full max-w-lg p-8 space-y-6 bg-black/70 backdrop-blur-md rounded-lg shadow-lg">
        <h2 id="title" className="text-3xl font-semibold text-center text-gradient">
          Verify OTP
        </h2>

        {error && <p id="error-message" className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div id="input-group">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-300">Enter OTP</label>
            
            <input
              type="text"
              id="otp"
              
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              pattern="\d{6}"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            id="verify-button"
            className="w-full py-3 font-medium text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;