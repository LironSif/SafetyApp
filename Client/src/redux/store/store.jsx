import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../../services/userApi';
import { factoryApi } from '../../services/factoryApi';
import { departmentApi } from '../../services/departmentApi';
import { employeeApi } from '../../services/employeeApi';
import { fileApi } from '../../services/fileApi'; // Import the fileApi
import userReducer from '../slices/UserSlice';
import factoryCreationReducer from '../slices/FactoryCreationSlice'; // Adjust the path as necessary

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [factoryApi.reducerPath]: factoryApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer, // Add the fileApi reducer
    user: userReducer,
    factoryCreation: factoryCreationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(factoryApi.middleware)
      .concat(departmentApi.middleware)
      .concat(employeeApi.middleware)
      .concat(fileApi.middleware), // Add the fileApi middleware
});
