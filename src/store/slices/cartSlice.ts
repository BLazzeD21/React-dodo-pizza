import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";

interface cartSliceState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}

const { cart, totalCount, totalPrice } = getCartFromLS();

const initialState: cartSliceState = {
  items: cart,
  totalPrice: totalPrice,
  totalCount: totalCount,
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

      if (foundItem) {
        foundItem.count && foundItem.count--;
        state.totalPrice -= action.payload.price;
        state.totalCount--;
      }

      if (foundItem && foundItem.count === 0) {
        state.items = state.items.filter((item) => item !== foundItem);
      }
    },
    deleteFromCart(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );

      if (foundItem) {
        state.totalPrice -= foundItem.price * (foundItem.count ?? 0);
        state.totalCount -= foundItem.count ?? 0;
        state.items = state.items.filter((item) => item !== foundItem);
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, clearCart, removeFromCart, deleteFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;