import React, { useState } from "react";
import { RichUtils } from "draft-js";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { faStrikethrough } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import theme from "../../styles/theme";

const Toolbar = (props) => {
  const { setEditorState, editorState } = props;
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);

  const handleTogggleClick = (e, inlineStyle) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const handleBlockClick = (e, blockType) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  return (
    <Wrapper>
      <Btn
        toggle={toggle1}
        onMouseDown={(e) => {
          handleTogggleClick(e, "BOLD");
          setToggle1((prev) => !prev);
        }}
      >
        <FontAwesomeIcon icon={faBold} size="lg" />
      </Btn>
      <Btn
        toggle={toggle2}
        onMouseDown={(e) => {
          handleTogggleClick(e, "STRIKETHROUGH");
          setToggle2((prev) => !prev);
        }}
      >
        <FontAwesomeIcon icon={faStrikethrough} size="lg" />
      </Btn>
      <Btn
        toggle={toggle3}
        onMouseDown={(e) => {
          handleBlockClick(e, "ordered-list-item");
          setToggle3((prev) => !prev);
          if (toggle4) {
            setToggle4((prev) => !prev);
          }
        }}
      >
        <FontAwesomeIcon icon={faListOl} size="lg" />
      </Btn>
      <Btn
        toggle={toggle4}
        onMouseDown={(e) => {
          handleBlockClick(e, "unordered-list-item");
          setToggle4((prev) => !prev);
          if (toggle3) {
            setToggle3((prev) => !prev);
          }
        }}
      >
        <FontAwesomeIcon icon={faListUl} size="lg" />
      </Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const Btn = styled.button`
  border: none;
  margin-right: 5px;
  background-color: white;
  color: ${(props) => (props.toggle ? theme.btnColor : theme.fontColor)};
  :hover {
    color: ${theme.btnColor};
  }
`;

export default Toolbar;
