import React, { useState } from "react";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";
import { useSelector } from "react-redux";
import Alert from "../components/popup/Alert";
import theme from "../styles/theme";

// 어느 페이지에서나 뜨는 로그인모달창이 바로 이녀석입니다
const Login = (props) => {
  const [status, setStatus] = useState(false);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  return (
    <>
      Main
      <Wrapper>
        <Modal>
          {!status && <LoginComponent />}
          {status && <SignupComponent />}
          {!status && (
            <Signup>
              <Text color={theme.typoGrey2}>아직 회원이 아니신가요?</Text>
              <Button
                type="submit"
                _onClick={() => {
                  setStatus(true);
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
          )}
        </Modal>
        {alert_status && <Alert />}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  width: max-content;
  height: max-content;
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
  padding: 40px;
`;

const Signup = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
