import axiosInit from "../../Axios/Axios";
import { GetMusicUrltype } from "./HomeHttpType";


/** 请求示例
 * @param id      
 */
export const getMusicUrl = async (id: string): Promise<GetMusicUrltype> => {
    const data: GetMusicUrltype = await axiosInit("/song/url?id=" + id, {method: "GET", data:{}});
    return data;
}


