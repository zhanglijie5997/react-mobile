import { RefObject } from 'react';

export interface ListViewType {
    offset: number, // 距离底部多少开始加载
    loadingText: string , // 加载提示文字
    finishText: string | JSX.Element, // 完成提示文字
    loading: boolean, // 加载状态
    finish: boolean, // 加载完成状态
    children: JSX.Element, // 组件，可以是任意组件
    onload: () => Promise<void>
}


export interface ListViewStateType {
    getAnimation: number, // requestAnimationFrame实例
}