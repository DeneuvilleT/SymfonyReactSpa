import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  addresses: [],
  status: "idle",
  error: null,
};

export const fetchAddresses = createAsyncThunk("addresses/fetchAddresses", async (userId) => {
  try {
    const response = await axios.get(`/api/v1/addresses/load_addresses?userId=${userId}`);
    return [...response.data];
  } catch (err) {
    console.error(err.message);
    throw err;
  }
});

export const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    getAddresses(state, action) {
      state.addresses.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAddresses.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedAddresses = action.payload.map((address) => {
          return address;
        });
        state.addresses = loadedAddresses;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getAddresses } = addressesSlice.actions;

export const getAllAddresses = (state) => state.addresses.addresses;
export const getAddressesErrors = (state) => state.addresses.error;
export const getAddressesStatus = (state) => state.addresses.status;

export default addressesSlice.reducer;
