import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

const initialState = {
  products: [],
  status: 'loading',
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params, thunkAPI) => {
      const { sortBy, order, categoryId } = params;
      const url = new URL(`https://${MOCKAPISECRET}.mockapi.io/api/pizzas`);

      url.searchParams.append('sortBy', sortBy);
      url.searchParams.append('order', order);
      url.searchParams.append('category', categoryId);

      const { data } = await axios({
        method: 'GET',
        url: url,
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!data) return thunkAPI.rejectWithValue('Array is empty');

      return data;
    },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers:
    (builder) => {
      builder
          .addCase(fetchProducts.pending, (state) => {
            state.products = [];
            state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = 'success';
          })
          .addCase(fetchProducts.rejected, (state) => {
            state.products = [];
            state.status = 'error';
          });
    },
});

export const selectProducts = (state) => state.products;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
