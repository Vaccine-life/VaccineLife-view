import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { Grid, Image, Text } from "../../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionVisible, actionNavVisible } from "../../redux/modules/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { history } from "../../redux/configStore";
import { withRouter } from "react-router-dom";
import login from "../../images/login.png";
import user from "../../images/user.png";
import Arrow from "../../images/Arrow.png";

// 모바일 버전 헤더에서 faBars아이콘 클릭시 뜨는 모달.
// 데스크탑 버전의 헤더를 모바일 버전으로 변경하기 위해 생성.
const NavModal = (props) => {
  const dispatch = useDispatch();

  // 로그인여부를 리덕스에서 가져와 로그인과 로그아웃 헤더를 분기함.
  const is_login = useSelector((state) => state.user.is_login);
  // 닉네임을 리덕스에서 가져와 로그인시 유저닉네임 보여줌.
  const nickname = useSelector((state) => state.user.user.nickname);
  // 현재 페이지의 경로명(pathname)을 가져옴.
  // 이 컴포넌트를 withRouter로 감싸서 history사용할 수 있게 함.
  const url = history.location.pathname;

  // 모달 바깥 부분 클릭시 모달 off
  // 모달을 감싼 부분에 onClick으로 적용
  const handleModalOff = (e) => {
    const clicked = e.target.closest(".modal");
    // console.log(clicked);
    if (clicked) {
      return;
    } else {
      dispatch(actionNavVisible());
    }
  };

  // 로그인 상태의 헤더모달
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
              {/* 회색 경계선 */}
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
  }
  // 로그아웃 상태의 헤더모달
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
  /* left: 0; */
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  width: 50%;
  height: 90%;
  /* 오른쪽에 붙게 정렬 */
  position: relative;
  left: 30%;

  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: right; */
  /* align-items: right; */
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
