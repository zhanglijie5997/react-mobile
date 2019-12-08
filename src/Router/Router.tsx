import React, { useEffect ,useState, useCallback } from "react";
import {  RouteComponentProps,  } from 'react-router';
import { routerConfig, bottomRouterConfig } from '../Page/Page';
import { Link, Route, Switch, Redirect, NavLink} from "react-router-dom";
import { RouteConfigType } from '../Page/PageType';
import { useSelector } from "react-redux";
import styles from "./Router.scss";

import { userStatusAction } from "src/Redux/Actions/Actions";
const RouterPage: (props: RouteComponentProps) => JSX.Element = (props: RouteComponentProps) => {
    const [routerConfigPage, setRouterConfigPage] = useState<RouteConfigType[]>(bottomRouterConfig.concat(routerConfig)); // 路由配置
    const userStatus = useSelector((state: { userStatusReducer: boolean}) => state.userStatusReducer); // 用户登陆状态, 此处为获取redux state参数,可以用对象获取自己需要的参数
    useEffect(() => {
        console.log(routerConfigPage, '??');
        
    }, [userStatus]);

    const nowPage:Map<string, () => string> = new Map([
        ["/home", () => "/home"],
        ["/user", () => "/user"],
    ]);

    // 导航, 重定向路由不显示在页面
    const routerNav: JSX.Element[] = bottomRouterConfig.map((item: RouteConfigType, index: number) => (<NavLink to={item.path} key={index}>{item.meta.title}</NavLink>)) 
    // 路由页面
    const routerPage: JSX.Element[] = routerConfigPage.map((item: RouteConfigType, index: number) => {
        return <Route path={item.path} exact={item.excat} key={index} render={(itemProps: RouteComponentProps) => {
            if(!item.meta.requiresAuth || item.path === "/login") {
                // console.log(item)
                document.title = item.meta.title;
                return <item.component {...itemProps} />
            }
            return <Redirect to={{ pathname: "/home", state: { from: props.location } }} />                
        }}/>
    });
    return (
        <div>
            

            
            {/* 路由页面 */}
            <Switch>
                { routerPage }
            </Switch>
            {/* 导航页 */}
            <div className={styles.appBar}>
                {routerNav}
            </div>
        </div>
    )
}
export default RouterPage;