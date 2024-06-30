import React, { useState, useEffect } from 'react';
import { chemicals } from '../../Constants/chemicals'; // Adjust the import path as necessary
import './AddChemicalToDepartment.css'; 

const AddChemicalToDepartment = ({ onChemicalsAdded }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredChemicals, setFilteredChemicals] = useState([]);
  const [selectedChemicals, setSelectedChemicals] = useState([]);

  useEffect(() => {
    const filterResults = Object.entries(chemicals).filter(([unNumber, { Name }]) =>
      Name.toLowerCase().includes(searchTerm.toLowerCase()) || unNumber.includes(searchTerm)
    ).map(([UNNumber, chemical]) => ({ UNNumber, ...chemical }));
    
    setFilteredChemicals(filterResults);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChemical = (UNNumber) => {
    if (!selectedChemicals.find(chemical => chemical.UNNumber === UNNumber)) {
      setSelectedChemicals(prev => [...prev, { UNNumber, ...chemicals[UNNumber] }]);
    } else {
      alert('Chemical already selected');
    }
    setSearchTerm('');
    setFilteredChemicals([]);
  };

  const handleRemoveChemical = (UNNumber) => {
    setSelectedChemicals(prev => prev.filter(chemical => chemical.UNNumber !== UNNumber));
  };

  const handleAddToDepartment = () => {
    console.log("Adding chemicals to department:", selectedChemicals);
    onChemicalsAdded(selectedChemicals);
    alert(`${selectedChemicals.length} chemical(s) added to department.`);
    // setSelectedChemicals([]); 
  };

  return (
    <div className="add-chemical-container">
      <label htmlFor="searchChemical">Add Chemicals to Dept</label>
      <input
        id="searchChemical"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name or UN number..."
        className="search-input"
      />
      {searchTerm && (
        <ul className="results-dropdown">
          {filteredChemicals.map(({ UNNumber, Name }) => (
            <li key={UNNumber} onClick={() => handleSelectChemical(UNNumber)}>
              {Name} ({UNNumber})
            </li>
          ))}
        </ul>
      )}
      <div className="selected-chemicals-container">
        {selectedChemicals.map(({ UNNumber, Name }) => (
          <div key={UNNumber} className="selected-chemical">
            {Name} ({UNNumber})
            <button onClick={() => handleRemoveChemical(UNNumber)} className="remove-chemical-btn">X</button>
          </div>
        ))}
      </div>
      {selectedChemicals.length > 0 && (
        <button onClick={handleAddToDepartment} className="add-to-department-btn">
          Add to Department
        </button>
      )}
    </div>
  );
};

export default AddChemicalToDepartment;
