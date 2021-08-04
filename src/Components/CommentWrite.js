import React from "react";
import moment from "moment";
import 'moment/locale/ko';
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../elements";
import { actionAddComment } from "../redux/modules/comment"


const CommentWrite = (props) => {
    const dispatch = useDispatch();

    // useState사용해서 인풋의 텍스트 내용 저장
    const [comment, setComment] = React.useState();
    const [length, setLength] = React.useState(0);

    const changeComment = (e) => {
        setComment(e.target.value);
        // console.log(e.target.value)
        // 인풋의 onChange에 넣어주고 콘솔 찍어보기
        // 바뀌는 내용이 바로 바로 오게 만든것!

        // 현재 글자 수
        const getTextLength = (str) => {
            let len = 0;
            for (let i = 0; i < str.length; i++) {
              if (escape(str.charAt(i)).length === 6) {
                len++;
              }
              len++;
            }
            console.log(len);
            setLength(len);
          };
          getTextLength(e.target.value);
    }


    // 몇 분 전(axios로 이어서 시간변화 확인필요)
    function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    const write = () => {
        // 오브젝트로 넣어줘야 
        dispatch(actionAddComment({
            nickname: "명수는열두살", 
            comment, 
            // insert_dt: moment().startOf('hour').fromNow(),
            insert_dt: timeForToday(moment().format())
        }));
        // 코멘트 작성 후 인풋태크에 있는 글 없애기
        setComment();
        setLength(0);
    }
    console.log(comment)
    
    return(
        <React.Fragment>
            {/* <div style={{display:"inline-block" ,verticalAlign:"top"}}> */}
            <Grid is_flex="space_row" margin="10px 0" width={theme.medicalWidth}>

                <Grid align="left" width="10rem" margin="0 0 auto 0">
                    <Text bold size={theme.bodyTwoSize} color={theme.fontColor}>{props.nickname}</Text>
                </Grid>

                <Grid is_flex="space_column" border="1px solid #c1c1c1">
                    <Grid margin="0 5rem">
                        <Input 
                            multiLine
                            border="none"
                            value={comment} 
                            placeholder="응원의 한마디!"
                            maxLength="500"
                            _onChange={changeComment}
                            // 엔터키로 등록
                            onSubmit={write}
                        />
                    </Grid>

                    <Grid is_flex="space_row" border="none">
                        <Grid padding="10px" bg="#ffffff" align="right">
                            <Text><span>{length}</span> / 1000(byte)</Text>
                        </Grid>

                        <Button width="50px" height="34px" _onClick={write}>등록</Button>
                    </Grid>
                </Grid>
                
            </Grid>
            {/* </div> */}
        </React.Fragment>
    )
}

CommentWrite.defaultProps = {
    nickname: "명수는열두살",
}

export default CommentWrite;