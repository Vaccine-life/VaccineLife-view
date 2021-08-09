import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { userAxios } from "../../shared/api";
import { deleteCookie, getCookie, setCookie } from "../../shared/cookie";
import logger from "../../shared/logger";
import { actionVisible } from "./modal";
import { actionAlert, actionSetMessage } from "./popup";

const initialState = {
  user: {
    nickname: "",
    isVaccine: false,
    degree: 1,
    type: "",
    gender: "",
    age: "",
    disease: "",
    afterEffect: "",
  },
  likeList: [],
  is_login: false,
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
    actionSetLike: (state, action) => {
      state.likeList = action.payload;
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
        userId: userInfoDecode.id,
        type: userInfoDecode.type,
      };
      dispatch(actionSetUser(userInfo));
      dispatch(actionVisible());
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
        afterEffect,
      });

      //여기부터는 회원가입 즉시 로그인 하기위한 애들
      // userAxios.login({ username, password });
      // const newuserDecode = jwtDecode(newuserObj.data);
      // logger(newuserDecode);
      // const newuser = {
      //   afterEffect: newuserDecode.afterEffect,
      //   age: newuserDecode.age,
      //   degree: newuserDecode.degree,
      //   disease: newuserDecode.disease,
      //   gender: newuserDecode.gender,
      //   isVaccine: newuserDecode.isVaccine,
      //   nickname: newuserDecode.nickname,
      //   roles: newuserDecode.roles,
      //   username: newuserDecode.sub,
      //   userId: newuserDecode.id,
      //   type: newuserDecode.type,
      // };
      // dispatch(actionSetUser(newuser));
    } catch (error) {
      dispatch(actionSetMessage("회원가입 실패"));
      dispatch(actionAlert());
    }
  };

export const actionGetUseInfo = () => (dispatch) => {
  const getUserToken = getCookie("vaccine_life_token");
  const userInfoDecode = jwtDecode(getUserToken);

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
    dispatch(actionLogout());
    history.replace("/");
  };

export const actionGetLike =
  (board) =>
  async (dispatch, getState, { history }) => {
    try {
      const userId = getState().user.user.userId;
      let getData = [];
      let makeData = [];
      if (board === "vaccine") {
        getData = await userAxios.getLikeListVac(userId);
        getData.data.map((each) => {
          makeData.push(each.vacBoardId);
        });
      } else {
        getData = await userAxios.getLikeListQuar(userId);
        getData.data.map((each) => {
          makeData.push(each.quarBoardId);
        });
      }
      dispatch(actionSetLike(makeData));
    } catch (error) {
      dispatch(
        actionSetMessage("네트워크 오류입니다. 관리자에게 문의해주세요.")
      );
      dispatch(actionAlert());
    }
  };

export const { actionSetUser, actionLogout, actionSetLike } = user.actions;

export default user;
