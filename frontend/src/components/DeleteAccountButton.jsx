// src/components/DeleteAccountButton.jsx
import axios from "axios";

export const handleDeleteAccount = async (email, navigate, setEmail, setBranch) => {
  if (!email) {
    alert("No email found. Please login.");
    return;
  }

  if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

  try {
    // send email in request body
    await axios.delete("http://localhost:4000/api/v1/delete-account", {
      data: { email },
      withCredentials: true, // harmless if you have cookies; keeps options consistent
    });

    // clear context + localStorage
    setEmail(null);
    setBranch(null);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("user");

    alert("Account deleted. Please register again.");
    navigate("/register");
  } catch (err) {
    console.error("Delete Error:", err);
    const msg = err?.response?.data?.message || "Failed to delete account";
    alert(msg);
  }
};
