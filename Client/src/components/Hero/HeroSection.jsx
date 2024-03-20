import React from "react";
import heroImage from "../../assets/img/welcom.webp";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <img className="hero-image" src={heroImage} alt="Welcome" />
      <div className="hero-welcome-text">
        <h2 className="hero-heading">Welcome</h2>
        <p className="hero-description">
          SAFETY, your all-in-one app for managing factory safety with ease.
          Simplify your workflow with features for subcontractor management,
          hazardous material identification, MSDS access, and certification
          tracking. Enhance safety and efficiency in your workplace with
          SAFETY—your partner in occupational safety management. Start now for a
          safer tomorrow.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
