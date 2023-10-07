import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postsReducer from "./slices/postSlices";
import usersReducer from "./slices/userSlices";
import postsAxiosReducer from "./slices/postAxiosSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    postsAxios: postsAxiosReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
