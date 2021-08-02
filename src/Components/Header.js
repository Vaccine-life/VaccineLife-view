import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import theme from "../styles/theme";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionVisible } from "../redux/modules/modal";

const Header = (props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Wrapper>
        <Grid bg="#ffffff" is_flex="space_row">
          <Grid width="auto" margin="1rem 5rem">
            <Grid is_flex="space_row">
              <Grid>
                <Text color={theme.bg2} cursor="pointer">
                  슬기로운
                </Text>
                <Text color={theme.bg2} cursor="pointer" size="16" bold>
                  백신생활
                </Text>
              </Grid>

              <Grid is_flex="space_row" padding="0 3rem">
                <Grid width="5em">
                  <Text>홈</Text>
                </Grid>
                <Grid width="6em">
                  <Text>백신후기</Text>
                </Grid>
                <Grid width="8em">
                  <Text>의료진분들께</Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid is_flex="space_row" width="auto" margin="0 20px">
            <Text>
              <span style={{ fontWeight: "bold" }}>{props.nickname}</span> 님,
              안녕하세요
            </Text>
            <Text width="5rem" cursor="pointer" margin="0 4rem">
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
  width: 100%;
  position: fixed;
  /* z-index: 1; */
  border: 1px solid #dbdbdb;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

export default withRouter(Header);
