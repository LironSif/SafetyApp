import React, { useState } from "react";
import { useCreateEmployeeMutation } from "../../services/employeeApi";
// import "./EmployeesDetails.css";
import MessageWithTypingEffect from "../TypeEffect/TypeEffect";
import welcomeMessage from "../TypeEffect/Message.js";

const EmployeesDetails = () => {
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);
  const [createEmployee, { isLoading, isSuccess, isError, error }] =
    useCreateEmployeeMutation();

  // Retrieve the factoryId from localStorage
  const factoryId = localStorage.getItem("factoryId");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    const inputEmails = emailInput.split(/[\s,]+/).filter(isValidEmail);
    const newEmails = [...new Set([...emails, ...inputEmails])];
    setEmails(newEmails);
    setEmailInput(""); // Reset input field
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSubmit = async () => {
    // Send all emails in one request
    try {
      const response = await createEmployee({ emails, factoryId }).unwrap();
      setEmails([]); // Clear emails after successful submission
    } catch (err) {
      console.error("Error creating employees:", err);
    }
  };

  const handleClear = () => {
    setEmails([]); // Reset the selectedDepartments to an empty array
  };

  return (
    <div className="card-div">
      <div className="card-name">
        <h2>Employee setup </h2>
      </div>
      <div className="crad-msg">
        <MessageWithTypingEffect message={welcomeMessage} />
      </div>
      <div className="card-content">
        <div className="card-header">Add Employee</div>

        {/* <div className="selected-array-name">Add Employee email:</div> */}
        <div className="fix-left">
   
            <div className="form-field">
              <div className="lab-in-btn">
                <div className="selected-array-name">
                  <h4>Employee Email:</h4>
                </div>
                {/* <label htmlFor="employeeEmail" className="email-label">Employee Email:</label> */}
                <input
                  id="employeeEmail"
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Add employee email"
                  className="email-input"
                />
                <button
                  className="add-btn"
                  type="button"
                  onClick={handleAddEmail}
                >
                  Add
                </button>
              </div>
            </div>
       
        </div>
        <div className="selected-array-name">
          <h4>Added employee:</h4>
        </div>
        <div className="selected-array">
          {emails.map((email, index) => (
            <div key={index} className="div-like-btn">
              {email}
              <button
                className="remove-x-btn"
                type="button"
                onClick={() => handleRemoveEmail(email)}
              >
                x
              </button>
            </div>
          ))}
        </div>

        {isSuccess && <div>Employees updated successfully!</div>}
        {isError && (
          <div>
            Error updating employees:{" "}
            {error?.data?.message || "An error occurred"}
          </div>
        )}

        <div className="button-main-div">
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
              onClick={handleSubmit}
              disabled={isLoading}
              className={`update-button ${isSuccess ? "success" : ""}`}
            >
              {isLoading ? "Updating..." : "Update "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesDetails;
