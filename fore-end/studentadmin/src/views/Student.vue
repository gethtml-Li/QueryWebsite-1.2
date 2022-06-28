<template>
  <div class="student">
    <div class="head">
      <studensHead>
        <img slot="left" src="../assets/images/LOGO.jpg" alt="" />
        <div slot="right" class="headtitle">厚德立身 强技立业</div>
      </studensHead>
    </div>

    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import studensHead from "../components/Head";
export default {
  components: {
    studensHead,
  },
};
</script>
<style lang="less" scoped>
.student {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    height: 80px;
    .headtitle {
      text-align: center;
      line-height: 80px;
      font-size: 32px;
      font-family: "STXingkai";
      color: #a5007f;
    }
  }
  .body {
    flex: 1;
  }
}
</style>