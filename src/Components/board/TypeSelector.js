import React, { useEffect, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { actionSetType } from "../../redux/modules/board";

const TypeSelector = (props) => {
  const [currentClick, setCurrentClick] = useState(null);
  const [prevClick, setPrevClick] = useState(null);

  const dispatch = useDispatch();

  useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        current.style.color = "black";
        current.style.borderBottom = "2px solid";
        current.style.borderBottomColor = "#1c28f4";
      }

      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.color = "#bebcbc";
        prev.style.borderBottom = "none";
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
        전체글
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
const Wrapper = styled.div``;
const TypeBtn = styled.button``;
export default TypeSelector;
