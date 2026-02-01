import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const item = state.find(i => i._id === action.payload._id);
      item ? item.qty++ : state.push({ ...action.payload, qty: 1 });
    },
    removeFromCart(state, action) {
      return state.filter(i => i._id !== action.payload);
    },
    clearCart() {
      return [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = slice.actions;
export default slice.reducer;
