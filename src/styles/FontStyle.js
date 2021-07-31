import React from "react";
import styled from "styled-components";
import "@fontsource/noto-sans-kr";

const FontStyle = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  font-family: "Noto Sans KR";
`;

export default FontStyle;
