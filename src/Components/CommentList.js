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
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import LikeIconMedi from "./LikeIconMedi";
import { isMobileOnly } from "react-device-detect";

const CommentList = (props) => {
  // console.log(props);
  const medi_id = props.id;

  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const userId = useSelector((state) => state.user.user.userId);
  const medical_status = useSelector((state) => state.popup.medicalConfirm);

  if (isMobileOnly) {
    return (
      <>
        <Grid is_flex="column_left_start" margin="2rem 0" padding="0 1rem">
          <CommentHead>
            <Grid align="left" width="15rem" padding="1rem 0.5rem">
              <Text
                bold
                size={theme.SubHeadTwoSize}
                lineHeight={theme.SubHeadTwoHeight}
                color={theme.bg2}
              >
                {props.nickname}
              </Text>
            </Grid>

            <Grid align="right" margin="auto 0.5rem">
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
            </Grid>

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

          <Grid align="left" padding="1rem 0.5rem">
            <Text
              size={theme.bodyThreeSize}
              lineHeight={theme.bodyThreeHeight}
              color={theme.typoBlack}
            >
              {props.contents}
            </Text>
          </Grid>

          <Grid align="left" margin="2.5rem 0.5rem 0 0.5rem">
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
    <React.Fragment>
      <Grid is_flex="column_left_start" margin="4rem 0">
        <CommentHead>
          <Grid align="left" width="10rem" padding="1rem 0.5rem">
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

          <Grid align="right" margin="auto 0.5rem">
            <Text size={theme.bodyfourSize} color={theme.typoGrey1}>
              {displayedAt(props.createdAt)}
            </Text>
          </Grid>
        </CommentHead>

        <Grid align="left" padding="1rem 0.5rem">
          <Text
            size={theme.bodyThreeSize}
            lineHeight={theme.bodyThreeHeight}
            color={theme.typoBlack}
          >
            {props.contents}
          </Text>
        </Grid>

        {medical_status && (
          <MedicalConfirm confirmMessage="삭제하시겠습니까?" />
        )}
      </Grid>
    </React.Fragment>
  );
};

// CommentList.defaultProps = {
//     nickname: "명수는열두살",
//     comment: "응원합니다!",
//     insert_dt: moment().format("YYYY년 MM월 DD일 hh:mm:ss"),
// }

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

export default CommentList;
