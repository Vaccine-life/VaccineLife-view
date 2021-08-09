import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/popup/Alert";
import { actionGetDetail, actionModifyDB } from "../redux/modules/board";

const data = {
  vacBoardId: 0,
  userId: "유저 아이디",
  title: "화이자 1차 썰 푼다",
  contents: `
{"blocks":[{"key":"47qis","text":"안녕하세요","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bdep6","text":"두번째 글 입니다.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
  `,
};

const Modify = () => {
  const dispatch = useDispatch();
  // /modify일때 true /quarantinemodify 일떄 false
  const url = history.location.pathname;
  const urlLength = url.length;
  // true or false
  const board = url.includes("/modify") ? "vaccine" : "quarantine";
  let boardId =
    board === "vaccine"
      ? url.substr(8, urlLength - 1)
      : url.substr(18, urlLength - 1);
  // 리덕스 정보 없어졌을시 재저장
  useEffect(() => {
    if (board === "vaccine") {
      dispatch(actionGetDetail("vaccine", boardId));
    } else {
      dispatch(actionGetDetail("quarantine", boardId));
    }
  }, []);

  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);
  // 리덕스에서 정보 가져오기
  const board_store = useSelector((state) => state.board.board);
  // 타이틀 인풋값
  const [title, setTitle] = useState(board_store.title);
  const editor = useRef();
  // 데이터 JSON 변환
  const storedState = convertFromRaw(JSON.parse(board_store.contents));
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

  // 타입에 따른 오브젝트 수정
  const modifyObj =
    board === "vaccine"
      ? {
          title,
          contents,
          userId: board_store.userId,
          id: board_store.boardId,
        }
      : {
          title,
          contents,
          userId: board_store.userId,
          id: board_store.boardId,
        };

  const handlePostEx = () => {
    dispatch(actionModifyDB(board, boardId, modifyObj));
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
          {board === "vaccine" ? "백신 후기 수정하기" : "격리 후기 수정하기"}
        </Text>
        <Button
          width="88px"
          height="42px"
          fontSize={theme.bodyTwoSize}
          bold
          margin="0"
          bg={theme.bg}
          _onClick={handlePostEx}
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
