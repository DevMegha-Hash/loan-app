import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PaymentHistory.module.css";

const PaymentHistory = ({ userEmail }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/payments?email=${userEmail}`);
      setPayments(data);
    };

    fetchPayments();
  }, [userEmail]);

  return (
    <div className={styles.historyContainer}>
      <h3>Payment History</h3>
      {payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <ul className={styles.paymentList}>
          {payments.map((payment) => (
            <li key={payment._id}>
              <span>Amount: ${payment.amount}</span>
              <span>Date: {new Date(payment.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentHistory;
