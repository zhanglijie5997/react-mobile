import { handleActions, Action } from "redux-actions";
import { userStatus, userLocal, isIphoneX } from '../State/State';
import { ActionsEnum } from '../Types/Types';
import { LocationType } from '../State/StateType';

// 用户状态
const userStatusReducer = handleActions<boolean>({
    [ActionsEnum.UserStatusAction]: (state: boolean, action: Action<boolean>) => { 
        // 需要持久保留的状态存在localStorage里， 不需要持久保存的存在sessionStorage里;
       localStorage.setItem("userStatus", JSON.stringify(action.payload))
       return action.payload
    }
}, userStatus);

// 用户地理位置
const userLocaltionReducer = handleActions<LocationType>({
    [ActionsEnum.userLocalAction]: (state: LocationType, action: Action<LocationType>) => {
        sessionStorage.setItem("userLocal", JSON.stringify(action.payload));
        return action.payload;
    }
}, userLocal)

// 是否iphoneX
const isIphoneXReducer = handleActions<boolean>({
    [ActionsEnum.iphoneXAction]: (state: boolean, action: Action<boolean>) => {
        localStorage.setItem("isIphoneX", JSON.stringify(action.payload));
        return action.payload;
    }
}, isIphoneX)

export {
    userStatusReducer, 
    userLocaltionReducer,
    isIphoneXReducer
}