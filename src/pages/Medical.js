import React from "react";
import { Text, Grid } from "../elements";
import Comment from "../components/Comment";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Alert from "../components/popup/Alert";

const Medical = () => {
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

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
      {alert_status && <Alert />}
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  padding: 0 5rem;
`;

export default Medical;
