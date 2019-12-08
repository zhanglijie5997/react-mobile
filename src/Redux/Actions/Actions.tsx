import { createAction } from "redux-actions";
import { ActionsEnum } from '../Types/Types';

// 设置用户状态异步方法
const userStatusAction = createAction(ActionsEnum.UserStatusAction, (status: boolean) => status);


export {
    userStatusAction,
}