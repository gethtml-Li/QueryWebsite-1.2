<template>
  <div class="MResult">
    <div class="logo">
      <i @click="opendrawer" class="el-icon-menu menu"></i>
    </div>
    <div v-if="studentdata" class="achievement" style="display: flex">
      <h1>该考生成绩如下</h1>
      <div>
        <span>考生姓名：{{ studentdata.姓名 }}</span>
        <span></span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span> 考生学号：</span>
        <span>{{ studentdata.学号 }}</span>
      </div>
      <div>
        <span>年级：</span>
        <span>{{ studentdata.年级 }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span> 班级:</span>
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

      <div></div>
      <button class="return" @click="continuequery">继续查询</button>
    </div>
    <div v-else class="achievement" style="display: flex">
      <div class="image">
        <div>暂无本学期成绩</div>
      </div>

      <button class="return" @click="continuequery">继续查询</button>
    </div>

    <el-drawer
      title="请选择考试学期"
      :visible.sync="drawerflag"
      direction="ttb"
    >
      <div class="datebutton">
        <el-button
          round
          :class="{ focus: num == index }"
          v-for="(value, index) in ['一', '二', '三', '四', '五', '六']"
          :index="index + '' + value"
          @click="datebuttonclick(`第${value}学期`, index)"
        >
          {{ `第${value}学期` }}</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentdata: null,
      student: this.$route.query,
      drawerflag: false,
      num: 0,
    };
  },
  methods: {
    //继续查询按钮方法
    continuequery() {
      this.$router.push("/m.student");
    },
    async getstudentdata(student) {
      let data = (
        await axios.get("/getstudent", {
          params: {
            ...student,
          },
        })
      ).data;
      if (data.meta.status == 200) {
        this.studentdata = data.student;
        console.log(this.studentdata);
        this.$message({
          type: "success",
          message: "查询成功！",
        });
      } else {
        this.$message({
          type: "success",
          message: "查询失败！",
        });
      }
    },
    // 打开考试学期选择框
    opendrawer() {
      this.drawerflag = true;
    },
    //
    datebuttonclick(date, num) {
      this.student.考试学期 = date;
      this.drawerflag = false;
      this.num = num;
      this.getstudentdata(this.student);
    },
  },
  created() {
    this.student.考试学期 = "第一学期";
    console.log(this.student);
    this.getstudentdata(this.student);
  },
};
</script>

<style>
.MResult {
  width: 100%;
  height: 100%;
}
.achievement .image {
  width: 100%;
  height: 50%;
  background-image: url("../assets/images/nulldata.png");
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.el-drawer__header span {
  font-size: 0.5rem;
  color: #8d2971;
  font-weight: bold;
}
.datebutton {
  display: flex;
  height: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
}
.datebutton button {
  height: 35%;
}
.focus {
  background-image: linear-gradient(90deg, #8d2971, #5e068c);
  font-weight: bold;
  color: white;
}
.datebutton :nth-child(4) {
  margin: 0 !important;
}
.logo {
  width: 100%;
  height: 1.8rem;
  background-image: url("../assets/images/LOGO.jpg");
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: flex-end;
  background-size: 6.051282rem;
  align-items: center;
  padding-right: 0.5rem;
}
.logo .menu {
  font-size: 0.8rem;
  color: #8d2971;
}
.achievement {
  position: absolute;
  width: 9.051282rem;
  height: 14.410256rem;
  background-color: rgba(255, 255, 255, 0.85);
  left: 50%;
  top: 50%;
  box-shadow: 6px 7px 10px black;
  font-weight: bold;
  transform: translate(-50%, -50%);
  text-align: center;
  align-items: center;
  flex-direction: column;
  font-size: 0.4564102564102564rem;
  border-radius: 0.19230769230769232rem;
  justify-content: space-around;
  color: rgb(135, 9, 119);
}
.achievement h1 {
  font-size: 0.7102564102564103rem;
}

.achievement .course {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
}
.achievement button {
  font-weight: bold;
  width: 60%;
  height: 0.86153846153846156rem;
  color: white;
  outline: none;
  border: none;
  background-image: linear-gradient(90deg, #8d2971, #5e068c);
  border-radius: 1.2564102564102564rem;
}
</style>