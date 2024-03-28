import React from 'react'; // Import React
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate instead of Link
import { links, buttomLinks } from "../../Constants/Links";
import NavUser from "./NavUser";
import './NavBar.css';

const Sidebar = React.forwardRef((props, ref) => {
  const location = useLocation();
  const navigate = useNavigate(); // Create a navigate function instance

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar" ref={ref}>
      <div className="user-bar">
        <div className="warraper">
          <NavUser />
        </div>
      </div>

      <div className="mid-bar">
        <div className="warraper">
          {links.map((link, index) => (
            <div key={index} className="link-container">
              {/* Replace Link with div and onClick event */}
              <div className="main-link" onClick={() => handleNavigation(link.path)}>
                <img src={link.icon} alt="" className="icon" />
                {link.name}
              </div>
              {link.subLinks && link.subLinks.map((subLink, subIndex) => (
                <div
                  key={subIndex}
                  className={`sub-link ${location.pathname === subLink.path ? "active" : ""}`}
                  onClick={() => handleNavigation(subLink.path)} // Add onClick to navigate
                >
                  {subLink.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="buttom-bar">
        <div className="warraper">
          {buttomLinks.map((link, index) => (
            <div key={index} className="link-container">
              {/* Replace Link with div and onClick event */}
              <div className="main-link" onClick={() => handleNavigation(link.path)}>
                <img src={link.icon} alt="" className="icon" />
                {link.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
