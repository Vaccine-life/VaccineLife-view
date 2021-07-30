import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const initialState = {
  list: [],
};

const initialComment = {
    comment: "",
    insert_dt: moment().format("YYYY년 MM월 DD일 hh:mm:ss"),
}

// createSlice는 initialState, action, reducer를 하나의 객체에 담아 전달받음.
// action creator와 action type을 가진 reducer 자동 생성
const comment = createSlice({
  // 리듀서 이름(액션의 경로를 잡아줄 이름)
  name: "comment",
  initialState,
  // action을 선언하고 해당 action이 dispatch되면 바로 state를 가지고 action처리 함.
  reducers: {
    actionSetComment: (state, action) => {
      state.list = action.payload;
    },
    actionAddComment: (state, action) => {
      state.list.unshift(action.payload)
    },
    actionDeleteComment: (state, action) => {
      
    },
  },
});

export const { actionSetComment, actionAddComment } = comment.actions;

export default comment;
