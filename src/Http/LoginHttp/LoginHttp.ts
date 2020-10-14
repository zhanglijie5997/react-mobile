import { post, get } from "@Utils/Axios/Axios";
/**
 * 登录
 * @param userName  用户名
 * @param password  密码
 */
export const adminLogin = (userName: string, password: string) => post("/admin/login", {userName, password});

// 获取权限
export const adminSysPermissionFindMenuPermission = () => get('/admin/sysPermission/findMenuPermission', {})