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
      <Grid bg={theme.bg} is_flex="space_row">
        <Grid padding="10px 30px" width="auto" margin="0">
          <Image
            shape="rectangle"
            width="5rem"
            height="3rem"
            src="https://mblogthumb-phinf.pstatic.net/MjAxODAxMjNfMjcw/MDAxNTE2NzEzOTE4OTgw.IduRnAf7H8eKuWuX-YJZuwhfoxq960sjOXByi7A3GiIg.hasRU00Lkjwqjr7XbeYTb9hnANSppWgejCMCH8M7aFIg.JPEG.timeless_soul/KakaoTalk_Moim_77yVkO7j8BC3E8PV7DJ9iSRRVOH4Y2.jpg?type=w800"
          />
        </Grid>

        <Grid is_flex="space_row" width="auto" margin="0 20px">
          <Text>{props.nickname}님</Text>
          <Button
            width="5rem"
            margin="10px"
            _onClick={() => dispatch(actionVisible())}
          >
            로그인
          </Button>
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
`;

export default withRouter(Header);
