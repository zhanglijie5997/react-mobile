import React, {useEffect, useCallback, useState, useRef} from 'react';
import styles from "./Home.scss";
import LazyLoad from "react-lazyload";
import { getMusicUrl } from "@Utils/HttpList/HomeHttp/HomeHttp";
import { GetMusicUrltype } from "@Utils/HttpList/HomeHttp/HomeHttpType";
import { RouteComponentProps } from 'react-router';
import test from "@Static/Images/Store/WechatIMG61.png";


const Home = (props: RouteComponentProps) => {
    const [getLlist, setList] = useState<number[]>(new Array(100).fill(null).map((_, index: number) => index)); // 图片懒加载示例
    const [getTouchmoveStatus, setTouchmoveStatus] = useState<boolean>(false); // touchmove 状态
    const [getMusicList, setMusicList] = useState<GetMusicUrltype>(); // 数据类型
    const [getShow, setShow] = useState<boolean>(false);
    const toastRef = useRef<HTMLDivElement>(null);
    // 这里只请求一次
    useEffect(() => {
        const observing = new IntersectionObserver(function(entries: any[]) {

            console.log(entries[0].intersectionRatio, 'entries');
            if (entries[0].intersectionRatio <= 0) { 
                setShow(true);
                return; 
            }else {
                // setShow(false)
                return;
            }
            
        });
        observing.observe(document.getElementById("toast")!);
        console.log(props, '---props----')
        homeListHttp();
        return () => document.body.removeEventListener("touchmove", slideEvent)
    }, []);

    // 根据依赖作出反应
    useEffect(() => {
        if(getMusicList) {
            console.log(getMusicList, '---音乐类型---')
        }
        toastRef.current?.addEventListener("click", (event) => {
            console.log(event, "???");
        });

        return () => { /***/ }
        // return () => homeListHttp();
    },[getMusicList]);

    // 请求数据
    const homeListHttp = useCallback(async () => {
        // const data: GetMusicUrltype = await getMusicUrl('15');
        // setMusicList(data);
    }, [getMusicList]);

    // 监听回调
    const slideEvent = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setTouchmoveStatus(true);
        document.body.style.overflow = 'hidden'

    }

    const toastShow = useCallback(() => {
        // Toast.fail("success", 1,() => {
        //     document.body.removeEventListener("touchmove", slideEvent);
        //     document.body.style.overflow = "inherit";
        //     setTouchmoveStatus(false);
        // }, true);
        document.body.addEventListener("touchmove", slideEvent, {passive: false});
    },[])

    const lazyLoadList: JSX.Element[] =  getLlist.map((item: number, index: number) => {
        return (<div key={index}>
                    <LazyLoad height={120}  offset={300} >
                        <img  src='http://adpic.ilaisa.com/Upload/b0680fd3-568e-4bc4-8778-4d1ff7d11bba.png' className={styles.img}/>
                    </LazyLoad>
                </div>)
    })
    
    return (
        <div onClickCapture={toastShow} ref={toastRef} className={[styles.size].join(" ")} >
            <img src={test} alt="" className={styles.bgImg}/>
            <button onClick={homeListHttp} id="toast" className={[styles.getData, getShow ? styles.positon: ``].join(" ")} >请求数据</button>
            
            {(lazyLoadList)}
            Home1315ff
        </div>
    );
}

export default Home;
