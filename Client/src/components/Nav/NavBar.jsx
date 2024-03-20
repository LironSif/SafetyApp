import React from "react";
import { Link, useLocation } from "react-router-dom";
import { links, buttomLinks } from "../../Constants/Links";
import NavUser from "./NavUser";
import './NavBar.css';

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="user-bar">
        <div className="warraper">

        <NavUser />
        </div>
      </div>

      <div className="mid-bar">
      <div className="warraper">
        {links.map((link, index) => (
          <div key={index} className="link-container">
            <Link to={link.path} className="main-link">
              <img src={link.icon} alt="" className="icon" />
              {link.name}
            </Link>
            {link.subLinks && link.subLinks.map((subLink, subIndex) => (
              <div
                key={subIndex}
                className={`sub-link ${
                  location.pathname === subLink.path ? "active" : ""
                }`}
              >
                <Link to={subLink.path}>{subLink.name}</Link>
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
            <Link to={link.path} className="main-link">
              <img src={link.icon} alt="" className="icon" />
              {link.name}
            </Link>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Sidebar;
