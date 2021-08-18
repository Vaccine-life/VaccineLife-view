import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { userAxios } from "../../shared/api";
import { deleteCookie, getCookie, setCookie } from "../../shared/cookie";
import logger from "../../shared/logger";
import { actionResetLike } from "./like";
import { actionVisible } from "./modal";
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
      dispatch(actionSetTime(userInfoDecode.exp));
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

    history.push("/");

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
      dispatch(
        actionSetMessage(
          `반갑습니다 ${nickname}님!
          회원가입 및 로그인 되었습니다`
        )
      );
      dispatch(actionAlert());
      history.push("/");
    } catch (error) {
      logger(error);
      dispatch(actionSetMessage(error.response.data.message));
      dispatch(actionAlert());
    }
  };

export const actionGetUseInfo = () => (dispatch) => {
  const getUserToken = getCookie("vaccine_life_token");
  const userInfoDecode = jwtDecode(getUserToken);
  dispatch(actionSetTime(userInfoDecode.exp));

  const userInfo = {
    afterEffect: userInfoDecode.afterEffect,
    age: userInfoDecode.age,
    degree: userInfoDecode.degree,
    disease: userInfoDecode.disease,
    gender: userInfoDecode.gender,
    isVaccine: userInfoDecode.isVaccine,
    nickname: userInfoDecode.nickname,
    roles: userInfoDecode.roles,
    username: userInfoDecode.username,
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
