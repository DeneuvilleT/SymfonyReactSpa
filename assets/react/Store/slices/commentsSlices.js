import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "/api/v1/comments/";

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk("comments/fetchComment", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    return console.error(err.message);
  }
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentAdded: {
      reducer(state, action) {
        state.comments.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            title,
            author,
            content,
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.comments.find((post) => post.id === postId);
      if (existingPost) existingPost.reactions[reaction]++;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";

        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          (post.date = sub(new Date(), { minutes: min++ }).toISOString())
          return post;
        });
        state.comments = loadedPosts;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllComments = (state) => state.comments.comments;
export const getCommentsStatus = (state) => state.comments.status;
export const getCommentsErrors = (state) => state.comments.error;

export const { postAdded, reactionAdded } = commentsSlice.actions;

export default commentsSlice.reducer;
