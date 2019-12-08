import axios , { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource}from "axios";
import queryString from "qs";
import { Toast } from "antd-mobile";
import { baseUrl } from "./AxiosConfig";

const mapList:Map<string, string>= new Map();

// 取消http请求，防止多次点击触发
const cancelAxios:CancelTokenSource = axios.CancelToken.source();

/** 请求拦截, 相应拦截
 * @param url          请求路径
 * @param axiosInit    axios实例
 */
const httpInit = async (url: string, axiosInit: AxiosInstance) => {

    axiosInit.interceptors.request.use((config: AxiosRequestConfig) => {
        mapList.set(url, url);
        // doSomthing
        return config;
    });
    axiosInit.interceptors.response.use((config: AxiosResponse) => {
        if(mapList.has(url)) {
            mapList.delete(url);
        }
        return  Promise.resolve(config.data);
    }, (err: Error) => {
        Toast.fail("网络错误, 请刷新重试");
    })
};

/** 创建axios请求对象
 * @param url        请求路径
 * @param params     请求参数
 */
const init = async (url: string, params: any): Promise<any> => {
    // 请求是判断是否请求结果未翻译，有则取消上一个请求
    const oldAxios = mapList.get(url);
    const axiosInit =  axios.create({
        baseURL: baseUrl,
        method: params.method.toUpperCase() || "GET",
        timeout: 5000,
        ...params,
        data: queryString.stringify(params.data),
        // 如果请求重复, 则取消上一次请求
        cancelToken: oldAxios ?  cancelAxios.token : null,
    });
    await httpInit(url, axiosInit);
    // console.log(baseUrl);
    return axiosInit(url, params);
}

export default init;