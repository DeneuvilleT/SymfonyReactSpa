import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await axios.get("/api/v1/products/");
    return [...response.data];
  } catch (err) {
    if (err.status === 401) {
      localStorage.removeItem(`${location.origin}_bear_token`);
      return location.href = '/';
    }
    return console.error(err.message);
  }
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedProducts = action.payload.map((product) => {
          return product;
        });
        state.products = loadedProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getProducts } = productsSlice.actions;

export const getAllProducts    = (state) => state.products.products;
export const getProductsErrors = (state) => state.products.error;
export const getProductsStatus = (state) => state.products.status;

export default productsSlice.reducer;
