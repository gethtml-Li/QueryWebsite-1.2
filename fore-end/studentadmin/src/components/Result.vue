<template>
  <div class="result">
    <datebutton @datealter="getdate"></datebutton>
    <resultview @alter="updata" :studentdata="studentdata"></resultview>
  </div>
</template>

<script>
import resultview from "./ResultView";
import datebutton from "./Datebutton";
export default {
  components: {
    resultview,
    datebutton,
  },
  data() {
    return {
      // 查询条件
      student: null,
      //查询结果
      studentdata: null,
    };
  },

  methods: {
    async getstuden(student) {
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
    updata(student) {
      if (student) {
        this.student.考试学期 = student.考试学期;
        this.getstuden(this.student);
      } else {
        this.studentdata = student;
      }
    },
    getdate(date) {
      this.student.考试学期 = date;
      this.getstuden(this.student);
    },
  },

  created() {
    this.student = this.$route.query;
    this.student.考试学期 = "第一学期";
    this.getstuden(this.student);
  },
};
</script>

<style lang='less' scoped>
.result {
  height: 100%;
  background-image: url("../assets/images/result.png");
  background-position: center;
  background-size: 100%;
}
</style>