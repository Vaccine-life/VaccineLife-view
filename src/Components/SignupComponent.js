import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import theme from "../styles/theme";
import { Text } from "../elements/index";
import { userAxios } from "../shared/api";
import logger from "../shared/logger";

const SignupComponent = ({
  formik,
  setStatus,
  signupInputs,
  setSignupInputs,
}) => {
  const dispatch = useDispatch();

  // 아이디, 닉네임 중복 여부와 "중복된 Id입니다"같은 메세지를 state로 만든다
  const [idDupOk, setIdDupOk] = useState(false);
  const [idDupMsg, setIdDupMsg] = useState("");
  const [nicknameDupOk, setNicknameDupOk] = useState(false);
  const [nicknameDupMsg, setNicknameDupMsg] = useState("");

  // 아이디 중복여부를 확인하기 위해 서버에 request를 보낸다..
  // 서버에서 온 response를 idDupOk, idDupMsg에 담는다. 담기는 값은 api 명세서 참고
  const idDupCheck = (username) => async () => {
    try {
      const idDupRes = await userAxios.idDupCheck(username);
      setIdDupOk(idDupRes.data.ok);
      setIdDupMsg(idDupRes.data.msg);
    } catch (error) {
      logger(error);
    }
  };

  const nicknameDupCheck = (nickname) => async () => {
    try {
      const nicknameDupRes = await userAxios.nicknameDupCheck(nickname);
      setNicknameDupOk(nicknameDupRes.data.ok);
      setNicknameDupMsg(nicknameDupRes.data.msg);
    } catch (error) {
      logger(error);
    }
  };

  // 'formik.errors.어쩌구'는 Login.js에서 설정한 유효성 검사를 모두 통과하면 undefined가 뜬다.
  // idDupOk와 nicknameDupOk는 중복된 것 없이 사용 가능하면 true가 뜬다.
  // 즉 첫 조건문은 모든 input이 유효성 검사를 통과했을 때 버튼을 enabled시키는 녀석이다.

  // signupInputs는 아무 값도 input칸에 입력되지 않았을 때 모든 value가 ""로 설정된다.
  // 즉 두번째 조건문은 아무 값도 아직 입력되지 않았을 때 버튼을 disabled시키는 녀석이다.
  const disableNextButton = () => {
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
        passwordChecker: "",
        nickname: "",
      }
    ) {
      return true;
    } else {
      return true;
    }
  };

  // setSignupInputs를 value가 아닌 onChange에 걸어둔 이유: value에 걸어두면 input칸에 타이핑한 값이 보이지 않는다
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
          {formik.errors.username ? (
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
          {formik.errors.password ? (
            <SignupError>{formik.errors.password}</SignupError>
          ) : null}
        </InputBox>

        <InputBox>
          <SignupInput
            placeholder="비밀번호를 다시 입력해주세요"
            id="passwordChecker"
            name="passwordChecker"
            type="password"
            onChange={(e) => {
              formik.handleChange(e);
              setSignupInputs({
                ...signupInputs,
                passwordChecker: e.target.value,
              });
            }}
            value={formik.values.passwordChecker}
          />
          {formik.errors.passwordChecker ? (
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
          {formik.errors.nickname ? (
            <SignupError>{formik.errors.nickname}</SignupError>
          ) : null}
          {!nicknameDupOk ? <SignupError>{nicknameDupMsg}</SignupError> : null}
        </InputBox>

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
