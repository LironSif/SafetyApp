import React from 'react';
import './Spinner.css'; // Ensure this is the correct path to your CSS file

// Importing images
import hammerImg from '../../assets/spinner/hammar.png';
import gogglesImg from '../../assets/spinner/goggles.png';
import Spinner2 from './Spinner2';

const Spinner = ({ 
  circleSpeed = '1s', 
  squareSpeed = '1.5s', 
  triangleSpeed = '2s', 
  rotationSpeed = '3s' 
}) => {
  return (
    <div>
    <div className="spinner-container" style={{ ['--rotation-speed']: rotationSpeed }}> 

      </div>
      {/* New additions: Hammer and Goggles images */}
      <img src={hammerImg} className="spinner-hammer" alt="Hammer"/>
      <img src={gogglesImg} className="spinner-goggles" alt="Goggles"/>
    </div>
  );
};

export default Spinner;
