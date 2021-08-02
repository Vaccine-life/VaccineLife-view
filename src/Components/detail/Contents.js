import React from "react";
import styled from "styled-components";
import logger from "../../shared/logger";
import theme from "../../styles/theme";
import "draft-js/dist/Draft.css";
import { convertFromRaw } from "draft-js";
import { Editor, EditorState } from "draft-js";
import { Grid, Text } from "../../elements";
import LikeIconChanger from "../LikeIconChanger";

const Contents = (props) => {
  const { contents, likeCount } = props;
  const isHeart = true;
  const storedState = convertFromRaw(JSON.parse(contents));
  const editorState = EditorState.createWithContent(storedState);
  logger(editorState);
  return (
    <Wrapper>
      <Editor editorState={editorState} readOnly={true} />
      <Grid is_flex="space_row" height="30px" margin="0 auto 0 auto">
        <Text size="12px">
          증상이 수 일 지속될 시 가까운 병원에 내원하십시오. 특정 병원 이름
          언급시 무통보 삭제될 수 있습니다.
        </Text>
        <LikeWrapper>
          <LikeIconChanger isHeart={isHeart} />
          <Text margin="0 0 0 10px">{likeCount}</Text>
        </LikeWrapper>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 15px 0 15px 0;
  padding: 0 5px 0 5px;
  border: 2px solid ${theme.bg};
  min-height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  .public-DraftEditor-content {
    line-height: 30px;
  }
`;
const LikeWrapper = styled.div`
  display: flex;
  margin: auto;
`;

export default Contents;
