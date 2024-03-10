import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleMode",
  initialState: { darkMode: true },
  reducers: {
    toggleMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleMode } = toggleSlice.actions;

export default toggleSlice.reducer;
