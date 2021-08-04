import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { margin, color, size, children, bold, lineHeight, cursor, _onClick } = props;

  const styles = {
    margin,
    color,
    size,
    children,
    bold,
    lineHeight,
    cursor,
  };

  return (
    <React.Fragment>
      <P {...styles} onClick={_onClick}>{children}</P>
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
  cursor:'',
  _onClick: () => {},
};

const P = styled.p`
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineHeight};
  cursor: ${(props) => props.cursor};
  /* ${(props) => (props.is_active ? `:active: border-bottom: 1px solid` : "")}; */
  /* :visited {
    border-bottom: 1px solid;
  } */
  /* :hover {
    cursor: pointer;
    font-weight: ${(props) => (props.bold ? "700" : "400")};
  } */
`;

export default Text;
