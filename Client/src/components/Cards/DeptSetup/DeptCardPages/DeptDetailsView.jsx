import React, { useState } from 'react';
import './DeptDetailsView.css';

const DeptDetailsView = ({ department, onEdit }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleContainerClick = (e) => {
    // Prevents the container click from triggering when the button is clicked
    if (e.target.className.includes('toggle-btn')) {
      return;
    }
    setShowDetails(!showDetails);
  };

  return (
    <div className="dept-view-container" onClick={handleContainerClick}>
      <div className="dept-header">
        <h2 className="dept-name">{department.name}</h2>
        <button onClick={toggleDetails} className="toggle-btn">
          {showDetails ? '-' : '+'}
        </button>
      </div>
      <p className="factory-id">Factory ID: ...{department.factoryId?.slice(-4)}</p>

      {showDetails && (
        <div className="dept-details">
          <p>Employees: {department.employees.length}</p>
          <p>Risks: {department.risks.length}</p>
          <p>Equipment: {department.equipment.length}</p>
          <p>Chemicals: {department.chemicals.length}</p>
          {/* Moved the Edit button outside the toggle section to always show */}
        </div>
      )}
      {/* Edit button is now outside the details div, always visible, and aligned as needed */}
      <button onClick={onEdit} className="edit-btn">Edit</button>
    </div>
  );
};

export default DeptDetailsView;
