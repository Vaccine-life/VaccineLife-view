import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  navVisible: false,
  modifyNicknameVisible: false,
  modifySurveyVisible: false,
};

// 액션을 실행할 때 마다 true false를 오간다. 스위치를 끄고 켜는 느낌
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

    actionModifyNicknameVisible: (state, action) => {
      state.modifyNicknameVisible = !state.modifyNicknameVisible;
      // 모달 켜져있을 때 원래화면 스크롤 방지
      if (state.modifyNicknameVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },

    // 마이페이지 백신설문수정 클릭시 뜨는 modal
    actionModifySurveyVisible: (state, action) => {
      state.modifySurveyVisible = !state.modifySurveyVisible;
      // 모달 켜져있을 때 원래화면 스크롤 방지
      if (state.modifySurveyVisible) {
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
  actionModifyNicknameVisible,
  actionModifySurveyVisible,
} = modal.actions;

export default modal;
