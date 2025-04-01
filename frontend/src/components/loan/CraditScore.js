import styles from "./CreditScore.module.css";

const CreditScore = ({ score }) => {
  return (
    <div className={styles.creditScoreContainer}>
      <h3>Your Credit Score</h3>
      <div className={styles.scoreCircle} style={{ borderColor: score > 700 ? "green" : score > 500 ? "orange" : "red" }}>
        {score}
      </div>
    </div>
  );
};

export default CreditScore;
