import React from 'react';
import './Spinner3.css'; // Ensure this CSS file includes the new styles

// Paths to the images might need to be updated based on your project structure
import workerImg from '../../assets/spinner/Worker.png';
import gogglesImg from '../../assets/spinner/goggles.png';
import hammerImg from '../../assets/spinner/hammar.png';
import hutImg from '../../assets/spinner/hut.png';

const Spinner3 = () => {
  return (
    <div className="spinner3-container">
      <div className="spinner3-triangle">
        <img src={hutImg} className="spinner3-item" alt="Hut"/>
        <img src={gogglesImg} className="spinner3-item spinner3-goggles" alt="Goggles"/>
        <img src={hammerImg} className="spinner3-item spinner3-hammer" alt="Hammer"/>
      </div>
      <img src={workerImg} className="spinner3-worker" alt="Worker"/>
    </div>
  );
};

export default Spinner3;
