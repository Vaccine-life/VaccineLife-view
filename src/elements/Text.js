import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Text = (props) => {
  const {
    margin,
    color,
    size,
    children,
    bold,
    lineHeight,
    cursor,
    _onClick,
    hover,
    alignStart,
  } = props;

  const styles = {
    margin,
    color,
    size,
    children,
    bold,
    lineHeight,
    cursor,
    hover,
    alignStart,
  };

  return (
    <React.Fragment>
      <P {...styles} onClick={_onClick}>
        {children}
      </P>
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
  cursor: "",
  _onClick: () => {},
  hover: false,
  alignStart: false,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineHeight};
  cursor: ${(props) => props.cursor};

  ${(props) =>
    props.alignStart
      ? `
     text-align: start;
    `
      : ``}
  ${(props) =>
    props.hover &&
    `
    :hover {
    cursor: pointer;
    color: ${theme.btnColor};
    }
  `}
`;

export default Text;
