import React from "react";
import styled from "styled-components";

import { Text, Input, Button } from "../elements/index";
import theme from "../styles/theme";

import * as Yup from "yup";
import { useFormik } from "formik";

const LoginComponent = (props) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("아이디를 입력해주세요."),
      password: Yup.string()
        .min(4, "비밀번호는 4자리 이상이여야 합니다.")
        .matches(/[a-zA-Z]/, "패스워드에는 반드시 영문을 포함해야합니다.")
        .required("패스워드를 입력해주세요."),
    }),

    onSubmit: (values) => {
      console.log("로그인버튼 클릭시", values);
    },
  });
  return (
    <>
      <Wrapper onSubmit={formik.handleSubmit}>
        <Text margin="2vh auto" size="20px" bold>
          로그인
        </Text>

        <Input
          margin="2vh auto"
          label="Standard"
          placeholder="아이디를 입력해 주세요"
          id="username"
          name="username"
          type="username"
          _onChange={formik.handleChange}
          value={formik.values.username}
        />

        <Input
          margin="2vh auto"
          label="Standard"
          placeholder="비밀번호를 입력해 주세요"
          id="password"
          name="password"
          type="password"
          _onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button margin="2vh auto" width="20%" type="submit" bg={theme.btnColor}>
          로그인
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.form`
  width: 100%;
  padding: 0 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default LoginComponent;
