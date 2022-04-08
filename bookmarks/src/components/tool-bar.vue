<template>
  <div>
    <div class="tool-bar">
      <div class="tool-top">
        <div class="triangle"></div>
      </div>
      <div
        @click="toggleTheme"
        :class="['tool-theme', theme == 'light' ? 'light-theme' : 'dark-theme']"
      >
        <i v-show="theme == 'light'" class="iconfont icontaiyang-copy"></i>
        <i v-show="theme == 'dark'" class="iconfont iconmoonbyueliang"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "light",
    };
  },
  methods: {
    toggleTheme() {
      if (this.theme == "light") {
        this.theme = "dark";
      } else {
        this.theme = "light";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../styles/theme.less";
.tool-bar {
  position: fixed;
  right: 10px;
  bottom: 200px;
  z-index: 10000;
  .tool-top {
    background-color: #333;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 2px #333;
    padding-top: 6px;
    box-sizing: border-box;
    cursor: pointer;
    .triangle {
      border: 8px solid;
      width: 0;
      margin: 0 auto;
      border-color: transparent transparent #fff transparent;
    }
  }
  .tool-theme {
    background-color: #333;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 2px #333;
    box-sizing: border-box;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    .iconfont {
      font-size: 24px;
      color: #fff;
      line-height: 40px;
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>