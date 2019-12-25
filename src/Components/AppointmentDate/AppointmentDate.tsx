import React from 'react'
import { RouteComponentProps } from 'react-router'
import styles from "./AppointmentDate.scss";
import loadable from '@loadable/component';
const Header = loadable(() => import(/* webpackChunkName: "AppointmentDate" */"./AppointmentDateHeader/AppointmentDateHeader"));
const Body = loadable(() => import(/* webpackChunkName: "AppointmentDate" */"./AppointmentDateBody/AppointmentDateBody"))

// 日历组件
const AppointmentDate = (props: RouteComponentProps) => {
    return (
        <div className={styles.appointmentDate}>
            <Header />
            <Body routeFn={props} date={Date.now()}/>
        </div>
    )
}


export default AppointmentDate;
