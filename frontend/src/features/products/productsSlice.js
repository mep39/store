import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await fetch("http://localhost:5000/api/products");
    return res.json();
  }
);

const slice = createSlice({
  name: "products",
  initialState: { items: [] },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export default slice.reducer;
