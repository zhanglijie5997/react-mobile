export const mapKey = "f8b91a644d89df24e9415351357cff86"; // 高德地图key值

/** 防抖
 * @param fn     回掉函数 
 * @param time   时间
 * @example
 *      debounce(() => {
 *          // 做些什么
 *      }, 500)
 */
export const debounce = (fn: () => void, time: number) => {
    let timer: NodeJS.Timeout | null = null;
    // tslint:disable-next-line:only-arrow-functions
    return function () {
        const self = debounce;
        const args = arguments;
        if(timer){ 
            clearTimeout(timer);
            timer = null;
        };
        timer = setTimeout(() => {
            fn.apply(self, args);
        }, time)
    }
}

/** 函数节流
 * @param fn    回调函数
 * @param time  时间
 * @example 
 *      throttle(() => {
 *             // 做些什么
 *      }, 1000)
 */
export const throttle = (fn:() => void, time: number) => {
    let timer: NodeJS.Timeout  | null = null;;
    let lastTime: number = Date.now();
    return function() {
        const nowTimer: number =  Date.now();
        const args = arguments;
        const context = throttle;
        if(nowTimer - lastTime > time) {
            if(time) {
                clearTimeout(timer!);
            }
            fn.apply(context, args);
            lastTime = Date.now();
        }else {
            if(!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }, time - (nowTimer - lastTime))
            }
        }
    }
}

/** 小数点经度问题,保留2位小数
 * @param str 数据
 */
export const decimal: (str: number) => number = (str: number) => {
    // 数字类型转换字符串
    const newStr: string = str.toString();
    // 截取.前面字符串
    const pointBeforeReg:RegExp = /\d+\./g;
    const pointBefore: string = newStr.match(pointBeforeReg)![0];
    // 截取.后面的2位
    const pointAfterReg:RegExp = /\.(\d+)/g;
    const pointAfter: string = newStr.match(pointAfterReg)![0].slice(1, 3);
    return Number(pointBefore + pointAfter);
}


