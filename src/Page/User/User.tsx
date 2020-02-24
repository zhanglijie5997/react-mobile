import React, { useCallback, Dispatch, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { userStatusAction } from "src/Redux/Actions/Actions";
import { Action } from 'redux-actions';
import styles from "./User.scss";
import FormValidate from '@/Components/UniversalComponents/FormValidate/FormValidate';
import { DataType } from '@/Components/UniversalComponents/FormValidate/FromValidateType';
import { Toast } from 'antd-mobile';

const User = (props: any) => {
    const dispatch: Dispatch<Action<boolean>> = useDispatch(); // 使用 redux的 actions 方法 
    const [getValidate, setValidate] = useState<Map<number, (str: string) => boolean>>(new Map([
        [0, (str: string) => str.length <= 11 && str.length > 0]
    ]));
    const [getToast, setToast] = useState<Map<number, () => void>>(new Map([
        [0, () => Toast.info("请输入小于12位的手机号码")]
    ]));
    const [getData, setData] = useState<DataType[]>([
        { name: "mobile", value: "", type: "number", placeholder: "请输入手机号"}
    ])
    useEffect(() => {
        console.log(props, '///');
        dispatchUserStatus()
    },[]);

    const changeDataFn = useCallback((index: number, value: string)=> {
        const data = getData;
        data[index].value = value;
        setData(data);
    }, [getData]);

    const submit = useCallback(() => {
        let result: boolean = true;
        for (let index = 0; index < getData.length; index++) {
            const validateResult: boolean =  getValidate.get(index)!(getData[0].value);
            if(!validateResult) {
                result = validateResult;
                getToast.get(index)!();
                break;
            }
        }
        console.log(result, 'result');
    }, [getData]);

    // 更改用户登陆状态, [此处仅作为示例] 
    const dispatchUserStatus = useCallback(() => {
        // 触发dispatch方法, 更改用户登陆状态
        dispatch(userStatusAction(true))
    }, [dispatch]);

    return (
        <div className={styles.user}>
            <div className={styles.container}>
                <FormValidate validateMap={getValidate} toastMap={getToast} data={getData} changeFn={changeDataFn}/>
                <button onClick={submit}>提交</button>
            </div>
        </div>
    );
}

export default User;
