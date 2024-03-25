import React, { useState, useEffect } from "react";
import {
  useGetDepartmentsByFactoryIdQuery,
  useUpdateDepartmentsMutation, // Updated to use the new mutation
} from "../../services/departmentApi";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./DeptDetails.css";
import MessageWithTypingEffect from "../TypeEffect/TypeEffect.jsx";
import welcomeMessage from "../TypeEffect/Message.js";
import Spinner3 from "../Spinner/Spinner3.jsx";

const DeptDetails = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departments] = useState([
    "Office",
    "Maintenance",
    "Manufacturing",
    "Storage",
    "Yard",
    "Other",
  ]);
  const factoryId = localStorage.getItem("factoryId");

  const {
    data: existingDepartments,
    isError,
    error,
    isLoading: isFetching,
  } = useGetDepartmentsByFactoryIdQuery(factoryId);
  
  // Updated to use the new mutation hook
  const [
    updateDepartments, // Renamed to reflect the new functionality
    {
      isLoading: isUpdating,
      isSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateDepartmentsMutation();

  useEffect(() => {
    if (existingDepartments) {
      const deptNames = existingDepartments.map((dept) => dept.name);
      setSelectedDepartments(deptNames);
    }
  }, [existingDepartments]);

  const handleSelectDepartment = (dept) => {
    if (!selectedDepartments.includes(dept)) {
      setSelectedDepartments((prev) => [...prev, dept]);
    } else {
      setSelectedDepartments((prev) => prev.filter((d) => d !== dept));
    }
  };

  const handleRemoveDepartment = (dept) => {
    setSelectedDepartments((prev) => prev.filter((d) => d !== dept));
  };

  const handleUpdate = async () => {
    try {
      await updateDepartments({ // Updated to reflect the new function name
        factoryId,
        departments: selectedDepartments,
      }).unwrap();
      alert("Departments updated successfully");
    } catch (updateError) {
      console.error("Update failed:", updateError);
    }
  };

  const handleClear = () => {
    setSelectedDepartments([]); // Reset the selectedDepartments to an empty array
  };


  return (
    <div className="card-div">
    <div className="card-name">
      <h2>Department setup</h2>
      </div>
      <div className="crad-msg">
        <MessageWithTypingEffect message={welcomeMessage} />
      </div>
      <div className="card-content">
      <div className="card-header">
        Add Department
        </div>
        
        <div className="selected-array-name">Department options:</div>
        <div className="first-ses">
          {departments.map((dept) => (
            <div
              key={dept}
              className={`dept-option ${
                selectedDepartments.includes(dept) ? "selected" : ""
              }`}
              onClick={() => handleSelectDepartment(dept)}
            >
              {dept} <span className="plus-sign">+</span>
            </div>
          ))}
        </div>

        <div className="selected-array-name"><h4>Selected departments:</h4></div>
        <div className="selected-array ">
          {isUpdating ? (
            <Spinner3/>
          ) : (
            selectedDepartments.map((dept) => (
              <div key={dept} className="div-like-btn">
                {dept}{" "}
                <button
                  className="remove-dept"
                  onClick={() => handleRemoveDepartment(dept)}
                >
                  x
                </button>
              </div>
            ))
          )}
        </div>

        {isError && (
          <div className="error-message">
            {error?.data?.message || "An error occurred fetching departments"}
          </div>
        )}
        {isUpdateError && (
          <div className="error-message">
            {updateError?.data?.message ||
              "An error occurred updating departments"}
          </div>
        )}
        <div className="button-main-div ">
          <div className="form-button-group">
          <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={isSuccess}
              className={`update-button ${isSuccess ? "success" : ""}`}
            >
              {isSuccess ? "Updated" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptDetails;
