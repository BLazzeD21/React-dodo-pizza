import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  totalPrice: 0,
  totalCount: 0,
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const foundItem = state.cart.find(
          (item) => item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type);

      if (!foundItem) {
        state.cart.push({ ...action.payload, count: 1 });
      } else {
        foundItem.count++;
      }

      state.totalPrice += action.payload.price;
      state.totalPrice = Math.round(state.totalPrice * 100) / 100;
      state.totalCount++;
    },
    // getCount(state, action) {
    //   if (state.cart) {
    //     const foundItems = state.cart.find(
    //         (item) => item.id === action.payload.id);

    //     if (foundItems) {
    //       return foundItems.count;
    //     }
    //   }

    //   return 0;
    // },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;


export default cartSlice.reducer;
