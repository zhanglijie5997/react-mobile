import { handleActions, Action } from "redux-actions";
import { userStatus } from "../State/State";
import { ActionsEnum } from '../Types/Types';

// 用户状态
const userStatusReducer = handleActions<boolean>({
    [ActionsEnum.UserStatusAction]: (state: boolean, action: Action<boolean>) => { 
        // 需要持久保留的状态存在localStorage里， 不需要持久保存的存在sessionStorage里;
       localStorage.setItem("userStatus", JSON.stringify(action.payload))
       return action.payload
    }
}, userStatus);


export {
    userStatusReducer, 
}