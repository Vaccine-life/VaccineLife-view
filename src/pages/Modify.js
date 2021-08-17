import React, { useEffect, useRef, useState } from "react";
import { history } from "../redux/configStore";
import theme from "../styles/theme";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Button from "../elements/Button";
import Input from "../elements/Input";

import ExperienceWrite from "../components/editor/ExperienceWrite";
import { EditorState, convertToRaw } from "draft-js";
import { convertFromRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/popup/Alert";
import { actionGetDetail, actionModifyDB } from "../redux/modules/board";
import MetaScript from "../shared/MetaScript";
import { isMobileOnly } from "react-device-detect";
import styled from "styled-components";
import BoardName from "../components/mobile/BoardName";

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
    window.scrollTo(0, 0);
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

  if (isMobileOnly) {
    return (
      <Grid margin="80px auto 120px auto">
        <MetaScript title="슬기로운 백신생활 | 글쓰기" />
        <BoardName board={board} />
        <Grid margin="16px auto 26px auto" padding="0 16px 0  16px">
          <Text
            alignStart={true}
            size={theme.bodyThreeSize}
            lineHeight={theme.bodyThreeHeight}
            color={theme.typoGrey3}
          >
            {/* 백신이냐 격리냐에 따라 텍스트 바꾸기 */}
            {board === "vaccine" ? "백신후기 > 수정" : "격라후기 > 수정"}
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
          editor={editor}
          urlExchanger={board === "vaccine" ? true : false}
          editorState={editorState}
          setEditorState={setEditorState}
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
          {board === "vaccine" ? "백신후기 > 수정" : "격라후기 > 수정"}
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
        editor={editor}
        urlExchanger={board === "vaccine" ? true : false}
        editorState={editorState}
        setEditorState={setEditorState}
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
export default Modify;
