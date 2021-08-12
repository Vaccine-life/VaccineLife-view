import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text } from "../../elements";
import { actionGetTopThree } from "../../redux/modules/board";

import theme from "../../styles/theme";
import PopularCard from "./PopularCard";
import QuarPostCard from "./QuarPostCard";

const data = {
  vacBoardId: 0,
  userId: "유저 아이디",
  title: "화이자 1차 썰 푼다",
  contents: `
    {"blocks":[{"key":"5mn","text":"화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"casvv","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"an29s","text":"이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"u0iu","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1hj8l","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cq2dr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fpkla","text":"화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다.화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다.화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4uk0a","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3922l","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"47kvs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9fk1h","text":"제가 겪을 후기를 한번 적성해보겠습니다.화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7p2lp","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"65lav","text":"화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다.화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다.화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다.화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다. 화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다.화이자 백신 1차 접종 드디어 21년 7월 28일 화이자 백신 1차 접종 마치고 오늘이 3일째 입니다. 이제 좀 살것 같네요 ㅎㅎ제가 겪을 후기를 한번 적성해보겠습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8dop3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
  `,
  likeCount: 0,
  totalVisitors: 1,
  commentCount: 0,
  createdAt: new Date("Tue Jul 27 2021 23:22:46 GMT+0900 (대한민국 표준시)"),
  modifiedAt: "Tue Jul 27 2021 23:22:46 GMT+0900 (대한민국 표준시)",

  user: {
    username: "유저 아이디",
    nickname: "닉네임",
    isVaccine: 1,
    type: "모더나",
    gender: "여",
    age: 27,
    disease: "모름",
    degree: 2,
    afterEffect: "발열 , 두통, 근육통",
  },
};

const Popular = (props) => {
  const { board } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    //  게시판 타입에 따라 디스패치 다르게 할 것
    if (board === "vaccine") {
      dispatch(actionGetTopThree("vaccine"));
    } else {
      dispatch(actionGetTopThree("quarantine"));
    }
  }, []);

  const top_list_vac = useSelector((state) => state.board.topThreeVac);
  const top_list_quar = useSelector((state) => state.board.topThreeQuar);

  return (
    <>
      <Grid is_flex="space_row" margin="auto auto 40px auto">
        <Text size={theme.headOneSize} lineHeight={theme.headOneHeight} bold>
          {board === "vaccine" ? "백신접종" : "격리후기"} 인기글
        </Text>
      </Grid>
      <Grid is_flex="space_row">
        {/* 맵돌리는 부분 카드 하나당*/}
        {board === "vaccine" &&
          top_list_vac?.map((each, index) => {
            return (
              <PopularCard
                key={index}
                board={board}
                boardId={each.vacBoardId}
                title={each.title}
                likeCount={each.likeCount}
                totalVisitors={each.totalVisitors}
                commentCount={each.commentCount}
                contents={each.contents}
                createdAt={each.createdAt}
                type={each.type}
              />
            );
          })}
        {board === "quarantine" &&
          top_list_quar?.map((each, index) => {
            return (
              <QuarPostCard
                key={index}
                board={board}
                boardId={each.quarBoardId}
                title={each.title}
                likeCount={each.likeCount}
                totalVisitors={each.totalVisitors}
                commentCount={each.commentCount}
                contents={each.contents}
                createdAt={each.createdAt}
                type={each.type}
              />
            );
          })}
      </Grid>
    </>
  );
};

Popular.defaultProps = {
  vacBoardId: -1,
  quarBoardId: -1,
};

export default Popular;
