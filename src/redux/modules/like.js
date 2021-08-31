import { createSlice } from "@reduxjs/toolkit";
import { commentAxios, likeAxios } from "../../shared/api";
import { getCookie } from "../../shared/cookie";
import logger from "../../shared/logger";
import { acionMinusLike, acionPlusLike, actionSetMyLikeList } from "./board";
import {
  acionMinusLikeMedi,
  acionPlusLikeMedi,
  actionSetTopThreeMedi,
} from "./comment";
import { actionAlert, actionSetMessage } from "./popup";

const like = createSlice({
  name: "like",
  initialState: {
    likeListVac: [],
    likeListQuar: [],
    likeListMedi: [],
  },
  reducers: {
    // 좋아요 클릭한 목록 셋팅( 로그인 시)
    actionSetLikeVac: (state, action) => {
      state.likeListVac = action.payload;
    },
    actionSetLikeQuar: (state, action) => {
      state.likeListQuar = action.payload;
    },
    actionSetLikeMedi: (state, action) => {
      state.likeListMedi = action.payload;
    },
    // 좋아요 클릭시 더하고 뺴는 action
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
    actionMinusLikeInLikeListMedi: (state, action) => {
      state.likeListMedi = state.likeListMedi.filter((each) => {
        return each !== action.payload;
      });
    },
    actionPlusLikeInLikeListVac: (state, action) => {
      state.likeListVac.push(action.payload);
    },
    actionPlusLikeInLikeListQuar: (state, action) => {
      state.likeListQuar.push(action.payload);
    },
    actionPlusLikeInLikeListMedi: (state, action) => {
      state.likeListMedi.push(action.payload);
    },
    // 좋아요 목록 리셋
    actionResetLike: (state, action) => {
      state.likeListMedi = [];
      state.likeListQuar = [];
      state.likeListVac = [];
    },
  },
});

export const actionGetLike =
  (board) =>
  async (dispatch, getState, { history }) => {
    try {
      const is_login = getState().user.is_login;
      // 로그인 안했을시 클릭 방지
      if (!is_login) {
        return;
      }
      const userId = getState().user.user.userId;

      let getData = [];
      let makeData = [];

      if (board === "vaccine") {
        getData = await likeAxios.getLikeListVac(userId);
        // 유저가 클릭한 좋아요 목록을 받아오는 코드
        getData.data.map((each) => {
          makeData.push(each.vacBoardId);
        });
        const likeList = getData.data;
        logger(getData);
        // 유저가 클릭한 목록 정보  받기
        dispatch(actionSetMyLikeList({ board, likeList }));
        // 유저가 클릭한 목록 게시판 아이디값 받기
        dispatch(actionSetLikeVac(makeData));
      } else if (board === "quarantine") {
        // 코드설명은 위와 동일
        getData = await likeAxios.getLikeListQuar(userId);
        getData.data.map((each) => {
          makeData.push(each.quarBoardId);
        });
        const likeList = getData.data;
        dispatch(actionSetMyLikeList({ board, likeList }));
        dispatch(actionSetLikeQuar(makeData));
      }
    } catch (error) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

// 의료진 좋아요 가져오기 미들웨어
export const actionGetLikeMedi =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const is_login = getState().user.is_login;
      if (!is_login) {
        return;
      }
      // console.log(is_login);
      const userId = getState().user.user.userId;
      // console.log(userId);
      let getData = [];
      let makeData = [];
      getData = await likeAxios.getLikeListMedi(userId);
      // console.log(getData);
      // 왜 안나옴??? -> dispatch(actionGetLikeMedi())하니까 나옴
      // medicalId가 엉뚱한게 들어가고 있음 => 서버에서 잘 못 내려줌
      const likeList = getData.data;
      dispatch(actionSetMyLikeList({ board: "medical", likeList }));
      getData.data.map((each) => {
        makeData.push(each.medicalId);
      });
      dispatch(actionSetLikeMedi(makeData));
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
    const is_login = getState().user.is_login;
    // 쿠키가 없거나 로그인하지 않았을때 로그인 필요함을 알리는 코드
    if (is_cookie === undefined || !is_login || is_cookie === null) {
      dispatch(actionSetMessage("로그인 후 이용해 주세요."));
      dispatch(actionAlert());
      return;
    }
    try {
      if (board === "vaccine") {
        const getData = await likeAxios.likeVac(obj);
        // 좋아요를 현재 클릭한 상태이냐 아니냐
        const result = getData.data.ok;
        const boardId = obj.vacBoardId;
        if (!result) {
          // 클릭했을시 좋아요를 빼는 코드
          dispatch(actionMinusLikeInLikeListVac(boardId));
          dispatch(acionMinusLike({ board, boardId }));
        } else {
          // 클릭안했을시 좋아요를 더하는 코드
          dispatch(actionPlusLikeInLikeListVac(boardId));
          dispatch(acionPlusLike({ board, boardId }));
        }
      } else {
        // 코드설명은 위와 동일
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

// 의료진 좋아요 하기 미들웨어
export const actionMediLike =
  (obj) =>
  async (dispatch, getState, { history }) => {
    const is_cookie = getCookie("vaccine_life_token");
    const is_login = getState().user.is_login;
    if (is_cookie === undefined || !is_login || is_cookie === null) {
      dispatch(actionSetMessage("로그인 후 이용해 주세요."));
      dispatch(actionAlert());
      return;
    }
    try {
      const getData = await likeAxios.likeMedi(obj);
      // console.log(getData);
      const result = getData.data.ok;
      const boardId = obj.medicalId;
      // console.log(boardId);
      if (!result) {
        dispatch(actionMinusLikeInLikeListMedi(boardId));
        dispatch(acionMinusLikeMedi({ boardId }));
        dispatch(acionMinusLike({ board: "medical", boardId }));
        // dispatch(actionSetLikeMedi());
        // dispatch(actionSetTopThreeMedi());
      } else {
        dispatch(actionPlusLikeInLikeListMedi(boardId));
        dispatch(acionPlusLikeMedi({ boardId }));
        dispatch(acionPlusLike({ board: "medical", boardId }));
        // dispatch(actionSetLikeMedi());
        // dispatch(actionSetTopThreeMedi());
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
  actionSetLikeMedi,
  actionMinusLikeInLikeListVac,
  actionMinusLikeInLikeListQuar,
  actionMinusLikeInLikeListMedi,
  actionPlusLikeInLikeListVac,
  actionPlusLikeInLikeListQuar,
  actionPlusLikeInLikeListMedi,
  actionResetLike,
} = like.actions;

export default like;
