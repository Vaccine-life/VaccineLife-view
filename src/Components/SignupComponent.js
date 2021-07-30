import React from "react";

import { withRouter } from "react-router-dom";

import styled from "styled-components";
import { Text, Input, Button } from "../elements/index";
import theme from "../styles/theme";

import * as Yup from "yup";
import { useFormik } from "formik";

const SignupComponent = (props) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordCheck: "",
      nickname: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("이름을 입력해주세요."),
      password: Yup.string()
        .min(4, "비밀번호는 4자리 이상이여야 합니다.")
        .matches(/[a-zA-Z]/, "패스워드에는 반드시 영문을 포함해야합니다.")
        .required("패스워드를 입력해주세요."),
      passwordCheck: Yup.string()
        .required("패스워드를 재입력해주세요")
        .oneOf([Yup.ref("pwd"), null], "비밀번호가 일치하지 않습니다."),
      nickname: Yup.string().required("닉네임을 입력해주세요."),
    }),

    onSubmit: (values) => {
      console.log("회원가입버튼 클릭시", values);
    },
  });
  return (
    <>
      <Wrapper onSubmit={formik.handleSubmit}>
        <Text margin="2vh auto" size="20px" bold>
          회원가입
        </Text>
        <InputBox>
          <Input
            margin="2vh auto"
            placeholder="아이디를 입력해 주세요"
            id="username"
            name="username"
            type="username"
            _onChange={formik.handleChange}
            value={formik.values.userName}
          />
          <Button margin="2vh auto" width="20%" height="60%" bg="#8192B1">
            중복확인
          </Button>
        </InputBox>

        <Input
          margin="2vh auto"
          placeholder="비밀번호를 입력해 주세요"
          id="password"
          name="password"
          type="password"
          _onChange={formik.handleChange}
          value={formik.values.pwd}
        />

        <Input
          margin="2vh auto"
          placeholder="비밀번호를 다시 입력해주세요"
          id="password"
          name="password"
          type="password"
          _onChange={formik.handleChange}
          value={formik.values.pwd}
        />

        <InputBox>
          <Input
            margin="2vh auto"
            placeholder="닉네임을 입력해 주세요"
            id="password"
            name="password"
            type="password"
            _onChange={formik.handleChange}
            value={formik.values.pwd}
          />
          <Button margin="2vh auto" width="20%" height="60%" bg="#8192B1">
            중복확인
          </Button>
        </InputBox>

        <Button
          margin="2vh auto"
          width="20%"
          type="submit"
          bg={theme.btnColor}
          _onClick={() => {
            props.history.push("/survey");
          }}
          // disableElevation
        >
          다음단계
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.form`
  width: 100%;
  height: auto;
  padding: 5vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
`;

export default withRouter(SignupComponent);
