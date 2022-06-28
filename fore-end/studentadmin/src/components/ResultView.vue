<template>
  <div class="ResultView">
    <div v-if="studentdata != null" class="achievement" style="display: flex">
      <h1>该考生成绩如下</h1>
      <div>
        <span>考生姓名：</span>
        <span>{{ studentdata.姓名 }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span> 考生学号：</span>
        <span>{{ studentdata.学号 }}</span>
      </div>
      <div>
        <span>年级：</span>
        <span>{{ studentdata.年级 }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span> 班级：</span>
        <span>{{ studentdata.班级 }}</span>
      </div>
      <!-- 各科成绩 -->
      <div
        v-for="(value, key, index) in studentdata"
        v-if="index > 6"
        class="course"
      >
        <span>{{ key }}</span>
        <span>{{ studentdata[key] }}</span>
      </div>
      <div class="operation">
        <el-button type="primary" round @click="continuequery"
          >继续查询</el-button
        >
        <el-button
          v-if="username === 'jiaowuchu'"
          round
          type="warning"
          @click="upstudentdialog"
          >修改</el-button
        >
        <el-button
          v-if="username === 'jiaowuchu'"
          type="danger"
          round
          @click="deletestudent"
          >删除</el-button
        >
      </div>
    </div>
    <datanull v-else>
      <div class="title" slot="title">暂无本学期成绩</div>
      <div slot="button">
        <el-button type="primary" round @click="continuequery">
          继续查询
        </el-button>
      </div>
    </datanull>
    <el-dialog title="修改个人成绩" :visible.sync="upstudentflag" width="61%">
      <el-form label-width="80px" :inline="true" :model="tempstudent">
        <el-form-item v-for="(value, key) in tempstudent" :label="key">
          <el-input v-model="tempstudent[key]"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="upstudentflag = false">取 消</el-button>
        <el-button type="primary" @click="upstudent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import datanull from "./Datanull";
export default {
  data() {
    return {
      upstudentflag: false,
      tempstudent: null,
      username: sessionStorage.getItem("username"),
    };
  },
  components: { datanull },

  methods: {
    //继续查询按钮方法
    continuequery() {
      if (this.username === "jiaowuchu") {
        this.$router.push("/superhome/queryresult");
      } else if (sessionStorage.getItem("username") == "student") {
        this.$router.push("/student/queryresult");
      } else {
        console.log(this.$route);
        this.$router.push("/home/" + this.$route.params.role + "/queryresult");
      }
    },
    upstudentdialog() {
      this.upstudentflag = true;
      this.tempstudent = { ...this.studentdata };
      delete this.tempstudent._id;
    },
    async upstudent() {
      this.upstudentflag = false;
      let data = (
        await axios.post("/upstuden", {
          _id: this.studentdata._id,
          ...this.tempstudent,
          ispersonal: true,
        })
      ).data;
      if (data.meta.status == 200) {
        console.log(data.student);
        this.$emit("alter", data.student);
        this.$message({
          type: "success",
          message: "修改成功！",
        });
      } else {
        this.$message({
          type: "error",
          message: "添加失败",
        });
      }
    },
    deletestudent() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = (
            await axios.get("/deletestudent", {
              params: {
                _id: this.studentdata._id,
                ispersonal: true,
              },
            })
          ).data;
          console.log(data);
          if (data.meta.status == 200) {
            this.$emit("alter", data.students);
            this.$message({
              type: "success",
              message: "删除成功！",
            });
          } else {
            this.$message({
              type: "error",
              message: "添加失败",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {},
  props: {
    studentdata: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.ResultView {
  position: relative;
  height: 90%;
  .achievement {
    color: black;
    position: absolute;
    width: 445px;
    height: 97%;
    background-color: rgba(255, 255, 255, 0.5);
    left: 50%;
    bottom: 0;
    font-weight: bold;
    transform: translateX(-50%);
    text-align: center;
    display: none;
    align-items: center;
    flex-direction: column;
    border-radius: 15px;
    justify-content: space-around;
    .course {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-left: 50px;
      padding-right: 50px;
      color: black;
      box-sizing: border-box;
    }
    .operation {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>