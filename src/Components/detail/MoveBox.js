import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid } from "../../elements";
import theme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { history } from "../../redux/configStore";

const MoveBox = (props) => {
  const { boardType } = props;
  const page = useSelector((state) => state.board.page);

  const handleClickLeft = () => {
    if (page.prev === undefined) {
      return;
    }
    if (boardType) {
      history.push(`/detail/${page.prev?.vacBoardId}`);
    } else {
      history.push(`/quarantinedetail/${page.prev?.quarBoardId}`);
    }
  };
  const handleClickRight = () => {
    if (page.next === undefined) {
      return;
    }
    if (boardType) {
      history.push(`/detail/${page.next?.vacBoardId}`);
    } else {
      history.push(`/quarantinedetail/${page.next?.quarBoardId}`);
    }
  };

  return (
    <Wrapper>
      <Btn
        direction="left"
        onClick={handleClickLeft}
        page={page.prev === undefined ? false : true}
      >
        <UpperWord>
          <FontAwesomeIcon icon={faChevronLeft} />
          <p>이전글</p>
        </UpperWord>
      </Btn>
      <Btn
        direction="right"
        onClick={handleClickRight}
        page={page.next === undefined ? false : true}
      >
        <UpperWord>
          <p>다음글</p>
          <FontAwesomeIcon icon={faChevronRight} />
        </UpperWord>
      </Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 60px;
  border-top: 1px solid ${theme.typoGrey3};
  border-bottom: 1px solid ${theme.typoGrey3};
`;

const Btn = styled.button`
  width: 200px;
  border: none;
  background-color: white;
  color: ${theme};
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${(props) =>
    props.direction === "left"
      ? `align-items: flex-start;`
      : `align-items: flex-end;
      margin: 0 0 0 auto;
      `}

  font-size: ${theme.bodyOneSize};
  font-weight: 700;
  ${(props) =>
    props.page
      ? `
  color: ${theme.typoGrey3};
  :hover {
    cursor: pointer;
    color: ${theme.btnColor};
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
`;

export default MoveBox;
