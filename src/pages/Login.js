import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { actionSignup } from "../redux/modules/user";
import { actionVisible } from "../redux/modules/modal";

import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";
import Survey from "../components/Survey";
import Alert from "../components/popup/Alert";

import styled from "styled-components";
import { isMobile } from "react-device-detect";
import theme from "../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// 어느 페이지에서나 뜨는 로그인모달창이 바로 이녀석입니다
const Login = (props) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("login");

  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  const [inputs, setInputs] = useState({
    isVaccine: 2,
    degree: undefined,
    type: undefined,
    gender: undefined,
    age: undefined,
    disease: undefined,
    afterEffect: [],
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordChecker: "",
      nickname: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .required("아이디를 입력해주세요")
        .min(6, "아이디는 6자리 이상이어야 합니다")
        .max(12, "아이디는 12자리 이하여야 합니다")
        .matches(/^[0-9a-zA-Z]+$/, "영문과 숫자만 이용 가능합니다"),
      password: Yup.string()
        .required("비밀번호를 입력해주세요")
        .min(8, "비밀번호는 8자리 이상이어야 합니다.")
        .max(20, "비밀번호는 20자리 이하여야 합니다")
        .matches(/[a-zA-Z]/, "비밀번호는 영문을 포함해야합니다"),
      passwordChecker: Yup.string()
        .required("비밀번호를 재입력해주세요")
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다"),
      nickname: Yup.string()
        .required("닉네임을 입력해주세요")
        .max(6, "닉네임은 6자리 이하여야 합니다"),
    }),

    onSubmit: (values) => {
      const user = { ...values, ...inputs };
      dispatch(actionSignup(user));
    },
  });

  // 모달 바깥 부분 클릭시 모달 off
  const handleModalOff = (e) => {
    const clicked = e.target.closest(".modal");
    if (clicked) {
      return;
    } else {
      dispatch(actionVisible());
    }
  };

  if (isMobile) {
    return (
      <React.Fragment
        onClick={(e) => {
          handleModalOff(e);
        }}
      >
        <MobileLogin className="modal">
          <Xbutton
            onClick={() => {
              dispatch(actionVisible());
            }}
          >
            <FontAwesomeIcon icon={faTimes} color={theme.typoGrey2} size="lg" />
          </Xbutton>

          {status === "login" && (
            <LoginComponent status={status} setStatus={setStatus} />
          )}

          {status === "signup" && (
            <SignupComponent
              status={status}
              setStatus={setStatus}
              formik={formik}
            />
          )}

          {status === "survey" && (
            <Survey
              status={status}
              setStatus={setStatus}
              inputs={inputs}
              setInputs={setInputs}
            />
          )}
        </MobileLogin>
        {alert_status && <Alert />}
      </React.Fragment>
    );
  }

  return (
    <>
      Main
      <Wrapper
        onClick={(e) => {
          handleModalOff(e);
        }}
      >
        <Modal className="modal">
          <Xbutton
            onClick={() => {
              dispatch(actionVisible());
            }}
          >
            <FontAwesomeIcon icon={faTimes} color={theme.typoGrey2} size="lg" />
          </Xbutton>

          {status === "login" && (
            <LoginComponent status={status} setStatus={setStatus} />
          )}

          {status === "signup" && (
            <SignupComponent
              status={status}
              setStatus={setStatus}
              formik={formik}
            />
          )}

          {status === "survey" && (
            <Survey
              status={status}
              setStatus={setStatus}
              inputs={inputs}
              setInputs={setInputs}
            />
          )}
        </Modal>
        {alert_status && <Alert />}
      </Wrapper>
    </>
  );
};

// 모달 떴을 때 배경에 깔리는 반투명한 까망이
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

// (하얀 배경의) 모달
const Modal = styled.div`
  width: max-content;
  height: max-content;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 40px;
`;

// 얘는 로그인, 설문조사, 회원가입에 다 들어가는 버튼이라서, 부모 파일인 Login.js에 넣어논거임!
const Xbutton = styled.div`
  margin: 0 0 0 auto;
  &:hover {
    cursor: pointer;
  }
`;

const MobileLogin = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 40px;
`;

export default Login;
