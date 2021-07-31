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
    <Grid is_flex="space_row">
      <Btn direction="left" onClick={handleClickLeft}>
        <UpperWord>
          <FontAwesomeIcon icon={faChevronLeft} />
          <p>이전글</p>
        </UpperWord>
        <p>
          {page.prev !== undefined
            ? `${page.prev.title}`
            : "게시글이 존재하지 않습니다."}
        </p>
      </Btn>
      <Btn direction="right" onClick={handleClickRight}>
        <UpperWord>
          <p>다음글</p>
          <FontAwesomeIcon icon={faChevronRight} />
        </UpperWord>
        <p>
          {" "}
          {page.next !== undefined
            ? `${page.next.title}`
            : "게시글이 존재하지 않습니다."}
        </p>
      </Btn>
    </Grid>
  );
};

const Btn = styled.button`
  font-size: 15px;
  font-weight: 600;
  color: white;
  width: 200px;
  border: none;
  background-color: ${theme.btnColor};
  color: ${theme};
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${(props) =>
    props.direction === "left"
      ? `align-items: flex-start;`
      : `align-items: flex-end;`}

  :hover {
    cursor: pointer;
    color: ${theme.btnColor};
    border: 1px solid ${theme.btnColor};
    background-color: white;
  }
`;

const UpperWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MoveBox;
