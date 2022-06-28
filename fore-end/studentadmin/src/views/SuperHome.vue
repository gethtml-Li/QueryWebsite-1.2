<template>
  <div class="superhome">
    <el-container class="body">
      <el-header height="80px">
        <superhomehead>
          <div
            slot="left"
            @click="
              $router.push('/superhome');
              routerflag = true;
            "
          >
            <img src="../assets/images/badge.jpg" alt="" />
            工商学生成绩管理系统
          </div>
          <div slot="right" class="signoutbu">
            <el-button @click="signout">退出</el-button>
          </div></superhomehead
        >
      </el-header>

      <el-container>
        <!-- 左侧导航栏 -->
        <el-aside :width="isnavcolse ? '64px' : '15%'" class="leftnav">
          <div class="colsebutton" @click="isnavcolse = !isnavcolse">| | |</div>
          <el-menu
            unique-opened
            active-text-color="#5e068c"
            :collapse="isnavcolse"
            :collapse-transition="false"
          >
            <!-- 一级菜单 -->
            <el-submenu :index="index1 + ''" v-for="(item1, index1) in navdata">
              <template slot="title">
                <i :class="['iconfont', naviconfont[index1]]"></i>
                <span>{{ item1.menunaem }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-submenu
                :index="index1 + '' + index"
                v-for="(item, index) in item1.children"
              >
                <template slot="title">
                  <i class="iconfont iconicon"></i>
                  <span>{{ item }}</span>
                </template>
                <!-- 三级菜单 -->
                <el-menu-item
                  v-for="(value, index) in ['一', '二', '三', '四', '五', '六']"
                  :index="index1 + '' + index + '' + value"
                  @click="
                    getstudens({
                      班级: item,
                      考试学期: `第${value}学期`,
                      系部: item1.menunaem,
                    })
                  "
                >
                  <i class="iconfont icon-anniandaichaxun"></i>
                  {{ `第${value}学期` }}
                </el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="5-1">
              <template slot="title">
                <i class="iconfont iconcaidan"></i>
                <span>操作</span>
              </template>
              <el-menu-item
                index="5-1-1"
                @click="routerJump('/superhome/queryresult')"
              >
                <i class="iconfont iconchaxun"></i>
                查询个人成绩
              </el-menu-item>
              <el-menu-item
                index="5-1-2"
                @click="routerJump('/superhome/uploadfile')"
              >
                <i class="iconfont iconshangchuan"></i>
                上传成绩文件
              </el-menu-item>
              <el-menu-item
                index="5-1-3"
                @click="routerJump('/superhome/downloadfile')"
              >
                <i class="iconfont iconGroup-"></i>
                下载成绩文件
              </el-menu-item>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>设置</span>
              </template>
              <el-menu-item
                index="6-1-1"
                @click="routerJump('/superhome/changepassword')"
              >
                <i class="iconfont iconsuo"></i>
                修改密码
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 中间内容区域 -->

        <el-main
          :style="{
            width: mainwidth,
          }"
        >
          <transition name="fade">
            <router-view v-if="routerflag"></router-view>

            <!-- 中间内容 -->
            <el-card v-else class="box-card">
              <div v-if="studens.length" style="margin-bottom: 10px">
                <el-button type="danger" @click="removeall({ ...studens[0] })">
                  一键删除
                </el-button>
                <el-button type="primary" @click="addstudendialog"
                  >添加个人成绩</el-button
                >
              </div>
              <!-- 渲染学生成绩列表组件 -->
              <studenslist
                @alter="updata"
                :studens="studens"
                :tablehead="tablehead"
              >
              </studenslist>
            </el-card>
          </transition>
          <!-- 添加学生对话框 -->
          <el-dialog
            title="添加个人成绩"
            :visible.sync="addstudenflag"
            width="61%"
            @close="Resetaddstuden"
          >
            <el-form ref="addstudenform" label-width="80px" :inline="true">
              <el-form-item
                v-for="(item, index) in addformdata"
                :label="item.key"
                :key="index"
              >
                <el-input
                  v-if="
                    item.key == '系部' ||
                    item.key == '班级' ||
                    item.key == '考试学期'
                  "
                  :value="(item.value = studens[0][item.key])"
                  :disabled="true"
                ></el-input>
                <el-input v-else v-model="item.value"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addstudenflag = false">取 消</el-button>
              <el-button type="primary" @click="addstuden">确 定</el-button>
            </span>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//头部组件
