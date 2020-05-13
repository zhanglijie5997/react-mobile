import React from 'react'
import styles from "./Notify.scss";
const Notify = (props: {top: number}) => {
    return (
        <div className={styles.notify}>
            <p className={styles.inform}>通知：</p>
            <p className={styles.msg}>你今天迟到了</p>
        </div>  
    )
}

export default Notify
 