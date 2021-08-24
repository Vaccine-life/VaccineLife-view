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

  // 회원가입 인삿말을 줄바꿈&&닉네임 컬러 바꿔서 얼럿 띄우기위한 노력...

  const alertMsg = () => {
    // indexOf에 쓰이고, split할 때 쓰이는 +++++++는 절대 닉네임에 포함될 수 없는 문자열로 임의 설정한 것이다.

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
    } else {
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
