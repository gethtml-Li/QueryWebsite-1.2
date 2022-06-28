<template>
  <div class="downloadfile">
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
      <h1 class="title">可下载文件如下</h1>
      <div class="content">
        <a
          class="a-item"
          v-for="item in filelist"
          :href="'http://39mt692362.qicp.vip:28086/public/UploadFile/' + item"
          download="13.png"
        >
          <i class="iconfont iconexcel"></i><span>{{ item }}</span></a
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filelist: [],
      username: window.sessionStorage.getItem("username"),
    };
  },
  methods: {
    async getfilelist() {
      this.filelist = (await axios.get("/downfile")).data;
    },
  },
  created() {
    this.getfilelist();
  },
};
</script>

<style lang="less" scoped>
.downloadfile {
  width: 100%;
  height: 100%;
  .el-breadcrumb {
    margin-bottom: 5px;
  }

  .el-card {
    .title {
      text-align: center;
      font-size: 20px;
    }
    .content {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 300px;
      justify-content: space-between;
      .a-item {
        text-decoration: none;
        .iconexcel {
          text-decoration: none;
          margin-right: 10px;
          color: #33c481;
        }
        span {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>