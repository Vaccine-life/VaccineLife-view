import React from "react";
import theme from "../styles/theme";
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
        <Grid width={theme.medicalWidth}>
        
          <Grid align="left" padding="2rem 0 0 0">
            <Text bold size={theme.headOneSize} lineHeight="2" color={theme.fontColor}>의료진분들께</Text>
          </Grid>
          
          <CommentWrite/>
          {comment_list.map((c, idx) => {
            return <CommentList key={idx} {...c}/>
          })}
        
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  padding: 4rem 0 3rem 0;
  background-color: #F7F7F7;
`;

export default Medical;