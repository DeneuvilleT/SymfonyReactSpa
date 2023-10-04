import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Store/features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
