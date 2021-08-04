import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";
import Survey from "./Survey";

const SignupComponent = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [next, setNext] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log("handleUsernameChange", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("handlePasswordChange", e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
    console.log("handlePasswordCheckChange", e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    console.log("handleNicknameChange", e.target.value);
  };

  return (
    <>
      {!next && (
        <Wrapper>
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
              onChange={handleUsernameChange}
              value={username}
            />
            <Text margin="0 0 0 auto">이미 이용중인 아이디입니다</Text>
          </InputBox>

          <InputBox>
            <Text margin="40px auto 0 0">비밀번호</Text>
          </InputBox>
          <InputBox>
            <SignupInput
              placeholder="8자 이상의 비밀번호를 입력하세요"
              id="password"
              name="password"
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />
            <Text margin="0 0 0 auto">이미 이용중인 아이디입니다</Text>
          </InputBox>

          <InputBox>
            <Text margin="40px auto 0 0">비밀번호 확인</Text>
          </InputBox>
          <InputBox>
            <SignupInput
              placeholder="비밀번호를 다시 입력해주세요"
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              onChange={handlePasswordCheckChange}
              value={passwordCheck}
            />
            <Text margin="0 0 0 auto">이미 이용중인 아이디입니다</Text>
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
              onChange={handleNicknameChange}
              value={nickname}
            />
            <Text margin="0 0 0 auto">이미 이용중인 아이디입니다</Text>
          </InputBox>

          <Button
            margin="30px 0 10px 0"
            width={theme.mediumButtonWidth}
            height={theme.mediumButtonHeight}
            type="submit"
            bg={theme.btnColor}
            _onClick={() => {
              setNext(true);
            }}
          >
            다음단계
          </Button>
        </Wrapper>
      )}
      {next && <Survey />}
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
  color: #242424;
  &:focus {
    outline: none;
    border-bottom: 1px solid #242424;
    color: #242424;
  }
`;

export default withRouter(SignupComponent);
