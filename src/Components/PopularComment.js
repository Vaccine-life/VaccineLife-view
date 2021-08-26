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
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import LikeIconMedi from "./LikeIconMedi";
import {
  actionGetTopThreeMedi,
  actionSetTopThreeMedi,
} from "../redux/modules/comment";
import { isMobileOnly } from "react-device-detect";
import { actionAlert, actionSetMessage } from "../redux/modules/popup";
import {
  actionModifyMedical,
  actionModifyComment,
} from "../redux/modules/comment";
import { TextareaAutosize } from "@material-ui/core";

const PopularComment = (props) => {
  const dispatch = useDispatch();

  const top_list_medi = useSelector((state) => state.comment.topThreeMedi);
  const medical_status = useSelector((state) => state.popup.medicalConfirm);
  // console.log(top_list_medi);

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
  align-items: center;
  margin: 0 0 1rem 0;
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

  // 수정하기
  const [text, setText] = React.useState("");
  const [editable, setEditable] = React.useState(false);
  // 수정 버튼 클릭시 토글
  const handleToggle = () => {
    if (!editable) {
      setText(contents);
    } else {
      setText(text);
    }
    // 수정 비수정 왔다갔다 토글
    setEditable((edit) => !edit);
  };
  const handleChange = (e) => {
    setText(e.target.value);
    // console.log(e.target.value);
  };
  const changeMedical = () => {
    if (!text) {
      dispatch(actionAlert());
      dispatch(actionSetMessage("응원 문구를 작성해주세요!"));
      return;
    }
    dispatch(actionModifyMedical(boardId, { contents: text }));
  };

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

            <Trash>
              {is_login && userId === props.userId ? (
                <Text
                  color={theme.typoGrey3}
                  size={theme.bodyfourSize}
                  lineHeight={theme.bodyfourHeight}
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
            </Trash>

            <Modify>
              {is_login && userId === props.userId ? (
                <Text
                  color={theme.typoGrey3}
                  size={theme.bodyfourSize}
                  lineHeight={theme.bodyfourHeight}
                  cursor="pointer"
                  _onClick={handleToggle}
                >
                  {editable ? (
                    <FontAwesomeIcon icon={faCheck} onClick={changeMedical} />
                  ) : (
                    <FontAwesomeIcon icon={faEdit} />
                  )}
                </Text>
              ) : (
                ""
              )}
            </Modify>

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
            {editable ? (
              <TextareaAutosize
                style={{
                  resize: "none",
                  width: "100%",
                  boxSizing: "border-box",
                  borderWidth: "0 0 1px 0",
                  borderColor: `${theme.typoGrey2}`,
                  fontSize: `${theme.bodyfourSize}`,
                  lineHeight: `${theme.bodyfourHeight}`,
                  fontFamily: "Noto Sans KR",
                  color: `${theme.typoBlack}`,
                  whiteSpace: "pre-wrap",
                }}
                minRows="1"
                value={text}
                onChange={handleChange}
                maxLength="500"
              />
            ) : (
              <Text
                size={theme.bodyfourSize}
                lineHeight={theme.bodyfourHeight}
                color={theme.typoBlack}
              >
                {contents}
              </Text>
            )}
          </Grid>

          <Grid align="left" padding="3rem 1rem 1rem 0">
            <Text size={theme.bodyfourSize} color={theme.typoGrey1}>
              {displayedAt(props.createdAt)}
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

          <Trash>
            {is_login && userId === props.userId ? (
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
          </Trash>

          <Modify>
            {is_login && userId === props.userId ? (
              <Text
                color={theme.typoGrey3}
                size={theme.bodyTwoSize}
                lineHeight={theme.bodyThreeSize}
                cursor="pointer"
                _onClick={handleToggle}
              >
                {editable ? (
                  <FontAwesomeIcon icon={faCheck} onClick={changeMedical} />
                ) : (
                  <FontAwesomeIcon icon={faEdit} />
                )}
              </Text>
            ) : (
              ""
            )}
          </Modify>

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
          {editable ? (
            <TextareaAutosize
              style={{
                resize: "none",
                width: "100%",
                boxSizing: "border-box",
                borderWidth: "0 0 1px 0",
                borderColor: `${theme.typoGrey2}`,
                fontSize: `${theme.bodyThreeSize}`,
                lineHeight: `${theme.bodyThreeHeight}`,
                fontFamily: "Noto Sans KR",
                color: `${theme.typoBlack}`,
                whiteSpace: "pre-wrap",
              }}
              minRows="1"
              value={text}
              onChange={handleChange}
              maxLength="500"
            />
          ) : (
            <Text
              size={theme.bodyThreeSize}
              lineHeight={theme.bodyThreeHeight}
              color={theme.typoBlack}
            >
              {contents}
            </Text>
          )}
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

// 아이콘들
const Heart = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-left: auto;
`;

const Modify = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 0.5rem;
`;

const Trash = styled.div`
  width: auto;
  align-items: center;
  margin: 0 0.5rem;
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
