<template>
  <div v-else class="datanull">
    <div class="image"></div>
    <slot name="title" class="title"></slot>
    <slot name="button"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.datanull {
  position: absolute;
  width: 445px;
  height: 97%;
  left: 50%;
  border-radius: 15px;
  bottom: 0;
  display: flex;
  transform: translateX(-50%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  .image {
    background-image: url("../assets/images/nulldata.png");
    width: 128px;
    height: 128px;
    margin-bottom: 20px;
  }
  .title {
    font-weight: bold;
    color: #bfbfbf;
    margin-bottom: 20px;
  }
}
</style>