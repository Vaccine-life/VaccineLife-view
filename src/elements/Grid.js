import React from "react";
import styled from "styled-components";

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
};

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => {
    if (props.is_flex === "center") {
      return `
   display: flex;
   justify-content : center;
   align-items: center;
     `;
    }
    if (props.is_flex === "space_row") {
      return `
   display: flex;
   justify-content : space-between;
   align-items: center;
     `;
    }
    if (props.is_flex === "space_column") {
      return `
   display: flex;
   flex-direction : column;
   justify-content : space-between;
   align-items: center;
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
`;

export default Grid;
