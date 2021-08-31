import React from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";
import { actionAlert, actionSetMessage } from "../../redux/modules/popup";
import { actionVisible } from "../../redux/modules/modal";
import theme from "../../styles/theme";

const Alert = () => {
  //alert 상태체크
  const alertMessage = useSelector((state) => state.popup.alertMessage);
  const dispatch = useDispatch();

  // '로그인 후 이용해 주세요' 얼럿이 뜨는 경우, 얼럿창을 끄고 로그인모달을 켠다.
  const handleClick = () => {
    if (
      alertMessage === "로그인 후 이용해 주세요." ||
      alertMessage === "로그인 후 이용해 주세요"
    ) {
      // alert 끄기
      dispatch(actionAlert());
      // 메세지 초기화
      dispatch(actionSetMessage(""));
      dispatch(actionVisible());
    } else {
      dispatch(actionAlert());
      dispatch(actionSetMessage(""));
    }
  };

  const alertMsg = () => {
    // redux modules의 user.js actionSignup에 따르면, 회원가입 및 로그인 성공시 메세지에 '+++++++'이 포함되어 온다.

    // 회원가입 인삿말의 경우 if문 적용(줄바꿈 및 스타일 적용)
    if (alertMessage.indexOf("+++++++") !== -1) {
      return (
        <>
          <Text
            size={theme.bodyTwoSize}
            lineHeight={theme.bodyThreeHeight}
            margin="0 auto 15px auto"
            bold
          >
            반갑습니다,
            <span style={{ color: `${theme.SuccessGreen}` }}>
              &nbsp;{alertMessage.split("+++++++")[0]}
            </span>
            님!
          </Text>
          <Text size="17px" lineHeight={theme.bodyThreeHeight}>
            {alertMessage.split("+++++++")[1]}
          </Text>
        </>
      );
    }
    // 그 이외의 메세지인 경우 else문 적용
    else {
      return (
        <>
          <Text size={theme.bodyOneSize} lineHeight={theme.bodyThreeHeight}>
            {alertMessage}
          </Text>
        </>
      );
    }
  };

  if (isMobileOnly) {
    return (
      <Wrapper isMobile={true}>
        <Modal isMobile={true}>
          <Grid is_flex="center">
            <Text size={theme.bodyThreeSize} lineHeight={theme.bodyThreeHeight}>
              {alertMsg()}
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
            {alertMsg()}
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
  z-index: 4;
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
      max-width: 70%;
  `
      : `
      width: max-content;
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

  ${(prop) =>
    prop.isMobile
      ? `
      padding: 40px;
  `
      : `
      padding: 40px 60px;
  `}
`;

export default Alert;
