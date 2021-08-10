import { createSlice } from "@reduxjs/toolkit";
import { likeAxios, userAxios } from "../../shared/api";
import { getCookie } from "../../shared/cookie";
import logger from "../../shared/logger";
import { acionMinusLike, acionPlusLike } from "./board";
import { actionAlert, actionSetMessage } from "./popup";

const like = createSlice({
  name: "like",
  initialState: {
    likeListVac: [],
    likeListQuar: [],
  },
  reducers: {
    actionSetLikeVac: (state, action) => {
      state.likeListVac = action.payload;
    },
    actionSetLikeQuar: (state, action) => {
      state.likeListQuar = action.payload;
    },
    actionMinusLikeInLikeListVac: (state, action) => {
      state.likeListVac = state.likeListVac.filter((each) => {
        return each !== action.payload;
      });
    },
    actionMinusLikeInLikeListQuar: (state, action) => {
      state.likeListQuar = state.likeListQuar.filter((each) => {
        return each !== action.payload;
      });
    },
    actionPlusLikeInLikeListVac: (state, action) => {
      state.likeListVac.push(action.payload);
    },
    actionPlusLikeInLikeListQuar: (state, action) => {
      state.likeListQuar.push(action.payload);
    },
  },
});

export const actionGetLike =
  (board) =>
  async (dispatch, getState, { history }) => {
    try {
      const userId = getState().user.user.userId;
      let getData = [];
      let makeData = [];
      if (board === "vaccine") {
        getData = await likeAxios.getLikeListVac(userId);
        getData.data.map((each) => {
          makeData.push(each.vacBoardId);
        });
        dispatch(actionSetLikeVac(makeData));
      } else {
        getData = await likeAxios.getLikeListQuar(userId);
        getData.data.map((each) => {
          makeData.push(each.quarBoardId);
        });
        dispatch(actionSetLikeQuar(makeData));
      }
    } catch (error) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const actionPostLike =
  (board, obj) =>
  async (dispatch, getState, { history }) => {
    const is_cookie = getCookie("vaccine_life_token");
    if (is_cookie === undefined) {
      dispatch(actionSetMessage("로그인 후 이용해 주세요."));
      dispatch(actionAlert());
      return;
    }
    try {
      if (board === "vaccine") {
        const getData = await likeAxios.likeVac(obj);
        const result = getData.data.ok;
        const boardId = obj.vacBoardId;
        if (!result) {
          dispatch(actionMinusLikeInLikeListVac(boardId));
          dispatch(acionMinusLike({ board, boardId }));
        } else {
          dispatch(actionPlusLikeInLikeListVac(boardId));
          dispatch(acionPlusLike({ board, boardId }));
        }
      } else {
        const getData = await likeAxios.likeQuar(obj);
        const result = getData.data.ok;
        const boardId = obj.quarBoardId;
        if (!result) {
          dispatch(actionMinusLikeInLikeListQuar(boardId));
          dispatch(acionMinusLike({ board, boardId }));
        } else {
          dispatch(actionPlusLikeInLikeListQuar(boardId));
          dispatch(acionPlusLike({ board, boardId }));
        }
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
  actionSetLikeVac,
  actionSetLikeQuar,
  actionMinusLikeInLikeListVac,
  actionMinusLikeInLikeListQuar,
  actionPlusLikeInLikeListVac,
  actionPlusLikeInLikeListQuar,
} = like.actions;

export default like;
