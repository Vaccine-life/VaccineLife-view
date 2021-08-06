import React, { Dispatch, useRef, useState } from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";
import theme from "../styles/theme";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    onSubmit,
    margin,
    is_comment,
    border,
    color,
    radius,
    height,
    bg,
    maxLength,
    fontSize,
    rows,
  } = props;

  if (is_comment) {
    return (
      <CommentInput
        backgroundColor={bg}
        borderRadius={radius}
        margin={margin}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        fontSize={fontSize}
      />
    );
  }

  if (multiLine) {
    return (
      <Grid>
        <Text margin="0px">{label ? label : ""}</Text>
        <ElTextArea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          type={type}
          border={border}
          maxLength={maxLength}
          fontSize={fontSize}
          // onKeyPress={(e) => {
          //   if (e.key === "Enter") {
          //     onSubmit(e);
          //   }
          // }}
        ></ElTextArea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <ElInput
          bg={bg}
          fontSize={fontSize}
          height={height}
          color={color}
          margin={margin}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          border={border}
          borderRadius={radius}
          maxLength={maxLength}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "후기 정보를 나눠보세요! :)",
  is_Submit: false,
  _onChange: () => {},
  type: "text",
  value: "",
  onSubmit: () => {},
  margin: false,
  is_comment: false,
  width: false,
  border: false,
  color: theme.fontColor,
  borderRadius: false,
  height: false,
  bg: false,
  maxLength: false,
  fontSize: theme.bodyTwoSize,
  rows: 8,
};

//의료진페이지 멀티라인 수정
const ElTextArea = styled.textarea`
  font-size: ${(props) => props.fontSize};
  ${(props) => (props.border ? `border:${props.border}` : "")};
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: ${(props) => props.fontSize};
    color: ${theme.typoGrey3};
  }
  font-family: "Noto Sans KR";
`;

const ElInput = styled.input`
  font-size: ${(props) => props.fontSize};
  :focus {
    outline: none;
  }
  ${(props) => props.bg && `background-color: ${props.bg};`}
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  width: 100%;
  ${(props) => (props.border ? `border:${props.border}` : "")};
  padding: 12px 4px;
  box-sizing: border-box;
  ${(props) => (props.height ? `height:${props.height}` : "")};
  ${(props) => (props.maxLength ? `maxLength:${props.maxLength}` : "")};
`;

const CommentInput = styled.input`
  font-size: ${(props) => props.fontSize};
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  border-style: none;
  ${(props) => (props.width ? `width:${props.width}` : "")};
  ${(props) =>
    props.borderRadius ? `border-radius:${props.borderRadius}` : ""};
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
