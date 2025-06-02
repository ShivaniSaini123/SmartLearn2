import { useEffect, useState, useContext } from "react";
import { EmailContext } from "../contexts/EmailContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function ProfilePage() {
  const { email } = useContext(EmailContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/profile/${email}`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserProfile();
    } else {
      setLoading(false);
      setError("Email not provided in context");
    }
  }, [email]);

  const handleEdit = () => {
   // navigate to Details with email in state
navigate("/details", { state: { email: user.email } });

  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Department:</strong> {user.department || "-"}</p>
        <p><strong>Year Of Study:</strong> {user.yearOfStudy || "-"}</p>
        <p><strong>Semester:</strong> {user.semester || "-"}</p>
        <p><strong>College:</strong> {user.college || "-"}</p>
        <p><strong>Phone:</strong> {user.phone || "-"}</p>

        <button className="edit-btn" onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
}
