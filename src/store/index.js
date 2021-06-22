import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";//异步存储axios的中间键
import titles from "./title";
import areas from "./area";
//数据仓库
const store = createStore(combineReducers({
  titles, areas
}), applyMiddleware(thunk));
export default store;
