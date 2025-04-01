import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import styles from "./TopBar.module.css";

const TopBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    const storedProfilePic = localStorage.getItem("profilePic");

    if (token) {
      setIsLoggedIn(true);
      setUserName(storedName || "User");
      setProfilePic(storedProfilePic || "");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePic");
    setIsLoggedIn(false);
    setUserName("");
    setProfilePic("");
    navigate("/");
  };

  return (
    <div className={styles.topBar}>
      <h1 className={styles.companyName}>moneyNEST</h1>
      <div className={styles.actions}>
        <button  onClick={toggleTheme} className={styles.themeToggle}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {isLoggedIn ? (
          <button onClick={() => navigate("/login")} className={styles.loginButton}>
            Login
          </button>
        ) : (
          <div className={styles.userInfo}>
             {profilePic && <img src={profilePic} alt="Profile" className={styles.profilePic} />}
            <span className={styles.userName}>Hi, {userName}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
