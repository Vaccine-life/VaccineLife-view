import React from "react";
import moment from "moment";

import { Input, Text, Button, Grid } from "../elements";


const Comment = (props) => {

    return(
        <React.Fragment>
            <Input value={props.contents} height="100px" placeholder="응원의 한마디!"/>
            <Grid align="right">
                <Button width="3rem">등록</Button>
            </Grid>

            <Grid is_flex="space_row" margin="20px 0">
                <Grid width="10rem" bg="#273c75" border_radius="20px">
                    <Text margin="10px" bold color="#f5f6fa">{props.nickname}</Text>
                </Grid>

                <Grid is_flex="space_row" align="left" padding="0 0 0 10px">
                    <Text>{props.comment}</Text>
                    <Text>{props.insert_dt}</Text>
                </Grid>

                <Button width="4rem" margin="0 0 0 10px">삭제</Button>
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