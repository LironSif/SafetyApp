import React from 'react';
import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from '../../../services/departmentApi';

const DepartmentActionButton = ({ mode, data, onError }) => {
  const [createDepartment, { isSuccess: isCreateSuccess }] = useCreateDepartmentMutation();
  const [updateDepartment, { isSuccess: isUpdateSuccess }] = useUpdateDepartmentMutation();

  const handleAction = async () => {
    try {
      if (mode === 'create') {
        await createDepartment(data).unwrap();
      } else if (mode === 'update') {
        await updateDepartment({ id: data.id, ...data }).unwrap();
      }
    } catch (err) {
      const errorResponse = err?.data?.message || 'An error occurred. Please try again.';
      onError(errorResponse);
    }
  };

  const buttonText = () => {
    if (mode === 'create' && isCreateSuccess) return 'Department created';
    if (mode === 'update' && isUpdateSuccess) return 'Edited successfully';
    return mode === 'create' ? 'Create Department' : 'Update Department';
  };

  const buttonStyle = {
    backgroundColor: (isCreateSuccess || isUpdateSuccess) ? 'green' : 'blue',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handleAction}>
        {buttonText()}
      </button>
    </div>
  );
};

export default DepartmentActionButton;
