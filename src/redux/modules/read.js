import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../shared/enterLocalStorage";
import logger from "../../shared/logger";

const read = createSlice({
  name: "read",
  initialState: {
    vacList: [],
    quarList: [],
  },
  reducers: {
    actionSetReadVac: (state, action) => {
      state.vacList = action.payload;
    },
    actionSetReadQuar: (state, action) => {
      state.quarList = action.payload;
    },
  },
});

export const actionClickContents =
  (board, boardId) =>
  (dispatch, getState, { history }) => {
    setLocalStorage(board, boardId);
    const readArr = getLocalStorage(board);
    if (board === "vaccine") {
      dispatch(actionSetReadVac(readArr));
    } else {
      dispatch(actionSetReadQuar(readArr));
    }
  };

export const actionGetClickList =
  () =>
  (dispatch, getState, { history }) => {
    const valList = getLocalStorage("vaccine");
    const quarList = getLocalStorage("quarantine");
    logger(valList);
    dispatch(actionSetReadVac(valList));
    dispatch(actionSetReadQuar(quarList));
  };

export const { actionSetReadVac, actionSetReadQuar } = read.actions;

export default read;
