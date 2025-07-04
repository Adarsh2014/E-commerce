import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/ProductSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import userDataReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: authReducer,
    cart: cartReducer,
    order: orderReducer,
    userData: userDataReducer,
  },
});
