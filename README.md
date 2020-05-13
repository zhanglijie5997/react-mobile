```js
    0. 项目使用px转换vw插件, ui图多少文件里就写多少尺寸
    1. 所有路由组件首字母大写
    2. 方法名首字母小写
    3. hooks useState 使用获取对象用getxxx  设置用setxxxx,
       [示例]
       const [getStatus, setStatus] = useState<boolean>(false); 
    4. hooks useEffect, useCallback 页面如果有使用定时器等监听必须在useEffect内清除, 不然会报错, 内存泄漏
       [示例]
       useEffect(() => {
           const time: NodeJs.Time = setTimeout(() => {
              // doSomething...
           }, 2000)
           return clearTimeout(time)
       },[]);

       useCallBack(() => {
           const time = setInterval(() => {
               // doSomething...
           },1000);
           return () => clearInterval(time);
       }, [])
    5. redux 使用步骤
       [示例]
       <1> 在 src/Redux/State/State.tsx 里创建默认对象                      「类似 vuex 中 state     参数」
       <2> 在 src/Redux/Actions/Actions.tsx 中创建 createAction 注册方法    「类似 vuex 中 actions   方法」
       <3> 在 src/Redux/Actions/HandleActions.tsx 中创建 handleAction 方法 「类似 vuex 中 mutations 方法」
       <4> 在 src/Redux/Reducer/Reucer.tsx 中导入 第三步创建的方法           「类似 vuex 中 store    主文件」
       <5> src/Redux/Store/Store.tsx 这个文件不用更改, 只是为了注入主入口
    6. router 配置
        [实例]
        在 src/Page/Page.tsx中加入创建的路由文件夹, 「 没有子路由说法, 创建时只循环创建了一次,没有使用递归创建, 后续有需求可以改进 」
    7. 「文件夹说明」
        src
        |__Component      组件文件夹, 每个路由对应的组件创建对应的文件夹, UniversalComponents 为通用文件夹
        |__Page           路由页面文件夹, 一个路由创建一个文件夹
        |__Redux          状态管理文件夹
        |__Roouter        路由管理文件夹
        |__Static         公共资源文件夹
        |__Utils          公共方法文件夹
          |__Axios        axios 文件
          |__HttpList     所有路由对应的文件夹的http请求
          |__Wx           微信方法
          |__UserAgent    判断浏览器类型
        |__App.tsx        入口文件 「最好不要更改」
        |__index.tsx      注入html文件, ⚠「不需要更改, 此文件为主要文件,」
    8. [路径别名<alias>] 
        <1> @/            =>    src
        <2> @Components   =>    src/Components
        <3> @Static       =>    src/Static
        <4> @Utils        =>    src/Utils
        <5> @Page         =>    src/Page
    9. [路由懒加载, 组件懒加载]
        ```example
            import loadable from "@loadable/component";
            const Home = loadable(() => import(/* webpackChunkName: "User" */ "./xx/xx"))
        ```
    10.[可能遇到的 bug]
        input输入框设置100% 可能会在ios上显示异常， 最好input输入框的宽度小于父元素的的宽度
```