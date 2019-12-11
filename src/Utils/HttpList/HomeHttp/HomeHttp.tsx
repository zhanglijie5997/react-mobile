import axiosInit from "../../Axios/Axios";
import { GetMusicUrltype } from "./HomeHttpType";


/** 请求示例
 * @param id      
 */
export const getMusicUrl = async (id: string): Promise<GetMusicUrltype> => {
    const data: GetMusicUrltype = await axiosInit( "/posts", { a: 1});
    return data;
}


