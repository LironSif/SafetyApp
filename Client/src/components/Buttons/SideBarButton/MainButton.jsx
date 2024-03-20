import React from "react";
import "./MainButton.css";
import { useNavigate } from "react-router-dom";
import SubButton from "./SubButton";

const MainButton = ({ config, isNonNavigable }) => {
    const navigate = useNavigate();

    const buttonStyle = isNonNavigable ? { cursor: "default" } : {}; // Conditional style based on isNonNavigable

    const handleClick = () => {
        if (!isNonNavigable) {
            navigate(`/${config.name.replace(/\s+/g, '-').toLowerCase()}`);
        }
    };

    return (
      <div>
        <button 
          className="MainButton bold-text" 
          onClick={isNonNavigable ? undefined : handleClick}
          style={buttonStyle} // Apply conditional style
        >
          <img src={config.icon} alt="" className="button-icon" />
          <span className="button-text">{config.name}</span>
        </button>
        {config.buttons && config.buttons.map((name, index) => (
          <SubButton key={index} name={name} />
        ))}
      </div>
    );
};

export default MainButton;
