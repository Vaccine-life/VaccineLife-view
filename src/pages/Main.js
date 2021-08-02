import React from "react";
import { useSelector } from "react-redux";
import Alert from "../components/popup/Alert";
import Login from "./Login";
import Input from "../elements/Input";

const Main = () => {
  // Main페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  return (
    <>
      Main
      {modal_status && <Login />}
      {alert_status && <Alert />}
    </>
  );
};

export default Main;
