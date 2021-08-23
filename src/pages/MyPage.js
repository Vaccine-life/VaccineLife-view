import React, { useState } from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import MetaScript from "../shared/MetaScript";
import logout from "../images/logout.png";
import MyInfo from "../components/MyInfo";
import MyPost from "../components/MyPost";
import MyLike from "../components/MyLike";

const MyPage = () => {
  const [menu, setMenu] = useState("myinfo");

  return (
    <Grid width={theme.boardWidth} margin={`160px auto 120px auto`}>
      <MetaScript title={`슬기로운 백신생활 | 마이페이지`} />
      <Grid className="상단그리드" margin="0 auto 40px 0">
        <Text size={theme.headOneSize} lineHeight={theme.headOneHeight} bold>
          마이 페이지
        </Text>
        <Line />
      </Grid>

      <Grid is_flex="space_row">
        <Grid className="하단좌측그리드" margin="0 7% auto 0" width="15%">
          <MenuItem
            menu={menu === "myinfo" ? true : false}
            onClick={() => {
              setMenu("myinfo");
            }}
          >
            내 정보
          </MenuItem>
          <MenuItem
            menu={menu === "mypost" ? true : false}
            onClick={() => {
              setMenu("mypost");
            }}
          >
            내가 쓴 글
          </MenuItem>
          <MenuItem
            menu={menu === "mylike" ? true : false}
            onClick={() => {
              setMenu("mylike");
            }}
          >
            내가 추천한 글
          </MenuItem>
          <Line />
          <MenuItem>
            로그아웃
            <img
              src={logout}
              alt=""
              style={{
                width: `${theme.headOneSize}`,
                height: `${theme.headOneSize}`,
                margin: "0 0 0 4px",
              }}
            />
          </MenuItem>
        </Grid>

        <Grid
          className="하단우측그리드"
          is_flex="column"
          margin="0 0 auto 0"
          width="78%"
        >
          {menu === "myinfo" && <MyInfo />}
          {menu === "mypost" && <MyPost />}
          {menu === "mylike" && <MyLike />}
        </Grid>
      </Grid>
    </Grid>
  );
};

const Line = styled.div`
  width: 100%;
  border-bottom: 1.5px solid ${theme.typoLightGrey2};
  margin: ${theme.SubHeadTwoHeight} 0;
`;

const MenuItem = styled.div`
  width: 100%;
  height: ${theme.mediumButtonHeight};
  padding-left: 7px;
  display: flex;
  align-items: center;
  :hover {
    background-color: ${theme.typoLightGrey1};
    cursor: pointer;
  }
  ${(props) => props.menu && `font-weight : 700;`}
`;

export default MyPage;
