<template>
  <div id="app">
    <transition
      name="fade"
      enter-active-class="animated backInLeft"
      leave-active-class="animated backOutLeft"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

  <script>
import XLSX from "xlsx";
export default {
  data() {
    return {};
  },
  created() {
    this.flag = true;
    console.log("app", this.flag);
    console.log(XLSX);
  },
};
</script>
<style lang="less">
#nprogress .bar {
  background: #9f007e;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
}
</style>
