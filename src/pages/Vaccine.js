import React from "react";
import { useEffect } from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import List from "../components/board/List";
import ListNav from "../components/board/ListNav";
import Popular from "../components/board/Popular";
import BoardName from "../components/mobile/BoardName";
import Alert from "../components/popup/Alert";
import { Grid } from "../elements";
import { actionGetLike } from "../redux/modules/like";
import MetaScript from "../shared/MetaScript";
import Spinner from "../shared/Spinner";
import theme from "../styles/theme";
import Login from "./Login";
import NavModal from "../components/mobile/NavModal";
import BottomSpinner from "../shared/BottomSpinner";

const Vaccine = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  // vacBoard페이지에서도 모달 로그인창이 뜰수 있게 함
  const modal_status = useSelector((state) => state.modal.visible);
  const navModal_status = useSelector((state) => state.modal.navVisible);
  // alert
  const alert_status = useSelector((state) => state.popup.alert);
  // like

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!is_login) {
      return;
    }
    dispatch(actionGetLike("vaccine"));
  }, []);

  if (isMobileOnly) {
    return (
      <Grid margin="80px auto 40px auto">
        <MetaScript title="슬기로운 백신생활 | 백신접종 후기" />
        <BoardName board="vaccine" />
        <Popular board="vaccine" />
        <ListNav board="vaccine" />
        <List board="vaccine" />
        {isLoading && <BottomSpinner />}
        {navModal_status && <NavModal />}
        {alert_status && <Alert />}
      </Grid>
    );
  }

  return (
    <Grid width={theme.boardWidth} margin={`160px auto 120px auto`}>
      <MetaScript title="슬기로운 백신생활 | 백신접종 후기" />
      {/* props 값 넣기 */}
      <Popular board="vaccine" />
      <ListNav board="vaccine" />
      <List board="vaccine" />
      {isLoading && <BottomSpinner />}
      {modal_status && <Login />}
      {alert_status && <Alert />}
    </Grid>
  );
};

export default Vaccine;
