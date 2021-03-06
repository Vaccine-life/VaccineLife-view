import { createSlice } from "@reduxjs/toolkit";
import { commentAxios, medicalAxios } from "../../shared/api";
import logger from "../../shared/logger";
import { actionMinusComment, actionPlusComment } from "./board";
import { actionLoading } from "./isLoading";
import { actionAlert, actionSetMessage, acionSetMedicalObj } from "./popup";

const initialState = {
  list: [],
  topThreeMedi: [],
  commentVac: [],
  commentQuar: [],
  // 무한스크롤
  page: {
    prev: {},
    next: {},
  },
  pagingMedi: {
    nextPage: 1,
    totalPage: 0,
  },
};

const comment = createSlice({
  name: "comment",
  initialState,
  reducers: {
    actionSetComment: (state, action) => {
      // state.list = action.payload;
      state.list.push(...action.payload.medicalTen);
      // console.log(action.payload);
      // console.log(action.payload.medicalTen);
      state.pagingMedi.nextPage += 1;
      state.pagingMedi.totalPage = action.payload.totalPageInData;
    },
    actionAddComment: (state, action) => {
      state.list.unshift(action.payload);
      // console.log(action.payload);
    },
    actionDeleteComment: (state, action) => {
      const { medicalId } = action.payload;
      // console.log(action.payload);
      let idx = state.list.findIndex((c) => c.id === medicalId);
      // console.log(idx);
      if (idx !== -1) {
        state.list.splice(idx, 1);
      }
    },
    actionModifyComment: (state, action) => {
      const { medicalId, contents } = action.payload;
      let idx = state.list.findIndex((c) => c.id === medicalId);
      state.list[idx].contents = contents.contents;
    },
    // 무한스크롤
    actionResetList: (state, action) => {
      const { mediContents, totalPageInData } = action.payload;
      state.list = mediContents;
      state.pagingMedi.nextPage = 2;
      state.pagingMedi.totalPage = totalPageInData;
    },
    actionSetPrevNextPageMedi: (state, action) => {
      const currentIndex = state.list.findIndex((each) => {
        return each.id === action.payload;
      });
      const totalLength = state.list.length;
      state.page.prev =
        totalLength === currentIndex ? undefined : state.list[currentIndex + 1];
      state.page.next =
        0 === currentIndex ? undefined : state.list[currentIndex - 1];
    },
    // 의료진 좋아요 관련
    actionSetTopThreeMedi: (state, action) => {
      state.topThreeMedi = action.payload;
      // console.log(action.payload);
    },
    acionMinusLikeMedi: (state, action) => {
      const { boardId } = action.payload;
      state.list = state.list.map((each) => {
        if (each.id === boardId) {
          return { ...each, likeCount: each.likeCount - 1 };
        }
        return { ...each };
      });
      // 인기글에도 바로 반영
      state.topThreeMedi = state.topThreeMedi.map((each) => {
        if (each.id === boardId) {
          return { ...each, likeCount: each.likeCount - 1 };
        }
        return { ...each };
      });
      state.likeCount = state.likeCount - 1;
    },
    acionPlusLikeMedi: (state, action) => {
      const { boardId } = action.payload;
      state.list = state.list.map((each) => {
        if (each.id === boardId) {
          return { ...each, likeCount: each.likeCount + 1 };
        }
        return { ...each };
      });
      // 인기글에도 바로 반영
      state.topThreeMedi = state.topThreeMedi.map((each) => {
        if (each.id === boardId) {
          return { ...each, likeCount: each.likeCount + 1 };
        }
        return { ...each };
      });
      state.likeCount = state.likeCount + 1;
    },
    // 백신, 격리 게시글 댓글  state setup 코드
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
      // const getData = await medicalAxios.getMedical();
      // const data = getData.data;
      // dispatch(actionSetComment(data));

      const { nextPage, totalPage } = getState().comment.pagingMedi;
      if (nextPage > totalPage && nextPage !== 1) {
        return;
      }
      //loading => true
      dispatch(actionLoading());

      // 서버에서 다음페이지 가져오기
      const getData = await medicalAxios.getPageMedi(nextPage);
      const medicalTen = getData.data.content;
      // console.log(medicalTen);
      const totalPageInData = getData.data.totalPages;
      // console.log(totalPageInData);
      dispatch(actionSetComment({ medicalTen, totalPageInData }));

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

// 서버에 medical 저장하기
export const actionAddMedical =
  (contents) =>
  async (dispatch, getState, { history }) => {
    try {
      // await medicalAxios.addMedical(contents);
      // const getData = await medicalAxios.getMedical();
      // const data = getData.data;
      // dispatch(actionSetComment(data));
      await medicalAxios.addMedical(contents);
      const getData = await medicalAxios.getMedical();
      const mediContents = getData.data;
      const totalPageInData = getData.data.totalPages;
      dispatch(actionResetList({ mediContents, totalPageInData }));
      dispatch(actionLoading());
    } catch (err) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

// 서버의 medical 삭제하기
export const actionDeleteMedical =
  (medicalId) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(actionLoading());
      await medicalAxios.deleteMedical(medicalId);
      dispatch(acionSetMedicalObj());
      dispatch(actionDeleteComment({ medicalId }));

      history.replace("/medical");
      dispatch(actionLoading());
    } catch (err) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

// 서버의 medical 수정하기
export const actionModifyMedical =
  (medicalId, contents) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(actionLoading());
      dispatch(actionModifyComment({ medicalId, contents }));
      await medicalAxios.modifyMedi(medicalId, contents);

      history.replace("/medical");
      dispatch(actionLoading());
    } catch (error) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

// 서버의 medical top3 가져오기
export const actionGetTopThreeMedi =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(actionLoading());
      const getData = await medicalAxios.topThreeMedi();
      // console.log(getData);
      dispatch(actionSetTopThreeMedi(getData.data));
      dispatch(actionLoading());
    } catch (error) {
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
        // 코멘트 정보 받아오기
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
  actionModifyComment,
  actionResetList,
  actionSetPrevNextPageMedi,
  actionSetTopThreeMedi,
  acionMinusLikeMedi,
  acionPlusLikeMedi,
  actionSetCommentListState,
  actionAddCommentListState,
  actionDeleteCommentListState,
} = comment.actions;

export default comment;
