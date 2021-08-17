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

      // 모달 켜져있을 때 원래화면 스크롤 방지
      if (state.visible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },
    actionNavVisible: (state, action) => {
      state.navVisible = !state.navVisible;

      // 모달 켜져있을 때 원래화면 스크롤 방지
      if (state.navVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },
  },
});

export const { actionVisible, actionNavVisible } = modal.actions;

export default modal;
