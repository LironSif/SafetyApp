import React, { useState, useEffect } from "react";
import "./EditDeptDetails.css";
import AddChemicalToDepartment from "../../../AddChemical/AddChemicalToDepartment";
import Spinner3 from "../../../Spinner/Spinner3";
import { useUpdateDepartmentMutation } from "../../../../services/departmentApi";
import { useGetEmployeesQuery } from "../../../../services/employeeApi";

const EditDeptDetails = ({ department, onCancel, onSubmit }) => {
  const { data: employees, isLoading: loadingEmployees, error: employeeError } = useGetEmployeesQuery();
  const [updateDepartment, { isLoading, isSuccess, isError, error }] = useUpdateDepartmentMutation();

  const [showChemicalAdder, setShowChemicalAdder] = useState(false);
  const [showNoiseInput, setShowNoiseInput] = useState(false);
  const [noiseMeasurement, setNoiseMeasurement] = useState("");
  const [lastCheckDate, setLastCheckDate] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedChemicals, setSelectedChemicals] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      alert("Department updated successfully!");
      if (onSubmit) onSubmit(); // Call onSubmit if provided
    }
  }, [isSuccess, onSubmit]);

  const handleChemicalsAdded = (chemicals) => {
    console.log("Chemicals received from child:", chemicals);
    setSelectedChemicals(chemicals);
  };

  if (loadingEmployees) return <div>Loading employees...</div>;
  if (employeeError) return <div>Error fetching employees: {employeeError.toString()}</div>;

  const handleSubmit = async () => {
    const submissionData = {
      manager: selectedManager,
      employees: selectedEmployees,
      chemicals: selectedChemicals,
      noise: {
        measurement: noiseMeasurement,
        lastCheckDate: lastCheckDate,
      },
    };

    console.log("Submission Data:", submissionData);

    try {
      await updateDepartment({ id: department._id, ...submissionData }).unwrap();
    } catch (error) {
      console.error("Failed to update department:", error);
    }
  };

  return (
    <div className="edit-dept-details">
      <h2>Edit Department Details for {department.name}</h2>

      <div>
        <label htmlFor="managerSelect">Select a Manager:</label>
        <select
          id="managerSelect"
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
        >
          <option value="">Select Manager</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.email}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Add Employees:</label>
        <div id="employeesSelect">
          {employees.map((employee) => (
            <div key={employee._id} className="add-employee-div">
              <label htmlFor={`employee-${employee._id}`}>{employee.email}</label>
              <input
                type="checkbox"
                id={`employee-${employee._id}`}
                value={employee._id}
                checked={selectedEmployees.includes(employee._id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedEmployees((prev) => [...prev, e.target.value]);
                  } else {
                    setSelectedEmployees((prev) =>
                      prev.filter((id) => id !== e.target.value)
                    );
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="chemicals-question-container">
        <label htmlFor="">Does the department contain chemicals?</label>
        <button className="response-btn yes" onClick={() => setShowChemicalAdder(true)}>
          Yes
        </button>
        <button className="response-btn no" onClick={() => setShowChemicalAdder(false)}>
          No
        </button>
      </div>
      {showChemicalAdder && <AddChemicalToDepartment onChemicalsAdded={handleChemicalsAdded} />}

      <div className="chemicals-question-container">
        <label htmlFor="">Is there noise in the department?</label>
        <button className="response-btn yes" onClick={() => setShowNoiseInput(true)}>
          Yes
        </button>
        <button className="response-btn no" onClick={() => setShowNoiseInput(false)}>
          No
        </button>
      </div>

      {showNoiseInput && (
        <div>
          <label>Please insert noise measurement:</label>
          <input
            type="text"
            value={noiseMeasurement}
            onChange={(e) => setNoiseMeasurement(e.target.value)}
            placeholder="Noise level in dB"
          />
          <label>Last check date:</label>
          <input
            type="date"
            value={lastCheckDate}
            onChange={(e) => setLastCheckDate(e.target.value)}
          />
        </div>
      )}

   
<div className="buttons-container">
        <button className="action-btn previous" onClick={onCancel}>
          Previous
        </button>
        <button className="action-btn update" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <div className="spinner-container"><Spinner3 /></div> : "Update"}
        </button>
      </div>

      {isError && <div className="error-message">Failed to update department: {error.toString()}</div>}
    </div>
  );
};

export default EditDeptDetails;