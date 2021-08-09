import { createSlice } from "@reduxjs/toolkit";

const isLoading = createSlice({
  name: "isLoading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    actionLoading: (state, action) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { actionLoading } = isLoading.actions;

export default isLoading;
