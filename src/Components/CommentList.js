import React from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Text, Grid } from "../elements";
import MedicalConfirm from "../components/popup/MedicalConfirm";
import { actionMedicalConfirm, acionSetMedicalObj } from "../redux/modules/popup";
import displayedAt from "../shared/displayedAt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { isMobile } from "react-device-detect";


const CommentList = (props) => {
    const medi_id = props.id;

    const dispatch = useDispatch();

    const is_login = useSelector((state) => state.user.is_login);
    const userId = useSelector((state) => state.user.user.userId);
    const medical_status = useSelector((state) => state.popup.medicalConfirm);


    if(isMobile) {
        return (
            <>
            <Grid is_flex="column_left_start" margin="2rem 0" padding="0 1rem">

                <Text 
                    bold 
                    size={theme.SubHeadOneSize} 
                    color={theme.typoBlack}
                    margin="5px 0"
                    >{props.nickname}
                </Text>

                {is_login && userId === props.userId ? 
                <Text 
                    color={theme.typoLightGrey2}
                    size={theme.bodyTwoSize}
                    cursor="pointer"
                    margin="5px 0"
                    _onClick={() => {
                        dispatch(acionSetMedicalObj({medi_id}))
                        dispatch(actionMedicalConfirm());
                    }}
                ><FontAwesomeIcon icon={faTrashAlt} />
                </Text>
                : ""}
                     

                {medical_status && <MedicalConfirm 
                    confirmMessage="삭제하시겠습니까?"
                    // activeFunction={deleteComment}
                />}

                <Text 
                    size={theme.bodyTwoSize} 
                    color={theme.typoGrey2}
                    margin="5px 0"
                    >{displayedAt(props.createdAt)}
                </Text>
            
                <Text 
                    size={theme.bodyTwoSize} 
                    color={theme.typoBlack}
                    margin="5px 0"
                    >{props.contents}
                </Text>
                                
            </Grid>
            </>
        )
    }
    return(
        <React.Fragment>
            <Grid is_flex="space_row" margin="2rem 0">

                <Grid align="left" width="12rem" margin="0 0 auto 0">
                    <Text 
                        bold 
                        size={theme.SubHeadOneSize} 
                        color={theme.typoBlack}
                        >{props.nickname}
                    </Text>
                </Grid>

                <Grid align="left">
                    <Text 
                        size={theme.bodyTwoSize} 
                        color={theme.typoBlack}
                        >{props.contents}
                    </Text>
                </Grid>
                
                <Grid align="right" width="6rem" margin="0 0 auto 0">
                    {is_login && userId === props.userId ? 
                    <Text 
                        color={theme.typoLightGrey2}
                        size={theme.bodyTwoSize}
                        cursor="pointer"
                        _onClick={() => {
                            dispatch(acionSetMedicalObj({medi_id}))
                            dispatch(actionMedicalConfirm());
                        }}
                    ><FontAwesomeIcon icon={faTrashAlt} />
                    </Text>
                    : ""}
                     
                </Grid>

                {medical_status && <MedicalConfirm 
                    confirmMessage="삭제하시겠습니까?"
                    // activeFunction={deleteComment}
                />}

                <Grid align="right" width="9rem" margin="0 0 auto 0">
                    <Text 
                        size={theme.bodyTwoSize} 
                        color={theme.typoGrey2}
                        >{displayedAt(props.createdAt)}
                    </Text>
                </Grid>
                                
            </Grid>
        </React.Fragment>
    )
}

// CommentList.defaultProps = {
//     nickname: "명수는열두살",
//     comment: "응원합니다!",
//     insert_dt: moment().format("YYYY년 MM월 DD일 hh:mm:ss"),
// }

const FixedCommentList = styled.div`
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Common = styled.ul`
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    text-align: left;
    white-space: nowrap;
  }
`

export default CommentList;