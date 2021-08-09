import React, { useState } from "react";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { actionLogin } from "../redux/modules/user";

const LoginComponent = (props) => {
  const dispatch = useDispatch();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value);
  //   console.log("handleUsernameChange", e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  //   console.log("handlePasswordChange", e.target.value);
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     password: "",
  //   },

  //   validationSchema: Yup.object({
  //     username: Yup.string().required("아이디를 입력해주세요."),
  //     password: Yup.string()
  //       .min(8, "비밀번호는 8자리 이상이여야 합니다.")
  //       .matches(/[a-zA-Z]/, "패스워드에는 반드시 영문을 포함해야합니다.")
  //       .required("패스워드를 입력해주세요."),
  //   }),

  //   onSubmit: (values) => {},
  // });

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   dispatch(actionLogin(username, password));
  // };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("아이디를 입력해주세요."),
      password: Yup.string().required("비밀번호를 입력해주세요."),
    }),

    onSubmit: (values) => {
      dispatch(actionLogin(values.username, values.password));
      console.log(values.username, values.password);
    },
  });

  return (
    <>
      <Wrapper onSubmit={formik.handleSubmit}>
        <Text margin="2vh auto" size="20px" bold>
          로그인
        </Text>

        <LoginInput
          placeholder="아이디"
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        <LoginInput
          placeholder="비밀번호"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <Button
          margin="50px 0 20px 0"
          width={theme.mediumButtonWidth}
          height={theme.mediumButtonHeight}
          type="submit"
          bg={theme.btnColor}
        >
          로그인
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.form`
  width: 300px;
  height: auto;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

const LoginInput = styled.input`
  width: 100%;
  margin: 10px auto;
  border: none;
  border-bottom: 1px solid ${theme.typoGrey1};
  padding: 6px 0px;
  color: #242424;
  &:focus {
    outline: none;
    border-bottom: 1px solid #242424;
    color: #242424;
  }
`;

export default LoginComponent;
