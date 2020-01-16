import React from 'react'
import { RouteComponentProps } from 'react-router';
import Calendar from "@Components/UniversalComponents/Calendar/Calendar";
const Reservation = (props: RouteComponentProps) => {
    return (
        <div>
            <Calendar routerFn={props} date={Date.now()} showMonth={60}/>
        </div>
    )
}
export default Reservation;
