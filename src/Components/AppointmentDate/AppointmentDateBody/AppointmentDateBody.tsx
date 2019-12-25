import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import styles from "./AppointmentDateBody.scss";
import { dateFormat } from '@Utils/Base/Base';
import { DateFormatType } from '@Utils/Base/BaseTypes';
import { MonthHaveDay } from './AppointmentDateBodyType';
import { Toast } from 'antd-mobile';
const AppointmentDateBody = (props: {routeFn: RouteComponentProps, date: number}) => {
    const [getNowMonth, setNowMonth] = useState<number>(-1); // 当前月份
    const [getNowDay, setNowDay] = useState<string>(""); // 当前时间
    const [getNextDay, setNextDay] = useState<string>(""); // 下一个时间
    const [getMonthDay, setGetMonthDay] = useState<MonthHaveDay[]>([]); // 当月天数
    const [getGrayDay, setGrayDay] = useState<number>(-1); // 当前天数
    const [getNextMonthDay, setNextMonthDay] = useState<MonthHaveDay[]>([]); // 获取下月天数有多少天
    const [getSelect, setSelect] = useState<number>(-2); // 选中的日期
    const [getChociDate, setChoicDate] = useState<MonthHaveDay>(); // 选择的日期
    useEffect(() => {
        const data: DateFormatType = dateFormat(props.date);
        setNowMonth(data.month)
        setNowDay(`${data.year}年${data.month}月`);
         // 获取月数是星期几
         const weekDay = new Date(`${data.year},${data.month},1`).getDay() || new Date(`${data.year}/${data.month}/${1}`).getDay();
         console.log(weekDay, 'nnnn');
         const fillArray: MonthHaveDay[] | null = weekDay > 0 ? new Array(weekDay).fill(null).map((_: null, index: number) => ({ year: data.year,month: data.month, day:-1, select: false })) : null;
        // 当前月数有几天
        const nowMonthHaveDay: number = new Date(data.year,data.month,0).getDate();
        if(fillArray) {
            setGetMonthDay(fillArray.concat(new Array(nowMonthHaveDay).fill(null).map((_: null, index: number) => ({ day: index + 1, year: data.year, month: data.month, select: false }))));

        }else{
            setGetMonthDay(new Array(nowMonthHaveDay).fill(null).map((_: null, index: number) => ({ day: index + 1, year: data.year, month: data.month, select: false })));

        }
        setGrayDay(data.nowDay);
        // 如果是12月就轮到下一年一月
        if(data.month >= 12) {
            data.year = data.year + 1;
            data.month = 1;
        }
        setNextDay(`${data.year}年${data.month}月`);
         
        const nextMonthHaveDay: number = new Date(data.year,data.month,0).getDate();
        const nextHaveDay =  new Date(`${data.year},${data.month},1`).getDay() || new Date(`${data.year}/${data.month}/${1}`).getDay();
        console.log(nextHaveDay, "我就看看");

        // 填充下月个第一天前面的数组
        const newxtFillArray: MonthHaveDay[] | null = nextHaveDay > 0 ?  new Array(nextHaveDay).fill(0).map((_: null, index: number) => ({ year: data.year,month: data.month, day:-1, select: false})) : null;
        if(newxtFillArray) {
            setNextMonthDay(newxtFillArray.concat(new Array(nextMonthHaveDay).fill(0).map((_: null, index: number) => ({ day: index + 1, year: data.year, month: data.month, select: false }))));

        }else {
            setNextMonthDay((new Array(nextMonthHaveDay).fill(0).map((_: null, index: number) => ({ day: index + 1, year: data.year, month: data.month, select: false }))));

        }
    }, [getNextDay, getNowDay])

    const goNextPage = (num: number) => {
        console.log(props.routeFn.match, '...');
        if(num === 0) {
            props.routeFn.history.goBack();
        }else {
            if(getSelect < 0) {
                return Toast.info("请选择您要预约的日期")
            }
            if(getChociDate) {
                props.routeFn.history.push(`/reservationDetail/${props.routeFn.match.params["id"]}?year=${getChociDate.year}&month=${getChociDate.month}&day=${getChociDate.day}`);
            }   
        }
    }   

    // 点击预约
    const choicNowDayFn = (data: MonthHaveDay, index: number, choicStatus:number) => {
        if(data.day < getGrayDay && data.month === getNowMonth) {
            return
        }
        // 选择当前月份
        if(choicStatus === 1) {
            const newNowMonth = getMonthDay.map((data: MonthHaveDay, i: number) => (i === index ? {...data, select: true} : {...data, select: false }));

            const settingNextMonth = getNextMonthDay.map((data: MonthHaveDay, i: number) => ({...data, select: false}));
            setGetMonthDay(newNowMonth);
            setNextMonthDay(settingNextMonth);

        }else {
            const newNextMonth = getNextMonthDay.map((data: MonthHaveDay, i: number) => (i === index ? {...data, select: true} : {...data, select: false}));
            const settingCurrentDay = getMonthDay.map((data: MonthHaveDay, i: number) => ({...data, select: false}));
            setNextMonthDay(newNextMonth);
            setGetMonthDay(settingCurrentDay);
        }
        console.log(data, '---当前选择日期----');
        setChoicDate(data)
        setSelect(index);
    }

    // 月份节点
    const nowDayNode:(list: MonthHaveDay[], choicStatus: number) => JSX.Element[] = (list: MonthHaveDay[], choicStatus: number) => list.map((data: MonthHaveDay, index: number) => {
        return <li key={index} className={[data.day === -1 ? styles.hideText:``,  data.select ? styles.selectCircle: ``].join(" ")} 
                    onClick={() => choicNowDayFn(data, index, choicStatus)}> 
                    <p className={[data.day  < getGrayDay && data.month === getNowMonth ? styles.addGray: ``, data.select? styles.select: ``].join(" ")}>{data.day}</p>
                </li>
    })

    const bodyNode:(list: MonthHaveDay[], choicStatus: number) => JSX.Element = (list: MonthHaveDay[], choicStatus: number) => (<div className={styles.month}>
                                                <div className={styles.choicHeader}>
                                                    <p>{ choicStatus === 1? `选择日期` : ``}</p>
                                                    <p>{ choicStatus === 1? getNowDay : getNextDay}</p>
                                                </div>
                                                <ul>
                                                    { nowDayNode(list, choicStatus) }
                                                </ul>
                                            </div>)

    return (
        <div className={styles.appointmentDateBody}>
            { bodyNode(getMonthDay, 1) }
            { bodyNode(getNextMonthDay, -1) }
            <ul className={styles.btnList}>
                <li onClick={() => goNextPage(0)}><button>返回</button></li>
                <li onClick={() => goNextPage(1)}><button>确定</button></li>
            </ul>
        </div>
    )
}


export default AppointmentDateBody

