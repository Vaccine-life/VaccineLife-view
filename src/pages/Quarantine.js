import { List } from "immutable";
import React from "react";
import { useSelector } from "react-redux";
import ListNav from "../components/board/ListNav";
import Popular from "../components/board/Popular";
import Alert from "../components/popup/Alert";
import { Grid } from "../elements";
import theme from "../styles/theme";
import Login from "./Login";

const Quarantine = () => {
  const modal_status = useSelector((state) => state.modal.visible);
  const alert_status = useSelector((state) => state.popup.alert);
  return (
    <Grid width={theme.boardWidth} margin={`160px auto auto auto`}>
      {/* props 값 넣기 */}
      <Popular board="quarantine" />
      <ListNav board="quarantine" />
      <List board="quarantine" />
      {modal_status && <Login />}
      {alert_status && <Alert />}
    </Grid>
  );
};

export default Quarantine;
