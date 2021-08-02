import React from "react";
import moment from "moment";
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
            <Grid is_flex="space_row" align="left" margin="2rem 0">
                <Grid width="10rem">
                    <Text bold>{props.nickname}</Text>
                </Grid>

                <Grid is_flex="space_row" align="left" padding="0 0 0 10px">
                    <Text>{props.comment}</Text>
                    <Text>{props.insert_dt}</Text>
                </Grid>

                <Button 
                width="4rem" 
                margin="0 0 0 10px"
                _onClick={() => {console.log("삭제!")}}
                >삭제</Button>
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