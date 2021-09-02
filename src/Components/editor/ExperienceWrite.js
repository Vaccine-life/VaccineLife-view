import React from "react";
import Grid from "../../elements/Grid";

// 게시판 라이브러리 관련
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styled from "styled-components";
import theme from "../../styles/theme";
import { isMobileOnly } from "react-device-detect";

const ExperienceWrite = (props) => {
  const { urlExchanger, value, setValue } = props;
  const modules = {
    toolbar: [
      ["underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  if (isMobileOnly) {
    return (
      <div style={{ margin: "0 16px 0 16px" }}>
        <Grid
          margin="17px 0 30px 0"
          borderline={`1px solid ${theme.typoLightGrey2}`}
        >
          <Wrapper isMobile={true}>
            <ReactQuill
              style={{ minHeight: "600px" }}
              modules={modules}
              theme="snow"
              value={value}
              onChange={setValue}
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
      <Wrapper isMobile={false}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          placeholder={`${urlExchanger ? "백신" : "격리"} 후기를 남겨주세요!`}
        />
      </Wrapper>
    </Grid>
  );
};

const Wrapper = styled.div`
  ${(props) =>
    props.isMobile
      ? `
           .quill > .ql-container > .ql-editor.ql-blank::before {
    font-size: ${theme.bodyfourSize};
    font-style: normal;
    font-family: "Noto Sans KR";
     
  }
         .ql-container {
      font-size: ${theme.bodyfourSize};
  
    }
    font-size: ${theme.bodyfourSize};
    line-height: ${theme.bodyfourHeight};
  `
      : `
    .ql-container {
      font-size: ${theme.bodyOneSize};
  
     
    }
      .quill > .ql-container > .ql-editor.ql-blank::before {
    font-size: ${theme.bodyOneSize};
    font-style: normal;
    font-family: "Noto Sans KR";
     
  }
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
 `}
`;

export default ExperienceWrite;
