import React, { useEffect } from "react";
import Login from "./Login";
import BoardInfo from "../components/detail/BoardInfo";
import UserInfo from "../components/detail/UserInfo";
import Contents from "../components/detail/Contents";
import MoveBox from "../components/detail/MoveBox";
import { Button, Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import {
  actionDeleteEx,
  actionGetDetail,
  actionSetPrevNextPageVac,
} from "../redux/modules/board";
import theme from "../styles/theme";
import Confirm from "../components/popup/Confirm";
import Alert from "../components/popup/Alert";
import CommentWrite from "../components/detail/CommentWrite";
import CommentList from "../components/detail/CommentList";
import styled from "styled-components";
import { history } from "../redux/configStore";
import logger from "../shared/logger";
import { useParams } from "react-router-dom";

const Detail = () => {
  const boardId = useParams().id;
  useEffect(() => {
    dispatch(actionGetDetail("vaccine", boardId));
    dispatch(actionSetPrevNextPageVac(boardId));
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

  const handleDelete = () => {
    dispatch(actionDeleteEx("vaccine", board_content.boardId));
  };
  return (
    <Grid width={theme.detailWidth} margin="160px auto auto auto">
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
        contents={board_content.contents}
        likeCount={board_content.likeCount}
      />
      <MoveBox boardType={boardType} />
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
          댓글 {/* 추후 */} 개
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
      <CommentWrite board="vaccine" />
      <CommentList board="vaccine" />
      {modal_status && <Login />}
      {alert_status && <Alert />}
    </Grid>
  );
};

export default Detail;
