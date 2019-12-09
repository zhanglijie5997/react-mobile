import { createAction } from "redux-actions";
import { ActionsEnum } from '../Types/Types';
import { LocationType } from '../State/StateType';

// 设置用户状态异步方法
const userStatusAction = createAction(ActionsEnum.UserStatusAction, (status: boolean) => status);

// 设置用户地理位置
const userLocalAction = createAction(ActionsEnum.userLocalAction, (state: LocationType) => state);

export {
    userStatusAction,
    userLocalAction
}