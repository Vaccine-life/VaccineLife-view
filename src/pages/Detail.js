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

const Detail = () => {
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  const boardId = useParams().id;
  const title = useSelector((state) => state.board.board.title);

  useEffect(() => {
    dispatch(actionGetDetail("vaccine", boardId));
    dispatch(actionGetCommentList("vaccine", boardId));
    //  dispatch(actionGetLike("vaccine"));
  }, []);

  //격리후기떄는 id 변경

  const dispatch = useDispatch();
  // 격리후기때는 MoveBox에 false 기입
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
  return (
    <Grid width={theme.detailWidth} margin="160px auto auto auto">
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
      <UserInfo
        type={board_content.type}
        gender={board_content.gender}
        age={board_content.age}
        disease={board_content.disease}
        degree={board_content.degree}
        afterEffect={board_content.afterEffect}
      />
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
          }}
        >
          댓글 {comment_list.length} 개
        </p>

        <Button
          fontSize={theme.bodyTwoSize}
          margin="0"
          width={theme.totalButtonWidth}
          height={theme.mediumButtonHeight}
        >
          전체 게시글
        </Button>
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
