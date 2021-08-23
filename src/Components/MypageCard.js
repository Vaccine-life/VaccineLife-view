import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faEye } from "@fortawesome/free-regular-svg-icons";
import LikeIconChanger from "./LikeIconChanger";
import displayedAt from "../shared/displayedAt";
import { Grid, Text } from "../elements";

const MypageCard = (props) => {
  const {
    title,
    createdAt,
    likeCount,
    commentCount,
    totalVisitors,
    board,
    boardId,
  } = props;
  return (
    <Wrapper>
      <Text size={theme.bodyThreeSize} color={theme.typoGrey1}>
        {displayedAt(createdAt)}
      </Text>
      <Grid is_flex="space_row">
        <TextDiv>
          <EachDiv>
            {" "}
            <LikeIconChanger board={board} boardId={boardId} />
            <p style={{ marginLeft: "3px" }}>{likeCount}</p>
          </EachDiv>
          <EachDiv>
            {" "}
            <FontAwesomeIcon icon={faCommentAlt} />
            <p style={{ marginLeft: "3px" }}>{commentCount}</p>
          </EachDiv>
          <EachDiv>
            {" "}
            <FontAwesomeIcon icon={faEye} />
            <p style={{ marginLeft: "3px" }}>{totalVisitors}</p>
          </EachDiv>
        </TextDiv>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid ${theme.typoLightGrey2};
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px 0 24px;
`;
const TextDiv = styled.div`
  text-align: start;
  display: flex;
`;

const EachDiv = styled.div`
  height: 100%;
  color: ${theme.typoGrey1};
  font-size: ${theme.bodyfourSize};
  line-height: ${theme.bodyfourHeight};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 16px;
  margin-top: 3px;
`;
export default MypageCard;
