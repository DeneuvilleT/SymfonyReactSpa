import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk("comments/fetchComments", async (userId) => {
  const token = localStorage.getItem(`${location.origin}_bear_token`);
  try {
    const response = await axios.get(`/api/v1/comments/load_comments/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return [...response.data];
  } catch (err) {
    if (err.status === 401) {
      localStorage.removeItem(`${location.origin}_bear_token`);
      return location.href = '/';
    }
    return console.error(err.message);
  }
});


export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getComments(state, action) {
      state.comments.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedComments = action.payload.map((comment) => {
          return comment;
        });
        state.comments = loadedComments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getComments } = commentsSlice.actions;

export const getAllComments = (state) => state.comments.comments;
export const getCommentsErrors = (state) => state.comments.error;
export const getCommentsStatus = (state) => state.comments.status;

export default commentsSlice.reducer;
