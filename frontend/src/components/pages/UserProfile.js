import { useState, useEffect } from "react";
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styles from "./UserProfile.module.css";

const DEFAULT_AVATAR = "https://via.placeholder.com/100";

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || DEFAULT_AVATAR);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users/profile");
        setName(data.name);
        setProfilePic(data.profilePic || DEFAULT_AVATAR);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await axios.put("http://localhost:5000/api/users/update-profile", { name });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.put("http://localhost:5000/api/users/change-password", { password });
      setMessage("Password changed successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("Failed to change password.");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2>User Profile Settings</h2>
      {message && <p className={styles.message}>{message}</p>}
      
      {/* Change Name */}
      <div className={styles.profileField}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleUpdateProfile}>Update Name</button>
      </div>

      {/* Change Password */}
      <div className={styles.profileField}>
        <label>New Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className={styles.profileField}>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      
    </div>
  );
};

export default UserProfile;
