import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infos: [],
  isLog: false,
  status: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLog = true;
      state.infos = action.payload;
      // console.log(action.payload)
      // state.status = action.payload.roles[0];
    },
    logout(state, action) {
      state.infos = [];
      state.isLog = false;
      state.status = null;
    },
    update(state, action) {
      // state.infos = action.payload;
    },
  },
});

export const { login, logout, update } = authSlice.actions;

export default authSlice.reducer;
