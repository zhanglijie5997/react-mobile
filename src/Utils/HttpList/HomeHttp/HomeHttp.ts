import axiosInit from "../../Axios/Axios";
import { GetMusicUrltype } from "./HomeHttpType";


/** 请求示例
 * @param id      
 */
export async function getMusicUrl<T>(id: string): Promise<T> {
    const data: T = await axiosInit( "/posts", { a: 1});
    return data;
}


