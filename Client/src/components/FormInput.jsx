import React from 'react';

const FormInput = ({ id, type, placeholder, label, errorMessage, handleInputChange, toggleVisibility }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default FormInput;
