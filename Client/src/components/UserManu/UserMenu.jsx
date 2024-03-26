import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from "../../context/AuthContext"; // Adjust path as necessary
import userIcon from "../../assets/icons/user.svg";
import mode from "../../assets/icons/lightMode.svg";
import './UserMenu.css'; // Assume we'll create this CSS file next
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(); // Ref for the menu container

  // Toggles the menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu
      }
    };

    // Only add the event listener if the menu is open
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]); // Rerun only if menuOpen changes

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-button" onClick={toggleMenu}>
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
