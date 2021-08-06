import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { boardAxios, writeAxios } from "../../shared/api";
import logger from "../../shared/logger";
import { actionAlert, actionSetMessage } from "./popup";

const board = createSlice({
  name: "board",
  initialState: {
    list: [],
    topThree: [],
    board: {},
    page: {
      // list에서 각각 board값
      prev: {},
      next: {},
    },
    paging: {
      nextPage: 1,
      totalPage: 10,
    },
  },
  reducers: {
    actionSetList: (state, action) => {
      state.list = action.payload;
    },
    actionSetBoard: (state, action) => {
      state.board = action.payload;
    },

    actionSetTopThree: (state, action) => {
      state.topThree = action.payload;
    },
    // action을  vacBoardId, board 값을 가져옴
    actionSetPrevNextPage: (state, action) => {
      const currentIndex = state.list.findIndex((each) => {
        return each.boardId === action.payload;
      });
      const totalLength = state.list.length;
      state.page.prev =
        totalLength === currentIndex ? undefined : state.list[currentIndex + 1];
      state.page.next =
        0 === currentIndex ? undefined : state.list[currentIndex - 1];
    },
  },
});

export const actionGetTopThreeVac =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const getData = await boardAxios.topThreeVac();
      dispatch(actionSetTopThree(getData.data));
    } catch (error) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const actionWriteExperience =
  (board, contenstObj) =>
  async (dispatch, getState, { history }) => {
    try {
      if (board === "vaccine") {
        await writeAxios.vacWrite(contenstObj);
        history.push("/vaccine");
      } else {
        await writeAxios.quarWrite(contenstObj);
        history.push("/quarantine");
      }
    } catch (error) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const {
  actionSetList,
  actionSetBoard,
  actionSetTopThree,
  actionSetPrevNextPage,
} = board.actions;

export default board;
