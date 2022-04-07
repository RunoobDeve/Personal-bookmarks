<template>
  <div class="tool-bar">
    <div class="tool-top">
      <div class="triangle"></div>
    </div>
    <div class="tool-theme">123</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "../styles/theme.less";
.tool-bar {
  position: absolute;
  right: 10px;
  bottom: 300px;
  .tool-top {
    background-color: #333;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 2px #333;
    padding-top: 5px;
    box-sizing: border-box;
    .triangle {
      border: 10px solid;
      width: 0;
      margin: 0 auto;
      border-color: transparent transparent #fff transparent;
    }
  }
}
</style>