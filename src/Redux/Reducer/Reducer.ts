import { combineReducers } from "redux";
import * as allHandleAction from "../Actions/HandleAction";

export default {
    // 所有新增加的reducer都需要在这里注入
    combineReducers: combineReducers(allHandleAction)
}
