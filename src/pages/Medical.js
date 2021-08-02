import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import { Text, Grid } from "../elements";
import Comment from "../components/Comment";
import styled from "styled-components";

const Medical = () => {
  // Medical 페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);

  return (
    <React.Fragment>
      <Wrapper>
        <Grid align="left" padding="20px 0 0 0">
          <Text bold size="24px" lineHeight="2">
            의료진분들께
          </Text>
        </Grid>

        <Comment />
      </Wrapper>
      {modal_status && <Login />}
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  padding: 0 5rem;
`;

export default Medical;
