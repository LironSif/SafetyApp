import React, { useState } from 'react';
import DeptDetailsView from '../DeptSetup/DeptCardPages/DeptDetailsView'; // New component for displaying details
import DeptEditView from '../DeptSetup/DeptCardPages/EditDeptDetails'; // New component for editing details
import './DeptSetupCard.css'

const DeptCard = ({ department }) => {
  const [currentPage, setCurrentPage] = useState('details'); // 'details' or 'edit'

  return (
    <div className="dept-card">
      {currentPage === 'details' && (
        <DeptDetailsView department={department} onEdit={() => setCurrentPage('edit')} />
      )}
      {currentPage === 'edit' && (
        <DeptEditView department={department} onCancel={() => setCurrentPage('details')} />
      )}
    </div>
  );
};

export default DeptCard;
