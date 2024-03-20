// UserMenu.jsx
import React, { useState, useContext } from 'react';
import { useAuth } from "../../context/AuthContext"; // Adjust path as necessary
import userIcon from "../../assets/icons/user.svg";
import mode from "../../assets/icons/lightMode.svg";
import './UserMenu.css'; // Assume we'll create this CSS file next
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggles the menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="user-menu">
      <button className="user-button" onClick={toggleMenu}>
        {/* Icons go here. For simplicity, only showing the user icon */}
        <img src={mode} alt="User" className="icon2" />
        <img src={userIcon} alt="User" className="icon" />
      </button>

      {menuOpen && (
        <div className="menu-dropdown">
          <div className="menu-section">{user?.email || 'Welcome, Guest!'}</div>
          {user ? (
            <>
              {/* Authenticated user options */}
              <div className="menu-section">
                <button className="menu-item">System Performance</button>
                <button className="menu-item">Light Mode</button>
                <button className="menu-item">Dark Mode</button>
              </div>
              <div className="menu-section">
                <button className="menu-item" onClick={() => {/* Navigate to user/settings */}}>User Settings</button>
              </div>
              <div className="menu-section">
                <button className="menu-item" onClick={logout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              {/* Unauthenticated user options */}
              <div className="menu-section">
                <button className="menu-item" onClick={() => navigate("/login")}>Login</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
