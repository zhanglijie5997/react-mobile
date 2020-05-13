import { DateFormatType } from './TimesType';

class Times {
    public static instance = new Times();
    /** 时间格式化
     *  @param date 时间戳
     *  @returns DateFormatType
     */
    public dateFormat(date: number):DateFormatType {
        const currentDate = new Date(date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hour = currentDate.getHours();
        const milliseconds = currentDate.getMilliseconds();
        return {
            year,
            month,
            day,
            hour,
            milliseconds
        }
    }

    /** 获取周几
     *  @param date 时间戳
     *  @returns number
     */
    public dateWeek(date: number): number {
        const currentWeek = new Date(date).getDay();
        return currentWeek;
    }

    /** 获取这个月有多少天
     *  @param date 时间戳
     */
    public monthHaveDay(date: number): number {
        const current = this.dateFormat(date);
        const { year, month, day} = current;
        const currentMonthHaveDay = new Date(year, month, 0).getDate();
        return currentMonthHaveDay;
    }

    /** 获取今天的00:00的时间戳
     *  @param date 时间戳
     */
    public currentTime(date: number): number {
        const current = this.dateFormat(date);
        const { year, month, day} = current;
        const currentMonthHaveDay = new Date(`${year}/${month}/${day}`).getTime();
        return currentMonthHaveDay;
    }
}
const TimesInstance = Times.instance;
export default TimesInstance;