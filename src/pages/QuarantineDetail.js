import React, { useEffect } from "react";
import Login from "./Login";
import BoardInfo from "../components/detail/BoardInfo";
import UserInfo from "../components/detail/UserInfo";
import Contents from "../components/detail/Contents";
import MoveBox from "../components/detail/MoveBox";
import { Button, Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionSetPrevNextPage } from "../redux/modules/board";
import theme from "../styles/theme";
import Confirm from "../components/popup/Confirm";
import Alert from "../components/popup/Alert";
import CommentWrite from "../components/detail/CommentWrite";
import CommentList from "../components/detail/CommentList";
import styled from "styled-components";

const data = {
  quarBoardId: 0,
  userId: "유저 아이디",
  title: "화이자 1차 썰 푼다",
  contents: `
{"blocks":[{"key":"47qis","text":"안녕하세요","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bdep6","text":"두번째 글 입니다.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
  `,
  likeCount: 0,
  totalVisitors: 1,
  commentCount: 0,
  createdAt: new Date("Tue Jul 27 2021 23:22:46 GMT+0900 (대한민국 표준시)"),
  modifiedAt: "Tue Jul 27 2021 23:22:46 GMT+0900 (대한민국 표준시)",

  user: {
    username: "유저 아이디",
    nickname: "닉네임",
    isVaccine: 1,
    type: "모더나",
    gender: "여",
    age: 27,
    disease: "모름",
    degree: 2,
    afterEffect: "발열 , 두통, 근육통",
  },
};
const QuarantineDetail = () => {
  const {
    quarBoardId,
    title,
    contents,
    likeCount,
    totalVisitors,
    commentCount,
    createdAt,
    user,
  } = data;

  // 격리후기때는 MoveBox에 false 기입
  const modal_status = useSelector((state) => state.modal.visible);
  //confirm 창
  const confirm_status = useSelector((state) => state.popup.confirm);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  const boardType = false;

  const handleDelete = () => {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionSetPrevNextPage(quarBoardId));
  }, []);

  return (
    <Grid width={theme.detailWidth} margin="160px auto auto auto">
      <BoardInfo
        board="quarantine"
        boardId={quarBoardId}
        user={user}
        title={title}
        totalVisitors={totalVisitors}
        createdAt={createdAt}
        likeCount={likeCount}
      />

      <Contents board="quarantine" contents={contents} likeCount={likeCount} />
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
          댓글 {commentCount} 개
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
      <CommentWrite board="quarantine" />
      <CommentList board="quarantine" />
      {modal_status && <Login />}
      {alert_status && <Alert />}
    </Grid>
  );
};
export default QuarantineDetail;
