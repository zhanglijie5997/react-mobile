import { RouteConfigType } from "./PageType";
import loadable from "@loadable/component";
const Login = loadable(() => import(/* webpackChunkName: "Login" */ "./Login/Login" ))
const Home = loadable(() => import(/* webpackChunkName: "Home" */ "./Home/Home"));
const User = loadable(() => import(/* webpackChunkName: "User" */"./User/User"));
const Shop = loadable(() => import(/* webpackChunkName: "Shop" */"./Shop/Shop"));
const Reservation = loadable(() => import(/* webpackChunkName: "Reservation" */"./Reservation/Reservation"));

import home from "@Static/Images/AppBar/heigshouye_9_12.9@2x.png"; // 首页未选中
import homeSelect from "src/Static/Images/AppBar/hongshouye_9_12.9@2x.png"; // 首页选中
import shop from "src/Static/Images/AppBar/heishangpin_9_12.9@2x.png"; // 商品未选中
import shopSelect from "src/Static/Images/AppBar/hongishangpin_9_12.9@2x.png"; // 商品选中
import vip from "src/Static/Images/AppBar/heihuiyuan_9_12.9@2x.png"; // vip选中
import vipSelect from "src/Static/Images/AppBar/honghuiyuan_9_12.9@2x.png"; // vip选中
import reservation from "src/Static/Images/AppBar/heiyuyue_9_12.9@2x.png"; // 预约未选中
import reservationSelect from "src/Static/Images/AppBar/hongyuyue_9_12.9@2x.png"; // 预约选中




// 底部路由配置
export const bottomRouterConfig: RouteConfigType[] = [
    {
        path: "/index",
        excat: true,
        component: Home,
        name: "主页",
        defaultImg: home,
        selectImg: homeSelect,
        meta: {
            title: "主页",
            requiresAuth: false
        }
    },
    {
        path: "/shop",
        excat: true,
        component: Shop,
        name: "商品",
        defaultImg: shop,
        selectImg: shopSelect,
        meta: {
            title: "商品",
            requiresAuth: false
        }
    },
    {
        path: "/reservation",
        excat: true,
        component: Reservation,
        name: "预约",
        defaultImg: reservation,
        selectImg: reservationSelect,
        meta: {
            title: "预约",
            requiresAuth: false
        }
    },
    {
        path: "/user",
        excat: true,
        component: User,
        name: "会员",
        defaultImg: vip,
        selectImg: vipSelect,
        meta: {
            title: "会员",
            requiresAuth: false
        }
    }
]

// 默认路由配置数组
const defaultPage: RouteConfigType = {
    path: "*",
    excat: false,
    component: Home,
    meta: {
        title: "主页",
        requiresAuth: false
    }
};

// 其他路由配置数组, 新增加的路由只需要在这里添加
const routerConfigOutherPage:RouteConfigType[] = [
    {
        path: "/login",
        excat: false,
        component: Login,
        meta: {
            title: "登录",
            requiresAuth: false
        }
    }
];

export const routerConfig = routerConfigOutherPage.concat(defaultPage);

