import React, {useEffect, useCallback, useState, useRef, ChangeEvent} from 'react';
import styles from "./Home.scss";
import LazyLoad from "react-lazyload";
import type { PersonalizedNewsong } from "@Utils/HttpList/HomeHttp/HomeHttpType";
import { RouteComponentProps } from 'react-router';
import bg from '@Static/Images/Home/bg.png'
import userAgent from '@/Utils/UserAgent/UserAgent';
import { Toast } from "antd-mobile";
import { getQueryVariable } from '@/Utils/Base/Base';
interface DownloadType {
    ios: {
        apkDownloadUrl: string
    },
    android: {
        apkDownloadUrl: string
    }
}

const Home = (props: RouteComponentProps) => {
    const [getLlist, setList] = useState<number[]>(new Array(100).fill(null).map((_, index: number) => index)); // 图片懒加载示例
    const [getTouchmoveStatus, setTouchmoveStatus] = useState<boolean>(false); // touchmove 状态
    const [getMusicList, setMusicList] = useState<PersonalizedNewsong>(); // 数据类型
    const [getShow, setShow] = useState<boolean>(false);
    const toastRef = useRef<HTMLDivElement>(null);
    const [getDownloadUrl, setDownloadUrl] = useState<DownloadType>();
    const [getUrl, setUrl] = useState<string>('');
    const [getVal, setVal] = useState<number>();
    const [getCode, setCode] = useState<string>(""); // 邀请码
    // 这里只请求一次
    useEffect(() => {
        console.log();
       
        const code: string = getQueryVariable("code") || '';
        console.log(getQueryVariable("code"), '  ->  邀请码');
        setCode(code);
        setShow(getQueryVariable("isHuiBo") !== "")
        homeListHttp();
        return () => document.body.removeEventListener("touchmove", slideEvent)
    }, []);

    // 根据依赖作出反应
    

    // 请求数据
    const homeListHttp = useCallback(async () => {
        // setMusicList(data);
        
    }, [getDownloadUrl, getUrl]);

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

    const downloadApp = useCallback(() => {
        const isWx = userAgent("isWx");
        const isIos = userAgent("isIos");
        if(isWx) {
            alert("请在浏览器打开");
            return;
        }
        if(isIos && isWx) {
            alert("请在Safari浏览器中打开");
        }
        window.location.href = getUrl;
    },[getUrl])

    const changeInput = useCallback((e) => {
        console.log(e);
        setVal(e);
    }, [getVal]);

    // 提交
    const submit = useCallback(async () => {
        props.history.push("/shop");
        const reg = /^(?:(?:\+|00)86)?1\d{10}$/;
        if(reg.test(`${getVal}`)) {
            // const data = await inviteUser(getCode, getVal!.toString());
            // console.log(data);
            
        }else {
            Toast.fail("请输入正确手机号");
        }
    }, [getVal, getCode]);

    const focusFn = () => {
       document.body.scrollTo(0,0)
    }

    return (
        <div className={[styles.size].join(" ")}>
            <div className={styles.bgBox} >
                <div className={styles.bgs}>
                    <img src="https://heybooks-cms.oss-cn-shenzhen.aliyuncs.com/img/icons/android-chrome-192x192.png" alt=""/>
                </div>
                <div className={styles.context}>
                    <input type="number" placeholder="请输入手机号" onFocus={focusFn} className={styles.phone} onInput={(e: ChangeEvent<HTMLInputElement>) => changeInput(e.target.value)}/>
                    <div className={styles.join} onClick={submit}>欢迎您的加入</div>
                    { getShow ? <div>
                        <div className={styles.download} onClick={downloadApp}>下载汇播APP</div>
                        <div className={styles.line} /> 
                    </div> : null}
                    
                </div>
            </div>

        </div>
    );
}

export default Home;
