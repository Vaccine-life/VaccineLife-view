import React from "react";
import styled from "styled-components";
import Input from "../elements/Input";

const Login = (props) => {
  return (
    <>
      모달창을 켜면 배경에 있던 요소들은 Wrapper에 가려져 반투명하게 보입니다.
      이것은 z-index라는 엄청난 css 속성 덕분에 가능한 일이죠.
      <Wrapper>
        <Modal>
          <ModalContents>
            <Input width="20vw" placeholder="아이디" bg="#c4c4c4" />
          </ModalContents>
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
  background-color: rgba(196, 196, 196, 0.7);
`;

const Modal = styled.div`
  width: 40vw;
  height: 70vh;
  display: flex;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 8px;
`;

const ModalContents = styled.div`
  width: 35vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
