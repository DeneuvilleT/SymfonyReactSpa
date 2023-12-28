import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (userId) => {
  const token = localStorage.getItem(`${location.origin}_bear_token`);
  try {
    const response = await axios.get(`/api/v1/orders/load_orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return [...response.data];
  } catch (err) {
    console.error(err.message);
    throw err;
  }
});


export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrders(state, action) {
      state.orders.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedOrders = action.payload.map((order) => {
          return order;
        });
        state.orders = loadedOrders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getOrders } = ordersSlice.actions;

export const getAllOrders    = (state) => state.orders.orders;
export const getOrdersErrors = (state) => state.orders.error;
export const getOrdersStatus = (state) => state.orders.status;

export default ordersSlice.reducer;
