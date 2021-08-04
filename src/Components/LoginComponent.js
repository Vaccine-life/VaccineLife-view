import React, { useState } from "react";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";

const LoginComponent = (props) => {
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

  return (
    <>
      <Wrapper>
        <Text margin="15px auto 40px auto" size={theme.headOneSize} bold>
          로그인
        </Text>

        <LoginInput
          placeholder="아이디"
          id="username"
          name="username"
          type="text"
          onChange={handleUsernameChange}
          value={username}
        />

        <LoginInput
          placeholder="비밀번호"
          id="password"
          name="password"
          type="password"
          onChange={handlePasswordChange}
          value={password}
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
