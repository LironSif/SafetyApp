import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateFactoryMutation, useUpdateFactoryMutation } from '../../services/factoryApi.js';
import './GenericForm.css';
import Spinner from '../Spinner/Spinner.jsx'; // Verify this path matches your spinner component
import { setFactoryId, setFactoryCreated } from '../../redux/slices/FactoryCreationSlice'; // Adjust the path as necessary

const GenericFactoryForm = ({ setup }) => {
  const dispatch = useDispatch();
  const [createFactory, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateFactoryMutation();
  const [updateFactory, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateFactoryMutation();
  const [formState, setFormState] = useState({ factoryName: '', factoryAddress: '' });
  const [errors, setErrors] = useState({});
  const [successOperation, setSuccessOperation] = useState(null); // Track success operation

  // Reset form state when the operation type changes or on initial load
  useEffect(() => {
    setFormState({ factoryName: '', factoryAddress: '' });
    setErrors({});
    setSuccessOperation(null); // Reset success operation state
  }, [setup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    setup.fields.forEach(field => {
      if (field.validation.required && !formState[field.name].trim()) {
        newErrors[field.name] = 'This field is required.';
      } else if (field.validation.pattern && !field.validation.pattern.test(formState[field.name])) {
        newErrors[field.name] = field.validation.errorMessage;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const actionData = { userId: setup.userId, ...formState };
    
    try {
      let result;
      if (setup.operation === 'create') {
        result = await createFactory(actionData).unwrap();
        
        // Store the factory ID in local storage
        localStorage.setItem('factoryId', result._id);
  
        // Dispatch the action to set the factory ID in the Redux store
        dispatch(setFactoryId(result._id));
        dispatch(setFactoryCreated(true));
      } else {
        result = await updateFactory({ id: setup.factoryId, ...actionData }).unwrap();
      }
  
      // Set the operation to success state
      setSuccessOperation(setup.operation);
      setErrors({}); // Clear any existing errors
    } catch (error) {
      console.error(error);
      const serverErrorMessage = error.data?.message || error.error || 'An unexpected error occurred. Please try again.';
      setErrors(prev => ({ ...prev, form: serverErrorMessage }));
      setSuccessOperation(null);
    }
  };
  

  return (
    <div className="generic-form">
      <form onSubmit={handleSubmit}>
        {setup.fields.map(field => (
          <div key={field.name} className="formField">
            <label>{field.label}</label>
            <input
              name={field.name}
              value={formState[field.name]}
              onChange={handleChange}
              type="text"
              disabled={isCreating || isUpdating || successOperation}
            />
            {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
          </div>
        ))}
        <div className="formButton">
          <button type="submit" disabled={isCreating || isUpdating || successOperation} className={successOperation ? 'button-success' : ''}>
            {successOperation ? (successOperation === 'create' ? 'Factory Created' : 'Factory Updated') : (isCreating || isUpdating ? <Spinner /> : (setup.operation === 'create' ? 'Create Factory' : 'Update Factory'))}
          </button>
        </div>
      </form>
      {errors.form && <p className="error-message">{errors.form}</p>}
    </div>
  );
};

export default GenericFactoryForm;
