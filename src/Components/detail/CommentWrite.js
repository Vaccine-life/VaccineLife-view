import React from "react";
import moment from "moment";
import "moment/locale/ko";

import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../../elements";
import theme from "../../styles/theme";

const CommentWrite = (props) => {
  const { board } = props;
  const dispatch = useDispatch();

  // useState사용해서 인풋의 텍스트 내용 저장
  const [comment, setComment] = React.useState();

  const changeComment = (e) => {
    setComment(e.target.value);
    // console.log(typeof e.target.value)
    // 인풋의 onChange에 넣어주고 콘솔 찍어보기
    // 바뀌는 내용이 바로 바로 오게 만든것!
  };

  const write = () => {
    // console.log(comment);
    // 오브젝트로 넣어줘야

    dispatch();
    // 코멘트 작성 후 인풋태크에 있는 글 없애기
    setComment();
  };

  return (
    <React.Fragment>
      {/* <div style={{display:"inline-block" ,verticalAlign:"top"}}> */}
      <Grid is_flex="space_row" margin="10px 0" width={theme.medicalWidth}>
        <Grid align="left" width="10rem">
          <Text
            bold
            size={theme.SubHeadOneSize}
            lineHeight={theme.SubHeadOneHeight}
          >
            닉네임
          </Text>
        </Grid>

        <Grid is_flex="space_column" border="1px solid #c1c1c1">
          <Grid margin="0 5rem">
            {/* <div contentEditable="true"> */}
            <Input
              multiLine
              rows={3}
              border="none"
              value={comment}
              placeholder="댓글을 남겨보세요."
              maxLength="300"
              _onChange={changeComment}
              // 엔터키로 등록
              // onSubmit={write}
              contentEditable="true"
              fontSize={theme.bodyTwoSize}
            />
            {/* </div> */}
          </Grid>

          <Grid is_flex="space_row" border="none">
            <Grid padding="10px" bg="#ffffff" align="right">
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
              bold
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

export default CommentWrite;