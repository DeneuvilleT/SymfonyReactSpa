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
      localStorage.setItem(`${location.origin}_bear_token`, action.payload.token);
      state.isLog = true;
      state.infos = action.payload.user;
      if (action.payload !== null) state.status = action.payload.user.roles[0];
    },
    logout(state, action) {
      state.infos = [];
      state.isLog = false;
      state.status = null;
      localStorage.removeItem(`${location.origin}_bear_token`);
    },
    update(state, action) {
      // state.infos = action.payload;
    },
  },
});

export const { login, logout, update } = authSlice.actions;

export default authSlice.reducer;
