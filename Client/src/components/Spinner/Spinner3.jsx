import React from 'react';
import './Spinner3.css'; // Ensure this CSS file includes the new styles

// Paths to the images might need to be updated based on your project structure
import workerImg from '../../assets/spinner/Worker.png';


const Spinner3 = () => {
  return (
    <div className="spinner3-container">
      <img src={workerImg} className="spinner3-worker" alt="Worker"/>
    </div>
  );
};

export default Spinner3;
