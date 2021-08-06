import React, { useState } from "react";
import styled from "styled-components";

import { Text, Input, Button } from "../elements/index";
import theme from "../styles/theme";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { actionLogin } from "../redux/modules/user";

const LoginComponent = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log("handleUsernameChange", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("handlePasswordChange", e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("아이디를 입력해주세요."),
      password: Yup.string()
        .min(8, "비밀번호는 8자리 이상이여야 합니다.")
        .matches(/[a-zA-Z]/, "패스워드에는 반드시 영문을 포함해야합니다.")
        .required("패스워드를 입력해주세요."),
    }),

    onSubmit: (values) => {},
  });

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(actionLogin(username, password));
  };

  return (
    <>
      <Wrapper onSubmit={handleLogin}>
        <Text margin="2vh auto" size="20px" bold>
          로그인
        </Text>

        <Input
          margin="2vh auto"
          label="Standard"
          placeholder="아이디"
          id="username"
          name="username"
          type="username"
          _onChange={handleUsernameChange}
          value={username}
        />

        <Input
          margin="2vh auto"
          label="Standard"
          placeholder="비밀번호"
          id="password"
          name="password"
          type="password"
          _onChange={handlePasswordChange}
          value={password}
        />
        <Button
          margin="70px 0 20px 0"
          width="20%"
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
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default LoginComponent;
