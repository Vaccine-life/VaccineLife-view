import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import user from "./modules/user";
import comment from "./modules/comment";
import board from "./modules/board";
import modal from "./modules/modal";
import popup from "./modules/popup";


export const history = createBrowserHistory();

const middlewares = [
  thunk.withExtraArgument({
    history,
  }),
];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  popup: popup.reducer,
  board: board.reducer,
  user: user.reducer,
  comment: comment.reducer,
  modal: modal.reducer,
  router: connectRouter(history),
});

const store = configureStore({
  reducer,
  middleware: middlewares,
});

export default store;
