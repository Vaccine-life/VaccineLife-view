import React, { useState } from "react";
import { RichUtils } from "draft-js";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { faStrikethrough } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import theme from "../../styles/theme";
import logger from "../../shared/logger";
import { isMobileOnly } from "react-device-detect";

const Toolbar = (props) => {
  const { setEditorState, editorState, handleKeyCommand } = props;

  const toggleInlineStyle = (event) => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (event) => {
    event.preventDefault();
    let block = event.currentTarget.getAttribute("data-block");
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  const classNameInlineChanger = (style) => {
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    let className = "";
    if (currentInlineStyle.has(style)) {
      className = "active";
    }
    return className;
  };

  const classNameBlockChanger = (block) => {
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    let className = "";
    if (currentBlockType === block) {
      className = "active";
    }
    return className;
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  if (isMobileOnly) {
    return (
      <Wrapper isMobile={true}>
        <Btn
          key="BOLD"
          value="Bold"
          data-style="BOLD"
          className={classNameInlineChanger("BOLD")}
          onClick={toggleInlineStyle}
          onMouseDown={preventDefault}
        >
          <FontAwesomeIcon icon={faBold} size="lg" />
        </Btn>
        <Btn
          key="STRIKETHROUGH"
          value="Strikethrough"
          data-style="STRIKETHROUGH"
          className={classNameInlineChanger("STRIKETHROUGH")}
          onClick={toggleInlineStyle}
          onMouseDown={preventDefault}
        >
          <FontAwesomeIcon icon={faStrikethrough} size="lg" />
        </Btn>
        <Btn
          key="ordered-list-item"
          value="Ordered List"
          data-block="ordered-list-item"
          className={classNameBlockChanger("ordered-list-item")}
          onClick={toggleBlockType}
          onMouseDown={preventDefault}
        >
          <FontAwesomeIcon icon={faListOl} size="lg" />
        </Btn>
        <Btn
          key="unordered-list-item"
          value="Unordered List"
          data-block="unordered-list-item"
          className={classNameBlockChanger("unordered-list-item")}
          onClick={toggleBlockType}
          onMouseDown={preventDefault}
        >
          <FontAwesomeIcon icon={faListUl} size="lg" />
        </Btn>
      </Wrapper>
    );
  }

  return (
    <Wrapper isMobile={false}>
      <Btn
        key="BOLD"
        value="Bold"
        data-style="BOLD"
        className={classNameInlineChanger("BOLD")}
        onClick={toggleInlineStyle}
        onMouseDown={preventDefault}
      >
        <FontAwesomeIcon icon={faBold} size="lg" />
      </Btn>
      <Btn
        key="STRIKETHROUGH"
        value="Strikethrough"
        data-style="STRIKETHROUGH"
        className={classNameInlineChanger("STRIKETHROUGH")}
        onClick={toggleInlineStyle}
        onMouseDown={preventDefault}
      >
        <FontAwesomeIcon icon={faStrikethrough} size="lg" />
      </Btn>
      <Btn
        key="ordered-list-item"
        value="Ordered List"
        data-block="ordered-list-item"
        className={classNameBlockChanger("ordered-list-item")}
        onClick={toggleBlockType}
        onMouseDown={preventDefault}
      >
        <FontAwesomeIcon icon={faListOl} size="lg" />
      </Btn>
      <Btn
        key="unordered-list-item"
        value="Unordered List"
        data-block="unordered-list-item"
        className={classNameBlockChanger("unordered-list-item")}
        onClick={toggleBlockType}
        onMouseDown={preventDefault}
      >
        <FontAwesomeIcon icon={faListUl} size="lg" />
      </Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${(props) =>
    props.isMobile ? ` padding: 8px 0 8px 16px;` : `  padding: 8px; `}
  height: 46px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid ${theme.typoLightGrey2};
  .active {
    background-color: ${theme.bg4};
  }
`;

const Btn = styled.button`
  border: none;
  width: 30px;
  height: 30px;
  margin-right: 5px;
  background-color: ${theme.white};
  :hover {
    color: ${theme.btnColor};
  }
`;

export default Toolbar;
