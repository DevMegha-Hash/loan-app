import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import LoanStatusCard from "../card/LoanStatusCard";
import CreditScore from "../loan/CraditScore";
import LoanPayment from "../loan/LoanPayment";
import PaymentHistory from "../loan/PaymentHistory";
import styles from "./UserDashboard.module.css";

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [creditScore, setCreditScore] = useState(0);
  const userEmail = "user@example.com"; // Replace with authenticated user's email
  const userName = "Arnab Sardar";

  useEffect(() => {
    // Fetch user's loans
    const fetchLoans = async () => {
        try {
          const token = localStorage.getItem("token"); // Get token from local storage
          const { data } = await axios.get("http://localhost:5000/api/loans", {
            headers: { Authorization: `Bearer ${token}` }, // Send token in headers
          });
      
          console.log("Loans Data:", data);
        } catch (error) {
          console.error("Error fetching loans:", error.response?.data || error.message);
        }
      };

    // Fetch credit score
    const fetchCreditScore = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/users/credit-score?email=${userEmail}`);
      setCreditScore(data.score);
    };

    fetchLoans();
    fetchCreditScore();
  }, []);

  return (
    <div className={styles.userdashboard}>
      <h2>Welcome to Your Dashboard</h2>
      <h3>HI , {userName}</h3>
      <div className={styles.usercontainer}>
      
      <div className={styles.creditscore}>
      <CreditScore score={creditScore} />
      </div>
      
      <div className={styles.loanCards}>
      <h3>Your Loan Applications</h3>
        <LoanStatusCard />

        {/* {loans.map((loan) => (
          <LoanStatusCard key={loan._id} loan={loan} />
        ))} */}
      </div>
      <div className={styles.payment}>
      <LoanPayment userEmail={userEmail} />
      <PaymentHistory userEmail={userEmail} />
      </div>
      </div>
    </div>
  );
};

export default UserDashboard;
