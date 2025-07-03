import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

const initialState = {
  status: "idle",
  error: null,
  orders: [],
};
export const createOrderAsync = createAsyncThunk(
  "cart/createOrder",
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to add item to cart.";
      });
  },
});
export const selectorderItems = (state) => state.cart.items;
export default orderSlice.reducer;
