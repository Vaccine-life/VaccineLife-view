import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import "draft-js/dist/Draft.css";
import { convertFromRaw } from "draft-js";
import { Editor, EditorState } from "draft-js";
import { Button, Grid, Text } from "../../elements";
import logger from "../../shared/logger";
import LikeIconChanger from "../LikeIconChanger";

const Contents = (props) => {
  const { contents, board, boardId } = props;
  // 클릭했을때 색 변경 추가할것

  const storedState = convertFromRaw(JSON.parse(contents));
  const editorState = EditorState.createWithContent(storedState);

  return (
    <Wrapper>
      {board === "vaccine" && (
        <Grid
          is_flex="column_left_start"
          height="120px"
          bg={theme.bg4}
          margin="0 0 67px 0"
          padding="0 0 0 29px"
        >
          <Text lineHeight={theme.bodyTwoHeight} size={theme.bodyTwoSize} bold>
            주의사항
          </Text>
          <Text
            lineHeight={theme.bodyTwoHeight}
            size={theme.bodyTwoSize}
            margin="0"
          >
            * 증상이 수 일 지속될 시 가까운 병원에 내원하십시오.
          </Text>
          <Text lineHeight={theme.bodyTwoHeight} size={theme.bodyTwoSize}>
            * 특정 병원 이름 언급시 무통보 삭제될 수 있습니다.
          </Text>
        </Grid>
      )}
      <Editor editorState={editorState} readOnly={true} />
      <LikeWrapper>
        <LikeIconChanger board={board} boardId={boardId} size="lg" bigHeart />
        <p
          style={{
            fontSize: `${theme.headTwoSize}`,
            marginLeft: "5.55px",
            fontWeight: "700",
            color: `${theme.bg}`,
          }}
        >
          추천
        </p>
      </LikeWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 15px 0 15px 0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${theme.typoGrey3};
  .public-DraftEditor-content {
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  }
`;
const LikeWrapper = styled.div`
  display: flex;
  margin: 87px 0 45px auto;
  font-size: ${theme.SubHeadOneSize};
  line-height: ${theme.SubHeadOneHeight};
`;

export default Contents;
