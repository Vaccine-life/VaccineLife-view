import React, { useEffect } from "react";
import { history } from "../../redux/configStore";
import { Button, Grid, Text } from "../../elements";
import theme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { actionAlert, actionSetMessage } from "../../redux/modules/popup";
import { isMobileOnly } from "react-device-detect";
import styled from "styled-components";
import TypeSelector from "./TypeSelector";

const ListNav = (props) => {
  const { board } = props;
  const is_login = useSelector((state) => state.user.is_login);
  const is_vaccine = useSelector((state) => state.user.user.isVaccine);
  const board_type = useSelector((state) => state.board.type);

  const NameChanger = (type) => {
    if (type === "전체") {
      return "전체글";
    } else if (type === "아스트라제네카") {
      return "AZ";
    } else if (type === "아스트라제네카 + 화이자") {
      return "AZ + PF";
    } else {
      return type;
    }
  };

  const dispatch = useDispatch();

  // 글쓰기 페이지 이동 함수
  const handleMoveWrite = () => {
    // 로그인 확인 코드
    if (!is_login) {
      dispatch(actionSetMessage("로그인 후 이용해 주세요"));
      dispatch(actionAlert());
      return;
    }
    // 박신 후기 게시판일 경우 설문조사를 수행 했는지 확인하는 코드
    if (board === "vaccine") {
      if (!is_vaccine) {
        dispatch(actionSetMessage("설문조사 후 이용해 주세요"));
        dispatch(actionAlert());
        return;
      }
      history.push("/vaccineboard/write");
    } else {
      history.push("/quarantineboard/write");
    }
  };

  useEffect(() => {}, [board_type]);

  if (isMobileOnly) {
    return (
      <>
        <Grid
          is_flex="space_row"
          margin="32px auto 16px auto"
          padding="0 24px 0 24px"
        >
          <Text
            size={theme.SubHeadOneSize}
            lineHeight={theme.SubHeadOneHeight}
            bold
          >
            {board === "vaccine" ? NameChanger(board_type) : "전체글"}
          </Text>
          <Button
            width="89px"
            height="26px"
            fontSize={theme.bodyfourSize}
            margin="0"
            _onClick={handleMoveWrite}
            bold
          >
            글쓰기
          </Button>
        </Grid>
        {board === "vaccine" && <TypeSelector />}
        <Div></Div>
      </>
    );
  }

  return (
    <Grid is_flex="space_row" margin="96px auto 32px auto">
      <Text
        padding="0 0 0 12px"
        size={theme.headOneSize}
        bold
        lineHeight={theme.headOneHeight}
      >
        {board === "vaccine" ? NameChanger(board_type) : "전체글"}
      </Text>
      <Button
        width={theme.totalButtonWidth}
        height={theme.mediumButtonHeight}
        fontSize={theme.SubHeadOneSize}
        margin="0"
        _onClick={handleMoveWrite}
        bold
      >
        글쓰기 <FontAwesomeIcon icon={faEdit} style={{ marginLeft: "10px" }} />
      </Button>
    </Grid>
  );
};

const Div = styled.div`
  margin: 0 16px 0 16px;
  background-color: ${theme.typoLightGrey2};
  height: 1px;
  margin-bottom: 20px;
`;

export default ListNav;
