import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  statuts: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchposts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    return console.error(err.message);
  }
});

export const postsAxiosSlice = createSlice({
  name: "postsAxios",
  initialState,
  reducers: {
    // postAdded(state, action) {
    //   state.push(action.payload);
    // },
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            date: new Date().toISOString(),
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
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) existingPost.reactions[reaction]++;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.statuts = "Chargement";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.statuts = "Succés";

        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          (post.date = sub(new Date(), { minutes: min++ }).toISOString()),
            (post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            });
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.statuts = "Echec";
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.statuts;
export const getPostsErrors = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsAxiosSlice.actions;

export default postsAxiosSlice.reducer;
