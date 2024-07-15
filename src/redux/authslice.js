import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
  name: "",
  token: "",
  isManager: "",
  employee_id: "",
};
export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    activeTab: (state, action) => {
      state.value = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsManager: (state, action) => {
      state.isManager = action.payload;
    },
    setEmployeeId: (state, action) => {
      state.employee_id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { activeTab, setName, setToken, setIsManager, setEmployeeId } = tabSlice.actions;

export default tabSlice.reducer;
