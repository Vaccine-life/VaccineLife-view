import React from "react";
import theme from "../styles/theme";
import styled from "styled-components";

import { Text, Button, Grid } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { isMobileOnly } from "react-device-detect";
import { TextareaAutosize } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { actionAlert, actionSetMessage } from "../redux/modules/popup";
import { actionModifyMedical } from "../redux/modules/comment";

const ModifyMedical = (props) => {
  const dispatch = useDispatch();

  const [comment, setComment] = React.useState();

  const changeComment = (e) => {
    setComment(e.target.value);
  };

  const medicalModifyObj = {
    contents: comment,
  };

  function changeToTextarea(id, value) {
    return (
      "<input type='text' id='test " +
      id +
      "' onChange='javascript:saveValue(" +
      id +
      ",this.value)' value='" +
      value +
      "'><br>"
    );
  }

  const modifyMedical = () => {
    if (!comment) {
      dispatch(actionAlert());
      dispatch(actionSetMessage("응원 문구를 수정해주세요!"));
      return;
    } else {
      dispatch(actionModifyMedical(medicalModifyObj));
    }
  };

  return (
    <>
      <Grid is_flex="space_column" margin="3rem 0" width={theme.medicalWidth}>
        <Grid is_flex="space_column" border={`1px solid ${theme.typoGrey1}`}>
          <Grid margin="0 5rem">
            <TextareaAutosize
              style={{
                resize: "none",
                width: "100%",
                padding: "1rem 0.7rem",
                boxSizing: "border-box",
                border: "none",
                fontSize: `${theme.SubHeadTwoSize}`,
                fontFamily: "Noto Sans KR",
                color: `${theme.typoBlack}`,
                focus: { outline: "none" },
              }}
              placeholder="코로나 19 최전선에서 헌신하는 의료진을 위한 응원메시지를 남겨주세요!"
              minRows="5"
              value={comment}
              onChange={changeComment}
              maxLength="500"
            />
          </Grid>

          <Grid is_flex="space_row" border="none">
            <Grid align="left" padding="13px" bg={theme.typoLightGrey1}>
              <Text size={theme.bodyThreeSize} color={theme.typoGrey3}>
                <span>{comment?.length || 0}</span> / 500
              </Text>
            </Grid>

            <Button
              width={theme.mediumButtonWidth}
              height={theme.mediumButtonHeight}
              fontSize={theme.SubHeadOneSize}
              color={theme.white}
              bold
              _onClick={changeToTextarea}
            >
              등록
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* 일단아이콘 */}
      <Text
        color={theme.typoGrey3}
        size={theme.bodyTwoSize}
        lineHeight={theme.bodyThreeSize}
        cursor="pointer"
        _onClick={() => {
          console.log("수정");
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Text>
    </>
  );
};

export default ModifyMedical;
