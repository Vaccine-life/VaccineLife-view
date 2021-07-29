import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { margin, color, size, children, bold, lineHeight } = props;

  const styles = {
    margin: margin,
    color: color,
    size: size,
    children: children,
    bold: bold,
    lineHeight: lineHeight,
  };

  return (
    <React.Fragment>
      <P {...styles}>{children}</P>
    </React.Fragment>
  );
};

Text.defaultProps = {
  margin: false,
  color: "black",
  size: "14px",
  children: false,
  bold: false,
  lineHeight: "",
};

const P = styled.p`
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineHeight};
`;

export default Text;
