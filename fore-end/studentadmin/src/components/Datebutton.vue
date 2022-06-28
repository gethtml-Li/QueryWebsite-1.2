<template>
  <div class="datebu">
    <el-button
      :class="{ bufocus: num == 1 }"
      round
      @click="clickdatebu('第一学期', 1)"
      >第一学期</el-button
    >
    <el-button
      :class="{ bufocus: num == 2 }"
      round
      @click="clickdatebu('第二学期', 2)"
      >第二学期</el-button
    >
    <el-button
      :class="{ bufocus: num == 3 }"
      round
      @click="clickdatebu('第三学期', 3)"
      >第三学期</el-button
    >
    <el-button
      :class="{ bufocus: num == 4 }"
      round
      @click="clickdatebu('第四学期', 4)"
      >第四学期</el-button
    >
    <el-button
      :class="{ bufocus: num == 5 }"
      round
      @click="clickdatebu('第五学期', 5)"
      >第五学期</el-button
    >
    <el-button
      :class="{ bufocus: num == 6 }"
      round
      @click="clickdatebu('第六学期', 6)"
      >第六学期</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    clickdatebu(date, num) {
      this.num = num;
      this.$emit("datealter", date);
    },
  },
};
</script>

<style lang="less" scoped>
.datebu {
  height: 10%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  .bufocus {
    background: #ecf5ff;
    font-weight: bold;
    color: #409eff;
  }
}
</style>