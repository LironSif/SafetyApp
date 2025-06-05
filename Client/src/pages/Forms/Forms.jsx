import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FactoryForm from './FactoryForm';
import SubcontractorForm from './SubcontractorForm';
import './Forms.css';

const Forms = () => {
  return (
    <div className="forms">
      <Routes>
        <Route path="/factory" element={<FactoryForm />} />
        <Route path="/subcontractor-form" element={<SubcontractorForm />} />
      </Routes>
    </div>
  );
};

export default Forms;
