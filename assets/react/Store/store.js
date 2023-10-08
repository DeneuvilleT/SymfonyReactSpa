import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postsReducer from "./slices/postSlices";
import usersReducer from "./slices/userSlices";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
