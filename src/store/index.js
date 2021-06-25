import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";//异步存储axios的中间键
import dataSource from "./dataSource/index";
//数据仓库
const store = createStore(combineReducers({
  ...dataSource
}), applyMiddleware(thunk));
export default store;
