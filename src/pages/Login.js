import React, { useState } from "react";
import styled from "styled-components";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";
import Survey from "../components/Survey";
import { useSelector } from "react-redux";
import Alert from "../components/popup/Alert";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { actionSignup } from "../redux/modules/user";

// 어느 페이지에서나 뜨는 로그인모달창이 바로 이녀석입니다
const Login = (props) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("login");

  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  const [inputs, setInputs] = useState({
    isVaccine: 2,
    degree: 0,
    type: "",
    gender: "",
    age: "",
    disease: "",
    afterEffect: "",
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordChecker: "",
      nickname: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("아이디를 입력해주세요."),
      password: Yup.string()
        .min(4, "비밀번호는 4자리 이상이여야 합니다.")
        .matches(/[a-zA-Z]/, "비밀번호는 반드시 영문을 포함해야합니다.")
        .required("비밀번호를 입력해주세요."),
      passwordChecker: Yup.string()
        .required("비밀번호를 재입력해주세요")
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
      nickname: Yup.string().required("닉네임을 입력해주세요."),
    }),

    onSubmit: (values) => {
      const user = { ...values, ...inputs };
      console.log("회원가입 버튼 누르면 얘가 넘어감", user);
      dispatch(actionSignup(user));
    },
  });

  return (
    <>
      Main
      <Wrapper>
        <Modal>
          {status === "login" && (
            <LoginComponent status={status} setStatus={setStatus} />
          )}

          {status === "survey" && (
            <Survey
              status={status}
              setStatus={setStatus}
              inputs={inputs}
              setInputs={setInputs}
            />
          )}

          {status === "signup" && (
            <SignupComponent
              status={status}
              setStatus={setStatus}
              formik={formik}
            />
          )}
        </Modal>
        {alert_status && <Alert />}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

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

export default Login;
