import React from 'react';
import './MobileNavBar.css';
import NavUser from './NavUser';

const MobileNavBar = ({ onToggle }) => {
  return (
    <div className="nav-user-container">
      <div className="mobile-nav-bar">
        <button className="hamburger-btn" onClick={onToggle}>
          ☰
        </button>
        <NavUser />
      </div>
    </div>
  );
};

export default MobileNavBar;
