import React from "react";
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
  console.log(board, commentId, boardId)
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(actionDeleteCommentList(board, commentId, boardId));
    dispatch(actionCommentConfirm());
  };

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
            margin="0 15px 0 0"
            width={theme.smallButtonWidth}
            height={theme.smallButtonHeight}
            fontSize={theme.SubHeadOneSize}
            lineHeight={theme.SubHeadOneHeight}
            bg={theme.shadow}
            bold
            _onClick={() => dispatch(actionCommentConfirm())}
          >
            취소
          </Button>
          <Button
            margin="0"
            width={theme.smallButtonWidth}
            height={theme.smallButtonHeight}
            fontSize={theme.bodyOneSize}
            bg={theme.bg}
            bold
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
  background-color: ${theme.shadow};
  padding: 300px auto 0 auto;
`;

const Modal = styled.div`
  width: 400px;
  height: 256px;
  border-radius: 16px;
  position: relative;
  top: 200px;
  background-color: white;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
export default CommentConfirm;
