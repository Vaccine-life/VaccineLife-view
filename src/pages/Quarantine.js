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
import BottomSpinner from "../shared/BottomSpinner";

const Quarantine = () => {
  const is_login = useSelector((state) => state.user.is_login);
  // 스피너 변환용
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  // 모달 상태관리
  const modal_status = useSelector((state) => state.modal.visible);
  const navModal_status = useSelector((state) => state.modal.navVisible);
  // Alert 상태 관리
  const alert_status = useSelector((state) => state.popup.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 하지 않았을때는 좋아요한 목록 불러오지 않기
    if (!is_login) {
      return;
    }
    // 격리 게시판의 좋아요 글 목록 가져오기
    dispatch(actionGetLike("quarantine"));
  }, []);

  if (isMobileOnly) {
    return (
      <Grid margin="80px auto 40px auto">
        <MetaScript title="슬기로운 백신생활 | 격리 후기" />
        {/* props 값 넣기 */}
        <BoardName board="quarantine" />
        <Popular board="quarantine" />
        <ListNav board="quarantine" />
        <QuarList board="quarantine" />
        {isLoading && <BottomSpinner />}
        {navModal_status && <NavModal />}
        {alert_status && <Alert />}
        {modal_status && <Login />}
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
      {isLoading && <BottomSpinner />}
      {modal_status && <Login />}
      {alert_status && <Alert />}
    </Grid>
  );
};

export default Quarantine;
