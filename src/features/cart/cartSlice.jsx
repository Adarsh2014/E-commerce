import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addToCart,
  deleteCart,
  fetchItemByUserid,
  resetCart,
  updateCart,
} from "./cartAPI";
const initialState = {
  value: 0,
  status: "idle",
  error: null,
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (itemData) => {
    const response = await addToCart(itemData);
    return response.data;
  }
);

export const fetchItemByUseridAsync = createAsyncThunk(
  "cart/fetchItemByUserid",
  async (userId) => {
    const response = await fetchItemByUserid(userId);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteCartAync = createAsyncThunk(
  "cart/deleteCart",
  async (itemId) => {
    const response = await deleteCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to add item to cart.";
      })
      .addCase(fetchItemByUseridAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemByUseridAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItemByUseridAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to add item to cart.";
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to add item to cart.";
      })
      .addCase(deleteCartAync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartAync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        console.log(
          "index found for deletion:",
          index,
          "payload ID:",
          action.payload.id
        );
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      })
      .addCase(deleteCartAync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to add item to cart.";
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to add item to cart.";
      });
  },
});
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
