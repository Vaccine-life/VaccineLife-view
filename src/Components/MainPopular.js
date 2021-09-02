import React, { useEffect } from "react";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import { actionGetTopThree } from "../redux/modules/board";
import PopularCard from "./board/PopularCard";
import QuarPostCard from "./board/QuarPostCard";
import Slider from "./mobile/board/Silder";
import styled from "styled-components";
import theme from "../styles/theme";
import Arrow from "../images/Arrow.png";

// MainPopular: 백신접종후기/자가격리후기 인기글

const MainPopular = (props) => {
  const { board } = props;
  const dispatch = useDispatch();
  // 후기 탑3 dispatch 해주기
  // board==="vaccine"이 True면 백신후기 Top3가 나오고, False면 격리후기 Top3가 나옴 
  useEffect(() => {
    //  게시판 타입에 따라 디스패치 다르게 하기
    dispatch(actionGetTopThree("vaccine"));
    dispatch(actionGetTopThree("quarantine"));
  }, []);
  const top_list_vac = useSelector((state) => state.board.topThreeVac);
  const top_list_quar = useSelector((state) => state.board.topThreeQuar);

  // 모바일의 경우
  if (isMobileOnly) {
    return (
      <>
        <MainPopularWrapperMobile>
          <GreyBoxMobile>
            <PopularTitleMobile>
              <h1>백신 접종 후기 인기글</h1>
              <h3
                onClick={() => {
                  history.push("/vaccine");
                }}
              >
                더보기
              </h3>
            </PopularTitleMobile>
            <Slider
              board="vaccine"
              top_list_vac={top_list_vac}
              top_list_quar={top_list_quar}
            />
            <PopularTitleMobile style={{ marginTop: "32px" }}>
              <h1>자가 격리 후기 인기글</h1>
              <h3
                onClick={() => {
                  history.push("/vaccine");
                }}
              >
                더보기
              </h3>
            </PopularTitleMobile>
            <Slider
              board="quarantine"
              top_list_vac={top_list_vac}
              top_list_quar={top_list_quar}
            />
          </GreyBoxMobile>
        </MainPopularWrapperMobile>
      </>
    );
  }

  // 웹의 경우
  return (
    <div style={{ marginTop: "90px" }}>
      <GreyBox>
        <PopularTitle>
          <h1 style={{ fontFamily: "Noto Sans KR" }}>백신 접종 후기 인기글</h1>
          <div>
            <h3
              onClick={() => {
                history.push("/vaccine");
              }}
            >
              더보기
            </h3>
            <img src={Arrow} alt="" />
          </div>
        </PopularTitle>
        <PopularCards>
          {board === "vaccine" &&
            top_list_vac?.map((each, index) => {
              return (
                <div>
                  <PopularCard
                    key={index}
                    board="vaccine"
                    boardId={each.vacBoardId}
                    title={each.title}
                    likeCount={each.likeCount}
                    totalVisitors={each.totalVisitors}
                    commentCount={each.commentCount}
                    contents={each.contents}
                    createdAt={each.createdAt}
                    type={each.type}
                  />
                </div>
              );
            })}
        </PopularCards>
      </GreyBox>

      <GreyBox>
        <PopularTitle>
          <h1 style={{ fontFamily: "Noto Sans KR" }}>자가격리 후기 인기글</h1>
          <div>
            <h3
              onClick={() => {
                history.push("/quarantine");
              }}
            >
              더보기
            </h3>
            <img src={Arrow} alt="" />
          </div>
        </PopularTitle>
        <PopularCards>
          {top_list_quar?.map((each, index) => {
            return (
              <div>
                <QuarPostCard
                  key={index}
                  board="quarantine"
                  boardId={each.quarBoardId}
                  title={each.title}
                  likeCount={each.likeCount}
                  totalVisitors={each.totalVisitors}
                  commentCount={each.commentCount}
                  contents={each.contents}
                  createdAt={each.createdAt}
                  type={each.type}
                />
              </div>
            );
          })}
        </PopularCards>
      </GreyBox>
    </div>
  );
};


// styled-components

// <========= 웹 =========>
// GreyBox: 현 컴포넌트를 감싸고 있는 회색div
const GreyBox = styled.div`
  background-color: ${theme.typoLightGrey1};
  width: 100%;
  height: 550px;
`;

// PopularTitle: 백신 접종후기 인기글(h1), 더보기>(div)
const PopularTitle = styled.div`
  display: flex;
  width: 1250px;
  justify-content: space-between;
  margin: auto;
  padding-bottom: 20px;
  & > h1 {
    width: 212px;
    white-space: nowrap;
    height: 34px;
    font-weight: bold;
    font-size: ${theme.headOneSize};
    line-height: 34px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
    padding-top: 5%;
  }
  & > div {
    display: flex;
    cursor: pointer;
    margin-top: 6%;
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
      color: ${theme.typoGrey1};
    }
    & > h3 {
      width: 60px;
      height: 26px;
      font-weight: normal;
      font-size: ${theme.bodyOneSize};
      line-height: 26px;
      text-align: center;
      letter-spacing: -0.3px;
      color: ${theme.typoGrey3};
    }
    & > img {
      width: auto;
      height: auto;
      max-width: 15px;
      max-height: 15px;
      margin-top: 7px;
      margin-left: 8px;
    }
  }
`;

// PopularCards: 인기글 카드3개
const PopularCards = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1250px;
  height: 66%;
  margin: auto;
`;


// <========= Mobile ===========>

const MainPopularWrapperMobile = styled.div`
  width: 100%;
`;

const GreyBoxMobile = styled.div`
  background-color: ${theme.typoLightGrey1};
  height: 640px;
  margin-top: 48px;
  padding-top: 32px;
`;

const PopularTitleMobile = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  justify-content: space-between;
  & > h1 {
    width: max-content;
    height: 34px;
    font-weight: bold;
    font-size: ${theme.SubHeadOneSize};
    line-height: 34px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
  & > h3 {
    width: 50px;
    height: 34px;
    font-weight: normal;
    font-size: ${theme.bodyThreeSize};
    line-height: 34px;
    text-align: center;
    letter-spacing: -0.3px;
    color: ${theme.typoGrey3};
  }
`;

export default MainPopular;
