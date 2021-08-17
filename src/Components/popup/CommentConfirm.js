import React from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";
import { actionDeleteCommentList } from "../../redux/modules/comment";
import { actionCommentConfirm } from "../../redux/modules/popup";
import logger from "../../shared/logger";
import theme from "../../styles/theme";

const CommentConfirm = (props) => {
  const { confirmMessage } = props;
  const { board, commentId, boardId } = useSelector(
    (state) => state.popup.commentObj
  );
  console.log(board, commentId, boardId);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(actionDeleteCommentList(board, commentId, boardId));
    dispatch(actionCommentConfirm());
  };

  if (isMobileOnly) {
    return (
      <Wrapper>
        <Modal>
          <Grid is_flex="center">
            <Text size={theme.bodyThreeSize} lineHeight={theme.bodyThreeHeight}>
              {confirmMessage}
            </Text>
          </Grid>
          <Grid is_flex="center">
            <Button
              margin="30px 15px 0 0"
              width={theme.smallButtonWidth}
              height={theme.smallButtonHeight}
              fontSize={theme.SubHeadTwoSize}
              lineHeight={theme.SubHeadTwoHeight}
              bg={theme.typoLightGrey2}
              _onClick={() => dispatch(actionCommentConfirm())}
            >
              취소
            </Button>
            <Button
              margin="30px 0 0 0"
              width={theme.smallButtonWidth}
              height={theme.smallButtonHeight}
              fontSize={theme.SubHeadTwoSize}
              lineHeight={theme.SubHeadTwoHeight}
              bg={theme.bg2}
              _onClick={handleDelete}
            >
              삭제
            </Button>
          </Grid>
        </Modal>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Modal>
        <Grid is_flex="center">
          <Text size={theme.bodyOneSize} lineHeight={theme.bodyOneHeight}>
            {confirmMessage}
          </Text>
        </Grid>
        <Grid is_flex="center">
          <Button
            margin="30px 15px 0 0"
            width={theme.smallButtonWidth}
            height={theme.smallButtonHeight}
            fontSize={theme.SubHeadOneSize}
            lineHeight={theme.SubHeadOneHeight}
            bg={theme.typoLightGrey2}
            _onClick={() => dispatch(actionCommentConfirm())}
          >
            취소
          </Button>
          <Button
            margin="30px 0 0 0"
            width={theme.smallButtonWidth}
            height={theme.smallButtonHeight}
            fontSize={theme.bodyOneSize}
            bg={theme.bg2}
            _onClick={handleDelete}
          >
            삭제
          </Button>
        </Grid>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  /* width: 400px;
  height: 256px;
  border-radius: 16px;
  position: relative;
  top: 200px;
  background-color: white;
  margin: auto;
  display: flex;
  flex-direction: column; */
  width: max-content;
  height: max-content;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 40px 60px;
`;
export default CommentConfirm;
