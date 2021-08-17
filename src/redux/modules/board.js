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
    actionDeleteBoardInList: (state, action) => {
      const { board, boardId } = action.payload;
      if (board === "vaccine") {
        const deleteIndex = state.listVac.findIndex(
          (each) => each.id === boardId
        );
        if (deleteIndex !== -1) {
          state.listVac.splice(deleteIndex, 1);
        }
      } else {
        const deleteIndex = state.listQuar.findIndex(
          (each) => each.id === boardId
        );
        if (deleteIndex !== -1) {
          state.listQuar.splice(deleteIndex, 1);
        }
      }
    },
    actionResetList: (state, action) => {
      const { board, boardContents, totalPageInData } = action.payload;
      if (board === "vaccine") {
        state.listVac = boardContents;
        state.pagingVac.nextPage = 2;
        state.pagingVac.totalPage = totalPageInData;
      } else {
        state.listQuar = boardContents;
        state.pagingQuar.nextPage = 2;
        state.pagingQuar.totalPage = totalPageInData;
      }
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
        state.listQuar = state.listQuar.map((each) => {
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
        state.listQuar = state.listQuar.map((each) => {
          if (each.id === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.board.likeCount = state.board.likeCount + 1;
      }
    },
    actionMinusComment: (state, action) => {
      const { board, boardId } = action.payload;
      const toIntboardId = parseInt(boardId);
      if (board === "vaccine") {
        const targetIndex = state.listVac.findIndex((each) => {
          return each.id === toIntboardId;
        });
        if (targetIndex !== -1) {
          const newState = state.listVac.map((each, index) => {
            if (index === targetIndex) {
              return {
                ...each,
                commentCount: each.commentCount - 1,
              };
            } else {
              return each;
            }
          });
          state.listVac = newState;
        }
      } else {
        const targetIndex = state.listVac.findIndex((each) => {
          return each.id === toIntboardId;
        });

        if (targetIndex !== -1) {
          const newState = state.listQuar.map((each, index) => {
            if (index === targetIndex) {
              return {
                ...each,
                commentCount: each.commentCount - 1,
              };
            } else {
              return each;
            }
          });
          state.listQuar = newState;
        }
      }
    },
    actionPlusComment: (state, action) => {
      const { board, boardId } = action.payload;
      const toIntboardId = parseInt(boardId);
      if (board === "vaccine") {
        const targetIndex = state.listVac.findIndex((each) => {
          return each.id === toIntboardId;
        });
        if (targetIndex !== -1) {
          const newState = state.listVac.map((each, index) => {
            if (index === targetIndex) {
              return {
                ...each,
                commentCount: each.commentCount + 1,
              };
            } else {
              return each;
            }
          });
          state.listVac = newState;
        }
      } else {
        const targetIndex = state.listVac.findIndex((each) => {
          return each.id === toIntboardId;
        });

        if (targetIndex !== -1) {
          const newState = state.listQuar.map((each, index) => {
            if (index === targetIndex) {
              return {
                ...each,
                commentCount: each.commentCount + 1,
              };
            } else {
              return each;
            }
          });
          state.listQuar = newState;
        }
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
      dispatch(actionLoading());
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
      dispatch(actionLoading());
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
      dispatch(actionLoading());
      if (board === "vaccine") {
        await boardAxios.modifyVac(boardId, obj);
        history.replace("/vaccine");
      } else {
        await boardAxios.modifyQuar(boardId, obj);
        history.replace("/quarantine");
      }
      dispatch(actionLoading());
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
      dispatch(actionLoading());
      if (board === "vaccine") {
        await boardAxios.deleteVac(boardId);
      } else {
        await boardAxios.deleteQuar(boardId);
      }
      dispatch(actionDeleteBoardInList({ board, boardId }));
      history.replace(`/${board}`);
      dispatch(actionLoading());
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
      dispatch(actionLoading());
      if (board === "vaccine") {
        const getData = await boardAxios.topThreeVac();
        dispatch(actionSetTopThreeVac(getData.data));
      } else {
        const getData = await boardAxios.topThreeQuar();
        dispatch(actionSetTopThreeQuar(getData.data));
      }
      dispatch(actionLoading());
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
      dispatch(actionLoading());
      if (board === "vaccine") {
        await writeAxios.vacWrite(contenstObj);
        const getData = await boardAxios.getPageVac(1);
        const boardContents = getData.data.content;
        const totalPageInData = getData.data.totalPages;
        dispatch(actionResetList({ board, boardContents, totalPageInData }));
      } else {
        await writeAxios.quarWrite(contenstObj);
        const getData = await boardAxios.getPageQuar(1);
        const boardContents = getData.data.content;
        const totalPageInData = getData.data.totalPages;
        dispatch(actionResetList({ board, boardContents, totalPageInData }));
      }

      history.replace(`/${board}`);
      dispatch(actionLoading());
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
  actionDeleteBoardInList,
  actionResetList,
  actionSetBoard,
  actionSetTopThreeVac,
  actionSetTopThreeQuar,
  acionMinusLike,
  acionPlusLike,
  actionMinusComment,
  actionPlusComment,
  actionSetPrevNextPageVac,
  actionSetPrevNextPageQuar,
} = board.actions;

export default board;
