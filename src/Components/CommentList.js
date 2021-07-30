import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../elements";
import { actionSetComment } from "../redux/modules/comment"


const Comment = (props) => {
    const dispatch = useDispatch();

    const comment_list = useSelector((state) => state.comment);
    console.log(comment_list);

    // React.useEffect = {() => {
    //     dispatch(actionSetComment());
    // }, []}

    return(
        <React.Fragment>
            <Grid is_flex="space_row" margin="20px 0">
                <Grid width="10rem" bg="#273c75" border_radius="20px">
                    <Text margin="10px" bold color="#f5f6fa">{props.nickname}</Text>
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

Comment.defaultProps = {
    nickname: "명수는열두살",
    comment: "응원합니다!",
    insert_dt: moment().startOf('day').fromNow(),
    contents: null,
}

export default Comment;