const Card = ({ title, value, subtitle, color, icon }) => {
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>{value}</p>
        <span className={color}>{icon} {subtitle}</span>
      </div>
    );
  };
  
  export default Card;
  