import React from "react";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Text, Grid } from "../elements";
import { actionDeleteComment, actionDeleteMedical } from "../redux/modules/comment";
import MedicalConfirm from "../components/popup/MedicalConfirm";
import { actionConfirm, actionSetMessage, acionSetCommentObj, actionMedicalConfirm,} from "../redux/modules/popup";
import displayedAt from "../shared/displayedAt";


const CommentList = (props) => {
    console.log(props)
    const { medicalId } = props;
    const dispatch = useDispatch();

    const confirm_status = useSelector((state) => state.popup.confirm);
    const is_login = useSelector((state) => state.user.is_login);
    const userId = useSelector((state) => state.user.user.userId);

    // const medicalId = useSelector((state) => state.comment.list);
    // console.log(medicalId)

    const deleteComment = () => {
        dispatch(actionDeleteMedical(props.id));
        // dispatch(actionDeleteMedical({medicalId}));
    }


    return(
        <React.Fragment>
            <Grid is_flex="space_row" margin="2rem 0">

                <Grid align="left" width="12rem" margin="0 0 auto 0">
                    <Text bold size={theme.bodyTwoSize} color={theme.fontColor}>{props.nickname}</Text>
                </Grid>

                <Grid align="left">
                    <Text size={theme.bodyTwoSize}>{props.contents}</Text>
                </Grid>
                
                <Grid align="right" width="6rem" margin="0 0 auto 0">
                    {is_login && userId === props.userId ? 
                    <Text 
                        color={theme.typoLightGrey2}
                        size={theme.bodyTwoSize}
                        cursor="pointer"
                        _onClick={() => {
                            dispatch(acionSetCommentObj({ medicalId }));
                            dispatch(actionMedicalConfirm());
                        }}
                    >삭제</Text>
                    : ""}
                    
                </Grid>

                {confirm_status && <MedicalConfirm 
                    confirmMessage="삭제하시겠습니까?"
                    activeFunction={deleteComment}
                />}

                <Grid align="right" width="9rem" margin="0 0 auto 0">
                    <Text size={theme.bodyTwoSize}>{displayedAt(props.createdAt)}</Text>
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

export default CommentList;