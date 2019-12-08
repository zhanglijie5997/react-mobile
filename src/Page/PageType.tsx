import { LazyExoticComponent } from 'react';
import { LoadableComponent } from '@loadable/component';
import { RouteComponentProps, StaticContext } from 'react-router';

// 路由类型
export interface RouteConfigType {
    path: string,
    excat: boolean,
    component: LoadableComponent<RouteComponentProps<{}, StaticContext, any>>,
    // name: string,
    meta: {
        title: string,
        requiresAuth: boolean
    }
}