import React, { useEffect } from "react";
import Login from "./Login";
import BoardInfo from "../components/detail/BoardInfo";
import UserInfo from "../components/detail/UserInfo";
import Contents from "../components/detail/Contents";
import MoveBox from "../components/detail/MoveBox";
import { Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionSetPrevNextPage } from "../redux/modules/board";
import theme from "../styles/theme";

const data = {
  vacBoardId: 0,
  userId: "유저 아이디",
  title: "화이자 1차 썰 푼다",
  contents: `
{"blocks":[{"key":"47qis","text":"안녕하세요","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bdep6","text":"두번째 글 입니다.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
  `,
  likeCount: 0,
  hits: 1,
  commentCount: 0,
  createdAt: new Date("Tue Jul 27 2021 23:22:46 GMT+0900 (대한민국 표준시)"),
  modifiedAt: "Tue Jul 27 2021 23:22:46 GMT+0900 (대한민국 표준시)",

  user: {
    username: "유저 아이디",
    nickname: "닉네임",
    isVaccine: 1,
    type: "모더나",
    gender: "여",
    age: 27,
    disease: "모름",
    degree: 2,
    afterEffect: "발열 , 두통, 근육통",
  },
};

const Detail = () => {
  //격리후기떄는 id 변경
  const {
    vacBoardId,
    title,
    contents,
    likeCount,
    hits,
    commentCount,
    createdAt,
    user,
  } = data;

  // 격리후기때는 MoveBox에 true 기입
  const modal_status = useSelector((state) => state.modal.visible);
  const boardType = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionSetPrevNextPage(vacBoardId));
  }, []);

  return (
    <Grid width={theme.detailWidth} margin="100px auto 40px auto">
      <BoardInfo
        vacBoardId={vacBoardId}
        user={user}
        title={title}
        hits={hits}
        createdAt={createdAt}
        likeCount={likeCount}
      />
      <UserInfo
        type={user.type}
        gender={user.gender}
        age={user.age}
        disease={user.disease}
        degree={user.degree}
        afterEffect={user.afterEffect}
      />
      <Contents contents={contents} likeCount={likeCount} />
      <MoveBox boardType={boardType} />
      {modal_status && <Login />}
    </Grid>
  );
};

export default Detail;
