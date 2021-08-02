import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import Input from "../elements/Input";

const Main = () => {
  // Main페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);

  return (
    <>
      Main
      {modal_status && <Login />}
    </>
  );
};

export default Main;
