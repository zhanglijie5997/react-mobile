import React, {  useEffect, useCallback } from 'react';
import { withRouter } from "react-router-dom";
import Router from './Router/Router';
import { RouteComponentProps, StaticContext } from "react-router";
import styles from "./App.scss";
import { mapKey } from './Utils/Base/Base';
import { Toast } from 'antd-mobile';
import { useDispatch } from 'react-redux';
import { LocationType } from './Redux/State/StateType';
import { userLocalAction } from './Redux/Actions/Actions';

const App = (props: RouteComponentProps<any, any>) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let mapObj: any = null;
    let geolocation: any = null;
    window["onLoad"] = () => {
      mapObj = new AMap.Map('container');
      console.log(mapObj, '---map---');
      mapObj.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,// 是否使用高精度定位，默认:true
            timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
            convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        // 显示定位按钮，默认：true
            buttonPosition: 'LB',    // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),// 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);// 返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      // 返回定位出错信息
     });
    }
    const mapScript = document.createElement("script");
    mapScript.charset = "utf-8";
    mapScript.src = `https://webapi.amap.com/maps?v=1.4.15&key=${mapKey}&callback=onLoad`;
    document.head.appendChild(mapScript);
    return () =>  {
      AMap.event.removeEventListener(geolocation, "complete", onComplete);
      AMap.event.removeEventListener(geolocation, "error", onError);
    }
  },[]);
  /** 成功回调 */
  const onComplete = useCallback((event: LocationType) => {
    console.log(event, '地理位置');
    // 全局管理用户地理位置
    dispatch(userLocalAction(event));
  },[]);
  /** 失败回调 */
  const onError = useCallback((event) => {
    Toast.fail("获取地理位置失败, 请刷新重试");
  },[])
  return (
    <div className={styles.appBar}>
        {/*kankna*/}
        <Router {...props} />
    </div>
  )
}
export default withRouter(App);
