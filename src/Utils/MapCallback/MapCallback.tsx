/** 坐标逆解析
 * @param base city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
 */
export const locationInverseAnalysis: (base: string) => Promise<any> = (base: string) => {
   return new Promise((resolve, reject) => {
        const aMap = new AMap.Map("container");
        aMap.plugin("AMap.Geocoder", function() {
            const geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: base,
            })
            geocoder.getLocation('北京市海淀区苏州街', function(status: string, result: any) {
                if (status === 'complete' && result.info === 'OK') {
                // result中对应详细地理坐标信息
                    resolve(result);
                }
            })
        });
    }).then(res => {
        return res;
    })
    
}