import React from "react";
import { useSelector } from "react-redux";
import Alert from "../components/popup/Alert";
import Login from "./Login";

const Vaccine = () => {
  // vBoard페이지에서도 모달 로그인창이 뜰수 있게 함
  const modal_status = useSelector((state) => state.modal.visible);
  //alert
  const alert_status = useSelector((state) => state.popup.alert);

  return (
    <>
      Vaccine페이지{modal_status && <Login />}
      {alert_status && <Alert />}
    </>
  );
};

export default Vaccine;
