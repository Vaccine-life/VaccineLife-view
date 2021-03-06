import React, { useEffect } from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import MypageCard from "./MypageCard";
import { useDispatch, useSelector } from "react-redux";
import { actionGetLike, actionGetLikeMedi } from "../redux/modules/like";

import { isMobileOnly } from "react-device-detect";
import { history } from "../redux/configStore";

const MyLike = () => {
  const dispatch = useDispatch();
  // 내가 좋아요 한 글 redux에서 불러오기
  const vac_list = useSelector((state) => state.board.myLikeVac);
  const quar_list = useSelector((state) => state.board.myLikeQuar);
  const medi_list = useSelector((state) => state.board.myLikeMedi);

  useEffect(() => {
    // 페이지 전환시 좋아요 글 데이터베이스에서 불러오기
    dispatch(actionGetLike("quarantine"));
    dispatch(actionGetLike("vaccine"));
    dispatch(actionGetLikeMedi());
  }, []);

  if (isMobileOnly) {
    return (
      <>
        <Grid width="100%">
          <Grid
            className="하늘색박스"
            is_flex="center"
            margin="0 0 24px 0"
            height="60px"
            bg={theme.bg3}
          >
            <Text
              color={theme.bg2}
              size={theme.SubHeadOneSize}
              lineHeight={theme.headOneHeight}
              bold
            >
              내가 추천한 글
            </Text>
          </Grid>

          <Grid className="body" width="100%" margin="0 auto 30px auto">
            <Grid width="90%" margin="0 auto">
              <Text
                width="90%"
                size={theme.SubHeadTwoSize}
                color={theme.typoGrey3}
                margin={`30px 0 ${theme.bodyThreeSize} 0`}
              >
                백신 후기 ({vac_list.length})
              </Text>
              {vac_list?.map((each, index) => {
                return (
                  <MypageCard
                    key={index}
                    title={each.title}
                    createdAt={each.createdAt}
                    likeCount={each.likeCount}
                    commentCount={each.commentCount}
                    totalVisitors={each.totalVisitors}
                    board="vaccine"
                    boardId={each.vacBoardId}
                  />
                );
              })}
            </Grid>
          </Grid>
          <Border />

          <Grid className="body" width="100%" margin="0 auto 30px auto">
            <Grid width="90%" margin="0 auto">
              <Text
                width="90%"
                size={theme.SubHeadTwoSize}
                color={theme.typoGrey3}
                margin={`30px 0 ${theme.bodyThreeSize} 0`}
              >
                격리 후기 ({quar_list.length})
              </Text>
              {quar_list?.map((each, index) => {
                return (
                  <MypageCard
                    key={index}
                    title={each.title}
                    createdAt={each.createdAt}
                    likeCount={each.likeCount}
                    commentCount={each.commentCount}
                    totalVisitors={each.totalVisitors}
                    board="quarantine"
                    boardId={each.quarBoardId}
                  />
                );
              })}
            </Grid>
          </Grid>
          <Border />

          <Grid className="body" width="100%" margin="0 auto 30px auto">
            <Grid width="90%" margin="0 auto">
              <Text
                width="90%"
                size={theme.SubHeadTwoSize}
                color={theme.typoGrey3}
                margin={`30px 0 ${theme.bodyThreeSize} 0`}
              >
                의료진분들께 ({medi_list.length})
              </Text>
              {medi_list?.map((each, index) => {
                return (
                  <MypageCard
                    key={index}
                    title={each.title}
                    createdAt={each.createdAt}
                    likeCount={each.likeCount}
                    commentCount={each.commentCount}
                    totalVisitors={each.totalVisitors}
                    contents={each.contents}
                    board="medical"
                    boardId={each.medicalId}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }

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
          백신 후기 ({vac_list.length})
        </Text>
        <Grid>
          {vac_list?.map((each, index) => {
            return (
              <MypageCard
                onClick={() => history}
                key={index}
                title={each.title}
                createdAt={each.createdAt}
                likeCount={each.likeCount}
                commentCount={each.commentCount}
                totalVisitors={each.totalVisitors}
                board="vaccine"
                boardId={each.vacBoardId}
              />
            );
          })}
        </Grid>

        <Text
          width="100%"
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin={`${theme.isVaccineHeight} 0 ${theme.bodyThreeSize} 0`}
        >
          격리 후기 ({quar_list.length})
        </Text>
        <Grid>
          {quar_list?.map((each, index) => {
            return (
              <MypageCard
                key={index}
                title={each.title}
                createdAt={each.createdAt}
                likeCount={each.likeCount}
                commentCount={each.commentCount}
                totalVisitors={each.totalVisitors}
                board="quarantine"
                boardId={each.quarBoardId}
              />
            );
          })}
        </Grid>
        <Text
          width="100%"
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin={`${theme.isVaccineHeight} 0 ${theme.bodyThreeSize} 0`}
        >
          의료진분들께 ({medi_list.length})
        </Text>
        <Grid>
          {medi_list?.map((each, index) => {
            return (
              <MypageCard
                key={index}
                title={each.title}
                createdAt={each.createdAt}
                likeCount={each.likeCount}
                commentCount={each.commentCount}
                totalVisitors={each.totalVisitors}
                contents={each.contents}
                board="medical"
                boardId={each.medicalId}
              />
            );
          })}
        </Grid>
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
  margin: 0 auto 0 16px;
`;

const MobileTitle = styled.div`
  width: 270px;
  height: 1rem;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto 0 16px;
`;

const MobilePost = styled.div`
  width: 100%;
  height: 86px;
  border: 1px solid ${theme.typoLightGrey2};
  border-radius: 6px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  margin: 0 auto 8px auto;
`;

const Line = styled.div`
  width: 90%;
  border-bottom: 1px solid ${theme.typoLightGrey2};
  margin: 0 auto 8px auto;
`;

const Border = styled.div`
  width: 100%;
  border-bottom: 5px solid ${theme.typoLightGrey1};
`;

export default MyLike;
