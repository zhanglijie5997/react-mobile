import React, { useEffect ,useState, useCallback } from "react";
import {  RouteComponentProps,  } from 'react-router';
import { routerConfig, bottomRouterConfig } from '../Page/Page';
import { Route, Switch, Redirect, NavLink, Link} from "react-router-dom";
import { RouteConfigType } from '../Page/PageType';
import { useSelector } from "react-redux";
import styles from "./Router.scss";
import { Toast } from 'antd-mobile';

const RouterPage: (props: RouteComponentProps) => JSX.Element = (props: RouteComponentProps) => {
    const [getRouterConfigPage, setRouterConfigPage] = useState<RouteConfigType[]>(bottomRouterConfig.concat(routerConfig)); // 路由配置
    const [getShowAppBar, setShowAppBar] = useState<string[]>(["/user", "/index", "/", "/shop", "/reservation"]);
    const [getSelectPage, setSelectPage] = useState<number>(-1); // 当前选择页面
    const [getPage, setPage] = useState<string>("/index");
    const userStatus = useSelector((state: { 
        userStatusReducer: boolean,
        isIphoneXReducer: boolean
    }) => ({userStatusReducer: state.userStatusReducer, isIphoneXReducer: state.isIphoneXReducer})); // 用户登陆状态, 此处为获取redux state参数,可以用对象获取自己需要的参数
    
    useEffect(() => {
        const pageSelect: number = nowPage.get(props.location.pathname)!();
        setSelectPage(pageSelect);
        const page = props.location.pathname;
        setPage(page);
    }, [userStatus, props.location]);

    // 当前所处页面Map对象
    const nowPage:Map<string, () => number> = new Map([
        ["/", () => 0],
        ["/index", () => 0],
        ["/shop", () => 1],
        ["/reservation", () => 2],
        ["/user", () => 3],
    ]);

    const navgiation = useCallback((index: number, to: string ) => {
        setSelectPage(index);
        if(getPage === to) {
            return
        }else {
            setPage(to);
            props.history.push(to)
        }
    },[getPage])

    // 导航, 重定向路由不显示在页面
    const routerNav: JSX.Element[] =  bottomRouterConfig.map((item: RouteConfigType, index: number) => {
        return <div  key={index} className={styles.navItem} onClick={() => navgiation(index, item.path)}>
                  <div  className={styles.navitemBox}>
                    <img src={getSelectPage === index ? item.selectImg : item.defaultImg} alt=""/>
                    <p className={[getSelectPage === index ? styles.selectColor : ''].join(" ")}>{item.meta.title}</p>
                  </div>
               </div>
    }) 
    // 路由页面
    const routerPage: JSX.Element[] = getRouterConfigPage.map((item: RouteConfigType, index: number) => {
        return <Route path={item.path} exact={item.excat} key={index} render={(itemProps: RouteComponentProps) => {
            if(!item.meta.requiresAuth || item.path === "/login") {
                document.title = item.meta.title;
                return <item.component {...itemProps} />
            }
            // 用户没有登录的情况
            Toast.fail("请先登录", 3, () => {
                 
            })
            return <Redirect to={{ pathname: "/home", state: { from: props.location } }} />                
        }}/>
    });
    return (
        <div>
            {/* 路由页面 */}
            <div className={styles.pageView}>
                <Switch>
                    {routerPage}
                </Switch>
            </div>
            {/* 导航页 */}
            { getShowAppBar.includes(props.location.pathname) ? <div className={styles.appBar}>
                <div className={styles.navBox}>{routerNav}</div>
            </div> : null }
            
        </div>
    )
}
export default RouterPage;