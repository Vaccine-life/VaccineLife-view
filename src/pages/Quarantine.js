import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListNav from "../components/board/ListNav";
import Popular from "../components/board/Popular";
import QuarList from "../components/board/QuarList";
import Alert from "../components/popup/Alert";
import { Grid } from "../elements";
import { actionGetLike } from "../redux/modules/user";
import theme from "../styles/theme";
import Login from "./Login";

const Quarantine = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const modal_status = useSelector((state) => state.modal.visible);
  const alert_status = useSelector((state) => state.popup.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!is_login) {
      return;
    }
    dispatch(actionGetLike("quarantine"));
  }, [is_login]);

  return (
    <Grid width={theme.boardWidth} margin={`160px auto auto auto`}>
      {/* props 값 넣기 */}
      <Popular board="quarantine" />
      <ListNav board="quarantine" />
      <QuarList />
      {modal_status && <Login />}
      {alert_status && <Alert />}
    </Grid>
  );
};

export default Quarantine;
