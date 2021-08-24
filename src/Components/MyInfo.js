import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actionModifyNickname,
  actionModifySurvey,
} from "../redux/modules/modal.js";

import { Grid, Text } from "../elements";
import pencil from "../images/pencil.png";
import ModifyNickname from "./popup/ModifyNickname";
import ModifySurvey from "./ModifySurvey.js";

import theme from "../styles/theme";
import { isMobileOnly } from "react-device-detect";
import styled from "styled-components";

const MyInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const modifyNickname = useSelector((state) => state.modal.modifyNickname);
  const modifySurvey = useSelector((state) => state.modal.modifySurvey);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isMobileOnly) {
    return (
      <>
        <Grid is_flex="center" margin="0" height="60px" bg={theme.bg3}>
          <Text
            color={theme.bg2}
            size={theme.SubHeadOneSize}
            lineHeight={theme.headOneHeight}
            bold
          >
            내 정보
          </Text>
        </Grid>
        <Grid margin="24px 16px" width="auto">
          <Text
            width={theme.userSurveywidth}
            lineHeight={theme.mediumButtonHeight}
            size={theme.SubHeadTwoSize}
            margin="0 0 24px 0"
            bold
          >
            계정 정보
          </Text>

          <Grid is_flex="space_column" margin="0 0 16px 0">
            <Text
              width={theme.userSurveywidth}
              size={theme.bodyfourSize}
              color={theme.bg2}
              margin="0 auto 8px 0 "
            >
              닉네임
            </Text>
            <Grid is_flex="space_row">
              <Text size={theme.SubHeadOneSize}>{user.nickname}</Text>
              <Pencil
                src={pencil}
                alt=""
                onClick={() => {
                  dispatch(actionModifyNickname());
                }}
              />
            </Grid>
            <Line />
          </Grid>
          <Grid
            className="아이디 있는 줄"
            is_flex="space_column"
            margin="26px 0 16px 0"
          >
            <Text
              width={theme.userSurveywidth}
              size={theme.bodyfourSize}
              color={theme.bg2}
              margin="0 auto 8px 0 "
            >
              아이디
            </Text>
            <Grid width="auto" margin="0 auto 0 0">
              <Text size={theme.SubHeadTwoSize} color={theme.typoGrey1}>
                {user.username}
              </Text>
            </Grid>
          </Grid>
        </Grid>

        <Border />
        <Grid margin="24px 16px 100px 16px" width="auto">
          <Grid
            className="건강정보 제목줄"
            is_flex="space_row"
            margin="0 0 10px 0"
          >
            <Text
              width={theme.userSurveywidth}
              size={theme.SubHeadTwoSize}
              bold
            >
              건강 정보
            </Text>

            <Pencil
              src={pencil}
              alt=""
              onClick={() => {
                dispatch(actionModifySurvey());
              }}
            />
            <Text
              size={theme.bodyThreeSize}
              color={theme.btnColor}
              _onClick={() => {
                dispatch(actionModifySurvey());
              }}
              hover
            >
              수정하기
            </Text>
          </Grid>

          <Grid>
            <table className="table">
              <tbody>
                <tr>
                  <th className="th">백신 접종 여부</th>
                  <td className="td">
                    {user.isVaccine === true && "접종함"}
                    {user.isVaccine === false && "접종하지않음"}
                  </td>
                </tr>
                <tr>
                  <th className="th">접종 회차</th>
                  <td className="td">
                    {user.degree === 1 && "1차"}
                    {user.degree === 2 && "2차"}
                    {user.degree === undefined && ""}
                  </td>
                </tr>
                <tr>
                  <th className="th">백신 종류</th>
                  <td className="td">{user.type}</td>
                </tr>
                <tr>
                  <th className="th">성별</th>
                  <td className="td">{user.gender}</td>
                </tr>
                <tr>
                  <th className="th">연령대</th>
                  <td className="td">
                    {user.age || (user.age === "80" && "80대 이상")}
                  </td>
                </tr>
                <tr>
                  <th className="th">기저 질환</th>
                  <td className="td">{user.disease}</td>
                </tr>
                <tr>
                  <th className="th">부작용</th>
                  <td className="td">{user.afterEffect}</td>
                </tr>
              </tbody>
            </table>
          </Grid>

          {modifyNickname && <ModifyNickname />}
          {modifySurvey && <ModifySurvey />}
        </Grid>
      </>
    );
  }

  return (
    <>
      <Text
        width={theme.userSurveywidth}
        lineHeight={theme.mediumButtonHeight}
        size={theme.SubHeadOneSize}
        margin="0 0 40px 0"
        bold
      >
        계정 정보
      </Text>

      <Grid is_flex="space_row" margin="0 0 16px 0">
        <Text
          width={theme.userSurveywidth}
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin="0 55px 0 0 "
        >
          닉네임
        </Text>
        <Grid is_flex="space_row" width="auto" margin="0 auto 0 0">
          <Text size={theme.SubHeadTwoSize}>{user.nickname}</Text>
          <Pencil
            src={pencil}
            alt=""
            onClick={() => {
              dispatch(actionModifyNickname());
            }}
          />
        </Grid>
      </Grid>
      <Grid className="아이디 있는 줄" is_flex="space_row" margin="0 0 110px 0">
        <Text
          width={theme.userSurveywidth}
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin="0 55px 0 0 "
        >
          아이디
        </Text>
        <Grid width="auto" margin="0 auto 0 0">
          <Text size={theme.SubHeadTwoSize}>{user.username}</Text>
        </Grid>
      </Grid>

      <Grid className="건강정보 제목줄" is_flex="space_row" margin="0 0 40px 0">
        <Text
          width={theme.userSurveywidth}
          size={theme.SubHeadOneSize}
          margin="0 0 0 0"
          bold
        >
          건강 정보
        </Text>

        <Pencil
          src={pencil}
          alt=""
          onClick={() => {
            dispatch(actionModifySurvey());
          }}
        />
        <Text
          size={theme.bodyThreeSize}
          color={theme.btnColor}
          _onClick={() => {
            dispatch(actionModifySurvey());
          }}
          hover
        >
          수정하기
        </Text>
      </Grid>

      <Grid>
        <table className="table">
          <tbody>
            <tr>
              <th className="th">백신 접종 여부</th>
              <td className="td">
                {user.isVaccine === true && "접종함"}
                {user.isVaccine === false && "접종하지않음"}
              </td>
            </tr>
            <tr>
              <th className="th">접종 회차</th>
              <td className="td">
                {user.degree === 1 && "1차"}
                {user.degree === 2 && "2차"}
                {user.degree === undefined && ""}
              </td>
            </tr>
            <tr>
              <th className="th">백신 종류</th>
              <td className="td">{user.type}</td>
            </tr>
            <tr>
              <th className="th">성별</th>
              <td className="td">{user.gender}</td>
            </tr>
            <tr>
              <th className="th">연령대</th>
              <td className="td">
                {user.age || (user.age === "80" && "80대 이상")}
              </td>
            </tr>
            <tr>
              <th className="th">기저 질환</th>
              <td className="td">{user.disease}</td>
            </tr>
            <tr>
              <th className="th">부작용</th>
              <td className="td">{user.afterEffect}</td>
            </tr>
          </tbody>
        </table>
      </Grid>
      {modifyNickname && <ModifyNickname />}
      {modifySurvey && <ModifySurvey />}
    </>
  );
};

const Pencil = styled.img`
  width: ${theme.bodyOneSize};
  height: ${theme.bodyOneSize};
  margin: 0 0 0 auto;
  :hover {
    cursor: pointer;
  }
`;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.typoGrey1};
  margin: 3px 0 0 0;
`;

const Border = styled.div`
  width: 100%;
  border-bottom: 8px solid ${theme.typoLightGrey1};
`;

export default MyInfo;
