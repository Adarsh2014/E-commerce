import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUser,
  fetchLoggedInUserOrder,
  updateUser,
} from "./userAPI";
const initialState = {
  value: 0,
  status: "idle",
  error: null,
  userOrders: [],
  userInfo: null, //this info will be used in case of detailed User info while auth will only be used for loggedIn id etc..
};
export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "userData/fetchLoggedInUserOrder",
  async (userId) => {
    const response = await fetchLoggedInUserOrder(userId);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "userData/updateUser",
  async (userId) => {
    const response = await updateUser(userId);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "userData/fetchLoggedInUser",
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        //here apart from login info, all other info such as addresses will also come.
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to add item to cart.";
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        //here apart from login info, all other info such as addresses will also come.
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to add item to cart.";
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        //here apart from login info, all other info such as addresses will also come.
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to add item to cart.";
      });
  },
});

export const selectuserOrder = (state) => state.userData.userOrders;
export const selectUserInfo = (state) => state.userData.userInfo;

export default userSlice.reducer;
