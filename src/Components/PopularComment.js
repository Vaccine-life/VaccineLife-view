import React from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text } from "../elements";

import MedicalConfirm from "../components/popup/MedicalConfirm";
import {
  actionMedicalConfirm,
  acionSetMedicalObj,
} from "../redux/modules/popup";
import displayedAt from "../shared/displayedAt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import LikeIconMedi from "./LikeIconMedi";
import {
  actionGetTopThreeMedi,
  actionSetTopThreeMedi,
} from "../redux/modules/comment";
import { isMobileOnly } from "react-device-detect";

const PopularComment = (props) => {
  const dispatch = useDispatch();

  const top_list_medi = useSelector((state) => state.comment.topThreeMedi);
  const medical_status = useSelector((state) => state.popup.medicalConfirm);
  console.log(top_list_medi);

  React.useEffect(() => {
    dispatch(actionGetTopThreeMedi());
  }, []);

  if (isMobileOnly) {
    return (
      <>
        <Grid align="left" margin="2rem 0" padding="0 1rem">
          <Text size={theme.headTwoSize} lineHeight={theme.headOneHeight} bold>
            인기응원글
          </Text>
        </Grid>

        <div style={{ padding: "0 1rem" }}>
          <PopularWrapper>
            {top_list_medi?.map((each, index) => {
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
        </div>
      </>
    );
  }
  return (
    <>
      <Grid align="left">
        <Text size={theme.headTwoSize} lineHeight={theme.headOneHeight} bold>
          인기응원글
        </Text>
      </Grid>

      <PopularWrapper>
        {top_list_medi?.map((each, index) => {
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
  width: 100%;
  height: 100%;
  align-items: center;
  margin: 1rem 0 4rem 0;
  background-color: #fcf6f5;
  padding: 0 0 0.5rem 0;
`;

export default PopularComment;

const PopularCommentItem = (props) => {
  // console.log(props);
  const { nickname, contents, likeCount, createdAt, boardId, userId } = props;
  // const medi_id = props.id;
  // console.log(medi_id);

  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const user_id = useSelector((state) => state.user.user.userId);
  const medical_status = useSelector((state) => state.popup.medicalConfirm);

  if (isMobileOnly) {
    return (
      <>
        <Grid is_flex="column_left_start" margin="2rem 0">
          <CommentHead>
            <Grid
              align="left"
              width="10rem"
              padding="1rem 0.5rem"
              margin="0 auto 0 0"
            >
              <Text
                bold
                size={theme.SubHeadTwoSize}
                lineHeight={theme.SubHeadTwoHeight}
                color={theme.bg2}
              >
                {nickname}
              </Text>
            </Grid>

            {/* <Grid align="right" margin="auto 0.5rem">
              {is_login && user_id === userId ? (
                <Text
                  color={theme.typoGrey3}
                  size={theme.bodyTwoSize}
                  lineHeight={theme.bodyThreeSize}
                  cursor="pointer"
                  _onClick={() => {
                    dispatch(acionSetMedicalObj({ boardId }));
                    dispatch(actionMedicalConfirm());
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Text>
              ) : (
                ""
              )}
            </Grid> */}

            <Heart>
              <LikeIconMedi boardId={boardId} />
              <p
                style={{
                  fontSize: `${theme.bodyfourSize}`,
                  marginLeft: "5.55px",
                  color: `${theme.typoGrey2}`,
                }}
              >
                {props.likeCount}
              </p>
            </Heart>
          </CommentHead>

          <Grid align="left" padding="1rem 0.5rem" margin="0">
            <Text
              size={theme.bodyThreeSize}
              lineHeight={theme.bodyThreeHeight}
              color={theme.typoBlack}
            >
              {contents}
            </Text>
          </Grid>

          <Grid
            align="left"
            margin="2.5rem 0.5rem 0 0.5rem"
            // padding="0 0 2rem 0"
          >
            <Text size={theme.bodyfourSize} color={theme.typoGrey1}>
              {displayedAt(props.createdAt)}
            </Text>
          </Grid>

          {medical_status && (
            <MedicalConfirm confirmMessage="삭제하시겠습니까?" />
          )}
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid is_flex="column_left_start">
        <CommentHead>
          <Grid align="left" width="10rem" padding="1rem 0.5rem">
            <Text
              bold
              size={theme.SubHeadTwoSize}
              lineHeight={theme.SubHeadTwoHeight}
              color={theme.bg2}
            >
              {nickname}
            </Text>
          </Grid>

          {/* <Trash>
            {is_login && user_id === userId ? (
              <Text
                color={theme.typoGrey3}
                size={theme.bodyTwoSize}
                lineHeight={theme.bodyThreeSize}
                cursor="pointer"
                _onClick={() => {
                  dispatch(acionSetMedicalObj({ boardId }));
                  dispatch(actionMedicalConfirm());
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Text>
            ) : (
              ""
            )}
          </Trash> */}

          <Heart>
            <LikeIconMedi boardId={boardId} />
            <p
              style={{
                fontSize: `${theme.bodyfourSize}`,
                marginLeft: "5.55px",
                color: `${theme.typoGrey2}`,
              }}
            >
              {likeCount}
            </p>
          </Heart>

          <Grid align="right" margin="auto 0.5rem">
            <Text size={theme.bodyfourSize} color={theme.typoGrey1}>
              {displayedAt(createdAt)}
            </Text>
          </Grid>
        </CommentHead>

        <Grid align="left" padding="1rem 0.5rem 4rem 0.5rem">
          <Text
            size={theme.bodyThreeSize}
            lineHeight={theme.bodyThreeHeight}
            color={theme.typoBlack}
          >
            {contents}
          </Text>
        </Grid>

        {medical_status && (
          <MedicalConfirm confirmMessage="삭제하시겠습니까?" />
        )}
      </Grid>
    </>
  );
};

const CommentHead = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border-top: 2px solid ${theme.typoGrey2};
  border-bottom: 1px solid ${theme.typoLightGrey2};
  align-items: center;
`;

const Heart = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 0.5rem;
`;

const Trash = styled.div`
  width: 5rem;
  align-items: center;
`;
