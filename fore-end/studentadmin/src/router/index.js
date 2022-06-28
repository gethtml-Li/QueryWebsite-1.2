import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login'
import SuperHome from '../views/SuperHome'

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "/login"
  },
  {
    path: "/login",
    component: login

  },
  // 教务处用户首页
  {
    path: "/superhome",
    component: SuperHome,
    children: [
      {
        path: '',
        redirect: "welcome"
      },
      {
        path: "welcome",
        component: () => import("../views/Welcome")
      },

      //查询个人成绩路由
      {
        name: 'queryresult',
        path: "queryresult",
        component: () => import("../views/QueryResult"),
        children: [
          {
            path: '',
            redirect: "query"
          },
          {
            path: "query",
            component: () => import("../components/Query")
          },
          {
            path: "result",
            component: () => import("../components/Result")
          },
        ]
      },
      //上传成绩文件路由
      {
        path: "uploadfile",
        component: () => import("../views/UploadFile"),

      },
      //下载成绩文件
      {
        path: "downloadfile",
        component: () => import("../views/DownLoadFile")
      },
      //修改密码路由
      {
        path: "changepassword",
        component: () => import("../views/ChangePassword")
      }
    ]
  },
  // 系部管理员
  {
    path: "/home/:role",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: '',
        redirect: "welcome"
      },
      {
        path: "welcome",
        component: () => import("../views/Welcome")
      },

      //查询个人成绩路由
      {
        name: 'queryresult',
        path: "queryresult",
        component: () => import("../views/QueryResult"),
        children: [
          {
            path: '',
            redirect: "query"
          },
          {
            path: "query",
            component: () => import("../components/Query")
          },
          {
            path: "result",
            component: () => import("../components/Result")
          },
        ]
      },
      //上传成绩文件路由
      {
        path: "uploadfile",
        component: () => import("../views/UploadFile")

      },
      //下载成绩文件
      {
        path: "downloadfile",
        component: () => import("../views/DownLoadFile")
      },
      //修改密码路由
      {
        path: "changepassword",
        component: () => import("../views/ChangePassword")
      }
    ]


  },

  // 电脑学生访问
  {

    path: "/student",
    component: () => import("../views/Student"),
    children: [
      {
        path: '',
        redirect: "queryresult"
      },

      //查询个人成绩路由
      {
        name: 'queryresult',
        path: "queryresult",
        component: () => import("../views/QueryResult"),
        children: [
          {
            path: '',
            redirect: "query"
          },
          {
            path: "query",
            component: () => import("../components/Query")
          },
          {
            path: "result",
            component: () => import("../components/Result")
          },
        ]
      },

    ]

  },

  // 手机学生访问
  {
    path: "/m.student",
    component: () => import("../views/M.Student"),
    children: [
      {
        path: '',
        redirect: "m.query"
      },
      {
        path: "m.query",
        component: () => import("../views/M.Query")
      },
      {
        path: "m.result",
        component: () => import("../views/M.Result")
      }

    ]
  }
]



const router = new VueRouter({
  routes
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

router.beforeEach((to, from, next) => {
  let username = window.sessionStorage.getItem("username")
  console.log(to.path);
  if (to.path == "/login" || to.path.indexOf('student') == 1 || to.path.indexOf('m.student') == 1) {
    next()
  } else {
    if (JSON.parse(window.sessionStorage.getItem("flag")) && username == "jiaowuchu") {
      if (to.path.indexOf("home") == 1) {
        console.log("dfsdff");
        next("/login");
      } else {
        next()
      }
    } else if (JSON.parse(window.sessionStorage.getItem("flag")) && username != "jiaowuchu") {
      if (to.path.indexOf("superhome") == 1) {
        next("/login");
      } else {
        console.log("55555");
        next()
      }
    }
    else {
      next("/login")
    }
  }
})
export default router
