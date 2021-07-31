import React, { useState } from "react";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";

// 어느 페이지에서나 뜨는 로그인모달창이 바로 이녀석입니다
const Login = (props) => {
  const [status, setStatus] = useState(false);

  return (
    <>
      Main
      <Wrapper>
        <Modal>
          {!status && <LoginComponent />}
          {status && <SignupComponent />}
          {!status && (
            <Signup>
              <Text>아직 회원이 아니신가요?</Text>
              <Button
                width="6em"
                type="submit"
                style={{
                  margin: "0 2vw",
                  backgroundColor: "white",
                  color: "gray",
                  textDecoration: "underline",
                }}
                _onClick={() => {
                  setStatus(true);
                }}
                bg="white"
              >
                회원가입
              </Button>
            </Signup>
          )}
        </Modal>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  width: 400px;
  height: auto;
  min-height: 470px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 0 5vw;
`;

const Signup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
