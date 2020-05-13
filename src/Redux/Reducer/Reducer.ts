import { combineReducers } from "redux";
import { userStatusReducer, userLocaltionReducer, isIphoneXReducer } from "../Actions/HandleAction";

export default {
    // 所有新增加的reducer都需要在这里注入
    combineReducers: combineReducers({
        userStatusReducer,
        userLocaltionReducer,
        isIphoneXReducer
    })
}
