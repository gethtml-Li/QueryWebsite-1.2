<template>
  <div class="studenslist">
    <table>
      <thead>
        <tr>
          <th v-if="tablehead.length != 0">序号</th>
          <th v-for="item in tablehead">{{ item }}</th>
          <th v-if="tablehead.length != 0">操作</th>
          <span v-else>暂无数据</span>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item1, index) in studens">
          <td>{{ ++index }}</td>
          <td v-for="item in tablehead">{{ item1[item] }}</td>
          <td class="operation">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                @click="upstudentdialog(item1)"
                style="margin-right: 2px"
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deletestudent(item1)"
              ></el-button>
            </el-tooltip>
          </td>
        </tr>
      </tbody>
    </table>

    <el-dialog title="修改个人成绩" :visible.sync="upstudentflag" width="61%">
      <el-form label-width="80px" :inline="true">
        <el-form-item
          v-for="(item, index) in formdata"
          :label="item.key"
          :key="index"
          v-if="item.key != '_id'"
        >
          <el-input v-model="item.value"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="upstudentflag = false">取 消</el-button>
        <el-button type="primary" @click="upstudens">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      upstudentflag: false,
      formdata: {},
    };
  },
  methods: {
    //修改个人成绩对话框
    upstudentdialog(student) {
      this.upstudentflag = true;
      this.formdata = [];
      for (let key in student) {
        this.formdata.push({
          key: key,
          value: student[key],
        });
      }
    },
    //提交修改个人成绩后的方法
    async upstudens() {
      let newstuden = {};
      this.formdata.forEach((item) => {
        newstuden[item.key] = item.value;
      });
      let data = (
        await axios.post("/upstuden", {
          ...newstuden,
          ispersonal: false,
        })
      ).data;
      if (data.meta.status == 200) {
        this.$emit("alter", data.students);
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
      this.upstudentflag = false;
    },
    //删除个人成绩
    deletestudent(student) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = (
            await axios.get("/deletestudent", {
              params: {
                _id: student._id,
                系部: student.系部,
                考试学期: student.考试学期,
                班级: student.班级,
                ispersonal: false,
              },
            })
          ).data;
          if (data.meta.status == 200) {
            console.log(data.students);
            this.$emit("alter", data.students);
            this.$message({
              type: "success",
              message: "删除成功！",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
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

  props: {
    studens: Array,
    tablehead: Array,
  },
};
</script>

<style lang="less" scoped>
.studenslist {
  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;

    tr {
      height: 40px;
      transition: all 0.1s;
      th {
        background: rgb(94, 6, 140);
        color: white;
      }
      td,
      th {
        border-bottom: 2px rgba(159, 0, 127) solid;
      }
      .operation {
        width: 100px;
        button {
          margin: 0;
        }
      }
      &:hover {
        color: white;
        background-color: rgba(159, 0, 127, 0.8);
      }
    }
  }
}
</style>