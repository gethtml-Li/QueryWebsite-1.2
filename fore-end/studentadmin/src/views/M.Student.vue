<template>
  <div class="MStudent">
    <router-view></router-view>
  </div>
</template>

<script>
import "../assets/js/flex";
export default {};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
@media screen and (min-width: 780px) {
  html {
    font-size: 78px !important;
  }
}
html {
  height: 100%;
}
body {
  margin: 0 auto;
  width: 10rem;
  height: 100%;
  max-width: 10rem;
  background-image: url("../assets/images/badge.jpg");
  background-position: center;
  background-size: 9rem;
  background-repeat: no-repeat;
}
.MStudent {
  width: 100%;
  height: 100%;
}
</style>