import { configureStore } from "@reduxjs/toolkit";

import commentsReducer from "./slices/commentsSlices";
import ordersReducer from "./slices/ordersSlices";
import productsReducer from "./slices/productsSlices";
import authReducer from "./slices/authSlices";
import cartReducer from "./slices/cartSlices";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
    comments: commentsReducer,
    orders: ordersReducer,
  },
});
