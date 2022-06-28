<template>
  <div class="queryresult">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      v-if="username != 'student'"
    >
      <el-breadcrumb-item
        v-if="username == 'jiaowuchu'"
        :to="{ path: '/superhome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item v-else :to="{ path: '/home/' + $route.params.role }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>查询</el-breadcrumb-item>
      <el-breadcrumb-item>查询结果</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: window.sessionStorage.getItem("username"),
    };
  },
  components: {},
};
</script>

<style lang='less' scoped>
.queryresult {
  height: 100%;
  .el-breadcrumb {
    margin-bottom: 5px;
  }
}
</style>