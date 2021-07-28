import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_info: {
    nickname: "",
  },
  is_login: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionSetUser: (state, action) => {
      state.user_info = action.payload;
    },
  },
});

export const { actionSetUser } = user.actions;

export default user;
