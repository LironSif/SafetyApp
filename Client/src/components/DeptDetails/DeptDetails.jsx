import React, { useState, useEffect } from 'react';
import { useGetDepartmentsByFactoryIdQuery, useUpdateDepartmentMutation } from '../../services/departmentApi';
import Spinner from '../../components/Spinner/Spinner.jsx';
import './DeptDetails.css';

const DeptDetails = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departments] = useState(["Office", "Maintenance", "Manufacturing", "Storage", "Yard"]);
  const factoryId = localStorage.getItem('factoryId');

  const { data: existingDepartments, isError, error, isLoading: isFetching } = useGetDepartmentsByFactoryIdQuery(factoryId);
  const [updateDepartment, { isLoading: isUpdating, isSuccess, isError: isUpdateError, error: updateError }] = useUpdateDepartmentMutation();

  useEffect(() => {
    // Assuming existingDepartments is structured as an array of department objects
    if (existingDepartments) {
      const deptNames = existingDepartments.map(dept => dept.name); // Adjust based on your data structure
      setSelectedDepartments(deptNames);
    }
  }, [existingDepartments]);

  const handleSelectDepartment = (dept) => {
    if (!selectedDepartments.includes(dept)) {
      setSelectedDepartments(prev => [...prev, dept]);
    } else {
      setSelectedDepartments(prev => prev.filter(d => d !== dept));
    }
  };

  const handleRemoveDepartment = (dept) => {
    setSelectedDepartments(prev => prev.filter(d => d !== dept));
  };

  const handleUpdate = async () => {
    try {
      await updateDepartment({ factoryId, departments: selectedDepartments }).unwrap();
      alert('Departments updated successfully');
    } catch (updateError) {
      console.error("Update failed:", updateError);
    }
  };

  if (isFetching) return <Spinner />; // Show a loading spinner while fetching existing departments

  return (
    <div className="setup-div">
      <h3 className="setup-name">Add Department</h3>
      <div className="factory-details-form">
        {departments.map((dept) => (
          <div key={dept} className={`dept-option ${selectedDepartments.includes(dept) ? 'selected' : ''}`} onClick={() => handleSelectDepartment(dept)}>
            {dept} <span className="plus-sign">+</span>
          </div>
        ))}
      </div>
      <div className="selected-departments">
        {selectedDepartments.map((dept) => (
          <div key={dept} className="selected-dept">
            {dept} <button className="remove-dept" onClick={() => handleRemoveDepartment(dept)}>x</button>
          </div>
        ))}
      </div>
      {isError && (
        <div className="error-message">
          {error?.data?.message || "An error occurred fetching departments"}
        </div>
      )}
      {isUpdateError && (
        <div className="error-message">
          {updateError?.data?.message || "An error occurred updating departments"}
        </div>
      )}
      <div className="button-main-div">
        <div className="form-button-group">
          <button type="button" onClick={handleUpdate} disabled={isUpdating || isSuccess} className={`update-button ${isSuccess ? "success" : ""}`}>
            {isUpdating ? <Spinner /> : isSuccess ? "Updated" : "Update"}
          </button>
          <button type="button" className="clear-button" onClick={() => window.location.reload()}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeptDetails;
