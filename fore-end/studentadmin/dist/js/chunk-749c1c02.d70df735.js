(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-749c1c02"],{"01dd":function(t,e,a){},bb51:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("el-container",[n("el-header",{attrs:{height:"80px"}},[n("homehead",[n("div",{attrs:{slot:"left"},on:{click:function(e){t.$router.push("/home/"+t.$route.params.role),t.routerflag=!0}},slot:"left"},[n("img",{attrs:{src:a("5615"),alt:""}}),t._v(" "+t._s(t.$route.params.role)+" ")]),n("div",{staticClass:"signoutbu",attrs:{slot:"right"},slot:"right"},[n("el-button",{on:{click:t.signout}},[t._v("退出")])],1)])],1),n("el-container",[n("el-aside",{staticClass:"leftnav",attrs:{width:t.isnavcolse?"64px":"15%"}},[n("div",{staticClass:"colsebutton",on:{click:function(e){t.isnavcolse=!t.isnavcolse}}},[t._v("| | |")]),n("el-menu",{attrs:{"unique-opened":"","active-text-color":"#5e068c",collapse:t.isnavcolse,"collapse-transition":!1}},[t._l(t.navdata,(function(e,a){return n("el-submenu",{attrs:{index:""+a}},[n("template",{slot:"title"},[n("i",{staticClass:"iconfont iconicon"}),n("span",[t._v(t._s(e))])]),t._l(["一","二","三","四","五","六"],(function(a,s){return n("el-menu-item",{attrs:{index:s+""+a},on:{click:function(n){return t.getstudens({"班级":e,"考试学期":"第"+a+"学期","系部":t.$route.params.role})}}},[n("i",{class:["iconfont","icon"+(s+1)+"_round_solid"]}),t._v(" "+t._s("第"+a+"学期")+" ")])}))],2)})),n("el-submenu",{attrs:{index:"5-1"}},[n("template",{slot:"title"},[n("i",{staticClass:"iconfont iconcaidan"}),n("span",[t._v("操作")])]),n("el-menu-item",{attrs:{index:"5-1-1"},on:{click:function(e){return t.routerJump("/home/"+t.$route.params.role+"/queryresult")}}},[n("i",{staticClass:"iconfont iconchaxun"}),t._v(" 查询个人成绩 ")]),n("el-menu-item",{attrs:{index:"5-1-2"},on:{click:function(e){return t.routerJump("/home/"+t.$route.params.role+"/uploadfile")}}},[n("i",{staticClass:"iconfont iconshangchuan"}),t._v(" 上传成绩文件 ")]),n("el-menu-item",{attrs:{index:"5-1-3"},on:{click:function(e){return t.routerJump("/home/"+t.$route.params.role+"/downloadfile")}}},[n("i",{staticClass:"iconfont iconGroup-"}),t._v(" 下载成绩文件 ")])],2),n("el-submenu",{attrs:{index:"7"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-setting"}),n("span",[t._v("设置")])]),n("el-menu-item",{attrs:{index:"6-1-1"},on:{click:function(e){return t.routerJump("/home/"+t.$route.params.role+"/changepassword")}}},[n("i",{staticClass:"iconfont iconsuo"}),t._v(" 修改密码 ")])],2)],2)],1),n("el-main",{style:{width:t.mainwidth}},[t.routerflag?n("router-view"):n("el-card",{staticClass:"box-card"},[t.studens.length?n("div",{staticStyle:{"margin-bottom":"10px"}},[n("el-button",{attrs:{type:"primary"},on:{click:t.addstudendialog}},[t._v("添加个人成绩")])],1):t._e(),n("div",{staticClass:"studenslist"},[n("table",[n("thead",[n("tr",[0!=t.tablehead.length?n("th",[t._v("序号")]):n("span",[t._v("暂无数据")]),t._l(t.tablehead,(function(e){return n("th",[t._v(t._s(e))])}))],2)]),n("tbody",t._l(t.studens,(function(e,a){return n("tr",[n("td",[t._v(t._s(++a))]),t._l(t.tablehead,(function(a){return n("td",[t._v(t._s(e[a]))])}))],2)})),0)])])]),n("el-dialog",{attrs:{title:"添加个人成绩",visible:t.addstudenflag,width:"61%"},on:{"update:visible":function(e){t.addstudenflag=e},close:t.Resetaddstuden}},[n("el-form",{ref:"addstudenform",attrs:{"label-width":"80px",inline:!0}},t._l(t.formdata,(function(e,a){return n("el-form-item",{key:a,attrs:{label:e.key}},["系部"==e.key||"班级"==e.key||"考试学期"==e.key?n("el-input",{attrs:{value:e.value=t.studens[0][e.key],disabled:!0}}):n("el-input",{model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"item.value"}})],1)})),1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.addstudenflag=!1}}},[t._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:t.addstuden}},[t._v("确 定")])],1)],1)],1)],1)],1)],1)},s=[],r=a("5530"),o=a("1da1"),i=(a("b64b"),a("159b"),a("c740"),a("96cf"),a("7a0f")),u={data:function(){return{isnavcolse:!1,routerflag:!0,navdata:[],studens:[],tablehead:[],addstudenflag:!1,mainwidth:"85%",formdata:[]}},isnavcolse:function(t,e){this.mainwidth=t?"96%":"85%"},watch:{isnavcolse:function(t,e){this.mainwidth=t?"96%":"85%"}},methods:{getnavdata:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/admin/menu",{params:{"系部":t.$route.params.role}});case 2:t.navdata=e.sent.data;case 3:case"end":return e.stop()}}),e)})))()},routerJump:function(t){this.routerflag=!0,this.$router.push(t)},getstudens:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.routerflag=!1,e.$router.push("/home/"+e.$route.params.role),a.next=4,axios.get("/getstudens",{params:Object(r["a"])({},t)});case 4:n=a.sent.data,200==n.meta.status&&(e.studens=n.students,e.tablehead=0==e.studens.length?[]:Object.keys(e.studens[0]),e.tablehead.shift(),e.formdata=[],e.tablehead.forEach((function(t){e.formdata.push({key:t,value:""})})),e.$message({type:"success",message:"获取数据成功！"}));case 6:case"end":return a.stop()}}),a)})))()},addstudendialog:function(){this.addstudenflag=!0},Resetaddstuden:function(){this.formdata.forEach((function(t){t.value=""}))},addstuden:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t.formdata.findIndex((function(t){return""==t.value})),-1!=a){e.next=11;break}return n={},t.formdata.forEach((function(t){n[t.key]=t.value})),e.next=6,axios.post("/addstuden",Object(r["a"])({},n));case 6:s=e.sent.data,200==s.meta.status?(t.studens=s.students,t.$message({type:"success",message:"添加成功！"})):t.$message({type:"error",message:"添加失败"}),t.addstudenflag=!1,e.next=12;break;case 11:t.$message({type:"error",message:"表单内不能为空！！！"});case 12:case"end":return e.stop()}}),e)})))()},signout:function(){window.sessionStorage.clear(),this.$router.push("/login")}},created:function(){this.getnavdata()},components:{homehead:i["a"]}},l=u,c=(a("de7e"),a("2877")),d=Object(c["a"])(l,n,s,!1,null,"81d538d6",null);e["default"]=d.exports},de7e:function(t,e,a){"use strict";a("01dd")}}]);
//# sourceMappingURL=chunk-749c1c02.d70df735.js.map