import React from "react";
import "moment/locale/ko";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../elements";
import { actionAddComment, actionAddMedical } from "../redux/modules/comment";
import { actionAlert, actionSetMessage } from "../redux/modules/popup";
import displayedAt from "../shared/displayedAt";
// import displayedRestrict from "../shared/displayedRestrictt";

const CommentWrite = (props) => {
  const createdAt = new Date();
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const nickname = useSelector((state) => state.user.user.nickname);
  const user_id = useSelector((state) => state.user.user.userId);
  // console.log(nickname)

  // useState사용해서 인풋의 텍스트 내용 저장
  const [comment, setComment] = React.useState();
  const [length, setLength] = React.useState(0);

  const changeComment = (e) => {
    setComment(e.target.value);
    // console.log(e.target.value)
    // 인풋의 onChange에 넣어주고 콘솔 찍어보기
    // 바뀌는 내용이 바로 바로 오게 만든것!

    // 현재 글자 수
    const getTextLength = (str) => {
      let len = 0;
      for (let i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length === 6) {
          len++;
        }
        len++;
      }
      // console.log(len);
      setLength(len);
    };
    getTextLength(e.target.value);
  };

  const medicalObj = {
    userId: user_id,
    contents: comment,
    nickname: nickname,
    createdAt: createdAt,
  };
  const handleMedical = () => {
    // 로그인 후 이용
    if (!is_login) {
      dispatch(actionSetMessage("로그인 후 이용해 주세요"));
      dispatch(actionAlert());
      setComment();
      return;
    }

    // 빈 내용이면 alert창
    if (!comment) {
      dispatch(actionAlert());
      dispatch(actionSetMessage("응원 문구를 작성해주세요!"));
      return;
    } else {
      // 의료진분들께 dispatch
      dispatch(actionAddComment(medicalObj));
      dispatch(actionAddMedical(medicalObj));
      setComment();
      // setLength(0);
    }
  };

  return (
    <React.Fragment>
      <Grid is_flex="space_column" width={theme.medicalWidth}>
        <Grid align="left" margin="1.3rem 0">
          <Text bold size={theme.SubHeadOneSize} color={theme.fontColor}>
            {is_login ? nickname : "로그인 후 이용해 주세요 :)"}
          </Text>
        </Grid>

        {/* <TextareaAutosize aria-label="empty textarea" placeholder="응원의 한마디!" onResize="none" rows="8" width="10rem"/> */}

        <Grid is_flex="space_column" border="1px solid #c1c1c1">
          <Grid margin="0 5rem">
            <Input
              multiLine
              border="none"
              value={comment}
              placeholder="응원의 한마디!"
              maxLength="500"
              _onChange={changeComment}
              // 엔터키로 등록
              // onSubmit={write}
            />
          </Grid>

          <Grid is_flex="space_row" border="none">
            <Grid padding="10px" bg="#ffffff" align="right">
              {/* <Text size={theme.bodyTwoSize}><span>{length}</span> / 1000(byte)</Text> */}
              {/* obj?.prop => obj가 존재하면 obj.prop을 반환. 아니면 undefined반환 */}
              <Text size={theme.bodyTwoSize}>
                <span>{comment?.length || 0}</span> / 500
              </Text>
            </Grid>

            <Button
              width={theme.smallButtonWidth}
              height={theme.smallButtonHeight}
              fontSize={theme.SubHeadOneSize}
              _onClick={handleMedical}
            >
              등록
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// CommentWrite.defaultProps = {
//   nickname: "명수는열두살",
// };

export default CommentWrite;
