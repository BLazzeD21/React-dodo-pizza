import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

const initialState = {
  products: [],
  status: 'loading',
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params) => {
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
            console.log('loading');
            state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            console.log('success');
            state.status = 'success';
          })
          .addCase(fetchProducts.rejected, (state) => {
            state.products = [];
            console.log('error');
            state.status = 'error';
          });
    },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
