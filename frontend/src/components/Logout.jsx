import axios from "axios";

export const handleLogout = async (navigate, setEmail, setBranch) => {
  try {
    await axios.post("http://localhost:4000/api/v1/logout", {
      withCredentials: true
    });

    setEmail(null);
    setBranch(null);
    navigate("/login");
  } catch (error) {
    console.error(error);
    alert("Logout failed");
  }
};
