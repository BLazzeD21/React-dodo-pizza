import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filterSlice from "./filter/slice";
import cartSlice from "./cart/slice";
import productsSlice from "./products/slice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()