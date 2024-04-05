import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface cartSliceState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}

const initialState: cartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );

      if (!foundItem) {
        state.items.push({ ...action.payload, count: 1 });
      } else {
        foundItem.count && foundItem.count++;
      }

      state.totalPrice += action.payload.price;
      state.totalPrice = Math.round(state.totalPrice * 100) / 100;

      state.totalCount++;
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    removeFromCart(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );

      if (!foundItem) return;

      if (foundItem.count === 0) {
        state.items = state.items.filter((item) => item !== foundItem);
        return;
      }

      foundItem.count && foundItem.count--;
      state.totalPrice -= action.payload.price;
      state.totalCount--;
    },
    deleteFromCart(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );

      if (!foundItem) return;

      state.totalPrice -= foundItem.price * (foundItem.count ?? 0);
      state.totalCount -= foundItem.count ?? 0;
      state.items = state.items.filter((item) => item !== foundItem);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, clearCart, removeFromCart, deleteFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
