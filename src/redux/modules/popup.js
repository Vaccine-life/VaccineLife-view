import { createSlice } from "@reduxjs/toolkit";

const popup = createSlice({
  name: "popup",
  initialState: {
    alert: false,
    confirm: false,
    commentConfirm: false,
    medicalConfirm: false,
    commentObj: {},
    medicalObj: {},
    alertMessage: "",
  },
  reducers: {
    actionAlert: (state, action) => {
      state.alert = !state.alert;
    },
    actionConfirm: (state, action) => {
      state.confirm = !state.confirm;
    },
    actionCommentConfirm: (state, action) => {
      state.commentConfirm = !state.commentConfirm;
    },
    actionMedicalConfirm: (state, action) => {
      state.medicalConfirm = !state.medicalConfirm;
    },
    actionSetMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
    acionSetCommentObj: (state, action) => {
      state.commentObj = action.payload;
      // console.log(state.commentObj)
    },
    acionSetMedicalObj: (state, action) => {
      state.medicalObj = action.payload;
      console.log(state.medicalObj);
    },
  },
});

export const {
  actionAlert,
  actionConfirm,
  actionSetMessage,
  actionCommentConfirm,
  actionMedicalConfirm,
  acionSetCommentObj,
  acionSetMedicalObj,
} = popup.actions;

export default popup;
