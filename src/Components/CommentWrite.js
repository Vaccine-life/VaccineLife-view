import React from "react";
import "moment/locale/ko";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Text, Button, Grid } from "../elements";
import { actionAddMedical } from "../redux/modules/comment";
import { actionAlert, actionSetMessage } from "../redux/modules/popup";
import { isMobileOnly } from "react-device-detect";
import { TextareaAutosize } from "@material-ui/core";
import commentwrite from "../styles/commentwrite.css";

const CommentWrite = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const nickname = useSelector((state) => state.user.user.nickname);
  const user_id = useSelector((state) => state.user.user.userId);

  // useState사용해서 인풋의 텍스트 내용 저장
  const [comment, setComment] = React.useState();
  // TextareaAutosize가 변할때마다 setComment에 넣어서 comment갱신.
  const changeComment = (e) => {
    setComment(e.target.value);
  };

  const createdAt = new Date();

  // actionAddMedical에 담아서 보냄
  const medicalObj = {
    userId: user_id,
    contents: comment,
    nickname: nickname,
    createdAt: createdAt,
  };
  // 내용 추가하는 버튼에 onClick으로 적용.
  const handleMedical = () => {
    // 로그인 후 이용
    if (!is_login) {
      dispatch(actionSetMessage("로그인 후 이용해 주세요"));
      dispatch(actionAlert());
      setComment("");
      return;
    }
    // 빈 내용이면 alert창
    if (!comment) {
      dispatch(actionAlert());
      dispatch(actionSetMessage("응원 문구를 작성해주세요!"));
      return;
    } else {
      // 의료진분들께 dispatch
      dispatch(actionAddMedical(medicalObj));
      setComment("");
    }
  };

  if (isMobileOnly) {
    return (
      <>
        <Grid is_flex="space_column" padding="0 1rem">
          <Grid is_flex="space_column" border={`1px solid ${theme.typoGrey1}`}>
            <TextareaAutosize
              style={{
                resize: "none",
                width: "100%",
                padding: "0.55rem",
                boxSizing: "border-box",
                border: "none",
                fontSize: `${theme.bodyfourSize}`,
                lineHeight: `${theme.bodyfourHeight}`,
                fontFamily: "Noto Sans KR",
                color: `${theme.typoBlack}`,
                whiteSpace: "pre-wrap",
              }}
              placeholder="코로나 19 최전선에서 헌신하는 의료진을 위한 응원메시지를 남겨주세요!"
              minRows="5"
              value={comment}
              onChange={changeComment}
              maxLength="500"
            />

            <Grid is_flex="space_row" border="none">
              <Grid align="left" padding="13px" bg={theme.typoLightGrey1}>
                <Text size={theme.bodyThreeSize} color={theme.typoGrey3}>
                  <span>{comment?.length || 0}</span> / 500
                </Text>
              </Grid>

              <Button
                width={theme.mediumButtonWidth}
                height={theme.mediumButtonHeight}
                fontSize={theme.SubHeadOneSize}
                color={theme.white}
                bold
                _onClick={handleMedical}
              >
                등록
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid
        is_flex="space_column"
        margin="2rem 0 3rem 0"
        width={theme.medicalWidth}
      >
        <Grid is_flex="space_column" border={`1px solid ${theme.typoGrey1}`}>
          <TextareaAutosize
            style={{
              resize: "none",
              width: "100%",
              padding: "1rem 0.7rem",
              boxSizing: "border-box",
              border: "none",
              fontSize: `${theme.SubHeadTwoSize}`,
              fontFamily: "Noto Sans KR",
              color: `${theme.typoBlack}`,
              focus: { outline: "none" },
            }}
            placeholder="코로나 19 최전선에서 헌신하는 의료진을 위한 응원메시지를 남겨주세요!"
            minRows="5"
            value={comment}
            onChange={changeComment}
            maxLength="500"
          />

          <Grid is_flex="space_row" border="none">
            <Grid align="left" padding="13px" bg={theme.typoLightGrey1}>
              <Text size={theme.bodyThreeSize} color={theme.typoGrey3}>
                <span>{comment?.length || 0}</span> / 500
              </Text>
            </Grid>

            <Button
              width={theme.mediumButtonWidth}
              height={theme.mediumButtonHeight}
              fontSize={theme.SubHeadOneSize}
              color={theme.white}
              bold
              _onClick={handleMedical}
            >
              등록
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// CommentWrite.defaultProps = {
//   nickname: "명수는열두살",
// };

export default CommentWrite;
