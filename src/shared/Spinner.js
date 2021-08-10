import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import theme from "../styles/theme";

const Spinner = () => {
  return (
    <Wrapper>
      <Loader type="Oval" color="white" height={80} width={80} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: ${theme.shadow};
  padding: 300px auto 0 auto;
`;
export default Spinner;
