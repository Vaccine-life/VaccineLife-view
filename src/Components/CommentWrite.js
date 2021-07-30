import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../elements";
import { actionAddComment } from "../redux/modules/comment"


const Comment = (props) => {
    const dispatch = useDispatch();
    // console.log(props);

    // useState사용해서 인풋의 텍스트 내용 저장
    const [comment, setComment] = React.useState();

    const changeComment = (e) => {
        setComment(e.target.value);
        // 인풋의 onChange에 넣어주고 콘솔 찍어보기
        // 바뀌는 내용이 바로 바로 오게 만든것!
      }

    const write = () => {
        // console.log(comment);
        dispatch(actionAddComment());
        // 코멘트 작성 후 인풋태크에 있는 글 없애기
        setComment();
    }

    return(
        <React.Fragment>
            <Input 
                value={comment} 
                height="100px" 
                placeholder="응원의 한마디!"
                _onChange={changeComment}
                // 엔터키로 등록
                onSubmit={write}
            />
            <Grid align="right">
                <Button 
                width="3rem" 
                _onClick={write}
                >등록</Button>
            </Grid>
        </React.Fragment>
    )
}

Comment.defaultProps = {
    nickname: "명수는열두살",
    comment: "응원합니다!",
    insert_dt: moment().startOf('day').fromNow(),
}

export default Comment;