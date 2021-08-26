import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { userAxios } from "../../shared/api";
import { deleteCookie, getCookie, setCookie } from "../../shared/cookie";
import logger from "../../shared/logger";
import { actionResetLike } from "./like";
import {
  actionVisible,
  actionModifyNicknameVisible,
  actionModifySurveyVisible,
} from "./modal";
import { actionAlert, actionSetMessage } from "./popup";
import { actionGetLikeMedi, actionSetLikeMedi } from "./like";

const initialState = {
  user: {
    nickname: "",
    isVaccine: 2,
    degree: undefined,
    type: undefined,
    gender: undefined,
    age: undefined,
    disease: undefined,
    afterEffect: [],
  },
  is_login: false,
  expTime: 0,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionSetUser: (state, action) => {
      state.user = action.payload;
      state.is_login = true;
    },
    actionLogout: (state, action) => {
      deleteCookie("vaccine_life_token");
      state.is_login = false;
      state.user = initialState.user;
    },
    actionSetTime: (state, action) => {
      state.expTime = action.payload * 1000;
    },
  },
});

export const actionLogin =
  (username, password) =>
  async (dispatch, getState, { history }) => {
    try {
      const userInfoObj = await userAxios.login({ username, password });
      setCookie("vaccine_life_token", userInfoObj.data);
      const userInfoDecode = jwtDecode(userInfoObj.data);
      console.log(userInfoDecode);
      dispatch(actionSetTime(userInfoDecode.exp));

      // username이 sub에 담겨 오는 것에 유의하자!
      const userInfo = {
        afterEffect: userInfoDecode.afterEffect,
        age: userInfoDecode.age,
        degree: userInfoDecode.degree,
        disease: userInfoDecode.disease,
        gender: userInfoDecode.gender,
        isVaccine: userInfoDecode.isVaccine,
        nickname: userInfoDecode.nickname,
        roles: userInfoDecode.roles,
        username: userInfoDecode.sub,
        userId: userInfoDecode.id,
        type: userInfoDecode.type,
      };

      dispatch(actionSetUser(userInfo));
      dispatch(actionSetMessage("로그인 되었습니다"));
      dispatch(actionAlert());
      dispatch(actionVisible());

      // history.push("/");

      // 로그인시 내가 누른 하트 보이게 하기
      dispatch(actionGetLikeMedi());
    } catch (error) {
      dispatch(actionSetMessage("아이디와 비밀번호를 다시 확인해 주세요"));
      dispatch(actionAlert());
    }
  };

