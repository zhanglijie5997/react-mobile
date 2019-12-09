const proxy = require("http-proxy-middleware");
// console.log(1);
module.exports = function (app) {
    app.use(
        proxy("/api", {
            changeOrigin: true,
            target: "http://192.168.1.106:3000/",

        })
    );
    //   app.use(
    //     proxy("/fans/**", {
    //       target: "https://easy-mock.com/mock/5c0f31837214cf627b8d43f0/",
    //       changeOrigin: true
    //     })
    //   );
};
