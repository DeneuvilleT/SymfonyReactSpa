import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import productsReducer from "./slices/productsSlices";
import postsReducer from "./slices/postSlices";
import usersReducer from "./slices/userSlices";
import authReducer from "./slices/authSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
