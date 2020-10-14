import { adminLogin } from '@/Http/LoginHttp/LoginHttp';
import { setUserToken } from '@/Redux/Actions/Actions';
import { Form, Input , Checkbox, Button, message} from 'antd';
import React, { useEffect, useCallback, Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router'
import { onFocusFn, onBlurFn } from 'src/Utils/Base/IosQuestion';
import styles from "./Login.scss";
import {  useHistory} from "react-router";
interface FinishParamsType {
    logo: undefined | string
    password: string
    remember: boolean
    username: string
}

const Login = (props: RouteComponentProps) => {
    const dispatch = useDispatch();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 24},
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = async (values: FinishParamsType) => {
        console.log('Success:', values);
        const { password, username } = values;
        const data = await adminLogin(username, password);
        console.log(data);
        dispatch(setUserToken(data.token));
        console.log(props, '...')
        // props.history.push("/")
        message.success("登录成功")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={styles.login}>
            <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}>
                <Form.Item
                    label=""
                    name="logo"
                >
                    <span className={styles.logo}>
                        欢迎登录速百读管理后台
                    </span> 
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>记住账号</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login;
