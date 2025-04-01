import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";
import Home from "./components/pages/home";
import UserDashboard from "./components/dashboard/UserDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import Login from "./components/auth/Login";
import LoanApplication from "./components/loan/LoanApplication";
import { ThemeProvider } from "./context/ThemeContext";
import Register from "./components/auth/Register";
import Aboutus from "./components/about-us/aboutus";
import Contactus from "./components/Contact-us/contactus";
import Partner from "./components/Partner/partner";
import UserProfile from "./components/pages/UserProfile";
import "./App.css";


function App() {
  return (
    
    <ThemeProvider>
    <Router>
    <TopBar />
    <div className="mainContainer">
    <Sidebar />
      <Routes>
      
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loan-application" element={<LoanApplication />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard/>} />
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path="/contactus" element={<Contactus/>}/>
        <Route path="/partner" element={<Partner/>}/>
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
      </div>
    </Router>
  </ThemeProvider>  
    
  );
}

export default App;
