import { createSlice } from "@reduxjs/toolkit";
import { boardAxios, writeAxios } from "../../shared/api";
import logger from "../../shared/logger";
import { actionLoading } from "./isLoading";
import { actionAlert, actionSetMessage } from "./popup";

const board = createSlice({
  name: "board",
  initialState: {
    listVac: [],
    listQuar: [],
    topThreeVac: [],
    topThreeQuar: [],
    board: {
      contents:
        '{"blocks":[{"key":"2qrus","text":"슬기로운 백신생활","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
    page: {
      // list에서 각각 board값
      prev: {},
      next: {},
    },
    pagingVac: {
      nextPage: 1,
      totalPage: 0,
    },
    pagingQuar: {
      nextPage: 1,
      totalPage: 0,
    },
  },
  reducers: {
    actionSetListVac: (state, action) => {
      state.listVac.push(...action.payload.board);
      state.pagingVac.nextPage += 1;
      state.pagingVac.totalPage = action.payload.totalPageInData;
    },
    actionSetListQuar: (state, action) => {
      state.listQuar.push(...action.payload.board);
      state.pagingQuar.nextPage += 1;
      state.pagingQuar.totalPage = action.payload.totalPageInData;
    },
    actionSetBoard: (state, action) => {
      state.board = action.payload;
    },

    actionSetTopThreeVac: (state, action) => {
      state.topThreeVac = action.payload;
    },
    actionSetTopThreeQuar: (state, action) => {
      state.topThreeQuar = action.payload;
    },
    //like 관련
    acionMinusLike: (state, action) => {
      const { board, boardId } = action.payload;
      if (board === "vaccine") {
        state.listVac = state.listVac.map((each) => {
          if (each.id === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
        state.board.likeCount = state.board.likeCount - 1;
      } else {
        state.listVac = state.listQuar.map((each) => {
          if (each.id === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
        state.board.likeCount = state.board.likeCount - 1;
      }
    },
    acionPlusLike: (state, action) => {
      const { board, boardId } = action.payload;
      if (board === "vaccine") {
        state.listVac = state.listVac.map((each) => {
          if (each.id === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.board.likeCount = state.board.likeCount + 1;
      } else {
        state.listVac = state.listQuar.map((each) => {
          if (each.id === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.board.likeCount = state.board.likeCount + 1;
      }
    },

    // action을  vacBoardId, board 값을 가져옴
    actionSetPrevNextPageVac: (state, action) => {
      const currentIndex = state.listVac.findIndex((each) => {
        return each.id === action.payload;
      });
      const totalLength = state.listVac.length;
      state.page.prev =
        totalLength === currentIndex
          ? undefined
          : state.listVac[currentIndex + 1];
      state.page.next =
        0 === currentIndex ? undefined : state.listVac[currentIndex - 1];
    },
    actionSetPrevNextPageQuar: (state, action) => {
      const currentIndex = state.listQuar.findIndex((each) => {
        return each.id === action.payload;
      });
      logger(currentIndex);
      const totalLength = state.listQuar.length;
      state.page.prev =
        totalLength === currentIndex
          ? undefined
          : state.listQuar[currentIndex + 1];
      state.page.next =
        0 === currentIndex ? undefined : state.listQuar[currentIndex - 1];
    },
  },
});

//Data 얻기

export const actionGetBoard =
  (board) =>
  async (dispatch, getState, { history }) => {
    try {
      if (board === "vaccine") {
        // 백신후기
        const { nextPage, totalPage } = getState().board.pagingVac;
        if (nextPage > totalPage && nextPage !== 1) {
          return;
        }
        //loading => true
        dispatch(actionLoading());

        const getData = await boardAxios.getPageVac(nextPage);
        const board = getData.data.content;
        const totalPageInData = getData.data.totalPages;

        dispatch(actionSetListVac({ board, totalPageInData }));
      } else {
        // 격리후기
        const { nextPage, totalPage } = getState().board.pagingQuar;
        if (nextPage > totalPage && nextPage !== 1) {
          return;
        }
        //loading => true
        dispatch(actionLoading());

        const getData = await boardAxios.getPageQuar(nextPage);
        const board = getData.data.content;
        const totalPageInData = getData.data.totalPages;

        dispatch(actionSetListQuar({ board, totalPageInData }));
      }
      //loading => false
      dispatch(actionLoading());
    } catch (error) {
      console.error(error);
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const actionGetDetail =
  (board, boardId) =>
    async (dispatch, getState, { history }) => {
      try {
        let board_input = {};
        if (board === "vaccine") {
          const getData = await boardAxios.getDetailVac(boardId);
          const data = getData.data;
          board_input = {
            afterEffect: data.afterEffect,
            age: data.age,
            degree: data.degree,
            disease: data.disease,
            gender: data.gender,
            isVaccine: data.isVaccine,
            type: data.type,
            nickname: data.nickname,
            userId: data.userId,
            username: data.username,
            createdAt: data.createdAt,
            boardId: data.id,
            title: data.title,
            contents: data.contents,
            likeCount: data.likeCount,
            totalVisitors: data.totalVisitors,
            modifiedAt: data.modifiedAt,
          };
        } else {
          const getData = await boardAxios.getDetailQuar(boardId);
          const data = getData.data;
          board_input = {
            username: data.username,
            userId: data.userId,
            nickname: data.nickname,
            createdAt: data.createdAt,
            boardId: data.id,
            contents: data.contents,
            likeCount: data.likeCount,
            title: data.title,
            modifiedAt: data.modifiedAt,
            totalVisitors: data.totalVisitors,
          };
        }
        dispatch(actionSetBoard(board_input));
      } catch (error) {
        dispatch(
          actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
        );
        dispatch(actionAlert());
      }
    };

export const actionModifyDB =
  (board, boardId, obj) =>
    async (dispatch, getState, { history }) => {
      try {
        if (board === "vaccine") {
          await boardAxios.modifyVac(boardId, obj);
          history.replace("/vaccine");
        } else {
          await boardAxios.modifyQuar(boardId, obj);
          history.replace("/quarantine");
        }
      } catch (error) {
        dispatch(
          actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
        );
        dispatch(actionAlert());
      }
    };

export const actionDeleteEx =
  (board, boardId) =>
    async (dispatch, getState, { history }) => {
      try {
        if (board === "vaccine") {
          await boardAxios.deleteVac(boardId);
          history.replace("/vaccine");
        } else {
          await boardAxios.deleteQuar(boardId);
          history.replace("/quarantine");
        }
      } catch (error) {
        dispatch(
          actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
        );
        dispatch(actionAlert());
      }
    };

export const actionGetTopThree =
  (board) =>
    async (dispatch, getState, { history }) => {
      try {
        if (board === "vaccine") {
          const getData = await boardAxios.topThreeVac();
          dispatch(actionSetTopThreeVac(getData.data));
        } else {
          const getData = await boardAxios.topThreeQuar();
          dispatch(actionSetTopThreeQuar(getData.data));
        }
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
          history.replace("/vaccine");
        } else {
          await writeAxios.quarWrite(contenstObj);
          history.replace("/quarantine");
        }
      } catch (error) {
        dispatch(
          actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
        );
        dispatch(actionAlert());
      }
    };

export const {
  actionSetListVac,
  actionSetListQuar,
  actionSetBoard,
  actionSetTopThreeVac,
  actionSetTopThreeQuar,
  acionMinusLike,
  acionPlusLike,
  actionSetPrevNextPageVac,
  actionSetPrevNextPageQuar,
} = board.actions;

export default board;
