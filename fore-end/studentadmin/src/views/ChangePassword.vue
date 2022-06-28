<template>
  <div class="changepassword">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-if="username == 'jiaowuchu'"
        :to="{ path: '/superhome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item v-else :to="{ path: '/home/' + $route.params.role }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>下载成绩文件</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="form-box">
        <el-form
          label-width="90px"
          label-position="right"
          :model="formdata"
          :rules="chanpassrulesform"
          ref="chanpassform"
        >
          <el-form-item label="用户名:">
            <el-input
              size="small"
              v-model="formdata.username"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="旧密码:" prop="password">
            <el-input
              type="password"
              size="small"
              v-model="formdata.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码:" prop="newpass">
            <el-input
              type="password"
              size="small"
              v-model="formdata.newpass"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码:" prop="confirmpass">
            <el-input
              type="password"
              size="small"
              v-model="formdata.confirmpass"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="footerbuton">
          <el-button @click="confirmchangepass">确定</el-button>
          <el-button @click="Reset">重置</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //   旧密码验证函数
    let checkpassword = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("旧密码不能为空!"));
      } else {
        callback();
      }
    };

    // 新密码验证函数
    let checknewpass = (rule, value, callback) => {
      let rgx = /^[a-zA-Z]\w{5,17}$/;
      if (value == "") {
        callback(new Error("新密码不能为空!"));
      } else {
        if (!rgx.test(value)) {
          callback(
            new Error(
              "密码请以字母开头，长度在6~18之间，只能包含字母、数字和下划线!"
            )
          );
        } else {
          callback();
        }
      }
    };

    // 确认密码验证函数
    let checkconfirmpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码!"));
      } else if (value !== this.formdata.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      formdata: {
        username: window.sessionStorage.getItem("username"),
        password: "",
        newpass: "",
        confirmpass: "",
      },
      chanpassrulesform: {
        password: [{ validator: checkpassword, trigger: "blur" }],
        newpass: [{ validator: checknewpass, trigger: "blur" }],
        confirmpass: [{ validator: checkconfirmpass, trigger: "blur" }],
      },
      username: window.sessionStorage.getItem("username"),
    };
  },
  methods: {
    // 表单内容重置
    Reset() {
      console.log(this.formdata);
      this.$refs.chanpassform.resetFields();
    },
    //提交修改的密码
    confirmchangepass() {
      this.$refs.chanpassform.validate(async (vali) => {
        console.log(this.formdata);
        if (vali) {
          console.log(this.formdata);
          let data = (
            await axios.post("/uppassword", {
              ...this.formdata,
            })
          ).data;
          console.log(data);
          if (data.meta.status == 200) {
            this.$message({
              type: "success",
              message: "修改密码成功",
            });
            this.$alert("修改密码成功，请退出重新登入", "提示", {
              confirmButtonText: "确定",
              type: "success",
              showClose: false,
              callback: () => {
                window.sessionStorage.clear();
                console.log(15454);
                this.$router.replace("/");
                this.$message({
                  type: "success",
                  message: "退出成功",
                });
              },
            });
          } else if (data.meta.status == 300) {
            this.$message({
              type: "error",
              message: "旧密码错误,修改密码失败",
            });
          } else if (data.meta.status == 404) {
            this.$message({
              type: "error",
              message: "修改密码失败,服务器发生未知错误",
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
.changepassword {
  width: 100%;
  height: 100%;
  .el-breadcrumb {
    margin-bottom: 5px;
  }
  .el-card__body {
    width: 100%;
    height: 100%;
  }

  .el-card {
    width: 100%;
    height: 100%;
    .el-card__body {
      position: relative;
      width: 100%;
      height: 100%;
      .form-box {
        position: absolute;
        width: 500px;
        height: 400px;
        background-color: rgba(233, 236, 240);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 10px 30px 10px;
        justify-content: space-around;
        border-radius: 10px;
        box-shadow: 0 0 10px rgb(38, 35, 36);

        .el-form {
          width: 100%;
          .el-form-item__label {
            color: rgb(159, 0, 127);
          }
        }
      }
      .footerbuton {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        button {
          color: rgb(159, 0, 126);
          font-weight: bold;
        }
      }
    }
  }
}
</style>