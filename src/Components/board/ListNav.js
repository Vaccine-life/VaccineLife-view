import React from "react";
import { history } from "../../redux/configStore";
import { Button, Grid, Text } from "../../elements";
import theme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { actionAlert, actionSetMessage } from "../../redux/modules/popup";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

const ListNav = (props) => {
  const { board } = props;
  const is_login = useSelector((state) => state.user.is_login);
  const is_vaccine = useSelector((state) => state.user.user.isVaccine);
  const dispatch = useDispatch();

  const handleMoveWrite = () => {
    if (!is_login) {
      dispatch(actionSetMessage("로그인 후 이용해 주세요"));
      dispatch(actionAlert());
      return;
    }
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

  if (isMobile) {
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
            전체글
          </Text>
          <Button
            width="100px"
            height={theme.SubHeadOneHeight}
            fontSize={theme.bodyThreeSize}
            margin="0"
            _onClick={handleMoveWrite}
            bold
          >
            글쓰기{" "}
            <FontAwesomeIcon icon={faEdit} style={{ marginLeft: "10px" }} />
          </Button>
        </Grid>
        <Div></Div>
      </>
    );
  }

  return (
    <Grid is_flex="space_row" margin="96px auto 32px auto">
      <Text size={theme.headOneSize} bold lineHeight={theme.headOneHeight}>
        전체글
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
  margin: 0 auto 0 auto;
  background-color: ${theme.typoLightGrey2};
  height: 1px;
  width: 382px;
`;

export default ListNav;
