import React, { useState } from 'react';
import './ChemicalForm.css'; // Make sure to create a corresponding CSS file

const ChemicalForm = ({ onSubmit, onClear }) => {
  const initialState = {
    UNNumber: '',
    Name: '',
    NEEDMONITOR: false,
    INSTABILITY: '',
    SPECIFIC_HAZARD: '',
    FIRE_HAZARD: '',
    HEALTH_HAZARD: '',
    STATE: '',
    OXIDIZER: false,
    CORROSIVE: false,
    FLAMMABLE: false,
    PPE: [],
  };

  const [chemical, setChemical] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setChemical((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'PPE') {
      // For multi-select drop-downs
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setChemical((prev) => ({ ...prev, PPE: selectedOptions }));
    } else {
      setChemical((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(chemical);
  };

  const handleClear = () => {
    setChemical(initialState);
    onClear();
  };

  return (
    <form className="chemical-form" onSubmit={handleSubmit}>
      {/* Input fields for UNNumber, Name, etc. */}
      <div className="form-group">
        <label htmlFor="UNNumber">UN Number</label>
        <input
          type="text"
          id="UNNumber"
          name="UNNumber"
          value={chemical.UNNumber}
          onChange={handleChange}
        />
      </div>

      {/* Enum fields as drop-down menus */}
      <div className="form-group">
        <label htmlFor="STATE">State</label>
        <select name="STATE" id="STATE" value={chemical.STATE} onChange={handleChange}>
          <option value="">Select a State</option>
          <option value="Gas">Gas</option>
          <option value="Liquid">Liquid</option>
          <option value="Solid">Solid</option>
        </select>
      </div>

      {/* Add other enum fields similarly */}

      {/* Multi-select for PPE */}
      <div className="form-group">
        <label htmlFor="PPE">PPE</label>
        <select name="PPE" id="PPE" multiple={true} value={chemical.PPE} onChange={handleChange}>
          <option value="gloves">Gloves</option>
          <option value="goggles">Goggles</option>
          <option value="face shield">Face Shield</option>
          <option value="protective suit">Protective Suit</option>
          <option value="respirator">Respirator</option>
        </select>
      </div>

      {/* Update and Clear buttons */}
      <button type="submit">Update</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
};

export default ChemicalForm;
