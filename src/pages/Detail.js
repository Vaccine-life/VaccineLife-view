import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";

const Detail = () => {
  // Detail페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);
  return (
    <>
      Detail
      {modal_status && <Login />}
    </>
  );
};

export default Detail;
