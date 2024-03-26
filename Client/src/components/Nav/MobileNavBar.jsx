// MobileNavBar.jsx
import React from 'react';
import './MobileNavBar.css'
import NavUser from './NavUser';
const MobileNavBar = ({ onToggle }) => {
  return (
    <div className="mobile-nav-bar">
      <button onClick={onToggle}>☰</button>
      <NavUser/>
    </div>
  );
};

export default MobileNavBar;
