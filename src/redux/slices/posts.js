import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    ststus: "loading",
  },
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducer: {},
});

export const postsReducer = postsSlice.reducer;