export const actionSignup =
  ({
    username,
    password,
    passwordChecker,
    nickname,
    isVaccine,
    type,
    gender,
    age,
    disease,
    degree,
    afterEffect,
  }) =>
  async (dispatch, getState, { history }) => {
    try {
      // 여기가 찐 회원가입에만 관여하는 부분

      // 유저가 접종한 것처럼 이것저것 체크한 후 마지막에 '접종하지 않음'으로 변경하고 제출한 경우, 이것저것 체크했던 것들을 다시 기본값으로 돌려버린다.
      if (isVaccine === 0) {
        type = undefined;
        gender = undefined;
        age = undefined;
        disease = undefined;
        degree = undefined;
        afterEffect = [];
      }

      await userAxios.signup({
        username,
        password,
        passwordChecker,
        nickname,
        isVaccine,
        type,
        gender,
        age,
        disease,
        degree,
        afterEffect: afterEffect.sort().join(", "),
      });

      dispatch(actionVisible());

      //여기부터는 회원가입 즉시 로그인 하기위한 애들

      const newuserObj = await userAxios.login({ username, password });
      setCookie("vaccine_life_token", newuserObj.data);
      const newuserDecode = jwtDecode(newuserObj.data);
      dispatch(actionSetTime(newuserDecode.exp));
      const newuser = {
        afterEffect: newuserDecode.afterEffect,
        age: newuserDecode.age,
        degree: newuserDecode.degree,
        disease: newuserDecode.disease,
        gender: newuserDecode.gender,
        isVaccine: newuserDecode.isVaccine,
        nickname: newuserDecode.nickname,
        roles: newuserDecode.roles,
        username: newuserDecode.sub,
        userId: newuserDecode.id,
        type: newuserDecode.type,
      };
      dispatch(actionSetUser(newuser));

      // 왜 +++++++이 붙는가? 닉네임만 보내면 되지 않는가?
      // 닉네임만 보내면 다른 actionSetMessage와 분간할 수 없다.. 분간해야 얘만 따로 필요한 디자인 적용할 수 있음
      dispatch(
        actionSetMessage(`${nickname}+++++++회원가입 및 로그인 되었습니다`)
      );
      dispatch(actionAlert());

      // history.push("/");
    } catch (error) {
      logger(error);
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const actionNicknameUpdate =
  ({
    id,
    username,
    nickname,
    isVaccine,
    type,
    gender,
    age,
    disease,
    degree,
    afterEffect,
  }) =>
  async (dispatch, getState, { history }) => {
    try {
      if (isVaccine === 0) {
        type = undefined;
        gender = undefined;
        age = undefined;
        disease = undefined;
        degree = undefined;
        afterEffect = [];
      }

      const updatedUserObj = await userAxios.userUpdate(id, {
        id,
        username,
        nickname,
        isVaccine,
        type,
        gender,
        age,
        disease,
        degree,
        afterEffect: afterEffect.sort().join(", "),
      });

      dispatch(actionModifyNicknameVisible());

      setCookie("vaccine_life_token", updatedUserObj.data);
      const updatedUserDecode = jwtDecode(updatedUserObj.data);
      dispatch(actionSetTime(updatedUserDecode.exp));
      const updatedUser = {
        afterEffect: updatedUserDecode.afterEffect,
        age: updatedUserDecode.age,
        degree: updatedUserDecode.degree,
        disease: updatedUserDecode.disease,
        gender: updatedUserDecode.gender,
        isVaccine: updatedUserDecode.isVaccine,
        nickname: updatedUserDecode.nickname,
        roles: updatedUserDecode.roles,
        username: updatedUserDecode.sub,
        userId: updatedUserDecode.id,
        type: updatedUserDecode.type,
      };
      dispatch(actionSetUser(updatedUser));

      dispatch(actionSetMessage("닉네임이 수정되었습니다"));
      dispatch(actionAlert());
      console.log("닉네임 변경 완료! 리덕스");

      history.push("/");
    } catch (error) {
      logger(error);
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const actionSurveyUpdate =
  ({
    id,
    username,
    nickname,
    isVaccine,
    type,
    gender,
    age,
    disease,
    degree,
    afterEffect,
  }) =>
  async (dispatch, getState, { history }) => {
    try {
      if (isVaccine === 0) {
        type = undefined;
        gender = undefined;
        age = undefined;
        disease = undefined;
        degree = undefined;
        afterEffect = [];
      }

      const updatedUserObj = await userAxios.userUpdate(id, {
        id,
        username,
        nickname,
        isVaccine,
        type,
        gender,
        age,
        disease,
        degree,
        afterEffect: afterEffect.sort().join(", "),
      });

      dispatch(actionModifySurveyVisible());

      setCookie("vaccine_life_token", updatedUserObj.data);
      const updatedUserDecode = jwtDecode(updatedUserObj.data);
      dispatch(actionSetTime(updatedUserDecode.exp));
      const updatedUser = {
        afterEffect: updatedUserDecode.afterEffect,
        age: updatedUserDecode.age,
        degree: updatedUserDecode.degree,
        disease: updatedUserDecode.disease,
        gender: updatedUserDecode.gender,
        isVaccine: updatedUserDecode.isVaccine,
        nickname: updatedUserDecode.nickname,
        roles: updatedUserDecode.roles,
        username: updatedUserDecode.sub,
        userId: updatedUserDecode.id,
        type: updatedUserDecode.type,
      };
      dispatch(actionSetUser(updatedUser));
      dispatch(actionSetMessage("백신 정보가 수정되었습니다"));
      dispatch(actionAlert());
    } catch (error) {
      logger(error);
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요")
      );
      dispatch(actionAlert());
    }
  };

export const actionGetUseInfo = () => (dispatch) => {
  const getUserToken = getCookie("vaccine_life_token");
  const userInfoDecode = jwtDecode(getUserToken);
  dispatch(actionSetTime(userInfoDecode.exp));
  logger(userInfoDecode);
  const userInfo = {
    afterEffect: userInfoDecode.afterEffect,
    age: userInfoDecode.age,
    degree: userInfoDecode.degree,
    disease: userInfoDecode.disease,
    gender: userInfoDecode.gender,
    isVaccine: userInfoDecode.isVaccine,
    nickname: userInfoDecode.nickname,
    roles: userInfoDecode.roles,
    username: userInfoDecode.sub,
    type: userInfoDecode.type,
    userId: userInfoDecode.id,
  };
  dispatch(actionSetUser(userInfo));
};

export const actionLogoutCookie =
  () =>
  async (dispatch, getState, { history }) => {
    deleteCookie("vaccine_life_token");
    dispatch(actionResetLike());
    dispatch(actionLogout());
    dispatch(actionSetMessage("로그아웃 되었습니다"));
    dispatch(actionAlert());
    history.replace("/");
  };

export const { actionSetUser, actionLogout, actionSetTime } = user.actions;

export default user;
