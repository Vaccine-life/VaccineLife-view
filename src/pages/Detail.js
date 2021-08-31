import React, { useEffect } from "react";
import Login from "./Login";
import BoardInfo from "../components/detail/BoardInfo";
import UserInfo from "../components/detail/UserInfo";
import Contents from "../components/detail/Contents";
import { Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionDeleteEx, actionGetDetail } from "../redux/modules/board";
import theme from "../styles/theme";
import Confirm from "../components/popup/Confirm";
import Alert from "../components/popup/Alert";
import CommentWrite from "../components/detail/CommentWrite";
import CommentList from "../components/detail/CommentList";
import { useParams } from "react-router-dom";
import { actionGetCommentList } from "../redux/modules/comment";
import Spinner from "../shared/Spinner";
import MetaScript from "../shared/MetaScript";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { isMobileOnly } from "react-device-detect";
import BoardName from "../components/mobile/BoardName";
import NavModal from "../components/mobile/NavModal";
import MoveBox from "../components/detail/MoveBox";

const Detail = () => {
  //Spinner 변환
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  //현재 Board의 Id를 가져오기(URL상)
  const boardId = useParams().id;
  const title = useSelector((state) => state.board.board.title);

  useEffect(() => {
    //페이지 이동시 스크롤 맨 위로 이동
    window.scrollTo(0, 0);
    //게시판 타입에 따른 디테일 페이지 정보 가져오기
    dispatch(actionGetDetail("vaccine", boardId));
    //게시판 타입에 따른 디테일 페이지 댓글 가져오기
    dispatch(actionGetCommentList("vaccine", boardId));
    //  dispatch(actionGetLike("vaccine"));
  }, [boardId]);

  //격리후기떄는 id 변경

  const dispatch = useDispatch();
  // 격리후기때는 MoveBox에 false 기입

  // 어느 페이지에서나 로그인 모달창을 뜨게 하게 위해 얘를 가져옴
  const modal_status = useSelector((state) => state.modal.visible);
  const navModal_status = useSelector((state) => state.modal.navVisible);
  //confirm 창
  const confirm_status = useSelector((state) => state.popup.confirm);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);
  //Redux 내 게시판 정보 불러오기
  const board_content = useSelector((state) => state.board.board);
  //Redux 내 게시판 댓글 불러오기
  const comment_list = useSelector((state) => state.comment.commentVac);

  const handleDelete = () => {
    // action 함수내에 게시판타입, 아이디 전달
    dispatch(actionDeleteEx("vaccine", board_content.boardId));
  };

  if (isMobileOnly) {
    return (
      <Grid margin="80px auto 40px auto">
        <MetaScript title={`슬기로운 백신생활 | ${title}`} />
        <BoardName board="vaccine" />
        <BoardInfo
          board="vaccine"
          boardId={board_content.boardId}
          nickname={board_content.nickname}
          userId={board_content.userId}
          title={board_content.title}
          totalVisitors={board_content.totalVisitors}
          createdAt={board_content.createdAt}
          likeCount={board_content.likeCount}
        />
        {board_content.type !== "공지" && (
          <UserInfo
            type={board_content.type}
            gender={board_content.gender}
            age={board_content.age}
            disease={board_content.disease}
            degree={board_content.degree}
            afterEffect={board_content.afterEffect}
          />
        )}
        <Contents
          board="vaccine"
          boardId={board_content.boardId}
          contents={board_content.contents}
          likeCount={board_content.likeCount}
        />
        <MoveBox board="vaccine" />
        {confirm_status && (
          <Confirm
            confirmMessage="게시글을 삭제하시겠습니까?"
            activeFunction={handleDelete}
          />
        )}
        <Grid is_flex="space_row" padding="0 16px 0 16px">
          <p
            style={{
              fontSize: `${theme.SubHeadTwoSize}`,
              lineHeight: `${theme.SubHeadTwoHeight}`,
              textAlign: "start",
              fontWeight: "700",
              margin: "20px 0 20px 0",
            }}
          >
            댓글 {comment_list.length}개
          </p>
        </Grid>

        <CommentWrite board="vaccine" boardId={boardId} />

        {comment_list?.map((each, index) => {
          return (
            <CommentList
              key={index}
              board="vaccine"
              commentId={each.id}
              boardId={each.vacBoardId}
              comment={each.comment}
              createdAt={each.createdAt}
              userId={each.userId}
              nickname={each.nickname}
            />
          );
        })}

        {modal_status && <Login />}
        {alert_status && <Alert />}
        {isLoading && <Spinner />}
        {navModal_status && <NavModal />}
      </Grid>
    );
  }

  return (
    <Grid width={theme.detailWidth} margin="160px auto 120px auto">
      <MetaScript title={`슬기로운 백신생활 | ${title}`} />
      <BoardInfo
        board="vaccine"
        boardId={board_content.boardId}
        nickname={board_content.nickname}
        userId={board_content.userId}
        title={board_content.title}
        totalVisitors={board_content.totalVisitors}
        createdAt={board_content.createdAt}
        likeCount={board_content.likeCount}
      />
      {board_content.type !== "공지" && (
        <UserInfo
          type={board_content.type}
          gender={board_content.gender}
          age={board_content.age}
          disease={board_content.disease}
          degree={board_content.degree}
          afterEffect={board_content.afterEffect}
        />
      )}
      <Contents
        board="vaccine"
        boardId={board_content.boardId}
        contents={board_content.contents}
        likeCount={board_content.likeCount}
      />
      {confirm_status && (
        <Confirm
          confirmMessage="게시글을 삭제하시겠습니까?"
          activeFunction={handleDelete}
        />
      )}
      <MoveBox board="vaccine" />
      <Grid is_flex="space_row">
        <p
          style={{
            fontSize: `${theme.headTwoSize}`,
            lineHeight: `${theme.headTwoSize}`,
            textAlign: "start",
            fontWeight: "700",
            margin: "40px 0 40px 0",
            color: `${theme.typoBlack}`,
          }}
        >
          댓글 {comment_list.length}개
        </p>
      </Grid>
      <CommentWrite board="vaccine" boardId={boardId} />
      {comment_list?.map((each, index) => {
        return (
          <CommentList
            key={index}
            board="vaccine"
            commentId={each.id}
            boardId={each.vacBoardId}
            comment={each.comment}
            createdAt={each.createdAt}
            userId={each.userId}
            nickname={each.nickname}
          />
        );
      })}

      {modal_status && <Login />}
      {alert_status && <Alert />}
      {isLoading && <Spinner />}
    </Grid>
  );
};

export default Detail;
