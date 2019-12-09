
import { LoadableComponent } from '@loadable/component';
import { RouteComponentProps, StaticContext } from 'react-router';


// 路由类型
export  interface RouteConfigType  {
    path: string,  // 路径
    excat: boolean,// 严格匹配还是非严格匹配
    component: LoadableComponent<RouteComponentProps<{}, StaticContext, any>>, // 组件名称
    name?: string,// 底部appBar参数
    defaultImg?: string,// 默认图片
    selectImg?: string, // 选中图片
    meta: {
        title: string, // document.title 字段 
        requiresAuth: boolean,// 是否需要登录
    }
}
