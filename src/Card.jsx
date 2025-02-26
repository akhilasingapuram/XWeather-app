import React from "react";

const Card = ({ label, value }) => {
  return (
    <div className="weather-card">
      <h4>{label}</h4>
      <span>{value}</span>
    </div>
  );
};
export default Card;
