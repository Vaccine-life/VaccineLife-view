import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";
import { actionAlert, actionSetMessage } from "../../redux/modules/popup";
import theme from "../../styles/theme";

const Alert = () => {
  const alertMessage = useSelector((state) => state.popup.alertMessage);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actionAlert());
    dispatch(actionSetMessage(""));
  };

  return (
    <Wrapper>
      <Modal>
        <Grid is_flex="center">
          <Text size={theme.bodyOneSize} lineHeight={theme.bodyOneHeight}>
            {alertMessage}
          </Text>
        </Grid>
        <Grid is_flex="center">
          <Button
            width={theme.smallButtonWidth}
            height={theme.smallButtonHeight}
            fontSize={theme.SubHeadOneSize}
            bg={theme.bg}
            bold
            _onClick={handleClick}
          >
            확인
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
export default Alert;
