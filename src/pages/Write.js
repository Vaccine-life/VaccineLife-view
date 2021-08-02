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

const Write = () => {
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

  const contents = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  );

  const onTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  logger(contents);
  return (
    <Grid width="1192px" margin="40px auto 40px auto">
      <Grid is_flex="space_row" margin="auto auto 26px auto">
        <Text size={theme.headOneSize} color={theme.fontColor} bold>
          {/* 백신이냐 격리냐에 따라 텍스트 바꾸기 */}
          {urlExchanger ? "백신" : "격리"} 후기 글쓰기
        </Text>
        <Button
          width="88px"
          height="42px"
          fontSize={theme.bodyTwoSize}
          bold
          margin="0"
          bg={theme.btnColor}
          border_radius="10px"
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
          _onChange={onTitleChange}
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
    </Grid>
  );
};

export default Write;
