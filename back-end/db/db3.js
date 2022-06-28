//定义模块
const mongodb = require('mongodb');

var ObjectId = require('mongodb').ObjectId;

//mongodb的客户端
const MongoClient = mongodb.MongoClient;
//连接本地数据库客户端
MongoClient.connect("mongodb://localhost:27017", function (err, db) {
    //获取GSJGSchool数据库
    if (err) {
        return console.log("连接失败");
    }
    console.log('连接成功！！!');
    const col = db.db("GSJGSchool").collection("studes");
    // //插入一条数据
    // // col.insertOne({ 姓名: '张三', age: 16 }, (err, data) => {
    // //     if (err == null) {
    // //         console.log(data);
    // //     }
    // //查询数据
    // col.find({ "姓  名": "蔡冰燕" }).toArray((err, data) => {
    //     console.log(data);
    // })

    // 删除全部数据
    col.deleteMany({}, (err, data) => {
        console.log(data.result.n);
    })
    db.close()
})
    // col.find({ name: "张三", age: 16 }).toArray((err, infos) => {
    //     console.log(infos);
    // });
