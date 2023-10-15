import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlices";
import postsReducer from "./slices/postSlices";
import usersReducer from "./slices/userSlices";
import authReducer from "./slices/authSlices";
import cartReducer from "./slices/cartSlices";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
