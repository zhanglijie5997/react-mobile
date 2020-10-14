import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps, } from 'react-router';
import { routerConfig, bottomRouterConfig } from '../Page/Page';
import { Route, Switch, Redirect, NavLink, Link } from "react-router-dom";
import { RouteConfigType } from '../Page/PageType';
import { useSelector } from "react-redux";
import { menuDevList } from "@Utils/Base/Base";
import styles from "./Router.scss";
import { Col, Layout, Menu, Row, Tag } from 'antd';
import watermark from '@/Utils/Base/canvas';
import { MailOutlined } from "@ant-design/icons";
import { adminSysPermissionFindMenuPermission } from '@/Http/LoginHttp/LoginHttp';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const RouterPage = (props: RouteComponentProps) => {
    const [getRouterConfigPage, setRouterConfigPage] = useState<RouteConfigType[]>(bottomRouterConfig.concat(routerConfig)); // 路由配置
    const [getShowAppBar, setShowAppBar] = useState<string[]>(["/user", "/index", "/", "/shop", "/reservation"]);
    const [getSelectPage, setSelectPage] = useState<number>(-1); // 当前选择页面
    const [getPage, setPage] = useState<string>("/index");
    const [getSelectedKesy, setSelectedKeys] = useState<string[]>(['系统管理']);
    const [getCollapsed, setCollapsed] = useState<boolean>(false); // 收起状态
    const [getOpenKeys, setOpenKeys] = useState<string[]>(['sub1']);
    const [getRootSubmenuKeys, setRootSubmenuKeys] = useState<string[]>(['sub1', 'sub2', 'sub4']);
    const [getSelectTwo, setSelectTwo] = useState<any[]>([]);
    const [getHeaderSelectKeys, setHeaderSelectKeys] = useState<string[]>(['0']);
    const [getShow, setShow] = useState<string[]>(["back:tipOff:list", "back:tipOff"]);
    const userStatus = useSelector((state: {
        userStatusReducer: boolean,
        isIphoneXReducer: boolean,
        setUserTokenReducer: string,
    }) => ({ userStatusReducer: state.userStatusReducer, isIphoneXReducer: state.isIphoneXReducer, token: state.setUserTokenReducer })); // 用户登陆状态, 此处为获取redux state参数,可以用对象获取自己需要的参数

    useEffect(() => {
        const result = menuDevList[0].subList;
        setSelectTwo(result!);
        watermark?.set("zhanglijie");
        if(userStatus.token) {
            getPermissionMenu();
        }
    }, [userStatus.token]);

    const getPermissionMenu = useCallback(async () => {
        const _ = await adminSysPermissionFindMenuPermission();
        console.log(_);
        setShow(_);
    }, [getShow])

    const changeCollapsed = useCallback((e) => {
        setCollapsed(e);
    }, [getCollapsed]);

    // 点击一级菜单
    const changeMenuItem = useCallback((e) => {
        const [selectKeys, openKeys] = e.keyPath;
        setSelectedKeys([selectKeys]);
    }, [getSelectedKesy, getOpenKeys])

    const changeSelect = useCallback((e) => {
        console.log(e);
        if(e.key === "showUser") {
            return;
        }
        const result = menuDevList.find((_, i: number) => {
            // console.log(_, e, 'nnnn');
            return i === +e.key;
        });
        setSelectTwo(result!.subList);
    }, [getSelectTwo])
    // 导航, 重定向路由不显示在页面
    // const routerNav: JSX.Element[] = bottomRouterConfig.map((item: RouteConfigType, index: number) => {
    //     return <div key={index} className={styles.navItem} onClick={() => navgiation(index, item.path)}>
    //         <div className={styles.navitemBox}>
    //             <img src={getSelectPage === index ? item.selectImg : item.defaultImg} alt="" />
    //             <p className={[getSelectPage === index ? styles.selectColor : ''].join(" ")}>{item.meta.title}</p>
    //         </div>
    //     </div>
    // })
    // 路由页面
    const routerPage: JSX.Element[] = getRouterConfigPage.map((item: RouteConfigType, index: number) => {
        return <Route path={item.path} exact={item.excat} key={index} render={(itemProps: RouteComponentProps) => {
            // if (!item.meta.requiresAuth || item.path === "/login") {
            //     document.title = item.meta.title;
            //     return <item.component {...itemProps} />
            // }
            return <item.component {...itemProps} />
            return <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
        }} />
    });

    const close = useCallback(function (e) {
        console.log(e);
    }, []);

    const openChange = useCallback((openKeys) => {
        const latestOpenKey = openKeys.find((key: string) => getOpenKeys.indexOf(key) === -1);
        if (getRootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            // this.setState({ openKeys });
            console.log(latestOpenKey, 1);

            setOpenKeys(openKeys);
        } else {
            // this.setState({
            //     openKeys: latestOpenKey ? [latestOpenKey] : [],
            // });
            console.log(latestOpenKey, 2);

            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    }, [getOpenKeys, getRootSubmenuKeys]);

    const menuHeaderList = menuDevList.map((_, index: number) => {
        // console.log();
        return <Menu.Item key={index}>{_.title}</Menu.Item>
    })

    // const isShow = useCallback();

    return (
        <div className={styles.routerName}>
            {/* 路由页面 */}
            {/* 导航页 */}
            {/* { getShowAppBar.includes(props.location.pathname) ? <div className={styles.appBar}>
                <div className={styles.navBox}>{routerNav}</div>
            </div> : null } */}
            <Layout>
                <Sider theme="light" className={styles.sider} collapsible={true} collapsed={getCollapsed} onCollapse={changeCollapsed}>
                    <div className={styles.logo} style={{ width: getCollapsed ? 80 : 200 }} onClick={() => setCollapsed(true)}>
                        <span>H</span>
                        {getCollapsed ? null : <span>速百读</span>}
                    </div>
                    <Menu
                        defaultSelectedKeys={getSelectedKesy}
                        defaultOpenKeys={getOpenKeys}
                        mode="inline"
                        onOpenChange={openChange}
                        onClick={changeMenuItem}
                        selectedKeys={getSelectedKesy}
                        openKeys={getOpenKeys}
                    >
                        {
                            getSelectTwo.map(_ =>  (getShow.includes(_.roleTypes) ? <SubMenu key={_.roleTypes} title={
                                <span>
                                    <span>{ _.label }</span>
                                </span>
                            }>  
                                {
                                    _.subs.map((e: any) => ( getShow.includes(e.roleTypes) ? <Menu.Item key={e.roleTypes}>{ e.title }</Menu.Item> : null))
                                }
                                    
                            </SubMenu>: null))
                        }
                        
                    </Menu>
                </Sider>
            </Layout>
            <Layout>
                <Row>
                    <Col  style={{ width: "100%!important" }}>
                        <Header style={{ backgroundColor: "#fff", width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <Menu theme="light" onSelect={changeSelect}
                                mode="horizontal" defaultSelectedKeys={getHeaderSelectKeys} >
                                {menuHeaderList}
                            </Menu>
                            <div className={styles.user}>
                                Zhang
                            </div>
                        </Header>
                        
                    </Col>
                </Row>
                <Content style={{ padding: 10 }}>
                    <ul className={styles.ul}>
                        <li>
                            <Tag style={{ height: "30px", alignItems: "center", display: "flex" }}
                                color="blue" closable={true} onClose={() => close(1)}>首页</Tag>
                        </li>
                    </ul>
                    <div className={styles.routerSwich}>
                        <Switch>
                            {routerPage}
                        </Switch>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}
export default RouterPage;