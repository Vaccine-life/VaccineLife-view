import { createSlice } from "@reduxjs/toolkit";

const popup = createSlice({
  name: "popup",
  initialState: {
    alert: false,
    confirm: false,
    alertMessage: "",
  },
  reducers: {
    actionAlert: (state, action) => {
      state.alert = !state.alert;
    },
    actionConfirm: (state, action) => {
      state.confirm = !state.confirm;
    },
    actionSetMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
  },
});

export const { actionAlert, actionConfirm, actionSetMessage } = popup.actions;

export default popup;
