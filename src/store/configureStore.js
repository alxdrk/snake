import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import snake from "../reducers/snake";
import game from "../reducers/game";
import food from "../reducers/food";

export default () =>
  createStore(
    combineReducers({ game, food, snake }),
    applyMiddleware(/*logger*/)
  );
