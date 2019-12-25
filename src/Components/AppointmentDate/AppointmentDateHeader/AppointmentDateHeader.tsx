import React, { useEffect, useState } from 'react'
import styles from "./AppointmentDateHeader.scss";
const AppointmentDateHeader = (props: any) => {
    const [getDateWeek, setDateWeek] = useState<string[]>(["周日","周一","周二","周三","周四","周五","周六"]);
    const [getSelectDate,  setSelectDate] = useState<number>(-1); // 当前星期几
    useEffect(() => {
        const dateNow: Date = new Date(); // 当前时间
        const nowWeek = dateNow.getDay();
        setSelectDate(nowWeek);
    },[]);
    const titleDate = getDateWeek.map((data: string, index: number) => {
        return <li key={index} className={[getSelectDate === index ? styles.active : ``].join(" ")}>{data}</li>
    })
    return (
        <div className={styles.appointmentDateHeader}>
            <ul>
                { titleDate }
            </ul>
        </div>
    )
}



export default AppointmentDateHeader

