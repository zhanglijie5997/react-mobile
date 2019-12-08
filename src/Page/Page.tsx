import { RouteConfigType } from './PageType';
import loadable from '@loadable/component';
const Home = loadable(() => import("./Home/Home"));
const User = loadable(() => import("./User/User"));

// 底部路由配置
export const bottomRouterConfig: RouteConfigType[] = [
    {
        path: "/index",
        excat: true,
        component: Home,
        meta: {
            title: "主页",
            requiresAuth: false
        }
    },
    {
        path: "/user",
        excat: true,
        component: User,
        meta: {
            title: "个人中心",
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
    
];

export const routerConfig = routerConfigOutherPage.concat(defaultPage);

