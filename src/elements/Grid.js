import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Grid = (props) => {
  const {
    children,
    align,
    width,
    is_flex,
    bg,
    padding,
    margin,
    height,
    border_radius,
    _onClick,
    cursor,
    border,
    hover,
    color,
    borderline,
  } = props;

  const styles = {
    width,
    is_flex,
    padding,
    margin,
    height,
    bg,
    border_radius,
    align,
    cursor,
    border,
    hover,
    color,
    borderline,
  };
  return (
    <Wrapper onClick={_onClick} {...styles}>
      {children}
    </Wrapper>
  );
};

Grid.defaultProps = {
  children: null,
  width: "100%",
  // width: false,
  height: "100%",
  is_flex: false,
  padding: "auto",
  margin: "auto",
  bg: null,
  border_radius: "",
  align: false,
  _onClick: () => {},
  cursor: "",
  border: false,
  hover: false,
  color: theme.typoBlack,
  borderline: false,
};

const Wrapper = styled.div`
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text-align: start;
  ${(props) => props.borderline && ` border : ${props.borderline};`}
  ${(props) => {
    if (props.is_flex === "center") {
      return `
   display: flex;
   justify-content : center;
   align-items: center;
     `;
    } else if (props.is_flex === "space_row") {
      return `
   display: flex;
   justify-content : space-between;
   align-items: center;
     `;
    } else if (props.is_flex === "space_column") {
      return `
   display: flex;
   flex-direction : column;
   justify-content : space-between;
   align-items: center;
     `;
    } else if (props.is_flex === "column_left_start") {
      return `
   display: flex;
   flex-direction : column;
   justify-content : center;
   align-items: flex-start;
     `;
    } else {
      return ``;
    }
  }}
  padding : ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.border_radius};
  border: ${(props) => props.border};
  ${(props) => (props.align ? `text-align: ${props.align}` : "")};
  cursor: ${(props) => props.cursor};
  box-sizing: border-box;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;

  ${(props) =>
    props.hover &&
    `
  :hover {
    cursor: pointer;
   box-shadow: 5px 5px 5px 5px ${theme.typoLightGrey2};
    transform: translateY(-12px);
  }
  
  `}
`;

export default Grid;
