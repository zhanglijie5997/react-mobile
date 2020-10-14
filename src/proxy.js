const proxy = require("http-proxy-middleware");
// console.log(1);
module.exports = function (app) {
    app.use(
        proxy("/api", {
            changeOrigin: true,
            target: "http://192.168.31.72:8088/",
        })
    );
};
