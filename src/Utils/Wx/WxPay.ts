// 支付参数类型
interface DataType {
    appId: string,         // 公众号名称，由商户传入
    timeStamp: string,     // 时间戳，自1970年以来的秒数 字符串类型
    nonceStr: string,      // 随机串
    package: string,       // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    signType: string,      // 微信签名方式：
    paySign: string,       // 微信签名
}
/** 微信内置浏览器支付
 * @param data     参数, 后台返回
 * @param success  成功回调
 * @param cancel   失败回调
 */
const wxPay = (data: DataType, success: () => void, cancel: () => void) => {
    WeixinJSBridge.invoke('getBrandWCPayRequest', 
    {...data},
    (res: any) => {
        if (res.err_msg === "get_brand_wcpay_request:ok") {
            success();
        }else {
            cancel();
        }
    })
};
export default wxPay;