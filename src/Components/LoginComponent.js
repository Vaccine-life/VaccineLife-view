import React from "react";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { actionLogin } from "../redux/modules/user";

const LoginComponent = ({ status, setStatus }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("아이디를 입력해주세요"),
      password: Yup.string().required("비밀번호를 입력해주세요"),
    }),

    onSubmit: (values) => {
      dispatch(actionLogin(values.username, values.password));
    },
  });

  return (
    <>
      <Wrapper onSubmit={formik.handleSubmit}>
        <Text margin={theme.headOneHeight} auto size={theme.headOneSize} bold>
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
        {formik.touched.username && formik.errors.username ? (
          <LoginError>{formik.errors.username}</LoginError>
        ) : null}

        <LoginInput
          placeholder="비밀번호"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <LoginError>{formik.errors.password}</LoginError>
        ) : null}

        <Button
          margin="50px 0 20px 0"
          width={theme.mediumButtonWidth}
          height={theme.mediumButtonHeight}
          type="submit"
          bg={theme.btnColor}
        >
          로그인
        </Button>

        <Signup>
          <Text color={theme.typoGrey2}>아직 회원이 아니신가요?</Text>
          <Button
            type="submit"
            _onClick={() => {
              setStatus("survey");
            }}
            margin="0"
            width="6em"
            bg="transparent"
            color={theme.typoGrey2}
            style={{
              textDecoration: "underline",
              color: "#A5A5A5",
            }}
          >
            회원가입
          </Button>
        </Signup>
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
  margin: 15px auto 5px auto;
  border: none;
  border-bottom: 1px solid ${theme.typoGrey1};
  padding: 6px 0px;
  color: ${theme.typoBlack};
  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.typoBlack};
    color: ${theme.typoBlack};
  }
`;

const LoginError = styled.div`
  width: 100%;
  text-align: right;
  font-size: ${theme.bodyfourSize};
  color: ${theme.errorColor};
`;

const Signup = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoginComponent;
