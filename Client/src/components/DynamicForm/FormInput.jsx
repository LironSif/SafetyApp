import React, { useState } from 'react';
import closeEye from '../../assets/icons/eye-closed.svg';
import openEye from '../../assets/icons/eye-show.svg';
import './FormInput.css';

const FormInput = ({ label, type, id, value, placeholder, error, onChange }) => {
  // Initialize showPassword state within the FormInput component
  const [showPassword, setShowPassword] = useState(false);

  // Determine if the current input is of type 'password'
  const isPassword = type === 'password';

  return (
    <div className="form-input-group">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <div className="input-group">
        <input
          className={`input ${error ? "error" : ""}`}
          type={isPassword && showPassword ? "text" : type}
          id={id}
          name={id} // Ensure name attribute is set for proper label association
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(prevShowPassword => !prevShowPassword)} // Toggle the showPassword state
            aria-label="Toggle password visibility"
          >
            <img src={showPassword ? openEye : closeEye} alt="Toggle Password Visibility" />
          </button>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormInput;
