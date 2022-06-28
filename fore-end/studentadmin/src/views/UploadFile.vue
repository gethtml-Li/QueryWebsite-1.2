<template>
  <div class="upfile">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="">
      <el-breadcrumb-item
        v-if="username == 'jiaowuchu'"
        :to="{ path: '/superhome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item v-else :to="{ path: '/home/' + $route.params.role }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>上传成绩文件</el-breadcrumb-item>
    </el-breadcrumb>
    <el-upload
      class="upload-demo"
      drag
      action="http://39mt692362.qicp.vip:28086/uploadfile"
      multiple
      accept=".xlsx,.xls"
      :on-success="uploadfilesuccess"
      :on-error="uploadfileerr"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        <i class="el-icon-warning-outline"></i> 只能上传表格
        <i class="iconfont iconexcel" style="color: #33c481"></i>
        ( .xlsx / .xls 格式)文件
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: window.sessionStorage.getItem("username"),
    };
  },
  methods: {
    uploadfilesuccess(res) {
      if (res.meta.status == 200) {
        window.location.reload();
        this.$message({
          message: "上成绩文件成功！",
          type: "success",
        });
      } else {
        this.$route.meta.flag = true;
        this.$message({
          type: "error",

          message: "上传文件失败！",
        });
      }
    },
    beforeAvatarUpload(file) {
      let isfile =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type == "application/vnd.ms-excel";
      if (!isfile) {
        this.$message.error("上传成绩文件只能是 xlsx格式 或 xls格式");
      }

      return isfile;
    },
    uploadfileerr() {
      this.$message({
        type: "error",
        message: "上传文件失败！",
      });
    },
  },
};
</script>


<style lang="less">
.upfile {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .el-breadcrumb {
    position: absolute;
    top: 0;
    width: 100%;
  }
  .upload-demo {
    width: 50%;
    height: 70%;
    .el-upload {
      width: 100%;
      height: 90%;
      .el-upload-dragger {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .el-upload__tip {
      font-size: 15px;
      .el-icon-warning-outline {
        color: red;
      }
    }
  }
}
</style>