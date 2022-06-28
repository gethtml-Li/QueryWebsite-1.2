const express = require("express");
const Users = require('../db/db1').Users;
const mongodb = require('mongodb');
const fs = require('fs')
const xlsx = require("node-xlsx");
let router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const MongoClient = mongodb.MongoClient;
let x = 0;
//pc登入界面路由
router.get("/", (req, res) => {


})

//登入接口s
router.get("/api/login", async (req, res) => {
    let user = await Users.findOne(req.query);
    console.log(user);
    if (user != null) {
        res.send({
            ...user._doc,
            meta: {
                status: 200,
                message: '请求数据成功'
            }

        });
    } else {
        res.send({
            meta: {
                status: 404,
                message: '请求数据失败'
            }

        });
    }

})

//教务处左侧导航栏数据接口
router.get("/api/jiaowuch/menu", (req, res) => {
    let num = 0;
    let menu = [
        {
            menunaem: "工程技术系",
            children: []
        },
        {
            menunaem: "轨道工程系",
            children: []

        }, {
            menunaem: "幼儿教育系",
            children: []
        }, {
            menunaem: "医药护理系",
            children: []
        }, {
            menunaem: "现代服务系",
            children: []
        }, {
            menunaem: "经济管理系",
            children: []
        }, {
            menunaem: "高考部",
            children: []
        }


    ]
    let Department = ['工程技术系', '轨道工程系', '幼儿教育系', '医药护理系', '现代服务系', '经济管理系', '高考部'];
    Department.forEach((value, index) => {
        new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://localhost:27017", function (err, db) {
                if (err) {
                    return res.send({
                        meta: {
                            status: 404,
                            message: '请求数据失败'
                        }

                    });
                }
                //获取JXGSJGSchool数据库中students集合
                const students = db.db("JXGSJGSchool").collection("students");
                students.find({ 系部: value }).toArray((err, data) => {
                    resolve(data)
                })

            })
        }).then((data) => {
            let className = []
            //获取班级名字
            data.forEach((studens) => {
                className.push(studens.班级)
            })
            //去除相同的班级名称
            className = Array.from(new Set(className)).sort();
            menu.forEach((value1) => {
                if (value1.menunaem == value) {
                    value1.children = className
                    num++;
                    if (num == Department.length) {
                        res.send(menu)
                    }
                }
            })

        })
    })




    // let menu = [
    //     {
    //         menunaem: "工程技术系",

    //     },


    // ]

})

//根据系部、班级、考试时间，获取指定数据接口
router.get("/api/getstudens", (req, res) => {
    MongoClient.connect("mongodb://localhost:27017", function (err, db) {
        if (err) {
            return res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        }
        const students = db.db("JXGSJGSchool").collection("students");
        if (JSON.stringify(req.query) != '{}') {
            students.find(req.query).toArray((err, data) => {
                res.send({
                    meta: {
                        status: 200,
                        message: '请求数据成功！'
                    },
                    students: data
                })
            })
        } else {
            res.send({
                students: [],
                meta: {
                    status: 200,
                    message: '请求数据成功！'
                }

            })
        }

    })

})

//根据指定条件删除指定的数据接口
router.post("/api/removeall", (req, res) => {
    MongoClient.connect("mongodb://localhost:27017", function (err, db) {
        if (err) {
            return res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        }
        const students = db.db("JXGSJGSchool").collection("students");
        //删除数据
        students.deleteMany(req.body).then((data) => {
            res.send({
                meta: {
                    status: 200,
                    message: '请求数据成功'
                }

            });
        }).catch(() => {
            res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        })

    })
})

//添加个人成绩接口
router.post("/api/addstuden", (req, res) => {
    console.log(req.body);
    MongoClient.connect("mongodb://localhost:27017", function (err, db) {
        if (err) {
            return res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        }
        const students = db.db("JXGSJGSchool").collection("students");
        //插入数据
        students.insertOne(req.body).then((data) => {
            students.find({ 系部: req.body.系部, 班级: req.body.班级, 考试学期: req.body.考试学期 }).toArray((err, data) => {
                res.send({
                    students: data, meta: {
                        status: 200,
                        message: '请求数据成功'
                    }
                })
            })
        }).catch(() => {
            res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        })

    })
})

//修改个人成绩接口
router.post("/api/upstuden", (req, res) => {
    console.log(req.body);
    MongoClient.connect("mongodb://localhost:27017", function (err, db) {
        if (err) {
            return res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        }
        const students = db.db("JXGSJGSchool").collection("students");

        //修改数据
        let stu = req.body;
        let ispersonal = stu.ispersonal
        let id = stu._id
        delete stu._id
        delete stu.ispersonal
        let date = ""
        students.findOne({ _id: ObjectId(id) }).then((data) => { date = data.考试学期 })

        students.updateOne({ _id: ObjectId(id) }, { $set: stu }).then((data) => {

            if (!ispersonal) {
                students.find({ 系部: req.body.系部, 班级: req.body.班级, 考试学期: req.body.考试学期 }).toArray((err, data) => {
                    res.send({
                        students: data, meta: {
                            status: 200,
                            message: '请求数据成功'
                        }
                    })
                })
            } else {
                students.findOne({ _id: ObjectId(id) }).then((data) => {
                    data.考试学期 = date
                    console.log("-----------------------------------");
                    console.log(data);
                    res.send({
                        student: data,
                        meta: {
                            status: 200,
                            message: '请求数据成功'
                        }
                    })
                }).catch(() => {
                    res.send({
                        meta: {
                            status: 404,
                            message: '请求数据失败'
                        }

                    });
                })
            }
        }).catch(() => {
            res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        })

    })
})

