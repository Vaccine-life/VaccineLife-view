import React, { useEffect } from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import LikeIconChanger from "./LikeIconChanger";
import comment from "../images/comment.png";
import eye from "../images/eye.png";
import MypageCard from "./MypageCard";
import { useDispatch } from "react-redux";
import { actionGetLike, actionGetLikeMedi } from "../redux/modules/like";

const MyLike = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetLike("quarantine"));
    dispatch(actionGetLike("vaccine"));
    dispatch(actionGetLikeMedi());
  }, []);
  return (
    <>
      <Grid width="100%">
        <Text
          width="100%"
          lineHeight={theme.mediumButtonHeight}
          size={theme.SubHeadOneSize}
          margin="0 0 40px 0"
          bold
        >
          내가 추천한 글
        </Text>
        <Text
          width="100%"
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin={`0 0 ${theme.bodyThreeSize} 0`}
        >
          백신 후기
        </Text>
        <Grid>
          <MypageCard
            title
            createdAt
            likeCount
            commentCount
            totalVisitors
            board
            boardId
          />
        </Grid>

        <Text
          width="100%"
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin={`${theme.isVaccineHeight} 0 ${theme.bodyThreeSize} 0`}
        >
          격리 후기
        </Text>

        <Text
          width="100%"
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin={`${theme.isVaccineHeight} 0 ${theme.bodyThreeSize} 0`}
        >
          의료진분들께
        </Text>
      </Grid>
    </>
  );
};

const Post = styled.div`
  width: 100%;
  height: 56px;
  border: 1px solid ${theme.typoLightGrey2};
  margin-bottom: ${theme.bodyThreeSize};
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  width: 90%;
  height: 1rem;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto 0 0;
`;

export default MyLike;
