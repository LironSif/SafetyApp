import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateDepartmentMutation } from '../../services/departmentApi';
import './GenericDepartmentForm.css';
import Spinner from '../Spinner/Spinner.jsx'; // Ensure this path matches your spinner component
import { setDepartmentsCreated } from '../../redux/slices/FactoryCreationSlice';
const GenericDepartmentForm = ({ setup }) => {
    const dispatch = useDispatch();
  const factoryId = useSelector((state) => state.factoryCreation.factoryId);
  const [customDepartment, setCustomDepartment] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [createDepartment, { isLoading: isCreating }] = useCreateDepartmentMutation();
  const [successOperation, setSuccessOperation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddCustomDepartment = () => {
    if (customDepartment && !selectedDepartments.includes(customDepartment)) {
      setSelectedDepartments(prev => [...prev, customDepartment]);
      setCustomDepartment('');
    }
  };

  const handleRemoveDepartment = (dept) => {
    setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
  };

  const handleSubmit = async () => {
    if (selectedDepartments.length > 0 && factoryId) {
      try {
        await createDepartment({ factoryId, departments: selectedDepartments }).unwrap();
        setSuccessOperation(true); 
        dispatch(setDepartmentsCreated(true))// Indicate success
        setErrorMessage(''); // Clear any previous error message
      } catch (error) {
        console.error('Failed to create departments:', error);
        setErrorMessage(error.data?.message || 'Failed to create departments');
        setSuccessOperation(false); // Reset success operation in case of error
      }
    } else {
      setErrorMessage('Factory ID is missing or no departments selected'); // Handle missing factory ID or departments
    }
  };

  return (
    <div className="generic-form">
      <div className="formField">
        <label>Add Custom Department: </label>
        <input
          type="text"
          value={customDepartment}
          onChange={(e) => setCustomDepartment(e.target.value)}
        />
        <button onClick={handleAddCustomDepartment}>Add</button>
      </div>
      <div className="select-departments">
        {setup.departments.map(dept => (
          <button
            key={dept}
            className={`department-btn ${selectedDepartments.includes(dept) ? 'selected' : ''}`}
            onClick={() => setSelectedDepartments(prev => prev.includes(dept) ? prev : [...prev, dept])}
          >
            {dept}
          </button>
        ))}
      </div>
      <div className="selected-departments">
        {selectedDepartments.map(dept => (
          <div key={dept} className="selected-department">
            {dept} <button className="remove-btn" onClick={() => handleRemoveDepartment(dept)}>X</button>
          </div>
        ))}
      </div>
      <div className="formButton">
        <button onClick={handleSubmit} disabled={isCreating || successOperation}>
          {isCreating ? <Spinner /> : (successOperation ? 'Departments Created' : 'Create Departments')}
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default GenericDepartmentForm;
