import React from "react";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Text, Grid } from "../elements";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";
import Login from "./Login";

const Medical = (props) => {
  // Medical 페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);

  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list);

  return (
    <React.Fragment>
        <Grid width={theme.medicalWidth} margin="100px auto 40px auto">
        
          <Grid align="left">
            <Text bold size={theme.headOneSize} lineHeight="2" color={theme.fontColor}>의료진분들께</Text>
          </Grid>
          
          <CommentWrite/>
          {comment_list.map((c, idx) => {
            return <CommentList key={idx} {...c}/>
          })}
        
        </Grid>
      {modal_status && <Login />}
    </React.Fragment>
  );
};

export default Medical;
