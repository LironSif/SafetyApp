import React from 'react';
import './Spinner.css';

import hammerImg from '../../assets/spinner/hammar.png';
import gogglesImg from '../../assets/spinner/goggles.png';

const Spinner = ({ rotationSpeed = '3s' }) => {
  return (
    <div
      className="spinner-container"
      style={{ '--rotation-speed': rotationSpeed }}
    >
      <img src={hammerImg} className="spinner-hammer" alt="Hammer" />
      <img src={gogglesImg} className="spinner-goggles" alt="Goggles" />
    </div>
  );
};

export default Spinner;
