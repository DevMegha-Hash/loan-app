import { useState } from "react";
import axios from "axios";
import styles from "./LoanPayment.module.css";

const LoanPayment = ({ userEmail }) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/payments", {
        email: userEmail,
        amount,
      });

      setMessage(data.message);
      setAmount("");
    } catch (error) {
      setMessage("Payment failed. Try again.");
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <h3>Make a Payment</h3>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay Now</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoanPayment;
