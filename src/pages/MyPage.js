import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLogoutCookie } from "../redux/modules/user";

import { Grid, Text } from "../elements";
import MetaScript from "../shared/MetaScript";
import logout from "../images/logout.png";
import newarrow from "../images/newarrow.png";
import MyInfo from "../components/MyInfo";
import MyPost from "../components/MyPost";
import MyLike from "../components/MyLike";
import NavModal from "../components/mobile/NavModal";
import Alert from "../components/popup/Alert";

import styled from "styled-components";
import { isMobileOnly } from "react-device-detect";
import theme from "../styles/theme";
import Spinner from "../shared/Spinner";

const MyPage = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState("myinfo");

  const navModal_status = useSelector((state) => state.modal.navVisible);
  const alert_status = useSelector((state) => state.popup.alert);
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  if (isMobileOnly) {
    return (
      <>
        <MobileWrapper>
          {menu === "myinfo" && (
            <Grid height="100vh" bg="white">
              <Grid is_flex="center" margin="0" height="60px" bg={theme.bg2}>
                <Text
                  color={theme.white}
                  size={theme.SubHeadOneSize}
                  lineHeight={theme.headOneHeight}
                  bold
                >
                  마이페이지
                </Text>
              </Grid>

              <Grid className="메뉴" width="100%" margin="24px auto">
                <MobileMenuItem
                  onClick={() => {
                    setMenu("myinfomobile");
                  }}
                >
                  내 정보
                  <img
                    src={newarrow}
                    alt=""
                    style={{
                      width: "6px",
                      height: "12px",
                      margin: "0 0 0 auto",
                    }}
                  />
                </MobileMenuItem>
                <MobileMenuItem
                  onClick={() => {
                    setMenu("mypost");
                  }}
                >
                  내가 쓴 글
                  <img
                    src={newarrow}
                    alt=""
                    style={{
                      width: "6px",
                      height: "12px",
                      margin: "0 0 0 auto",
                    }}
                  />
                </MobileMenuItem>
                <MobileMenuItem
                  onClick={() => {
                    setMenu("mylike");
                  }}
                >
                  내가 추천한 글
                  <img
                    src={newarrow}
                    alt=""
                    style={{
                      width: "6px",
                      height: "12px",
                      margin: "0 0 0 auto",
                    }}
                  />
                </MobileMenuItem>
                <Line />
                <MobileMenuItem onClick={() => dispatch(actionLogoutCookie())}>
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
                </MobileMenuItem>
              </Grid>
            </Grid>
          )}
          {menu === "myinfomobile" && <MyInfo />}
          {menu === "mypost" && <MyPost />}
          {menu === "mylike" && <MyLike />}
        </MobileWrapper>
        {navModal_status && <NavModal />}
        {alert_status && <Alert />}
        {isLoading && <Spinner />}
      </>
    );
  }

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
          <MenuItem onClick={() => dispatch(actionLogoutCookie())}>
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
      {alert_status && <Alert />}
      {isLoading && <Spinner />}
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
  ${(props) => props.menu && `background-color: ${theme.typoLightGrey1}`}
`;

const MobileWrapper = styled.div`
  /* top: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  /* position: fixed; */
  margin: 80px auto auto auto;
  /* z-index: 1; */
  background-color: white;
`;

const MobileMenuItem = styled.div`
  width: 90%;
  height: ${theme.largeButtonHeight};
  margin: 0 16px;
  display: flex;
  align-items: center;
`;

export default MyPage;
