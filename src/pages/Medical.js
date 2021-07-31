import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Text, Grid } from "../elements";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";


const Medical = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list);

  return (
    <React.Fragment>
      <Wrapper>
        <Grid align="left" padding="20px 0 0 0">
          <Text bold size="24px" lineHeight="2">의료진분들께</Text>
        </Grid>
        
        <CommentWrite/>
        {comment_list.map((c, idx) => {
          return <CommentList key={idx} {...c}/>
        })}
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  padding: 0 5rem;
  padding-top: 4rem;
  padding-bottom: 15rem;
`;

export default Medical;