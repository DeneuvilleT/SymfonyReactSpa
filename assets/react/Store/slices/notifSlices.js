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
      state.uid = null;
      state.msg = '';
      state.timer = 0;
    },
    restartAnimation(state) {
      state.uid = null;
    },
  },
});

export const { notificationPush, resetNotif, restartAnimation } = notifSlice.actions;

export default notifSlice.reducer;
