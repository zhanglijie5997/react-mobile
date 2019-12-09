import axios , { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource, CancelTokenStatic, Canceler}from "axios";
import queryString from "qs";
import { Toast } from "antd-mobile";
import { baseUrl } from "./AxiosConfig";

const mapList:Map<string, string>= new Map();

let cancelResult = null;

// 取消http请求，防止多次点击触发
const cancelToken:CancelTokenStatic = axios.CancelToken;

/** 请求拦截, 相应拦截
 * @param url          请求路径
 * @param axiosInit    axios实例
 */
const httpInit = async (url: string, axiosInit: AxiosInstance) => {

    axiosInit.interceptors.request.use((config: AxiosRequestConfig) => {
        console.log(mapList.get(url), 'mapList.get(url)');
        console.log(config.cancelToken, '???');
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
        return  Promise.resolve(config.data);
    }, (err: Error) => {
        Toast.fail("网络错误, 请刷新重试");
    })
};

/** 创建axios请求对象
 * @param url        请求路径
 * @param params     请求参数
 */
const init = async (url: string, paramsData: any): Promise<any> => {
     // 请求是判断是否请求结果未翻译，有则取消上一个请求
    // mapList.set(url, url)
    const haveAxios: string = mapList.get(url)!;
     console.log(haveAxios, 'mmm');
    const axiosInit =  axios.create({
        baseURL: baseUrl,
        method: paramsData.method.toUpperCase() || "GET",
        timeout: 10000,
        // withCredentials: false,  // 表示跨域请求时是否需要使用凭证
        ...paramsData,
        params: queryString.stringify(paramsData.data),     
        cancelToken: haveAxios ? await cancelToken.source().token: ''
    });
    // cancelTokenSource(url).cancel("delete");
    await httpInit(url, axiosInit);
     
    return axiosInit(url, paramsData);
}

export default init;