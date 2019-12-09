import React, { useState, useCallback, useMemo, useEffect, useRef, RefObject} from 'react';
import QRcode from 'qrcode'
/** 生成二维码组件
 * @param props  对象值
 *        @param url    二维码url
 *        @param width  二维码宽度
 *        @param height 二维码高度
 */
const CreateQrcode = (props: {url: string, width: number, height: number}) => {
    const [getQrCodeImg, setQrcodeImg] = useState<string>(''); // 生成二维码
    const qrCodeRef:RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null);
    useEffect(() => {
        createQrcodeImg();
    }, [])
    // 生成二维码函数
    const createQrcodeImg = useCallback(() => { 
        // 
    }, [getQrCodeImg]);
    return (
        <div>
            <img ref={qrCodeRef} src={getQrCodeImg} style={{ width: `${props.width}px`, height: `${props.height}px` }}/>
        </div>
    )
}

export default CreateQrcode;