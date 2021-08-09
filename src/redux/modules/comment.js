import { createSlice } from "@reduxjs/toolkit";
import { medicalAxios } from "../../shared/api";
import { actionAlert, actionSetMessage } from "./popup";
import moment from "moment";


// function timeForToday(value) {
//   const today = new Date();
//   const timeValue = new Date(value);

//   const betweenTime = Math.floor(
//     (today.getTime() - timeValue.getTime()) / 1000 / 60
//   );
//   if (betweenTime < 1) return "방금전";
//   if (betweenTime < 60) {
//     return `${betweenTime}분전`;
//   }
//   const betweenTimeHour = Math.floor(betweenTime / 60);
//   if (betweenTimeHour < 24) {
//     return `${betweenTimeHour}시간전`;
//   }
//   const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
//   if (betweenTimeDay < 365) {
//     return `${betweenTimeDay}일전`;
//   }
//   return `${Math.floor(betweenTimeDay / 365)}년전`;
//   }

const initialState = {
  list: [],
  // medicalId: "",
  // nickname: "",
  // comment: "",
  // insert_dt: timeForToday(moment().format()),
};

// createSlice는 initialState, action, reducer를 하나의 객체에 담아 전달받음.
// action creator와 action type을 가진 reducer 자동 생성
const comment = createSlice({
  // 리듀서 이름(액션의 경로를 잡아줄 이름)
  name: "comment",
  initialState,
  // action을 선언하고 해당 action이 dispatch되면 바로 state를 가지고 action처리 함.
  reducers: {
    actionSetComment: (state, action) => {
      // state.list = action.payload;
      state.list.push(...action.payload);
    },
    actionAddComment: (state, action) => {
      state.list.unshift(action.payload)
    },
    actionDeleteComment: (state, action) => {
      let idx = state.list.findIndex((c) => c.medicalId === action.payload.medicalId);
      // index위치에 있는 항목 제거(맞아야 제거하는거 아닌가..?)
      if (idx !== action.payload.medicalId){
        state.list.splice(idx, 1);
      }
    },
  },
});

// 비동기...?
export const actionGetMedical =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const getData = await medicalAxios.getMedical();
      const data = getData.data;
      console.log(data)
      // let medical_input = {
      //   nickname: data.nickname,
      //   contents: data.comment,
      //   createdAt: data.createdAt,
      // };
      // await medicalAxios.getMedical()

      dispatch(actionSetComment(data));
    } catch (error) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const actionAddMedical = 
  (contents) =>
  async (dispatch, getState, { history }) => {
    try {
      await medicalAxios.addMedical(contents);
      history.replace("/medical");
    } catch (err) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  }


export const { 
  actionSetComment, 
  actionAddComment, 
  actionDeleteComment 
} = comment.actions;

export default comment;
