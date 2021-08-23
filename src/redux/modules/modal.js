import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  navVisible: false,
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

    // 마이페이지 닉네임수정 클릭시 뜨는 modal
    actionNicknameVisible: (state, action) => {
      state.nicknameVisible = !state.nicknameVisible;
      // 모달 켜져있을 때 원래화면 스크롤 방지
      if (state.navVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },

    // 마이페이지 백신설문수정 클릭시 뜨는 modal
    actionSurveyVisible: (state, action) => {
      state.surveyVisible = !state.surveyVisible;
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
  actionNicknameVisible,
  actionSurveyVisible,
} = modal.actions;

export default modal;
