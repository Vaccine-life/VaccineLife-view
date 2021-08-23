import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { Grid, Image, Text } from "../../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionVisible, actionNavVisible } from "../../redux/modules/modal";
import { actionLogoutCookie } from "../../redux/modules/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { history } from "../../redux/configStore";
import { withRouter } from "react-router-dom";
import login from "../../images/login.png";
import logout from "../../images/logout.png";
import user from "../../images/user.png";
import Arrow from "../../images/Arrow.png";

const NavModal = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const nickname = useSelector((state) => state.user.user.nickname);
  const url = history.location.pathname;

  // 모달 바깥 부분 클릭시 모달 off
  const handleModalOff = (e) => {
    const clicked = e.target.closest(".modal");
    // console.log(clicked);
    if (clicked) {
      return;
    } else {
      dispatch(actionNavVisible());
    }
  };

  if (is_login) {
    return (
      <>
        <Wrapper
          onClick={(e) => {
            handleModalOff(e);
          }}
        >
          <Modal className="modal">
            <Xbutton
              onClick={() => {
                dispatch(actionNavVisible());
              }}
            >
              <FontAwesomeIcon icon={faTimes} color={theme.bg2} size="lg" />
            </Xbutton>

            <Grid align="left">
              <TextIconWrapper
                onClick={() => {
                  history.push("/mypage");
                  dispatch(actionNavVisible());
                }}
              >
                <img
                  src={user}
                  alt=""
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    margin: "0 5px 0 0",
                  }}
                />
                <Text
                  color={theme.typoBlack}
                  size={theme.bodyThreeSize}
                  whiteSpace="pre"
                >
                  {nickname}
                </Text>
                <img
                  src={Arrow}
                  alt=""
                  style={{
                    width: "6px",
                    height: "12px",
                    margin: "0 0 0 1rem",
                    color: `${theme.typoGrey2}`,
                  }}
                />
              </TextIconWrapper>
              <div
                style={{ borderBottom: "1px solid #F7F7F7", margin: "2rem 0" }}
              />
              <Text
                color={theme.typoBlack}
                size={theme.bodyThreeSize}
                margin="2rem 0"
                nav={
                  url === "/vaccine" ||
                  url.includes("/detail") ||
                  url === "/vaccineboard/write" ||
                  url.includes("/modify")
                    ? true
                    : false
                }
                _onClick={() => {
                  history.push("/vaccine");
                  dispatch(actionNavVisible());
                }}
              >
                백신 접종 후기
              </Text>
              <Text
                color={theme.typoBlack}
                size={theme.bodyThreeSize}
                margin="2rem 0"
                nav={
                  url === "/quarantine" ||
                  url.includes("/quarantinedetail") ||
                  url === "/quarantineboard/write" ||
                  url.includes("/quarantinemodify")
                    ? true
                    : false
                }
                _onClick={() => {
                  history.push("/quarantine");
                  dispatch(actionNavVisible());
                }}
              >
                자가 격리 후기
              </Text>
              <Text
                color={theme.typoBlack}
                size={theme.bodyThreeSize}
                margin="2rem 0"
                _onClick={() => {
                  history.push("/medical");
                  dispatch(actionNavVisible());
                }}
              >
                의료진분들께
              </Text>
              {/* <div
                style={{ borderBottom: "1px solid #F7F7F7", margin: "2rem 0" }}
              /> */}

              {/* <TextIconWrapper
                onClick={() => {
                  dispatch(actionNavVisible());
                  dispatch(actionLogoutCookie());
                }}
              >
                <Text
                  color={theme.typoBlack}
                  size={theme.bodyThreeSize}
                  margin="2rem 0"
                >
                  로그아웃
                </Text>
                <Image
                  shape="square"
                  size="1.5rem"
                  margin="0 0 0 3px"
                  src={logout}
                />
              </TextIconWrapper> */}
            </Grid>
          </Modal>
        </Wrapper>
      </>
    );
  }
  return (
    <>
      <Wrapper
        onClick={(e) => {
          handleModalOff(e);
        }}
      >
        <Modal className="modal">
          <Xbutton
            onClick={() => {
              dispatch(actionNavVisible());
            }}
          >
            <FontAwesomeIcon
              icon={faTimes}
              color={theme.bg2}
              size="lg"
              margin="2rem 0"
            />
          </Xbutton>

          <Grid align="left">
            <TextIconWrapper
              onClick={() => {
                dispatch(actionNavVisible());
                dispatch(actionVisible());
              }}
            >
              <Text color={theme.typoBlack} size={theme.bodyThreeSize}>
                로그인
              </Text>
              <Image
                shape="square"
                size="1.5rem"
                margin="0 0 0 3px"
                src={login}
              />
            </TextIconWrapper>
            <div
              style={{ borderBottom: "1px solid #F7F7F7", margin: "2rem 0" }}
            />
            <Text
              color={theme.typoBlack}
              size={theme.bodyThreeSize}
              margin="2rem 0"
              nav={
                url === "/vaccine" ||
                url.includes("/detail") ||
                url === "/vaccineboard/write" ||
                url.includes("/modify")
                  ? true
                  : false
              }
              _onClick={() => {
                history.push("/vaccine");
                dispatch(actionNavVisible());
              }}
            >
              백신 접종 후기
            </Text>
            <Text
              color={theme.typoBlack}
              size={theme.bodyThreeSize}
              margin="2rem 0"
              nav={
                url === "/quarantine" ||
                url.includes("/quarantinedetail") ||
                url === "/quarantineboard/write" ||
                url.includes("/quarantinemodify")
                  ? true
                  : false
              }
              _onClick={() => {
                history.push("/quarantine");
                dispatch(actionNavVisible());
              }}
            >
              자가 격리 후기
            </Text>
            <Text
              color={theme.typoBlack}
              size={theme.bodyThreeSize}
              margin="2rem 0"
              _onClick={() => {
                history.push("/medical");
                dispatch(actionNavVisible());
              }}
            >
              의료진분들께
            </Text>
          </Grid>
        </Modal>
      </Wrapper>
    </>
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
  width: 50%;
  height: 90%;
  position: relative;
  /* top: 50%;
  transform: translateY(-50%); */
  left: 30%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: right;
  padding: 10%;
`;

const Xbutton = styled.div`
  margin: 0 0 2rem auto;
  &:hover {
    cursor: pointer;
  }
`;

const TextIconWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 0;
`;
export default withRouter(NavModal);
