import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    nickname: "",
    isVaccine: 1,
    degree: 1,
    type: "",
    gender: "",
    age: 10,
    disease: 0,
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
