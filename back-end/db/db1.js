//链接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/JXGSJGSchool', { useNewUrlParser: true, useUnifiedTopology: true });
//创建一个保存密码的集合
const Users = mongoose.model('Users', { username: String, password: String, role: String });
//学生登入账号与密码
// const user1 = new Users({ username: 'jiaowuchu', password: '123456789', role: '教务处' });
// const user2 = new Users({ username: 'gongchengjishuxi', password: '123456789', role: '工程技术系' });
// const user3 = new Users({ username: 'guigaogongchengxi', password: '123456789', role: '轨道工程系' });
// const user4 = new Users({ username: 'youerjiaoyuxi', password: '123456789', role: '幼儿教育系' });
// const user5 = new Users({ username: 'jingjiguanlixi', password: '123456789', role: '经济管理系' });
// const user6 = new Users({ username: 'xiandaifuwuxi', password: '123456789', role: '现代服务系' });
// const user7 = new Users({ username: 'yiyaohulixi', password: '123456789', role: '医药护理系' });
// const user8 = new Users({ username: 'gaokaobu', password: '123456789', role: '高考部' })
// user1.save().then(() => console.log("保存成功"))
// user2.save().then(() => console.log('保存成功'));
// user3.save().then(() => console.log('保存成功'));
// user4.save().then(() => console.log('保存成功'));
// user5.save().then(() => console.log('保存成功'));
// user6.save().then(() => console.log('保存成功'));
// user7.save().then(() => console.log('保存成功'));
// user8.save().then(() => console.log('保存成功'));
Users.find((err, data) => {
    console.log(data);
})
// Users.remove().then((data) => { console.log(data) })
exports.Users = Users