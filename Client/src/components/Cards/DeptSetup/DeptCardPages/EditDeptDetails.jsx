import React from "react";
import './EditDeptDetails.css'
const EditDeptDetails = ({ department, onCancel, onSubmit }) => {
  return (
    <div>
      <h2>Edit Department Details for {department.name}</h2>
      {/* Form elements for editing department details go here */}

      {/* Removed inline styles in favor of CSS classes */}
      <div className="buttons-container">
        <button className="action-btn previous" onClick={onCancel}>Previous</button>
        <button className="action-btn update" onClick={onSubmit}>Update</button>
      </div>
    </div>
  );
};

export default EditDeptDetails;
