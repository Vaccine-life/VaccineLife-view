import React from "react";
import { Text, Grid } from "../elements";
import Comment from "../components/Comment";
import styled from "styled-components";


const Medical = () => {

  return (
    <React.Fragment>
      <Wrapper>
        <Grid align="left" padding="20px 0 0 0">
          <Text bold size="24px" lineHeight="2">의료진분들께</Text>
        </Grid>
      
        <Comment/>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  padding: 0 5rem;
`;

export default Medical;