/**
 *  ListView 使用说明 「也可以参考vant的api, 基本功能基础一致」
 *      ```js
 *          元素必须有一个根标签包裹
 *          [参数说明]
 *          @param offset 100 - 300 触发上啦加载事件
 *          @param loadingText  等待文本 「可以传入自定义组件」
 *          @param finishText   完成文本  「可以传入自定义组件」
 *          @param loading      加载状态
 *          @param finish       加载完成状态
 *          @param bodyHeight   元素高度  [可选]
 *          @param load         触发的加载事件
 *      ```
 * @example 
 *         const offset = 100;
 *         const loadingText = "加载中..."
 *         const finishText = "我是有底线的"
 *         const [getPage, setPage] = useState<number>(1);
 *         const [getLoading, setLoading] = useState<boolean>(true);
 *         const [getFinish, setFinish] = useState<boolea>(false);
 *         const [getDataList, setDataList] = useState<T[]>([]);          // 数据列表, 根据自己的数据类型去更改泛型的值
 *         // 重置事件
 *         const reset = () => {
 *            setPage(1);
 *            setDataList([])
 *         }
 *         // 加载事件
 *         const load = async () => {
 *              const data = await axios.get("xxxxx.com",{
 *                                             page: getPage
 *                                          });
 *              setDataList(data);
 *              setPage(getPage + 1);
 *         }
 */
import React, { Component, useEffect, useRef, useState, useCallback } from 'react'
import { ListViewType } from './ListViewType';
import styles from "./ListView.scss";
import { Icon } from 'antd-mobile';
const MyListView = (props: ListViewType) => {
    const [getAnimation, setAnimation] = useState<number>(-1); // requestAnimationFrame实例 用于清除,防止内存泄漏
    const [getLoadingStatus, setLoadingStatus] = useState<boolean>(true); // 加载状态 true 为可继续加载
    const listViewRef = useRef<HTMLDivElement>(null); // 长列表节点
    const tipRef = useRef<HTMLParagraphElement>(null); // 提示节点
   
    useEffect(() => {
        if(!props.finish && !getLoadingStatus) {
            props.onload();
        }   
        
        if(getLoadingStatus) {
            setTimeout(() => {
                window.requestAnimationFrame(requestAnimationFn)
            }, 1000)
        }
        setLoadingStatus(true);
        return () => window.cancelAnimationFrame(getAnimation)
    }, [getLoadingStatus])

    const requestAnimationFn = useCallback(() => {
        if (tipRef && tipRef.current) {
            const clientHeightY = tipRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // 上啦加载
            if(clientHeightY.top - windowHeight < props.offset) {
                if(getLoadingStatus) {
                    window.cancelAnimationFrame(getAnimation);
                    setLoadingStatus(false);
                }
            }else{
                const animationStatus = window.requestAnimationFrame(requestAnimationFn);
                setLoadingStatus(true)
                setAnimation(animationStatus)
            }
            // 下啦刷新
            // if(clientHeightY.top)
        }
        
    },[getLoadingStatus])

    const loadingCom = (<div>
        <p className={styles.loading}>
                    {
                        props.loadingText ?  <><Icon type="loading" size="xxs" />
                        <span>{ props.loadingText ? props.loadingText : "加载中..." }</span></> : null                
                    }

                    </p>
    </div>)

    return (
        <div ref={listViewRef} className={styles.listView}>
            {props ? props["children"] : null}
            <div className={styles.footText} ref={tipRef}>{ !props.finish ? loadingCom : props.finishText }</div> 
        </div>
    )
}
export default MyListView;
