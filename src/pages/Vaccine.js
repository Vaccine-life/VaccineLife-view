import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import List from "../components/board/List";
import ListNav from "../components/board/ListNav";
import Popular from "../components/board/Popular";
import Alert from "../components/popup/Alert";
import { Grid } from "../elements";
import theme from "../styles/theme";

import Login from "./Login";

const Vaccine = () => {
  // vacBoard페이지에서도 모달 로그인창이 뜰수 있게 함
  const modal_status = useSelector((state) => state.modal.visible);
  //alert
  const alert_status = useSelector((state) => state.popup.alert);

  return (
    <Grid width={theme.boardWidth} margin={`160px auto auto auto`}>
      {/* props 값 넣기 */}
      <Popular board="vaccine" />
      <ListNav board="vaccine" />
      <List board="vaccine" />
      {modal_status && <Login />}
      {alert_status && <Alert />}
    </Grid>
  );
};

export default Vaccine;
