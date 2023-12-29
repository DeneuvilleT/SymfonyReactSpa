import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  push: null,
  timer: null,
  msg: '',
};

const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    notificationPushLaunch(state, action) {
      state.push = action.payload;
    },
    notificationPush(state, action) {
      state.msg = action.payload.msg;
      state.timer = action.payload.timer;
    },
    resetNotif(state, action) {
      state.msg = '';
      state.push = null;
      state.timer = null;
    }
  }
});

export const { notificationPush, notificationPushLaunch, resetNotif } = notifSlice.actions;

export default notifSlice.reducer;
