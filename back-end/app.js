const express = require("express");
const router = require("./router/router");
let bodyParser = require('body-parser')
const multer = require('multer')
const app = express();
const upload = multer({
    dest: './public/UploadFile'
})
//解决跨域问题
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(upload.any());
//开放静态资源
app.use(express.static("./dist"))
app.use("/public", express.static("./public"))
//加载路由模块
app.use(router);
//配置模板引擎
app.engine('html', require('express-art-template'));
app.listen("8555", () => {
    console.log("服务已开启，访问地址http://localhost:8555");
})