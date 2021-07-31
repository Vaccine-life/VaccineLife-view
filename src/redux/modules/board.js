import { createSlice } from "@reduxjs/toolkit";

const board = createSlice({
  name: "board",
  initialState: {
    list: [],
    board: {},
    page: {
      // list에서 각각 board값
      prev: {},
      next: {},
    },
  },
  reducers: {
    actionSetList: (state, action) => {
      state.list = action.payload;
    },
    actionSetBoard: (state, action) => {
      state.board = action.payload;
    },
    // action을  vBoardId 값을 가져옴
    actionSetPrevNextPage: (state, action) => {
      const currentIndex = state.list.findIndex((each) => {
        return each.vacBoardId === action.payload;
      });
      const totalLength = state.list.length;
      state.page.prev =
        totalLength === currentIndex ? undefined : state.list[currentIndex + 1];
      state.page.next =
        0 === currentIndex ? undefined : state.list[currentIndex - 1];
    },
  },
});

export const { actionSetList, actionSetBoard, actionSetPrevNextPage } =
  board.actions;

export default board;
