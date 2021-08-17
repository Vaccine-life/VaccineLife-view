import React, { useEffect } from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import ListNav from "../components/board/ListNav";
import Popular from "../components/board/Popular";
import QuarList from "../components/board/QuarList";
import BoardName from "../components/mobile/BoardName";
import Alert from "../components/popup/Alert";
import { Grid } from "../elements";
import { actionGetLike } from "../redux/modules/like";
import MetaScript from "../shared/MetaScript";
import Spinner from "../shared/Spinner";
import theme from "../styles/theme";
import Login from "./Login";
import NavModal from "../components/mobile/NavModal";

const Quarantine = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  const modal_status = useSelector((state) => state.modal.visible);
  const navModal_status = useSelector((state) => state.modal.navVisible);
  const alert_status = useSelector((state) => state.popup.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!is_login) {
      return;
    }
    dispatch(actionGetLike("quarantine"));
  }, []);

  if (isMobileOnly) {
    return (
      <Grid margin="0px auto 40px auto">
        <MetaScript title="슬기로운 백신생활 | 격리 후기" />
        {/* props 값 넣기 */}
        <BoardName board="quarantine" />
        <Popular board="quarantine" />
        <ListNav board="quarantine" />
        <QuarList board="quarantine" />
        {navModal_status && <NavModal />}
        {alert_status && <Alert />}
        {isLoading && <Spinner />}
      </Grid>
    );
  }
  return (
    <Grid width={theme.boardWidth} margin={`160px auto 120px auto`}>
      <MetaScript title="슬기로운 백신생활 | 격리 후기" />
      {/* props 값 넣기 */}
      <Popular board="quarantine" />
      <ListNav board="quarantine" />
      <QuarList board="quarantine" />
      {modal_status && <Login />}
      {alert_status && <Alert />}
      {isLoading && <Spinner />}
    </Grid>
  );
};

export default Quarantine;
