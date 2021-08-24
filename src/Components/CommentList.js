import React from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Text, Grid } from "../elements";
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
import { isMobileOnly } from "react-device-detect";
import ModifyMedical from "./ModifyMedical";
import { TextareaAutosize } from "@material-ui/core";
import { actionAlert, actionSetMessage } from "../redux/modules/popup";
import { actionModifyMedical } from "../redux/modules/comment";

const CommentList = (props) => {
  const medi_id = props.id;
  console.log(medi_id);
  const medi_contents = props.contents;
  // console.log(medi_contents);

  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const userId = useSelector((state) => state.user.user.userId);
  const medical_status = useSelector((state) => state.popup.medicalConfirm);
  const medical_content = useSelector((state) => state.comment.list);
  console.log(medical_content);

  // 수정하기
  const [text, setText] = React.useState("");
  const [editable, setEditable] = React.useState(false);
  const isEditable = () => {
    if (!editable) {
      setText(medi_contents);
    }
    setEditable((edit) => !edit);
  };
  const handleChange = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
  };
  const changeMedical = () => {
    if (!text) {
      dispatch(actionAlert());
      dispatch(actionSetMessage("응원 문구를 작성해주세요!"));
      return;
    } else {
      dispatch(actionModifyMedical(medi_id));
    }
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
                {props.nickname}
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
                    dispatch(acionSetMedicalObj({ medi_id }));
                    dispatch(actionMedicalConfirm());
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Text>
              ) : (
                ""
              )}
            </Trash>

            {/* <Modify>
            {is_login && userId === props.userId ? <ModifyMedical /> : ""}
          </Modify> */}
            {/* <Modify>
              {is_login && userId === props.userId ? (
                <Text
                  color={theme.typoGrey3}
                  size={theme.bodyfourSize}
                  lineHeight={theme.bodyfourHeight}
                  cursor="pointer"
                  _onClick={() => {
                    // // dispatch(changeContents());
                    // dispatch(acionSetMedicalObj({ medi_id }));
                    // dispatch(actionMedicalConfirm());
                    console.log("수정!!!!!!!!");
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Text>
              ) : (
                ""
              )}
            </Modify> */}

            <Heart>
              <LikeIconMedi boardId={medi_id} />
              <Text
                fontSize={theme.bodyfourSize}
                margin="0 0 0 5.55px"
                color={theme.typoGrey1}
              >
                {props.likeCount}
              </Text>
            </Heart>
          </CommentHead>

          <Grid align="left" padding="1rem 0">
            <Text
              size={theme.bodyfourSize}
              lineHeight={theme.bodyfourHeight}
              color={theme.typoBlack}
            >
              {props.contents}
            </Text>
          </Grid>

          <Grid align="left" padding="3rem 1rem 1rem 0">
            <Text
              size={theme.bodyfourSize}
              lineHeight={theme.bodyfourHeight}
              color={theme.typoGrey1}
            >
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
    <React.Fragment>
      <Wrapper>
        <CommentHead>
          <Grid align="left" width="9rem" padding="0.7rem 0" margin="0">
            <Text
              bold
              size={theme.SubHeadTwoSize}
              lineHeight={theme.SubHeadTwoHeight}
              color={theme.bg2}
            >
              {props.nickname}
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
                  dispatch(acionSetMedicalObj({ medi_id }));
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
                _onClick={isEditable}
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
            <LikeIconMedi boardId={medi_id} />
            <Text
              fontSize={theme.bodyfourSize}
              margin="0 0 0 5.55px"
              color={theme.typoGrey1}
            >
              {props.likeCount}
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
              {props.contents}
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
      </Wrapper>
    </React.Fragment>
  );
};

// CommentList.defaultProps = {
//     nickname: "명수는열두살",
//     comment: "응원합니다!",
//     insert_dt: moment().format("YYYY년 MM월 DD일 hh:mm:ss"),
// }

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1.5px solid ${theme.typoLightGrey2};
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
  box-sizing: border-box;
  border-radius: 6px;
  margin: 1rem;
  padding: 0 0.5rem;
`;

export default CommentList;
