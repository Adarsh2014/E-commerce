import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrder } from "./userAPI";
const initialState = {
  value: 0,
  status: "idle",
  error: null,
  userOrders: [],
};
export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "userData/fetchLoggedInUserOrder",
  async (userId) => {
    const response = await fetchLoggedInUserOrder(userId);
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
      });
  },
});

export const selectuserOrder = (state) => state.userData.userOrders;

export default userSlice.reducer;
