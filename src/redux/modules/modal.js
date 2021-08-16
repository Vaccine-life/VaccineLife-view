import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  navVisible: false,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    actionVisible: (state, action) => {
      state.visible = !state.visible;
    },
    actionNavVisible: (state, action) => {
      state.navVisible = !state.navVisible;
    },
  },
});

export const { actionVisible, actionNavVisible } = modal.actions;

export default modal;
