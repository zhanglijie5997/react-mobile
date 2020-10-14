import { Toast } from 'antd-mobile';
import axiosInit from "../../Axios/Axios";


/** 请求示例
 * @param id      
 */
// export async function personalizedNewsong<T>(): Promise<T> {
//     // const data: T = await axiosInit("/personalized/newsong", {}, 'get');
//     // return data;
// }


/** 获取下载链接
 *  GET /common/getNewVersion
 */
// export async function download<T>(): Promise<T> {
//     const data: T = await axiosInit("/common/getNewVersion", {}, 'get');
//     return data['data'];
// }

/** POST /sso/inviteUser 邀请好友
 *  @param code          邀请码
 *  @param phone         手机号
 */
// export async function inviteUser(code: string, phone: string) {
//     const data = await axiosInit("/sso/inviteUser", {
//         "inviteCode": code,
//         "phone": phone
//     }, "post");
//     if(data['code'] === 200) {
//         Toast.success("注册成功", 2, () => {
//             window.goLogin.postMessage("");
//         })
//     }
//     return data['data'];
// }
