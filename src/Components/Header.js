import React from "react";
import { Grid, Image, Text } from "../elements";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionVisible, actionNavVisible } from "../redux/modules/modal";
import { history } from "../redux/configStore";

import logo from "../assets/mainlogo.png";
import theme from "../styles/theme";
import { deleteCookie } from "../shared/cookie";
import { actionLogoutCookie } from "../redux/modules/user";
import { isMobileOnly } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import user from "../images/user.png";

const Header = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const nickname = useSelector((state) => state.user.user.nickname);
  const dispatch = useDispatch();
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
                {/* <Text
                  size={theme.headTwoSize}
                  lineHeight={theme.headTwoHeight}
                  color={theme.typoBlack}
                >
                  <span style={{ fontWeight: "bold" }}>{nickname}</span> 님,
                  안녕하세요
                </Text>
                <Text
                  width="5rem"
                  cursor="pointer"
                  margin="0 5rem 0 3rem"
                  size={theme.headTwoSize}
                  lineHeight={theme.headTwoHeight}
                  color={theme.typoBlack}
                  bold
                >
                  <span
                    style={{ boxShadow: "inset 0 -1px 0 #242424" }}
                    onClick={() => dispatch(actionLogoutCookie())}
                  >
                    로그아웃
                  </span>
                </Text> */}
                <EachDiv
                // onClick={() => {
                //   history.push("");
                // }}
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
                    margin="0 5rem 0 0"
                  >
                    {nickname}
                  </Text>
                </EachDiv>
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
  top: 0;
  width: 100%;
  height: ${theme.headerHeight};
  position: fixed;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;
  color: ${theme.typoBlack};
  display: flex;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const MobileWrapper = styled.div`
  top: 0;
  width: 100%;
  height: ${theme.headerHeight};
  position: fixed;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.white};
  /* padding: 1rem 1.5rem; */
`;

const MobileNavIcon = styled.div`
  margin: 0 1rem 0 0;
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
    /* display: none; */
  }
`;

export default withRouter(Header);
