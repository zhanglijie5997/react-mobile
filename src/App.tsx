import React, {  useEffect, useCallback, useState } from 'react';
import { withRouter ,useHistory, Switch, Route} from "react-router-dom";
import { Redirect, RouteComponentProps } from "react-router";
import styles from "./App.scss";
import { useDispatch, useSelector } from 'react-redux';
import { LocationType } from './Redux/State/StateType';
import { userLocalAction, iphoneXAction } from './Redux/Actions/Actions';
import './Static/Css/Base.scss'
import { IsIphoneXHook } from './Hooks/IsIphoneX';
import Login from './Page/Login/Login';
import { RouteConfigType } from './Page/PageType';
import { bottomRouterConfig, routerConfig } from './Page/Page';
import RouterPage from './Router/Router';
const App = (props: RouteComponentProps<any, any>) => {
  const [getRouterConfigPage, setRouterConfigPage] = useState<RouteConfigType[]>(bottomRouterConfig.concat(routerConfig)); // 路由配置
  const iphoneXStatus = IsIphoneXHook();
  const dispatch = useDispatch();
  const $router = useHistory()
  const select = useSelector((state: {
    setUserTokenReducer: string
  }) => state.setUserTokenReducer);
  useEffect(() => {
    dispatch(iphoneXAction(iphoneXStatus));
    if(select.length === 0) {
      // $router.push("/login")
    }
  }, []) 
  const routerPage: JSX.Element[] = getRouterConfigPage.map((item: RouteConfigType, index: number) => {
    return <Route path={item.path} exact={item.excat} key={index} render={(itemProps: RouteComponentProps) => {
        if (!item.meta.requiresAuth || item.path === "/login") {
            document.title = item.meta.title;
            return <item.component {...itemProps} />
        }

        return <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
    }} />
});
  /** 成功回调 */
  const onComplete = useCallback((event: LocationType) => {
    console.log(event, '地理位置');
    // 全局管理用户地理位置
    dispatch(userLocalAction(event));
  },[dispatch]);
  /** 失败回调 */
  const onError = useCallback((event) => {
    // Toast.fail("获取地理位置失败, 请刷新重试");
    console.warn("获取地理位置失败, 请刷新重试")
  },[dispatch])
  return (
    <div className={styles.appBar}>
        {/*kankna*/}
        {
          select.length === 0 ? <Login {...props}/> : <RouterPage {...props}/>
        }
    </div>
  )
}
export default withRouter(App);
