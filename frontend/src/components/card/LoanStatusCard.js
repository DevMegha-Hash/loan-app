import React, { useEffect, useState } from "react";
import axios from "axios";
// import styles from "./LoanStatusCard.module.css";

const LoanStatusCard = () => {
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
      console.log("Token =>", localStorage.getItem("token"));
      const fetchUserDashboard = async () => {
          try {
              const token = localStorage.getItem("token");
              const res = await axios.get("http://localhost:5000/api/user/dashboard", {
              headers: { Authorization: `Bearer ${token}` },
              });

              setUser(res.data.user);
              setLoans(res.data.loans);
          } catch (error) {
              console.error("Error fetching dashboard data", error);
              // alert("Failed to load user dashboard");
          }
      };

      fetchUserDashboard();
  }, []);
  return (
    <div className="dashboard-container">
    {user ? (
        <>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <h3>Your Loans:</h3>
            {loans.length > 0 ? (
                <ul>
                    {loans.map((loan) => (
                        <li key={loan._id}>
                            <strong>Amount:</strong> ${loan.amount} - <strong>Status:</strong> {loan.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No loans applied yet.</p>
            )}
        </>
    ) : (
        <p>Loading user data...</p>
    )}
</div>


    // <div className={`${styles.card} ${styles[loan.status.toLowerCase()]}`}>
    //   <h4>{loan.loanType}</h4>
    //   <p>Amount: ${loan.loanAmount}</p>
    //   <p>Duration: {loan.loanDuration} months</p>
    //   <p>Status: {loan.status}</p>
    // </div>
  );
};

export default LoanStatusCard;
