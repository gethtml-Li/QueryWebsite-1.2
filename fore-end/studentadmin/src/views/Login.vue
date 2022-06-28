<template>
  <div class="login">
    <Head>
      <img slot="left" src="../assets/images/LOGO.jpg" alt="" />
      <div slot="right" class="headtitle">厚德立身 强技立业</div>
    </Head>
    <transition name="fade" mode="out-in">
      <div v-if="flag" class="logins">
        <div class="headimg">
          <img src="../assets/images/badge.jpg" alt="" />
        </div>
        <el-form
          :rules="rules"
          ref="loginformobj"
          :model="loginform"
          class="loginform"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginform.username"
              placeholder="请输入用户名"
              prefix-icon="iconfont iconyonghu"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginform.password"
              placeholder="请输入密码"
              prefix-icon="iconfont iconsuo"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item class="footerbuton">
            <el-button type="primary" @click="onSubmit">登入</el-button>
            <el-button @click="Reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <loginselection v-else></loginselection>
    </transition>
  </div>
</template>

<script>
import Head from "../components/Head.vue";
import loginselection from "../components/LoginSelection";
export default {
  data() {
    return {
      loginform: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      flag: false,
    };
  },
  components: {
    Head,
    loginselection,
  },
  methods: {
    onSubmit() {
      this.$refs.loginformobj.validate(async (vali) => {
        if (vali) {
          let data = (
            await axios.get("/login", {
              params: {
                ...this.loginform,
              },
            })
          ).data;
          console.log(data);
          if (data.meta.status == 200) {
            sessionStorage.setItem("flag", true);
            sessionStorage.setItem("username", data.username);
            if (data.role == "教务处") {
              this.$router.push("/superhome");
            } else {
              this.$router.push("/home/" + data.role);
            }

            this.$message({
              type: "success",
              message: "登入成功",
            });
          } else {
            sessionStorage.setItem("flag", false);
            this.$message({
              type: "error",
              message: "登入失败，账号或密码错误！",
            });
          }
        }
      });
    },
    Reset() {
      console.log(this.$refs.loginformobj);
      this.$refs.loginformobj.resetFields();
    },
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      //判断打开设备是否是移动端
      if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      ) {
        this.$router.replace("/m.student");
      } else {
        this.$router.replace("/login");
      }
    },
  },
  created() {
    this.browserRedirect();
  },
};
</script>

<style lang='less' scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/bj.jpg");
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100%;
  .headtitle {
    text-align: center;
    line-height: 80px;
    font-size: 32px;
    font-family: "STXingkai";
    color: #a5007f;
  }
  .logins {
    position: absolute;
    width: 450px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(94, 6, 140);
    background-color: white;
    border-radius: 10px;
    font-weight: bold;
    .headimg {
      position: absolute;
      left: 50%;

      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      padding: 10px;
      background-color: #ffffff;
      box-shadow: 0 0 10px rgb(158, 0, 131);
      border-radius: 50%;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .loginform {
      position: absolute;
      width: 100%;
      padding: 10px;
      bottom: 0;

      .footerbuton {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>