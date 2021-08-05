import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import "draft-js/dist/Draft.css";
import { convertFromRaw } from "draft-js";
import { Editor, EditorState } from "draft-js";
import { Button, Grid, Text } from "../../elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as amptyHeart } from "@fortawesome/free-regular-svg-icons";

const Contents = (props) => {
  const { contents, likeCount } = props;
  // 클릭했을때 색 변경 추가할것
  const isHeart = true;
  const storedState = convertFromRaw(JSON.parse(contents));
  const editorState = EditorState.createWithContent(storedState);

  return (
    <Wrapper>
      <Grid
        is_flex="column_left_start"
        height="120px"
        bg={theme.bg4}
        margin="0 0 67px 0"
        padding="0 0 0 29px"
      >
        <Text lineHeight={theme.bodyTwoHeight} size={theme.bodyTwoSize} bolds>
          주의사항
        </Text>
        <Text
          lineHeight={theme.bodyTwoHeight}
          size={theme.bodyTwoSize}
          margin=""
        >
          * 증상이 수 일 지속될 시 가까운 병원에 내원하십시오.
        </Text>
        <Text lineHeight={theme.bodyTwoHeight} size={theme.bodyTwoSize}>
          * 특정 병원 이름 언급시 무통보 삭제될 수 있습니다.
        </Text>
      </Grid>
      <Editor editorState={editorState} readOnly={true} />
      <LikeWrapper>
        <Button
          width={theme.mediumButtonWidth}
          height={theme.mediumButtonHeight}
        >
          <div
            style={{
              fontSize: theme.SubHeadOneSize,
              lineHeight: theme.SubHeadOneHeight,
              fontWeight: "700",
            }}
          >
            <FontAwesomeIcon
              icon={amptyHeart}
              size="lg"
              style={{ marginRight: "10px" }}
            />
            추천
          </div>
        </Button>
      </LikeWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 15px 0 15px 0;
  padding: 0 5px 0 5px;
  min-height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  .public-DraftEditor-content {
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  }
`;
const LikeWrapper = styled.div`
  display: flex;
  margin: auto;
`;

export default Contents;
