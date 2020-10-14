// scss 模块化
declare module "*.scss"{
    const res: any;
    export default res;
}

// 全局使用微信
declare const wx: any;

// 微信支付
declare const WeixinJSBridge: any;

// 全局组件使用
declare const AMap: any;

declare interface Window {
    onLoad: () => void
    goLogin: {
        postMessage: (args: string) => void
    }
}


