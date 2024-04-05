import { createSlice, PayloadAction } from "@reduxjs/toolkit";
``;
import { Status, productsSliceState } from "./types";
import { fetchProducts } from "./productsAPI";

const initialState: productsSliceState = {
  products: [],
  status: Status.PENDING,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products = [];
        state.status = Status.PENDING;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.status = Status.FULFILLED;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.products = [];
        state.status = Status.REJECTED;
      });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