import superhomehead from "../components/Head";
// 渲染学生成绩列表组件
import studenslist from "../components/SuperStudenslist";
export default {
  data() {
    return {
      // 左侧导航栏数据
      navdata: [],
      // 导航栏列表图标
      naviconfont: [
        "icongongcheng-",
        "iconhuoche",
        "iconyinger",
        "iconyiyaoxiang",
        "iconfuwu",
        "iconhuaban25",
        "iconxuesheng",
      ],

      // 各班个学期学生列表数据
      studens: [],

      // 表头数据
      tablehead: [],

      // 控制添加学生的变量
      addstudenflag: false,

      // 添加学生的表单
      addformdata: [],

      //  控制左侧导航栏的合拢变量
      isnavcolse: false,

      //控制 el-main组件宽度的列表
      mainwidth: "85%",

      // 控制是否显示路由组件变量
      routerflag: false,
    };
  },

  watch: {
    isnavcolse: function (newvalue, oldvalue) {
      if (newvalue) {
        this.mainwidth = "96%";
      } else {
        this.mainwidth = "85%";
      }
    },
  },

  components: {
    superhomehead,
    studenslist,
  },
  methods: {
    //获取左侧导航栏数据
    async getnavdata() {
      this.navdata = (await axios.get("/jiaowuch/menu")).data;
    },
    //点击左侧导航栏菜单获取指定数据
    async getstudens(value) {
      this.routerflag = false;
      this.$router.push("/superhome");
      let data = (
        await axios.get("/getstudens", {
          params: {
            ...value,
          },
        })
      ).data;
      if (data.meta.status == 200) {
        this.studens = data.students;
        this.tablehead =
          this.studens.length == 0 ? [] : Object.keys(this.studens[0]);
        this.tablehead.shift();
        this.addformdata = [];
        this.tablehead.forEach((value) => {
          this.addformdata.push({
            key: value,
            value: "",
          });
        });
        this.$message({
          type: "success",
          message: "获取数据成功！",
        });
      }
    },
    //点击删除按钮删除当前页面数据
    removeall(value) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = (
            await axios.post("/removeall", {
              系部: value.系部,
              班级: value.班级,
              考试学期: value.考试学期,
            })
          ).data;
          if (data.meta.status == 200) {
            // this.getnavdata();
            this.getstudens({
              系部: value.系部,
              班级: value.班级,
              考试学期: value.考试学期,
            });
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //打开添加成绩表单
    addstudendialog() {
      this.addstudenflag = true;
    },
    //添加个人成绩
    async addstuden() {
      let num = this.addformdata.findIndex((item) => item.value == "");
      if (num == -1) {
        let studen = {};
        this.addformdata.forEach((item) => {
          studen[item.key] = item.value;
        });
        let data = (
          await axios.post("/addstuden", {
            ...studen,
          })
        ).data;

        if (data.meta.status == 200) {
          this.studens = data.students;
          this.$message({
            type: "success",
            message: "添加成功！",
          });
        } else {
          this.$message({
            type: "error",
            message: "添加失败",
          });
        }

        this.addstudenflag = false;
      } else {
        this.$message({
          type: "error",
          message: "表单内不能为空！！！",
        });
      }
    },
    //重置添加学生个人成绩表单
    Resetaddstuden() {
      this.addformdata.forEach((item) => {
        item.value = "";
      });
    },
    //每当子组件更改数据执行以下程序更新侧边栏和学生成绩数据
    updata(students) {
      this.getnavdata();
      if (students.length) {
        this.getstudens({
          班级: students[0].班级,
          考试学期: students[0].考试学期,
          系部: students[0].系部,
        });
      } else {
        this.getstudens({});
      }
    },
    //路由跳转
    routerJump(path) {
      this.routerflag = true;
      this.$router.push(path);
    },

    signout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
  created() {
    this.getnavdata();
    if (this.$route.path != "/superhome") {
      this.routerflag = true;
    }
  },
};
</script>

<style lang="less" scoped>
.superhome {
  width: 100%;
  height: 100%;
  .body {
    width: 100%;
    height: 100%;
    .signoutbu {
      display: flex;
      align-items: center;
      button {
        height: 40px;
        font-weight: bold;
        color: white;
        background-color: rgb(159, 0, 127);
      }
    }

    .leftnav {
      position: fixed;
      height: 80vh;
      .iconfont,
      .el-icon-setting {
        margin-right: 10px;
        font-size: 20px;
        color: rgb(173, 0, 143);
      }
      .colsebutton {
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        color: white;
        background: #9f007e;
      }
    }
    .el-main {
      position: absolute;
      right: 0;
      background: #eaedf1;
      height: 85%;
    }
  }
}
</style>