import React from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";
import { actionConfirm } from "../../redux/modules/popup";
import theme from "../../styles/theme";

// 사용시 props에 해당하는 것들을 넣어줄것

const Confirm = (props) => {
  // props에 작동시킬 함수와 메세지 전달
  const { confirmMessage, activeFunction } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    activeFunction();
    dispatch(actionConfirm());
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
              _onClick={() => dispatch(actionConfirm())}
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
            _onClick={() => dispatch(actionConfirm())}
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
export default Confirm;
