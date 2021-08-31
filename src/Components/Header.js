import React from "react";
import { Grid, Image, Text } from "../elements";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionVisible, actionNavVisible } from "../redux/modules/modal";
import { history } from "../redux/configStore";

import logo from "../assets/mainlogo.png";
import theme from "../styles/theme";
import { isMobileOnly } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import user from "../images/user.png";

const Header = (props) => {
  const dispatch = useDispatch();

  // 로그인여부를 리덕스에서 가져와 로그인과 로그아웃 헤더를 분기함.
  const is_login = useSelector((state) => state.user.is_login);
  // 닉네임을 리덕스에서 가져와 로그인시 유저닉네임 보여줌.
  const nickname = useSelector((state) => state.user.user.nickname);
  // 현재 페이지의 경로명(pathname)을 가져옴.
  // 이 컴포넌트를 withRouter로 감싸서 history사용할 수 있게 함.
  const url = history.location.pathname;

  if (isMobileOnly) {
    return (
      <>
        <MobileWrapper>
          <Image
            margin="0 1rem"
            shape="rectangle"
            width={theme.logoWidth}
            height={theme.logoHeight}
            cursor="pointer"
            src={logo}
            _onClick={() => {
              history.push("/");
            }}
          />
          <MobileNavIcon>
            <FontAwesomeIcon
              icon={faBars}
              color={theme.bg2}
              size="2x"
              onClick={() => dispatch(actionNavVisible())}
            />
          </MobileNavIcon>
        </MobileWrapper>
      </>
    );
  }
  return (
    <React.Fragment>
      <Wrapper>
        <Grid bg={theme.white} is_flex="space_row">
          <Grid is_flex="space_row" width="auto" margin="0 0 0 5rem">
            <Grid
              is_flex="center"
              _onClick={() => {
                history.push("/");
              }}
            >
              <Image
                shape="rectangle"
                width={theme.logoWidth}
                height={theme.logoHeight}
                cursor="pointer"
                src={logo}
              />
            </Grid>

            <Grid is_flex="space_row" padding="0 3rem">
              <EachDiv
                nav={url === "/" ? true : false}
                onClick={() => {
                  history.push("/");
                }}
              >
                홈
              </EachDiv>
              <EachDiv
                nav={
                  url === "/vaccine" ||
                  url.includes("/detail") ||
                  url === "/vaccineboard/write" ||
                  url.includes("/modify")
                    ? true
                    : false
                }
                onClick={() => {
                  history.push("/vaccine");
                }}
              >
                백신후기
              </EachDiv>
              <EachDiv
                nav={
                  url === "/quarantine" ||
                  url.includes("/quarantinedetail") ||
                  url === "/quarantineboard/write" ||
                  url.includes("/quarantinemodify")
                    ? true
                    : false
                }
                onClick={() => {
                  history.push("/quarantine");
                }}
              >
                격리후기
              </EachDiv>
              <EachDiv
                nav={url === "/medical" ? true : false}
                onClick={() => {
                  history.push("/medical");
                }}
              >
                의료진분들께
              </EachDiv>
            </Grid>
          </Grid>

          <Grid is_flex="space_row" width="auto" margin="0">
            {is_login ? (
              <>
                <MypageDiv
                  nav={url === "/mypage" ? true : false}
                  onClick={() => {
                    history.push("/mypage");
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
                  {nickname}
                </MypageDiv>
              </>
            ) : (
              <Text
                width="5rem"
                cursor="pointer"
                margin="0 4rem"
                size={theme.headTwoSize}
                lineHeight={theme.headTwoHeight}
                color={theme.typoBlack}
                bold
              >
                <span
                  style={{ boxShadow: "inset 0 -1px 0 #242424" }}
                  onClick={() => dispatch(actionVisible())}
                >
                  로그인
                </span>
              </Text>
            )}
          </Grid>
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
};

Header.defaultProps = {
  nickname: "명수는열두살",
};

const Wrapper = styled.div`
  /* 스크롤 해도 상단 고정 */
  position: fixed;
  top: 0;
  z-index: 2;

  width: 100%;
  height: ${theme.headerHeight};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;
  color: ${theme.typoBlack};
  display: flex;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const EachDiv = styled.div`
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 28px 0 28px;
  font-size: ${theme.headTwoSize};
  line-height: ${theme.headTwoHeight};

  ${(props) =>
    props.nav &&
    ` border-bottom: 4px solid #242424;
  font-weight: 700;`}

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const MypageDiv = styled.div`
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5rem 0 0;
  font-size: ${theme.headTwoSize};
  line-height: ${theme.headTwoHeight};

  ${(props) =>
    props.nav &&
    ` border-bottom: 4px solid #242424;
  font-weight: 700;`}

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

// <========= Mobile ==========>
const MobileWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;

  width: 100%;
  height: ${theme.headerHeight};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.white};
`;

const MobileNavIcon = styled.div`
  margin: 0 1rem 0 0;
`;
export default withRouter(Header);
