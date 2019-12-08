/** 是否是微信浏览器 
 * @param type 'isWx' | 'isAndrois' | 'isIos' 平台类型
 * @example 
 *  微信浏览器
 *  const phoneType: string = userAgent("isWx"); ||
 *  const phoneType: string = userAgent("isAndroid");||
 *  const phoneType: string = userAgent("isAndroid");
 * @returns 
 *      boolean 结果返回布尔值
 */
type UserAgentType = "isWx" | "isAndroid" | "isIos";
const userAgent: (type: UserAgentType) => boolean = (type: UserAgentType) => {
    const navigatorUserAgent: string = window.navigator.userAgent.toUpperCase();
    const map:Map<string, () => boolean> = new Map([
        ["isWx",      () => navigatorUserAgent.includes("MICROMESSENGER")],
        ["isAndroid", () => navigatorUserAgent.includes("ANDROID")],
        ["isIos",     () => navigatorUserAgent.includes("IOS")],
    ]);
    return map.get(type)!();
}