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

import { isMobileOnly } from "react-device-detect";

const MyLike = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
                백신 후기
              </Text>
              <MobilePost>
                <Grid
                  className="작성날짜, 아이콘세개"
                  is_flex="space_row"
                  width="100%"
                  margin="0"
                >
                  <Grid is_flex="center">
                    <Text
                      size={theme.bodyThreeSize}
                      color={theme.typoGrey2}
                      margin="0 auto 0 16px"
                    >
                      2020-01-01
                    </Text>
                  </Grid>

                  <Grid
                    className="아이콘세개"
                    is_flex="space_row"
                    margin="0 16px 0 auto"
                  >
                    <Grid className="추천" is_flex="space_row">
                      <LikeIconChanger />
                      <Grid is_flex="center">
                        <Text
                          size={theme.bodyThreeSize}
                          color={theme.typoGrey2}
                        >
                          45
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid className="댓글" is_flex="space_row">
                      <img
                        src={comment}
                        alt=""
                        style={{
                          width: `${theme.bodyOneSize}`,
                          height: `${theme.bodyOneSize}`,
                        }}
                      />
                      <Grid is_flex="center">
                        <Text
                          size={theme.bodyThreeSize}
                          color={theme.typoGrey2}
                        >
                          15
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid className="조회수" is_flex="space_row">
                      <img
                        src={eye}
                        alt=""
                        style={{
                          width: `${theme.bodyOneSize}`,
                          height: `${theme.bodyOneSize}`,
                        }}
                      />
                      <Grid is_flex="center">
                        <Text
                          size={theme.bodyThreeSize}
                          color={theme.typoGrey2}
                        >
                          555
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid className="제목">
                  <Line />
                  <MobileTitle>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </MobileTitle>
                </Grid>
              </MobilePost>
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
                격리 후기
              </Text>
              <MobilePost>
                <Grid
                  className="작성날짜, 아이콘세개"
                  is_flex="space_row"
                  width="100%"
                  margin="0"
                >
                  <Grid is_flex="center">
                    <Text
                      size={theme.bodyThreeSize}
                      color={theme.typoGrey2}
                      margin="0 auto 0 16px"
                    >
                      2020-01-01
                    </Text>
                  </Grid>

                  <Grid
                    className="아이콘세개"
                    is_flex="space_row"
                    margin="0 16px 0 auto"
                  >
                    <Grid className="추천" is_flex="space_row">
                      <LikeIconChanger />
                      <Grid is_flex="center">
                        <Text
                          size={theme.bodyThreeSize}
                          color={theme.typoGrey2}
                        >
                          45
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid className="댓글" is_flex="space_row">
                      <img
                        src={comment}
                        alt=""
                        style={{
                          width: `${theme.bodyOneSize}`,
                          height: `${theme.bodyOneSize}`,
                        }}
                      />
                      <Grid is_flex="center">
                        <Text
                          size={theme.bodyThreeSize}
                          color={theme.typoGrey2}
                        >
                          15
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid className="조회수" is_flex="space_row">
                      <img
                        src={eye}
                        alt=""
                        style={{
                          width: `${theme.bodyOneSize}`,
                          height: `${theme.bodyOneSize}`,
                        }}
                      />
                      <Grid is_flex="center">
                        <Text
                          size={theme.bodyThreeSize}
                          color={theme.typoGrey2}
                        >
                          555
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid className="제목">
                  <Line />
                  <MobileTitle>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </MobileTitle>
                </Grid>
              </MobilePost>
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
                의료진분들께
              </Text>
              <MobilePost>
                <Grid
                  className="작성날짜, 아이콘"
                  is_flex="space_row"
                  width="100%"
                  margin="0"
                >
                  <Grid is_flex="center">
                    <Text
                      size={theme.bodyThreeSize}
                      color={theme.typoGrey2}
                      margin="0 auto 0 16px"
                    >
                      2020-01-01
                    </Text>
                  </Grid>

                  <Grid className="아이콘" margin="0 16px 0 auto" width="70px">
                    <Grid className="추천" is_flex="space_row">
                      <LikeIconChanger />
                      <Grid is_flex="center">
                        <Text
                          size={theme.bodyThreeSize}
                          color={theme.typoGrey2}
                        >
                          45
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid className="제목">
                  <Line />
                  <MobileTitle>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </MobileTitle>
                </Grid>
              </MobilePost>
              <MobilePost>
                <Grid
                  className="작성날짜, 아이콘"
                  is_flex="space_row"
                  width="100%"
                  margin="0"
                >
                  <Grid is_flex="center">
                    <Text
                      size={theme.bodyThreeSize}
                      color={theme.typoGrey2}
                      margin="0 auto 0 16px"
                    >
                      2020-01-01
                    </Text>
                  </Grid>

                  <Grid className="아이콘" margin="0 16px 0 auto" width="70px">
                    <Grid className="추천" is_flex="space_row">
                      <LikeIconChanger />
                      <Grid is_flex="center">
                        <Text
                          size={theme.bodyThreeSize}
                          color={theme.typoGrey2}
                        >
                          45
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid className="제목">
                  <Line />
                  <MobileTitle>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </MobileTitle>
                </Grid>
              </MobilePost>
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
