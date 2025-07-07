import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { checkUser, createUser} from "./authAPI";
import { updateUser } from "../user/userAPI";
const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo, { rejectWithValue }) => {
    const response = await checkUser(loginInfo);
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error;
      });
  },
});

export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectError = (state) => state.user.error;

export default authSlice.reducer;
