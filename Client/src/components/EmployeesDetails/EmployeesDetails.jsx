import React, { useState } from 'react';
import { useCreateEmployeeMutation } from '../../services/employeeApi';
import './EmployeesDetails.css';

const EmployeesDetails = () => {
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState([]);
  const [createEmployee, { isLoading, isSuccess, isError, error }] = useCreateEmployeeMutation();

  // Retrieve the factoryId from localStorage
  const factoryId = localStorage.getItem('factoryId');

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    const inputEmails = emailInput.split(/[\s,]+/).filter(isValidEmail);
    const newEmails = [...new Set([...emails, ...inputEmails])];
    setEmails(newEmails);
    setEmailInput(''); // Reset input field
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleSubmit = async () => {
    // Send all emails in one request
    try {
      const response = await createEmployee({ emails, factoryId }).unwrap();
      console.log(response); // Log or handle response
      setEmails([]); // Clear emails after successful submission
    } catch (err) {
      console.error("Error creating employees:", err);
    }
  };
  
  return (
    <div className="setup-div">
      <h3 className="setup-name">Add Employee </h3>

      <div className="factory-details-form">
      <div className="add-input">
      <label>
        Employee Email:
        <input
          type="text"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Add employee email"
        />
      </label>
      <button className="add-btn" type="button" onClick={handleAddEmail}>Add</button>
      </div>
      <div className='t'>
        {emails.map((email, index) => (
          <div key={index} className="email-tag">
            {email}
            <button className='remove-x-btn' type="button" onClick={() => handleRemoveEmail(email)}>x</button>
          </div>
        ))}
      </div>
      {isSuccess && <div>Employees updated successfully!</div>}
      {isError && <div>Error updating employees: {error?.data?.message || 'An error occurred'}</div>}
      
    </div>
    <div className="button-main-div">
        <div className="form-button-group">
      <button type="button" onClick={handleSubmit} disabled={isLoading}   className={`update-button ${isSuccess ? "success" : ""}`} >
        {isLoading ? 'Updating...' : 'Update '}
      </button>
    </div>
    </div>
    </div>
  );
};

export default EmployeesDetails;
