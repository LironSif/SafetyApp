// Card.jsx
import React from 'react';
import './DeptSetupCard.css'; // Importing CSS styling

const Card = ({ title, content }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

export default Card;
