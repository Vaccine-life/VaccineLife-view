import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import List from "../components/board/List";
import ListNav from "../components/board/ListNav";
import Popular from "../components/board/Popular";
import Alert from "../components/popup/Alert";
import { Grid } from "../elements";
import { actionGetLike } from "../redux/modules/like";
import Spinner from "../shared/Spinner";
import theme from "../styles/theme";
import Login from "./Login";

const Vaccine = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  // vacBoard페이지에서도 모달 로그인창이 뜰수 있게 함
  const modal_status = useSelector((state) => state.modal.visible);
  // alert
  const alert_status = useSelector((state) => state.popup.alert);
  // like
  const like_status = useSelector((state) => state.like.likeListVac);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!is_login) {
      return;
    }
    dispatch(actionGetLike("vaccine"));
  }, []);

  return (
    <Grid width={theme.boardWidth} margin={`160px auto auto auto`}>
      {/* props 값 넣기 */}
      <Popular board="vaccine" />
      <ListNav board="vaccine" />
      <List board="vaccine" />
      {modal_status && <Login />}
      {alert_status && <Alert />}
      {isLoading && <Spinner />}
    </Grid>
  );
};

export default Vaccine;
