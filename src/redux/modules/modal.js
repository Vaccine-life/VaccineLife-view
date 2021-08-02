import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    actionVisible: (state, action) => {
      state.visible = !state.visible;
      console.log(state.visible);
    },
  },
});

export const { actionVisible } = modal.actions;

export default modal;
