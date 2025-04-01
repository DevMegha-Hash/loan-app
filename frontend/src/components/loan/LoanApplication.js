import { useState } from "react";
import axios from "axios";
import styles from "./LoanApplication.module.css";

const LoanApplication = () => {
  const [loanType, setLoanType] = useState("Personal Loan");
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    loanAmount: "",
    loanDuration: "",
    idProof: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, idProof: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("loanType", loanType);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("loanAmount", formData.loanAmount);
    formDataToSend.append("loanDuration", formData.loanDuration);
    formDataToSend.append("idProof", formData.idProof);

    try {
      await axios.post("http://localhost:5000/api/loans", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Loan Application Submitted Successfully!");
    } catch (error) {
      console.error("Error submitting loan application", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loanTypeSelector}>
        {["Personal Loan", "Home Loan", "Car Loan", "Student Loan"].map((type) => (
          <button
            key={type}
            className={loanType === type ? styles.activeLoanType : ""}
            onClick={() => setLoanType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{loanType} Application</h2>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="tel" name="contactNumber" placeholder="Contact Number" required onChange={handleChange} />
        <input type="number" name="loanAmount" placeholder="Loan Amount ($)" required onChange={handleChange} />
        <input type="number" name="loanDuration" placeholder="Loan Duration (Months)" required onChange={handleChange} />
        <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default LoanApplication;
