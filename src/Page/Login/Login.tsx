import React, { useEffect, useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import { onFocusFn, onBlurFn } from 'src/Utils/Base/IosQuestion';

const Login = (props: RouteComponentProps) => {
    
    return (
        <>
            登录
            <input type="text" onFocus={onFocusFn} onBlur={onBlurFn}/>
        </>
    )
}
export default Login;
