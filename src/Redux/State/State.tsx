import { LocationType } from './StateType';

export const userStatus: boolean = localStorage.getItem("userStatus") ? 
                                                                      localStorage.getItem("userStatus") === "true" ? true : false 
                                                                                                                                : false; // 用户状态

export const token: string = ''; // 用户token

export const userLocal: LocationType = sessionStorage.getItem("userLocal") ?  JSON.parse(sessionStorage.getItem("userLocal")!) : {
    addressComponent: {
        adcode: "", // 城市编码
        city: "",  // 城市
        district: "",// 区
        neighborhood: "", // 区的具体位置
        province: "",// 省份
        street: "", // 街道
        township: "", // 街道名称
        streetNumber: "", // 门牌号
    },
    position: {
        lat: 0, // 纬度
        lng: 0, // 经度
    }
};
