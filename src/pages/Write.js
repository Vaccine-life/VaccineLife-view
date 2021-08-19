import React, { useRef, useState } from "react";
import { history } from "../redux/configStore";
import theme from "../styles/theme";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Button from "../elements/Button";
import Input from "../elements/Input";

import logger from "../shared/logger";
import ExperienceWrite from "../components/editor/ExperienceWrite";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/popup/Alert";
import MetaScript from "../shared/MetaScript";
import styled from "styled-components";
import { isMobileOnly } from "react-device-detect";
import BoardName from "../components/mobile/BoardName";
import Login from "./Login";

import NavModal from "../components/mobile/NavModal";

const Write = () => {
  const userId = useSelector((state) => state.user.user.userId);
  const dispatch = useDispatch();
  //alert
  const alert_status = useSelector((state) => state.popup.alert);
  const modal_status = useSelector((state) => state.modal.visible);
  const navModal_status = useSelector((state) => state.modal.navVisible);
  const url = history.location.pathname;

  // /vboard/write일때 true /qboard/write 일떄 false
  const urlExchanger = url === "/vaccineboard/write" ? true : false;

  // 타이틀 인풋값
  const [title, setTitle] = useState("");
  // 에디터 props값
  const [value, setValue] = useState("");

  const onTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const contentObj = {
    userId: userId,
    title: title,
    contents: value,
  };

  const handlePostEx = () => {
    window.scrollTo(0, 0);
    logger(contentObj);

    /*  if (contentObj.title === "") {
      dispatch(actionSetMessage("제목을 입력해 주세요."));
      dispatch(actionAlert());
      return;
    }

    if (urlExchanger) {
      //백신후기 dispatch
      dispatch(actionWriteExperience("vaccine", contentObj));
    } else {
      //격리후기 dispatch
      dispatch(actionWriteExperience("quarantine", contentObj));
    } */
  };

  if (isMobileOnly) {
    return (
      <Grid margin="80px auto 120px auto">
        <MetaScript title="슬기로운 백신생활 | 글쓰기" />
        <BoardName board={urlExchanger ? "vaccine" : "quarantine"} />
        <Grid margin="16px auto 26px auto" padding="0 16px 0  16px">
          <Text
            alignStart={true}
            size={theme.bodyThreeSize}
            lineHeight={theme.bodyThreeHeight}
            color={theme.typoGrey3}
          >
            {/* 백신이냐 격리냐에 따라 텍스트 바꾸기 */}
            {urlExchanger ? "백신후기 >" : "격리후기 >"} 글쓰기
          </Text>
        </Grid>

        {/* 타이틀 입력 */}
        <InputDiv isMobile={true}>
          <Input
            value={title}
            height="46px"
            border="none"
            _onChange={onTitleChange}
            fontSize={theme.bodyfourSize}
            placeholder="제목을 입력해 주세요."
          />
        </InputDiv>

        {/* 작성페이지 */}
        <ExperienceWrite
          urlExchanger={urlExchanger}
          value={value}
          setValue={setValue}
        />
        {alert_status && <Alert />}
        <ButtonDiv isMobile={true}>
          <Button
            width={theme.mediumButtonWidth}
            height={theme.mediumButtonHeight}
            fontSize={theme.SubHeadTwoSize}
            bold
            margin="0"
            bg={theme.bg2}
            _onClick={handlePostEx}
          >
            등록
          </Button>
        </ButtonDiv>
        {modal_status && <Login />}
        {navModal_status && <NavModal />}
      </Grid>
    );
  }

  return (
    <Grid width={theme.writeWidth} margin={`160px auto 120px auto`}>
      <MetaScript title="슬기로운 백신생활 | 글쓰기" />
      <Grid margin="auto auto 26px auto">
        <Text
          alignStart={true}
          size={theme.bodyThreeSize}
          lineHeight={theme.bodyThreeHeight}
          color={theme.typoGrey3}
        >
          {/* 백신이냐 격리냐에 따라 텍스트 바꾸기 */}
          {urlExchanger ? "백신후기 >" : "격리후기 >"} 글쓰기
        </Text>
      </Grid>

      {/* 타이틀 입력 */}
      <InputDiv isMobile={false}>
        <Input
          value={title}
          height="62px"
          border="none"
          _onChange={onTitleChange}
          fontSize={theme.bodyOneSize}
          placeholder="제목을 입력해 주세요."
        />
      </InputDiv>

      {/* 작성페이지 */}
      <ExperienceWrite
        urlExchanger={urlExchanger}
        value={value}
        setValue={setValue}
      />
      {alert_status && <Alert />}
      <ButtonDiv isMobile={false}>
        <Button
          width="187px"
          height="48px"
          fontSize={theme.SubHeadTwoSize}
          bold
          margin="0"
          bg={theme.bg2}
          _onClick={handlePostEx}
        >
          등록
        </Button>
        {modal_status && <Login />}
        {navModal_status && <NavModal />}
      </ButtonDiv>
    </Grid>
  );
};

const InputDiv = styled.div`
  border: 1px solid ${theme.typoLightGrey2};
  padding: 0 0 0 20px;
  ${(props) => (props.isMobile ? `margin: 0 16px 0 16px` : ``)}
`;
const ButtonDiv = styled.div`
  display: flex;
  ${(props) =>
    props.isMobile
      ? `  align-items: center;
  justify-content: center;`
      : `  align-items: center;
  justify-content: flex-end;`}
`;

export default Write;
