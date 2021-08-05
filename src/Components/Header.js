import React from "react";
import { Grid, Image, Text } from "../elements";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionVisible } from "../redux/modules/modal";
import { history } from "../redux/configStore";

import logo from "../assets/mainlogo.png";
import theme from "../styles/theme";
import logger from "../shared/logger";

const Header = (props) => {
  const dispatch = useDispatch();
  const url = history.location.pathname;
  logger(url.includes("/detail"));

  return (
    <React.Fragment>
      <Wrapper>
        <Grid bg="#ffffff" is_flex="space_row">
          <Grid width="auto" margin="1rem 5rem">
            <Grid is_flex="space_row">
              <Grid
                is_flex="center"
                _onClick={() => {
                  history.push("/");
                }}
              >
                <Image
                  shape="rectangle"
                  width="95px"
                  height="51px"
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
                    url === "/vaccine" || url.includes("/detail") ? true : false
                  }
                  onClick={() => {
                    history.push("/vaccine");
                  }}
                >
                  백신후기
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
          </Grid>

          <Grid is_flex="space_row" width="auto" margin="0 20px">
            <Text size={theme.headTwoSize} lineHeight={theme.headTwoHeight}>
              <span style={{ fontWeight: "bold" }}>{props.nickname}</span> 님,
              안녕하세요
            </Text>
            <Text
              width="5rem"
              cursor="pointer"
              margin="0 4rem"
              size={theme.headTwoSize}
              lineHeight={theme.headTwoHeight}
              bold
            >
              <span
                style={{ boxShadow: "inset 0 -1px 0 #242424" }}
                onClick={() => dispatch(actionVisible())}
              >
                로그인
              </span>
            </Text>
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
  border: 1px solid #dbdbdb;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
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
    ` border-bottom: 4px solid black;
  font-weight: 700;`}
`;

export default withRouter(Header);
