import React, { useEffect } from "react";
import Login from "./Login";
import BoardInfo from "../components/detail/BoardInfo";
import UserInfo from "../components/detail/UserInfo";
import Contents from "../components/detail/Contents";
import { Button, Grid } from "../elements";
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
import logger from "../shared/logger";
import MetaScript from "../shared/MetaScript";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { isMobileOnly } from "react-device-detect";
import BoardName from "../components/mobile/BoardName";

const Detail = () => {
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  const boardId = useParams().id;
  const title = useSelector((state) => state.board.board.title);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(actionGetDetail("vaccine", boardId));
    dispatch(actionGetCommentList("vaccine", boardId));
    //  dispatch(actionGetLike("vaccine"));
  }, []);

  //격리후기떄는 id 변경

  const dispatch = useDispatch();
  // 격리후기때는 MoveBox에 false 기입

  // 어느 페이지에서나 로그인 모달창을 뜨게 하게 위해 얘를 가져옴
  const modal_status = useSelector((state) => state.modal.visible);
  //confirm 창
  const confirm_status = useSelector((state) => state.popup.confirm);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  const boardType = true;

  const board_content = useSelector((state) => state.board.board);

  const comment_list = useSelector((state) => state.comment.commentVac);

  const handleDelete = () => {
    dispatch(actionDeleteEx("vaccine", board_content.boardId));
  };

  const handleMoveTotal = () => {
    history.push("/vaccine");
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

          <TextDivM onClick={handleMoveTotal}>전체 게시글</TextDivM>
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

        <TextDiv onClick={handleMoveTotal}>전체 게시글</TextDiv>
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

const TextDiv = styled.div`
  font-size: ${theme.bodyTwoSize};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 700;
  :hover {
    cursor: pointer;
    color: ${theme.typoGrey2};
  }
`;
const TextDivM = styled.div`
  font-size: ${theme.SubHeadTwoSize};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 700;
`;

export default Detail;
