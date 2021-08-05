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
import { convertFromRaw } from "draft-js";
import { useSelector } from "react-redux";
import Alert from "../components/popup/Alert";

const data = {
  vacBoardId: 0,
  userId: "유저 아이디",
  title: "화이자 1차 썰 푼다",
  contents: `
{"blocks":[{"key":"47qis","text":"안녕하세요","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bdep6","text":"두번째 글 입니다.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
  `,
};

const Modify = () => {
  // /modify일때 true /quarantinemodify 일떄 false
  const url = history.location.pathname;
  // true or false
  const board = url.includes("/modify") ? true : false;

  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  // 타이틀 인풋값
  const [title, setTitle] = useState(data.title);
  const editor = useRef();
  // 데이터 JSON 변환
  const storedState = convertFromRaw(JSON.parse(data.contents));
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(storedState)
  );

  const contents = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  );

  const onTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  return (
    <Grid width="1192px" margin={`160px auto auto auto`}>
      <Grid is_flex="space_row" margin="auto auto 26px auto">
        <Text
          size={theme.headOneSize}
          lineHeight={theme.headOneHeight}
          color={theme.fontColor}
          bold
        >
          {/* 백신이냐 격리냐에 따라 텍스트 바꾸기 */}
          {board ? "백신" : "격리"} 후기 수정하기
        </Text>
        <Button
          width="88px"
          height="42px"
          fontSize={theme.bodyTwoSize}
          bold
          margin="0"
          bg={theme.bg}
        >
          등록
        </Button>
      </Grid>
      <Grid height="1px" bg="black"></Grid>
      {/* 타이틀 입력 */}
      <Grid margin="30px 0 0 0">
        <Input
          value={title}
          width="1192px"
          height="72px"
          border="none"
          fontSize={theme.bodyTwoSize}
          bg={theme.bg4}
          _onChange={onTitleChange}
          placeholder="제목을 입력해 주세요."
        />
      </Grid>

      {/* 작성페이지 */}
      <ExperienceWrite
        editor={editor}
        urlExchanger={true}
        editorState={editorState}
        setEditorState={setEditorState}
      />
      {alert_status && <Alert />}
    </Grid>
  );
};

export default Modify;
