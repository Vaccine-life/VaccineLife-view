import React from "react";
import moment from "moment";
import "moment/locale/ko";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../../elements";
import theme from "../../styles/theme";
import { actionAlert, actionSetMessage } from "../../redux/modules/popup";
import styled from "styled-components";
import { actionAddCommentList } from "../../redux/modules/comment";
import { isMobileOnly } from "react-device-detect";
import { TextareaAutosize } from "@material-ui/core";
import commentwrite from "../../styles/commentwrite.css";

const CommentWrite = (props) => {
  const { board, boardId } = props;
  const userId = useSelector((state) => state.user.user.userId);
  const nickname = useSelector((state) => state.user.user.nickname);
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();

  // useState사용해서 인풋의 텍스트 내용 저장
  const [comment, setComment] = React.useState("");

  // 게시판에 따라 comment 객체 구성
  const obj =
    board === "vaccine"
      ? {
          vacBoardId: boardId,
          userId,
          comment,
        }
      : {
          quarBoardId: boardId,
          userId,
          quarcomment: comment,
        };

  const changeComment = (e) => {
    setComment(e.target.value);
    // console.log(typeof e.target.value)
    // 인풋의 onChange에 넣어주고 콘솔 찍어보기
    // 바뀌는 내용이 바로 바로 오게 만든것!
  };

  const write = () => {
    // 로그인 체크
    if (!is_login) {
      dispatch(actionSetMessage("로그인 후 이용해 주세요."));
      dispatch(actionAlert());
      return;
    }
    // 빈 코멘트 체크
    if (!comment) {
      dispatch(actionAlert());
      dispatch(actionSetMessage("댓글 내용을 작성해주세요!"));
      return;
    }
    dispatch(actionAddCommentList(board, boardId, obj));
    // 코멘트 작성 후 인풋태크에 있는 글 없애기
    setComment("");
  };

  if (isMobileOnly) {
    return (
      <React.Fragment>
        {/* <div style={{display:"inline-block" ,verticalAlign:"top"}}> */}
        <Grid padding="0 16px 0 16px">
          {is_login && <NicknameWrapper>{nickname}</NicknameWrapper>}
          <Grid
            is_flex="space_column"
            border={`1px solid ${theme.typoLightGrey2}`}
          >
            <Grid margin="0 5rem">
              <TextAreaAutoMobile
                placeholder={
                  is_login ? "댓글을 남겨보세요." : "로그인 후 이용해 주세요."
                }
                minRows="3"
                value={comment}
                onChange={changeComment}
                maxLength="300"
              />
            </Grid>

            <Grid is_flex="space_row" border="none">
              <Grid bg="#ffffff" align="right">
                <Text
                  color={theme.typoGrey3}
                  size={theme.bodyfourSize}
                  lineHeight={theme.bodyfourHeight}
                  margin="0 24px 0 0"
                >
                  <span>{comment?.length || 0}</span> / 300
                </Text>
              </Grid>

              <Button
                width="88px"
                height="32px"
                fontSize={theme.bodyfourSize}
                _onClick={write}
              >
                등록
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* </div> */}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {/* <div style={{display:"inline-block" ,verticalAlign:"top"}}> */}
      <Grid is_flex="space_row" margin="10px 0" width={theme.medicalWidth}>
        <Grid is_flex="space_column" border="1px solid #c1c1c1">
          <Grid margin="0 5rem">
            <TextAreaAuto
              placeholder={
                is_login ? "댓글을 남겨보세요." : "로그인 후 이용해 주세요."
              }
              minRows="3"
              value={comment}
              onChange={changeComment}
              maxLength="300"
            />
          </Grid>

          <Grid is_flex="space_row" border="none">
            <Grid bg="#ffffff" align="right">
              <Text
                color={theme.typoGrey3}
                size={theme.bodyTwoSize}
                lineHeight={theme.bodyTwoHeight}
                margin="0 24px 0 0"
              >
                <span>{comment?.length || 0}</span> / 300
              </Text>
            </Grid>

            <Button
              width={theme.smallButtonWidth}
              height={theme.smallButtonHeight}
              fontSize={theme.SubHeadOneSize}
              _onClick={write}
            >
              등록
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* </div> */}
    </React.Fragment>
  );
};

const NicknameWrapper = styled.div`
  text-align: start;
  margin-bottom: 4px;
  color: ${theme.bg};
`;

const TextAreaAuto = styled(TextareaAutosize)({
  resize: "none",
  width: "100%",
  padding: "1rem 0.7rem",
  boxSizing: "border-box",
  border: "none",
  fontSize: `${theme.SubHeadTwoSize}`,
  fontFamily: "Noto Sans KR",
  color: `${theme.typoBlack}`,
  "&:focus": {
    outline: "none",
  },
});

// <========= Mobile ==========>
const TextAreaAutoMobile = styled(TextareaAutosize)({
  resize: "none",
  width: "100%",
  padding: "0.5rem",
  boxSizing: "border-box",
  border: "none",
  fontSize: `${theme.bodyfourSize}`,
  lineHeight: `${theme.bodyfourHeight}`,
  fontFamily: "Noto Sans KR",
  color: `${theme.typoBlack}`,
  whiteSpace: "pre-wrap",
  "&:focus": {
    outline: "none",
  },
});

export default CommentWrite;
