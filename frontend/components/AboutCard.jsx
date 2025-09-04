import React from "react";
import "../css/AboutUs.css";

const AboutCard = ({ title, subtitle, highlight }) => {
  return (
    <div className="card">
      <p className="heading">{title}</p>
      <p>{subtitle}</p>
      <p className="highlight">{highlight}</p>
    </div>
  );
};

export default AboutCard;
