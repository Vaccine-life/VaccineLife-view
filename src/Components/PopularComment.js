import React from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text } from "../elements";

import MedicalConfirm from "../components/popup/MedicalConfirm";
import { actionMedicalConfirm, acionSetMedicalObj } from "../redux/modules/popup";
import displayedAt from "../shared/displayedAt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import LikeIconMedi from "./LikeIconMedi";
import { isMobile } from "react-device-detect";


const PopularComment = (props) => {
  console.log(props)
  const dispatch = useDispatch();

  return (
    <>
      <Grid align="left">
        <Text 
          size={theme.headTwoSize} 
          lineHeight={theme.headOneHeight} 
          bold
        >인기응원글
        </Text>
      </Grid>

      <PopularCommentItem/>
    </>
  )
}

export default PopularComment;

const PopularCommentItem = (props) => {
  const { contents, likeCount, createdAt, boardId } = props;
  const medi_id = props.id;
  console.log(props)

  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const userId = useSelector((state) => state.user.user.userId);
  const medical_status = useSelector((state) => state.popup.medicalConfirm);
  

  return (
    <>
      <Grid is_flex="column_left_start" margin="4rem 0">
        <CommentHead>
          <Grid align="left" width="10rem" padding="1rem 0.5rem">
            <Text 
              bold
              size={theme.SubHeadTwoSize}
              lineHeight={theme.SubHeadTwoHeight}
              color={theme.bg2}
              >{props.nickname}
            </Text>
          </Grid>

          <Grid align="left" width="9rem">
            {is_login && userId === props.userId ? 
            <Text 
              color={theme.typoGrey3}
              size={theme.bodyTwoSize}
              lineHeight={theme.bodyThreeSize}
              cursor="pointer"
              _onClick={() => {
                  dispatch(acionSetMedicalObj({medi_id}))
                  dispatch(actionMedicalConfirm());
              }}
            ><FontAwesomeIcon icon={faTrashAlt}/>
            </Text>
            : ""}
          </Grid>

          <Grid is_flex="center" margin="0 0 0 11px">
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
          </Grid>

          <Grid align="right" margin="auto 0.5rem">
            <Text 
              size={theme.bodyfourSize} 
              color={theme.typoGrey1}
              >{displayedAt(props.createdAt)}
            </Text>
          </Grid>
        </CommentHead>

        <Grid align="left" padding="1rem 0.5rem">
          <Text 
            size={theme.bodyThreeSize} 
            lineHeight={theme.bodyThreeHeight}
            color={theme.typoBlack}
            >{props.contents}
          </Text>
        </Grid>

        {medical_status && <MedicalConfirm 
          confirmMessage="삭제하시겠습니까?"
        />}
                        
      </Grid>
    </>
  )
}

PopularCommentItem.dafaultProps = {
  
};

const CommentHead = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border-top: 2px solid ${theme.typoGrey2};
  border-bottom: 1px solid ${theme.typoLightGrey2};
  align-items: center;
`
