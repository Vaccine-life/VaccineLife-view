import React from "react";
import { isMobileOnly } from "react-device-detect";
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

  if (isMobileOnly) {
    return (
      <Wrapper isMobile={true}>
        <Modal isMobile={true}>
          <Grid is_flex="center">
            <Text size={theme.bodyThreeSize} lineHeight={theme.bodyThreeHeight}>
              {alertMessage}
            </Text>
          </Grid>
          <Grid is_flex="center">
            <Button
              margin="30px 0 10px 0"
              width="89px"
              height="42px"
              bg={theme.btnColor}
              fontSize={theme.SubHeadTwoSize}
              _onClick={handleClick}
            >
              확인
            </Button>
          </Grid>
        </Modal>
      </Wrapper>
    );
  }

  return (
    <Wrapper isMobile={false}>
      <Modal isMobile={false}>
        <Grid is_flex="center">
          <Text size={theme.bodyOneSize} lineHeight={theme.bodyOneHeight}>
            {alertMessage}
          </Text>
        </Grid>
        <Grid is_flex="center">
          <Button
            margin="30px 0 10px 0"
            width="120px"
            height={theme.mediumButtonHeight}
            bg={theme.btnColor}
            fontSize={theme.bodyTwoSize}
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
  /* ${(prop) =>
    prop.isMobile
      ? `
   padding: 150px auto 0 auto;
  `
      : `
   padding: 300px auto 0 auto;
  `}
  padding: 300px auto 0 auto; */
`;

const Modal = styled.div`
  ${(prop) =>
    prop.isMobile
      ? `
      max-width: 50%;;
  `
      : `
      width: max-content;;
  `}
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

export default Alert;
