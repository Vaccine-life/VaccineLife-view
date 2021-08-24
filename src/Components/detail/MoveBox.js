import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import theme from "../../styles/theme";

import { history } from "../../redux/configStore";

import { isMobileOnly } from "react-device-detect";

const MoveBox = (props) => {
  const { board } = props;
  const page = useSelector((state) => state.board.page);

  const handleClickLeft = () => {
    if (page.prev === null) {
      return;
    }
    if (board === "vaccine") {
      history.push(`/detail/${page.prev?.id}`);
    } else {
      history.push(`/quarantinedetail/${page.prev?.id}`);
    }
  };
  const handleClickRight = () => {
    if (page.next === null) {
      return;
    }
    if (board === "vaccine") {
      history.push(`/detail/${page.next?.id}`);
    } else {
      history.push(`/quarantinedetail/${page.next?.id}`);
    }
  };

  const handleMoveTotal = () => {
    if (board === "vaccine") {
      history.push("/vaccine");
    } else {
      history.push("/quarantine");
    }
  };

  if (isMobileOnly) {
    return (
      <Wrapper>
        <Btn
          direction="left"
          onClick={handleClickLeft}
          page={page.prev === null ? false : true}
        >
          <UpperWord isMobile={true}>
            <p>{"<"} 이전글</p>
          </UpperWord>
        </Btn>

        <TextDiv isMobile={true} onClick={handleMoveTotal}>
          전체 게시글
        </TextDiv>

        <Btn
          direction="right"
          onClick={handleClickRight}
          page={page.next === null ? false : true}
        >
          <UpperWord isMobile={true}>
            <p>다음글 {">"}</p>
          </UpperWord>
        </Btn>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Btn
        direction="left"
        onClick={handleClickLeft}
        page={page.prev === null ? false : true}
      >
        <UpperWord isMobile={false}>
          <p>{"<"} 이전글</p>
        </UpperWord>
      </Btn>

      <TextDiv isMobile={false} onClick={handleMoveTotal}>
        전체 게시글
      </TextDiv>

      <Btn
        direction="right"
        onClick={handleClickRight}
        page={page.next === null ? false : true}
      >
        <UpperWord isMobile={false}>
          <p>다음글 {">"}</p>
        </UpperWord>
      </Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  border-top: 1px solid ${theme.typoGrey3};
  border-bottom: 1px solid ${theme.typoGrey3};
`;

const Btn = styled.button`
  border: none;
  background-color: ${theme.white};
  color: ${theme};
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: ${theme.bodyTwoSize};
  ${(props) =>
    props.direction === "left"
      ? `align-items: flex-start;`
      : `align-items: flex-end;

      `}
  ${(props) =>
    props.page
      ? `
  color: ${theme.typoGrey3};
  :hover {
    cursor: pointer;
    color: ${theme.typoLightGrey2};
  }
  `
      : `
   color: ${theme.typoLightGrey2};
  `}
`;

const UpperWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${(props) =>
    props.isMobile
      ? `font-size: ${theme.bodyfourSize};`
      : `font-size: ${theme.bodyTwoSize};`}
`;

const TextDiv = styled.div`
  font-size: ${theme.bodyTwoSize};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 26px;
  text-align: center;
  letter-spacing: -0.3px;
  color: ${theme.typoGrey3};
  ${(props) =>
    props.isMobile
      ? `font-size: ${theme.bodyfourSize};`
      : `font-size: ${theme.bodyTwoSize};`}
  :hover {
    cursor: pointer;
    text-decoration: underline;
    text-underline-position: under;
    color: ${theme.typoLightGrey2};
  }
`;

export default MoveBox;
