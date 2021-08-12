import React, { useRef, useState } from "react";
import { history } from "../redux/configStore";
import theme from "../styles/theme";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Button from "../elements/Button";
import Input from "../elements/Input";

import logger from "../shared/logger";
import ExperienceWrite from "../components/editor/ExperienceWrite";
import { EditorState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/popup/Alert";
import { actionWriteExperience } from "../redux/modules/board";
import MetaScript from "../shared/MetaScript";

const Write = () => {
  const userId = useSelector((state) => state.user.user.userId);
  const dispatch = useDispatch();
  //alert
  const alert_status = useSelector((state) => state.popup.alert);
  const url = history.location.pathname;

  // /vboard/write일때 true /qboard/write 일떄 false
  const urlExchanger = url === "/vaccineboard/write" ? true : false;

  // 타이틀 인풋값
  const [title, setTitle] = useState("");
  // 에디터 props값
  const editor = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // 데이터 JSON 변환
  const contents = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  );

  const onTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const contentObj = {
    userId: userId,
    title: title,
    contents: contents,
  };

  const handlePostEx = () => {
    window.scrollTo(0, 0);
    if (urlExchanger) {
      //백신후기 dispatch
      dispatch(actionWriteExperience("vaccine", contentObj));
    } else {
      //격리후기 dispatch
      dispatch(actionWriteExperience("quarantine", contentObj));
    }
  };

  logger(contents);
  return (
    <Grid width={theme.writeWidth} margin={`160px auto 120px auto`}>
      <MetaScript title="슬기로운 백신생활 | 글쓰기" />
      <Grid is_flex="space_row" margin="auto auto 26px auto">
        <Text size={theme.headOneSize} lineHeight={theme.headOneHeight} bold>
          {/* 백신이냐 격리냐에 따라 텍스트 바꾸기 */}
          {urlExchanger ? "백신" : "격리"} 후기 글쓰기
        </Text>
        <Button
          width={theme.smallButtonWidth}
          height={theme.smallButtonHeight}
          fontSize={theme.SubHeadTwoSize}
          bold
          margin="0"
          bg={theme.bg2}
          _onClick={handlePostEx}
        >
          등록
        </Button>
      </Grid>
      <Grid height="1px" bg="black"></Grid>
      {/* 타이틀 입력 */}
      <Grid margin="30px 0 0 0">
        <Input
          bg={theme.bg4}
          value={title}
          width={theme.writeWidth}
          height="72px"
          border="none"
          _onChange={onTitleChange}
          fontSize={theme.bodyTwoSize}
          placeholder="제목을 입력해 주세요."
        />
      </Grid>

      {/* 작성페이지 */}
      <ExperienceWrite
        editor={editor}
        urlExchanger={urlExchanger}
        editorState={editorState}
        setEditorState={setEditorState}
      />
      {alert_status && <Alert />}
    </Grid>
  );
};

export default Write;
