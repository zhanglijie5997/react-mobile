import { useState, useEffect } from 'react'
import { isIphoneX } from '@/Utils/Base/Base';

/** 是否iphonex hooks
 *  @returns true 是 false 否
 */
export const IsIphoneXHook = () => {
    const [getIsIphoneX, setIsIphoneX] = useState<boolean>(false);
    useEffect(() => {
        const iphoneX = isIphoneX();
        setIsIphoneX(iphoneX);
    }, []);

    return getIsIphoneX;
}