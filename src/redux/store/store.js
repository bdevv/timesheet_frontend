import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../authslice";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
  },
});
