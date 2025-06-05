import { useState } from 'react';
import {
  useCreateFactoryMutation,
  useCreateDepartmentMutation,
} from '../services/factoryApi';

export const useFactorySetup = (userId: string | undefined) => {
  const [factoryDetails, setFactoryDetails] = useState({
    factoryName: '',
    factoryAddress: '',
  });
  const [departments, setDepartments] = useState<string[]>([]);
  const [createFactory] = useCreateFactoryMutation();
  const [createDepartment] = useCreateDepartmentMutation();

  const submitFactory = async () => {
    if (!userId) return;
    await createFactory({ ...factoryDetails, userId });
  };

  const submitDepartments = async (factoryId: string) => {
    await createDepartment({ factoryId, userId, departments });
  };

  return {
    factoryDetails,
    setFactoryDetails,
    departments,
    setDepartments,
    submitFactory,
    submitDepartments,
  };
};
