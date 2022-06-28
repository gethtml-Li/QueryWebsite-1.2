<template>
  <div class="queryform">
    <h1>请输入考生信息</h1>
    <div class="name">
      <span>考生姓名：</span
      ><input
        required
        type="text"
        name="姓名"
        v-model="student.name"
        placeholder="请输入姓名"
      />
    </div>
    <div class="ID">
      <span>考生学号：</span
      ><input
        v-model="student.id"
        required
        type="text"
        name="学号"
        placeholder="请输入学号（身份证号）"
      />
    </div>
    <div class="YES"><button @click="query">查询</button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {
        name: "",
        id: "",
      },
    };
  },
  methods: {
    query() {
      if (this.student.name != "" && this.student.id != "") {
        this.$emit("querydata", this.student);
      } else {
        this.$message({
          type: "error",
          message: "表单内不能为空！",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.queryform {
  position: absolute;
  width: 320px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.6);
  margin: 0 auto;
  left: 50%;
  top: 50%;
  font-weight: bold;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  justify-content: space-around;
  color: rgb(94, 6, 140);

  .name {
    input {
      outline-color: rgb(94, 6, 140);
      height: 25px;
      border: none;
      border-bottom: 2px solid rgb(94, 6, 140);
      background-color: transparent;
    }
  }
  .ID {
    input {
      height: 25px;
      border: none;
      outline-color: rgb(94, 6, 140);
      border-bottom: 2px rgb(94, 6, 140) solid;
      background-color: transparent;
    }
  }
  .YES {
    button {
      font-weight: bold;
      width: 120px;
      height: 36px;
      color: white;
      outline: none;
      background-color: rgb(94, 6, 140);
      border-radius: 20px;
    }
  }
}
</style>