import React from "react";
import Grid from "../../elements/Grid";

// 게시판 라이브러리 관련
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";
import Toolbar from "./Toolbar";
import theme from "../../styles/theme";

const ExperienceWrite = (props) => {
  const { urlExchanger, editorState, setEditorState, editor } = props;
  const focusEditor = () => {
    editor.current.focus();
  };

  return (
    <Grid margin="30px auto 30px auto">
      <Toolbar setEditorState={setEditorState} editorState={editorState} />
      <Wrapper className="editor " onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          placeholder={`${urlExchanger ? "백신" : "격리"} 후기를 남겨주세요!`}
        />
      </Wrapper>
    </Grid>
  );
};

const Wrapper = styled.div`
  width: ${`${1192 - 16}px`};
  height: 500px;
  box-sizing: content-box;
  border: 1px solid #000000;
  cursor: text;
  padding: 16px 0 0 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  background: #fefefe;
  overflow: auto;

  .public-DraftEditor-content {
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  }
  .public-DraftEditorPlaceholder-root {
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  }
`;

export default ExperienceWrite;
