import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const foundItem = state.items
          .find((item) => item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type);

      if (!foundItem) {
        state.items
            .push({ ...action.payload, count: 1 });
      } else {
        foundItem.count++;
      }

      state.totalPrice += action.payload.price;
      state.totalPrice = Math
          .round(state.totalPrice * 100) / 100;

      state.totalCount++;
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    removeFromCart(state, action) {
      const foundItem = state.items
          .find((item) => item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type);

      if (foundItem) {
        foundItem.count--;
        state.totalPrice -= action.payload.price;
        state.totalCount--;
      }

      if (foundItem.count === 0) {
        state.items = state.items.filter((item) => item !== foundItem);
      }
    },
    deleteFromCart(state, action) {
      const foundItem = state.items
          .find((item) => item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type);

      if (foundItem) {
        state.totalPrice -= foundItem.price * foundItem.count;
        state.totalCount -= foundItem.count;
        state.items = state.items.filter((item) => item !== foundItem);
      }
    },
  },

});

export const selectCart = (state) => state.cart;

export const { addToCart, clearCart,
  removeFromCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
