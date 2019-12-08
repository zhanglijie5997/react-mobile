import { clearTimeout } from 'timers';
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

