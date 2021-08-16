import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";
import { userAxios } from "../shared/api";
import logger from "../shared/logger";
import { useDispatch } from "react-redux";

const SignupComponent = ({ formik }) => {
  const dispatch = useDispatch();

  const [idDupOk, setIdDupOk] = useState(false);
  const [idDupMsg, setIdDupMsg] = useState("");

  const idDupCheck = (username) => async () => {
    try {
      const idDupRes = await userAxios.idDupCheck(username);
      setIdDupOk(idDupRes.data.ok);
      setIdDupMsg(idDupRes.data.msg);
    } catch (error) {
      logger(error);
      // dispatch(actionSetMessage(error.response.data.message));
      // dispatch(actionAlert());
    }
  };

  return (
    <>
      <Wrapper onSubmit={formik.handleSubmit}>
        <Text margin="15px auto 40px auto" size={theme.headOneSize} bold>
          회원가입
        </Text>

        {/* <InputBox>
          <Text margin="0 auto 0 0" size={theme.bodyThreeSize}>
            아이디
          </Text>
        </InputBox> */}
        <InputBox>
          <SignupInput
            placeholder="아이디를 입력해주세요"
            id="username"
            name="username"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
              dispatch(idDupCheck(e.target.value));
            }}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <SignupError>{formik.errors.username}</SignupError>
          ) : null}
          {idDupOk ? (
            <SignupError style={{ color: `${theme.successColor}` }}>
              {idDupMsg}
            </SignupError>
          ) : (
            <SignupError style={{ color: `${theme.errorColor}` }}>
              {idDupMsg}
            </SignupError>
          )}
        </InputBox>

        {/* <InputBox>
          <Text margin="40px auto 0 0" size={theme.bodyThreeSize}>
            비밀번호
          </Text>
        </InputBox> */}
        <InputBox>
          <SignupInput
            placeholder="비밀번호를 입력해주세요"
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

        {/* <InputBox>
          <Text margin="40px auto 0 0" size={theme.bodyThreeSize}>
            비밀번호 확인
          </Text>
        </InputBox> */}
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

        {/* <InputBox>
          <Text margin="40px auto 0 0" size={theme.bodyThreeSize}>
            닉네임
          </Text>
        </InputBox> */}
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
        </InputBox>

        <Button
          margin="50px 0 20px 0"
          width={theme.mediumButtonWidth}
          height={theme.mediumButtonHeight}
          type="submit"
          bg={theme.btnColor}
          fontSize={theme.bodyTwoSize}
        >
          회원가입
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.form`
  width: 350px;
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
  margin: 25px auto 5px auto;
  border: none;
  border-bottom: 1px solid ${theme.typoGrey1};
  padding: 6px 0px;
  color: ${theme.typoBlack};
  font-size: ${theme.bodyTwoSize};
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
`;

export default withRouter(SignupComponent);
