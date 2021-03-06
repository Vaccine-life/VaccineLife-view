import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { actionSignup } from "../redux/modules/user";
import { actionVisible } from "../redux/modules/modal";

import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";
import Survey from "../components/Survey";
import Alert from "../components/popup/Alert";

import styled from "styled-components";
import { isMobileOnly } from "react-device-detect";
import theme from "../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import logger from "../shared/logger";

// 어느 페이지에서나 뜨는 로그인모달창이 바로 이녀석입니다
// 반투명배경과 하얀모달로만 이루어져있고, components폴더의 LoginComponent.js, SignupComponent.js, Survey.js를 자식으로 갖습니다.
const Login = (props) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("login");

  // alert창
  const alert_status = useSelector((state) => state.popup.alert);

  // SignupComponent.js에서 입력된 값들
  const [signupInputs, setSignupInputs] = useState({
    username: "",
    password: "",
    passwordChecker: "",
    nickname: "",
  });

  // Survey.js에서 선택된 값들
  const [inputs, setInputs] = useState({
    isVaccine: 2,
    degree: undefined,
    type: undefined,
    gender: undefined,
    age: undefined,
    disease: undefined,
    afterEffect: [],
  });

  // 위의 두 state를 왜 부모인 Login.js에서 일괄 관리하느냐?
  // api명세서에 따르면, 회원가입 할 때 signupInputs와 inputs의 내용들을 한꺼번에 넘겨줘야 함

  // formik, Yup: input값의 validation check를 도와주는 library
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
        .matches(/^[0-9a-z]+$/, "영문 소문자와 숫자만 이용 가능합니다"),
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

    // 유저가 SignupComponent와 Survey에서 입력한 값들이 user라는 객체에 담겨 한번에 dispatch된다
    onSubmit: () => {
      if (inputs.afterEffect.indexOf("없음") !== -1) {
        setInputs({
          ...inputs,
          afterEffect: ["없음"],
        });
      }

      const user = { ...signupInputs, ...inputs };
      dispatch(actionSignup(user));
    },
  });

  // 모달 바깥 부분 클릭시 모달 꺼짐
  const handleModalOff = (e) => {
    const clicked = e.target.closest(".modal");
    if (clicked) {
      return;
    } else {
      dispatch(actionVisible());
    }
  };

  // status의 첫값은 "login"이기 때문에 '로그인'버튼을 누르면 LoginComponent.js가 뜬다
  // LoginComponent에서 '회원가입'버튼을 누르면 SignupComponent.js로 내용물이 바뀐다
  // SignupComponent에서 '다음단계'버튼을 누르면 Survey.js로 내용물이 바뀐다

  if (isMobileOnly) {
    return (
      <>
        <MobileLoginBg>
          <MobileXbutton
            onClick={() => {
              dispatch(actionVisible());
            }}
          >
            <FontAwesomeIcon icon={faTimes} color={theme.typoGrey2} size="lg" />
          </MobileXbutton>

          {status === "login" && (
            <LoginComponent status={status} setStatus={setStatus} />
          )}

          {status === "signup" && (
            <SignupComponent
              status={status}
              setStatus={setStatus}
              signupInputs={signupInputs}
              setSignupInputs={setSignupInputs}
              formik={formik}
            />
          )}

          {status === "survey" && (
            <Survey
              status={status}
              setStatus={setStatus}
              inputs={inputs}
              setInputs={setInputs}
              formik={formik}
            />
          )}
        </MobileLoginBg>
        {alert_status && <Alert />}
      </>
    );
  }

  return (
    <>
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
              signupInputs={signupInputs}
              setSignupInputs={setSignupInputs}
              formik={formik}
            />
          )}

          {status === "survey" && (
            <Survey
              status={status}
              setStatus={setStatus}
              inputs={inputs}
              setInputs={setInputs}
              formik={formik}
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
  z-index: 3;
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

// 얘는 (자식인)로그인, 설문조사, 회원가입에 다 들어가는 버튼이라서, 부모인 이곳에 넣어놨습니다!
const Xbutton = styled.div`
  margin: 0 0 0 auto;
  &:hover {
    cursor: pointer;
  }
`;

// <========= Mobile ==========>
const MobileLoginBg = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: white;
`;

const MobileXbutton = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default Login;
