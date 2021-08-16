import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";
import { userAxios } from "../shared/api";
import logger from "../shared/logger";
import { useDispatch } from "react-redux";

const SignupComponent = ({
  formik,
  setStatus,
  signupInputs,
  setSignupInputs,
}) => {
  const dispatch = useDispatch();

  const [idDupOk, setIdDupOk] = useState(false);
  const [idDupMsg, setIdDupMsg] = useState("");
  const [nicknameDupOk, setNicknameDupOk] = useState(false);
  const [nicknameDupMsg, setNicknameDupMsg] = useState("");

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

  const nicknameDupCheck = (nickname) => async () => {
    try {
      const nicknameDupRes = await userAxios.nicknameDupCheck(nickname);
      setNicknameDupOk(nicknameDupRes.data.ok);
      setNicknameDupMsg(nicknameDupRes.data.msg);
    } catch (error) {
      logger(error);
      // dispatch(actionSetMessage(error.response.data.message));
      // dispatch(actionAlert());
    }
  };

  const disableNextButton = () => {
    console.log(
      formik.errors.username,
      formik.errors.password,
      formik.errors.passwordChecker,
      formik.errors.nickname,
      idDupOk,
      nicknameDupOk
    );

    if (
      formik.errors.username === undefined &&
      formik.errors.password === undefined &&
      formik.errors.passwordChecker === undefined &&
      formik.errors.nickname === undefined &&
      idDupOk === true &&
      nicknameDupOk === true
    ) {
      return false;
    }
    if (
      signupInputs ===
      {
        username: "",
        password: "",
        nickname: "",
      }
    ) {
      return true;
    } else {
      return true;
    }
  };

  return (
    <>
      <Wrapper onSubmit={formik.handleSubmit}>
        <Text margin="15px auto 40px auto" size={theme.headOneSize} bold>
          회원가입
        </Text>

        <InputBox>
          <SignupInput
            placeholder="아이디를 입력해주세요"
            id="username"
            name="username"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
              setSignupInputs({
                ...signupInputs,
                username: e.target.value,
              });
              dispatch(idDupCheck(e.target.value));
            }}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <SignupError>{formik.errors.username}</SignupError>
          ) : null}
          {!idDupOk ? <SignupError>{idDupMsg}</SignupError> : null}
        </InputBox>

        <InputBox>
          <SignupInput
            placeholder="비밀번호를 입력해주세요"
            id="password"
            name="password"
            type="password"
            onChange={(e) => {
              formik.handleChange(e);
              setSignupInputs({
                ...signupInputs,
                password: e.target.value,
              });
            }}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <SignupError>{formik.errors.password}</SignupError>
          ) : null}
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
          <SignupInput
            placeholder="닉네임을 신중히 입력해주세요(수정불가)"
            id="nickname"
            name="nickname"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
              setSignupInputs({
                ...signupInputs,
                nickname: e.target.value,
              });
              dispatch(nicknameDupCheck(e.target.value));
            }}
            value={formik.values.nickname}
          />
          {formik.touched.nickname && formik.errors.nickname ? (
            <SignupError>{formik.errors.nickname}</SignupError>
          ) : null}
          {!nicknameDupOk ? <SignupError>{nicknameDupMsg}</SignupError> : null}
        </InputBox>

        {/* <Button
          margin="50px 0 20px 0"
          width={theme.mediumButtonWidth}
          height={theme.mediumButtonHeight}
          type="submit"
          bg={theme.btnColor}
          fontSize={theme.bodyTwoSize}
          _onClick={() => {
            setStatus("survey");
          }}
          disabled={true}
        >
          다음단계
        </Button> */}
        <NextButton
          type="submit"
          disabled={disableNextButton()}
          onClick={() => {
            setStatus("survey");
          }}
        >
          다음단계
        </NextButton>
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
  color: ${theme.errorColor};
`;

const NextButton = styled.button`
  margin: 35px 0 0 0;
  width: ${theme.mediumButtonWidth};
  height: ${theme.mediumButtonHeight};
  background-color: ${theme.btnColor};
  border: none;
  color: white;
  transition: background-color 0.3s;
  font-size: ${theme.bodyTwoSize};
  :hover {
    cursor: pointer;
    background-color: white;
    color: ${theme.btnColor};
    border: 1px solid ${theme.btnColor};
  }
  :disabled {
    background-color: ${theme.typoLightGrey2};
    cursor: default;
    color: white;
    border: none;
  }
`;

export default withRouter(SignupComponent);
