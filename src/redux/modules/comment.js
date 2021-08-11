import { createSlice } from "@reduxjs/toolkit";

import { commentAxios, medicalAxios } from "../../shared/api";
import logger from "../../shared/logger";
import { actionMinusComment, actionPlusComment } from "./board";
import { actionLoading } from "./isLoading";
import { actionAlert, actionSetMessage } from "./popup";

const initialState = {
  list: [],
  commentVac: [],
  commentQuar: [],
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
      state.list = action.payload;
      // state.list.push(...action.payload);
    },
    actionAddComment: (state, action) => {
      state.list.unshift(action.payload);
    },
    actionDeleteComment: (state, action) => {
      let idx = state.list.findIndex((c) => c.id === action.payload.id);
      // index위치에 있는 항목 제거(맞아야 제거하는거 아닌가..?)
      if (idx !== action.payload.id) {
        state.list.splice(idx, 1);
      }
    },
    actionSetCommentListState: (state, action) => {
      const { board, data } = action.payload;
      if (board === "vaccine") {
        state.commentVac = data;
      } else {
        state.commentQuar = data;
      }
    },
    actionAddCommentListState: (state, action) => {},
    actionDeleteCommentListState: (state, action) => {
      const { board, commentId } = action.payload;
      if (board === "vaccine") {
        const deleteIndex = state.commentVac.findIndex(
          (each) => each.id === commentId
        );
        if (deleteIndex !== -1) {
          state.commentVac.splice(deleteIndex, 1);
        }
      } else {
        const deleteIndex = state.commentQuar.findIndex(
          (each) => each.id === commentId
        );
        if (deleteIndex !== -1) {
          state.commentQuar.splice(deleteIndex, 1);
        }
      }
    },
  },
});

// 서버에 저장된 medical 불러오기
export const actionGetMedical =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const getData = await medicalAxios.getMedical();
      const data = getData.data;
      console.log(data);

      dispatch(actionSetComment(data));
    } catch (error) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

// 서버에 medical 저장하기
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
  };

export const actionGetCommentList =
  (board, boardId) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(actionLoading());
      if (board === "vaccine") {
        const getData = await commentAxios.getVacComment(boardId);
        const data = getData.data;
        dispatch(actionSetCommentListState({ board, data }));
      } else {
        const getData = await commentAxios.getQuarComment(boardId);
        const data = getData.data;
        dispatch(actionSetCommentListState({ board, data }));
      }
      dispatch(actionLoading());
    } catch (error) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };
export const actionAddCommentList =
  (board, boardId, obj) =>
  async (dispatch, getState, { history }) => {
    try {
      if (board === "vaccine") {
        await commentAxios.writeVacComment(obj);
        const getData = await commentAxios.getVacComment(boardId);
        const data = getData.data;
        dispatch(actionSetCommentListState({ board, data }));
        dispatch(actionPlusComment({ board, boardId }));
      } else {
        await commentAxios.writeQuarComment(obj);
        const getData = await commentAxios.getQuarComment(boardId);
        const data = getData.data;
        dispatch(actionSetCommentListState({ board, data }));
        dispatch(actionPlusComment({ board, boardId }));
      }
    } catch (error) {
      logger(error);
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const actionDeleteCommentList =
  (board, commentId, boardId) =>
  async (dispatch, getState, { history }) => {
    try {
      if (board === "vaccine") {
        await commentAxios.deleteVacComment(commentId, boardId);
        dispatch(actionDeleteCommentListState({ board, commentId }));
        dispatch(actionMinusComment({ board, commentId }));
      } else {
        await commentAxios.deleteQuarComment(commentId, boardId);
        dispatch(actionDeleteCommentListState({ board, commentId }));
        dispatch(actionMinusComment({ board, commentId }));
      }
    } catch (error) {
      logger(error);
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const {
  actionSetComment,
  actionAddComment,
  actionDeleteComment,
  actionSetCommentListState,
  actionAddCommentListState,
  actionDeleteCommentListState,
} = comment.actions;

export default comment;
