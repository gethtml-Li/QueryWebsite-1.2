<template>
  <div class="MQuery">
    <div class="logo"></div>
    <div class="query">
      <h1>请输入考生信息</h1>
      <div class="name">
        <span>考生姓名</span
        ><input
          v-model="studentname"
          required
          type="text"
          name="姓名"
          placeholder="请输入姓名"
        />
      </div>
      <div class="ID">
        <span>考生学号</span
        ><input
          v-model="studentid"
          required
          type="text"
          name="学号"
          placeholder="请输入学号(身份证号)"
        />
      </div>
      <div class="YES"><button @click="query">查询</button></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentname: "",
      studentid: "",
    };
  },
  methods: {
    query() {
      if (this.studentname != "" && this.studentid != "") {
        this.$router.push({
          path: "/m.student/m.result",
          query: {
            姓名: this.studentname,
            学号: this.studentid,
          },
        });
      } else {
        this.$message({ type: "error", message: "表单内不能为空！" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.MQuery {
  width: 100%;
  height: 100%;
}
.logo {
  width: 100%;
  height: 1.8rem;
  background-image: url("../assets/images/LOGO.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 9.051282rem;
}
.query {
  position: absolute;
  width: 9.051282rem;
  height: 10.410256rem;
  background-color: rgba(255, 255, 255, 0.85);
  margin: 0 auto;
  left: 50%;
  top: 50%;
  font-weight: bold;
  box-shadow: 6px 7px 10px rgb(66, 62, 62);
  color: #a10c86;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 0.19230769230769232rem;
  justify-content: space-around;
}
.query h1 {
  font-size: 0.6102564102564103rem;
}
.query .class {
  display: flex;
  flex-direction: column;
  font-size: 0.4564102564102564rem;
}
.query .class input {
  outline-color: #5e068c;
  height: 0.48461538461538464rem;
  border: none;
  border-bottom: 0.02564102564102564rem #5e068c solid;
  margin-top: 0.1282051282051282rem;
}
.query .name {
  display: flex;
  flex-direction: column;
  font-size: 0.4564102564102564rem;
}
.query .name input {
  outline-color: #5e068c;
  height: 0.48461538461538464rem;
  border: none;
  border-bottom: 0.02564102564102564rem solid #5e068c;
  margin-top: 0.1282051282051282rem;
  background-color: transparent;
}
.query .ID {
  display: flex;
  flex-direction: column;
  font-size: 0.4564102564102564rem;
}
.query .ID input {
  outline-color: #5e068c;
  height: 0.48461538461538464rem;
  border: none;
  border-bottom: 0.02564102564102564rem #5e068c solid;
  margin-top: 0.1282051282051282rem;
  background-color: transparent;
}
.query .YES {
  width: 60%;
}
.query .YES button {
  font-weight: bold;
  width: 100%;
  border: none;
  height: 0.86153846153846156rem;
  color: white;
  outline: none;
  background-image: linear-gradient(90deg, #8d2971, #5e068c);
  border-radius: 1.2564102564102564rem;
}
</style>