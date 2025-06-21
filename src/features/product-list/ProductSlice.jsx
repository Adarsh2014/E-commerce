import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilter } from "./ProductAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, sort }) => {
    const response = await fetchProductsByFilter(filter, sort);
    return response.data;
  }
);

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProductAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to fetch products:", action.error.message);
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to fetch products:", action.error.message);
      });
  },
});

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
