import React from "react";
import moment from "moment";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../elements";
import { actionSetComment, actionDeleteComment } from "../redux/modules/comment";
import { actionConfirm, actionSetMessage } from "../redux/modules/popup";


const CommentList = (props) => {
    const dispatch = useDispatch();

    const comment_list = useSelector((state) => state.comment);
    // console.log(comment_list);
    // console.log(props)

    React.useEffect = (() => {
        dispatch(actionSetComment(comment_list));
    }, [])

    const deleteComment = () => {
        // 작성자가 나일때만 삭제 가능하게 하기
        dispatch(actionConfirm());
        // dispatch(actionSetMessage("삭제하시겠습니까?"));
        // dispatch(actionDeleteComment(props.medicalId));
    }


    return(
        <React.Fragment>
            <Grid is_flex="space_row" margin="2rem 0">

                <Grid align="left" width="12rem" margin="0 0 auto 0">
                    <Text bold size={theme.bodyTwoSize} color={theme.fontColor}>{props.nickname}</Text>
                </Grid>

                <Grid align="left">
                    <Text size={theme.bodyTwoSize}>{props.comment}</Text>
                </Grid>
                
                <Grid align="right" width="6rem" margin="0 0 auto 0">
                    <Text 
                        color={theme.typoLightGrey2}
                        size={theme.bodyTwoSize}
                        cursor="pointer"
                        // _onClick={() => {console.log("삭제!")}}
                        _onClick={deleteComment}
                    >삭제</Text>
                </Grid>

                <Grid align="right" width="8rem" margin="0 0 auto 0">
                    <Text size={theme.bodyTwoSize}>{props.insert_dt}</Text>
                </Grid>
                                
            </Grid>
        </React.Fragment>
    )
}

CommentList.defaultProps = {
    nickname: "명수는열두살",
    comment: "응원합니다!",
    insert_dt: moment().format("YYYY년 MM월 DD일 hh:mm:ss"),
}

export default CommentList;