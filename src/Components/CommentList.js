import React from "react";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Text, Grid } from "../elements";
import { actionDeleteComment } from "../redux/modules/comment";
import { actionConfirm } from "../redux/modules/popup";
import Confirm from "../components/popup/Confirm";
import displayedAt from "../shared/displayedAt";


const CommentList = (props) => {
    // console.log(props)
    const dispatch = useDispatch();

    const nickname = useSelector((state) => state.user.user.nickname)
    // confirm 창
    const confirm_status = useSelector((state) => state.popup.confirm);

    const deleteComment = () => {
        // 작성자가 나일때만 삭제 가능하게 하기
        dispatch(actionDeleteComment());
    }


    return(
        <React.Fragment>
            <Grid is_flex="space_row" margin="2rem 0">

                <Grid align="left" width="12rem" margin="0 0 auto 0">
                    <Text bold size={theme.bodyTwoSize} color={theme.fontColor}>{nickname}</Text>
                </Grid>

                <Grid align="left">
                    <Text size={theme.bodyTwoSize}>{props.contents}</Text>
                </Grid>
                
                <Grid align="right" width="6rem" margin="0 0 auto 0">
                    <Text 
                        color={theme.typoLightGrey2}
                        size={theme.bodyTwoSize}
                        cursor="pointer"
                        _onClick={() => dispatch(actionConfirm())}
                    >삭제</Text>
                </Grid>

                {confirm_status && <Confirm 
                    confirmMessage="응원을 삭제하시겠습니까?"
                    activeFunction={deleteComment}
                />}

                <Grid align="right" width="8rem" margin="0 0 auto 0">
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