//删除个人成绩接口
router.get("/api/deletestudent", (req, res) => {
    MongoClient.connect("mongodb://localhost:27017", function (err, db) {
        if (err) {
            return res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        }
        const students = db.db("JXGSJGSchool").collection("students");
        //删除数据
        let id = req.query._id;
        let ispersonal = JSON.parse(req.query.ispersonal)
        students.deleteOne({ _id: ObjectId(id) }).then((data) => {
            if (!ispersonal) {
                students.find({ 系部: req.query.系部, 班级: req.query.班级, 考试学期: req.query.考试学期 }).toArray((err, data) => {
                    res.send({
                        students: data, meta: {
                            status: 200,
                            message: '请求数据成功'
                        }
                    })
                })
            } else {
                students.findOne({ _id: ObjectId(id) }).then((data) => {
                    res.send({
                        students: data, meta: {
                            status: 200,
                            message: '请求数据成功'
                        }
                    })
                })
            }
        }).catch(() => {
            res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        })

    })
})

//查询个人成绩接口
router.get("/api/getstudent", (req, res) => {
    console.log(req.query);
    MongoClient.connect("mongodb://localhost:27017", function (err, db) {
        if (err) {
            return res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        }
        const students = db.db("JXGSJGSchool").collection("students");
        console.log(req.query);
        // 查询数据
        students.findOne(req.query).then((data) => {
            res.send({
                student: data,
                meta: {
                    status: 200,
                    message: '请求数据成功'
                }
            })
        }).catch(() => {
            res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        })

    })
})




//修改密码提交路由
router.post("/api/uppassword", (req, res) => {
    Users.findOne({
        username: req.body.username,
        password: req.body.password
    }).then(data => {
        if (data) {
            Users.updateOne(data, { password: req.body.newpass }).then((data) => {
                res.send({
                    meta: {
                        status: 200,
                        message: "修改密码成功"
                    }
                })
            })

        } else {
            res.send({
                meta: {
                    status: 300,
                    message: "旧密码错误,修改密码失败"
                }

            })
        }
    }).catch(() => {
        res.send({
            meta: {
                status: 404,
                message: '请求数据失败'
            }

        });

    })


})

// 获取系管理员左侧导航栏数据
router.get("/api/admin/menu", (req, res) => {
    console.log(req.query, 54545);
    let menu = []
    MongoClient.connect("mongodb://localhost:27017", function (err, db) {
        if (err) {
            return res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            });
        }
        //获取JXGSJGSchool数据库中students集合
        const students = db.db("JXGSJGSchool").collection("students");
        students.find(req.query).toArray((err, data) => {
            data.forEach(value => {
                menu.push(value.班级)
            })
            menu = Array.from(new Set(menu)).sort()
            res.send(menu)
        })

    })


})



//上传成绩文件接口
router.post("/uploadfile", (req, res) => {
    fs.rename(`${req.files[0].path}`, `./public/UploadFile/${req.files[0].originalname}`, function (err) {
        if (err) {
            res.send({
                meta: {
                    status: 404,
                    message: '请求数据失败'
                }

            })
        } else {
            if (req.files[0].originalname.indexOf(".xlsx") != -1 || req.files[0].originalname.indexOf(".xls") != -1) {
                //解析上传的文件
                const file = xlsx.parse(`./public/UploadFile/${req.files[0].originalname}`);
                file.forEach(value => {
                    const data = value.data;
                    //该变量保存解析后表格中的数据
                    let studens = []
                    //解析表格数据操作

                    data.forEach((value1, index) => {
                        if (value1.length != 0) {

                            if (index >= 2) {
                                let sut = {}
                                data[1].forEach((value2, index) => {
                                    //查看值是否为小数
                                    if (String(value1[index]).indexOf('.') == -1) {
                                        let str = value2.replace(/\s+/g, "")

                                        sut[str] = String(value1[index]) == "undefined" ? "" : String(value1[index])

                                    } else {
                                        let num = Number(value1[index]);
                                        sut[value2] = num.toFixed(2);
                                    }
                                })
                                studens.push(sut);
                            }
                        }
                    })
                    //将表格里的数据存到数据库中
                    //连接数据库
                    MongoClient.connect("mongodb://localhost:27017", function (err, db) {

                        if (err) {
                            return res.send({
                                meta: {
                                    status: 404,
                                    message: '请求数据失败'
                                }

                            })
                        }
                        //获取GSJGSchool数据库中studes集合
                        const studes = db.db("JXGSJGSchool").collection("students");
                        //保存到数据到集合中
                        studes.insertMany(studens, (err, data) => {
                            if (err) {
                                res.send({
                                    meta: {
                                        status: 404,
                                        message: '请求数据失败'
                                    }

                                })
                            }
                            console.log("插入的文档数量为: " + data.insertedCount);
                        });

                    })

                })
                res.send({
                    meta: {
                        status: 200,
                        message: '请求数据成功'
                    }

                })
            } else {
                res.send({
                    meta: {
                        status: 404,
                        message: '请求数据失败'
                    }

                })
            }
        }
    })



})

//渲染下载成绩文件的接口
router.get("/api/downfile", (req, res) => {
    const dir = './public/UploadFile'
    const files = fs.readdirSync(dir);
    console.log(files);
    res.send(files)

})

module.exports = router