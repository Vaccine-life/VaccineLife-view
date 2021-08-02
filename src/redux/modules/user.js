import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    nickname: "",
    isVaccine: 0,
    degree: 1,
    type: "",
    gender: "",
    age: "",
    disease: "",
    afterEffect: "",
  },
  is_login: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionSetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { actionSetUser } = user.actions;

export default user;
