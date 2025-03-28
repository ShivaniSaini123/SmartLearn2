import { useEffect, useState, useContext } from "react";
import { EmailContext } from "../contexts/EmailContext";
import "./Profile.css"; // Import the external CSS file

export default function ProfilePage() {
  const { email } = useContext(EmailContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/profile/${email}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [email]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <p><strong>Year:</strong> {user.yearOfStudy}</p>
        <p><strong>College:</strong> {user.college}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
}
