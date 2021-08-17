import React from "react";
import Grid from "../../elements/Grid";

// 게시판 라이브러리 관련
import { Editor, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";
import Toolbar from "./Toolbar";
import theme from "../../styles/theme";
import { isMobileOnly } from "react-device-detect";

const styleMap = {
  HIGHLIGHT: {
    backgroundColor: `${theme.bg4}`,
  },
};

const ExperienceWrite = (props) => {
  const { urlExchanger, editorState, setEditorState, editor } = props;
  const focusEditor = () => {
    editor.current.focus();
  };

  if (isMobileOnly) {
    return (
      <div style={{ margin: "0 16px 0 16px" }}>
        <Grid
          margin="17px 0 30px 0"
          borderline={`1px solid ${theme.typoLightGrey2}`}
        >
          <Toolbar setEditorState={setEditorState} editorState={editorState} />
          <Wrapper className="editor " onClick={focusEditor} isMobile={true}>
            <Editor
              customStyleMap={styleMap}
              ref={editor}
              editorState={editorState}
              onChange={setEditorState}
              placeholder={`${
                urlExchanger ? "백신" : "격리"
              } 후기를 남겨주세요!`}
            />
          </Wrapper>
        </Grid>
      </div>
    );
  }

  return (
    <Grid
      margin="30px auto 30px auto"
      borderline={`1px solid ${theme.typoLightGrey2}`}
    >
      <Toolbar
        setEditorState={setEditorState}
        editorState={editorState}
        isMobile={false}
      />
      <Wrapper className="editor " onClick={focusEditor}>
        <Editor
          customStyleMap={styleMap}
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
  height: 600px;
  box-sizing: content-box;

  cursor: text;
  padding: 16px 0 0 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  background: #fefefe;
  overflow: auto;

  ${(props) =>
    props.isMobile
      ? ` .public-DraftEditor-content {
    font-size: ${theme.bodyfourSize};
    line-height: ${theme.bodyfourHeight};
  }
  .public-DraftEditorPlaceholder-root {
    font-size: ${theme.bodyfourSize};
    line-height: ${theme.bodyfourHeight};
  }`
      : ` .public-DraftEditor-content {
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  }
  .public-DraftEditorPlaceholder-root {
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  }`}
`;

export default ExperienceWrite;
