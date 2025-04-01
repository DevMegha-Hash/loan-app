import { FaHome,FaWpforms } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { RiContactsBook3Line,RiSettings3Line } from "react-icons/ri";
import { IoMdContacts } from "react-icons/io";
import { NavLink } from "react-router-dom";
// import {Link} from 'react-router-dom';
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>

      <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}><FaHome/>
        Home
      </NavLink>
      <NavLink to="/user-dashboard" className={({ isActive }) => (isActive ? styles.active : "")}><AiOutlineDashboard />
        Dashboard
      </NavLink>
      <NavLink to="/loan-application" className={({ isActive }) => (isActive ? styles.active : "")}><FaWpforms />
      Loan Application
      </NavLink>

      <NavLink to="/aboutus" className={({ isActive }) => (isActive ? styles.active : "")}><FcAbout />
      About Us
      </NavLink>

      <NavLink to="/contactus" className={({ isActive }) => (isActive ? styles.active : "")}><RiContactsBook3Line />
      Contact Us
      </NavLink>

      <NavLink to="/user-profile" className={({ isActive }) => (isActive ? styles.active : "")}><RiSettings3Line />
      Profile Setting
      </NavLink>
      <NavLink to="/partner" className={({ isActive }) => (isActive ? styles.active : "")}><IoMdContacts />
      Partner
      </NavLink>



    </div>
  );
};

export default Sidebar;
