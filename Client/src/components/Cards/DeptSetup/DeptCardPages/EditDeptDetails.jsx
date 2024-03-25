import React, { useState } from "react";
import "./EditDeptDetails.css";
import AddChemicalToDepartment from "../../../AddChemical/AddChemicalToDepartment";
import { useUpdateDepartmentMutation } from "../../../../services/departmentApi";
import { useGetEmployeesQuery } from "../../../../services/employeeApi";

const EditDeptDetails = ({ department, onCancel, onSubmit }) => {
  const {
    data: employees,
    isLoading: loadingEmployees,
    error,
  } = useGetEmployeesQuery();
  const [updateDepartment] = useUpdateDepartmentMutation();

  const [showChemicalAdder, setShowChemicalAdder] = useState(false);
  const [showNoiseInput, setShowNoiseInput] = useState(false);
  const [noiseMeasurement, setNoiseMeasurement] = useState("");
  const [lastCheckDate, setLastCheckDate] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedChemicals, setSelectedChemicals] = useState({});

  const handleChemicalsAdded = (selectedChemicals) => {
    console.log("Chemicals received from child:", selectedChemicals);
    setSelectedChemicals(selectedChemicals);
  };

  if (loadingEmployees) return <div>Loading employees...</div>;
  if (error) return <div>Error fetching employees: {error.toString()}</div>;

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
    console.log(submissionData);
    // await updateDepartment({ id: department._id, ...submissionData });
    // onSubmit();
    // Assuming onSubmit is a prop for handling after submission
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
            // Assuming employee.email exists and you want to display it
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
              <div htmlFor={`employee-${employee._id}`}>{employee.email}</div>
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
        <div className="span">
          <label htmlFor="">Does the department contain chemicals?</label>
        </div>
        <button
          className="response-btn yes"
          onClick={() => setShowChemicalAdder(true)}
        >
          Yes
        </button>
        <button
          className="response-btn no"
          onClick={() => setShowChemicalAdder(false)}
        >
          No
        </button>
      </div>
      {showChemicalAdder && (
        <AddChemicalToDepartment onChemicalsAdded={handleChemicalsAdded} />
      )}
      <div className="chemicals-question-container">
        <div className="span">
          <label htmlFor="">Is there noise in the department?</label>
        </div>
        <button
          className="response-btn yes"
          onClick={() => setShowNoiseInput(true)}
        >
          Yes
        </button>
        <button
          className="response-btn no"
          onClick={() => setShowNoiseInput(false)}
        >
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
        <button className="action-btn update" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditDeptDetails;
