import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";
import Card from "../card/Card";
import { FaWallet, FaClock, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/loans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // setLoans(res.data);
      } catch (err) {
        alert("Failed to fetch loans");
      }
    };
    fetchLoans();
  }, []);

  const sendReminder = async () => {
    try {
      await axios.post("http://localhost:5000/api/payment-reminder/send-reminder");
      setMessage("Payment reminders sent successfully!");
    } catch (error) {
      setMessage("Failed to send reminders.");
    }
  };

  return (
    <div className={styles.adminContainer}>

        <h2>Admin Dashboard</h2>

        <div className={styles.cardContainer}>
        <Card title="Active Loans" value="1" subtitle="Active Loans" color="blue" icon={<FaWallet />} />
          <Card title="Pending Loans" value="0" subtitle="Pending Loans" color="yellow" icon={<FaClock />} />
          <Card title="Defaulted Loans" value="0" subtitle="Defaulted Loans" color="red" icon={<FaTimesCircle />} />
          <Card title="Fully Paid Loans" value="0" subtitle="Fully Paid Loans" color="green" icon={<FaCheckCircle />} />
        </div>

      <h2>Loan Applications</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Amount</th>
            <th>Duration</th>
            <th>ID Proof</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>{app.phone}</td>
              <td>${app.loanAmount}</td>
              <td>{app.loanDuration} months</td>
              <td>
                <a href={`data:${app.idProof.contentType};base64,${Buffer.from(app.idProof.data).toString("base64")}`} download="ID_Proof.pdf">
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={sendReminder}>Send Payment Reminder</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminDashboard;
