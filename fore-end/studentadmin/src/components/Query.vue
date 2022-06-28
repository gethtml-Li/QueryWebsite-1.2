<template>
  <div class="query">
    <queryform @querydata="getquerydata"></queryform>
  </div>
</template>

<script>
import queryform from "./Queryform";
export default {
  components: {
    queryform,
  },
  methods: {
    getquerydata(student) {
      console.log(sessionStorage.getItem("username"));
      if (sessionStorage.getItem("username") === "jiaowuchu") {
        console.log("教务处");
        this.$router.push({
          path: "/superhome/queryresult/result",
          query: {
            姓名: student.name,
            学号: student.id,
          },
        });
      } else if (sessionStorage.getItem("username") == "student") {
        this.$router.push({
          path: "/student/queryresult/result",
          query: {
            姓名: student.name,
            学号: student.id,
          },
        });
      } else {
        this.$router.push({
          path: "/home/" + this.$route.params.role + "/queryresult/result",
          query: {
            姓名: student.name,
            学号: student.id,
          },
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
.query {
  height: 100%;
  background-image: url("../assets/images/query.png");
  background-position: center;
  background-size: 100%, 100%;
  background-repeat: no-repeat;
}
</style>