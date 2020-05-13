import { imgToBase64, base64ToBolb } from '@/Utils/Base/Base';
import axiosInit from "../../Axios/Axios";
/** 上传图片并且压缩
 *  @param file file对象 
 */
export const upload = async (file: File) => {
    const name = file.name.split(".")[0];
    const fileSize: number = file.size;
    // 最大尺寸
    const maxSize: number = 2 * 1024 * 1024;
    const formData = new FormData();
    const reader = new FileReader();
    let result;
    if(fileSize > maxSize) {
        result =  await new Promise((resolve, reject) => {
            reader.readAsDataURL(file);
            reader.onload = async (e:any) => {
                const base64 = await imgToBase64(e.target.result) as string;
                const toBolb = await base64ToBolb(base64);
                resolve(toBolb)
            }
        }).then(async (res: Blob) => {
            const file = new File([res], Date.now() + name + ".jpeg", {type: "image/jpeg"})
            formData.append("file", file)
            const data = await axiosInit("xxx",{
                formData
            });
            return data;
        }).catch(err => {
            return null;
        })
    }else {
        formData.append("file", file)
        result = await axiosInit("xxx", {
            formData
        });
        return result;
    }
    
    return result["data"]
    
}