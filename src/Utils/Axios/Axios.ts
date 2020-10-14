import axios , { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource, CancelTokenStatic, Canceler, AxiosError}from "axios";
import queryString from "qs";
import { message } from "antd";
import { baseUrl } from "./AxiosConfig";

const mapList:Map<string, string>= new Map();

let cancelResult = null;

// 取消http请求，防止多次点击触发
const cancelToken:CancelTokenStatic = axios.CancelToken;

/** 请求拦截, 相应拦截
 * @param url          请求路径
 * @param axiosInit    axios实例
 */
const httpInit = (url: string, axiosInit: AxiosInstance) => {
    axiosInit.interceptors.request.use((config: AxiosRequestConfig) => {
        console.log(config, '???');
        config.headers.token = sessionStorage.getItem("token");
        // 不存在set一个对象
        if(!mapList.get(url)) {
            mapList.set(url, url);
        }else {
            // 存在则取消上一个请求
            config.cancelToken = new cancelToken((cancel: Canceler) => {
                mapList.delete(url);
                cancelResult = cancel;
            });
        }
        // doSomthing
        return config;
    });
    axiosInit.interceptors.response.use((config: AxiosResponse) => {
        if(mapList.has(url)) {
            mapList.delete(url);
        }
        console.log(config.data);
        switch (config.data.code) {
            case 200:
                return config.data.data;
            case 301:
                // Toast.fail(config.data.msg);
                return false;
            default:
                return false;
        }
        
    }, (err: AxiosError) => {
        console.log(err.response?.data);
        const code: number = err.response?.data.code;
        message.error("网络错误");
        return Promise.resolve(err.response)
    })
};

/** 创建axios请求对象
 * @param url        请求路径
 * @param params     请求参数
 */
const init =  (url: string, paramsData: any): Promise<any> => {
    const haveAxios: string = mapList.get(url)!;
    const axiosInit =  axios.create({
        headers: {
            // "Content-type": "application/www-form-urlencoded;charset=UTF-8",
            // "Authorization":  "Bearer " 
        },

        baseURL: baseUrl,
        method:  "post",
        timeout: 3000,
        ...paramsData
        // withCredentials: false,  // 表示跨域请求时是否需要使用凭证
    });
    httpInit(url, axiosInit);
    return axiosInit(url, paramsData);
}

/** http 请求
 * @param url      请求地址
 * @param params   请求参数
 * @param method   get | post
 */
const httpConnect =  (url: string,  params: string, method?: AxiosRequestConfig["method"]) => {
    return init(url,{
        method: method || "POST",
        data:  params
    })
}

export const post = (url: string,  params: any) => {
    return init(url,{
        method: "POST" ,
        data: queryString.stringify(params) 
    })
}

export const get = (url: string, params: any) => init(url, {
    method: "GET", params
})
export default httpConnect;