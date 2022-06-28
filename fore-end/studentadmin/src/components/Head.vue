<template>
  <div class="head" :style="{ backgroundColor: backgroundColor }">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "white",
    },
  },
};
</script>

<style lang='less' scoped>
.head {
  position: fixed;
  width: 100%;
  height: 80px;
  padding: 10px;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 25px;
    height: 100%;
    font-weight: bold;
    color: #8b2a6f;
    img {
      height: 100%;
      margin-right: 10px;
    }
  }
  img {
    height: 100%;
  }
}
</style>