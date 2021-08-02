import React from "react";
import moment from "moment";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../elements";
import { actionSetComment } from "../redux/modules/comment"


const CommentList = (props) => {
    const dispatch = useDispatch();

    const comment_list = useSelector((state) => state.comment);
    // console.log(comment_list);
    // console.log(props)

    React.useEffect = (() => {
        dispatch(actionSetComment(comment_list));
    }, [])

    return(
        <React.Fragment>
            <Grid is_flex="space_row" margin="2rem 0">

                <Grid align="left" width="12rem">
                    <Text bold size={theme.bodyTwoSize} color={theme.fontColor}>{props.nickname}</Text>
                </Grid>

                <Grid align="left">
                    <Text size={theme.bodyTwoSize}>{props.comment}</Text>
                </Grid>
                
                <Grid align="right" width="6rem">
                    <Text 
                        color={theme.typoLightGrey2}
                        size={theme.bodyTwoSize}
                        cursor="pointer"
                        _onClick={() => {console.log("삭제!")}}
                    >삭제</Text>
                </Grid>

                <Grid align="right" width="8rem">
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