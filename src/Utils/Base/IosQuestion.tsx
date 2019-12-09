
/** 解决 Ios 光标错位问题 */
export const onFocusFn = () => {
    document.body.style.position = "fixed";
}
/** 解决 Ios 光标错位问题 */
export const onBlurFn = () => {
    document.body.style.position = "static";
}