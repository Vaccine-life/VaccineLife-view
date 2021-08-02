import React from "react";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";


import { Text, Grid } from "../elements";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";
import Login from "./Login";

import { useSelector } from "react-redux";
import Alert from "../components/popup/Alert";

const Medical = () => {
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);
  // Medical 페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);

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
      {modal_status && <Login />}
           {alert_status && <Alert />}

    </React.Fragment>
  );
};

const Wrapper = styled.div`
  padding: 4rem 0 3rem 0;
  background-color: #F7F7F7;
`;

export default Medical;
