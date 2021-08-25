import React, { useEffect } from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import MypageCard from "./MypageCard";
import { useDispatch, useSelector } from "react-redux";
import { actionGetLike, actionGetLikeMedi } from "../redux/modules/like";

import { isMobileOnly } from "react-device-detect";
import { history } from "../redux/configStore";
import { actionGetMyWriteDB } from "../redux/modules/board";

const MyPost = () => {
  const dispatch = useDispatch();
  const vac_list = useSelector((state) => state.board.myWriteVac);
  const quar_list = useSelector((state) => state.board.myWriteQuar);
  const medi_list = useSelector((state) => state.board.myWriteMedi);

  useEffect(() => {
    dispatch(actionGetMyWriteDB("quarantine"));
    dispatch(actionGetMyWriteDB("vaccine"));
    dispatch(actionGetMyWriteDB("medical"));
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
              내가 쓴 글
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
                    boardId={each.id}
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
                    boardId={each.id}
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
          내가 쓴 글
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
                boardId={each.id}
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
                boardId={each.id}
              />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

const Border = styled.div`
  width: 100%;
  border-bottom: 8px solid ${theme.typoLightGrey1};
`;

export default MyPost;
