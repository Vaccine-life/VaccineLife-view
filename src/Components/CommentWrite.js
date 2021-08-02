import React from "react";
import moment from "moment";
import 'moment/locale/ko';
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../elements";
import { actionAddComment } from "../redux/modules/comment"


const CommentWrite = (props) => {
    const dispatch = useDispatch();

    // useState사용해서 인풋의 텍스트 내용 저장
    const [comment, setComment] = React.useState();

    const changeComment = (e) => {
        setComment(e.target.value);
        // console.log(e.target.value)
        // 인풋의 onChange에 넣어주고 콘솔 찍어보기
        // 바뀌는 내용이 바로 바로 오게 만든것!
      }

    const write = () => {
        // console.log(comment);
        // 오브젝트로 넣어줘야 
        dispatch(actionAddComment({
            nickname: "명수는열두살", 
            comment, 
            insert_dt: moment().startOf('hour').fromNow()
        }));
        // 코멘트 작성 후 인풋태크에 있는 글 없애기
        setComment();
    }

    return(
        <React.Fragment>
            <Grid is_flex="space_row" margin="10px 0">
                <Grid align="left" width="10rem">
                    <Text bold>닉네임</Text>
                </Grid>

                <Grid margin="0 5rem">
                    <Input 
                        value={comment} 
                        height="150px" 
                        placeholder="응원의 한마디!"
                        maxLength="500"
                        _onChange={changeComment}
                        // 엔터키로 등록
                        onSubmit={write}
                    />
                </Grid>

                <Grid >
                    <Button width="auto" _onClick={write}>등록</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default CommentWrite;