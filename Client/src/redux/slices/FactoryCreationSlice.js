import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  factoryId: null,
  isFactoryCreated: false,
  areDepartmentsCreated: false,
  quickSetupComplete: false, // New state to track the overall completion
};

export const factoryCreationSlice = createSlice({
  name: 'factoryCreation',
  initialState,
  reducers: {
    setFactoryId: (state, action) => {
      state.factoryId = action.payload;
    },
    setFactoryCreated: (state, action) => {
      state.isFactoryCreated = action.payload;
    },
    setDepartmentsCreated: (state, action) => {
      state.areDepartmentsCreated = action.payload;
    },
    setQuickSetupComplete: (state, action) => { // New reducer to update quick setup completion state
      state.quickSetupComplete = action.payload;
    },
  },
});

export const { setFactoryId, setFactoryCreated, setDepartmentsCreated, setQuickSetupComplete } = factoryCreationSlice.actions;

export default factoryCreationSlice.reducer;
