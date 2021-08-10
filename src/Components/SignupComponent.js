import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";

const SignupComponent = ({ formik }) => {
  const errorMsg = useSelector((state) => state.popup.alertMessage);

  return (
    <>
      <Wrapper onSubmit={formik.handleSubmit}>
        <Text margin="15px auto 40px auto" size={theme.headOneSize} bold>
          회원가입
        </Text>

        <InputBox>
          <Text margin="0 auto 0 0">아이디</Text>
        </InputBox>
        <InputBox>
          <SignupInput
            placeholder="아이디를 입력해주세요"
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <SignupError>{formik.errors.username}</SignupError>
          ) : null}
          {errorMsg === "중복된 사용자 ID가 존재합니다." && (
            <SignupError>{errorMsg}</SignupError>
          )}
        </InputBox>

        <InputBox>
          <Text margin="40px auto 0 0">비밀번호</Text>
        </InputBox>
        <InputBox>
          <SignupInput
            placeholder="비밀번호를 입력하세요"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <SignupError>{formik.errors.password}</SignupError>
          ) : null}
        </InputBox>

        <InputBox>
          <Text margin="40px auto 0 0">비밀번호 확인</Text>
        </InputBox>
        <InputBox>
          <SignupInput
            placeholder="비밀번호를 다시 입력해주세요"
            id="passwordChecker"
            name="passwordChecker"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.passwordChecker}
          />
          {formik.touched.passwordChecker && formik.errors.passwordChecker ? (
            <SignupError>{formik.errors.passwordChecker}</SignupError>
          ) : null}
        </InputBox>

        <InputBox>
          <Text margin="40px auto 0 0">닉네임</Text>
        </InputBox>
        <InputBox>
          <SignupInput
            placeholder="닉네임을 신중히 입력해주세요(수정불가)"
            id="nickname"
            name="nickname"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nickname}
          />
          {formik.touched.nickname && formik.errors.nickname ? (
            <SignupError>{formik.errors.nickname}</SignupError>
          ) : null}
          {errorMsg === "중복된 닉네임이 존재합니다." && (
            <SignupError>{errorMsg}</SignupError>
          )}
        </InputBox>

        <Button
          margin="30px 0 10px 0"
          width={theme.mediumButtonWidth}
          height={theme.mediumButtonHeight}
          type="submit"
          bg={theme.btnColor}
        >
          회원가입
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

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SignupInput = styled.input`
  width: 100%;
  margin: 5px auto 5px auto;
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

const SignupError = styled.div`
  width: 100%;
  text-align: right;
  font-size: ${theme.bodyfourSize};
  color: ${theme.errorColor};
`;

export default withRouter(SignupComponent);
