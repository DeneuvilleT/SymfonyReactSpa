import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  uid: null,
  timer: 0,
  msg: '',
};

const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    notificationPush(state, action) {
      state.uid = uuidv4();
      state.msg = action.payload.msg;
      state.timer = action.payload.timer;
    },
    resetNotif(state, action) {
      state.msg = '';
      state.timer = 0;
      state.uid = null;
    }
  }
});

export const { notificationPush, notificationPushLaunch, resetNotif } = notifSlice.actions;

export default notifSlice.reducer;
