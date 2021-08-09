import React from "react";
import moment from "moment";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../elements";
import { actionSetComment, actionDeleteComment, actionGetMedical } from "../redux/modules/comment";
import { actionConfirm, actionSetMessage } from "../redux/modules/popup";
import Confirm from "../components/popup/Confirm";
import displayedAt from "../shared/displayedAt";


const CommentList = (props) => {
    // console.log(props)
    const dispatch = useDispatch();

    const nickname = useSelector((state) => state.user.user.nickname)
    const comment_list = useSelector((state) => state.comment.list);
    // console.log(comment_list)

    // confirm 창
    const confirm_status = useSelector((state) => state.popup.confirm);

    // 의료진분들께 글을 작성하고 다른 페이지로 넘어가면 Object오류 뜨는 문제의 원인 발견
    // 그럼 어떻게 목록 불러오지...?
    // React.useEffect = (() => {
    //     dispatch(actionGetMedical());
    //     // dispatch(actionGetMedical(...comment_list));
    // }, [])

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
                    <Text size={theme.bodyTwoSize}>{props.comment}</Text>
                </Grid>
                
                <Grid align="right" width="6rem" margin="0 0 auto 0">
                    <Text 
                        color={theme.typoLightGrey2}
                        size={theme.bodyTwoSize}
                        cursor="pointer"
                        // _onClick={() => {console.log("삭제!")}}
                        _onClick={() => dispatch(actionConfirm())}
                    >삭제</Text>
                </Grid>

                {confirm_status && <Confirm 
                    confirmMessage="응원을 삭제하시겠습니까?"
                    activeFunction={deleteComment}
                />}

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