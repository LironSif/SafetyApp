import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../../services/userApi';
import { factoryApi } from '../../services/factoryApi';
import { departmentApi } from '../../services/departmentApi.js';
import { employeeApi } from '../../services/employeeApi';
import userReducer from '../slices/UserSlice';
// Import the factoryCreationReducer
import factoryCreationReducer from '../slices/FactoryCreationSlice'; // Adjust the path as necessary

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [factoryApi.reducerPath]: factoryApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    user: userReducer,
    // Add the new slice here
    factoryCreation: factoryCreationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(factoryApi.middleware)
      .concat(departmentApi.middleware)
      .concat(employeeApi.middleware),
});
