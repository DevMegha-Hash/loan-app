import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import axios from "axios";
import styles from "./Register.module.css";


const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "",phone: "" });
    const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", user);
    navigate("/login");
  };
  



  const checkPasswordStrength = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+]/.test(password);

    if (password.length < minLength) {
      setPasswordStrength('Password must be at least 8 characters long.');
    } else if (!hasUpperCase) {
      setPasswordStrength('Password must contain at least one uppercase letter.');
    } else if (!hasLowerCase) {
      setPasswordStrength('Password must contain at least one lowercase letter.');
    } else if (!hasNumbers) {
      setPasswordStrength('Password must contain at least one number.');
    } else if (!hasSpecialChars) {
      setPasswordStrength('Password must contain at least one special character.');
    } else {
      setPasswordStrength('Password is strong.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (

    <div className={styles.signupcontainer}>
    <div className={styles.signupbox}>
      <div className={styles.signupleft}>
        <h2>WELCOME BACK!</h2>
        <p>
          Please Sign Up !
        </p>
      </div>
      <div className={styles.signupright}>
        <h2>Sign Up</h2>
        <div>
          <div className={styles.inputgroup}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" value={user.name}onChange={(e) => setUser({ ...user, name: e.target.value })}/>
          </div>

          <div className={styles.inputgroup}>
            <label htmlFor="phone no">Phone No.</label>
            <input type="number" id="phone-no" placeholder="Enter your number" value={user.phone}onChange={(e) => setUser({ ...user, phone: e.target.value })}/>
            
          </div>

          <div className={styles.inputgroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" value={user.email}onChange={(e) => setUser({ ...user, email: e.target.value })}/>
            
          </div>
          <div className={styles.inputgroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passin}>
            <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter your password" value={user.password} onChange={(e) => {
  checkPasswordStrength(e.target.value);
  setUser({ ...user, password: e.target.value });
}}/><button id={styles.showpass} onClick={togglePasswordVisibility}> {showPassword ? <RxEyeOpen /> : <RiEyeCloseLine /> }</button>
            </div>
            {passwordStrength && <p className="error">{passwordStrength}</p>}
           
          </div>
          <button  className={styles.signupbtn} onClick={handleSignup}>Sign Up</button>
        </div>
        <p id={styles.footer}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  </div>


    // <div className={styles.signupContainer}>
    //   <h2>Sign Up</h2>
    //   <form className={styles.signupForm} onSubmit={handleSignup}>
    //     <input
    //       type="text"
    //       placeholder="Name"
    //       value={user.name}
    //       onChange={(e) => setUser({ ...user, name: e.target.value })}
    //       required
    //     />
    //     <input
    //       type="number"
    //       placeholder="Enter your No."
    //       value={user.phoneno}
    //       onChange={(e) => setUser({ ...user, phoneno: e.target.value })}
    //       required
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={user.email}
    //       onChange={(e) => setUser({ ...user, email: e.target.value })}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={user.password}
    //       onChange={(e) => setUser({ ...user, password: e.target.value })}
    //       required
    //     />
    //     <button type="submit">Sign Up</button>
    //   </form>
    // </div>
  );
};

export default Register;
