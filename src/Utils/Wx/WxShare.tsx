/** 微信分享配置参数 参数没有则设置为空
 * @param title      分享标题
 * @param desc       分享描述
 * @param link       分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param imgUrl     分享图标
 * @param successFn  成功回调
 * @param cancelFn   失败回调
 */
const wxShare = (title: string, desc: string, link: string, imgUrl: string, successFn: () => void, cancelFn: () => void) => {
    // 分享平台类型
    const wxShareArr: string[] = ['onMenuShareWeibo', 'onMenuShareQZone', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'];
    wx.ready(() => {
        wxShareArr.forEach((item: string, index: number) => {
            wx[item]({
                title,
                desc,
                link,
                imgUrl,
                success: () => {
                    successFn();
                },
                cancel: () => {
                    cancelFn();
                }
            })
        });
    })
};
export default wxShare;