import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import productsReducer from "./slices/productsSlices";
import postsReducer from "./slices/postSlices";
import usersReducer from "./slices/userSlices";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
