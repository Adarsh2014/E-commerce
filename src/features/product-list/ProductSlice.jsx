import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilter,
  fetchBrands,
  fetchCategories,
  fetchWeight,
  fetchProductByid,
  addToProduct,
} from "./ProductAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItem: 0,
  brands: [],
  categories: [],
  weight: [],
  selectedProduct: null,
  items: [],
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
export const addToProductAsync = createAsyncThunk(
  "product/addToProduct",
  async (product) => {
    const response = await addToProduct(product);
    return response.data;
  }
);

export const fetchBrandAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchWeightAsync = createAsyncThunk(
  "product/fetchWeight",
  async () => {
    const response = await fetchWeight();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchProductByidAsync = createAsyncThunk(
  "product/fetchProductByid",
  async (id) => {
    const response = await fetchProductByid(id);
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
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to fetch products:", action.error.message);
      })
      .addCase(fetchBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchBrandAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to fetch products:", action.error.message);
      })
      .addCase(fetchWeightAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeightAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weight = action.payload;
      })
      .addCase(fetchWeightAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to fetch products:", action.error.message);
      })
      .addCase(fetchProductByidAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByidAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByidAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to fetch products:", action.error.message);
      })
      .addCase(addToProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToProductAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to add products:", action.error.message);
      });
  },
});

export const selectAllProducts = (state) => state.product.products;

export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectWeight = (state) => state.product.weight;
export const selectedProductByid = (state) => state.product.selectedProduct;
export const selectTotalItem = (state) => state.product.totalItem;
export const selectaddProductItems = (state) => state.product.items;

export default productSlice.reducer;
