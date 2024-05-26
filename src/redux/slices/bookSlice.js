import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from '../../const';

export const fetchReviews = createAsyncThunk('books/fetchReviews', async (offset, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.get(`${url}/public/books?offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const bookSlice = createSlice({
  name: 'books',
  initialState: {
    reviews: [],
    status: 'idle',
    error: null,
    offset: 0
  },
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setOffset } = bookSlice.actions;

export default bookSlice.reducer;
