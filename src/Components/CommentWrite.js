import React from "react";
import styled from "styled-components";
import "moment/locale/ko";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../elements";
import { actionAddComment, actionAddMedical } from "../redux/modules/comment";
import { actionAlert, actionSetMessage } from "../redux/modules/popup";
import { isMobileOnly } from "react-device-detect";
import { TextareaAutosize } from "@material-ui/core";

const CommentWrite = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const nickname = useSelector((state) => state.user.user.nickname);
  const user_id = useSelector((state) => state.user.user.userId);

  const createdAt = new Date();

  // useState사용해서 인풋의 텍스트 내용 저장
  const [comment, setComment] = React.useState();
  // const [length, setLength] = React.useState(0);

  const changeComment = (e) => {
    setComment(e.target.value);
    // console.log(e.target.value);
    // 인풋의 onChange에 넣어주고 콘솔 찍어보기
    // 바뀌는 내용이 바로 바로 오게 만든것!

    // // 현재 글자 수
    // const getTextLength = (str) => {
    //   let len = 0;
    //   for (let i = 0; i < str.length; i++) {
    //     if (escape(str.charAt(i)).length === 6) {
    //       len++;
    //     }
    //     len++;
    //   }
    //   // console.log(len);
    //   setLength(len);
    // };
    // getTextLength(e.target.value);
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
      setComment("");
      // setLength(0);
    }
  };

  if (isMobileOnly) {
    return (
      <>
        <Grid is_flex="space_column" padding="0 1rem">
          <Grid is_flex="space_column" border="1px solid #c1c1c1">
            <Grid margin="0 5rem">
              <Input
                multiLine
                rows={6}
                border="none"
                value={comment}
                placeholder="코로나 19 최전선에서 헌신하는 의료진을 위한 응원메시지를 남겨주세요!"
                maxLength="500"
                color={theme.typoBlack}
                _onChange={changeComment}
              />
            </Grid>

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
    <React.Fragment>
      <Grid is_flex="space_column" margin="3rem 0" width={theme.medicalWidth}>
        <Grid is_flex="space_column" border="1px solid #c1c1c1">
          <Grid margin="0 5rem">
            <Input
              multiLine
              border="none"
              value={comment}
              placeholder="코로나 19 최전선에서 헌신하는 의료진을 위한 응원메시지를 남겨주세요!"
              maxLength="500"
              color={theme.typoBlack}
              _onChange={changeComment}
              // 엔터키로 등록
              // onSubmit={write}
            />
          </Grid>

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
    </React.Fragment>
  );
  // TextareaAutosize
  // return(
  //   <>
  //   <Grid is_flex="space_column" margin="3rem 0" width={theme.medicalWidth}>
  //       <Grid is_flex="space_column" border="1px solid #c1c1c1">
  //         <Grid margin="0 5rem">
  //           {/* <TextareaAuto> */}
  //           <TextareaAutosize
  //             style={{
  //               resize: "none",
  //               width: "100%",
  //               padding: "1rem 0.7rem",
  //               boxSizing: "border-box",
  //               border: "none",
  //               fontSize: `${theme.bodyThreeSize}`,
  //               fontFamily: "Noto Sans KR",
  //               color: `${theme.typoBlack}`,
  //               focus: { outline: "none" },
  //             }}
  //             placeholder="코로나 19 최전선에서 헌신하는 의료진을 위한 응원메시지를 남겨주세요!"
  //             minRows="5"
  //             onChange={changeComment}
  //             maxLength="500"
  //           />
  //           {/* </TextareaAuto> */}
  //         </Grid>

  //         <Grid is_flex="space_row" border="none">
  //           <Grid align="left" padding="13px" bg={theme.typoLightGrey1}>
  //             <Text size={theme.bodyThreeSize} color={theme.typoGrey3}>
  //               <span>{comment?.length || 0}</span> / 500
  //             </Text>
  //           </Grid>

  //           <Button
  //             width={theme.mediumButtonWidth}
  //             height={theme.mediumButtonHeight}
  //             fontSize={theme.SubHeadOneSize}
  //             color={theme.white}
  //             bold
  //             _onClick={handleMedical}
  //           >
  //             등록
  //           </Button>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //   </>
  // )
};

// CommentWrite.defaultProps = {
//   nickname: "명수는열두살",
// };

const TextareaAuto = styled.textarea.attrs({
  defaultValue: "",
  placeholder:
    "코로나 19 최전선에서 헌신하는 의료진을 위한 응원메시지를 남겨주세요!",
  rows: 5,
  maxLength: 500,
  // onChange: { changeComment },
})`
  resize: none;
  width: 100%;
  /* width: ${theme.medicalWidth}; */
  padding: 1rem 0.7rem;
  box-sizing: border-box;
  border: none;
  font-size: 16px;
  font-family: "Noto Sans KR";
  color: ${theme.typoBlack};
  align-items: left;
  :focus {
    outline: none;
  }
`;

export default CommentWrite;
