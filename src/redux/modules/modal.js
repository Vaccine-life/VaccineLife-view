import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  navVisible: false,
  modifyNickname: false,
  modifySurvey: false,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Login Modal
    actionVisible: (state, action) => {
      state.visible = !state.visible;
      // 모달 켜져있을 때 원래화면 스크롤 방지
      if (state.visible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },

    // 모바일뷰 우측상단 삼선버튼 클릭시 뜨는 modal
    actionNavVisible: (state, action) => {
      state.navVisible = !state.navVisible;
      // 모달 켜져있을 때 원래화면 스크롤 방지
      if (state.navVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },

    actionModifyNickname: (state, action) => {
      state.modifyNickname = !state.modifyNickname;
      // 모달 켜져있을 때 원래화면 스크롤 방지
      if (state.modifyNickname) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },

    // 마이페이지 백신설문수정 클릭시 뜨는 modal
    actionModifySurvey: (state, action) => {
      state.modifySurvey = !state.modifySurvey;
      // 모달 켜져있을 때 원래화면 스크롤 방지
      if (state.navVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },
  },
});

export const {
  actionVisible,
  actionNavVisible,
  actionModifyNickname,
  actionModifySurvey,
} = modal.actions;

export default modal;
