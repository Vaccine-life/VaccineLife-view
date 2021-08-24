import React from "react";
import { Grid, Text } from "../elements";
import LikeIconChanger from "./LikeIconChanger";
import comment from "../images/comment.png";
import eye from "../images/eye.png";

import theme from "../styles/theme";
import { isMobileOnly } from "react-device-detect";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionGetMyMedical } from "../redux/modules/comment";

const MyPost = () => {
  const dispatch = useDispatch();

  const user_id = useSelector((state) => state.user.user);
  console.log(user_id);
  const contents = useSelector((state) => state.comment.list);
  console.log(contents);

  // React.useEffect(() => {
  //   dispatch(actionGetMyMedical());
  // }, []);

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
          내가 쓴 글
        </Text>

        <Text
          width="100%"
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin={`0 0 ${theme.bodyThreeSize} 0`}
        >
          백신 후기
        </Text>
        <Post>
          <Grid
            className="작성날짜"
            is_flex="center"
            width="15%"
            margin={`auto ${theme.headOneSize}`}
          >
            <Text size={theme.bodyThreeSize} color={theme.typoGrey2}>
              2020-01-01
            </Text>
          </Grid>

          <Grid
            className="제목"
            is_flex="center"
            width="60%"
            height="1rem"
            margin={`auto ${theme.headOneSize} auto 0`}
          >
            <Title>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Title>
          </Grid>

          <Grid
            className="아이콘세개"
            width="25%"
            is_flex="center"
            margin={`auto 0`}
          >
            <Grid
              className="추천"
              width="30%"
              is_flex="center"
              margin={`auto 0`}
            >
              <LikeIconChanger />
              <Grid width="30%" is_flex="center" margin={`auto 0`}>
                <Text
                  size={theme.bodyThreeSize}
                  color={theme.typoGrey2}
                  margin="0 0 0 5px"
                >
                  5
                </Text>
              </Grid>
            </Grid>
            <Grid
              className="댓글"
              width="30%"
              is_flex="center"
              margin={`auto 0`}
            >
              <img
                src={comment}
                alt=""
                style={{
                  width: `${theme.bodyOneSize}`,
                  height: `${theme.bodyOneSize}`,
                }}
              />
              <Grid width="30%" is_flex="center" margin={`auto 0`}>
                <Text
                  size={theme.bodyThreeSize}
                  color={theme.typoGrey2}
                  margin="0 0 0 5px"
                >
                  15
                </Text>
              </Grid>
            </Grid>
            <Grid
              className="조회수"
              width="30%"
              is_flex="center"
              margin={`auto 0`}
            >
              <img
                src={eye}
                alt=""
                style={{
                  width: `${theme.bodyOneSize}`,
                  height: `${theme.bodyOneSize}`,
                }}
              />
              <Grid width="30%" is_flex="center" margin={`auto 0`}>
                <Text
                  size={theme.bodyThreeSize}
                  color={theme.typoGrey2}
                  margin="0 0 0 5px"
                >
                  555
                </Text>
              </Grid>
            </Grid>
          </Grid>
        </Post>

        <Text
          width="100%"
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin={`${theme.isVaccineHeight} 0 ${theme.bodyThreeSize} 0`}
        >
          격리 후기
        </Text>
        <Post>
          <Grid
            className="작성날짜"
            is_flex="center"
            width="15%"
            margin={`auto ${theme.headOneSize}`}
          >
            <Text size={theme.bodyThreeSize} color={theme.typoGrey2}>
              2020-01-01
            </Text>
          </Grid>

          <Grid
            className="제목"
            is_flex="center"
            width="60%"
            height="1rem"
            margin={`auto ${theme.headOneSize} auto 0`}
          >
            <Title>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Title>
          </Grid>

          <Grid
            className="아이콘세개"
            width="25%"
            is_flex="center"
            margin={`auto 0`}
          >
            <Grid
              className="추천"
              width="30%"
              is_flex="center"
              margin={`auto 0`}
            >
              <LikeIconChanger />
              <Grid width="30%" is_flex="center" margin={`auto 0`}>
                <Text
                  size={theme.bodyThreeSize}
                  color={theme.typoGrey2}
                  margin="0 0 0 5px"
                >
                  5
                </Text>
              </Grid>
            </Grid>
            <Grid
              className="댓글"
              width="30%"
              is_flex="center"
              margin={`auto 0`}
            >
              <img
                src={comment}
                alt=""
                style={{
                  width: `${theme.bodyOneSize}`,
                  height: `${theme.bodyOneSize}`,
                }}
              />
              <Grid width="30%" is_flex="center" margin={`auto 0`}>
                <Text
                  size={theme.bodyThreeSize}
                  color={theme.typoGrey2}
                  margin="0 0 0 5px"
                >
                  15
                </Text>
              </Grid>
            </Grid>
            <Grid
              className="조회수"
              width="30%"
              is_flex="center"
              margin={`auto 0`}
            >
              <img
                src={eye}
                alt=""
                style={{
                  width: `${theme.bodyOneSize}`,
                  height: `${theme.bodyOneSize}`,
                }}
              />
              <Grid width="30%" is_flex="center" margin={`auto 0`}>
                <Text
                  size={theme.bodyThreeSize}
                  color={theme.typoGrey2}
                  margin="0 0 0 5px"
                >
                  555
                </Text>
              </Grid>
            </Grid>
          </Grid>
        </Post>

        <Text
          width="100%"
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin={`${theme.isVaccineHeight} 0 ${theme.bodyThreeSize} 0`}
        >
          의료진분들께
        </Text>
        <Post>
          <Grid
            className="작성날짜"
            is_flex="center"
            width="15%"
            margin={`auto ${theme.headOneSize}`}
          >
            <Text size={theme.bodyThreeSize} color={theme.typoGrey2}>
              2020-01-01
            </Text>
          </Grid>

          <Grid
            className="제목"
            is_flex="center"
            width="60%"
            height="1rem"
            margin={`auto ${theme.headOneSize} auto 0`}
          >
            <Title>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Title>
          </Grid>

          <Grid
            className="아이콘세개"
            width="25%"
            is_flex="center"
            margin={`auto 0`}
          >
            <Grid
              className="추천"
              width="30%"
              is_flex="center"
              margin={`auto 0`}
            >
              <LikeIconChanger />
              <Grid width="30%" is_flex="center" margin={`auto 0`}>
                <Text
                  size={theme.bodyThreeSize}
                  color={theme.typoGrey2}
                  margin="0 0 0 5px"
                >
                  5
                </Text>
              </Grid>
            </Grid>
            <Grid
              className="댓글"
              width="30%"
              is_flex="center"
              margin={`auto 0`}
            >
              {/* <img
                src={comment}
                alt=""
                style={{
                  width: `${theme.bodyOneSize}`,
                  height: `${theme.bodyOneSize}`,
                }}
              />
              <Grid width="30%" is_flex="center" margin={`auto 0`}>
                <Text
                  size={theme.bodyThreeSize}
                  color={theme.typoGrey2}
                  margin="0 0 0 5px"
                >
                  15
                </Text>
              </Grid> */}
            </Grid>
            <Grid
              className="조회수"
              width="30%"
              is_flex="center"
              margin={`auto 0`}
            >
              {/* <img
                src={eye}
                alt=""
                style={{
                  width: `${theme.bodyOneSize}`,
                  height: `${theme.bodyOneSize}`,
                }}
              />
              <Grid width="30%" is_flex="center" margin={`auto 0`}>
                <Text
                  size={theme.bodyThreeSize}
                  color={theme.typoGrey2}
                  margin="0 0 0 5px"
                >
                  555
                </Text>
              </Grid> */}
            </Grid>
          </Grid>
        </Post>
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
  border-bottom: 8px solid ${theme.typoLightGrey1};
`;

export default MyPost;
