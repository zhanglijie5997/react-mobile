import React, { useRef, useCallback, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router';
import styles from "./Shop.scss";
const Shop = (props: RouteComponentProps) => {
    const [getActive, setActive] = useState<number>(0); // 选中的颜色
    const christmasRef = useRef<HTMLDivElement>(null);
    const [getTime, setTime] = useState<NodeJS.Timeout>();
    useEffect(() => {
        console.log(getActive, '////');
    }, [getActive])
    const playGame = useCallback(() => {
        if(christmasRef && christmasRef.current) {
            console.log(christmasRef.current.getElementsByClassName("Shop_childNode"));
            // 获取所有移动对象集合
            const childNodeList =  christmasRef.current.getElementsByClassName("Shop_childNode");
            
            if(getTime) {
                clearInterval(getTime);   
            }
            // const time = setInterval(() => {
            //     const active = getActive + 1;
            //     const arr = Array.prototype.slice.apply(childNodeList);
            //     arr.forEach((item: any, index: number) => {
            //         if(+item.attributes["data-index"].value === getActive) {
            //             arr[getActive].className = "Shop_childNode Shop_active"
            //         }else {
            //             arr[index].className = "Shop_childNode"
            //         }
            //     })
            //     console.log(childNodeList[+getActive]);                    
            //     setActive(active);
            // }, 500);
            // setTime(time)
            
            
            // 给移动的增加样式
            for(let i =0;i < childNodeList.length; i++) {
                console.log(+childNodeList[i].attributes["data-index"].value);
            }
        }
    }, [christmasRef, getActive])
    return (
        <div className={styles.shop}>
            <div className={styles.christmas} ref={christmasRef}>
                <div className={styles.top}>
                    <div className={[styles.childNode, styles.active].join(" ")} data-index="0"/>
                    <div className={styles.childNode} data-index="1"/>
                    <div className={styles.childNode} data-index="2"/>
                    <div className={styles.childNode} data-index="3"/>
                </div>
                <div className={styles.right}>
                    <div className={styles.childNode} data-index="4"/>
                    <div className={styles.childNode} data-index="5"/>
                    <div className={styles.childNode} data-index="6"/>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.childNode} data-index="7"/>
                    <div className={styles.childNode} data-index="8"/>
                    <div className={styles.childNode} data-index="9"/>
                    
                </div>
                <div className={styles.left}>
                    <div className={styles.childNode} data-index="10"/>
                    <div className={styles.childNode} data-index="11"/>
                </div>
            </div>

            <button onClick={playGame}>Start</button>
        </div>
    )
}
export default Shop;
