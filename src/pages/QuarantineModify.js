import React from "react";
import { useSelector } from "react-redux";
import Alert from "../components/popup/Alert";

const QuarantineModify = () => {
  const alert_status = useSelector((state) => state.popup.alert);
  return <div>{alert_status && <Alert />}</div>;
};

export default QuarantineModify;
