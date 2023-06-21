import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  console.log(data);
  return data;

});

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
  reducers: {},
  extraReducers: {
    // Загрузка
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
      
    },
    // Загрузка выполнилось успешно
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
      console.log(action.payload);
    },
    
    // Ошибка при загрузке
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
  },
});

export const postsReducer = postsSlice.reducer;
