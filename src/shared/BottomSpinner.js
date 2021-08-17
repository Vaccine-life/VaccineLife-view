import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import theme from "../styles/theme";

const BottomSpinner = () => {
  return (
    <Wrapper>
      <Loader type="Oval" color={theme.typoLightGrey2} height={50} width={50} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default BottomSpinner;
