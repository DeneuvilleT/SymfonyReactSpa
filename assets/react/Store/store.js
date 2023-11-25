import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlices";
import commentReducer from "./slices/commentsSlices";
import usersReducer from "./slices/userSlices";
import authReducer from "./slices/authSlices";
import cartReducer from "./slices/cartSlices";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
    comments: commentReducer,
    users: usersReducer,
  },
});
