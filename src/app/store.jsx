import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/ProductSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: authReducer,
    cart: cartReducer,
  },
});
