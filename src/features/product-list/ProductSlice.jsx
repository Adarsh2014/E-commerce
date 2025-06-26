import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilter } from "./ProductAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItem: 0,
};

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination);
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
        state.products = action.payload.products;
        state.totalItem = action.payload.totalItem;
      })
      .addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to fetch products:", action.error.message);
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItem = (state) => state.product.totalItem;

export default productSlice.reducer;
