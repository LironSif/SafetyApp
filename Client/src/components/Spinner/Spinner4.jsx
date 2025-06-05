import React from 'react';
import './Spinner4.css';

import gogglesImg from '../../assets/spinner/goggles.png';
import hammerImg from '../../assets/spinner/hammar.png';
import hutImg from '../../assets/spinner/hut.png';

const Spinner4 = () => {
  return (
    <div className="spinner4-container">
      <div className="spinner4-triangle">
        <img src={hutImg} className="spinner4-item" alt="Hut" />
        <img
          src={gogglesImg}
          className="spinner4-item spinner4-goggles"
          alt="Goggles"
        />
        <img
          src={hammerImg}
          className="spinner4-item spinner4-hammer"
          alt="Hammer"
        />
      </div>
    </div>
  );
};

export default Spinner4;
