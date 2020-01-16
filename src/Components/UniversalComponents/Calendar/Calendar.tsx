import React, { useEffect, useState, useCallback } from 'react'
import styles from "./Calendar.scss";
import  { RouteComponentProps } from 'react-router';
import Times from "@Utils/Base/Times";

interface ShowMonthType {
    year: number,
    month: number,
    day: number,
    haveDay?: number,
    week?: number,
    currentYearMonth?: string,
    list?: number[],
    currentTime?: number
}
/** 日历组件
 *  @param props
 *      @param routerFn  路由方法
 *      @param date      当前时间时间戳
 *      @param showMonth 展示多少个月
 */
const Calendar = (props: {routerFn: RouteComponentProps,date: number,showMonth: number}) => {
    const [getCurrentDay, setCurrentDay] = useState<JSX.Element[]>(); // NodeList
    const [getSelect, setSelect] = useState<number>(-1); // 选择的时间
    const [getSelectSatus, setSelectStatus] = useState<boolean>(false); // 状态
    useEffect(() => {
        if(!getSelectSatus) {
            setSelect(Times.currentTime(props.date));
        }
        monthList();
    }, [props.date, getSelect]);
    // 月份列表
    const monthList = () => {
        setSelectStatus(true)
        // 当前时间
        const currentTime = Times.dateFormat(props.date);
        let showMonth = props.showMonth;
        let arr = [];
        while (showMonth>0) {
            const month = currentTime.month + showMonth;
            const demo = Math.floor(month / 13);
            const showDateFormat:ShowMonthType = {
                year:  currentTime.year + demo ,
                month: month > 12 ? (month % 12 === 0 ? 12 : month % 12) : month,
                day: 0,
            }; 
            const curTime = new Date(showDateFormat.year,showDateFormat.month,0).getTime();
            const haveDay = Times.monthHaveDay(curTime); 
            const week = Times.dateWeek(curTime);
            showDateFormat["haveDay"] = haveDay;
            showDateFormat["week"] = week;
            showDateFormat["currentTime"] = Times.currentTime(curTime);
            showDateFormat["currentYearMonth"] = `${showDateFormat.year}年-${showDateFormat.month}月`;
            arr.push(showDateFormat)
            showMonth--;
        }
        
        arr.push({year: currentTime.year, 
            month: currentTime.month, 
            day: currentTime.day, 
            haveDay: Times.monthHaveDay(props.date),
            week: Times.dateWeek(props.date),
            currentYearMonth: `${currentTime.year}年-${currentTime.month}月`,
            currentTime: Times.currentTime(props.date)
        })
        arr = arr.reverse();
        // 列表
        const dayListNode = arr.map((item:ShowMonthType, index: number) => {
            const before = new Array(item.week).fill(-1);
            const after = new Array(item.haveDay).fill(1).map((_: number, index: number) => {
                return {day:_ + index, currentTime: Times.currentTime(new Date(`${item.year}/${item.month}/${_+index}`).getTime())};
            });
            const list = [...before, ...after];
            const nodeList = {...item,list};
            return node(nodeList);
        });
        setCurrentDay(dayListNode);
    }
    const node = useCallback((_:ShowMonthType): JSX.Element => {
        return ( <div>
                    <p>{_.currentYearMonth}</p>
                    <ul className={styles.calenderUl}>
                        { _.list?.map((item: any, index: number) => {
                            return <li key={index} className={getSelect === item.currentTime ? styles.select: `` } 
                            onClick={() => setSelect(item.currentTime)}>{item.day}</li>
                        }) }
                    </ul>
                </div>
              )
    },[getSelect])
    return (
        <div className={styles.calender}>
            {getCurrentDay?.map((_: JSX.Element, index: number) => {
                return <div key={index}>{_}</div>
            })}
        </div>
    )
}
export default Calendar
