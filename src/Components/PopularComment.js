import React from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text } from "../elements";

import MedicalConfirm from "../components/popup/MedicalConfirm";
import displayedAt from "../shared/displayedAt";
import LikeIconMedi from "./LikeIconMedi";
import { actionGetTopThreeMedi } from "../redux/modules/comment";
import { isMobileOnly } from "react-device-detect";

// 인기응원글list (3개)
const PopularComment = (props) => {
  const dispatch = useDispatch();

  const top_list_medi = useSelector((state) => state.comment.topThreeMedi);
  // console.log(top_list_medi);
  const medical_status = useSelector((state) => state.popup.medicalConfirm);

  // 첫 렌더시 인기응원글 3개 가져오기
  React.useEffect(() => {
    dispatch(actionGetTopThreeMedi());
  }, []);

  if (isMobileOnly) {
    return (
      <>
        <Grid align="left" margin="2.5rem auto 0 0" padding="0 1rem">
          <Text
            size={theme.SubHeadTwoSize}
            lineHeight={theme.SubHeadTwoHeight}
            bold
          >
            인기응원글
          </Text>
        </Grid>

        <PopularWrapper>
          {top_list_medi.map((each, index) => {
            return (
              <PopularCommentItem
                key={index}
                nickname={each.nickname}
                contents={each.contents}
                likeCount={each.likeCount}
                createdAt={each.createdAt}
                boardId={each.id}
                userId={each.userId}
              />
            );
          })}
        </PopularWrapper>

        {medical_status && (
          <MedicalConfirm confirmMessage="삭제하시겠습니까?" />
        )}
      </>
    );
  }
  return (
    <>
      <Grid align="left">
        <Text size={theme.headTwoSize} lineHeight={theme.headTwoHeight} bold>
          인기응원글
        </Text>
      </Grid>

      <PopularWrapper>
        {top_list_medi.map((each, index) => {
          return (
            <PopularCommentItem
              key={index}
              nickname={each.nickname}
              contents={each.contents}
              likeCount={each.likeCount}
              createdAt={each.createdAt}
              boardId={each.id}
              userId={each.userId}
            />
          );
        })}
      </PopularWrapper>
    </>
  );
};

const PopularWrapper = styled.div`
  align-items: center;
  margin: 0 0 1rem 0;
`;

export default PopularComment;

// 인기응원글 하나(위의 PopularComment에서만 쓰일 것이므로 export하지 않음.)
const PopularCommentItem = (props) => {
  // console.log(props);
  const { nickname, contents, likeCount, createdAt, boardId, userId } = props;

  const medical_status = useSelector((state) => state.popup.medicalConfirm);

  if (isMobileOnly) {
    return (
      <>
        <WrapperMobile>
          <CommentHead>
            <Grid align="left" width="6rem" padding="0.7rem 0" margin="0">
              <Text
                bold
                size={theme.bodyfourSize}
                lineHeight={theme.bodyfourHeight}
                color={theme.bg2}
              >
                {nickname}
              </Text>
            </Grid>

            <Heart>
              <LikeIconMedi boardId={boardId} />
              <Text
                fontSize={theme.bodyfourSize}
                margin="0 0 0 5.55px"
                color={theme.typoGrey1}
              >
                {likeCount}
              </Text>
            </Heart>
          </CommentHead>

          <Grid align="left" padding="1rem 0">
            <Text
              size={theme.bodyfourSize}
              lineHeight={theme.bodyfourHeight}
              color={theme.typoBlack}
            >
              {contents}
            </Text>
          </Grid>

          <Grid align="left" padding="3rem 1rem 1rem 0">
            <Text size={theme.bodyfourSize} color={theme.typoGrey1}>
              {displayedAt(createdAt)}
            </Text>
          </Grid>

          {medical_status && (
            <MedicalConfirm confirmMessage="삭제하시겠습니까?" />
          )}
        </WrapperMobile>
      </>
    );
  }
  return (
    <>
      <Wrapper>
        <CommentHead>
          <Grid align="left" width="9rem" padding="0.7rem 0" margin="0">
            <Text
              bold
              size={theme.SubHeadTwoSize}
              lineHeight={theme.SubHeadTwoHeight}
              color={theme.bg2}
            >
              {nickname}
            </Text>
          </Grid>

          <Heart>
            <LikeIconMedi boardId={boardId} />
            <p
              style={{
                fontSize: `${theme.bodyfourSize}`,
                margin: "0 0 0 5.55px",
                color: `${theme.typoGrey2}`,
              }}
            >
              {likeCount}
            </p>
          </Heart>
        </CommentHead>

        <Grid align="left" padding="1rem 0">
          <Text
            size={theme.bodyThreeSize}
            lineHeight={theme.bodyThreeHeight}
            color={theme.typoBlack}
          >
            {contents}
          </Text>
        </Grid>

        <Grid align="left" padding="3rem 1rem 1rem 0">
          <Text size={theme.bodyfourSize} color={theme.typoGrey1}>
            {displayedAt(createdAt)}
          </Text>
        </Grid>

        {medical_status && (
          <MedicalConfirm confirmMessage="삭제하시겠습니까?" />
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1.5px solid ${theme.bg2};
  background-color: rgba(237, 242, 255, 0.4);
  box-sizing: border-box;
  border-radius: 6px;
  margin: 1em 0;
  padding: 0 1rem;
`;

const CommentHead = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.typoLightGrey2};
`;

const Heart = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-left: auto;
`;

const WrapperMobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1.5px solid ${theme.typoLightGrey2};
  background-color: rgba(237, 242, 255, 0.4);
  box-sizing: border-box;
  border-radius: 6px;
  margin: 1rem;
  padding: 0 0.5rem;
`;
