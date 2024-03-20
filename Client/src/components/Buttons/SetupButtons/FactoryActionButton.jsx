import React from 'react';
import { useCreateFactoryMutation, useUpdateFactoryMutation } from '../../../services/factoryApi';

const FactoryActionButton = ({ mode, data, onError }) => {
  const [createFactory, { isSuccess: isCreateSuccess }] = useCreateFactoryMutation();
  const [updateFactory, { isSuccess: isUpdateSuccess }] = useUpdateFactoryMutation();

  const handleAction = async () => {
    try {
      if (mode === 'create') {
        await createFactory(data).unwrap();
      } else if (mode === 'update') {
        await updateFactory({ id: data.id, ...data }).unwrap();
      }
    } catch (err) {
      const errorResponse = err?.data?.message || 'An unexpected error occurred. Please try again.';
      onError(errorResponse);
    }
  };

  const buttonText = () => {
    if (mode === 'create' && isCreateSuccess) return 'Factory created';
    if (mode === 'update' && isUpdateSuccess) return 'Edited successfully';
    return mode === 'create' ? 'Create Factory' : 'Update Factory';
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

export default FactoryActionButton;
