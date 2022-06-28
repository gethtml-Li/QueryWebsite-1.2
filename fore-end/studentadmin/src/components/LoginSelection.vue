<template>
  <div class="OptionBox">
    <div class="text">请选择登入身份</div>
    <div class="option">
      <span class="Students" @click="Gostudents">
        <span class="iconfont iconxuesheng1"></span>
        <span class="itemtext">学生</span>
      </span>
      <div class="Administratorses items" @click="$parent.flag = true">
        <span class="iconfont iconyijibumenfuzeren"></span>
        <span class="itemtext">系部管理员</span>
      </div>
      <div class="Superadministrators items" @click="$parent.flag = true">
        <span class="iconfont iconguanliyuan"></span>
        <span class="itemtext">教务处</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    Gostudents() {
      this.$router.push("/student");
      window.sessionStorage.setItem("username", "student");
    },
  },
};
</script>

<style lang="less" scoped>
.OptionBox {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  height: 250px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  border: 1px white solid;
  overflow: hidden;

  .text {
    position: relative;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    background-color: rgb(94, 6, 140);
    padding-top: 5px;
    &::before {
      content: "";
      position: absolute;
      display: block;
      background-image: url("../assets/images/badge.jpg");
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-size: 100% 100%;
      left: 60px;
    }
  }
  .option {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .Students {
      cursor: pointer;
      width: 86px;
      height: 86px;
      display: flex;
      color: white;
      background-color: rgb(94, 6, 140);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      &:hover {
        color: rgb(94, 6, 140);
        background-color: rgb(120, 196, 236);
      }
      .itemtext {
        font-size: 10px;
        font-weight: bold;
      }
      .iconfont {
        font-size: 30px;
        margin-bottom: 5px;
      }
    }
    .items {
      cursor: pointer;
      width: 86px;
      height: 86px;
      display: flex;
      color: white;
      background-color: rgb(94, 6, 140);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      &:hover {
        color: rgb(94, 6, 140);
        background-color: rgb(120, 196, 236);
      }
      .itemtext {
        font-size: 10px;
        font-weight: bold;
      }
      .iconfont {
        font-size: 30px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>