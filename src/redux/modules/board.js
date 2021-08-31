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
    myLikeVac: [],
    myLikeQuar: [],
    myLikeMedi: [],
    myWriteVac: [],
    myWriteQuar: [],
    myWriteMedi: [],
    board: {
      contents: "<p>슬기로운 백신생활</p>",
      likeCount: 0,
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
    type: "전체",
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
        // 일반 리스트 삭제
        const deleteIndex = state.listVac.findIndex(
          (each) => each.id === boardId
        );
        if (deleteIndex !== -1) {
          state.listVac.splice(deleteIndex, 1);
        }
        // 좋아요 리스트 삭제
        const deleteIndexLike = state.myLikeVac.findIndex(
          (each) => each.id === boardId
        );
        if (deleteIndexLike !== -1) {
          state.myLikeVac.splice(deleteIndex, 1);
        }
        // 내가 쓴글 리스트 삭제
        const deleteIndexWrite = state.myWriteVac.findIndex(
          (each) => each.id === boardId
        );
        if (deleteIndexWrite !== -1) {
          state.myWriteVac.splice(deleteIndex, 1);
        }
      } else {
        // 코드 설명 위와 동일
        const deleteIndex = state.listQuar.findIndex(
          (each) => each.quarBoardId === boardId
        );
        if (deleteIndex !== -1) {
          state.listQuar.splice(deleteIndex, 1);
        }
        const deleteIndexLike = state.myLikeQuar.findIndex(
          (each) => each.quarBoardId === boardId
        );
        if (deleteIndexLike !== -1) {
          state.myLikeQuar.splice(deleteIndex, 1);
        }
        const deleteIndexWrite = state.myWriteQuar.findIndex(
          (each) => each.quarBoardId === boardId
        );
        if (deleteIndexWrite !== -1) {
          state.myWriteQuar.splice(deleteIndex, 1);
        }
      }
    },
    // 새 글 작성시 전체글 목록 초기화 및 전채글 1번목록 내용 다시 담기
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
    //topthree
    actionSetTopThreeVac: (state, action) => {
      state.topThreeVac = action.payload;
    },
    actionSetTopThreeQuar: (state, action) => {
      state.topThreeQuar = action.payload;
    },
    //my Write(마이페이지 내)
    actionSetMyWriteList: (state, action) => {
      const { board, likeList } = action.payload;
      if (board === "vaccine") {
        state.myWriteVac = likeList;
      } else if (board === "quarantine") {
        state.myWriteQuar = likeList;
      } else {
        state.myWriteMedi = likeList;
      }
    },
    // mylike(마이페이지 내)
    actionSetMyLikeList: (state, action) => {
      const { board, likeList } = action.payload;
      if (board === "vaccine") {
        state.myLikeVac = likeList;
      } else if (board === "quarantine") {
        state.myLikeQuar = likeList;
      } else {
        state.myLikeMedi = likeList;
      }
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
        state.topThreeVac = state.topThreeVac.map((each) => {
          if (each.vacBoardId === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
        state.myLikeVac = state.myLikeVac.map((each) => {
          if (each.vacBoardId === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
        state.myWriteVac = state.myWriteVac.map((each) => {
          if (each.id === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });

        state.board.likeCount = state.board.likeCount - 1;
      } else if (board === "quarantine") {
        state.listQuar = state.listQuar.map((each) => {
          if (each.quarBoardId === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
        state.topThreeQuar = state.topThreeQuar.map((each) => {
          if (each.quarBoardId === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
        state.myLikeQuar = state.myLikeQuar.map((each) => {
          if (each.quarBoardId === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
        state.myWriteQuar = state.myWriteQuar.map((each) => {
          if (each.quarBoardId === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
        state.board.likeCount = state.board.likeCount - 1;
      } else {
        state.myLikeMedi = state.myLikeMedi.map((each) => {
          if (each.medicalId === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
        state.myWriteMedi = state.myWriteMedi.map((each) => {
          if (each.id === boardId) {
            return { ...each, likeCount: each.likeCount - 1 };
          }
          return { ...each };
        });
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
        state.topThreeVac = state.topThreeVac.map((each) => {
          if (each.vacBoardId === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.myLikeVac = state.myLikeVac.map((each) => {
          if (each.vacBoardId === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.myWriteVac = state.myWriteVac.map((each) => {
          if (each.id === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.board.likeCount = state.board.likeCount + 1;
      } else if (board === "quarantine") {
        state.listQuar = state.listQuar.map((each) => {
          if (each.quarBoardId === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.topThreeQuar = state.topThreeQuar.map((each) => {
          if (each.quarBoardId === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.myLikeQuar = state.myLikeQuar.map((each) => {
          if (each.quarBoardId === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.myWriteQuar = state.myWriteQuar.map((each) => {
          if (each.quarBoardId === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.board.likeCount = state.board.likeCount + 1;
      } else {
        state.myLikeMedi = state.myLikeMedi.map((each) => {
          if (each.medicalId === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
        state.myWriteMedi = state.myWriteMedi.map((each) => {
          if (each.id === boardId) {
            return { ...each, likeCount: each.likeCount + 1 };
          }
          return { ...each };
        });
      }
    },
    // 코멘트 더하기 빼기 액션
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
    actionSetPrevNextPage: (state, action) => {
      state.page.next = action.payload.nextId;
      state.page.prev = action.payload.prevId;
    },
    // 필터링을 위한 타입 변경 후 내용 초기화
    actionSetType: (state, action) => {
      if (state.type === action.payload) {
        return;
      }
      state.listVac = [];
      state.type = action.payload;
      state.pagingVac = {
        nextPage: 1,
        totalPage: 0,
      };
    },
  },
  actionResetVac: (state, action) => {
    state.listVac = [];
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
        const board = getData.data.content; // console.log(board);
        const totalPageInData = getData.data.totalPages;
        // 리스트에 불러온 게시글 차례대로 저장
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
        // 리스트에 불러온 게시글 차례대로 저장
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
// 위와 동일한 필터링용 함수
export const actionGetBoardType =
  (board, type) =>
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

        const getData = await boardAxios.getPageVacType(nextPage, type);
        const board = getData.data.content;
        const totalPageInData = getData.data.totalPages;

        dispatch(actionSetListVac({ board, totalPageInData }));
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
        const getPrevNext = await boardAxios.getPrevNextVac(boardId);
        const moveList = getPrevNext.data;
        // 이전글 다음글 정보 전달
        dispatch(actionSetPrevNextPage(moveList));
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
        const getPrevNext = await boardAxios.getPrevNextQuar(boardId);
        const moveList = getPrevNext.data;
        // 이전글 다음글 정보 전달
        dispatch(actionSetPrevNextPage(moveList));
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
      // 게시글 상세정보 전달
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
// 좋아요 순  최고 3가지 게시글 불러오기
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

// 후기 글쓰기
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
        // 전체글 최신화 위한 정보 전달
        dispatch(actionResetList({ board, boardContents, totalPageInData }));
      } else {
        await writeAxios.quarWrite(contenstObj);
        const getData = await boardAxios.getPageQuar(1);
        const boardContents = getData.data.content;
        const totalPageInData = getData.data.totalPages;
        // 전체글 최신화 위한 정보 전달
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
// 내가 쓴 글 불러오기 (마이페이지)
export const actionGetMyWriteDB =
  (board) =>
  async (dispatch, getState, { history }) => {
    const is_login = getState().user.is_login;
    // 로그인 하지 않았을 시 리턴
    if (!is_login) {
      return;
    }
    const userId = getState().user.user.userId;
    dispatch(actionLoading());
    try {
      if (board === "vaccine") {
        const getData = await boardAxios.getMyWriteVac(userId);
        const likeList = getData.data;
        dispatch(actionSetMyWriteList({ board, likeList }));
      } else if (board === "quarantine") {
        const getData = await boardAxios.getMyWriteQuar(userId);
        const likeList = getData.data;
        dispatch(actionSetMyWriteList({ board, likeList }));
      } else {
        const getData = await boardAxios.getMyWriteMedi(userId);
        const likeList = getData.data;
        dispatch(actionSetMyWriteList({ board, likeList }));
      }
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
  actionSetMyWriteList,
  actionSetMyLikeList,
  acionMinusLike,
  acionPlusLike,
  actionMinusComment,
  actionPlusComment,
  actionSetPrevNextPage,
  actionSetType,
} = board.actions;

export default board;
