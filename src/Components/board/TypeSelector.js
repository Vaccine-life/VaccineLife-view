import React, { useEffect, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionSetType } from "../../redux/modules/board";
import theme from "../../styles/theme";

const TypeSelector = (props) => {
  const board_type = useSelector((state) => state.board.type);
  const dispatch = useDispatch();
  const boardTypeChanger = (type) => {
    if (type === "전체") {
      return "1";
    } else if (type === "화이자") {
      return "5";
    } else if (type === "모더나") {
      return "2";
    } else if (type === "얀센") {
      return "3";
    } else if (type === "아스트라제네카") {
      return "4";
    } else if (type === "아스트라제네카 + 화이자") {
      return "6";
    }
  };
  const [currentClick, setCurrentClick] = useState(
    boardTypeChanger(board_type)
  );
  const [prevClick, setPrevClick] = useState(null);

  useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        current.style.color = `${theme.bg2}`;
        current.style.fontWeight = "700";
        current.style.borderBottom = "2px solid";
        current.style.borderBottomColor = `${theme.bg2}`;
      }

      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.color = ` ${theme.typoBlack}`;
        prev.style.borderBottom = "none";
        prev.style.fontWeight = "400";
      }
      setPrevClick(currentClick);
    },
    [currentClick]
  );

  if (isMobileOnly) {
    return (
      <Wrapper isMobile={true}>
        <TypeBtn
          id="1"
          isMobile={true}
          onClick={(e) => {
            setCurrentClick(e.target.id);
            dispatch(actionSetType("전체"));
          }}
        >
          전체글
        </TypeBtn>
        <TypeBtn
          id="5"
          isMobile={true}
          onClick={(e) => {
            setCurrentClick(e.target.id);
            dispatch(actionSetType("화이자"));
          }}
        >
          화이자
        </TypeBtn>
        <TypeBtn
          id="2"
          isMobile={true}
          onClick={(e) => {
            setCurrentClick(e.target.id);
            dispatch(actionSetType("모더나"));
          }}
        >
          모더나
        </TypeBtn>
        <TypeBtn
          id="3"
          isMobile={true}
          onClick={(e) => {
            setCurrentClick(e.target.id);
            dispatch(actionSetType("얀센"));
          }}
        >
          얀센
        </TypeBtn>
        <TypeBtn
          id="4"
          isMobile={true}
          onClick={(e) => {
            setCurrentClick(e.target.id);
            dispatch(actionSetType("아스트라제네카"));
          }}
        >
          AZ
        </TypeBtn>
        <TypeBtn
          id="6"
          isMobile={true}
          onClick={(e) => {
            setCurrentClick(e.target.id);
            dispatch(actionSetType("아스트라제네카 + 화이자"));
          }}
        >
          AZ + PF
        </TypeBtn>
      </Wrapper>
    );
  }

  return (
    <Wrapper isMobile={false}>
      <TypeBtn
        id="1"
        isMobile={false}
        onClick={(e) => {
          setCurrentClick(e.target.id);
          dispatch(actionSetType("전체"));
        }}
      >
        전체
      </TypeBtn>
      <TypeBtn
        id="5"
        isMobile={false}
        onClick={(e) => {
          setCurrentClick(e.target.id);
          dispatch(actionSetType("화이자"));
        }}
      >
        화이자
      </TypeBtn>
      <TypeBtn
        id="2"
        isMobile={false}
        onClick={(e) => {
          setCurrentClick(e.target.id);
          dispatch(actionSetType("모더나"));
        }}
      >
        모더나
      </TypeBtn>
      <TypeBtn
        id="3"
        isMobile={false}
        onClick={(e) => {
          setCurrentClick(e.target.id);
          dispatch(actionSetType("얀센"));
        }}
      >
        얀센
      </TypeBtn>
      <TypeBtn
        id="4"
        isMobile={false}
        onClick={(e) => {
          setCurrentClick(e.target.id);
          dispatch(actionSetType("아스트라제네카"));
        }}
      >
        AZ
      </TypeBtn>
      <TypeBtn
        id="6"
        isMobile={false}
        onClick={(e) => {
          setCurrentClick(e.target.id);
          dispatch(actionSetType("아스트라제네카 + 화이자"));
        }}
      >
        AZ + PF
      </TypeBtn>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  ${(props) =>
    props.isMobile
      ? `
      display: flex;
      justify-content: flex-start;
      align-items: center;

    padding : 0 0 0 24px ;
    margin : 0 0 20px 0 ;
`
      : `
    margin : 0 0 32px 0 ;
`};
`;
const TypeBtn = styled.button`
  border: none;
  background-color: ${theme.white};
  color: ${theme.typoBlack};
  ${(props) =>
    props.isMobile
      ? `
    
       font-size: ${theme.bodyfourSize};
       padding : 0 0 3px 0;
       margin-right: 16px;

      `
      : `
      font-size: ${theme.bodyOneSize};
      margin: 0 12px 0 12px;
      padding: 0 0 6px 0;
      :hover {
        cursor: pointer;
        color: ${theme.typoLightGrey2};
      }
    
`};
`;
export default TypeSelector;
