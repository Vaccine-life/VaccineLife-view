import React from "react";
import styled from "styled-components";

const ResponsiveStyles = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  .swiper-container {
    width: 100%;
  }

  @media (min-width: 100px) {
  }
  @media (min-width: 640px) {
  }
  @media (min-width: 1000px) {
  }

  /* Landscape 모드일 때 적용할 CSS */
  @media (min-height: 0px) {
  }
  /* Portrait 모드일 때 적용할 CSS */
  @media (min-height: 400px) {
  }
`;

export default ResponsiveStyles;
