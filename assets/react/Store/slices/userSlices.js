import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    name: "Thomas",
  },
  {
    id: 1,
    name: "François",
  },
  {
    id: 2,
    name: "Emmeline",
  },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
