(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13bd6fa0"],{"5fc0":function(t,e,a){},6007:function(t,e,a){"use strict";a("5fc0")},6381:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"downloadfile"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},["jiaowuchu"==t.username?a("el-breadcrumb-item",{attrs:{to:{path:"/superhome"}}},[t._v("首页")]):a("el-breadcrumb-item",{attrs:{to:{path:"/home/"+t.$route.params.role}}},[t._v("首页")]),a("el-breadcrumb-item",[t._v("下载成绩文件")])],1),a("el-card",[a("h1",{staticClass:"title"},[t._v("可下载文件如下")]),a("div",{staticClass:"content"},t._l(t.filelist,(function(e){return a("a",{staticClass:"a-item",attrs:{href:"http://39mt692362.qicp.vip/public/UploadFile/"+e,download:"13.png"}},[a("i",{staticClass:"iconfont iconexcel"}),a("span",[t._v(t._s(e))])])})),0)])],1)},r=[],i=a("1da1"),s=(a("96cf"),{data:function(){return{filelist:[],username:window.sessionStorage.getItem("username")}},methods:{getfilelist:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/downfile");case 2:t.filelist=e.sent.data;case 3:case"end":return e.stop()}}),e)})))()}},created:function(){this.getfilelist()}}),c=s,o=(a("6007"),a("2877")),l=Object(o["a"])(c,n,r,!1,null,"1eda8e27",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-13bd6fa0.4db1a0f3.js.map