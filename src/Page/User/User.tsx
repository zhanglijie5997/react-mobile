import React, { useCallback, Dispatch } from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { userStatusAction } from "src/Redux/Actions/Actions";
import { Action } from 'redux-actions';
const User = (props: any) => {
    const dispatch: Dispatch<Action<boolean>> = useDispatch(); // 使用 redux的 actions 方法 
    useEffect(() => {
        console.log(props, '///');
        dispatchUserStatus()
    },[]);
    // 更改用户登陆状态, [此处仅作为示例] 
    const dispatchUserStatus = useCallback(() => {
        // 触发dispatch方法, 更改用户登陆状态
        dispatch(userStatusAction(true))
    }, [dispatch])
    return (
        <div>
            USer123
        </div>
    );
}

export default User;
