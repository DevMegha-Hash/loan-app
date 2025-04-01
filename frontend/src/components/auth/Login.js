import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      res.data.role === "admin" ? navigate("/admin-dashboard") : navigate("/user-dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className={styles.logincontainer}>
    <div className={styles.loginbox}>
      <div className={styles.loginleft}>
        <h2>Login</h2>
  
          <div className={styles.Sinputgroup}>
            <label htmlFor="username">Username</label>
            <input type="email" id="username" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.Sinputgroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passin}>
            <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
           <button id={styles.showpass} onClick={togglePasswordVisibility}> {showPassword ? <RxEyeOpen /> : <RiEyeCloseLine /> }</button></div>
          </div>
          <button  className={styles.loginbtn} onClick={handleSubmit}>Login</button>
      
        <p>
          Don’t have an account? <Link to={"/register"}>Sign Up</Link>
        </p>
      </div>
      <div className={styles.loginright}>
        <h2>WELCOME BACK!</h2>
        <p>
          Please Login !
        </p>
      </div>
    </div>
  </div>







  // const [phone, setPhone] = useState("");
  // const [otp, setOtp] = useState("");
  // const [otpSent, setOtpSent] = useState(false);
  // const [message, setMessage] = useState("");
  // const [error, setError] = useState("");

//   // Send OTP to phone number
//   const sendOtp = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/otp/send-otp", { phone });
//       setOtpSent(true);
//       setMessage("OTP sent successfully!");
//       setError("");
//     } catch (error) {
//       setError("Failed to send OTP. Please check the phone number.");
//     }
//   };

//   // Verify OTP and login
//   const verifyOtp = async () => {
//     try {
//       const { data } = await axios.post("http://localhost:5000/api/otp/verify-otp", { phone, otp });

//       setMessage("Login successful!");
//       navigate(data.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
//     } catch (error) {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   // Email & Password Login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });

//       // Store user details in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("userName", data.name);
//       localStorage.setItem("profilePic", data.profilePic);

//       setMessage("Login successful!");
//       navigate(data.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
//     } catch (error) {
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>

//       {/* Email & Password Login Section */}
//       <form onSubmit={handleLogin}>
//       <h2>Login</h2>

// {/* OTP Login Section */}
// <div>
//   <input type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
//   <button type="button" onClick={sendOtp}>Send OTP</button>
// </div>

// {otpSent && (
//   <div>
//     <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
//     <button type="button" onClick={verifyOtp}>Verify OTP</button>
//   </div>
// )}

//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Login</button>

//            {/* Display Messages */}
//       {message && <p className={styles.message}>{message}</p>}
//       {error && <p className={styles.error}>{error}</p>}

//       <p>
//         Don’t have an account? <NavLink to={"/register"}>Sign Up</NavLink>
//       </p>

//       </form>

   
//       </div>
   
  );
};

export default Login;
