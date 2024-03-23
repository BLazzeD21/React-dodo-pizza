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
    },
    // removeFromCart(state, action) {
    //   state.items = state.items
    //       .filter((item) => {
    //         console.log(item.id, item.size, item.type);
    //       });

    //   console.log(action.payload.id,
    // action.payload.size, action.payload.type);
    // },
  },

});

// export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

export const { addToCart, clearCart } = cartSlice.actions;


export default cartSlice.reducer;
