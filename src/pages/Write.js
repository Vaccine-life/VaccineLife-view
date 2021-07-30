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
import draftToHtml from "draftjs-to-html";

const Write = () => {
  const url = history.location.pathname;
  // /vboard/write일때 true /qboard/write 일떄 false
  const urlExchanger = url === "/vboard/write" ? true : false;

  // 타이틀 인풋값
  const [title, setTitle] = useState("");
  // 에디터 props값
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editor = useRef();

  const contents = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const onTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  logger(contents);
  return (
    <Grid width="800px">
      <Grid is_flex="space_row">
        <Text size="1.2rem" color={theme.fontColor} bold>
          {/* 백신이냐 격리냐에 따라 텍스트 바꾸기 */}
          {urlExchanger ? "백신" : "격리"} 후기 글쓰기
        </Text>
        <Button width="50px" margin="0 20px 0 0" bg={theme.btnColor}>
          등록
        </Button>
      </Grid>
      {/* 타이틀 입력 */}
      <Grid margin="30px 0 0 0">
        <Input
          value={title}
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
