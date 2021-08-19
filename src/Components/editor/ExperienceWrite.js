import React from "react";
import Grid from "../../elements/Grid";

// 게시판 라이브러리 관련
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styled from "styled-components";
import Toolbar from "./Toolbar";
import theme from "../../styles/theme";
import { isMobileOnly } from "react-device-detect";

const ExperienceWrite = (props) => {
  const { urlExchanger, value, setValue } = props;

  if (isMobileOnly) {
    return (
      <div style={{ margin: "0 16px 0 16px" }}>
        <Grid
          margin="17px 0 30px 0"
          borderline={`1px solid ${theme.typoLightGrey2}`}
        >
          <ReactQuill
            style={{ minHeight: "600px" }}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder={`${urlExchanger ? "백신" : "격리"} 후기를 남겨주세요!`}
          />
        </Grid>
      </div>
    );
  }

  return (
    <Grid
      margin="30px auto 30px auto"
      borderline={`1px solid ${theme.typoLightGrey2}`}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder={`${urlExchanger ? "백신" : "격리"} 후기를 남겨주세요!`}
      />
    </Grid>
  );
};

const Wrapper = styled.div`
  height: 600px;
  box-sizing: content-box;

  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  background: #fefefe;
  overflow: auto;

  ${(props) =>
    props.isMobile
      ? ` 
    font-size: ${theme.bodyfourSize};
    line-height: ${theme.bodyfourHeight};
  `
      : `
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
 `}
`;

export default ExperienceWrite;
