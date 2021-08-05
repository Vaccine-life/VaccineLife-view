import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import PopularCard from "./board/PopularCard";
import Arrow from "../images/Arrow.png";

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

const MainPopular = (props) => {
    // 백신 접종 후기 탑3 dispatch 해주기
    // 추후 격리용으로 재사용시 참고하기: board==="vaccine"이 true면 백신top3가 나오는거고 false면 격리top3 나오는거
    const { board } = props;
    const {
        vacBoardId,
        title,
        contents,
        likeCount,
        totalVisitors,
        commentCount,
        createdAt,
        user,
    } = data;
    return (
        <div>
            <GreyBox>

                <PopularTitle>
                    <h1>백신 접종 후기 인기글</h1>
                    <h3>더보기</h3>
                    <img src={Arrow} alt="" />
                </PopularTitle>

                <PopularCards>
                    <PopularCard
                        board={board}
                        vacBoardId={vacBoardId}
                        title={title}
                        contents={contents}
                        likeCount={likeCount}
                        totalVisitors={totalVisitors}
                        commentCount={commentCount}
                        createdAt={createdAt}
                        user={user}
                    />
                    <PopularCard
                        board={board}
                        vacBoardId={vacBoardId}
                        title={title}
                        contents={contents}
                        likeCount={likeCount}
                        totalVisitors={totalVisitors}
                        commentCount={commentCount}
                        createdAt={createdAt}
                        user={user}
                    />
                    <PopularCard
                        board={board}
                        vacBoardId={vacBoardId}
                        title={title}
                        contents={contents}
                        likeCount={likeCount}
                        totalVisitors={totalVisitors}
                        commentCount={commentCount}
                        createdAt={createdAt}
                        user={user}
                    />
                </PopularCards>

            </GreyBox>
        </div>
    )
}

const GreyBox = styled.div`
    background-color: ${theme.typoLightGrey1};
    width: 100vw;
    height: 630px;
    margin-top: 90px;
`

const PopularTitle = styled.div`
    display : flex;

    & > h1 {
        width: 212px;
        height: 34px;

        font-weight: bold;
        font-size: ${theme.headOneSize};
        line-height: 34px;

        text-align: center;
        letter-spacing: -0.3px;

        color: #242424;

        padding-top: 96px; 
        padding-left: 290px;
    }

    & > h3 {
        width: 50px;
        height: 26px;

        font-weight: normal;
        font-size: ${theme.bodyOneSize};
        line-height: 26px;

        text-align: center;
        letter-spacing: -0.3px;

        color: ${theme.typoGrey3};

        padding-left: 55%;
        padding-top: 108px;
        
    }

    & > img {
        width: auto;
        height: auto;
        max-width: 15px;
        max-height: 15px;

        padding-left: 10px;
        padding-top: 115px;
    }
`

const PopularCards = styled.div`
    display: flex;
    margin-left: 250px;
    margin-right: 250px;

    padding-top: 40px;
`

export default MainPopular;
