import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import "draft-js/dist/Draft.css";
import { convertFromRaw } from "draft-js";
import { Editor, EditorState } from "draft-js";
import { Grid, Text } from "../../elements";
import logger from "../../shared/logger";
import LikeIconChanger from "../LikeIconChanger";
import { isMobileOnly } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { actionPostLike } from "../../redux/modules/like";

const Contents = (props) => {
  // console.log(props)
  const { contents, board, boardId, likeCount } = props;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.userId);
  // 클릭했을때 색 변경 추가할것
  const likeObj =
    board === "vaccine"
      ? {
          vacBoardId: parseInt(boardId),
          userId: parseInt(userId),
        }
      : {
          quarBoardId: parseInt(boardId),
          userId: parseInt(userId),
        };
  logger(contents);
  const handleLikeClick = () => {
    if (
      likeObj.userId === null ||
      likeObj?.vacBoardId === null ||
      likeObj?.quarBoardId === null
    ) {
      return;
    }
    dispatch(actionPostLike(board, likeObj));
  };
  if (isMobileOnly) {
    return (
      <WrapperM>
        {board === "vaccine" && (
          <Grid
            is_flex="column_left_start"
            height="120px"
            bg={theme.bg4}
            margin="0 0 67px 0"
            padding="0 0 0 29px"
          >
            <Text
              lineHeight={theme.bodyfourHeight}
              size={theme.bodyfourSize}
              bold
            >
              주의사항
            </Text>
            <Text
              lineHeight={theme.bodyfourHeight}
              size={theme.bodyfourSize}
              margin="0"
            >
              * 증상이 수 일 지속될 시 가까운 병원에 내원하십시오.
            </Text>
            <Text lineHeight={theme.bodyfourHeight} size={theme.bodyfourSize}>
              * 특정 병원 이름 언급시 무통보 삭제될 수 있습니다.
            </Text>
          </Grid>
        )}
        <ContentDiv
          isMobile={true}
          dangerouslySetInnerHTML={{ __html: contents }}
        ></ContentDiv>
        <LikeWrapperM onClick={handleLikeClick}>
          <LikeIconChanger
            board={board}
            boardId={boardId}
            size="1x"
            bigHeart
            inBoard={true}
          />
          <p
            style={{
              fontSize: `${theme.bodyTwoSize}`,
              marginBottom: "3px",
              marginLeft: "5.55px",
              fontWeight: "500",
              color: `${theme.btnColor}`,
            }}
          >
            {likeCount}
          </p>
        </LikeWrapperM>
      </WrapperM>
    );
  }

  return (
    <Wrapper>
      {board === "vaccine" && (
        <Grid
          is_flex="column_left_start"
          height="120px"
          bg={theme.bg4}
          margin="0 0 67px 0"
          padding="0 0 0 29px"
        >
          <Text lineHeight={theme.bodyTwoHeight} size={theme.bodyTwoSize} bold>
            주의사항
          </Text>
          <Text
            lineHeight={theme.bodyTwoHeight}
            size={theme.bodyTwoSize}
            margin="0"
          >
            * 증상이 수 일 지속될 시 가까운 병원에 내원하십시오.
          </Text>
          <Text lineHeight={theme.bodyTwoHeight} size={theme.bodyTwoSize}>
            * 특정 병원 이름 언급시 무통보 삭제될 수 있습니다.
          </Text>
        </Grid>
      )}
      <ContentDiv
        isMobile={false}
        dangerouslySetInnerHTML={{ __html: contents }}
      ></ContentDiv>
      <LikeWrapper>
        {/* <LikeIconChanger board={board} boardId={boardId} size="lg" bigHeart />
        <p
          style={{
            fontSize: `${theme.headTwoSize}`,
            marginBottom: "3px",
            marginLeft: "5.55px",
            fontWeight: "500",
            color: `${theme.btnColor}`,
          }}
        >
          {likeCount}
        </p> */}
        <LikeBtn onClick={handleLikeClick}>
          <LikeIconChanger
            board={board}
            boardId={boardId}
            size="lg"
            bigHeart
            inBoard={true}
          />
          <p
            style={{
              fontSize: `${theme.headTwoSize}`,
              marginLeft: "5.55px",
              fontWeight: "700",
              color: `${theme.bg}`,
            }}
          >
            {likeCount}
          </p>
        </LikeBtn>
      </LikeWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 15px 0 15px 0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  .public-DraftEditor-content {
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  }
`;
const WrapperM = styled.div`
  margin: 23px 0 0 0;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  .public-DraftEditor-content {
    padding: 0 16px 0 16px;
    font-size: ${theme.bodyfourSize};
    line-height: ${theme.bodyfourHeight};
  }
`;

const ContentDiv = styled.div`
  padding: 0 16px 0 16px;
  text-align: start;
  ${(props) =>
    props.isMobile
      ? `
    font-size: ${theme.bodyfourSize};
    line-height: ${theme.bodyfourHeight};
  `
      : `
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  `}
`;

const LikeWrapper = styled.div`
  width: ${theme.mediumButtonWidth};
  height: ${theme.mediumButtonHeight};
  display: flex;
  margin: 87px auto 45px auto;
  font-size: ${theme.SubHeadOneSize};
  line-height: ${theme.SubHeadOneHeight};
`;

const LikeWrapperM = styled.div`
  width: ${theme.smallButtonWidth};
  height: ${theme.headOneHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px auto 25px auto;
  font-size: ${theme.SubHeadTwoSize};
  line-height: ${theme.SubHeadTwoHeight};
  border: 1.5px solid ${theme.btnColor};
`;

const LikeBtn = styled.button`
  width: ${theme.mediumButtonWidth};
  height: ${theme.mediumButtonHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.white};
  border: 1.5px solid ${theme.btnColor};
  :hover {
    cursor: pointer;
    font-size: ${theme.headTwoSize};
  }
`;

export default Contents;

//<h3>안녕하세요&nbsp;'슬기로운 백신생활'&nbsp;입니다!!</h3><h3><br></h3><h3>오늘도 ‘슬기로운 백신생활’을 이용해주셔서 감사합니다.</h3><h3><br></h3><h3>&nbsp;이번달 26일을 시작으로 18세~49세까지의 백신 접종이 이루어지고 있는데요, 미리 잔여백신으로 맞으신 분들도 많으시죠!</h3><h3>감사하게도 많은 분들이 이미 후기 남겨주고 계신데요, 그런 마음을 담아 저희가 자그마한 이벤트를 준비했어요🥳🎉</h3><p><br></p><p><br></p><h2>글 남겨주신 분들께는 추첨을 통해 기프티콘을 드리는 이벤트를 진행하려 합니다!<img src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-medium/1f606.png" alt=":입벌리고_웃고_있는_얼굴:"></h2><p><br></p><p><br></p><ul><li><u>사은품: 스타벅스 아메리카노(1인 1매)</u></li></ul><h3><br></h3><ul><li>추첨인원: 30명</li></ul><h3><br></h3><ul><li>이벤트 기간 : 08/29(일) 09시 ~ 09/04(토) 00시</li></ul><h3><br></h3><ul><li>응모방법 :</li></ul><h3><br></h3><p>1. 백신후기 또는 격리후기 남기기</p><h3>2. <u>	</u> <u>→ 구글폼 링크로 아이디, 닉네임, 글제목, 이메일 남기기</u></h3><p><a href="https://docs.google.com/forms/d/e/1FAIpQLSfzTdkAAEKpOF1tEzlcNMGrS0Y6Kh0JhJjj4MCFtCk9DL0nhQ/viewform" rel="noopener noreferrer" target="_blank">이벤트 응모하러가기</a></p><h3><br></h3><h3><br></h3><h3><br></h3><ul><li>당첨자 발표 날짜: <u> 09/04(토) 15:00</u></li></ul><h3><u> → 슬기로운 백신생활 공지문으로 발표</u></h3><p><br></p><p><br></p><p><br></p><p><br></p><p>생생한 후기 남겨주시고 스타벅스 아메리카노도 받아가세요!</p><p>조금 더 편리한 서비스 제공을 위해 힘쓰겠습니다.</p><p><br></p><p>모두 건강 유의하시기 바랍니다.</p><p>감사합니다!</p><p><br></p><p><br></p><p>**욕설 및 혐오발언은 무통보 삭제될 수 있습니다.</p><p>Contact. quokkalee654@gmail.com</p>
//<h3>안녕하세요&nbsp;'슬기로운 백신생활'&nbsp;입니다!!</h3><h3><br></h3><h3>오늘도 ‘슬기로운 백신생활’을 이용해주셔서 감사합니다.</h3><h3><br></h3><h3>&nbsp;이번달 26일을 시작으로 18세~49세까지의 백신 접종이 이루어지고 있는데요, 미리 잔여백신으로 맞으신 분들도 많으시죠!</h3><h3>감사하게도 많은 분들이 이미 후기 남겨주고 계신데요, 그런 마음을 담아 저희가 자그마한 이벤트를 준비했어요🥳🎉</h3><p><br></p><p><br></p><h2>글 남겨주신 분들께는 추첨을 통해 기프티콘을 드리는 이벤트를 진행하려 합니다!<img src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-medium/1f606.png" alt=":입벌리고_웃고_있는_얼굴:"></h2><p><br></p><p><br></p><ul><li><u>사은품: 스타벅스 아메리카노(1인 1매)</u></li></ul><h3><br></h3><ul><li>추첨인원: 30명</li></ul><h3><br></h3><ul><li>이벤트 기간 : 08/29(일) 09시 ~ 09/04(토) 00시</li></ul><h3><br></h3><ul><li>응모방법 :</li></ul><h3><br></h3><p>1. 백신후기 또는 격리후기 남기기</p><h3>2. <u>	</u> <u>→ 구글폼 링크로 아이디, 닉네임, 글제목, 이메일 남기기</u></h3><p><a href="https://docs.google.com/forms/d/e/1FAIpQLSfzTdkAAEKpOF1tEzlcNMGrS0Y6Kh0JhJjj4MCFtCk9DL0nhQ/viewform" rel="noopener noreferrer" target="_blank">https://docs.google.com/forms/d/e/1FAIpQLSfzTdkAAEKpOF1tEzlcNMGrS0Y6Kh0JhJjj4MCFtCk9DL0nhQ/viewform</a></p><h3><br></h3><h3><br></h3><h3><br></h3><ul><li>당첨자 발표 날짜: <u> 09/04(토) 15:00</u></li></ul><h3><u> → 슬기로운 백신생활 공지문으로 발표</u></h3><p><br></p><p><br></p><p><br></p><p><br></p><p>생생한 후기 남겨주시고 스타벅스 아메리카노도 받아가세요!</p><p>조금 더 편리한 서비스 제공을 위해 힘쓰겠습니다.</p><p><br></p><p>모두 건강 유의하시기 바랍니다.</p><p>감사합니다!</p><p><br></p><p><br></p><p>**욕설 및 혐오발언은 무통보 삭제될 수 있습니다.</p><p>Contact. quokkalee654@gmail.com</p>
