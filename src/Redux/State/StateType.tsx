/** 地图类型 */
export interface LocationType {
    addressComponent: {
        adcode: string, // 城市编码
        city: string,  // 城市
        district: string,// 区
        neighborhood: string, // 区的具体位置
        province: string,// 省份
        street: string, // 街道
        township: string, // 街道名称
        streetNumber: string, // 门牌号
    },
    position: {
        lat: number, // 纬度
        lng: number, // 经度
    }
}


