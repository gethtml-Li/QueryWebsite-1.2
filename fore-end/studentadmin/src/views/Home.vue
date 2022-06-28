<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header height="80px">
        <homehead>
          <div slot="left" @click="$router.push('/home/'+$route.params.role);routerflag=true">
            <img src="../assets/images/badge.jpg" alt="" />
            {{ $route.params.role }}
          </div>
          <div slot="right" class="signoutbu">
            <el-button@click="signout">退出</el-button@click=>
          </div>
        </homehead>
      </el-header>

      <!--  内容区域 -->
      <el-container>
        <el-aside :width="isnavcolse ? '64px' : '15%'" class="leftnav">
          <div class="colsebutton" @click="isnavcolse = !isnavcolse">| | |</div>
          <el-menu
            unique-opened
            active-text-color="#5e068c"
            :collapse="isnavcolse"
            :collapse-transition="false"
          >
            <!-- 一级菜单 -->
            <el-submenu :index="'' + index" v-for="(item, index) in navdata">
              <template slot="title">
                <i class="iconfont iconicon"></i>
                <span>{{ item }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                v-for="(value,index) in ['一', '二', '三', '四', '五', '六']"
                :index="index + '' + value"
                @click="
                  getstudens({
                    班级: item,
                    考试学期: `第${value}学期`,
                    系部: $route.params.role,
                  })
                "
                ><i
                    :class="['iconfont', 'icon' + (index + 1) + '_round_solid']"
                  ></i>
                  {{ `第${value}学期` }}
                  </el-menu-item
              >
            </el-submenu>
            <el-submenu index="5-1">
              <template slot="title">
                <i class="iconfont iconcaidan"></i>
                <span>操作</span>
              </template>
              <el-menu-item
                index="5-1-1"
                @click="
                  routerJump('/home/' + $route.params.role + '/queryresult')
                "
              >
                <i class="iconfont iconchaxun"></i>
                查询个人成绩
              </el-menu-item>
              <el-menu-item
                index="5-1-2"
                @click="
                  routerJump('/home/' + $route.params.role + '/uploadfile')
                "
              >
                <i class="iconfont iconshangchuan"></i>
                上传成绩文件
              </el-menu-item>
              <el-menu-item
                index="5-1-3"
                @click="
                  routerJump('/home/' + $route.params.role + '/downloadfile')
                "
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
                @click="
                  routerJump('/home/' + $route.params.role + '/changepassword')
                "
              >
                <i class="iconfont iconsuo"></i>
                修改密码
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 中间内容 -->

        <el-main
          :style="{
            width: mainwidth,
          }"
        >
          <router-view v-if="routerflag"></router-view>
          <!-- 中间内容 -->
          <el-card v-else class="box-card">
            <div v-if="studens.length" style="margin-bottom: 10px">
              <el-button type="primary" @click="addstudendialog"
                >添加个人成绩</el-button
              >
            </div>
            <!-- 渲染学生成绩 -->
            <div class="studenslist">
              <table>
                <thead>
                  <tr>
                    <th v-if="tablehead.length != 0">序号</th>
                    <span v-else>暂无数据</span>
                    <th v-for="item in tablehead">{{ item }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item1, index) in studens">
                    <td>{{ ++index }}</td>
                    <td v-for="item in tablehead">{{ item1[item] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-card>

          <!-- 添加学生对话框 -->
          <el-dialog
            title="添加个人成绩"
            :visible.sync="addstudenflag"
            width="61%"
            @close="Resetaddstuden"
          >
            <el-form ref="addstudenform" label-width="80px" :inline="true">
              <el-form-item
                v-for="(item, index) in formdata"
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
import homehead from "../components/Head";
export default {
  data() {
    return {
      isnavcolse: false,
      routerflag: true,
      navdata: [],
      studens: [],
      tablehead: [],
      addstudenflag: false,
      mainwidth: "85%",
      formdata: [],
    };
  },
  isnavcolse: function (newvalue, oldvalue) {
    if (newvalue) {
      this.mainwidth = "96%";
    } else {
      this.mainwidth = "85%";
    }
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

  methods: {
    // 获取左侧导航栏数据
    async getnavdata() {
      this.navdata = (
        await axios.get("/admin/menu", {
          params: {
            系部: this.$route.params.role,
          },
        })
      ).data;
    },
    //路由跳转
    routerJump(path) {
      this.routerflag = true;
      console.log(path);
      this.$router.push(path);
    },
    //点击左侧导航栏菜单获取指定数据
    async getstudens(value) {
      this.routerflag = false;
      this.$router.push("/home/" + this.$route.params.role);
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
        this.formdata = [];
        this.tablehead.forEach((value) => {
          this.formdata.push({
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
    //打开添加成绩表单
    addstudendialog() {
      this.addstudenflag = true;
    },
    //重置添加学生个人成绩表单
    Resetaddstuden() {
      this.formdata.forEach((item) => {
        item.value = "";
      });
    },
    //添加个人成绩
    async addstuden() {
      let num = this.formdata.findIndex((item) => item.value == "");
      if (num == -1) {
        let studen = {};
        this.formdata.forEach((item) => {
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
    // 退出
    signout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
  created() {
    this.getnavdata();
  },
  components: {
    homehead,
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .signoutbu {
      button {
        background-color: rgb(141, 42, 111);
        color: white;
        font-weight: bold;
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
      .studenslist {
        table {
          width: 100%;
          text-align: center;
          border-collapse: collapse;

          tr {
            height: 40px;
            transition: all 0.1s;
            th {
              background: rgb(94, 6, 140);
              color: white;
            }
            td,
            th {
              border-bottom: 2px rgba(159, 0, 127) solid;
            }
            .operation {
              width: 100px;
              button {
                margin: 0;
              }
            }
            &:hover {
              color: white;
              background-color: rgba(159, 0, 127, 0.8);
            }
          }
        }
      }
    }
  }
}
</style>