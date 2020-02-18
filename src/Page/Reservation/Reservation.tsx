import React from 'react'
import { RouteComponentProps } from 'react-router';
import Calendar from "@Components/UniversalComponents/Calendar/Calendar";
import Notify from "@Components/UniversalComponents/Notify/Notify";
const Reservation = (props: RouteComponentProps) => {
    return (
        <div>
            {/* <Calendar routerFn={props} date={Date.now()} showMonth={60}/> */}
            <Notify top={108}/>
        </div>
    )
}
export default Reservation;
