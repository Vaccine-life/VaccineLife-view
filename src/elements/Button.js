import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Button = (props) => {
  const { _onClick, children, ...rest } = props;

  return (
    <ButtonEle {...rest} onClick={_onClick}>
      {children}
    </ButtonEle>
  );
};

Button.defaultProps = {
  children: null,
  bg: theme.btnColor,
  width: "100%",
  margin: "auto",
  height: "100%",
  _onClick: () => {},
  type: "button",
  hover_color: "white",
  border_radius: "0px",
  fontSize: "14px",
  bold: false,
};

const ButtonEle = styled.button`
  border: none;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.bold && 700};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.hover_color};
  border-radius: ${(props) => props.border_radius};
  transition: background-color 0.3s;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.hover_color};
    color: ${(props) => props.bg};
    border: 1px solid ${(props) => props.bg};
  }
  color: ${(props) => props.color};
`;

export default Button;
